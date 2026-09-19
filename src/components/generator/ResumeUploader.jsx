import React, { useCallback, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Check,
  Clock3,
  FileText,
  FolderOpen,
  Loader2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Zap,
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { extractTextFromPDF, hasUsablePdfText, parseResumeData } from '../../services/pdfService';
import { generateCoverLetter } from '../../services/groqService';
import TokenExhaustedModal from '../common/TokenExhaustedModal';
import {
  getDisplayValue,
  sanitizeProfileForCanvas,
  sanitizeRecipientForCanvas,
  sanitizeSignatureForCanvas,
} from '../../utils/manualFields';
import resumeUploadBackground from '../../assets/resumeupload.png';
import coraPng from '../../assets/CORA.png';

const ResumeUploader = () => {
  const {
    creationMode,
    setFile,
    setResumeText,
    setResumeName,
    setGeneratedLetter,
    setStep,
    setSkills,
    addStoredResume,
    storedResumes,
    profile,
    recipient,
    signature,
  } = useStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('Upload PDF');
  const [error, setError] = useState('');
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [tokenModalMessage, setTokenModalMessage] = useState('');

  const processFile = async (file) => {
    if (!file || isLoading) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size too large. Please upload a PDF under 5MB.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setStatus('Reading resume');

      const text = await extractTextFromPDF(file);
      if (!hasUsablePdfText(text)) {
        throw new Error('Could not extract text. Please use a text-selectable PDF.');
      }

      const parsedData = parseResumeData(text);

      setFile(file);
      setResumeName(file.name);
      setResumeText(text);
      setSkills(parsedData.skills);
      addStoredResume({ name: file.name, text, skills: parsedData.skills });

      if (creationMode === 'resume') {
        setStatus('Cora Ai is drafting your letter');
        const safeProfile = sanitizeProfileForCanvas(profile);
        const safeRecipient = sanitizeRecipientForCanvas(recipient);
        const safeSignature = sanitizeSignatureForCanvas(signature, safeProfile.fullName);
        const letter = await generateCoverLetter({
          resumeText: text,
          jobDescription: '',
          companyName: safeRecipient.company,
          targetRole: safeRecipient.targetRole,
          recipientName: safeRecipient.name,
          recipientTitle: safeRecipient.title,
          signatureName: getDisplayValue(safeSignature.text) || getDisplayValue(safeProfile.fullName),
          currentJobTitle: safeProfile.currentJobTitle,
          experienceYears: safeProfile.experienceYears,
          experienceMonths: safeProfile.experienceMonths,
          tone: 'Professional',
        });
        setGeneratedLetter(letter);
        setStep(4);
        return;
      }

      setStep(3);
    } catch (err) {
      console.error(err);
      if (err.isOutOfTokens || /insufficient|token|credit|quota|balance|limit|upgrade/i.test(err.message)) {
        setTokenModalMessage(err.message);
        setIsTokenModalOpen(true);
      } else {
        setError(err.message || 'Failed to read PDF. Please try a different file.');
      }
    } finally {
      setIsLoading(false);
      setStatus('Upload PDF');
    }
  };

  const useStoredResume = async (storedResume) => {
    if (!storedResume?.text || isLoading) return;

    try {
      setIsLoading(true);
      setError('');
      setStatus('Loading stored resume');

      setFile(null);
      setResumeName(storedResume.name);
      setResumeText(storedResume.text);
      setSkills(storedResume.skills || []);

      if (creationMode === 'resume') {
        setStatus('Cora Ai is drafting your letter');
        const safeProfile = sanitizeProfileForCanvas(profile);
        const safeRecipient = sanitizeRecipientForCanvas(recipient);
        const safeSignature = sanitizeSignatureForCanvas(signature, safeProfile.fullName);
        const letter = await generateCoverLetter({
          resumeText: storedResume.text,
          jobDescription: '',
          companyName: safeRecipient.company,
          targetRole: safeRecipient.targetRole,
          recipientName: safeRecipient.name,
          signatureName: getDisplayValue(safeSignature.text) || getDisplayValue(safeProfile.fullName),
          currentJobTitle: safeProfile.currentJobTitle,
          experienceYears: safeProfile.experienceYears,
          experienceMonths: safeProfile.experienceMonths,
          tone: 'Professional',
        });
        setGeneratedLetter(letter);
        setStep(4);
        return;
      }

      setStep(3);
    } catch (err) {
      console.error(err);
      if (err.isOutOfTokens || /insufficient|token|credit|quota|balance|limit|upgrade/i.test(err.message)) {
        setTokenModalMessage(err.message);
        setIsTokenModalOpen(true);
      } else {
        setError(err.message || 'Failed to load stored resume.');
      }
    } finally {
      setIsLoading(false);
      setStatus('Upload PDF');
    }
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  }, [creationMode]);

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#f4efe6] font-sans text-[#102d47] lg:h-full lg:min-h-0">
      <style>{`
        @media (min-width: 1024px) and (max-height: 860px) {
          .resume-uploader-left-title { font-size: 32px !important; }
          .resume-uploader-left-copy { font-size: 12px !important; line-height: 1.48 !important; }
          .resume-uploader-tagline { font-size: 17px !important; }
          .resume-uploader-main-title { font-size: 33px !important; }
          .resume-uploader-upload-zone { height: 174px !important; }
        }
      `}</style>

      {/* Full workspace background. The actual page content sits above this layer. */}
      <img
        src={resumeUploadBackground}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center lg:object-[52%_center]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(247,243,236,0.08)_0%,rgba(247,243,236,0.16)_35%,rgba(247,243,236,0.42)_66%,rgba(247,243,236,0.16)_100%)]" />

      {isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#061d30]/55 px-4"
          style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
          role="status"
          aria-live="polite"
        >
          <div className="w-full max-w-[440px] overflow-hidden rounded-[22px] border border-[#d8c69e] bg-[#fbf8f1] text-left shadow-[0_28px_90px_rgba(3,20,34,0.38)]">
            <div className="flex items-center gap-4 border-b border-[#e7decd] bg-[#f4eddf] px-6 py-5">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d9b65d] bg-[#0a304b] text-[#efc55e] shadow-[0_8px_20px_rgba(10,48,75,0.18)]">
                <img src={coraPng} alt="" className="h-11 w-11 object-contain" />
                <span className="absolute inset-[-5px] animate-pulse rounded-full border border-[#d9b65d]/35" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#a87520]">Cora AI writing studio</p>
                <h3 className="mt-1 text-[18px] font-extrabold tracking-[-0.025em] text-[#102d47]">{status}</h3>
              </div>
            </div>

            <div className="px-6 py-5">
              <p className="max-w-[360px] text-[13px] font-medium leading-5 text-[#587488]">
              {status.toLowerCase().includes('draft')
                  ? 'Building a focused first draft from your experience, strengths, and professional context.'
                  : 'Reading your resume and identifying the experience that matters most.'}
              </p>

              <div className="mt-5 space-y-2.5">
                {[
                  { label: 'Read resume', complete: status.toLowerCase().includes('draft'), active: !status.toLowerCase().includes('draft') },
                  { label: 'Identify strengths and achievements', complete: status.toLowerCase().includes('draft') },
                  { label: 'Draft executive cover letter', active: status.toLowerCase().includes('draft') },
                ].map((stage, index) => (
                  <div key={stage.label} className={`flex items-center gap-3 rounded-[11px] border px-3.5 py-2.5 ${stage.active ? 'border-[#d9b65d] bg-[#fff9e9]' : 'border-[#dce5ea] bg-white/70'}`}>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${stage.complete ? 'bg-[#1d8062] text-white' : stage.active ? 'bg-[#d9a83d] text-[#102d47]' : 'bg-[#e8eff3] text-[#708a9c]'}`}>
                      {stage.complete ? <Check size={14} strokeWidth={3} /> : stage.active ? <Loader2 size={14} className="animate-spin" /> : index + 1}
                    </span>
                    <span className={`text-[12px] font-bold ${stage.active ? 'text-[#102d47]' : stage.complete ? 'text-[#35596d]' : 'text-[#78909f]'}`}>{stage.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#dfe8ed]" aria-hidden="true">
                <div className="h-full w-2/5 animate-[loading-slide_1.4s_ease-in-out_infinite] rounded-full bg-[#c89531]" />
              </div>
              <p className="mt-3 text-center text-[10.5px] font-semibold text-[#78909f]">Please keep this tab open. Your letter will appear automatically.</p>
            </div>
          </div>
          <style>{`
            @keyframes loading-slide {
              0% { transform: translateX(-110%); }
              100% { transform: translateX(250%); }
            }
            @media (prefers-reduced-motion: reduce) {
              [class*="loading-slide"] { animation: none !important; transform: translateX(75%); }
            }
          `}</style>
        </div>
      )}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[1680px] flex-col gap-5 px-4 py-4 sm:px-6 lg:h-full lg:min-h-0 lg:flex-row lg:gap-8 lg:px-7 lg:py-2 xl:px-8">
        {/* LEFT STORY PANEL */}
        <aside className="relative shrink-0 overflow-hidden rounded-[22px] border border-white/10 bg-[#082a43] px-7 py-6 text-white shadow-[0_24px_70px_rgba(14,35,50,0.16)] lg:h-full lg:w-[380px] lg:px-7 lg:py-5 xl:w-[402px]">
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

          <div className="relative flex h-full flex-col">
            <div>
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[15px] border border-[#f5d88d]/45 bg-[linear-gradient(145deg,#f2c75a,#dca33a)] text-[#0b304a] shadow-[0_12px_26px_rgba(0,0,0,0.18)]">
                <FileText size={27} strokeWidth={1.8} />
              </div>

              <p className="mt-3 text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#efb843]">Resume Upload</p>
              <h1
                className="resume-uploader-left-title mt-2.5 max-w-[320px] text-[36px] font-semibold leading-[1.02] tracking-[-0.035em] text-[#fffdfa]"
                style={{ fontFamily: 'Georgia, Times New Roman, serif' }}
              >
                Turn your experience into <span className="text-[#efb843]">opportunities.</span>
              </h1>
              <p className="resume-uploader-left-copy mt-3 max-w-[320px] text-[13px] font-medium leading-[1.58] text-[#d3e0e9]">
                Upload your resume and let CareerSense extract the key details to craft a tailored, high-impact cover letter.
              </p>
            </div>

            <div className="mt-3 rounded-[17px] border border-[#5f849e]/55 bg-[#0a304a]/72 px-4 py-3 backdrop-blur-[2px]">
              <Feature
                icon={Zap}
                title="Automatic Extraction"
                text="We securely read your resume and extract key information."
              />
              <Feature
                icon={ShieldCheck}
                title="Your Data is Safe"
                text="Your files stay private inside your CareerSense workspace."
              />
              <Feature
                icon={Sparkles}
                title="Get a Tailored Letter"
                text="Move to the next step with your experience ready to use."
                last
              />
            </div>

            <div className="mt-auto pt-3">
              <div className="resume-uploader-tagline mx-auto max-w-[240px] rotate-[-4deg] text-center text-[20px] leading-[1.12] text-[#dce4e9]" style={{ fontFamily: "'Segoe Script', 'Bradley Hand', cursive" }}>
                Same Resume,<br />Bigger Opportunities
              </div>
              <div className="mx-auto mt-2 h-[2px] w-12 rotate-[-7deg] rounded-full bg-[#efb843]" />
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex min-w-0 flex-1 flex-col lg:h-full lg:min-h-0 lg:max-w-[980px] lg:justify-start lg:pt-1">
          <div className="mb-2 shrink-0">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.23em] text-[#b1791e]">
              {creationMode === 'resume-job' ? 'Step 2 of 4' : 'Step 2 of 3'}
            </p>
            <h2
              className="resume-uploader-main-title mt-0.5 text-[34px] font-semibold leading-tight tracking-[-0.035em] text-[#102d47] lg:text-[32px]"
              style={{ fontFamily: 'Georgia, Times New Roman, serif' }}
            >
              Upload Your Resume
            </h2>
            <p className="mt-1 text-[13px] font-medium text-[#24455f]">
              Upload your resume (PDF) or choose from your saved resumes to continue.
            </p>
          </div>

          {/* UPLOAD CARD */}
          <section className="shrink-0 rounded-[19px] border border-[#e5ddd1] bg-white/95 p-3 shadow-[0_18px_55px_rgba(52,48,39,0.11)] backdrop-blur-[3px]">
            <div
              className={`resume-uploader-upload-zone relative flex h-[190px] cursor-pointer flex-col items-center justify-center rounded-[13px] border border-dashed px-6 text-center transition-all duration-200 lg:h-[184px] ${
                isDragging
                  ? 'scale-[1.005] border-[#3b6f91] bg-[#edf5f8]'
                  : error
                    ? 'border-red-300 bg-red-50/80'
                    : 'border-[#b9cfdd] bg-[linear-gradient(180deg,#fbfdff_0%,#f8fbfd_100%)] hover:border-[#6d94ad] hover:bg-[#f4f9fb]'
              }`}
              onClick={() => document.getElementById('resume-upload')?.click()}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <input
                id="resume-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    processFile(file);
                    e.target.value = '';
                  }
                }}
              />

              {isLoading ? (
                <>
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#edf3f7] text-[#133b59]">
                    <Loader2 className="h-7 w-7 animate-spin" />
                  </div>
                  <h3 className="mt-2.5 text-[18px] font-bold tracking-[-0.02em] text-[#102d47]">{status}</h3>
                  <p className="mt-1.5 text-[12px] font-medium text-[#678196]">Keep this tab open while CareerSense prepares the next step.</p>
                </>
              ) : (
                <>
                  <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#edf3f7] text-[#123a59]">
                    <UploadCloud size={29} strokeWidth={1.8} />
                  </div>
                  <h3
                    className="mt-2 text-[18px] font-semibold tracking-[-0.025em] text-[#102d47]"
                    style={{ fontFamily: 'Georgia, Times New Roman, serif' }}
                  >
                    {isDragging ? 'Drop your resume here' : 'Drag & drop your resume here'}
                  </h3>
                  <p className="mt-1 text-[12px] font-medium text-[#6b8498]">Only PDF files (max 5MB)</p>
                  <span className="mt-2.5 inline-flex h-9 min-w-[218px] items-center justify-center gap-2 rounded-[9px] bg-[#0a304b] px-6 text-[12px] font-bold text-white shadow-[0_8px_18px_rgba(10,48,75,0.18)]">
                    <UploadCloud size={15} />
                    Choose PDF File
                  </span>
                  <p className="mt-1.5 text-[10px] font-medium text-[#7f94a4]">or drag and drop your file here</p>
                </>
              )}

              {error && (
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-[10px] border border-red-200 bg-white/95 px-3 py-2 text-left text-[12px] font-bold text-red-600 shadow-sm">
                  <AlertCircle size={15} className="shrink-0" />
                  <span className="line-clamp-2">{error}</span>
                </div>
              )}
            </div>

            <div className="mt-2.5 flex flex-col gap-2 rounded-[10px] border border-[#f0d39c] bg-[#fff7e8] px-4 py-2 text-[10.5px] font-semibold text-[#9a6517] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-2">
                <AlertCircle size={16} className="shrink-0 text-[#bd7e16]" />
                <span>Please upload a text-selectable PDF (not a scanned image).</span>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <FileText size={13} />
                <span>Max file size: 5MB</span>
              </div>
            </div>
          </section>

          {/* SAVED RESUMES */}
          <section className="mt-2 flex min-h-0 flex-1 flex-col rounded-[19px] border border-[#e5ddd1] bg-white/95 p-3 shadow-[0_16px_48px_rgba(52,48,39,0.09)] backdrop-blur-[3px]">
            <div className="mb-2 flex shrink-0 items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <FolderOpen size={20} className="text-[#b47b16]" fill="#b47b16" fillOpacity="0.12" />
                <h3 className="text-[14px] font-extrabold tracking-[-0.01em] text-[#102d47]">Your Saved Resumes</h3>
              </div>
              <p className="hidden text-[11px] font-medium text-[#6f899d] sm:block">Use a previously uploaded resume</p>
            </div>

            {storedResumes.length === 0 ? (
              <div className="flex min-h-[92px] flex-1 items-center justify-center rounded-[12px] border border-dashed border-[#c8d8e3] bg-[#fbfcfd] px-5 text-center">
                <div>
                  <FileText className="mx-auto text-[#7791a4]" size={23} />
                  <p className="mt-2 text-[12px] font-semibold text-[#577287]">No saved resumes yet.</p>
                  <p className="mt-0.5 text-[11px] font-medium text-[#879baa]">Upload a PDF above and it will appear here automatically.</p>
                </div>
              </div>
            ) : (
              <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:#c7d5df_transparent]">
                {storedResumes.map((storedResume) => (
                  <button
                    key={storedResume.id}
                    onClick={() => useStoredResume(storedResume)}
                    className="group flex w-full items-center justify-between gap-4 rounded-[11px] border border-[#d8e2e9] bg-[#fbfdfe] px-3 py-1.5 text-left transition hover:border-[#8fb0c5] hover:bg-white hover:shadow-[0_5px_14px_rgba(38,76,100,0.08)]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px] bg-[#edf3f7] text-[#123a59]">
                        <FileText size={17} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-extrabold text-[#102d47]">{storedResume.name}</p>
                        <p className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-[#7b91a2]">
                          <Clock3 size={10} />
                          Uploaded on {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(storedResume.createdAt))}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[9px] border border-[#d4e0e7] bg-white px-4 text-[11px] font-extrabold text-[#173b57] transition group-hover:border-[#9eb9ca] group-hover:bg-[#f7fafc]">
                      Use Resume
                      <ArrowRight size={13} />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>

      <TokenExhaustedModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        message={tokenModalMessage}
      />
    </div>
  );
};

const Feature = ({ icon: Icon, title, text, last = false }) => (
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

export default ResumeUploader;
