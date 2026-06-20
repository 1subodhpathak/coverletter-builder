import React from 'react';
import { ArrowRight, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const benefits = ['Executive templates', 'AI resume analysis', 'A4 PDF preview', 'Boardroom-ready language'];

const FinalCTA = () => {
  const navigate = useNavigate();
  const resetBuilder = useStore((state) => state.resetBuilder);

  const openBuilderStart = () => {
    resetBuilder();
    navigate('/builder');
  };

  return (
    <section id="final-cta" className="relative overflow-hidden bg-[#2F4156] py-20 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8D9E6]/80 to-transparent" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_420px] lg:px-8">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 px-0 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#e8d7ad]">
          Ready when you are
          </div>
          <h2 className="cs-display max-w-3xl text-4xl font-extrabold tracking-tight md:text-4xl">
            Build the executive letter that reads like leadership.
          </h2>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-300">
            Start manually for free, or let Grow turn your resume and target role into a sharp, credible executive draft.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {benefits.map((benefit) => (
              <span key={benefit} className="inline-flex items-center gap-2 text-sm font-bold text-slate-300">
                <CheckCircle2 size={18} className="text-[#567C8D]" />
                {benefit}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-[#2F4156]/30 backdrop-blur">
          <div className="rounded-xl bg-white p-5 text-slate-950">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f2f1e9] text-[#242001]">
                <FileText size={22} />
              </div>
              <div>
                <p className="cs-display font-extrabold">CareerSense Builder</p>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Cover letter workspace</p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={openBuilderStart}
                className="flex w-full items-center justify-between rounded-xl bg-[#2F4156] px-5 py-4 text-left text-white transition hover:-translate-y-0.5 hover:bg-[#2F4156]"
              >
                <span className="font-black">Create a cover letter</span>
                <ArrowRight size={19} />
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-slate-800 transition hover:-translate-y-0.5 hover:bg-white"
              >
                <span className="font-black">Open dashboard</span>
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
