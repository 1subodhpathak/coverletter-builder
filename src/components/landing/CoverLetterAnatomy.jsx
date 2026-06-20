import React, { useState } from 'react';

const CEOCoverLetterAnatomy = () => {
  const [activePoint, setActivePoint] = useState(null);

  const points = [
    {
      id: 1,
      top: '10%',
      left: '-15px',
      title: 'Executive Branding',
      content: 'Position yourself as a Chief Executive immediately. Include a link to your executive portfolio or a summary of your board-level experience.'
    },
    {
      id: 2,
      top: '24%',
      left: '-15px',
      title: 'Strategic Salutation',
      content: 'Address the Chairperson of the Board or the Head of the Search Committee. CEOs are hired by boards; speak to them directly.'
    },
    {
      id: 3,
      top: '36%',
      left: '-15px',
      title: 'The Value Proposition',
      content: 'Lead with high-level impact: EBITDA growth, market expansion, or successful exits. Define your leadership philosophy in one sentence.'
    },
    {
      id: 4,
      top: '52%',
      left: '-15px',
      title: 'The Strategic Pillar',
      content: 'Focus on organizational transformation and P&L mastery. Show how you align culture with commercial objectives to drive shareholder value.'
    },
    {
      id: 5,
      top: '72%',
      left: '-15px',
      title: 'The Executive Mandate',
      content: 'Briefly mention how your vision solves their specific "Pain Point"—be it scaling, a turnaround, or an IPO.'
    },
    {
      id: 6,
      top: '85%',
      left: '-15px',
      title: 'Formal Sign-off',
      content: 'Use professional closings like "Sincerely" or "With respect." CEOs maintain a balance of authority and professional courtesy.'
    }
  ];

  const getHighlightClass = (id) => {
    if (activePoint === id) {
      return "bg-[#F4F7F9] ring-1 ring-slate-200 rounded px-2 -mx-2 transition-all duration-300 shadow-sm relative z-10";
    }
    if (activePoint !== null && activePoint !== id) {
      return "opacity-30 blur-[0.4px] transition-all duration-300";
    }
    return "transition-all duration-300";
  };

  return (
    <section className="bg-[#f8fafc] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black text-[#1e293b] uppercase tracking-[0.3em] mb-3">C-Suite Standards</h2>
          <h3 className="text-4xl font-extrabold text-[#0f172a] mb-4 font-serif">Anatomy of a CEO Cover Letter</h3>
          <p className="text-slate-500 text-lg font-medium leading-8 max-w-1xl mx-auto italic">
            Executive search committees look for vision, fiscal discipline, and cultural stewardship.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-2xl bg-white shadow-2xl shadow-slate-900/20 rounded-sm border-t-8 border-t-slate-800 border border-slate-200 aspect-[1/1.414] p-10 md:p-16 transform transition-all duration-500 font-serif text-slate-800 text-[10px] md:text-sm leading-relaxed">
            
            {/* 1. Executive Header */}
            <div className={`mb-10 flex justify-between items-end border-b pb-6 ${getHighlightClass(1)}`}>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-1">Jordan T. Sterling</h1>
                <p className="text-[#567C8D] font-sans text-xs font-bold uppercase tracking-widest">Chief Executive Officer • Strategic Transformation</p>
              </div>
              <div className="text-right text-[9px] md:text-[11px] text-slate-400 font-sans uppercase leading-tight">
                <p>j.sterling@executive.com</p>
                <p>linkedin.com/in/jsterling</p>
                <p>London, UK</p>
              </div>
            </div>

            {/* 2. Board Contact */}
            <div className={`mb-8 font-sans text-xs ${getHighlightClass(2)}`}>
              <p className="mb-6 text-slate-400 font-semibold">May 14, 2026</p>
              <p className="font-bold text-slate-900">Dr. Helena Vance</p>
              <p>Chair of the Board</p>
              <p>Global Nexus Holdings</p>
              <div className="mt-6 font-bold text-slate-900 text-sm">Dear Dr. Vance and Members of the Board,</div>
            </div>

            {/* 3. The Vision/Value Prop */}
            <div className={`mb-6 text-justify ${getHighlightClass(3)}`}>
              <p>
                Global Nexus Holdings is at a pivotal inflection point. As your organization moves to decentralize its operations, 
                the need for a Chief Executive who can balance <strong>fiscal rigor with aggressive innovation</strong> has never been greater. 
                Over the last decade, I have specialized in scaling mid-cap firms into billion-dollar market leaders, consistently 
                delivering <strong>average EBITDA improvements of 22%</strong> within my first 24 months of tenure.
              </p>
            </div>

            {/* 4. The Strategic Pillar */}
            <div className={`mb-6 text-justify ${getHighlightClass(4)}`}>
              <p className="mb-3">
                During my tenure at Horizon Capstone, I orchestrated a complex turnaround that involved restructuring 
                <strong> $400M in assets</strong> and pivoting the core business model toward a high-margin digital ecosystem. 
                This strategic shift not only saved 1,200 jobs but resulted in a 3.5x valuation increase prior to our successful IPO in 2024.
              </p>
              <p>
                My leadership is built on the principle of <strong>radical transparency</strong>. By aligning the executive suite 
                with the Board’s long-term vision, I ensure that every operational decision serves the ultimate goal of sustainable shareholder value.
              </p>
            </div>

            {/* 5. The Mandate */}
            <div className={`mb-10 text-justify ${getHighlightClass(5)}`}>
              <p>
                I am drawn to Nexus because of your commitment to ESG-driven growth. I am eager to discuss how my experience 
                in international market penetration can facilitate your upcoming expansion into the Southeast Asian markets.
              </p>
            </div>

            {/* 6. Sign-off */}
            <div className={`${getHighlightClass(6)}`}>
              <p className="mb-6">Sincerely,</p>
              <p className="font-bold text-slate-900 border-t border-slate-900 pt-2 inline-block">Jordan T. Sterling</p>
            </div>

            {/* --- INTERACTIVE HOTSPOTS --- */}
            {points.map((p) => (
              <div
                key={p.id}
                className="absolute z-20 group"
                style={{ top: p.top, left: p.left }}
                onMouseEnter={() => setActivePoint(p.id)}
                onMouseLeave={() => setActivePoint(null)}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center 
                  text-sm font-bold shadow-lg cursor-pointer transition-all duration-300
                  ${activePoint === p.id 
                    ? 'bg-slate-900 text-white scale-110 ring-4 ring-slate-900/10' 
                    : 'bg-white text-slate-900 border border-slate-300 hover:border-slate-900'}
                `}>
                  {p.id}
                </div>

                <div className={`
                  absolute left-14 top-1/2 -translate-y-1/2 w-72 bg-white p-5 rounded shadow-2xl border border-slate-100 
                  transition-all duration-300 origin-left z-30 pointer-events-none font-sans
                  ${activePoint === p.id ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4 hidden'}
                `}>
                  <h4 className="text-sm font-black text-slate-900 mb-1 uppercase tracking-tighter">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    {p.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOCoverLetterAnatomy;