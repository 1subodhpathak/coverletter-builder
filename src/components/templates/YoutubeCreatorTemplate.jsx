import React from 'react';
import { Body, Signature, getProfilePhoto } from './ProfessionalTemplateParts';

const YoutubeCreatorTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const photo = getProfilePhoto(profile);
  const accentColor = props.accent || design.color || '#dc2626';

  const cleanSkills = skills.filter((skill) => hasValue(skill)).slice(0, 7);

  const contactLine = [
    profile.phone,
    profile.address,
    profile.linkedinPortfolio,
  ]
    .filter((value) => hasValue(value))
    .join(' · ');

  const recipientLine = [recipient.company, recipient.address]
    .filter((value) => hasValue(value))
    .join(' · ');

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.5, 11), 12),
    lineHeight: Number(design.lineHeight) || 1.5,
  };

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled;

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white p-8 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      {/* TOP IMAGE SECTION - SIZE NOT TOUCHED */}
      <section className="overflow-hidden rounded-xl border border-slate-300 bg-slate-100 shadow-sm">
        <div className="relative h-[82mm] bg-slate-900">
          <img
            src={photo}
            alt={`${profile.fullName || 'Profile'} profile`}
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute left-5 top-5 rounded bg-black/65 px-3 py-1.5 text-xs font-black text-white">
            HD
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-5">
            <div className="h-1.5 rounded-full bg-white/30">
              <div
                className="relative h-1.5 w-[62%] rounded-full"
                style={{ backgroundColor: accentColor }}
              >
                <span
                  className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm font-black text-white">
              <span>▶</span>
              <span>▮▮</span>
              <span>1:42 / 10:28</span>
              <span className="ml-auto">HD</span>
              <span>⚙︎</span>
              <span>▢</span>
            </div>
          </div>
        </div>
      </section>

      {/* CREATOR HEADER */}
      <section className="mt-4">
        {cleanSkills.length > 0 && (
          <p
            className="text-[11px] font-black uppercase leading-snug tracking-[0.12em]"
            style={{ color: accentColor }}
          >
            {cleanSkills
              .slice(0, 5)
              .map((skill) => `#${skill.replace(/\s+/g, '')}`)
              .join(' ')}
          </p>
        )}

        {hasValue(profile.fullName) && (
          <h1 className="mt-2 text-[25px] font-black leading-tight tracking-[-0.025em] text-slate-950">
            {profile.fullName}
          </h1>
        )}

        <div className="mt-3 flex items-center gap-3 border-b border-slate-200 pb-4">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-black text-white shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            {(profile.fullName || 'P').charAt(0).toUpperCase()}
          </span>

          <div className="min-w-0 flex-1">
            {hasValue(profile.email) && (
              <p className="truncate text-[12.5px] font-black text-slate-950">
                {profile.email}
              </p>
            )}

            {hasValue(contactLine) && (
              <p className="mt-0.5 truncate text-[11.5px] font-semibold text-slate-500">
                {contactLine}
              </p>
            )}
          </div>

          <span className="rounded-full bg-slate-950 px-4 py-2 text-[11.5px] font-black text-white">
            Subscribe
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-2 text-[11.5px] font-black text-slate-900">
            🔔
          </span>
        </div>
      </section>

      {/* PERFORMANCE CHIPS */}
      <section className="mt-4 flex flex-wrap gap-2 text-[11.5px] font-black text-slate-950">
        <span className="rounded-full bg-slate-100 px-3.5 py-2">
          2.8M views
        </span>
        <span className="rounded-full bg-slate-100 px-3.5 py-2">
          👍 14K
        </span>
        <span className="rounded-full bg-slate-100 px-3.5 py-2">
          Content Strategy
        </span>
        <span className="rounded-full bg-slate-100 px-3.5 py-2">
          Audience Growth
        </span>
      </section>

      {/* LETTER BODY */}
      <main className="mt-5">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
          {(hasValue(recipientLine) || hasValue(recipient.name)) && (
            <div className="mb-4 border-b border-slate-200 pb-3">
              <p className="text-[10.5px] font-black uppercase tracking-[0.18em] text-slate-400">
                Recipient
              </p>

              {hasValue(recipient.name) && (
                <p className="mt-1 text-[12.5px] font-black text-slate-950">
                  {recipient.name}
                </p>
              )}

              {hasValue(recipientLine) && (
                <p className="mt-0.5 text-[12px] font-semibold text-slate-600">
                  {recipientLine}
                </p>
              )}
            </div>
          )}

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

export default YoutubeCreatorTemplate;