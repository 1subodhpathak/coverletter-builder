import React from 'react';
import { Body, Header, Signature, SkillStrip } from './ProfessionalTemplateParts';

const ProfessionalRoleTemplate = ({ body, design, profile, signature, recipient, skills, onUpdateBody, accent }) => (
  <div id="cover-letter-preview" className="mx-auto bg-white shadow-xl" style={{ width: '210mm', minHeight: '297mm', fontFamily: design.fontFamily }}>
    <div className="h-4" style={{ backgroundColor: accent }} />
    <div className="p-14">
      <Header profile={profile} />
      <div className="mb-8 grid grid-cols-[1fr_0.8fr] gap-8">
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs font-black uppercase tracking-normal text-slate-400">To</p>
          <p className="mt-2 font-black text-slate-900">{recipient.name}</p>
          <p className="text-sm text-slate-500">{recipient.company}</p>
        </div>
        <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: accent }}>
          <div className="h-px w-16 bg-white/60" />
          <p className="mt-2 font-black">{recipient.company}</p>
        </div>
      </div>
      <Body body={body} design={design} onUpdateBody={onUpdateBody} />
      <SkillStrip skills={skills} accent={accent} />
      <Signature signature={signature} profile={profile} accent={accent} />
    </div>
  </div>
);

export default ProfessionalRoleTemplate;
