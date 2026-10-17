import React from 'react';
import { createPortal } from 'react-dom';
import { 
  FileCheck2, 
  FileText, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  X 
} from 'lucide-react';

export default function CoverLetterNextStepsModal({
  isOpen,
  onClose,
  targetRole = '',
  candidateName = '',
  companyName = '',
}) {
  if (!isOpen) return null;

  const roleText = targetRole || 'your target role';
  const roleEncoded = encodeURIComponent(targetRole || '');

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
      {/* Warm Slate-Ink Backdrop */}
      <div
        className="fixed inset-0 bg-[#2F4156]/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card in Warm Paper & Slate Ink Palette */}
      <div 
        className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-[#FFFFFF] border border-[#C8D9E6] p-6 sm:p-8 shadow-2xl transition-all my-auto text-[#2F4156]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cover-letter-next-steps-title"
      >
        {/* Top Accent Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F4156] via-[#567C8D] to-[#C8D9E6]" />

        {/* Subtle Slate-Teal Aura */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#567C8D]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#C8D9E6]/30 blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#C8D9E6] bg-white text-[#2F4156]/70 hover:bg-[#F5EFE6] hover:text-[#2F4156] transition"
          aria-label="Close recommendations"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header with Title and Status Box */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pr-8">
          <div className="flex-1">
            {/* Top pill indicator */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#567C8D]">
              <span className="h-2 w-2 rounded-full bg-[#567C8D]" />
              <span>Cover letter generated successfully</span>
            </div>

            {/* Main Title */}
            <h2
              id="cover-letter-next-steps-title"
              className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#2F4156]"
            >
              {candidateName ? `Your letter is ready, ${candidateName}.` : 'Your cover letter is ready.'}
            </h2>

            {/* Subtitle */}
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              {companyName ? (
                <>Tailored for <strong className="font-bold text-[#2F4156]">{companyName}</strong>. Explore these practical next steps before applying.</>
              ) : (
                <>Tailored to your target role. Explore these practical next steps before applying.</>
              )}
            </p>
          </div>

          {/* Right Status Box */}
          <div className="flex shrink-0 self-start sm:self-auto items-center justify-center rounded-2xl bg-[#F5EFE6] border border-[#C8D9E6] px-6 py-3.5 text-center min-w-[125px]">
            <div>
              <div className="text-3xl font-black text-[#2F4156] leading-none">
                100%
              </div>
              <div className="mt-1.5 text-[9.5px] font-extrabold uppercase tracking-widest text-[#567C8D]">
                Ready to send
              </div>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className="mt-6 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-500">
          <span>Recommended Next Steps</span>
          <span className="text-slate-400 font-semibold normal-case tracking-normal text-xs">3 career tools</span>
        </div>

        {/* Recommendation Cards */}
        <div className="mt-3.5 space-y-3">
          {/* Recommendation 1: ATS Score Checker */}
          <div className="group rounded-2xl border border-[#567C8D]/40 bg-white p-4 sm:p-5 shadow-xs transition hover:border-[#567C8D]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2F4156] text-[#F5EFE6] shadow-xs">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#2F4156]">Audit with ATS Score Checker</span>
                    <span className="rounded-full bg-[#567C8D]/15 px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wide text-[#2F4156] border border-[#567C8D]/30">
                      RECOMMENDED
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-lg">
                    Check your resume match against recruiter criteria to pair with this cover letter.
                  </p>
                </div>
              </div>

              <a
                href={`https://ats.careersenseai.com/${roleEncoded ? `?role=${roleEncoded}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#2F4156] hover:bg-[#567C8D] px-4 py-2.5 text-xs font-bold text-white shadow-xs active:scale-95 transition"
              >
                <span>Run ATS scan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Recommendation 2: AI Resume Builder */}
          <div className="group rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs transition hover:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C8D9E6]/40 text-[#2F4156]">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#2F4156]">Build Matching AI Resume</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wide text-slate-700 border border-slate-200">
                      CAREER TOOL
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-lg">
                    Synchronize your resume accomplishments, tone, and keywords for {roleText}.
                  </p>
                </div>
              </div>

              <a
                href={`https://resume.careersenseai.com/${roleEncoded ? `?role=${roleEncoded}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#2F4156] shadow-xs hover:bg-[#F5EFE6] hover:border-[#567C8D] active:scale-95 transition"
              >
                <span>Open resume builder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Recommendation 3: Career GPS */}
          <div className="group rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 shadow-xs transition hover:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
                  <Compass className="h-5 w-5 text-amber-800" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#2F4156]">Explore your Career GPS</span>
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wide text-amber-800 border border-amber-200/60">
                      FREE CAREER TOOL
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-lg">
                    Understand your career readiness, explore role benchmarks, and plan your next steps.
                  </p>
                </div>
              </div>

              <a
                href="https://careersenseai.com/career-gps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#2F4156] shadow-xs hover:bg-[#F5EFE6] hover:border-[#567C8D] active:scale-95 transition"
              >
                <span>Explore Career GPS</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Helper Note Banner */}
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs text-slate-600">
          <ShieldCheck className="h-4 w-4 shrink-0 text-[#567C8D]" />
          <span>Choose the tools that fit your goals. Your cover letter remains saved in your workspace.</span>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-[#2F4156] hover:underline transition"
          >
            Continue in editor
          </button>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl bg-[#2F4156] hover:bg-[#567C8D] px-5 py-2.5 text-xs font-extrabold text-white shadow-sm active:scale-95 transition"
          >
            Close & continue
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
