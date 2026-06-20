import React from 'react';
import { Building2, CheckCircle2, FileText, Info, Loader2, Sparkles, Target, UploadCloud, Wand2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { generateCoverLetter } from '../../services/groqService';
import { extractTextFromPDF } from '../../services/pdfService';
import {
  getDisplayValue,
  sanitizeProfileForCanvas,
  sanitizeRecipientForCanvas,
  sanitizeSignatureForCanvas,
} from '../../utils/manualFields';

const JobDetails = () => {
  const {
    jobDescription,
    setJobDescription,
    companyName,
    setCompanyName,
    recipient,
    updateRecipient,
    storedJobDescriptions,
    addStoredJobDescription,
    resumeText,
    setGeneratedLetter,
    setStep,
    setIsGenerating,
    isGenerating,
    profile,
    signature,
  } = useStore();

  const [tone, setTone] = React.useState('Professional');
  const [error, setError] = React.useState('');
  const [isUploadingJd, setIsUploadingJd] = React.useState(false);
  const [uploadedJdName, setUploadedJdName] = React.useState('');

  const handleJobDescriptionUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isText = file.type.startsWith('text/') || /\.(txt|md)$/i.test(file.name);

    if (!isPdf && !isText) {
      setError('Upload a PDF, TXT, or Markdown file for the job description.');
      return;
    }

    try {
      setIsUploadingJd(true);
      setError('');

      const extractedText = isPdf ? await extractTextFromPDF(file) : await file.text();
      const cleanedText = extractedText.replace(/\s+\n/g, '\n').trim();

      if (cleanedText.length < 40) {
        throw new Error('The uploaded file does not contain enough readable job description text.');
      }

      setJobDescription(cleanedText);
      setUploadedJdName(file.name);
      addStoredJobDescription({ name: file.name, text: cleanedText });
    } catch (uploadError) {
      console.error('Job description upload failed', uploadError);
      setError(uploadError.message || 'Could not read the uploaded job description file.');
    } finally {
      setIsUploadingJd(false);
    }
  };

  const useStoredJobDescription = (storedDocument) => {
    if (!storedDocument?.text) return;

    setJobDescription(storedDocument.text);
    setUploadedJdName(storedDocument.name);
    setError('');
  };

  const handleGenerate = async () => {
    if (!companyName || !jobDescription.trim()) {
      setError('Please fill in both the company name and job description.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setStep(4);

    try {
      const safeProfile = sanitizeProfileForCanvas(profile);
      const safeRecipient = sanitizeRecipientForCanvas(recipient);
      const safeSignature = sanitizeSignatureForCanvas(signature, safeProfile.fullName);
      const letter = await generateCoverLetter({
        jobDescription,
        resumeText,
        companyName: getDisplayValue(companyName) || safeRecipient.company,
        targetRole: safeRecipient.targetRole,
        recipientName: safeRecipient.name,
        recipientTitle: safeRecipient.title,
        signatureName: getDisplayValue(safeSignature.text) || getDisplayValue(safeProfile.fullName),
        currentJobTitle: safeProfile.currentJobTitle,
        experienceYears: safeProfile.experienceYears,
        experienceMonths: safeProfile.experienceMonths,
        tone,
      });
      setGeneratedLetter(letter);
    } catch (err) {
      console.error('Generation failed', err);
      alert('AI service is busy. Please try again.');
      setStep(3);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5EFEB] px-5 py-8 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl border border-[#C8D9E6] bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8D9E6]/55 text-[#2F4156]">
            <Target size={24} />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#567C8D]">Targeted Letter</p>
          <h1 className="cs-display mt-3 text-3xl font-black tracking-tight text-[#2F4156]">
            Match your resume to the job
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#567C8D]">
            Paste the full role description so Grow can identify priority skills, repeated keywords, and the strongest points from your resume.
          </p>

          <div className="mt-7 rounded-xl border border-[#C8D9E6] bg-[#F5EFEB]/70 p-5">
            <p className="text-sm font-black text-[#2F4156]">Grow will use this to:</p>
            <ul className="mt-3 space-y-2 text-sm text-[#567C8D]">
              <li>Match your experience to the role requirements.</li>
              <li>Use relevant keywords naturally.</li>
              <li>Recommend a professional tone for the company.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-[#C8D9E6] bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-6">
            <h2 className="cs-display text-2xl font-black text-[#2F4156]">Job Details</h2>
            <p className="mt-1 text-sm text-[#567C8D]">Add the target company and either paste or upload the full job description.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-wide text-[#567C8D]">Company Name</span>
              <div className="relative">
                <Building2 className="absolute left-4 top-3.5 text-[#567C8D]" size={18} />
                <input
                  type="text"
                  className="w-full rounded-xl border border-[#C8D9E6] bg-[#F5EFEB]/60 py-3 pl-11 pr-4 text-sm font-semibold text-[#2F4156] outline-none transition placeholder:text-[#567C8D]/60 focus:border-[#567C8D] focus:bg-white focus:ring-2 focus:ring-[#C8D9E6]"
                  placeholder="e.g. LinkedIn"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-wide text-[#567C8D]">Writing Tone</span>
              <div className="relative">
                <Wand2 className="absolute left-4 top-3.5 text-[#567C8D]" size={18} />
                <select
                  className="w-full appearance-none rounded-xl border border-[#C8D9E6] bg-[#F5EFEB]/60 py-3 pl-11 pr-4 text-sm font-semibold text-[#2F4156] outline-none transition focus:border-[#567C8D] focus:bg-white focus:ring-2 focus:ring-[#C8D9E6]"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="Professional">Professional</option>
                  <option value="Confident">Confident</option>
                  <option value="Enthusiastic">Enthusiastic</option>
                  <option value="Persuasive">Persuasive</option>
                </select>
              </div>
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-xs font-black uppercase tracking-wide text-[#567C8D]">Company Address</span>
            <div className="relative">
              <Building2 className="absolute left-4 top-3.5 text-[#567C8D]" size={18} />
              <input
                type="text"
                className="w-full rounded-xl border border-[#C8D9E6] bg-[#F5EFEB]/60 py-3 pl-11 pr-4 text-sm font-semibold text-[#2F4156] outline-none transition placeholder:text-[#567C8D]/60 focus:border-[#567C8D] focus:bg-white focus:ring-2 focus:ring-[#C8D9E6]"
                placeholder="e.g. Bengaluru, India or full office address"
                value={recipient.address}
                onChange={(e) => updateRecipient({ address: e.target.value })}
              />
            </div>
          </label>

          <label className="mt-5 block">
            <span className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-wide text-[#567C8D]">
              Job Description
              <span className="font-bold normal-case tracking-normal text-[#567C8D]/70">Paste full posting or upload a file</span>
            </span>
            <div className="mb-3 rounded-xl border border-dashed border-[#C8D9E6] bg-[#F5EFEB]/50 p-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#567C8D] shadow-sm">
                    {uploadedJdName ? <CheckCircle2 size={20} className="text-emerald-600" /> : <FileText size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#2F4156]">
                      {uploadedJdName ? uploadedJdName : 'Upload a job description file'}
                    </p>
                    <p className="mt-0.5 text-xs text-[#567C8D]">
                      Supports PDF, TXT, and Markdown. Extracted text will appear in the editor below.
                    </p>
                  </div>
                </div>
                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#C8D9E6] bg-white px-4 py-2 text-sm font-bold text-[#2F4156] shadow-sm transition hover:bg-[#F5EFEB]">
                  {isUploadingJd ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                  {isUploadingJd ? 'Reading file...' : uploadedJdName ? 'Replace File' : 'Upload File'}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.txt,.md,text/plain,text/markdown,application/pdf"
                    onChange={handleJobDescriptionUpload}
                  />
                </label>
              </div>
            </div>
            <div className="mb-3 rounded-xl border border-[#C8D9E6] bg-[#F5EFEB]/45 p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-[#2F4156]">Stored Job Descriptions</p>
                  <p className="text-xs text-[#567C8D]">Choose a saved JD instead of uploading again.</p>
                </div>
              </div>
              {storedJobDescriptions.length === 0 ? (
                <div className="rounded-lg border border-dashed border-[#C8D9E6] bg-white px-4 py-4 text-sm text-[#567C8D]">
                  No stored job descriptions yet. Upload one once and it will appear here automatically.
                </div>
              ) : (
                <div className="max-h-44 space-y-2 overflow-y-auto pr-1">
                  {storedJobDescriptions.map((storedDocument) => (
                    <button
                      key={storedDocument.id}
                      type="button"
                      onClick={() => useStoredJobDescription(storedDocument)}
                      className="flex w-full items-center justify-between gap-3 rounded-lg border border-[#C8D9E6] bg-white px-3 py-2.5 text-left shadow-sm transition hover:border-[#567C8D] hover:bg-[#F5EFEB]/70"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#2F4156]">{storedDocument.name}</p>
                        <p className="mt-0.5 text-xs text-[#567C8D]">
                          Saved {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(storedDocument.createdAt))}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-[#2F4156] px-2.5 py-1 text-xs font-black text-white">
                        Use
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <textarea
              className="h-64 w-full resize-none rounded-xl border border-[#C8D9E6] bg-[#F5EFEB]/60 p-4 text-sm leading-6 text-[#2F4156] outline-none transition placeholder:text-[#567C8D]/60 focus:border-[#567C8D] focus:bg-white focus:ring-2 focus:ring-[#C8D9E6]"
              placeholder="Paste responsibilities, requirements, company details, and role title..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </label>

          {error && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-600">
              <Info size={17} />
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#2F4156] py-4 text-base font-black text-white shadow-sm transition hover:bg-[#567C8D] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
            {isGenerating ? 'Grow is analyzing...' : 'Generate Tailored Cover Letter'}
          </button>
        </section>
      </div>
    </div>
  );
};

export default JobDetails;
