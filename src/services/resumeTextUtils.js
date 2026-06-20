export const cleanResumeText = (text) => {
  if (!text) return '';

  const noisyLinePatterns = [
    /^page\s+\d+(\s+of\s+\d+)?$/i,
    /^resume$/i,
    /^curriculum vitae$/i,
    /^cv$/i,
    /^confidential$/i,
    /^references available/i,
    /^http/i,
    /^www\./i,
    /^linkedin\.com/i,
  ];

  const sectionHeadings = [
    'summary',
    'profile',
    'professional summary',
    'executive summary',
    'experience',
    'work experience',
    'professional experience',
    'employment history',
    'skills',
    'core skills',
    'technical skills',
    'education',
    'projects',
    'certifications',
    'achievements',
    'awards',
  ];

  const lines = text
    .replace(/\u0000/g, ' ')
    .replace(/[•●▪◦]/g, '-')
    .replace(/\s+\|\s+/g, ' | ')
    .split(/\r?\n|(?<=\.)\s{3,}/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 1)
    .filter((line) => !noisyLinePatterns.some((pattern) => pattern.test(line)));

  const deduped = [];
  const seen = new Set();

  lines.forEach((line) => {
    const normalized = line.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    deduped.push(line);
  });

  const usefulLines = deduped.filter((line) => {
    const lower = line.toLowerCase();
    const isSectionHeading = sectionHeadings.includes(lower);
    const isContactOnly = /^[\w.+-]+@[\w.-]+\.\w{2,}$/.test(line) || /^[+()\d\s.-]{8,}$/.test(line);
    const isLinkHeavy = (line.match(/https?:\/\/|www\.|linkedin\.com|github\.com/gi) || []).length > 1;
    return !isSectionHeading && !isContactOnly && !isLinkHeavy;
  });

  return usefulLines.join('\n').slice(0, 5500);
};

export const findLikelyName = (lines) => {
  const rejected = /resume|curriculum|summary|profile|experience|education|skills|certification|project/i;

  return lines.find((line) => {
    const words = line.split(/\s+/);
    const hasDigit = /\d/.test(line);
    const hasEmail = /@/.test(line);
    const hasUrl = /https?:|www\.|linkedin|github/i.test(line);
    return (
      words.length >= 2 &&
      words.length <= 4 &&
      line.length <= 42 &&
      !hasDigit &&
      !hasEmail &&
      !hasUrl &&
      !rejected.test(line)
    );
  });
};
