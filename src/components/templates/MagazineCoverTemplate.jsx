import React from 'react';
import { Body, Signature, getProfilePhoto } from './ProfessionalTemplateParts';

const MagazineCoverTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const photo = getProfilePhoto(profile);
  const accentColor = props.accent || design.color || '#dc2626';

  const featuredSkills = skills.filter((skill) => hasValue(skill)).slice(0, 7);

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.8, 11.3), 12.4),
    lineHeight: Number(design.lineHeight) || 1.58,
  };

  const hasRecipient =
    hasValue(recipient.name) ||
    hasValue(recipient.title) ||
    hasValue(recipient.company) ||
    hasValue(recipient.address);

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled;

  const formattedYear = new Date().getFullYear();

  const contactItems = [
    {
      label: 'Direct',
      value: profile.phone,
      icon: '☎',
    },
    {
      label: 'Email',
      value: profile.email,
      icon: '✉',
      breakAll: true,
    },
    {
      label: 'Location',
      value: profile.address,
      icon: '●',
    },
    {
      label: 'LinkedIn / Portfolio',
      value: profile.linkedinPortfolio,
      icon: '↗',
      breakAll: true,
    },
  ].filter((item) => hasValue(item.value));

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-[#efefef] p-[6mm] shadow-2xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div className="relative min-h-[285mm] overflow-hidden border border-black/5 bg-white shadow-sm">
        {/* BACKGROUND IMAGE */}
        <img
          src={photo}
          alt={`${profile.fullName || 'Profile'} profile`}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* READABILITY OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/96 via-white/20 to-white/20" />
        <div className="absolute inset-0 bg-white/10" />

        {/* MAIN LAYOUT */}
        <div className="relative grid min-h-[285mm] grid-cols-[1fr_44mm] gap-5 p-6">
          {/* LEFT CONTENT */}
          <main>
            {/* HEADER */}
            <header className="mb-5">
              <div className="flex items-end gap-3">
                <span className="text-[42px] font-black uppercase leading-none tracking-[-0.04em] text-black">
                  Profile
                </span>

                <span
                  className="mb-1 text-[17px] font-black uppercase tracking-[0.24em]"
                  style={{ color: accentColor }}
                >
                  {formattedYear}
                </span>
              </div>

              {hasValue(profile.fullName) && (
                <h1 className="mt-4 max-w-[124mm] text-[38px] font-black uppercase leading-[0.95] tracking-[-0.04em] text-slate-950">
                  {profile.fullName}
                </h1>
              )}

              <div
                className="mt-3 h-[5px] w-24"
                style={{ backgroundColor: accentColor }}
              />

              {(hasValue(profile.headline) ||
                hasValue(profile.currentJobTitle)) && (
                <p className="mt-3 max-w-[118mm] text-[11.5px] font-black uppercase leading-5 tracking-[0.16em] text-slate-600">
                  {profile.headline || profile.currentJobTitle}
                </p>
              )}
            </header>

            {/* LETTER BODY */}
            <section
              className="relative rounded-sm border-l-[5px] shadow-xl"
              style={{ borderColor: accentColor }}
            >
              <div className="absolute inset-0 bg-white/96 backdrop-blur-[3px]" />
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white/98 to-white/92" />

              <div className="relative z-10 p-5">
                {hasRecipient && (
                  <div className="mb-4 border-b border-black/10 pb-3">
                    <p
                      className="text-[10px] font-black uppercase tracking-[0.22em]"
                      style={{ color: accentColor }}
                    >
                      Prepared For
                    </p>

                    <div className="mt-2 text-[12.5px] font-semibold leading-5 text-slate-700">
                      {hasValue(recipient.name) && (
                        <p className="font-black text-slate-950">
                          {recipient.name}
                        </p>
                      )}

                      {hasValue(recipient.title) && <p>{recipient.title}</p>}

                      {hasValue(recipient.company) && (
                        <p className="font-bold text-slate-800">
                          {recipient.company}
                        </p>
                      )}

                      {hasValue(recipient.address) && (
                        <p className="text-slate-600">{recipient.address}</p>
                      )}
                    </div>
                  </div>
                )}

                <Body
                  body={props.body}
                  design={{
                    ...bodyDesign,
                    fontSize: Math.min(bodyDesign.fontSize, 11.7),
                    lineHeight: Math.min(Number(bodyDesign.lineHeight) || 1.58, 1.52),
                  }}
                  onUpdateBody={props.onUpdateBody}
                  className="
                    text-left text-slate-900
                    prose-p:my-2
                    prose-p:font-medium
                    prose-p:leading-relaxed
                    prose-ul:my-2
                    prose-li:my-1
                    prose-strong:font-semibold
                    prose-strong:text-slate-950
                    [&>*:first-child]:mt-0
                    [&>*:last-child]:mb-0
                  "
                />
              </div>
            </section>

            {/* SIGNATURE - NATURAL FLOW */}
            {showSignature && (
              <footer
                className="
                  mt-6 border-t border-black/15 pt-4
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

          {/* RIGHT SIDEBAR */}
          <aside className="border-l border-black/15 pl-4">
            <div className="space-y-5">
              {/* RECIPIENT / COMPANY FEATURE */}
              {hasValue(recipient.company) && (
                <section>
                  <p
                    className="mb-2 text-[9.5px] font-black uppercase tracking-[0.22em]"
                    style={{ color: accentColor }}
                  >
                    Target Company
                  </p>

                  <h2 className="rounded-sm bg-white/85 p-2.5 text-[14px] font-black leading-tight text-slate-900 shadow-md backdrop-blur">
                    {recipient.company}
                  </h2>
                </section>
              )}

              {hasValue(recipient.targetRole) && (
                <section>
                  <p
                    className="mb-2 text-[9.5px] font-black uppercase tracking-[0.22em]"
                    style={{ color: accentColor }}
                  >
                    Target Role
                  </p>

                  <p className="rounded-sm bg-white/85 p-2.5 text-[12px] font-bold leading-5 text-slate-800 shadow-md backdrop-blur">
                    {recipient.targetRole}
                  </p>
                </section>
              )}

              <div className="h-px w-full bg-black/15" />

              {/* SKILLS */}
              {featuredSkills.length > 0 && (
                <section>
                  <p
                    className="mb-2 text-[9.5px] font-black uppercase tracking-[0.22em]"
                    style={{ color: accentColor }}
                  >
                    Core Expertise
                  </p>

                  <ul className="space-y-1.5">
                    {featuredSkills.map((skill, index) => (
                      <li
                        key={`${skill}-${index}`}
                        className="rounded-sm bg-white/85 p-2.5 text-[10px] font-black uppercase leading-tight tracking-[0.06em] text-slate-900 shadow-md backdrop-blur"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* CONTACT */}
            {contactItems.length > 0 && (
              <section className="mt-7">
                <div className="mb-4 h-px w-full bg-black/20" />

                <p
                  className="mb-4 text-[9.5px] font-black uppercase tracking-[0.22em]"
                  style={{ color: accentColor }}
                >
                  Contact
                </p>

                <div className="space-y-4 text-[10px] text-slate-900">
                  {contactItems.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12px]"
                        style={{
                          borderColor: accentColor,
                          color: accentColor,
                        }}
                      >
                        {item.icon}
                      </div>

                      <div className="min-w-0">
                        <p
                          className="mb-1 text-[8.5px] font-black uppercase tracking-[0.18em]"
                          style={{ color: accentColor }}
                        >
                          {item.label}
                        </p>

                        <p
                          className={`font-semibold normal-case leading-tight tracking-normal text-slate-900 ${
                            item.breakAll ? 'break-all' : ''
                          }`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MagazineCoverTemplate;
