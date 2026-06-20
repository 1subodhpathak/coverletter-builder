import React from 'react';
import {
  Body,
  ContactLines,
  RecipientBlock,
  Signature,
} from './ProfessionalTemplateParts';

const OperationsManagerTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#475569';

  const visibleSkills = (
    skills.length
      ? skills.filter((skill) => hasValue(skill))
      : ['Process Improvement', 'Operational Scaling', 'Execution Discipline']
  ).slice(0, 7);

  const featuredSkills = visibleSkills.slice(0, 3);

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.8, 11.3), 12.5),
    lineHeight: Number(design.lineHeight) || 1.58,
  };

  const hasRecipient =
    hasValue(recipient.name) ||
    hasValue(recipient.title) ||
    hasValue(recipient.company) ||
    hasValue(recipient.address);

  const hasContact =
    hasValue(profile.address) ||
    hasValue(profile.phone) ||
    hasValue(profile.email) ||
    hasValue(profile.linkedinPortfolio);

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled;

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto grid bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        gridTemplateColumns: '68mm 1fr',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside className="bg-slate-100 px-8 py-10">
        <div
          className="h-1.5 w-20 rounded-full"
          style={{ backgroundColor: accentColor }}
        />

        {hasValue(profile.fullName) && (
          <h1 className="mt-6 text-[31px] font-black leading-tight tracking-[-0.03em] text-slate-950">
            {profile.fullName}
          </h1>
        )}

        {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
          <p className="mt-4 text-[11px] font-black uppercase leading-5 tracking-[0.16em] text-slate-500">
            {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
              .filter((value) => hasValue(value))
              .join(' · ')}
          </p>
        )}

        <div
          className="my-8 h-1.5 w-24 rounded-full"
          style={{ backgroundColor: accentColor }}
        />

        {/* CONTACT */}
        {hasContact && (
          <section>
            <SidebarTitle>Contact</SidebarTitle>

            <div className="mt-4 text-[12.5px] font-semibold leading-5 text-slate-600 [&_p]:break-words">
              <ContactLines profile={profile} />
            </div>
          </section>
        )}

        {/* OPERATIONAL STRENGTHS */}
        {featuredSkills.length > 0 && (
          <section className="mt-10">
            <SidebarTitle>Operational Strengths</SidebarTitle>

            <div className="mt-4 space-y-3">
              {featuredSkills.map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className="border border-slate-200 bg-white px-4 py-3 shadow-sm"
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Focus {index + 1}
                  </p>

                  <p className="mt-1 text-[12px] font-black leading-5 text-slate-800">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {visibleSkills.length > 3 && (
          <section className="mt-10">
            <SidebarTitle>Capabilities</SidebarTitle>

            <div className="mt-4 flex flex-wrap gap-2">
              {visibleSkills.slice(3).map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-[10px] font-black leading-tight text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main className="px-12 py-11">
        {/* DATE + RECIPIENT */}
        <section className="grid grid-cols-[1fr_auto] gap-8">
          <div>
            {hasRecipient && (
              <div className="border-l-4 border-slate-300 pl-5">
                <p className="mb-3 text-[10.5px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Recipient
                </p>

                <div className="[&_p]:text-[13px] [&_p]:leading-5">
                  <RecipientBlock recipient={recipient} />
                </div>
              </div>
            )}
          </div>

          <div className="text-right">
            <p className="mb-2 text-[10.5px] font-black uppercase tracking-[0.2em] text-slate-400">
              Date
            </p>

            <p className="text-[13px] font-semibold text-slate-700">
              {formattedDate}
            </p>
          </div>
        </section>

        <div className="my-8 border-t border-slate-300" />

        {/* LETTER BODY */}
        <section>
          <Body
            body={props.body}
            design={bodyDesign}
            onUpdateBody={props.onUpdateBody}
            className="
              text-left text-slate-800
              prose-p:my-2.5
              prose-p:font-medium
              prose-p:leading-relaxed
              prose-ul:my-2.5
              prose-li:my-1.5
              prose-strong:font-semibold
              prose-strong:text-slate-950
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
            "
          />
        </section>

        {/* FULL SKILLS SNAPSHOT */}
        {visibleSkills.length > 0 && (
          <section className="mt-8 border-y border-slate-200 py-4">
            <p className="mb-3 text-[10.5px] font-black uppercase tracking-[0.2em] text-slate-400">
              Execution Capabilities
            </p>

            <div className="flex flex-wrap gap-2">
              {visibleSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border px-3 py-1.5 text-[10.5px] font-black leading-tight"
                  style={{
                    borderColor: `${accentColor}55`,
                    color: accentColor,
                    backgroundColor: `${accentColor}10`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* SIGNATURE - NATURAL FLOW */}
        {showSignature && (
          <footer
            className="
              mt-8 border-t border-slate-200 pt-5
              text-slate-900
              [&>div]:mt-0
              [&_img]:h-12
              [&_p]:text-slate-950
            "
          >
            <Signature
              signature={signature}
              profile={profile}
              accent={accentColor}
            />
          </footer>
        )}
      </main>
    </div>
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[10.5px] font-black uppercase tracking-[0.22em] text-slate-500">
    {children}
  </p>
);

export default OperationsManagerTemplate;