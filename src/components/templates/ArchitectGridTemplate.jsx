import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const ArchitectGridTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = props.accent || design.color || '#2563eb';
  const blueprintInk = '#1d3b63';

  const visibleSkills = skills.filter((skill) => hasValue(skill)).slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills.slice(0, 3)
      : ['Solution Design', 'System Architecture', 'Stakeholder Alignment'];

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
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-[#f8fbff] p-[4mm] text-slate-900 shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div className="relative min-h-[289mm] border border-blue-100 bg-[#fbfdff]">
        {/* BLUEPRINT GRID BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 opacity-45 [background-image:linear-gradient(#d7e8ff_1px,transparent_1px),linear-gradient(90deg,#d7e8ff_1px,transparent_1px)] [background-size:7mm_7mm]" />

        <div className="relative z-10 px-[6mm] py-[6mm]">
          {/* HEADER */}
          <header className="grid grid-cols-[minmax(0,1fr)_58mm] items-start gap-5 border-b border-[#1d3b63] pb-4">
            <div className="min-w-0">
              <div
                className="h-1.5 w-20 rounded-full"
                style={{ backgroundColor: accentColor }}
              />

              <p
                className="mt-3 inline-flex bg-blue-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em]"
                style={{ color: accentColor }}
              >
                Portfolio Letter
              </p>

              {hasValue(profile.fullName) && (
                <h1 className="mt-2 text-[27px] font-black uppercase leading-tight tracking-[0.015em] text-[#1d3b63]">
                  {profile.fullName}
                </h1>
              )}

              {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
                <p className="mt-2 max-w-[118mm] text-[10.5px] font-semibold leading-4 text-[#516987]">
                  {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </div>

            {contactParts.length > 0 && (
              <div className="min-w-0 border-l border-blue-300 pl-4 text-right text-[9.5px] font-semibold leading-4 text-[#516987]">
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

          {/* MAIN CARD */}
          <main className="mt-5 rounded-[16px] border border-blue-100 bg-white/95 p-4 shadow-[0_12px_32px_rgba(37,99,235,0.06)]">
            {/* DATE + RECIPIENT */}
            <section className="mb-4 rounded-xl border border-blue-100 bg-[#f6f9ff]/95 px-4 py-3">
              <div className="grid grid-cols-[34mm_1fr] gap-5">
                <div className="border-r border-blue-100 pr-4">
                  <p className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Date
                  </p>

                  <p className="text-[11px] font-bold leading-4 text-[#243b5a]">
                    {formattedDate}
                  </p>
                </div>

                {hasRecipient && (
                  <div>
                    <p
                      className="mb-1.5 text-[8.8px] font-black uppercase tracking-[0.16em]"
                      style={{ color: accentColor }}
                    >
                      Prepared For
                    </p>

                    <div className="text-[10.5px] font-semibold leading-4 text-[#516987]">
                      {hasValue(recipient.name) && (
                        <p className="font-black text-[#1d3b63]">
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
                        <p className="text-[#60718b]">{recipient.address}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            <div className="grid grid-cols-[1fr_42mm] gap-5">
              {/* LETTER */}
              <section>
                <SectionLabel color={blueprintInk}>Letter Blueprint</SectionLabel>

                <div className="mt-3 rounded-xl border border-blue-50 bg-white/95 px-4 py-4">
                  <Body
                    body={props.body}
                    design={bodyDesign}
                    onUpdateBody={props.onUpdateBody}
                    className="
                      text-left text-[#1f344f]
                      prose-p:my-1.5
                      prose-p:font-medium
                      prose-p:leading-snug
                      prose-ul:my-1.5
                      prose-li:my-0.5
                      prose-strong:font-semibold
                      prose-strong:text-[#0f3f93]
                      [&>*:first-child]:mt-0
                      [&>*:last-child]:mb-0
                    "
                  />
                </div>

                {/* SIGNATURE */}
                {showSignature && (
                  <footer
                    className="
                      mt-5 border-t border-blue-100 pt-4
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
              </section>

              {/* SIDEBAR */}
              <aside>
                {featuredSkills.length > 0 && (
                  <section>
                    <SectionLabel color={blueprintInk}>Strengths</SectionLabel>

                    <div className="mt-3 space-y-2">
                      {featuredSkills.map((skill, index) => (
                        <div
                          key={`${skill}-${index}`}
                          className="rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2.5"
                        >
                          <p className="text-[8px] font-black uppercase tracking-[0.14em] text-blue-400">
                            Pillar {index + 1}
                          </p>

                          <p className="mt-1 text-[10.5px] font-black leading-4 text-[#1d3b63]">
                            {skill}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {remainingSkills.length > 0 && (
                  <section className="mt-5 border-t border-blue-100 pt-4">
                    <SectionLabel color={blueprintInk}>Capabilities</SectionLabel>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {remainingSkills.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-full border px-2.5 py-1 text-[8.8px] font-black leading-tight"
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

                <section className="mt-5 border-t border-blue-100 pt-4">
                  <SectionLabel color={blueprintInk}>Project Fit</SectionLabel>

                  <div className="mt-3 text-[9.8px] font-semibold leading-4 text-[#304964]">
                    <p className="rounded-xl bg-blue-50/70 px-3 py-2.5">
                      Clear structure for complex narratives, measurable outcomes,
                      stakeholder context, and architecture-led decisions.
                    </p>
                  </div>
                </section>

                <section className="mt-5 border-t border-blue-100 pt-4">
                  <SectionLabel color={blueprintInk}>Reference</SectionLabel>

                  <p className="mt-3 text-[10px] font-bold leading-4 text-[#516987]">
                    {hasValue(recipient.company)
                      ? recipient.company
                      : 'Target Company'}
                  </p>
                </section>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const SectionLabel = ({ children, color }) => (
  <div className="flex items-center gap-2">
    <span
      className="h-2 w-2 rotate-45"
      style={{ backgroundColor: color }}
    />

    <p
      className="text-[9px] font-black uppercase tracking-[0.18em]"
      style={{ color }}
    >
      {children}
    </p>

    <span className="h-px flex-1 bg-blue-100" />
  </div>
);

export default ArchitectGridTemplate;