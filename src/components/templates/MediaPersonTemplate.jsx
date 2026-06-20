import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const MediaPersonTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#dc2626';

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 8);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 4)
      : ['Storytelling', 'Audience Engagement', 'Editorial Judgment', 'Media Strategy'];

  const remainingSkills = visibleSkills.slice(4);

  const contactParts = [
    profile.email,
    profile.phone,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((value) => hasValue(value));

  const hasRecipient =
    hasValue(recipient.name) ||
    hasValue(recipient.title) ||
    hasValue(recipient.company) ||
    hasValue(recipient.address);

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled;

  const initials = (profile.fullName || 'CL')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.6, 11.1), 11.9),
    lineHeight: Math.min(Number(design.lineHeight) || 1.58, 1.46),
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      {/* HEADER */}
      <header className="grid grid-cols-[1fr_68mm]">
        <div className="px-9 py-8">
          <div
            className="h-1.5 w-20 rounded-full"
            style={{ backgroundColor: accentColor }}
          />

          <p
            className="mt-4 text-[10px] font-black uppercase tracking-[0.18em]"
            style={{ color: accentColor }}
          >
            Cover Letter
          </p>

          {hasValue(profile.fullName) && (
            <h1 className="mt-2 text-[36px] font-black leading-[0.98] tracking-[-0.045em] text-slate-950">
              {profile.fullName}
            </h1>
          )}

          {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
            <p className="mt-3 max-w-[120mm] text-[11.5px] font-semibold leading-4 text-slate-600">
              {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                .filter((value) => hasValue(value))
                .join(' · ')}
            </p>
          )}
        </div>

        <div
          className="px-6 py-7 text-white"
          style={{ backgroundColor: accentColor }}
        >
          <p className="text-[48px] font-black leading-none tracking-[-0.05em]">
            {initials || 'CL'}
          </p>

          <p className="mt-2 text-[9px] font-black uppercase tracking-[0.16em] text-white/70">
            Press Kit
          </p>

          {contactParts.length > 0 && (
            <div className="mt-5 space-y-1.5 text-[10.5px] font-semibold leading-4 text-white/88">
              {contactParts.map((part, index) => (
                <p
                  key={`${part}-${index}`}
                  className="break-words [overflow-wrap:anywhere]"
                >
                  {part}
                </p>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="grid grid-cols-[46mm_1fr] gap-6 px-9 pb-9">
        {/* LEFT SIDEBAR */}
        <aside className="border-t-8 pt-5" style={{ borderColor: accentColor }}>
          {/* DATE + RECIPIENT */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="border-b border-slate-200 pb-3">
              <p className="mb-1.5 text-[9.5px] font-black uppercase tracking-[0.16em] text-slate-400">
                Date
              </p>

              <p className="text-[11.5px] font-bold leading-4 text-slate-800">
                {formattedDate}
              </p>
            </div>

            {hasRecipient && (
              <div className="pt-3">
                <p
                  className="mb-1.5 text-[9.5px] font-black uppercase tracking-[0.16em]"
                  style={{ color: accentColor }}
                >
                  Recipient
                </p>

                <div className="text-[11.5px] font-semibold leading-4 text-slate-700">
                  {hasValue(recipient.company) && (
                    <p className="font-black text-slate-950">
                      {recipient.company}
                    </p>
                  )}

                  {hasValue(recipient.name) && <p>{recipient.name}</p>}

                  {hasValue(recipient.title) && (
                    <p className="text-slate-600">{recipient.title}</p>
                  )}

                  {hasValue(recipient.address) && (
                    <p className="mt-1 text-slate-500">{recipient.address}</p>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* MEDIA FOCUS */}
          {featuredSkills.length > 0 && (
          <section className="mt-6">
              <SidebarTitle accentColor={accentColor}>Media Focus</SidebarTitle>

              <div className="mt-3 space-y-2.5">
                {featuredSkills.map((skill, index) => (
                  <div
                    key={`${skill}-${index}`}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm"
                  >
                    <p className="text-[8.5px] font-black uppercase tracking-[0.14em] text-slate-400">
                      Beat {index + 1}
                    </p>

                    <p className="mt-1 text-[11px] font-black leading-4 text-slate-800">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ADDITIONAL SKILLS */}
          {remainingSkills.length > 0 && (
          <section className="mt-6">
              <SidebarTitle accentColor={accentColor}>Capabilities</SidebarTitle>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {remainingSkills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-full border px-2.5 py-1 text-[9.5px] font-black leading-tight"
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

          {/* NOTE */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5">
            <p
              className="text-[10px] font-black uppercase tracking-[0.18em]"
              style={{ color: accentColor }}
            >
              Editorial Approach
            </p>

            <p className="mt-2 text-[10px] font-semibold leading-4 text-slate-600">
              Clear messaging, audience awareness, strong narrative structure,
              and credible communication across media channels.
            </p>
          </section>
        </aside>

        {/* LETTER BODY */}
        <section className="pt-5">
          <div className="mb-4 flex items-center gap-2.5 border-b border-slate-200 pb-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            <p
              className="text-[10.5px] font-black uppercase tracking-[0.22em]"
              style={{ color: accentColor }}
            >
              Application Story
            </p>
          </div>

          <section className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
            <Body
              body={props.body}
              design={bodyDesign}
              onUpdateBody={props.onUpdateBody}
              className="
                text-left text-slate-800
                prose-p:my-2
                prose-p:font-medium
                prose-p:leading-relaxed
                prose-ul:my-2
                prose-li:my-1
                prose-strong:font-semibold
                prose-strong:text-red-700
                [&>*:first-child]:mt-0
                [&>*:last-child]:mb-0
              "
            />
          </section>

          {/* MEDIA VALUE STRIP */}
          <section className="mt-7 grid grid-cols-3 gap-4">
            <ValuePillar
              title="Story"
              body="Shapes clear narratives."
              accentColor={accentColor}
            />

            <ValuePillar
              title="Audience"
              body="Understands attention and trust."
              accentColor={accentColor}
            />

            <ValuePillar
              title="Impact"
              body="Communicates with purpose."
              accentColor={accentColor}
            />
          </section>

          {/* SIGNATURE - NATURAL FLOW */}
          {showSignature && (
            <footer
              className="
                mt-6 border-t border-slate-200 pt-4
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
        </section>
      </main>
    </div>
  );
};

const SidebarTitle = ({ children, accentColor }) => (
  <p
    className="text-[10.5px] font-black uppercase tracking-[0.2em]"
    style={{ color: accentColor }}
  >
    {children}
  </p>
);

const ValuePillar = ({ title, body, accentColor }) => (
  <div
    className="rounded-2xl border px-4 py-3"
    style={{
      borderColor: `${accentColor}24`,
      backgroundColor: `${accentColor}08`,
    }}
  >
    <p
      className="text-[10px] font-black uppercase tracking-[0.16em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <p className="mt-2 text-[11px] font-semibold leading-5 text-slate-600">
      {body}
    </p>
  </div>
);

export default MediaPersonTemplate;
