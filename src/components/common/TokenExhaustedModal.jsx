import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function TokenExhaustedModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#041524]/75 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-lg overflow-hidden rounded-[24px] border border-[#E2B54B]/35 bg-[linear-gradient(180deg,#092C47_0%,#061E32_100%)] p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.55)] sm:p-7"
        >
          {/* Subtle Background Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#E2B54B]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#1A5B87]/20 blur-3xl" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#C5D6E1] transition hover:bg-white/[0.12] hover:text-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Header Icon */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#E2B54B]/40 bg-[#E2B54B]/15 text-[#F2BD42] shadow-[0_0_20px_rgba(226,181,75,0.25)]">
              <Sparkles size={24} />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E2B54B]/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#E2B54B]">
                <Zap size={11} fill="currentColor" />
                Token Limit Reached
              </span>
              <h3 className="mt-1 font-serif text-[22px] font-bold tracking-tight text-white sm:text-[24px]">
                AI Tokens Finished
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-[13.5px] leading-relaxed text-[#C5D6E1]">
            {message ||
              'You have used all your available AI generation tokens. Upgrade your subscription plan or add tokens to continue generating tailored, executive cover letters.'}
          </p>

          {/* Feature Highlights */}
          <div className="mt-5 space-y-2 rounded-xl border border-white/10 bg-white/[0.04] p-3.5">
            <div className="flex items-center gap-2.5 text-[12.5px] font-medium text-[#DCE8EF]">
              <CheckCircle2 size={16} className="text-[#E2B54B] shrink-0" />
              <span>Higher AI token allocation for unlimited drafts</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12.5px] font-medium text-[#DCE8EF]">
              <CheckCircle2 size={16} className="text-[#E2B54B] shrink-0" />
              <span>Access to all 20+ executive cover letter templates</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12.5px] font-medium text-[#DCE8EF]">
              <CheckCircle2 size={16} className="text-[#E2B54B] shrink-0" />
              <span>Job-specific deep calibration & ATS keyword matching</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-5 text-[13px] font-semibold text-[#DCE8EF] transition hover:bg-white/[0.12] hover:text-white"
            >
              Maybe Later
            </button>
            <a
              href="https://careersenseai.com/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E2B54B] px-6 text-[13px] font-bold text-[#082B45] shadow-[0_4px_16px_rgba(226,181,75,0.35)] transition hover:bg-[#EDC974] active:scale-[0.98]"
            >
              <span>Upgrade Plan &amp; Buy Tokens</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
