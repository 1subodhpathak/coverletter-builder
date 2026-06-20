import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const BoardroomLedgerTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#047857';

  const visibleSkills = (
    skills.length
      ? skills.filter((skill) => hasValue(skill))
      : ['Strategic Planning', 'Operational Controls', 'Financial Forecasting']
  ).slice(0, 6);

  const featuredSkills = visibleSkills.slice(0, 3);
  const remainingSkills = visibleSkills.slice(3);

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

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.3, 10.9), 11.8),
    lineHeight: Number(design.lineHeight) || 1.48,
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
      <div className="px-8 py-7">
        {/* HEADER */}
        <header
          className="grid grid-cols-[minmax(0,1fr)_58mm] gap-6 border-b-4 pb-4"
          style={{ borderColor: accentColor }}
        >
          <div>
            <div
              className="h-1.5 w-20 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            <p
              className="mt-3 text-[9.2px] font-black uppercase tracking-[0.2em]"
              style={{ color: accentColor }}
            >
              Cover Letter
            </p>

            {hasValue(profile.fullName) && (
              <h1 className="mt-2 text-[29px] font-black leading-tight tracking-[-0.035em] text-slate-950">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-2 max-w-[115mm] text-[11px] font-semibold leading-4 text-slate-600">
                {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}
          </div>

          {contactParts.length > 0 && (
            <div className="text-right text-[10px] font-semibold leading-4 text-slate-600">
              {contactParts.map((part, index) => (
                <p
                  key={`${part}-${index}`}
                  className="ml-auto max-w-full break-words [overflow-wrap:anywhere]"
                >
                  {part}
                </p>
              ))}
            </div>
          )}
        </header>

        {/* EXECUTIVE SKILLS LEDGER */}
        {featuredSkills.length > 0 && (
          <section className="my-5 border border-emerald-200">
            <div className="grid grid-cols-3 text-center">
              {featuredSkills.map((skill, index) => (
                <div
                  key={`${skill}-${index}`}
                  className={`px-3 py-3 ${
                    index !== featuredSkills.length - 1
                      ? 'border-r border-emerald-200'
                      : ''
                  }`}
                >
                  <p className="text-[8px] font-black uppercase tracking-[0.15em] text-emerald-600">
                    Focus {index + 1}
                  </p>

                  <p className="mt-1.5 text-[11px] font-black leading-4 text-emerald-950">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* COMPACT DATE + RECIPIENT */}
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/45 px-4 py-3">
          <div className="grid grid-cols-[34mm_1fr] gap-5">
            <div className="border-r border-emerald-100 pr-4">
              <p className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em] text-slate-400">
                Date
              </p>

              <p className="text-[11px] font-bold leading-4 text-slate-800">
                {formattedDate}
              </p>
            </div>

            {hasRecipient && (
              <div>
                <p
                  className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em]"
                  style={{ color: accentColor }}
                >
                  Recipient
                </p>

                <div className="text-[11px] font-semibold leading-4 text-slate-700">
                  {hasValue(recipient.name) && (
                    <p className="font-black text-slate-950">
                      {recipient.name}
                    </p>
                  )}

                  {(hasValue(recipient.title) || hasValue(recipient.company)) && (
                    <p>
                      {[recipient.title, recipient.company]
                        .filter((value) => hasValue(value))
                        .join(', ')}
                    </p>
                  )}

                  {hasValue(recipient.address) && (
                    <p className="text-slate-600">{recipient.address}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* BODY */}
        <main className="mt-5 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
          <Body
            body={props.body}
            design={bodyDesign}
            onUpdateBody={props.onUpdateBody}
            className="
              text-left text-slate-800
              prose-p:my-1.5
              prose-p:font-medium
              prose-p:leading-snug
              prose-ul:my-1.5
              prose-li:my-0.5
              prose-strong:font-semibold
              prose-strong:text-emerald-800
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
            "
          />
        </main>

        {/* LEDGER CAPABILITIES */}
        {remainingSkills.length > 0 && (
          <section className="mt-5 border-y border-emerald-100 py-3">
            <p
              className="mb-2 text-[9px] font-black uppercase tracking-[0.16em]"
              style={{ color: accentColor }}
            >
              Additional Boardroom Capabilities
            </p>

            <div className="flex flex-wrap gap-1.5">
              {remainingSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border px-2.5 py-1 text-[9px] font-black leading-tight"
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

        {/* VALUE PILLARS */}
        <section className="mt-4 grid grid-cols-3 gap-3">
          <LedgerPillar
            title="Controls"
            body="Creates visibility and accountability across operations."
          />

          <LedgerPillar
            title="Forecasting"
            body="Connects financial insight with business decisions."
          />

          <LedgerPillar
            title="Execution"
            body="Turns strategy into measurable outcomes."
          />
        </section>

        {/* SIGNATURE */}
        {showSignature && (
          <footer
            className="
              mt-5 border-t border-emerald-100 pt-4
              text-slate-900
              [&>div]:mt-0
              [&_img]:h-10
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
      </div>
    </div>
  );
};

const LedgerPillar = ({ title, body }) => (
  <div className="rounded-xl border border-emerald-100 bg-emerald-50/55 px-3 py-2.5">
    <p className="text-[9px] font-black uppercase tracking-[0.14em] text-emerald-700">
      {title}
    </p>

    <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default BoardroomLedgerTemplate;