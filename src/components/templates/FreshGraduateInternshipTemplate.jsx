// import React from 'react';
// import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

// const FreshGraduateInternshipTemplate = ({
//   body = '',
//   design = {},
//   profile = {},
//   signature = {},
//   recipient = {},
//   skills = [],
//   accent,
//   onUpdateBody,
// }) => {
//   const hasValue = (value) => Boolean(value?.trim?.());

//   const accentColor = accent || design.color || '#2563eb';

//   const visibleSkills = skills
//     .filter((skill) => hasValue(skill))
//     .slice(0, 6);

//   const featuredSkills =
//     visibleSkills.length > 0
//       ? visibleSkills
//       : ['Academic Projects', 'Learning Mindset', 'Teamwork', 'Communication'];

//   const hasContact =
//     hasValue(profile.address) ||
//     hasValue(profile.phone) ||
//     hasValue(profile.email) ||
//     hasValue(profile.linkedinPortfolio);

//   const hasRecipient =
//     hasValue(recipient.name) ||
//     hasValue(recipient.title) ||
//     hasValue(recipient.company) ||
//     hasValue(recipient.address);

//   const showSignature =
//     hasValue(signature.closing) ||
//     hasValue(profile.fullName) ||
//     signature.enabled;

//   const bodyDesign = {
//     ...design,
//     fontFamily:
//       design.fontFamily ||
//       '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
//     fontSize: Math.min(Math.max(Number(design.fontSize) || 11.3, 10.9), 11.8),
//     lineHeight: Number(design.lineHeight) || 1.48,
//   };

//   const formattedDate = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   });

//   return (
//     <div
//       id="cover-letter-preview"
//       className="mx-auto bg-slate-50 text-slate-900 shadow-xl"
//       style={{
//         width: '210mm',
//         minHeight: '297mm',
//         boxSizing: 'border-box',
//         padding: '4mm',
//         fontFamily: bodyDesign.fontFamily,
//         '--graduate-accent': accentColor,
//       }}
//     >
//       <div className="min-h-[291mm] rounded-[20px] border border-slate-200 bg-white px-7 py-6 shadow-sm">
//         <header className="border-b border-slate-200 pb-4">
//           <p
//             className="text-[9.2px] font-black uppercase tracking-[0.2em]"
//             style={{ color: accentColor }}
//           >
//             Cover Letter
//           </p>

//           {hasValue(profile.fullName) && (
//             <h1 className="mt-2 text-[29px] font-black leading-tight tracking-[-0.04em] text-slate-950">
//               {profile.fullName}
//             </h1>
//           )}

//           {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
//             <p className="mt-2 max-w-[150mm] text-[11px] font-semibold leading-4 text-slate-600">
//               {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
//                 .filter((value) => hasValue(value))
//                 .join(' · ')}
//             </p>
//           )}

//           {hasContact && (
//             <div className="mt-3 text-[10.5px] font-semibold leading-4 text-slate-600">
//               <ContactLines profile={profile} />
//             </div>
//           )}
//         </header>

//         <section
//           className="mt-4 grid grid-cols-[34mm_1fr] gap-5 rounded-2xl border px-4 py-3"
//           style={{
//             borderColor: `${accentColor}28`,
//             backgroundColor: `${accentColor}08`,
//           }}
//         >
//           <div className="border-r border-slate-200 pr-4">
//             <p className="mb-1.5 text-[8.8px] font-bold uppercase tracking-[0.14em] text-slate-400">
//               Date
//             </p>

//             <p className="text-[11px] font-semibold leading-4 text-slate-800">
//               {formattedDate}
//             </p>
//           </div>

//           {hasRecipient && (
//             <div>
//               <p
//                 className="mb-1.5 text-[8.8px] font-bold uppercase tracking-[0.14em]"
//                 style={{ color: accentColor }}
//               >
//                 Recipient
//               </p>

//               <div className="text-[11px] font-semibold leading-4 text-slate-700">
//                 {hasValue(recipient.name) && (
//                   <p className="font-bold text-slate-950">{recipient.name}</p>
//                 )}

//                 {(hasValue(recipient.title) || hasValue(recipient.company)) && (
//                   <p>
//                     {[recipient.title, recipient.company]
//                       .filter((value) => hasValue(value))
//                       .join(', ')}
//                   </p>
//                 )}

//                 {hasValue(recipient.address) && (
//                   <p className="text-slate-600">{recipient.address}</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </section>

//         <section className="mt-5 grid grid-cols-3 gap-3">
//           <GraduatePillar
//             title="Projects"
//             body="Highlights academic or personal project work."
//             accentColor={accentColor}
//           />

//           <GraduatePillar
//             title="Potential"
//             body="Shows learning ability and enthusiasm."
//             accentColor={accentColor}
//           />

//           <GraduatePillar
//             title="Fit"
//             body="Connects interests to the role and company."
//             accentColor={accentColor}
//           />
//         </section>

//         <main className="mt-5 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
//           <Body
//             body={body}
//             design={bodyDesign}
//             onUpdateBody={onUpdateBody}
//             className="
//               text-left text-slate-800
//               prose-p:my-1.5
//               prose-p:font-medium
//               prose-p:leading-snug
//               prose-ul:my-1.5
//               prose-li:my-0.5
//               prose-strong:font-semibold
//               prose-strong:text-[var(--graduate-accent)]
//               [&>*:first-child]:mt-0
//               [&>*:last-child]:mb-0
//             "
//           />
//         </main>

//         {featuredSkills.length > 0 && (
//           <section className="mt-5 border-y border-slate-200 py-3">
//             <p
//               className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.14em]"
//               style={{ color: accentColor }}
//             >
//               Relevant Strengths
//             </p>

//             <p className="text-[10.8px] font-semibold leading-4 text-slate-700">
//               {featuredSkills.slice(0, 6).join(' · ')}
//             </p>
//           </section>
//         )}

//         {showSignature && (
//           <footer
//             className="
//               mt-4 border-t border-slate-200 pt-3
//               text-slate-900
//               [&>div]:mt-0
//               [&_img]:h-10
//               [&_p]:text-slate-950
//             "
//           >
//             <Signature signature={signature} profile={profile} accent={accentColor} />
//           </footer>
//         )}
//       </div>
//     </div>
//   );
// };

// const GraduatePillar = ({ title, body, accentColor }) => (
//   <div
//     className="rounded-xl border px-3 py-2.5"
//     style={{
//       borderColor: `${accentColor}24`,
//       backgroundColor: `${accentColor}08`,
//     }}
//   >
//     <p
//       className="text-[9px] font-black uppercase tracking-[0.14em]"
//       style={{ color: accentColor }}
//     >
//       {title}
//     </p>

//     <p className="mt-1.5 text-[9.5px] font-semibold leading-4 text-slate-600">
//       {body}
//     </p>
//   </div>
// );

// export default FreshGraduateInternshipTemplate;


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
  const parts = fullName.trim().split(' ');
  const firstPart = parts.slice(0, -1).join(' ') || fullName;
  const lastPart = parts.length > 1 ? parts.slice(-1).join(' ') : '';

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 11.1, 10.8), 11.5),
    lineHeight: Number(design.lineHeight) || 1.5,
  };

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
        minHeight: '297mm',
        boxSizing: 'border-box',
        padding: '4mm',
        fontFamily: bodyDesign.fontFamily,
      }}
    >
      <div
        className="border border-slate-300 bg-white"
        style={{
          minHeight: '289mm',
          boxSizing: 'border-box',
        }}
      >
        {/* TOP HEADER */}
        <header className="px-8 pb-5 pt-5">
          <div
            className="grid items-center"
            style={{ gridTemplateColumns: '54mm 1fr' }}
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
                      className="flex h-full w-full items-center justify-center rounded-full text-[18px] font-black text-white"
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
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
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

        {/* MAIN GRID */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: '60mm 1fr',
            minHeight: '237mm',
          }}
        >
          {/* LEFT SIDEBAR */}
          <aside className="px-6 py-7" style={{ backgroundColor: softGray }}>
            <section>
              <SidebarHeading gold={gold}>Contact</SidebarHeading>

              <div className="mt-4 space-y-3">
                {contactItems.map((item, index) => (
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

                    <p className="break-words text-[10.2px] font-medium leading-5 text-slate-700">
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
                Expertise
              </SidebarHeading>

              <div className="mt-4 space-y-2.5">
                {expertise.map((item, index) => (
                  <div key={`${item}-${index}`} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: gold }}
                    />

                    <p className="text-[10.2px] font-medium leading-5 text-slate-700">
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
                      className="mt-2 h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: gold }}
                    />

                    <p className="text-[10.2px] font-medium leading-5 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          {/* RIGHT MAIN */}
          <main className="px-8 py-7">
            <section className="grid grid-cols-[1fr_34mm] gap-6">
              <div>
                <p
                  className="text-[10px] font-black uppercase tracking-[0.22em]"
                  style={{ color: gold }}
                >
                  To
                </p>

                <div className="mt-2 text-[10.6px] font-medium leading-5 text-slate-700">
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
                  className="text-[10px] font-black uppercase tracking-[0.22em]"
                  style={{ color: gold }}
                >
                  Date
                </p>

                <p className="mt-2 text-[10.6px] font-medium leading-5 text-slate-700">
                  {formattedDate}
                </p>
              </div>
            </section>

            <section className="mt-8">
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
                  prose-p:my-2.5
                  prose-p:font-medium
                  prose-p:leading-relaxed
                  prose-ul:my-2
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
                <p className="mt-2 text-[10.5px] font-medium text-slate-700">
                  {profile.currentJobTitle}
                </p>
              )}
            </footer>
          </main>
        </div>

        {/* FOOTER BAR */}
        <div
          className="relative h-[8mm]"
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
    className={`text-[10px] font-black uppercase tracking-[0.24em] text-slate-800 ${className}`}
  >
    <span style={{ color: '#233d68' }}>{children}</span>

    <span
      className="mt-3 block h-[2px] w-14"
      style={{ backgroundColor: gold }}
    />
  </p>
);

export default ExecutiveLeadershipClassicTemplate;