// import React from 'react';
// import { Body, ContactLines, Signature } from './ProfessionalTemplateParts';

// const InternalPromotionTransferTemplate = ({
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

//   const accentColor = accent || design.color || '#475569';

//   const visibleSkills = skills
//     .filter((skill) => hasValue(skill))
//     .slice(0, 6);

//   const featuredSkills =
//     visibleSkills.length > 0
//       ? visibleSkills
//       : ['Internal Knowledge', 'Team Impact', 'Process Improvement', 'Leadership Potential'];

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
//         '--internal-accent': accentColor,
//       }}
//     >
//       <header className="border-b-2 border-slate-900 pb-4">
//         <p
//           className="text-[9.2px] font-black uppercase tracking-[0.2em]"
//           style={{ color: accentColor }}
//         >
//           Internal Promotion / Transfer Letter
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

//       <section className="mt-5 grid grid-cols-3 gap-3">
//         <InternalPillar
//           title="Current Impact"
//           body="Shows what the candidate has already contributed."
//           accentColor={accentColor}
//         />

//         <InternalPillar
//           title="Company Knowledge"
//           body="Highlights familiarity with teams and goals."
//           accentColor={accentColor}
//         />

//         <InternalPillar
//           title="Next Step"
//           body="Frames readiness for promotion or transfer."
//           accentColor={accentColor}
//         />
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
//             prose-strong:text-[var(--internal-accent)]
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
//             Internal Strengths
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

// const InternalPillar = ({ title, body, accentColor }) => (
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

// export default InternalPromotionTransferTemplate;

import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const InternalPromotionTransferTemplate = ({
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

  const accentColor = accent || design.color || '#b79a58';
  const navyColor = '#172235';
  const softBg = '#eee9dd';

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
      : [
          'Internal Knowledge',
          'Team Impact',
          'Process Improvement',
          'Leadership Potential',
        ];

  const contactItems = [
    { label: 'Location', value: profile.address },
    { label: 'Phone', value: profile.phone },
    { label: 'Email', value: profile.email },
    { label: 'LinkedIn', value: profile.linkedinPortfolio },
  ].filter((item) => hasValue(item.value));

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
    fontSize: Math.min(Math.max(Number(design.fontSize) || 10.9, 10.5), 11.3),
    lineHeight: Number(design.lineHeight) || 1.42,
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const heroBullets = [
    featuredSkills[0] || 'Internal Knowledge',
    featuredSkills[1] || 'Team Impact',
    featuredSkills[2] || 'Leadership Potential',
  ];

  const applicationHeading = hasValue(recipient.targetRole)
    ? recipient.targetRole
    : 'Promotion Application';

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
        fontFamily: bodyDesign.fontFamily,
        '--internal-accent': accentColor,
      }}
    >
      <div
        className="border border-slate-200 bg-white shadow-sm print:shadow-none"
        style={{
          width: '100%',
          height: '289mm',
          minHeight: '289mm',
          maxHeight: '289mm',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* TOP PREMIUM HEADER */}
        <header
          className="shrink-0 border-b border-slate-200"
          style={{
            pageBreakInside: 'avoid',
            breakInside: 'avoid',
          }}
        >
          <div className="grid" style={{ gridTemplateColumns: '1fr 74mm' }}>
            {/* DARK HEADER SIDE */}
            <div
              className="px-8 py-7"
              style={{
                backgroundColor: navyColor,
              }}
            >
              <p
                className="text-[30px] font-black uppercase leading-none tracking-[-0.045em]"
                style={{ color: '#ffffff' }}
              >
                Internal Promotion
              </p>

              <p
                className="mt-1.5 text-[13px] font-black uppercase tracking-[0.22em]"
                style={{ color: 'rgba(255,255,255,0.82)' }}
              >
                Transfer Letter
              </p>

              <div className="mt-5 space-y-2">
                {heroBullets
                  .filter((item) => hasValue(item))
                  .slice(0, 3)
                  .map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="flex items-center gap-2.5"
                    >
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-black text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        {index + 1}
                      </span>

                      <p
                        className="max-w-[92mm] text-[10.2px] font-black uppercase tracking-[0.09em]"
                        style={{ color: 'rgba(255,255,255,0.9)' }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* RIGHT APPLICATION PANEL */}
            <div
              className="border-l-[5px] px-5 py-7"
              style={{
                backgroundColor: softBg,
                borderLeftColor: accentColor,
              }}
            >
              <p
                className="text-[8.5px] font-black uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Application Focus
              </p>

              <p className="mt-2 text-[15px] font-black uppercase leading-tight tracking-[-0.03em] text-slate-900">
                {applicationHeading}
              </p>

              {(hasValue(recipient.company) || hasValue(profile.currentJobTitle)) && (
                <p className="mt-2 text-[9.5px] font-bold leading-4 text-slate-600">
                  {[recipient.company, profile.currentJobTitle]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}

              <div
                className="mt-5 h-[2px] w-16"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          </div>

          <div
            className="h-[4mm] w-full"
            style={{ backgroundColor: accentColor }}
          />
        </header>

        {/* CONTENT AREA */}
        <div
          className="grid min-h-0 flex-1"
          style={{
            gridTemplateColumns: '62mm 1fr',
            pageBreakInside: 'avoid',
            breakInside: 'avoid',
          }}
        >
          {/* LEFT SIDEBAR */}
          <aside
            className="h-full px-6 pb-6 pt-7"
            style={{
              backgroundColor: softBg,
              boxSizing: 'border-box',
            }}
          >
            {hasValue(profileImage) && (
              <div className="mb-5 flex justify-center">
                <div className="flex h-[32mm] w-[32mm] items-center justify-center overflow-hidden rounded-full border-[5px] border-white bg-white shadow-md">
                  <img
                    src={profileImage}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}

            {hasValue(profile.fullName) && (
              <section className="text-center">
                <h1 className="text-[18px] font-black leading-tight tracking-[-0.03em] text-slate-900">
                  {profile.fullName}
                </h1>

                {hasValue(profile.currentJobTitle) && (
                  <p className="mt-1 text-[9px] font-bold uppercase leading-3 tracking-[0.14em] text-slate-500">
                    {profile.currentJobTitle}
                  </p>
                )}

                <div className="mx-auto mt-3 h-px w-24 bg-slate-300" />
              </section>
            )}

            {contactItems.length > 0 && (
              <section className="mt-6">
                <SidebarTitle>Contact</SidebarTitle>

                <div className="mt-3 space-y-2.5">
                  {contactItems.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="flex gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />

                      <p className="break-words text-[9.4px] font-bold leading-4 tracking-[0.01em] text-slate-700">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-6">
              <SidebarTitle>Application Info</SidebarTitle>

              <div className="mt-3 space-y-3 text-[9.5px] font-semibold leading-4 text-slate-700">
                <div>
                  <p className="text-[7.5px] font-black uppercase tracking-[0.14em] text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-slate-800">{formattedDate}</p>
                </div>

                {hasRecipient && (
                  <div>
                    <p className="text-[7.5px] font-black uppercase tracking-[0.14em] text-slate-400">
                      Recipient
                    </p>

                    <div className="mt-1">
                      {hasValue(recipient.name) && (
                        <p className="font-black text-slate-900">
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

            {featuredSkills.length > 0 && (
              <section className="mt-6">
                <SidebarTitle>Internal Strengths</SidebarTitle>

                <div className="mt-3 space-y-2">
                  {featuredSkills.slice(0, 6).map((skill, index) => (
                    <div key={`${skill}-${index}`} className="flex gap-2">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />

                      <p className="text-[9.5px] font-bold leading-4 text-slate-700">
                        {skill}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div
              className="mt-7 h-[3mm] w-full"
              style={{ backgroundColor: accentColor }}
            />
          </aside>

          {/* MAIN LETTER */}
          <main className="h-full px-7 py-7">
            <section className="border-b border-slate-200 pb-4">
              <p
                className="text-[8.8px] font-black uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Promotion Narrative
              </p>

              <h2 className="mt-2 text-[25px] font-black uppercase leading-tight tracking-[-0.04em] text-slate-900">
                {applicationHeading}
              </h2>

              {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                <p className="mt-2 text-[10.5px] font-semibold leading-4 text-slate-600">
                  {[recipient.targetRole, recipient.company]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
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
                  prose-p:my-1.5
                  prose-p:font-medium
                  prose-p:leading-snug
                  prose-ul:my-1.5
                  prose-li:my-0.5
                  prose-strong:font-semibold
                  prose-strong:text-[var(--internal-accent)]
                  [&>*:first-child]:mt-0
                  [&>*:last-child]:mb-0
                "
              />
            </section>

            <section className="mt-5 grid grid-cols-3 gap-3">
              <InternalPillar
                title="Current Impact"
                body="Shows what the candidate has already contributed."
                accentColor={accentColor}
              />

              <InternalPillar
                title="Company Knowledge"
                body="Highlights familiarity with teams and goals."
                accentColor={accentColor}
              />

              <InternalPillar
                title="Next Step"
                body="Frames readiness for promotion or transfer."
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
  <p className="text-[8.2px] font-black uppercase tracking-[0.16em] text-slate-500">
    {children}
  </p>
);

const InternalPillar = ({ title, body, accentColor }) => (
  <div
    className="border-l-[3px] px-3 py-2"
    style={{
      borderColor: accentColor,
      backgroundColor: `${accentColor}08`,
    }}
  >
    <p
      className="text-[8px] font-black uppercase tracking-[0.13em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <p className="mt-1 text-[8.8px] font-semibold leading-4 text-slate-600">
      {body}
    </p>
  </div>
);

export default InternalPromotionTransferTemplate;