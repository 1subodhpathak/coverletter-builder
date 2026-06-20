import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const ExecutiveLeadershipClassicTemplate = ({
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

  const navy = '#233d68';
  const gold = accent || design.color || '#c9a15d';
  const softGray = '#f3f1ee';

  const fullName = profile.fullName || 'Your Name';

  const profileImage =
    profile.photoUrl ||
    profile.photo ||
    profile.imageUrl ||
    profile.avatarUrl ||
    profile.headshot ||
    '';

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  const parts = fullName.trim().split(' ');
  const firstPart = parts.slice(0, -1).join(' ') || fullName;
  const lastPart = parts.length > 1 ? parts.slice(-1).join(' ') : '';

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 10.85, 10.45), 11.2),
    lineHeight: Number(design.lineHeight) || 1.4,
  };

  const headingFont =
    design.headingFontFamily ||
    '"Cormorant Garamond", "Playfair Display", Georgia, serif';

  const expertise =
    skills.filter((skill) => hasValue(skill)).slice(0, 6).length > 0
      ? skills.filter((skill) => hasValue(skill)).slice(0, 6)
      : [
          'Strategic Leadership',
          'Business Transformation',
          'Revenue Growth',
          'P&L Management',
          'Team Development',
          'Stakeholder Relations',
        ];

  const strengths = [
    'Vision & Strategy',
    'Operational Excellence',
    'Change Leadership',
    'Financial Acumen',
    'Executive Communication',
  ];

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const contactItems = [
    profile.phone,
    profile.email,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((item) => hasValue(item));

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white text-slate-900 shadow-xl print:shadow-none"
      style={{
        width: '210mm',
        height: '297mm',
        minHeight: '297mm',
        maxHeight: '297mm',
        boxSizing: 'border-box',
        padding: '4mm',
        overflow: 'hidden',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div
        className="border border-slate-300 bg-white"
        style={{
          width: '100%',
          height: '289mm',
          minHeight: '289mm',
          maxHeight: '289mm',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* TOP HEADER */}
        <header
          className="shrink-0 px-8"
          style={{
            height: '45mm',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
          }}
        >
          <div
            className="grid w-full items-center"
            style={{ gridTemplateColumns: '50mm 1fr' }}
          >
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3">
                <span className="h-px w-6" style={{ backgroundColor: gold }} />

                <div
                  className="flex h-[31mm] w-[31mm] items-center justify-center overflow-hidden rounded-full border-[2px] bg-white p-1"
                  style={{ borderColor: gold }}
                >
                  {hasValue(profileImage) ? (
                    <img
                      src={profileImage}
                      alt={`${fullName} profile`}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center rounded-full text-[17px] font-black text-white"
                      style={{ backgroundColor: navy }}
                    >
                      {initials}
                    </div>
                  )}
                </div>

                <span className="h-px w-6" style={{ backgroundColor: gold }} />
              </div>
            </div>

            <div className="text-center">
              <h1
                className="text-[31px] uppercase leading-none tracking-[0.12em]"
                style={{
                  color: navy,
                  fontFamily: headingFont,
                }}
              >
                <span>{firstPart}</span>{' '}
                {lastPart && <span style={{ color: gold }}>{lastPart}</span>}
              </h1>

              <div className="mx-auto mt-3 flex items-center justify-center gap-4">
                <div className="h-px w-24" style={{ backgroundColor: gold }} />

                <span className="text-[14px]" style={{ color: gold }}>
                  ◇
                </span>

                <div className="h-px w-24" style={{ backgroundColor: gold }} />
              </div>

              <p
                className="mt-3 text-[10.5px] font-black uppercase tracking-[0.24em]"
                style={{ color: navy }}
              >
                {profile.currentJobTitle || 'Senior Executive Leader'}
              </p>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div
          className="grid min-h-0 flex-1"
          style={{
            gridTemplateColumns: '58mm 1fr',
          }}
        >
          {/* LEFT SIDEBAR */}
          <aside
            className="h-full px-6 py-6"
            style={{
              backgroundColor: softGray,
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            {contactItems.length > 0 && (
              <section>
                <SidebarHeading gold={gold}>Contact</SidebarHeading>

                <div className="mt-4 space-y-3">
                  {contactItems.slice(0, 4).map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex items-start gap-3"
                    >
                      <span
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                        style={{ backgroundColor: navy }}
                      >
                        {index + 1}
                      </span>

                      <p className="break-words text-[9.8px] font-semibold leading-4 text-slate-700">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-7">
              <div
                className="h-px w-full"
                style={{ backgroundColor: `${gold}80` }}
              />

              <SidebarHeading gold={gold} className="mt-5">
                Expertise
              </SidebarHeading>

              <div className="mt-4 space-y-2.5">
                {expertise.slice(0, 6).map((item, index) => (
                  <div key={`${item}-${index}`} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: gold }}
                    />

                    <p className="text-[9.8px] font-semibold leading-4 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-7">
              <div
                className="h-px w-full"
                style={{ backgroundColor: `${gold}80` }}
              />

              <SidebarHeading gold={gold} className="mt-5">
                Core Strengths
              </SidebarHeading>

              <div className="mt-4 space-y-2.5">
                {strengths.map((item, index) => (
                  <div key={`${item}-${index}`} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: gold }}
                    />

                    <p className="text-[9.8px] font-semibold leading-4 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          {/* RIGHT MAIN */}
          <main
            className="h-full px-8 py-7"
            style={{
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <section className="grid grid-cols-[1fr_34mm] gap-6">
              <div>
                <p
                  className="text-[9.5px] font-black uppercase tracking-[0.22em]"
                  style={{ color: gold }}
                >
                  To
                </p>

                <div className="mt-2 text-[10.2px] font-medium leading-5 text-slate-700">
                  {hasValue(recipient.name) && (
                    <p className="font-black text-slate-900">
                      {recipient.name}
                    </p>
                  )}

                  {hasValue(recipient.title) && <p>{recipient.title}</p>}
                  {hasValue(recipient.company) && <p>{recipient.company}</p>}
                  {hasValue(recipient.address) && <p>{recipient.address}</p>}
                </div>
              </div>

              <div>
                <p
                  className="text-[9.5px] font-black uppercase tracking-[0.22em]"
                  style={{ color: gold }}
                >
                  Date
                </p>

                <p className="mt-2 text-[10.2px] font-medium leading-5 text-slate-700">
                  {formattedDate}
                </p>
              </div>
            </section>

            <section className="mt-7">
              <p className="text-[13px] font-black text-slate-900">
                Dear {recipient.name || 'Hiring Manager'},
              </p>

              <div
                className="mt-3 h-[2px] w-10"
                style={{ backgroundColor: gold }}
              />
            </section>

            <section className="mt-5">
              <Body
                body={body}
                design={bodyDesign}
                onUpdateBody={onUpdateBody}
                className="
                  text-left text-slate-800
                  prose-p:my-2
                  prose-p:font-medium
                  prose-p:leading-snug
                  prose-ul:my-1.5
                  prose-li:my-0.5
                  prose-strong:font-semibold
                  prose-strong:text-slate-900
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            <footer className="mt-6 border-t border-slate-200 pt-4">
              <Signature signature={signature} profile={profile} accent={navy} />

              {hasValue(profile.currentJobTitle) && (
                <p className="mt-2 text-[10.5px] font-medium text-slate-700">
                  {profile.currentJobTitle}
                </p>
              )}
            </footer>
          </main>
        </div>

        {/* REAL FOOTER BAR */}
        <div
          className="relative h-[8mm] w-full shrink-0"
          style={{
            background: `linear-gradient(90deg, ${navy} 0%, #2b4b7a 74%, ${navy} 100%)`,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 items-center justify-center border-2 bg-white"
            style={{ borderColor: gold }}
          >
            <div
              className="h-1.5 w-1.5 border"
              style={{ borderColor: gold }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarHeading = ({ children, gold, className = '' }) => (
  <p
    className={`text-[9.5px] font-black uppercase tracking-[0.22em] text-slate-800 ${className}`}
  >
    <span style={{ color: '#233d68' }}>{children}</span>

    <span
      className="mt-3 block h-[2px] w-14"
      style={{ backgroundColor: gold }}
    />
  </p>
);

export default ExecutiveLeadershipClassicTemplate;