import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const ExecutiveBannerLetterTemplate = ({
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

  const navy = '#0f2943';
  const navy2 = '#173a61';
  const gold = accent || design.color || '#c8a15d';
  const softPanel = '#f3f1ee';

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

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 10.9, 10.5), 11.3),
    lineHeight: Number(design.lineHeight) || 1.42,
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

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white text-slate-900 shadow-xl print:shadow-none"
      style={{
        width: '210mm',
        height: '297mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        padding: '4mm',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div
        className="border border-slate-300 bg-white"
        style={{
          width: '100%',
          height: '289mm',
          minHeight: '289mm',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* TOP BANNER */}
        <header
          className="shrink-0 px-8 text-white"
          style={{
            height: '50mm',
            boxSizing: 'border-box',
            background: `linear-gradient(90deg, #071a2d 0%, ${navy} 35%, ${navy2} 100%)`,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            className="grid w-full items-center"
            style={{ gridTemplateColumns: '1fr 48mm' }}
          >
            <div>
              <p
                className="text-[10.5px] font-black uppercase tracking-[0.26em]"
                style={{ color: gold }}
              >
                {profile.currentJobTitle || 'Chief Executive Officer'}
              </p>

              <h1
                className="mt-2 text-[27px] uppercase leading-tight tracking-[0.12em]"
                style={{
                  color: '#f8f6f0',
                  fontFamily: headingFont,
                }}
              >
                {fullName}
              </h1>

              <div
                className="mt-3 h-[2px] w-28"
                style={{ backgroundColor: gold }}
              />

              {contactItems.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-[9.6px] font-medium text-white">
                  {contactItems.slice(0, 4).map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex items-center gap-2"
                    >
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-black"
                        style={{
                          backgroundColor: `${gold}20`,
                          color: gold,
                          border: `1px solid ${gold}`,
                        }}
                      >
                        {index + 1}
                      </span>

                      <span className="max-w-[44mm] truncate">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative flex justify-end">
              <div
                className="absolute -left-4 top-1/2 h-[42mm] w-px -translate-y-1/2"
                style={{ backgroundColor: `${gold}90` }}
              />

              <div
                className="flex h-[38mm] w-[38mm] items-center justify-center overflow-hidden rounded-full border-[3px] bg-white p-1"
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
                    style={{ backgroundColor: navy }}
                  >
                    {initials}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT GRID */}
        <div
          className="grid min-h-0 flex-1"
          style={{ gridTemplateColumns: '54mm 1fr' }}
        >
          {/* LEFT PANEL */}
          <aside
            className="h-full px-6 py-7"
            style={{
              backgroundColor: softPanel,
              boxSizing: 'border-box',
            }}
          >
            <section>
              <p
                className="text-[9.5px] font-black uppercase tracking-[0.24em]"
                style={{ color: gold }}
              >
                To
              </p>

              <div className="mt-4 text-[10.2px] font-medium leading-5 text-slate-700">
                {hasValue(recipient.name) && (
                  <p className="font-black text-slate-900">{recipient.name}</p>
                )}

                {hasValue(recipient.title) && (
                  <p className="uppercase tracking-[0.06em]">
                    {recipient.title}
                  </p>
                )}

                {hasValue(recipient.company) && (
                  <p className="uppercase tracking-[0.06em]">
                    {recipient.company}
                  </p>
                )}

                {hasValue(recipient.address) && <p>{recipient.address}</p>}
              </div>
            </section>

            <div
              className="mt-8 h-px w-16"
              style={{ backgroundColor: gold }}
            />

            <section className="mt-8">
              <p
                className="text-[32px] leading-none"
                style={{
                  color: `${gold}cc`,
                  fontFamily: headingFont,
                }}
              >
                “
              </p>

              <p
                className="mt-2 text-[13px] italic leading-6 text-slate-700"
                style={{ fontFamily: headingFont }}
              >
                {profile.quote ||
                  'Leadership is not about a title or a designation. It is about impact, influence and inspiration.'}
              </p>
            </section>

            <div
              className="mt-8 h-px w-16"
              style={{ backgroundColor: gold }}
            />
          </aside>

          {/* RIGHT LETTER */}
          <main
            className="h-full px-8 py-7"
            style={{
              boxSizing: 'border-box',
            }}
          >
            <section>
              <p
                className="text-[10px] font-black uppercase tracking-[0.18em]"
                style={{ color: gold }}
              >
                {formattedDate}
              </p>
            </section>

            <section className="mt-6">
              <p
                className="text-[23px] leading-tight"
                style={{
                  color: navy,
                  fontFamily: headingFont,
                  fontWeight: 600,
                }}
              >
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

            <footer className="mt-6">
              <Signature signature={signature} profile={profile} accent={navy} />

              {hasValue(profile.currentJobTitle) && (
                <p className="mt-1 text-[10.5px] font-medium text-slate-700">
                  {profile.currentJobTitle}
                </p>
              )}
            </footer>
          </main>
        </div>

        {/* BOTTOM BAR */}
        <div
          className="relative h-[8mm] w-full shrink-0"
          style={{
            background: `linear-gradient(90deg, #071a2d 0%, ${navy} 45%, ${navy2} 100%)`,
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

export default ExecutiveBannerLetterTemplate;