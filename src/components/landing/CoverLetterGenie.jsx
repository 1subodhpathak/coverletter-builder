import React, { useEffect, useState } from 'react';
import { Brain, CheckCircle2, Download, FileText, UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

const workflowSteps = [
  {
    title: 'Upload resume',
    detail: 'Add your existing resume file.',
    badge: 'Step 1',
    icon: UploadCloud,
  },
  {
    title: 'AI analyzes it',
    detail: 'Finds skills, achievements, and role-ready proof points.',
    badge: 'Step 2',
    icon: Brain,
  },
  {
    title: 'Cover letter created',
    detail: 'Gets a polished, editable draft in a professional format.',
    badge: 'Step 3',
    icon: FileText,
  },
  {
    title: 'Export as PDF',
    detail: 'Download a clean application-ready PDF.',
    badge: 'Done',
    icon: Download,
  },
];

const CoverLetterGenie = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % workflowSteps.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#C8D9E6] bg-white p-2 shadow-2xl shadow-[#2F4156]/10 sm:rounded-[18px] sm:p-2.5">
      <div className="rounded-xl border border-[#C8D9E6] bg-[#C8D9E6] p-2.5 sm:p-3.5">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.14em] text-[#567C8D] sm:text-[9px]">
          Cover letter builder
        </div>

        <div className="mb-3 border-b border-[#567C8D]/20 pb-3">
          <h3 className="cs-display text-base font-extrabold tracking-tight text-[#2F4156] sm:text-lg">
            Resume to PDF in seconds
          </h3>
          <p className="mt-1 max-w-md text-[11px] font-bold leading-4 text-[#567C8D] sm:text-xs">
            Upload &gt; Analyze &gt; Export. The fastest way to create a cover letter that actually gets noticed.
          </p>
        </div>

        <div className="space-y-2">
          {workflowSteps.map(({ title, detail, badge, icon: Icon }, index) => {
            const isActive = activeStep === index;
            const isDone = activeStep > index;

            return (
              <motion.div
                key={title}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0.86 }}
                transition={{ duration: 0.24 }}
                className={`min-h-[60px] rounded-lg border bg-white p-2 shadow-sm transition ${
                  isActive ? 'border-[#567C8D] shadow-md shadow-[#2F4156]/10' : 'border-white/70'
                }`}
              >
                <div className="grid h-full grid-cols-[28px_minmax(0,1fr)_60px] items-center gap-2">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-md ${
                    isActive ? 'bg-[#2F4156] text-white' : 'bg-[#F5EFEB] text-[#567C8D]'
                  }`}>
                    <Icon size={13} />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-black text-[#2F4156] sm:text-xs">{title}</p>
                    <p className="mt-0.5 line-clamp-2 text-[10px] font-bold leading-3 text-[#567C8D] sm:text-[11px]">{detail}</p>
                  </div>
                  <span className={`inline-flex h-5 w-[60px] items-center justify-center gap-0.5 rounded-full text-[8px] font-black uppercase tracking-wide ${
                    isDone ? 'bg-[#2F4156] text-white' : 'bg-[#C8D9E6] text-[#2F4156]'
                  }`}>
                    <CheckCircle2 size={9} className={isDone ? 'opacity-100' : 'opacity-0'} />
                    {badge}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-3 rounded-lg border border-white/70 bg-white/70 p-2.5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.12em] text-[#567C8D] sm:text-[9px]">Final output</p>
              <p className="mt-0.5 text-[11px] font-black text-[#2F4156] sm:text-xs">Editable draft + PDF download</p>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2F4156] text-white">
              <Download size={13} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenie;
