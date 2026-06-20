import React from 'react';
import { Body, Signature, getProfilePhoto } from './ProfessionalTemplateParts';

const ExecutiveProfileSidebarTemplate = ({
  body = '',
  design = {},
  profile = {},
  signature = {},
  recipient = {},
  skills = [],
  accent,
  onUpdateBody,
}) => {
  const hasValue = (value) => Boolean(value?.trim?.());
  const photo = getProfilePhoto(profile);

  const navy = '#253b59';
  const gold = accent || design.color || '#bf9250';

  const fullName = profile.fullName || 'Your Name';
  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily || '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.0, 10.7), 11.4),
    lineHeight: Number(design.lineHeight) || 1.48,
  };

  const keyStrengths =
    skills.filter((skill) => hasValue(skill)).slice(0, 6).length > 0
      ? skills.filter((skill) => hasValue(skill)).slice(0, 5)
      : [
          'Strategic Leadership',
          'Business Transformation',
          'Team Development',
          'Innovation & Growth',
          'Stakeholder Engagement',
        ];

  const profileSummary =
    profile.summary ||
    'Strategic and results-driven executive leader with a track record of driving transformation, building high-performing teams, and delivering sustainable growth across complex environments.';

  const contactItems = [
    profile.phone,
    profile.email,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((item) => hasValue(item));

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto overflow-hidden bg-white shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div className="grid min-h-[297mm]" style={{ gridTemplateColumns: '66mm 1fr' }}>
        {/* LEFT DARK SIDEBAR */}
        <aside
          className="relative overflow-hidden px-5 py-6 text-white"
          style={{
            background:
              'radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 25%), linear-gradient(180deg, #1c1f24 0%, #1c2430 35%, #1b2028 100%)',
          }}
        >
          <div className="mx-auto h-[34mm] w-[34mm] rounded-full border-[2px] p-1" style={{ borderColor: gold }}>
            <img src={photo} alt={`${fullName} profile`} className="h-full w-full rounded-full object-cover" />
          </div>

          <section className="mt-5">
            <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: gold }}>
              Executive Profile
            </p>
            <div className="mt-2 h-px w-full" style={{ backgroundColor: `${gold}90` }} />
            <p className="mt-3 text-[9.8px] font-medium leading-5 text-white/90">{profileSummary}</p>
          </section>

          <section className="mt-5">
            <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: gold }}>
              Contact
            </p>
            <div className="mt-2 h-px w-full" style={{ backgroundColor: `${gold}90` }} />
            <div className="mt-3 space-y-3">
              {contactItems.map((item, index) => (
                <div key={`${item}-${index}`} className="flex items-center gap-2.5">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[9px] font-black"
                    style={{ borderColor: gold, color: gold }}
                  >
                    {index + 1}
                  </span>
                  <p className="text-[9.7px] font-medium leading-4 text-white/92 break-words">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-5">
            <p className="text-[10px] font-black uppercase tracking-[0.24em]" style={{ color: gold }}>
              Key Strengths
            </p>
            <div className="mt-2 h-px w-full" style={{ backgroundColor: `${gold}90` }} />
            <div className="mt-3 space-y-2.5">
              {keyStrengths.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="rounded-full border px-3.5 py-2 text-[9.5px] font-medium"
                  style={{
                    borderColor: `${gold}cc`,
                    color: '#f8f6f2',
                    background: 'rgba(37,59,89,0.75)',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <div
            className="absolute bottom-0 left-0 h-[28mm] w-full opacity-30"
            style={{
              background:
                'radial-gradient(circle at left bottom, rgba(191,146,80,0.5), transparent 35%)',
            }}
          />
        </aside>

        {/* RIGHT CONTENT */}
        <main className="relative px-7 pb-7 pt-6">
          <header>
            <h1
              className="text-[34px] uppercase leading-none tracking-[0.11em]"
              style={{
                color: navy,
                fontFamily: '"Cormorant Garamond", Georgia, serif',
              }}
            >
              {fullName}
            </h1>

            <p
              className="mt-2.5 text-[13px] uppercase tracking-[0.16em]"
              style={{
                color: gold,
                fontFamily: '"Inter", Arial, sans-serif',
              }}
            >
              {profile.currentJobTitle || 'Chief Executive Officer'}
            </p>

            <div className="mt-4 h-[2px] w-28" style={{ backgroundColor: navy }} />

            <p className="mt-2.5 text-[9.8px] font-black uppercase tracking-[0.18em]" style={{ color: navy }}>
              {profile.tagline || 'Visionary Leader. Transformative Strategist. Measurable Impact.'}
            </p>
          </header>

          <section className="mt-6">
            <p className="text-[10.5px] font-medium text-slate-700">{formattedDate}</p>
          </section>

          <section className="mt-5 flex gap-4">
            <div className="w-px" style={{ backgroundColor: gold }} />
            <div className="text-[10.3px] font-medium leading-5 text-slate-700">
              {hasValue(recipient.name) && <p className="font-black text-slate-900">{recipient.name}</p>}
              {hasValue(recipient.title) && <p>{recipient.title}</p>}
              {hasValue(recipient.company) && <p>{recipient.company}</p>}
              {hasValue(recipient.address) && <p>{recipient.address}</p>}
            </div>
          </section>

          <section className="mt-6">
            <p className="text-[12px] font-medium text-slate-900">
              Dear {recipient.name || 'Hiring Manager'},
            </p>
          </section>

          <section className="mt-5">
            <Body
              body={body}
              design={bodyDesign}
              onUpdateBody={onUpdateBody}
              className="
                text-left text-slate-800
                prose-p:my-3
                prose-p:font-medium
                prose-p:leading-relaxed
                prose-ul:my-2
                prose-li:my-1
                prose-strong:font-semibold
                prose-strong:text-slate-900
                [&>*:first-child]:mt-0
                [&>*:last-child]:mb-0
              "
            />
          </section>

          <footer className="mt-6">
            <Signature signature={signature} profile={profile} accent={navy} />
            {hasValue(profile.currentJobTitle) && (
              <p className="mt-2 text-[11px] font-medium text-slate-700">{profile.currentJobTitle}</p>
            )}
          </footer>

          <div className="mt-6 border-t pt-4" style={{ borderColor: `${gold}70` }}>
            <div className="flex items-center justify-center gap-3">
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black text-white"
                style={{ backgroundColor: gold }}
              >
                “
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: `${gold}70` }} />
            </div>

            <p
              className="mt-3 text-center text-[10.2px] italic leading-5 text-slate-600"
              style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
            >
              {profile.quote || 'Leadership is not about being in charge. It is about taking care of those in your charge.'}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExecutiveProfileSidebarTemplate;
