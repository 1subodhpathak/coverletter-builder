import React from 'react';
import {
  Body,
  ContactLines,
  Signature,
  getProfilePhoto,
} from './ProfessionalTemplateParts';

const EditorialPhotoTemplate = ({
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

  const accentColor = accent || design.color || '#111827';
  const photo = getProfilePhoto(profile);

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Communication', 'Creative Direction', 'Execution'];

  const remainingSkills = visibleSkills.slice(3);

  const hasContact =
    hasValue(profile.address) ||
    hasValue(profile.phone) ||
    hasValue(profile.email) ||
    hasValue(profile.linkedinPortfolio);

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.4, 10.9), 11.8),
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
      className="mx-auto bg-neutral-100 p-[4mm] text-neutral-950 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        '--editorial-accent': accentColor,
      }}
    >
      <div className="min-h-[289mm] overflow-hidden rounded-[22px] border border-neutral-200 bg-white shadow-sm">
        <div className="grid grid-cols-[55mm_1fr]">
          {/* LEFT EDITORIAL PHOTO PANEL */}
          <aside className="border-r border-neutral-200 bg-neutral-950 px-6 py-6 text-white">
            <p className="text-[8.8px] font-black uppercase tracking-[0.24em] text-white/45">
              Editorial Profile
            </p>

            <div className="mt-4 overflow-hidden rounded-[20px] border border-white/15 bg-white/10 p-1">
              <img
                src={photo}
                alt={`${profile.fullName || 'Profile'} profile`}
                className="h-[42mm] w-full rounded-[16px] object-cover"
              />
            </div>

            {hasValue(profile.fullName) && (
              <h1 className="mt-4 text-[24px] font-black leading-[1.02] tracking-[-0.04em] text-white">
                {profile.fullName}
              </h1>
            )}

            {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
              <p className="mt-3 text-[9.5px] font-black uppercase leading-4 tracking-[0.13em] text-white/58">
                {[profile.currentJobTitle, featuredSkills.slice(0, 2).join(' • ')]
                  .filter((value) => hasValue(value))
                  .join(' · ')}
              </p>
            )}

            <div
              className="mt-4 h-1.5 w-16 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            {hasContact && (
              <section className="mt-6">
                <SidebarTitle>Contact</SidebarTitle>

                <div className="mt-3 text-[10px] font-semibold leading-4 text-white/78 [&_p]:break-words">
                  <ContactLines profile={profile} dark />
                </div>
              </section>
            )}

            {/* DATE */}
            <section className="mt-6 rounded-2xl border border-white/12 bg-white/8 px-3.5 py-3">
              <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/42">
                Date
              </p>

              <p className="mt-1.5 text-[10.5px] font-semibold leading-4 text-white/82">
                {formattedDate}
              </p>
            </section>

            {/* SKILLS */}
            {featuredSkills.length > 0 && (
              <section className="mt-6">
                <SidebarTitle>Editorial Strengths</SidebarTitle>

                <div className="mt-3 space-y-2.5">
                  {featuredSkills.map((skill, index) => (
                    <div
                      key={`${skill}-${index}`}
                      className="rounded-xl border border-white/12 bg-white/8 px-3.5 py-2.5"
                    >
                      <p className="text-[7.8px] font-black uppercase tracking-[0.13em] text-white/35">
                        Focus {index + 1}
                      </p>

                      <p className="mt-1 text-[10.2px] font-black leading-4 text-white">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {remainingSkills.length > 0 && (
              <section className="mt-6">
                <SidebarTitle>Capabilities</SidebarTitle>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {remainingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[8.8px] font-black leading-tight text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </aside>

          {/* RIGHT CONTENT */}
          <main className="px-7 py-6">
            {/* TOP MASTHEAD */}
            <header className="border-b border-neutral-300 pb-4">
              <p
                className="text-[9.2px] font-black uppercase tracking-[0.24em]"
                style={{ color: accentColor }}
              >
                Cover Letter
              </p>

              <h2 className="mt-1.5 max-w-[118mm] text-[26px] font-black leading-tight tracking-[-0.045em] text-neutral-950">
                Application Note
              </h2>

              {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                <p className="mt-1.5 text-[11px] font-semibold leading-4 text-neutral-600">
                  {[recipient.targetRole, recipient.company]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </header>

            {/* RECIPIENT */}
            {hasRecipient && (
              <section className="mt-4 rounded-[18px] border border-neutral-200 bg-neutral-50 px-4 py-3">
                <p
                  className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.18em]"
                  style={{ color: accentColor }}
                >
                  Recipient
                </p>

                <div className="text-[11px] font-semibold leading-4 text-neutral-700">
                  {hasValue(recipient.name) && (
                    <p className="font-black text-neutral-950">
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
                    <p className="mt-0.5 text-neutral-600">{recipient.address}</p>
                  )}
                </div>
              </section>
            )}

            {/* BODY */}
            <section className="mt-4 rounded-[20px] border border-neutral-200 bg-white px-4.5 py-4 shadow-[0_10px_26px_rgba(0,0,0,0.035)]">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-2.5">
                <p className="text-[8.8px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  Letter Body
                </p>

                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
              </div>

              <Body
                body={body}
                design={bodyDesign}
                onUpdateBody={onUpdateBody}
                className="
                  text-left text-neutral-900
                  prose-p:my-1.5
                  prose-p:font-medium
                  prose-p:leading-snug
                  prose-ul:my-1.5
                  prose-li:my-0.5
                  prose-strong:font-semibold
                  prose-strong:text-[var(--editorial-accent)]
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            {/* SIGNATURE */}
            {showSignature && (
              <footer
                className="
                  mt-5 border-t border-neutral-200 pt-4
                  text-neutral-900
                  [&>div]:mt-0
                  [&_img]:h-10
                  [&_p]:text-neutral-950
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
      </div>
    </div>
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[8.8px] font-black uppercase tracking-[0.2em] text-white/45">
    {children}
  </p>
);

export default EditorialPhotoTemplate;