import React from 'react';
import { Building2, CheckCircle2, ChevronRight, FileText, Info, Loader2, Search as SearchIcon, ShieldCheck, Sparkles, Target, UploadCloud, Wand2, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { generateCoverLetter } from '../../services/groqService';
import { extractTextFromPDF } from '../../services/pdfService';
import resumeUploadBackground from '../../assets/resumeupload.png';
import TokenExhaustedModal from '../common/TokenExhaustedModal';
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
  const [isTokenModalOpen, setIsTokenModalOpen] = React.useState(false);
  const [tokenModalMessage, setTokenModalMessage] = React.useState('');

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
    if (isGenerating) return;
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
      if (err.isOutOfTokens || /insufficient|token|credit|quota|balance|limit|upgrade/i.test(err.message)) {
        setTokenModalMessage(err.message);
        setIsTokenModalOpen(true);
      } else {
        setError(err.message || 'AI generation failed. Please try again.');
      }
      setStep(3);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#f4efe6] font-sans text-[#102d47] lg:h-full lg:min-h-0">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${resumeUploadBackground})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[#f7f2e8]/22" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_54%_28%,rgba(255,255,255,0.35),transparent_38%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[1680px] flex-col gap-5 px-4 py-4 sm:px-6 lg:h-full lg:min-h-0 lg:flex-row lg:gap-8 lg:px-7 lg:py-2 xl:px-8">
        {/* LEFT STORY PANEL */}
        <section className="relative shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#082a43] px-7 py-6 text-white shadow-[0_24px_70px_rgba(14,35,50,0.18)] lg:h-full lg:w-[380px] lg:px-7 lg:py-5 xl:w-[404px]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.42]"
            style={{
              backgroundImage: `url(${resumeUploadBackground})`,
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'auto 100%',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,25,42,0.50),rgba(3,25,42,0.78))]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.17] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />

          <div className="relative z-10 flex h-full min-h-0 flex-col">
            <div>
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-[#f5d88d]/45 bg-[linear-gradient(145deg,#f2c75a,#dca33a)] text-[#0b304a] shadow-[0_12px_26px_rgba(0,0,0,0.18)]">
                <Target size={28} strokeWidth={2} />
              </div>

              <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#efb843]">
                Job Details
              </p>

              <h1 className="job-details-left-title mt-2.5 max-w-[318px] font-serif text-[36px] font-semibold leading-[1.04] tracking-[-0.035em] text-[#fffdfa]">
                Match your resume <span className="text-[#efb843]">to the job.</span>
              </h1>

              <p className="job-details-left-copy mt-3 max-w-[320px] text-[13px] font-medium leading-[1.58] text-[#d3e0e9]">
                Paste the full job description so CareerSense can identify the right skills, keywords, and opportunities to craft a tailored cover letter.
              </p>

              <div className="mt-3 rounded-[17px] border border-[#5f849e]/55 bg-[#0a304a]/72 px-4 py-3 backdrop-blur-[2px]">
                <Benefit
                  icon={SearchIcon}
                  title="Better Relevance"
                  text="We analyze the role to highlight your strongest matches."
                />
                <Benefit
                  icon={Zap}
                  title="Tailored Content"
                  text="Get a personalized cover letter that speaks to this specific role."
                />
                <Benefit
                  icon={ShieldCheck}
                  title="Your Data is Safe"
                  text="Your job descriptions stay private inside your CareerSense workspace."
                  last
                />
              </div>
            </div>

            <div className="mt-auto pt-3">
              <p className="job-details-tagline mx-auto max-w-[245px] rotate-[-4deg] text-center font-serif text-[20px] italic leading-[1.15] text-[#dce4e9]">
                Right Opportunities<br />Brighter Futures
              </p>
              <div className="mx-auto mt-2 h-[2px] w-12 rotate-[-7deg] rounded-full bg-[#efb843]" />
            </div>
          </div>
        </section>

        {/* RIGHT WORKSPACE */}
        <section className="flex min-w-0 flex-1 flex-col lg:h-full lg:min-h-0 lg:max-w-[1040px] lg:pt-1">
          <div className="mb-2 shrink-0">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#b47b19]">
              Step 3 of 3
            </p>
            <h2 className="job-details-main-title mt-0.5 font-serif text-[34px] font-semibold leading-tight tracking-[-0.035em] text-[#102d47] lg:text-[32px]">
              Job Details
            </h2>
            <p className="mt-1 text-[13px] font-medium text-[#24455f]">
              Add the company and job description to personalize your cover letter.
            </p>
          </div>

          {/* DETAILS CARD */}
          <div className="shrink-0 rounded-[19px] border border-[#e4dbcf] bg-white/95 p-3 shadow-[0_18px_55px_rgba(52,48,39,0.11)] backdrop-blur-[3px]">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-extrabold text-[#102d47]">
                  <Building2 size={15} className="text-[#a86f12]" />
                  Company Name <span className="text-[#df5f4f]">*</span>
                </span>
                <input
                  type="text"
                  className="h-10 w-full rounded-[9px] border border-[#c9d8e2] bg-white px-3.5 text-[12.5px] font-semibold text-[#183a54] outline-none transition placeholder:text-[#8399a8] focus:border-[#547c92] focus:ring-2 focus:ring-[#dce8ee]"
                  placeholder="e.g. Google, Microsoft, Amazon"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-extrabold text-[#102d47]">
                  <Wand2 size={15} className="text-[#a86f12]" />
                  Tone <span className="font-semibold text-[#6f8797]">(Optional)</span>
                </span>
                <select
                  className="h-10 w-full appearance-none rounded-[9px] border border-[#c9d8e2] bg-white px-3.5 text-[12.5px] font-semibold text-[#183a54] outline-none transition focus:border-[#547c92] focus:ring-2 focus:ring-[#dce8ee]"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="Professional">Professional</option>
                  <option value="Confident">Confident</option>
                  <option value="Enthusiastic">Enthusiastic</option>
                  <option value="Persuasive">Persuasive</option>
                </select>
              </label>
            </div>

            <label className="mt-2 block">
              <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-extrabold text-[#102d47]">
                <Building2 size={15} className="text-[#a86f12]" />
                Company Address
              </span>
              <input
                type="text"
                className="h-10 w-full rounded-[9px] border border-[#c9d8e2] bg-white px-3.5 text-[12px] font-semibold text-[#183a54] outline-none transition placeholder:text-[#8399a8] focus:border-[#547c92] focus:ring-2 focus:ring-[#dce8ee]"
                placeholder="e.g. Bengaluru, India or full office address"
                value={recipient.address}
                onChange={(e) => updateRecipient({ address: e.target.value })}
              />
            </label>

            <label className="mt-2 block">
              <span className="mb-1.5 flex items-center justify-between gap-3">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-[#102d47]">
                  <FileText size={15} className="text-[#a86f12]" />
                  Job Description <span className="text-[#df5f4f]">*</span>
                </span>

                <label className="inline-flex cursor-pointer items-center gap-1.5 text-[11px] font-bold text-[#1766a2] transition hover:text-[#0f4f80]">
                  {isUploadingJd ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
                  {isUploadingJd ? 'Reading file...' : uploadedJdName ? 'Replace File' : 'Upload from File'}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.txt,.md,text/plain,text/markdown,application/pdf"
                    onChange={handleJobDescriptionUpload}
                  />
                </label>
              </span>

              <div className="relative">
                <textarea
                  className="job-details-textarea h-[112px] w-full resize-none rounded-[10px] border border-[#c9d8e2] bg-white px-3.5 py-2.5 text-[12px] leading-[1.55] text-[#183a54] outline-none transition placeholder:text-[#8da0ae] focus:border-[#547c92] focus:ring-2 focus:ring-[#dce8ee]"
                  placeholder="Paste the complete job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <span className="pointer-events-none absolute bottom-2 right-3 text-[10px] font-semibold text-[#7890a0]">
                  {jobDescription.length}/5000
                </span>
              </div>

              {uploadedJdName && (
                <div className="mt-2 flex items-center gap-2 rounded-[9px] border border-[#cfe4d7] bg-[#f2faf5] px-3 py-2 text-[10.5px] font-semibold text-[#3c7754]">
                  <CheckCircle2 size={14} />
                  <span className="truncate">{uploadedJdName}</span>
                </div>
              )}

              <div className="mt-2 flex items-center gap-2 rounded-[9px] border border-[#efd8aa] bg-[#fff7e8] px-3 py-2 text-[10.5px] font-semibold text-[#946317]">
                <Info size={14} className="shrink-0" />
                <span>Include the full job description for the best results. You can also upload a PDF, TXT, or Markdown file.</span>
              </div>
            </label>
          </div>

          {/* SAVED JOB DESCRIPTIONS */}
          <div className="mt-2 flex min-h-0 flex-1 flex-col rounded-[19px] border border-[#e4dbcf] bg-white/95 p-3 shadow-[0_16px_48px_rgba(52,48,39,0.09)] backdrop-blur-[3px]">
            <div className="mb-2 flex shrink-0 items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[#f6ead1] text-[#b47b19]">
                  <FileText size={15} />
                </div>
                <h3 className="text-[13px] font-extrabold text-[#102d47]">Your Saved Job Descriptions</h3>
              </div>
              <p className="hidden text-[10.5px] font-semibold text-[#7890a0] sm:block">
                Use a previously uploaded job description
              </p>
            </div>

            {storedJobDescriptions.length === 0 ? (
              <div className="flex min-h-[82px] flex-1 items-center justify-center rounded-[11px] border border-dashed border-[#c8d8e3] bg-[#fbfcfd] px-5 text-center">
                <div>
                  <FileText size={21} className="mx-auto text-[#7e9bad]" />
                  <p className="mt-2 text-[11px] font-bold text-[#567485]">No saved job descriptions yet.</p>
                  <p className="mt-0.5 text-[10px] text-[#8aa0af]">Upload one once and it will appear here automatically.</p>
                </div>
              </div>
            ) : (
              <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1 [scrollbar-width:thin]">
                {storedJobDescriptions.map((storedDocument) => (
                  <button
                    key={storedDocument.id}
                    type="button"
                    onClick={() => useStoredJobDescription(storedDocument)}
                    className="flex w-full items-center justify-between gap-3 rounded-[10px] border border-[#cfdee7] bg-white px-3 py-1.5 text-left transition hover:border-[#8ba9ba] hover:bg-[#fbfcfd]"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#f4f7f9] text-[#315b73]">
                        <FileText size={15} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[11.5px] font-extrabold text-[#173a53]">{storedDocument.name}</p>
                        <p className="mt-0.5 text-[9.5px] font-medium text-[#8197a6]">
                          Uploaded on {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(storedDocument.createdAt))}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-[8px] border border-[#cfdee7] bg-white px-3 py-1.5 text-[10.5px] font-bold text-[#173a53]">
                      Use Description
                      <ChevronRight size={13} />
                    </span>
                  </button>
                ))}
              </div>
            )}

            {error && (
              <div className="mt-2 flex shrink-0 items-center gap-2 rounded-[9px] border border-red-200 bg-red-50 px-3 py-2 text-[10.5px] font-bold text-red-600">
                <Info size={14} className="shrink-0" />
                {error}
              </div>
            )}

            <div className="mt-2 flex shrink-0 flex-col items-end">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="inline-flex h-10 min-w-[240px] items-center justify-center gap-2 rounded-[9px] bg-[#0a304b] px-5 text-[11.5px] font-extrabold text-white shadow-[0_10px_22px_rgba(10,48,75,0.18)] transition hover:bg-[#123f5e] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isGenerating ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
                {isGenerating ? 'CareerSense is analyzing...' : 'Generate Cover Letter'}
                {!isGenerating && <ChevronRight size={14} />}
              </button>
              <p className="mt-1 text-[9.5px] font-semibold text-[#7f95a4]">This will take you to the editor.</p>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @media (min-width: 1024px) and (max-height: 860px) {
          .job-details-left-title { font-size: 31px !important; }
          .job-details-left-copy { font-size: 12px !important; line-height: 1.48 !important; }
          .job-details-tagline { font-size: 17px !important; }
          .job-details-main-title { font-size: 32px !important; }
          .job-details-textarea { height: 96px !important; }
        }
      `}</style>

      <TokenExhaustedModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        message={tokenModalMessage}
      />
    </div>
  );
};

const Benefit = ({ icon: Icon, title, text, last = false }) => (
  <div className={`flex gap-3 ${last ? '' : 'mb-3'}`}>
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1b4a67] text-[#efb843]">
      <Icon size={15} strokeWidth={2.1} />
    </div>
    <div className="min-w-0">
      <p className="text-[11.5px] font-extrabold text-white">{title}</p>
      <p className="mt-0.5 text-[10.5px] font-medium leading-[1.38] text-[#c8d7e1]">{text}</p>
    </div>
  </div>
);

export default JobDetails;
