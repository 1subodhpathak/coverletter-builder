import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { URL } from 'node:url';

/* global console */

const siteUrl = String(process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://coverletter.careersenseai.com').replace(/\/$/, '');
const distHtmlPath = new URL('../dist/index.html', import.meta.url);

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const escapeJson = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

const pageTitle = 'Free AI Cover Letter Builder | ATS-Friendly Letters in Seconds - CareerSense';
const pageDescription = 'Generate tailored, ATS-friendly cover letters matched to any job description in seconds with CareerSense AI. Pick executive templates and export instant PDF.';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${siteUrl}/#webapp`,
      'name': 'CareerSense AI Cover Letter Builder',
      'url': siteUrl,
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'browserRequirements': 'Requires JavaScript. Requires HTML5.',
      'description': pageDescription,
      'offers': {
        '@type': 'Offer',
        'price': '0.00',
        'priceCurrency': 'USD',
        'category': 'Free'
      },
      'featureList': [
        'AI Resume and Job Description Calibration',
        'ATS-Optimized Formatting and Keywords',
        'Executive & Professional Letter Templates',
        'Tone and Length Customization',
        'One-Click PDF Export'
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How does the AI Cover Letter Builder work?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'CareerSense analyzes your resume experience and target job description to automatically generate a tailored, ATS-friendly cover letter highlighting relevant achievements and keywords.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Are these cover letters ATS-friendly?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. All CareerSense cover letter templates are designed with clean typography, standard layouts, and optimal keyword density to pass Applicant Tracking Systems like Greenhouse, Lever, and Workday.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I edit and customize the generated cover letter?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes. You have complete control to edit any text, adjust tone (Executive, Modern, Confident), choose templates, and instantly download a high-resolution PDF.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is CareerSense AI Cover Letter Builder free?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, you can create, customize, and export professional cover letters for free using CareerSense.'
          }
        }
      ]
    }
  ]
};

const prerenderBody = `
  <div id="root">
    <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #F7F8FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #071426;">
      <div style="width: 40px; height: 40px; border: 3px solid #E1E7EF; border-top-color: #071426; border-radius: 50%; animation: cs-spin 0.8s linear infinite;"></div>
      <div style="margin-top: 14px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; color: #475569; text-transform: uppercase;">CareerSense Cover Letter</div>
    </div>
  </div>
  <noscript>
    <style>
      #root { display: none !important; }
      .cs-seo-fallback {
        max-width: 960px;
        margin: 40px auto;
        padding: 24px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #071426;
        line-height: 1.6;
      }
      .cs-seo-fallback h1 { font-size: 32px; font-weight: 700; color: #071426; margin-bottom: 16px; }
      .cs-seo-fallback h2 { font-size: 22px; font-weight: 600; color: #123B6D; margin-top: 28px; margin-bottom: 12px; }
      .cs-seo-fallback h3 { font-size: 17px; font-weight: 600; color: #071426; margin-top: 18px; margin-bottom: 6px; }
      .cs-seo-fallback p { color: #475569; margin-bottom: 16px; font-size: 16px; }
      .cs-seo-fallback a { color: #123B6D; font-weight: 600; text-decoration: underline; }
      .cs-seo-fallback ul, .cs-seo-fallback ol { padding-left: 22px; margin-bottom: 20px; }
      .cs-seo-fallback li { margin-bottom: 8px; color: #334155; }
      .cs-seo-fallback .badge { display: inline-block; background: #E2E8F0; color: #0F172A; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; }
      .cs-seo-fallback .faq-item { border-bottom: 1px solid #E2E8F0; padding-bottom: 14px; margin-bottom: 14px; }
    </style>
    <div class="cs-seo-fallback">
      <span class="badge">CareerSense AI Workspace</span>
      <h1>Free AI Cover Letter Builder</h1>
      <p>Craft boardroom-ready, ATS-friendly cover letters tailored to any executive or professional job description in seconds using advanced AI calibration.</p>

      <h2>Why Choose CareerSense AI Cover Letter Builder?</h2>
      <ul>
        <li><strong>Smart Job Description Calibration:</strong> Automatically analyzes job postings to extract critical skills and keywords that hiring managers search for.</li>
        <li><strong>ATS-Optimized Architecture:</strong> Designed to pass automated recruitment filters (Workday, Greenhouse, Lever, Taleo) without formatting errors.</li>
        <li><strong>Executive and Modern Templates:</strong> Beautifully curated layouts that pair seamlessly with professional resumes.</li>
        <li><strong>Customizable Tone and Emphasis:</strong> Tailor your message to be formal, confident, creative, or results-driven.</li>
        <li><strong>Instant PDF Export:</strong> Download high-quality, print-ready PDF files in one click.</li>
      </ul>

      <h2>How It Works in 3 Simple Steps</h2>
      <ol>
        <li><strong>Upload or Paste Your Resume:</strong> CareerSense extracts your key accomplishments, skills, and employment history.</li>
        <li><strong>Provide the Target Job Details:</strong> Paste the job title and job description to identify essential requirements.</li>
        <li><strong>Generate & Tailor Your Letter:</strong> AI synthesizes your background with the employer's needs to create a compelling, personalized cover letter ready for immediate download.</li>
      </ol>

      <h2>Frequently Asked Questions</h2>
      <div class="faq-item">
        <h3>How does the AI Cover Letter Builder work?</h3>
        <p>CareerSense analyzes your resume experience and target job description to automatically generate a tailored, ATS-friendly cover letter highlighting relevant achievements and keywords.</p>
      </div>
      <div class="faq-item">
        <h3>Are these cover letters ATS-friendly?</h3>
        <p>Yes. All CareerSense cover letter templates are designed with clean typography, standard layouts, and optimal keyword density to pass Applicant Tracking Systems like Greenhouse, Lever, and Workday.</p>
      </div>
      <div class="faq-item">
        <h3>Can I edit and customize the generated cover letter?</h3>
        <p>Yes. You have complete control to edit any text, adjust tone, choose templates, and instantly download a high-resolution PDF.</p>
      </div>
      <div class="faq-item">
        <h3>Is CareerSense AI Cover Letter Builder free?</h3>
        <p>Yes, you can create, customize, and export professional cover letters for free using CareerSense.</p>
      </div>

      <h2>Explore the CareerSense AI Ecosystem</h2>
      <ul>
        <li><a href="https://resume.careersenseai.com/">Free AI Resume Builder</a> — Build ATS-compliant resumes with 60+ job-specific examples and templates.</li>
        <li><a href="https://ats.careersenseai.com/">ATS Resume Score Checker</a> — Scan your resume against job descriptions for instant match scores and keyword suggestions.</li>
        <li><a href="https://careersenseai.com/">CareerSense Platform</a> — Unified career acceleration suite for tech professionals and executives.</li>
      </ul>
    </div>
  </noscript>`;

async function prerender() {
  try {
    const rawHtml = await readFile(distHtmlPath, 'utf8');

    const headInject = `
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(pageDescription)}" />
    <meta name="keywords" content="AI cover letter builder, free cover letter generator, ATS cover letter writer, job application letter, executive cover letter, CareerSense" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${siteUrl}/" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="CareerSense" />
    <meta property="og:url" content="${siteUrl}/" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(pageDescription)}" />
    <meta property="og:image" content="${siteUrl}/og-preview.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${siteUrl}/" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(pageDescription)}" />
    <meta name="twitter:image" content="${siteUrl}/og-preview.png" />
    <style>@keyframes cs-spin{to{transform:rotate(360deg)}}body{margin:0;background-color:#F7F8FA;}</style>
    <script type="application/ld+json">${escapeJson(schema)}</script>`;

    let processed = rawHtml
      .replace(/<title>[\s\S]*?<\/title>/i, '')
      .replace(/<meta name="description"[\s\S]*?>/i, '')
      .replace(/<meta name="keywords"[\s\S]*?>/i, '')
      .replace(/<meta name="robots"[\s\S]*?>/i, '')
      .replace(/<link rel="canonical"[\s\S]*?>/i, '')
      .replace(/<meta property="og:[\s\S]*?>/gi, '')
      .replace(/<meta name="twitter:[\s\S]*?>/gi, '')
      .replace(/<meta property="twitter:[\s\S]*?>/gi, '')
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

    // Ensure favicon is updated to /favicon.svg
    if (processed.includes('href="/vite.svg"')) {
      processed = processed.replace('href="/vite.svg"', 'href="/favicon.svg"');
    }

    processed = processed.replace('</head>', `${headInject}\n  </head>`);

    if (processed.includes('<div id="root"></div>')) {
      processed = processed.replace('<div id="root"></div>', prerenderBody);
    }

    await writeFile(distHtmlPath, processed, 'utf8');
    console.log('✓ Successfully prerendered CoverLetterBuilder SEO fallback into dist/index.html');
  } catch (err) {
    console.error('Error during CoverLetterBuilder prerender:', err);
    process.exit(1);
  }
}

prerender();
