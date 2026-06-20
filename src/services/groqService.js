import Groq from "groq-sdk";
import { recordCareerSenseUsage } from './careerSensePoints';
import { cleanResumeText } from './resumeTextUtils';

// Initialize Groq
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || 'gsk_YOUR_API_KEY_HERE', 
  dangerouslyAllowBrowser: true 
});

const OPENING_BANNED_PATTERNS = [
  /i am excited to apply/i,
  /i'?m excited to apply/i,
  /i am writing to express/i,
  /i would like to express/i,
  /strong interest in the .* position/i,
  /leverage my expertise/i,
  /drive innovation/i,
  /proven track record/i,
  /dynamic team/i,
];

const extractJobDescriptionSignals = (jobDescription = '') => {
  const text = jobDescription
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[•●▪◦]/g, '\n- ')
    .replace(/\s+\n/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();

  if (!text) {
    return {
      priorityLines: '',
      keywordLine: '',
    };
  }

  const lines = text
    .split('\n')
    .map((line) => line.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);

  const scoredLines = lines
    .map((line) => {
      const lower = line.toLowerCase();
      let score = 0;

      if (/(required|requirements|must|need|seeking|looking for|responsible|responsibilities|ideal|preferred|experience with|proficient|strong|ability to|lead|manage|build|develop|analyz|deliver|stakeholder|strategy|operations|cross-functional|ownership)/i.test(lower)) {
        score += 3;
      }
      if (/\d+\+?\s*(years|yrs)/i.test(lower)) {
        score += 2;
      }
      if (/(sql|python|excel|tableau|power bi|aws|azure|gcp|ai|machine learning|analytics|product|marketing|sales|finance|operations|communication|leadership|program management|project management|stakeholder management)/i.test(lower)) {
        score += 2;
      }
      if (line.length >= 40 && line.length <= 180) {
        score += 1;
      }

      return { line, score };
    })
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0);

  const priorityLines = scoredLines
    .slice(0, 5)
    .map((item, index) => `${index + 1}. ${item.line}`)
    .join('\n');

  const keywordMatches = [...text.matchAll(/\b([A-Za-z][A-Za-z+/#&.-]{2,}(?:\s+[A-Za-z][A-Za-z+/#&.-]{2,}){0,2})\b/g)]
    .map((match) => match[1].trim())
    .filter((token) => token.length >= 3 && token.length <= 30);

  const stopwords = new Set([
    'the', 'and', 'for', 'with', 'you', 'your', 'will', 'this', 'that', 'are', 'our', 'from', 'have',
    'has', 'who', 'using', 'use', 'into', 'across', 'role', 'team', 'teams', 'ability', 'strong',
    'required', 'preferred', 'experience', 'responsible', 'responsibilities', 'requirements', 'must',
    'years', 'year', 'work', 'working', 'including', 'skills', 'skill', 'plus'
  ]);

  const keywordCounts = new Map();
  keywordMatches.forEach((token) => {
    const normalized = token.toLowerCase();
    if (stopwords.has(normalized)) return;
    keywordCounts.set(token, (keywordCounts.get(token) || 0) + 1);
  });

  const keywordLine = [...keywordCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([token]) => token)
    .join(', ');

  return {
    priorityLines,
    keywordLine,
  };
};

const createGenerationPrompt = ({
  cleanedResume,
  cleanedJobDescription,
  jdPriorityLines,
  jdKeywordLine,
  safeCompanyName,
  safeTargetRole,
  safeRecipientName,
  safeRecipientTitle,
  safeSignatureName,
  safeCurrentJobTitle,
  safeExperienceSummary,
  tone,
  isResumeOnly,
  extraInstructions = '',
}) => `
    ROLE:
    You are a senior cover-letter writer for CareerSense. You write polished, recruiter-friendly cover letters for professionals, senior managers, directors, VPs, and executives.

    INPUT DATA:
    - CANDIDATE RESUME NOTES, cleaned from PDF: "${cleanedResume.slice(0, 4200)}"
    - JOB DESCRIPTION: "${cleanedJobDescription}"
    - TOP JOB PRIORITIES IDENTIFIED FROM THE JD:
${jdPriorityLines || 'Not available'}
    - IMPORTANT JD KEYWORDS / THEMES: "${jdKeywordLine || 'Not available'}"
    - TARGET COMPANY: "${safeCompanyName}"
    - TARGET ROLE / POSITION: "${safeTargetRole}"
    - RECIPIENT: "${safeRecipientName}"
    - RECIPIENT DESIGNATION: "${safeRecipientTitle}"
    - SIGNATURE NAME: "${safeSignatureName}"
    - CURRENT JOB TITLE: "${safeCurrentJobTitle}"
    - TOTAL EXPERIENCE: "${safeExperienceSummary}"
    - TONE: ${tone || 'Professional'}
    - GENERATION MODE: ${isResumeOnly ? 'resume-only general cover letter' : 'resume matched to job description'}

    TASK:
    Write a complete, professional cover letter. It must read like a letter, not a resume summary.

    STRICT GUIDELINES:
    1. Use only the most relevant resume facts. Do NOT paste or summarize every resume section.
    2. Remove noise from the resume: no contact details, no links, no section headings, no education dump, no skill dump, no repeated bullets.
    3. If the resume has metrics, use 1-3 of them naturally. If no metrics are present, do NOT invent numbers.
    4. If a job description exists, tailor the letter to the company's priorities. If not, write a strong general cover letter based on the candidate's strongest experience.
    4a. If a target role / position is provided, tailor the framing, value proposition, and opening around that role even when the job description is brief.
    4b. If current job title or total experience is provided, use it naturally to sharpen credibility and seniority, but do not invent extra career history.
    4c. When a job description exists, silently do this before writing:
       - Identify the 3-5 most important requirements or responsibilities.
       - Match those priorities against the candidate's strongest relevant evidence from the resume.
       - Build the letter around those matches first, not around generic strengths.
       - If the candidate does not perfectly match one requirement, use the closest honest adjacent evidence without overclaiming.
    4d. For resume + JD letters, the document should feel like it was written for that exact vacancy.
       - Reuse the employer's language selectively and naturally.
       - Prioritize the business problems, scope, tools, stakeholders, and outcomes that appear most important in the JD.
       - Make the recruiter feel the candidate understands what the role is really asking for.
    5. Keep it 250-380 words.
    6. STRUCTURE:
       - Start with "Dear ${safeRecipientName}," only if a recipient name exists.
       - If no recipient name exists, do not invent one and do not add a placeholder salutation.
       - Paragraph 1: concise opening that states fit and target value.
       - Paragraph 2: 2-3 strongest experience themes from the resume, explicitly tied to JD priorities when a JD exists.
       - Optional bullet list: exactly 3 short bullets only if it improves readability.
       - Final paragraph: confident call to action.
    6a. The opening sentence is critical. It must sound specific, deliberate, and human.
       - Do NOT start with generic application phrases.
       - Do NOT use "I am excited to apply", "I am writing to express", "I am interested in", or similar stock openings.
       - Do NOT use clichés such as "leverage my expertise", "drive innovation", "proven track record", or "dynamic team".
       - Prefer an opening that begins with the candidate's fit, business relevance, leadership scope, domain context, or a sharp observation about the role.
       - The first sentence should feel like an executive introduction, not an AI template.
    6b. If company name is missing, do not invent one or use placeholder company names.
    6c. For resume + JD mode, make the first paragraph stronger than a standard cover letter:
       - Establish why this candidate makes sense for this role specifically.
       - Reference the role's scope, function, domain, or mission in a way that feels informed by the JD.
    7. Never include these labels or headings: "Professional Summary", "Experience", "Education", "Skills", "Resume", "Cover Letter", "Executive Proof Points", "Strategic Hook".
    8. FORMATTING:
       - Output ONLY raw HTML suitable for a <div>. 
       - Use tags: <p>, <ul>, <li>, <strong>.
       - NO <html>, <head>, or <body> tags.
       - No markdown fences.
       - Do NOT include the sign-off ("Sincerely", "Best regards") or the candidate's name at the end. The template handles signature separately.
    9. QUALITY BAR FOR RESUME + JD MODE:
       - This must not read like a generic AI cover letter.
       - It should make a recruiter think, "this applicant understands the role and has relevant evidence."
       - Every paragraph should earn its place by improving fit for this specific role.
       - Avoid generic praise, empty enthusiasm, and broad claims that are not anchored in resume evidence or JD priorities.
    ${extraInstructions}

    OUTPUT:
    Generate the HTML string now.
  `;

const isGenericOpening = (html = '') => {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 260);

  return OPENING_BANNED_PATTERNS.some((pattern) => pattern.test(text));
};

const requestCoverLetterDraft = async (prompt) =>
  groq.chat.completions.create({
    messages: [
      { role: "system", content: "You are an elite Executive Writer. Output valid HTML content only." },
      { role: "user", content: prompt }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.35,
    max_tokens: 900,
  });

export const generateCoverLetter = async ({ jobDescription, resumeText, companyName, targetRole, recipientName, recipientTitle, signatureName, currentJobTitle, experienceYears, experienceMonths, tone }) => {
  const safeCompanyName = typeof companyName === 'string' ? companyName.trim() : '';
  const safeTargetRole = typeof targetRole === 'string' ? targetRole.trim() : '';
  const safeRecipientName = typeof recipientName === 'string' ? recipientName.trim() : '';
  const safeRecipientTitle = typeof recipientTitle === 'string' ? recipientTitle.trim() : '';
  const safeSignatureName = typeof signatureName === 'string' ? signatureName.trim() : '';
  const safeCurrentJobTitle = typeof currentJobTitle === 'string' ? currentJobTitle.trim() : '';
  const safeExperienceYears = typeof experienceYears === 'string' ? experienceYears.trim() : '';
  const safeExperienceMonths = typeof experienceMonths === 'string' ? experienceMonths.trim() : '';
  const safeExperienceSummary = [safeExperienceYears ? `${safeExperienceYears} year${safeExperienceYears === '1' ? '' : 's'}` : '', safeExperienceMonths ? `${safeExperienceMonths} month${safeExperienceMonths === '1' ? '' : 's'}` : '']
    .filter(Boolean)
    .join(' ');
  
  // 1. Validation
  if (!jobDescription && !resumeText) {
    console.warn("Missing data for AI generation.");
    return '<p>Please provide a resume and/or job description to generate a tailored letter.</p>';
  }

  const cleanedResume = cleanResumeText(resumeText || '');
  const cleanedJobDescription = (jobDescription || '')
    .replace(/\s+/g, ' ')
    .replace(/https?:\/\/\S+/g, '')
    .trim()
    .slice(0, 3000);
  const isResumeOnly = cleanedResume && !cleanedJobDescription;
  const { priorityLines: jdPriorityLines, keywordLine: jdKeywordLine } = extractJobDescriptionSignals(jobDescription || '');

  try {
    const basePrompt = createGenerationPrompt({
      cleanedResume,
      cleanedJobDescription,
      jdPriorityLines,
      jdKeywordLine,
      safeCompanyName,
      safeTargetRole,
      safeRecipientName,
      safeRecipientTitle,
      safeSignatureName,
      safeCurrentJobTitle,
      safeExperienceSummary,
      tone,
      isResumeOnly,
    });

    let completion = await requestCoverLetterDraft(basePrompt);
    let normalizedHtml = normalizeGeneratedHtml(completion.choices[0]?.message?.content, {
      companyName: safeCompanyName,
      recipientName: safeRecipientName,
    });

    if (isGenericOpening(normalizedHtml)) {
      const retryPrompt = createGenerationPrompt({
        cleanedResume,
        cleanedJobDescription,
        jdPriorityLines,
        jdKeywordLine,
        safeCompanyName,
        safeTargetRole,
        safeRecipientName,
        safeRecipientTitle,
        safeSignatureName,
        safeCurrentJobTitle,
        safeExperienceSummary,
        tone,
        isResumeOnly,
        extraInstructions: `
    CORRECTION:
    Your previous draft used a generic AI-sounding opener.
    Rewrite the letter from scratch with a sharper, less predictable first paragraph.
    Avoid any phrasing that sounds like a standard ChatGPT cover letter template.
    ${!isResumeOnly ? 'Make the revised version even more tightly mapped to the job description priorities and recruiter expectations for this role.' : ''}
        `,
      });

      completion = await requestCoverLetterDraft(retryPrompt);
      normalizedHtml = normalizeGeneratedHtml(completion.choices[0]?.message?.content, {
        companyName: safeCompanyName,
        recipientName: safeRecipientName,
      });
    }

    const usage = completion.usage || {};
    recordCareerSenseUsage({
      feature: resumeText && jobDescription ? 'Executive Resume + JD Map' : 'Executive Analysis',
      label: companyName ? `Cover letter for ${companyName}` : 'Executive letter draft',
      model: completion.model || 'llama-3.3-70b-versatile',
      inputPoints: usage.prompt_tokens,
      outputPoints: usage.completion_tokens,
      totalPoints: usage.total_tokens,
    });

    return normalizedHtml || "<p>Error generating content.</p>";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return `<p>Failed to generate letter. Error: ${error.message}</p>`;
  }
};

const normalizeGeneratedHtml = (html = '', { companyName = '', recipientName = '' } = {}) => {
  let normalized = html
    .trim()
    .replace(/^```html\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .replace(/<\/?(html|head|body)[^>]*>/gi, '')
    .replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gis, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  if (!recipientName) {
    normalized = normalized.replace(/^\s*<p>\s*Dear\b.*?<\/p>\s*/i, '');
    normalized = normalized.replace(/^\s*<p>\s*Hello\b.*?<\/p>\s*/i, '');
  }

  if (!companyName) {
    normalized = normalized
      .replace(/\byour target company\b/gi, '')
      .replace(/\btarget company\b/gi, '')
      .replace(/\bthe company\b/gi, '')
      .replace(/\bHiring Committee\b/gi, '')
      .replace(/\bat <strong><\/strong>/gi, '')
      .replace(/\sat\s+\./gi, '.')
      .replace(/\s{2,}/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  return normalized;
};

export const answerCoverLetterQuestion = async (question) => {
  const cleanQuestion = question?.trim().slice(0, 280);

  if (!cleanQuestion) {
    return 'Ask a specific executive cover letter question.';
  }

  const heuristicAnswer = getHeuristicCoverLetterAnswer(cleanQuestion);
  if (heuristicAnswer) {
    return heuristicAnswer;
  }

  const prompt = `Answer this cover-letter question for a job applicant.

Rules:
- Keep it practical and concise.
- Use 3 short parts only:
  Quick answer:
  Best move:
  Avoid:
- Prefer plain language over buzzwords.
- Stay under 90 words total.

Question: "${cleanQuestion}"`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a sharp cover-letter coach. Be specific, useful, and brief.' },
        { role: 'user', content: prompt },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 120,
    });

    const usage = completion.usage || {};
    recordCareerSenseUsage({
      feature: 'Executive Q&A',
      label: cleanQuestion,
      model: completion.model || 'llama-3.3-70b-versatile',
      inputPoints: usage.prompt_tokens,
      outputPoints: usage.completion_tokens,
      totalPoints: usage.total_tokens,
    });

    return completion.choices[0]?.message?.content?.trim() || 'Focus on strategic impact and board alignment.';
  } catch (error) {
    console.error('Executive Q&A Error:', error);
    return 'I could not reach the analysis engine. Focus on high-level impact and ROI.';
  }
};

const getHeuristicCoverLetterAnswer = (question) => {
  const normalized = question.toLowerCase();

  if (/(how.*start|opening line|open.*cover letter|begin.*cover letter)/i.test(normalized)) {
    return `Quick answer: Start with fit, not enthusiasm.\n\nBest move: Lead with the role, domain, or business problem you solve, then connect it to one concrete result.\n\nAvoid: "I am excited to apply" openings or repeating your resume summary.`;
  }

  if (/(how long|length|word count|one page|pages)/i.test(normalized)) {
    return `Quick answer: Keep it to one page.\n\nBest move: Aim for roughly 250-400 words with a strong opening, 1-2 proof paragraphs, and a clear close.\n\nAvoid: Long autobiographies or bullet-heavy resume repetition.`;
  }

  if (/(salary|compensation|ctc|pay expectation|expected salary)/i.test(normalized)) {
    return `Quick answer: Usually leave salary out.\n\nBest move: Mention compensation only if the job post explicitly asks for it, and keep it brief.\n\nAvoid: Leading with money before you establish fit and value.`;
  }

  if (/(ats|keyword|screening software|scanner)/i.test(normalized)) {
    return `Quick answer: Yes, use ATS keywords, but naturally.\n\nBest move: Mirror the job description's role terms, tools, and priorities in your opening and proof paragraphs.\n\nAvoid: Keyword stuffing or dropping a raw skills list into the letter.`;
  }

  if (/(tailor|customi[sz]e|specific role|specific company|job description)/i.test(normalized)) {
    return `Quick answer: Tailor the letter around the employer's top priorities.\n\nBest move: Pick the 3-5 most important requirements in the JD and match them to your strongest evidence.\n\nAvoid: Generic praise for the company or broad claims that could fit any job.`;
  }

  if (/(hiring manager|don't know.*name|unknown.*manager|no name)/i.test(normalized)) {
    return `Quick answer: Use a professional generic salutation.\n\nBest move: Write "Dear Hiring Manager," if you cannot verify the person's name.\n\nAvoid: Guessing a name or using outdated greetings like "To Whom It May Concern."`;
  }

  if (/(closing|sign off|end.*cover letter|final paragraph)/i.test(normalized)) {
    return `Quick answer: End with confidence and next-step language.\n\nBest move: Re-state fit briefly, thank them for their consideration, and signal interest in speaking further.\n\nAvoid: Weak closes like "hope to hear from you" with no value reminder.`;
  }

  if (/(bullet|bullets|list format)/i.test(normalized)) {
    return `Quick answer: Use bullets only if they improve scanning.\n\nBest move: Keep them to 3 short proof points with outcomes, tools, or scope.\n\nAvoid: Turning the letter into a second resume.`;
  }

  if (/(gap|career break|break in employment|employment gap)/i.test(normalized)) {
    return `Quick answer: Address it briefly if it needs context.\n\nBest move: Use one calm line, then shift quickly to readiness, relevant skills, and current fit.\n\nAvoid: Over-explaining the gap or sounding defensive.`;
  }

  return '';
};
