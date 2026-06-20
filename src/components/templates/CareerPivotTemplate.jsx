// import React from 'react';
// import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

// const CareerPivotTemplate = ({
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

//   const accentColor = accent || design.color || '#7c3aed';

//   const visibleSkills = skills
//     .filter((skill) => hasValue(skill))
//     .slice(0, 6);

//   const featuredSkills =
//     visibleSkills.length > 0
//       ? visibleSkills
//       : ['Transferable Skills', 'Adaptability', 'Problem Solving', 'Fast Learning'];

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
//       className="mx-auto bg-white text-slate-900 shadow-xl"
//       style={{
//         width: '210mm',
//         minHeight: '297mm',
//         boxSizing: 'border-box',
//         padding: '8mm 10mm',
//         fontFamily: bodyDesign.fontFamily,
//         '--pivot-accent': accentColor,
//       }}
//     >
//       <header className="border-b-2 border-slate-900 pb-4">
//         <p
//           className="text-[9.2px] font-black uppercase tracking-[0.2em]"
//           style={{ color: accentColor }}
//         >
//           Career Pivot Cover Letter
//         </p>

//         {hasValue(profile.fullName) && (
//           <h1 className="mt-2 text-[29px] font-black leading-tight tracking-[-0.04em] text-slate-950">
//             {profile.fullName}
//           </h1>
//         )}

//         {(hasValue(profile.currentJobTitle) || featuredSkills.length > 0) && (
//           <p className="mt-2 max-w-[155mm] text-[11px] font-semibold leading-4 text-slate-600">
//             {[profile.currentJobTitle, featuredSkills.slice(0, 3).join(' • ')]
//               .filter((value) => hasValue(value))
//               .join(' · ')}
//           </p>
//         )}

//         {hasContact && (
//           <div className="mt-3 text-[10.5px] font-semibold leading-4 text-slate-600 [&_p]:break-words">
//             <ContactLines profile={profile} />
//           </div>
//         )}
//       </header>

//       <section className="mt-4 grid grid-cols-[34mm_1fr] gap-5 border-b border-slate-200 pb-3">
//         <div className="border-r border-slate-200 pr-4">
//           <p className="mb-1.5 text-[8.8px] font-bold uppercase tracking-[0.14em] text-slate-400">
//             Date
//           </p>

//           <p className="text-[11px] font-semibold leading-4 text-slate-800">
//             {formattedDate}
//           </p>
//         </div>

//         {hasRecipient && (
//           <div>
//             <p
//               className="mb-1.5 text-[8.8px] font-bold uppercase tracking-[0.14em]"
//               style={{ color: accentColor }}
//             >
//               Recipient
//             </p>

//             <div className="text-[10.8px] font-semibold leading-4 text-slate-700">
//               {hasValue(recipient.name) && (
//                 <p className="font-bold text-slate-950">{recipient.name}</p>
//               )}

//               {(hasValue(recipient.title) || hasValue(recipient.company)) && (
//                 <p>
//                   {[recipient.title, recipient.company]
//                     .filter((value) => hasValue(value))
//                     .join(', ')}
//                 </p>
//               )}

//               {hasValue(recipient.address) && (
//                 <p className="text-slate-600">{recipient.address}</p>
//               )}
//             </div>
//           </div>
//         )}
//       </section>

//       <section
//         className="mt-5 rounded-xl border px-4 py-3"
//         style={{
//           borderColor: `${accentColor}30`,
//           backgroundColor: `${accentColor}08`,
//         }}
//       >
//         <p
//           className="text-[9px] font-black uppercase tracking-[0.16em]"
//           style={{ color: accentColor }}
//         >
//           Transition Focus
//         </p>

//         <p className="mt-1.5 text-[10.5px] font-semibold leading-4 text-slate-700">
//           Highlights transferable strengths, relevant achievements, and why this
//           candidate is ready for a new direction.
//         </p>
//       </section>

//       <main className="mt-5 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_26px_rgba(15,23,42,0.035)]">
//         <Body
//           body={body}
//           design={bodyDesign}
//           onUpdateBody={onUpdateBody}
//           className="
//             text-left text-slate-800
//             prose-p:my-1.5
//             prose-p:font-medium
//             prose-p:leading-snug
//             prose-ul:my-1.5
//             prose-li:my-0.5
//             prose-strong:font-semibold
//             prose-strong:text-[var(--pivot-accent)]
//             [&>*:first-child]:mt-0
//             [&>*:last-child]:mb-0
//           "
//         />
//       </main>

//       {featuredSkills.length > 0 && (
//         <section className="mt-5 border-y border-slate-200 py-3">
//           <p
//             className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.14em]"
//             style={{ color: accentColor }}
//           >
//             Transferable Strengths
//           </p>

//           <p className="text-[10.8px] font-semibold leading-4 text-slate-700">
//             {featuredSkills.slice(0, 6).join(' · ')}
//           </p>
//         </section>
//       )}

//       {showSignature && (
//         <footer
//           className="
//             mt-5 border-t border-slate-200 pt-4
//             text-slate-900
//             [&>div]:mt-0
//             [&_img]:h-10
//             [&_p]:text-slate-950
//           "
//         >
//           <Signature signature={signature} profile={profile} accent={accentColor} />
//         </footer>
//       )}
//     </div>
//   );
// };

// export default CareerPivotTemplate;

import React from 'react';
import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

const CareerPivotTemplate = ({
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

  const accentColor = accent || design.color || '#7895a5';
  const navyColor = '#141c2b';
  const sidebarBg = '#eef1ef';
  const headerBg = '#fbfaf6';
  const profileImage =
    profile.photoUrl ||
    profile.photo ||
    profile.imageUrl ||
    profile.avatarUrl ||
    profile.headshot ||
    '';

  const visibleSkills = skills
    .filter((skill) => hasValue(skill))
    .slice(0, 6);

  const featuredSkills =
    visibleSkills.length > 0
      ? visibleSkills
      : ['Transferable Skills', 'Adaptability', 'Problem Solving', 'Fast Learning'];

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

  const headingFont =
    design.headingFontFamily ||
    '"Cormorant Garamond", "Playfair Display", Georgia, serif';

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 10.9, 10.5), 11.3),
    lineHeight: Number(design.lineHeight) || 1.42,
  };

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

  const applicationHeading = hasValue(recipient.targetRole)
    ? recipient.targetRole
    : 'Career Transition Application';

  const transitionLine =
    hasValue(profile.currentJobTitle) && hasValue(recipient.targetRole)
      ? `${profile.currentJobTitle}  |  ${recipient.targetRole}`
      : profile.currentJobTitle || 'Career Transition & Growth';

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
        '--pivot-accent': accentColor,
      }}
    >
      <div
        className="border border-slate-200 bg-white shadow-sm print:shadow-none"
        style={{
          width: '100%',
          height: '289mm',
          minHeight: '289mm',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* TOP EDITORIAL HEADER */}
        <header
          className="shrink-0 border-b border-slate-200"
          style={{
            backgroundColor: headerBg,
            boxSizing: 'border-box',
          }}
        >
          <div
            className="px-8 pb-5 pt-8"
            style={{
              background: `linear-gradient(90deg, ${headerBg} 0%, ${headerBg} 78%, ${accentColor}28 78%, ${accentColor}28 100%)`,
            }}
          >
            {hasValue(profileImage) && (
              <div className="absolute right-8 top-8">
                <div className="h-[28mm] w-[28mm] overflow-hidden border border-white/70 bg-white shadow-sm">
                  <img
                    src={profileImage}
                    alt={`${profile.fullName || 'Profile'} profile`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            {hasValue(profile.fullName) && (
              <h1
                className={`text-[31px] font-light uppercase leading-none tracking-[0.24em] ${
                  hasValue(profileImage) ? 'max-w-[128mm]' : 'max-w-[165mm]'
                }`}
                style={{
                  color: navyColor,
                  fontFamily: headingFont,
                }}
              >
                {profile.fullName}
              </h1>
            )}

            <p className="mt-4 text-[8.8px] font-black uppercase tracking-[0.32em] text-slate-700">
              {transitionLine}
            </p>

            <div className="mt-4 h-px w-full bg-slate-300" />

            {hasContact && (
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[9px] font-semibold text-slate-600">
                {contactItems.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-black text-slate-700"
                      style={{ backgroundColor: `${accentColor}30` }}
                    >
                      {index + 1}
                    </span>

                    <span className="max-w-[42mm] truncate">{item}</span>

                    {index < contactItems.length - 1 && (
                      <span className="ml-2 h-4 w-px bg-slate-300" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {!hasContact && (
              <div className="mt-3 text-[9.5px] font-semibold text-slate-500">
                <ContactLines profile={profile} />
              </div>
            )}
          </div>
        </header>

        {/* MAIN BODY GRID */}
        <div
          className="grid min-h-0 flex-1"
          style={{
            gridTemplateColumns: '56mm 1fr',
          }}
        >
          {/* LEFT SIDEBAR */}
          <aside
            className="h-full px-7 py-7"
            style={{
              backgroundColor: sidebarBg,
              boxSizing: 'border-box',
            }}
          >
            {hasRecipient && (
              <section>
                <div
                  className="mb-4 h-px w-7"
                  style={{ backgroundColor: accentColor }}
                />

                <SidebarTitle>To</SidebarTitle>

                <div className="mt-3 text-[10.2px] font-medium leading-5 text-slate-800">
                  {hasValue(recipient.name) && (
                    <p className="font-black text-slate-950">
                      {recipient.name}
                    </p>
                  )}

                  {hasValue(recipient.title) && <p>{recipient.title}</p>}
                  {hasValue(recipient.company) && <p>{recipient.company}</p>}

                  {hasValue(recipient.address) && (
                    <p className="text-slate-600">{recipient.address}</p>
                  )}
                </div>
              </section>
            )}

            <section className="mt-7">
              <div className="mb-4 h-px w-14 bg-slate-300" />

              <SidebarTitle>Date</SidebarTitle>

              <p className="mt-3 text-[10.2px] font-semibold leading-5 text-slate-800">
                {formattedDate}
              </p>
            </section>

            {featuredSkills.length > 0 && (
              <section className="mt-7">
                <div className="mb-4 h-px w-14 bg-slate-300" />

                <SidebarTitle>Focus Areas</SidebarTitle>

                <div className="mt-4 space-y-2.5">
                  {featuredSkills.slice(0, 6).map((skill, index) => (
                    <div key={`${skill}-${index}`} className="flex gap-3">
                      <span
                        className="mt-2 h-px w-4 shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />

                      <p className="text-[9.8px] font-medium leading-4 text-slate-700">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-8">
              <p
                className="text-[34px] font-light leading-none"
                style={{
                  color: `${accentColor}70`,
                  fontFamily: headingFont,
                }}
              >
                “
              </p>

              <p
                className="mt-1 text-[12.5px] italic leading-6 text-slate-700"
                style={{
                  fontFamily: headingFont,
                }}
              >
                A career pivot is not a reset. It is a focused next chapter
                built from transferable strength.
              </p>
            </section>

            <div
              className="mt-8 h-[3mm] w-full"
              style={{ backgroundColor: accentColor }}
            />
          </aside>

          {/* RIGHT LETTER CONTENT */}
          <main
            className="h-full px-8 py-7"
            style={{
              boxSizing: 'border-box',
            }}
          >
            <section>
              <p className="text-[8.5px] font-black uppercase tracking-[0.28em] text-slate-700">
                Career Pivot Narrative
              </p>

              <div
                className="mt-3 h-px w-9"
                style={{ backgroundColor: accentColor }}
              />

              <h2
                className="mt-5 text-[20px] font-light uppercase leading-tight tracking-[0.13em]"
                style={{
                  color: navyColor,
                  fontFamily: headingFont,
                }}
              >
                {applicationHeading}
              </h2>

              {(hasValue(recipient.company) || hasValue(profile.currentJobTitle)) && (
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-500">
                  {[recipient.company, profile.currentJobTitle]
                    .filter((value) => hasValue(value))
                    .join('  |  ')}
                </p>
              )}
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
                  prose-strong:text-[var(--pivot-accent)]
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            <section className="mt-5 grid grid-cols-3 gap-3">
              <PivotPillar
                title="Transfer"
                body="Connects past experience to the next role."
                accentColor={accentColor}
              />

              <PivotPillar
                title="Adapt"
                body="Shows readiness to learn and contribute."
                accentColor={accentColor}
              />

              <PivotPillar
                title="Grow"
                body="Frames the move as a strategic next step."
                accentColor={accentColor}
              />
            </section>

            {showSignature && (
              <footer
                className="
                  mt-5 border-t border-slate-200 pt-4
                  text-slate-900
                  [&>div]:mt-0
                  [&_img]:h-9
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
      </div>
    </div>
  );
};

const SidebarTitle = ({ children }) => (
  <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-700">
    {children}
  </p>
);

const PivotPillar = ({ title, body, accentColor }) => (
  <div
    className="border-l-[3px] px-3 py-2"
    style={{
      borderColor: accentColor,
      backgroundColor: `${accentColor}08`,
    }}
  >
    <p
      className="text-[8px] font-black uppercase tracking-[0.15em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <p className="mt-1 text-[8.8px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default CareerPivotTemplate;
