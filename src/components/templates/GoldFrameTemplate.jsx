import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const ExecutiveGoldFrameTemplate = ({
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

  const navy = '#123455';
  const navyDark = '#0f2a44';
  const gold = accent || design.color || '#c89a57';
  const softBlue = '#d7e2ea';
  const lightBg = '#fbfaf7';

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

  const names = fullName.trim().split(' ');
  const firstName = names.slice(0, 1).join(' ') || fullName;
  const lastName = names.length > 1 ? names.slice(1).join(' ') : '';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 4);

  const highlights =
    visibleSkills.length > 0
      ? visibleSkills
      : [
          'Strategic Impact',
          'Organizational Growth',
          'Operational Excellence',
          'Leadership Recognition',
        ];

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 10.8, 10.4), 11.2),
    lineHeight: Number(design.lineHeight) || 1.38,
  };

  const headingFont =
    design.headingFontFamily ||
    '"Cormorant Garamond", "Playfair Display", Georgia, serif';

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

  const applicationTitle =
    recipient.targetRole ||
    profile.targetRole ||
    'Application for Executive Role';

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
          display: 'grid',
          gridTemplateColumns: '64mm 1fr',
          overflow: 'hidden',
        }}
      >
        {/* LEFT SIDEBAR */}
        <aside
          className="flex min-h-0 flex-col"
          style={{
            backgroundColor: softBlue,
            boxSizing: 'border-box',
          }}
        >
          {/* PROFILE BLOCK */}
          <section
            className="px-4 pb-4 pt-5 text-white"
            style={{ backgroundColor: navy }}
          >
            <div
              className="mx-auto flex h-[36mm] w-[36mm] items-center justify-center overflow-hidden rounded-full border-[3px] bg-white p-1"
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
                  className="flex h-full w-full items-center justify-center rounded-full text-[18px] font-black text-white"
                  style={{ backgroundColor: navyDark }}
                >
                  {initials}
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <h2 className="text-[14px] font-black leading-5">
                {fullName}
              </h2>

              {hasValue(profile.currentJobTitle) && (
                <p className="mt-1 text-[8.8px] font-semibold uppercase tracking-[0.16em] text-white">
                  {profile.currentJobTitle}
                </p>
              )}
            </div>
          </section>

          {/* CONTACT BLOCK */}
          {contactItems.length > 0 && (
            <section
              className="px-5 py-4 text-white"
              style={{ backgroundColor: navyDark }}
            >
              <SidebarHeading color="#ffffff" accentColor={gold}>
                Contact
              </SidebarHeading>

              <div className="mt-3 space-y-2.5">
                {contactItems.slice(0, 4).map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="border-b border-white/20 pb-2 last:border-b-0 last:pb-0"
                  >
                    <p className="break-words text-[9.5px] font-medium leading-4 text-white">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ACHIEVEMENTS BLOCK */}
          <section className="min-h-0 flex-1 px-5 py-5">
            <div
              className="border bg-white px-4 py-4"
              style={{ borderColor: '#ddd3c3' }}
            >
              <p
                className="text-center text-[9.5px] font-black uppercase tracking-[0.18em]"
                style={{
                  color: navy,
                  fontFamily: headingFont,
                }}
              >
                Achievements
                <br />
                At A Glance
              </p>

              <div
                className="mx-auto mt-3 h-px w-16"
                style={{ backgroundColor: gold }}
              />

              <div className="mt-4 space-y-4">
                {highlights.slice(0, 4).map((item, index) => (
                  <div key={`${item}-${index}`} className="flex gap-3">
                    <div
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                      style={{ backgroundColor: navy }}
                    >
                      {index + 1}
                    </div>

                    <div>
                      <p
                        className="text-[9.2px] font-black uppercase tracking-[0.1em]"
                        style={{ color: navy }}
                      >
                        {item}
                      </p>

                      <p className="mt-1 text-[8.8px] font-medium leading-4 text-slate-600">
                        Executive-level contribution aligned to growth,
                        leadership, and delivery.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* REAL SIDEBAR FOOTER */}
          <div
            className="h-[8mm] shrink-0"
            style={{
              background: `linear-gradient(90deg, ${navy} 0%, #123c65 55%, ${navy} 100%)`,
            }}
          />
        </aside>

        {/* RIGHT CONTENT */}
        <main
          className="flex min-h-0 flex-col px-8 pb-0 pt-6"
          style={{
            backgroundColor: lightBg,
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* NAME HEADER */}
          <header className="shrink-0">
            <div className="relative">
              <div
                className="absolute right-[-18mm] top-[-10mm] h-[42mm] w-[50mm] border-l border-t opacity-70"
                style={{
                  borderColor: `${gold}70`,
                  transform: 'skewX(-25deg)',
                }}
              />

              <h1
                className="relative text-[31px] font-semibold uppercase leading-none tracking-[0.08em]"
                style={{
                  color: navy,
                  fontFamily: headingFont,
                }}
              >
                {firstName}
              </h1>

              {lastName && (
                <h1
                  className="relative mt-1 text-[30px] font-semibold uppercase leading-none tracking-[0.08em]"
                  style={{
                    color: gold,
                    fontFamily: headingFont,
                  }}
                >
                  {lastName}
                </h1>
              )}

              {(hasValue(profile.currentJobTitle) || hasValue(profile.tagline)) && (
                <p
                  className="relative mt-4 text-[10px] font-black uppercase tracking-[0.18em]"
                  style={{ color: navy }}
                >
                  {profile.currentJobTitle || profile.tagline}
                </p>
              )}

              <div
                className="relative mt-3 h-[2px] w-16"
                style={{ backgroundColor: gold }}
              />
            </div>
          </header>

          {/* RECIPIENT + DATE */}
          <section className="mt-5 grid shrink-0 grid-cols-[1fr_34mm] gap-6">
            <div
              className="border-l-2 pl-4"
              style={{ borderColor: `${gold}80` }}
            >
              <p
                className="text-[10px] font-black uppercase tracking-[0.18em]"
                style={{ color: gold }}
              >
                To
              </p>

              <div className="mt-2 text-[10.2px] font-medium leading-5 text-slate-700">
                {hasValue(recipient.name) && (
                  <p className="font-black text-slate-900">{recipient.name}</p>
                )}

                {hasValue(recipient.title) && <p>{recipient.title}</p>}
                {hasValue(recipient.company) && <p>{recipient.company}</p>}
                {hasValue(recipient.address) && <p>{recipient.address}</p>}
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10.2px] font-medium leading-5 text-slate-700">
                {formattedDate}
              </p>

              <div
                className="ml-auto mt-3 h-[2px] w-8"
                style={{ backgroundColor: gold }}
              />
            </div>
          </section>

          {/* APPLICATION TITLE */}
          <section className="mt-5 shrink-0">
            <p
              className="text-[10px] font-black uppercase tracking-[0.12em]"
              style={{ color: gold }}
            >
              Re:
            </p>

            <p className="mt-1 text-[11px] font-black text-slate-900">
              {applicationTitle}
            </p>
          </section>

          {/* BODY */}
          <section className="mt-5 min-h-0 shrink">
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

          {/* SIGNATURE */}
          <footer className="mt-5 shrink-0 border-t border-slate-200 pt-4">
            <Signature signature={signature} profile={profile} accent={navy} />

            {hasValue(profile.currentJobTitle) && (
              <p className="mt-1 text-[10.3px] font-medium text-slate-700">
                {profile.currentJobTitle}
              </p>
            )}
          </footer>

          {/* REAL FOOTER BAR */}
          <div
            className="mt-auto h-[8mm] w-[calc(100%+16mm)] shrink-0 -translate-x-8"
            style={{
              background: `linear-gradient(90deg, ${navy} 0%, #173f67 55%, ${navy} 100%)`,
            }}
          />
        </main>
      </div>
    </div>
  );
};

const SidebarHeading = ({ children, color, accentColor }) => (
  <p
    className="text-[8.5px] font-black uppercase tracking-[0.18em]"
    style={{ color }}
  >
    {children}

    <span
      className="mt-2 block h-[2px] w-12"
      style={{ backgroundColor: accentColor }}
    />
  </p>
);

export default ExecutiveGoldFrameTemplate;