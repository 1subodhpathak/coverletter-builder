// import * as pdfjsLib from 'pdfjs-dist';

// // Configure the worker for Vite
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// export const extractTextFromPDF = async (file) => {
//   const arrayBuffer = await file.arrayBuffer();
//   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//   let fullText = '';

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const textContent = await page.getTextContent();
//     const pageText = textContent.items.map((item) => item.str).join(' ');
//     fullText += pageText + '\n';
//   }

//   return fullText;
// };
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { cleanResumeText, findLikelyName } from './resumeTextUtils';

let pdfWorkerConfigured = false;

const ensurePdfWorker = () => {
  if (!pdfWorkerConfigured) {
    const workerFilename = pdfWorkerUrl.split('/').pop();
    const resolvedWorkerUrl =
      pdfWorkerUrl.startsWith('/assets/') && workerFilename
        ? new URL(workerFilename, import.meta.url).toString()
        : pdfWorkerUrl;

    pdfjsLib.GlobalWorkerOptions.workerSrc = resolvedWorkerUrl;
    pdfWorkerConfigured = true;
  }
};

const createPdfReadError = (error) => {
  const message = error?.message || '';

  if (
    /Setting up fake worker failed/i.test(message) ||
    /Failed to fetch dynamically imported module/i.test(message) ||
    /Loading chunk \d+ failed/i.test(message) ||
    /Failed to load/i.test(message) ||
    /404/i.test(message)
  ) {
    return new Error('The PDF reader failed to load one of its files. Refresh the page and try again.');
  }

  if (/InvalidPDFException|Invalid PDF/i.test(message)) {
    return new Error('This file is not a valid PDF. Please upload a different PDF.');
  }

  return new Error('Could not read this PDF. Please try a different file.');
};

export const hasUsablePdfText = (text, { minLetters = 20, minWords = 4 } = {}) => {
  const normalizedText = (text || '').replace(/\s+/g, ' ').trim();

  if (!normalizedText) {
    return false;
  }

  const letterCount = (normalizedText.match(/[A-Za-z]/g) || []).length;
  const wordCount = normalizedText.split(/\s+/).filter(Boolean).length;

  return letterCount >= minLetters || wordCount >= minWords;
};

const normalizeExtractedText = (text) => text.replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();

const extractPageText = async (page) => {
  const textContent = await page.getTextContent();
  return getPageTextByRows(textContent.items);
};

const renderPageToCanvas = async (page, scale = 2) => {
  if (typeof document === 'undefined') {
    throw new Error('OCR fallback is only available in the browser.');
  }

  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });

  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);

  await page.render({
    canvasContext: context,
    viewport,
  }).promise;

  return canvas;
};

const extractTextWithOcr = async (pdf, pageNumbers) => {
  const { createWorker } = await import('tesseract.js');
  const worker = await createWorker('eng');

  try {
    const pageTexts = new Map();

    for (const pageNumber of pageNumbers) {
      const page = await pdf.getPage(pageNumber);
      const canvas = await renderPageToCanvas(page);
      const {
        data: { text },
      } = await worker.recognize(canvas);

      pageTexts.set(pageNumber, normalizeExtractedText(text));
    }

    return pageTexts;
  } finally {
    await worker.terminate();
  }
};

export const extractTextFromPDF = async (file) => {
  try {
    ensurePdfWorker();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pageTexts = [];
    const ocrPageNumbers = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const pageText = normalizeExtractedText(await extractPageText(page));
      pageTexts.push(pageText);

      if (!hasUsablePdfText(pageText, { minLetters: 12, minWords: 3 })) {
        ocrPageNumbers.push(i);
      }
    }

    let fullText = pageTexts.filter(Boolean).join('\n\n').trim();

    if (ocrPageNumbers.length > 0) {
      const ocrPageTexts = await extractTextWithOcr(pdf, ocrPageNumbers);
      const mergedTexts = pageTexts.map((pageText, index) => {
        const pageNumber = index + 1;
        const ocrText = ocrPageTexts.get(pageNumber) || '';
        return hasUsablePdfText(ocrText, { minLetters: 12, minWords: 3 }) ? ocrText : pageText;
      });

      if (mergedTexts.some((pageText) => hasUsablePdfText(pageText, { minLetters: 12, minWords: 3 }))) {
        fullText = mergedTexts.filter(Boolean).join('\n\n').trim();
      }
    }

    return fullText;
  } catch (error) {
    console.error('PDF Error:', error);
    throw createPdfReadError(error);
  }
};

const getPageTextByRows = (items) => {
  const rows = [];

  items
    .filter((item) => item.str && item.str.trim())
    .sort((a, b) => {
      const yDiff = b.transform[5] - a.transform[5];
      if (Math.abs(yDiff) > 3) return yDiff;
      return a.transform[4] - b.transform[4];
    })
    .forEach((item) => {
      const y = item.transform[5];
      const row = rows.find((candidate) => Math.abs(candidate.y - y) <= 3);
      if (row) {
        row.items.push(item);
      } else {
        rows.push({ y, items: [item] });
      }
    });

  return rows
    .map((row) =>
      row.items
        .sort((a, b) => a.transform[4] - b.transform[4])
        .map((item) => item.str.trim())
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter(Boolean)
    .join('\n');
};

export const parseResumeData = (text) => {
  const cleanedText = cleanResumeText(text);
  const lines = cleanedText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  
  // 1. Extract Name (usually first line)
  const fullName = findLikelyName(lines) || '';

  // 2. Extract Email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // 3. Extract Phone
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // 4. Extract Location (Naive search for common patterns)
  const locationMatch = text.match(/[A-Z][a-z]+,\s[A-Z]{2}/); // e.g. New York, NY
  const address = locationMatch ? locationMatch[0] : '';

  // 5. Extract Executive Skills
  const executiveKeywords = [
    'Strategy', 'Leadership', 'Operations', 'Growth', 'Scale', 'Revenue', 
    'P&L', 'Mergers', 'Acquisitions', 'Digital Transformation', 'Innovation',
    'Stakeholder Management', 'Board of Directors', 'Fiscal Responsibility',
    'Enterprise', 'Global', 'Visionary', 'Strategic Planning', 'M&A'
  ];
  
  const skills = executiveKeywords.filter(kw =>
    cleanedText.toLowerCase().includes(kw.toLowerCase())
  ).slice(0, 5); // Pick top 5

  return {
    fullName,
    email,
    phone,
    address,
    skills: skills.length > 0 ? skills : ['Strategic Planning', 'Team Leadership', 'Operations']
  };
};
