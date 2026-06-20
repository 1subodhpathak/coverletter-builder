import React from 'react';
import { getProfilePhoto } from './ProfessionalTemplateParts';

const ExecutiveTemplate = ({
  body = '',
  design = {},
  profile = {},
  signature = {},
  recipient = {},
  onUpdateBody,
}) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const contactParts = [
    profile.email,
    profile.phone,
    profile.address,
    profile.linkedinPortfolio,
  ].filter((value) => hasValue(value));

  const hasRecipient = [
    recipient.name,
    recipient.title,
    recipient.company,
    recipient.address,
  ].some((value) => hasValue(value));

  const pagePadding = (() => {
    const margin = Number(design.margins);
    if (!Number.isFinite(margin)) return 1.45;
    return Math.min(Math.max(margin, 1.3), 1.7);
  })();

  const accentColor = design.color || '#1e293b';

  const bodyFontSize = Math.min(
    Math.max(Number(design.fontSize) || 12, 11.5),
    12.5
  );

  const bodyLineHeight = Number(design.lineHeight) || 1.58;

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
        fontFamily:
          design.fontFamily ||
          '"Inter", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* HEADER */}
      <header
        className="relative px-10 py-10 text-center text-white"
        style={{ backgroundColor: accentColor }}
      >
        <div className="absolute left-0 top-0 h-1 w-full bg-white/20" />

        <div className="mx-auto mb-5 h-[24mm] w-[24mm] overflow-hidden rounded-full border-4 border-white/30 shadow-sm">
          <img
            src={getProfilePhoto(profile)}
            alt={`${profile.fullName || 'Profile'} profile`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mx-auto mb-5 h-px w-16 bg-white/45" />

        {hasValue(profile.fullName) && (
          <h1 className="text-[36px] font-black leading-tight tracking-[-0.02em]">
            {profile.fullName}
          </h1>
        )}

        {contactParts.length > 0 && (
          <div className="mx-auto mt-5 flex max-w-[172mm] flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase leading-snug tracking-[0.12em] text-white/90">
            {contactParts.map((part, index) => (
              <React.Fragment key={`${part}-${index}`}>
                {index > 0 && <span className="text-white/45">|</span>}
                <span>{part}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT - NATURAL FLOW */}
      <main
        style={{
          padding: `${pagePadding}rem ${pagePadding + 0.2}rem`,
        }}
      >
        {/* DATE + RECIPIENT */}
        <section className="grid grid-cols-[1fr_auto] gap-8">
          <div>
            {hasRecipient && (
              <div
                className="border-l-4 pl-5"
                style={{ borderColor: accentColor }}
              >
                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Recipient
                </p>

                <div className="space-y-0.5 text-[13.5px] leading-snug text-slate-700">
                  {hasValue(recipient.name) && (
                    <p className="font-bold text-slate-950">
                      {recipient.name}
                    </p>
                  )}

                  {hasValue(recipient.title) && (
                    <p className="font-medium text-slate-700">
                      {recipient.title}
                    </p>
                  )}

                  {hasValue(recipient.company) && (
                    <p className="font-bold text-slate-950">
                      {recipient.company}
                    </p>
                  )}

                  {hasValue(recipient.address) && (
                    <p className="text-slate-600">
                      {recipient.address}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="text-right">
            <p className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">
              Date
            </p>

            <p className="text-[13.5px] font-semibold text-slate-800">
              {formattedDate}
            </p>
          </div>
        </section>

        {/* BODY */}
        <section className="mt-8">
          <div
            className="prose max-w-none rounded text-left text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200 prose-p:my-2.5 prose-p:font-medium prose-p:leading-relaxed prose-strong:font-semibold"
            style={{
              fontSize: `${bodyFontSize}px`,
              lineHeight: bodyLineHeight,
              fontFamily: 'inherit',
            }}
            dangerouslySetInnerHTML={{ __html: body }}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={(event) => onUpdateBody?.(event.currentTarget.innerHTML)}
          />
        </section>

        {/* SIGNATURE - NATURAL FLOW, NOT STUCK TO BOTTOM */}
        {(hasValue(signature.closing) ||
          hasValue(profile.fullName) ||
          signature.enabled) && (
          <footer className="mt-9 border-t border-slate-200 pt-5">
            {hasValue(signature.closing) ? (
              <p className="text-[14.5px] font-semibold text-slate-900">
                {signature.closing}
              </p>
            ) : (
              <p className="text-[14.5px] font-semibold text-slate-900">
                Sincerely,
              </p>
            )}

            {signature.enabled && signature.image && (
              <img
                src={signature.image}
                alt={`${profile.fullName || 'Profile'} signature`}
                className="mt-3 h-12 max-w-[170px] object-contain"
              />
            )}

            {signature.enabled && !signature.image && hasValue(signature.text) && (
              <div
                className="mt-3 text-[31px] leading-none"
                style={{
                  fontFamily: signature.font,
                  color: accentColor,
                }}
              >
                {signature.text}
              </div>
            )}

            {hasValue(profile.fullName) && (
              <p className="mt-2 text-[13px] font-bold text-slate-950">
                {profile.fullName}
              </p>
            )}
          </footer>
        )}
      </main>
    </div>
  );
};

export default ExecutiveTemplate;