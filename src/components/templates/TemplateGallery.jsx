import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import ModernTemplate from './ModernTemplate';
import IvyLeagueTemplate from './IvyLeagueTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import SidebarTemplate from './SidebarTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import ClassicTemplate from './ClassicTemplate';
import CreativeTemplate from './CreativeTemplate';
import ModernColorBlockTemplate from './ModernColorBlockTemplate';
import ArtisticTemplate from './ArtisticTemplate';
import TimelineTemplate from './TimelineTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import { useStore } from '../../store/useStore';
import {
  getTemplateDescription,
  professionalTemplateIds,
  templateCount,
  templateOptions,
} from './templateCatalog';

const sampleProps = {
  body: `
    <p>Dear Hiring Manager,</p>
    <p>I help teams turn complex business problems into clear execution plans. At Northstar Analytics, I partnered with product, sales, and finance leaders to improve reporting accuracy and reduce weekly manual work by 18 hours.</p>
    <p>Your role calls for someone who can combine analytical rigor with stakeholder communication. My background in dashboard design, process improvement, and cross-functional project delivery aligns closely with those needs.</p>
    <ul>
      <li><strong>Reporting:</strong> Built executive dashboards used by 40+ leaders.</li>
      <li><strong>Operations:</strong> Improved monthly close reporting speed by 28%.</li>
      <li><strong>Communication:</strong> Presented insights to senior stakeholders weekly.</li>
    </ul>
    <p>I would welcome the opportunity to discuss how I can contribute to your team.</p>
  `,
  design: {
    fontFamily: '"Manrope", Arial, sans-serif',
    fontSize: 14,
    lineHeight: 1.72,
    margins: 2.25,
    color: '#567C8D',
  },
  profile: {
    fullName: 'POOJA BANSAL',
    email: 'Bansal.Pooja@email.com',
    phone: '+91 98765 43210',
    address: 'Gurugram, India',
    linkedinPortfolio: 'linkedin.com/in/poojabansal',
    photo: null,
    showPhoto: false,
  },
  recipient: {
    name: 'Hiring Manager',
    title: 'Recruiting Team',
    company: 'Synchrony',
    address: 'Hyderabad, India',
  },
  signature: {
    enabled: true,
    text: 'Pooja Bansal',
    image: null,
    font: "'Great Vibes', cursive",
    closing: 'Best regards,',
  },
  skills: ['Business Reporting', 'SQL', 'Power BI', 'Stakeholder Management'],
  onUpdateBody: () => {},
};

const TemplateGallery = ({ title = 'Professional Templates', description = 'Click any template to preview it with sample cover-letter data.' }) => {
  const [selectedId, setSelectedId] = useState('modern');
  const selected = templateOptions.find((template) => template.id === selectedId) || templateOptions[0];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#567C8D]">Templates</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
        </div>
        <div className="rounded-full bg-[#C8D9E6] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#567C8D]">
          {templateOptions.length} templates
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <div className="grid max-h-[900px] gap-4 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-3">
          {templateOptions.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedId(template.id)}
              className={`group overflow-hidden rounded-xl border bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                selectedId === template.id ? 'border-[#567C8D] ring-2 ring-[#567C8D]/15' : 'border-slate-200'
              }`}
            >
              <TemplateFrame id={template.id} scaleClass="scale-[0.28]" />
              <div className="flex items-center justify-between border-t border-slate-100 p-4">
                <div>
                  <p className="font-black text-slate-950">{template.name}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">{template.tag}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-500">Preview</span>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Selected</p>
              <h3 className="text-xl font-black text-slate-950">{selected.name}</h3>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 shadow-sm">{selected.tag}</span>
          </div>
          <TemplateFrame id={selected.id} scaleClass="scale-[0.48] sm:scale-[0.58] xl:scale-[0.52]" tall />
        </div>
      </div>
    </section>
  );
};

export const TemplateShowcase = () => {
  const railRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    railRef.current?.scrollBy({
      left: direction === 'left' ? -420 : 420,
      behavior: 'smooth',
    });
  };

  const openTemplateGallery = () => {
    navigate('/dashboard?view=templates');
  };

  return (
    <section className="overflow-hidden py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#567C8D]">Template library</p>
            <h2 className="cs-display text-3xl font-extrabold leading-tight tracking-tight text-[#2F4156] md:text-3xl">
              Choose from {templateOptions.length} Executive-grade templates
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-[#567C8D]">
              Explore ATS-friendly, Ivy League, boardroom, business, architecture, media, medical, technical, and specialist layouts.
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => scroll('left')} aria-label="Previous templates" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C8D9E6] bg-white text-2xl font-black text-[#2F4156] shadow-sm transition hover:bg-[#C8D9E6]">‹</button>
            <button onClick={() => scroll('right')} aria-label="Next templates" className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C8D9E6] bg-white text-2xl font-black text-[#2F4156] shadow-sm transition hover:bg-[#C8D9E6]">›</button>
          </div>
        </div>

        <div ref={railRef} className="flex snap-x gap-7 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {templateOptions.map((template) => (
            <button key={template.id} type="button" onClick={openTemplateGallery} className="w-[82vw] max-w-[330px] shrink-0 snap-start text-left">
              <div className="overflow-hidden rounded-[28px] border border-[#C8D9E6] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/10">
                <TemplateFrame id={template.id} scaleClass="scale-[0.34]" showcase />
              </div>
              <p className="mt-6 text-center text-sm font-black uppercase tracking-[0.16em] text-[#567C8D]">{template.name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TemplateLibraryPage = () => {
  const [previewId, setPreviewId] = useState(null);
  const [templateSearch, setTemplateSearch] = useState('');
  const previewTemplate = templateOptions.find((template) => template.id === previewId);
  const filteredTemplates = useMemo(() => {
    const query = templateSearch.trim().toLowerCase();

    if (!query) return templateOptions;

    return templateOptions.filter((template) =>
      [template.name, template.tag, template.id, getTemplateDescription(template)]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query))
    );
  }, [templateSearch]);

  return (
    <section className="min-h-[calc(100vh-120px)] rounded-2xl border border-slate-200 bg-[#f7fbfa] p-5 shadow-sm">
      <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#567C8D]">Template Library</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Choose a professional cover letter design</h2>
          <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-500">
            Browse all {templateOptions.length} templates with realistic sample data. Use the preview action to inspect any template at A4 size before choosing it in the builder.
          </p>
        </div>
        <div className="rounded-full bg-[#C8D9E6] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#567C8D]">
          {templateOptions.length} layouts
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={templateSearch}
            onChange={(e) => setTemplateSearch(e.target.value)}
            placeholder="Search templates by name, category, or style"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-[13px] text-slate-900 outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#567C8D]"
          />
        </div>
        <p className="text-[12px] font-semibold text-slate-500">
          Showing {filteredTemplates.length} of {templateOptions.length} templates
        </p>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-white px-6 text-center shadow-sm">
          <Search size={24} className="text-slate-400" />
          <p className="mt-4 text-[15px] font-bold text-slate-900">No templates match that search</p>
          <p className="mt-1 text-[12px] font-medium text-slate-500">Try a name like Ultra, Ivy, Executive, ATS, or Data.</p>
        </div>
      ) : (
      <div className="grid gap-7 xl:grid-cols-2 2xl:grid-cols-3">
        {filteredTemplates.map((template, index) => (
          <article key={template.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex min-h-[118px] items-start justify-between gap-4 border-b border-slate-100 p-6">
              <div>
                <h3 className="text-xl font-black tracking-tight text-slate-950">{template.name}</h3>
                <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-slate-500">
                  {getTemplateDescription(template)}
                </p>
              </div>
              {index < 6 && (
                <span className="shrink-0 rounded-lg bg-emerald-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white shadow-sm">
                  Top Pick
                </span>
              )}
            </div>

            <button
              onClick={() => setPreviewId(template.id)}
              className="block w-full bg-white p-6 text-left"
              aria-label={`Preview ${template.name}`}
            >
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 shadow-inner">
                <TemplateFrame id={template.id} scaleClass="scale-[0.42] sm:scale-[0.48] xl:scale-[0.4]" library />
              </div>
            </button>

            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                <span>1 Column</span>
                <span>·</span>
                <span>{template.tag}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#567C8D] shadow-sm">#{index + 1}</span>
                <span className="h-4 w-4 rounded-full bg-slate-900" />
              </div>
            </div>
          </article>
        ))}
      </div>
      )}

      {previewTemplate && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#567C8D]">Template Preview</p>
                <h3 className="text-lg font-black text-slate-950">{previewTemplate.name}</h3>
              </div>
              <button
                onClick={() => setPreviewId(null)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <div className="mx-auto w-fit origin-top scale-[0.58] sm:scale-[0.72] lg:scale-[0.86] xl:scale-100">
                {renderTemplate(previewTemplate.id)}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const TemplateFrame = ({ id, scaleClass, tall = false, library = false, showcase = false }) => (
  <div className={`relative overflow-hidden bg-slate-100 ${library ? 'h-[420px] sm:h-[520px]' : showcase ? 'h-[390px] sm:h-[430px]' : tall ? 'h-[520px] sm:h-[680px]' : 'h-[260px] sm:h-[300px]'}`}>
    <div className={`pointer-events-none absolute left-1/2 top-4 w-[210mm] origin-top -translate-x-1/2 ${scaleClass}`}>
      {renderTemplate(id)}
    </div>
  </div>
);

export const renderTemplate = (id, overrideProps = {}) => {
  const props = { ...sampleProps, ...overrideProps };

  switch (id) {
    case 'modern': return <ModernTemplate {...props} />;
    case 'ivy': return <IvyLeagueTemplate {...props} />;
    case 'executive': return <ExecutiveTemplate {...props} />;
    case 'sidebar': return <SidebarTemplate {...props} />;
    case 'minimalist': return <MinimalistTemplate {...props} />;
    case 'classic': return <ClassicTemplate {...props} />;
    case 'creative': return <CreativeTemplate {...props} />;
    case 'modern-block': return <ModernColorBlockTemplate {...props} />;
    case 'artistic': return <ArtisticTemplate {...props} />;
    case 'timeline': return <TimelineTemplate {...props} />;
    default:
      if (professionalTemplateIds.includes(id)) {
        return <ProfessionalTemplate {...props} variant={id} />;
      }
      return <ModernTemplate {...props} />;
  }
};

export default TemplateGallery;
