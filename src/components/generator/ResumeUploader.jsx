import React, { useCallback, useState } from 'react';
import { AlertCircle, CheckCircle2, Clock3, FileText, FolderOpen, Loader2, ShieldCheck, UploadCloud } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { extractTextFromPDF, hasUsablePdfText, parseResumeData } from '../../services/pdfService';
import { generateCoverLetter } from '../../services/groqService';
import {
  getDisplayValue,
  sanitizeProfileForCanvas,
  sanitizeRecipientForCanvas,
  sanitizeSignatureForCanvas,
} from '../../utils/manualFields';

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

  const processFile = async (file) => {
    if (!file) return;

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
        setStatus('Grow is drafting your letter');
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
      setError(err.message || 'Failed to read PDF. Please try a different file.');
    } finally {
      setIsLoading(false);
      setStatus('Upload PDF');
    }
  };

  const useStoredResume = async (storedResume) => {
    if (!storedResume?.text) return;

    try {
      setIsLoading(true);
      setError('');
      setStatus('Loading stored resume');

      setFile(null);
      setResumeName(storedResume.name);
      setResumeText(storedResume.text);
      setSkills(storedResume.skills || []);

      if (creationMode === 'resume') {
        setStatus('Grow is drafting your letter');
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
      setError(err.message || 'Failed to load stored resume.');
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
    <div className="min-h-[calc(100vh-80px)] bg-[#F5EFEB] px-5 py-8 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl border border-[#C8D9E6] bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C8D9E6]/55 text-[#2F4156]">
            <FileText size={24} />
          </div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#567C8D]">Grow Resume Analysis</p>
          <h1 className="cs-display mt-3 text-3xl font-black tracking-tight text-[#2F4156]">
            Upload your resume
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#567C8D]">
            Grow extracts your experience, skills, and proof points. For the resume-only path, it creates a polished general letter. For the job-description path, you will add the target role next.
          </p>

          <div className="mt-6 space-y-4">
            <Feature title="Text extraction" text="Reads text from PDF resumes up to 5MB." />
            <Feature title="Profile setup" text="Keeps your manual details separate while extracting only resume experience and skills." />
            <Feature title="AI drafting" text="Resume-only flow opens the editor after Grow drafts the content." />
          </div>

          <div className="mt-7 flex items-start gap-3 rounded-xl border border-[#C8D9E6] bg-[#F5EFEB] p-4 text-sm text-[#2F4156]">
            <ShieldCheck size={18} className="mt-0.5 shrink-0" />
            <p>
              Resume text may be sent to the AI writing service when you use Grow. Use the free scratch builder if you prefer manual writing.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-[#C8D9E6] bg-white p-6 shadow-sm lg:p-8">
          <div className="mb-6">
            <h2 className="cs-display text-2xl font-black text-[#2F4156]">Resume PDF</h2>
            <p className="mt-1 text-sm text-[#567C8D]">Choose a resume from your device or reuse one from stored data sources.</p>
          </div>
          <div className="space-y-5">
            <div
              className={`relative flex min-h-[280px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
                isDragging
                  ? 'scale-[1.01] border-[#567C8D] bg-[#C8D9E6]/50'
                  : error
                    ? 'border-red-300 bg-red-50'
                    : 'border-[#C8D9E6] bg-[#F5EFEB]/60 hover:border-[#567C8D]/50 hover:bg-[#C8D9E6]/25'
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
                onChange={(e) => processFile(e.target.files[0])}
              />

              {isLoading ? (
                <>
                  <Loader2 className="mb-5 h-12 w-12 animate-spin text-[#567C8D]" />
                  <h3 className="text-lg font-black text-[#2F4156]">{status}</h3>
                  <p className="mt-2 max-w-sm text-sm text-[#567C8D]">Keep this tab open while Grow prepares the next step.</p>
                </>
              ) : (
                <>
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#2F4156] shadow-sm">
                    <UploadCloud size={32} />
                  </div>
                  <h3 className="text-lg font-black text-[#2F4156]">
                    {isDragging ? 'Drop your resume here' : 'Click or drag PDF here'}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-[#567C8D]">PDF only. Every uploaded resume is also saved in Data Sources automatically.</p>
                </>
              )}

              {error && (
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2 rounded-lg bg-white p-3 text-left text-sm font-bold text-red-600 shadow-sm">
                  <AlertCircle size={17} />
                  {error}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-[#C8D9E6] bg-[#F5EFEB]/45 p-4">
              <div className="mb-4 flex items-center gap-2">
                <FolderOpen size={18} className="text-[#567C8D]" />
                <div>
                  <h3 className="text-sm font-black text-[#2F4156]">Stored Resumes</h3>
                  <p className="text-xs text-[#567C8D]">Use a resume already saved in Data Sources.</p>
                </div>
              </div>

              {storedResumes.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#C8D9E6] bg-white px-4 py-5 text-center text-sm text-[#567C8D]">
                  No stored resumes yet. Upload one from your laptop or phone to save it here.
                </div>
              ) : (
                <div className="space-y-3">
                  {storedResumes.map((storedResume) => (
                    <button
                      key={storedResume.id}
                      onClick={() => useStoredResume(storedResume)}
                      className="flex w-full items-center justify-between gap-4 rounded-xl border border-[#C8D9E6] bg-white px-4 py-3 text-left shadow-sm transition hover:border-[#567C8D] hover:bg-[#F5EFEB]/70"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-[#2F4156]">{storedResume.name}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-[#567C8D]">
                          <Clock3 size={12} />
                          Saved {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(storedResume.createdAt))}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-lg bg-[#2F4156] px-3 py-1.5 text-xs font-black text-white">
                        Use
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Feature = ({ title, text }) => (
  <div className="flex gap-3">
    <CheckCircle2 className="mt-0.5 shrink-0 text-[#567C8D]" size={18} />
    <div>
      <p className="font-black text-[#2F4156]">{title}</p>
      <p className="mt-1 text-sm leading-6 text-[#567C8D]">{text}</p>
    </div>
  </div>
);

export default ResumeUploader;
