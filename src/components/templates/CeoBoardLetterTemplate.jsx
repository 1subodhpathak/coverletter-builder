// import React from 'react';
// import { Body, Signature } from './ProfessionalTemplateParts';

// const CeoBoardLetterTemplate = (props) => {
//   const hasValue = (value) => Boolean(value?.trim?.());
//   const compactDesign = {
//     ...props.design,
//     fontFamily: 'arial, sans-serif',
//     fontSize: Math.min(12.5, props.design.fontSize || 12),
//     lineHeight: 1.42,
//   };

//   const skillsLine =
//     props.skills?.slice(0, 2).join(' • ') || 'Strategic Transformation';

//   return (
//     <div
//       id="cover-letter-preview"
//       className="mx-auto overflow-hidden bg-white shadow-xl"
//       style={{
//         width: '210mm',
//         height: '297mm',
//         fontFamily: compactDesign.fontFamily,
//       }}
//     >
//       <div className="h-1.5 bg-slate-900" />

//       <div className="relative flex h-[calc(297mm-6px)] flex-col overflow-hidden px-[20mm] py-[17mm]">
//         <div className="absolute left-0 top-0 h-full w-px bg-slate-200" />

//         <header className="shrink-0 grid grid-cols-[minmax(0,1fr)_72mm] items-end gap-5 border-b border-slate-200 pb-5">
//   <div className="min-w-0">
//     <h1 className="text-[30px] font-black leading-tight tracking-[-0.03em] text-slate-950">
//       {props.profile.fullName}
//     </h1>

//     <p className="mt-2 max-w-[95mm] text-[11px] font-black uppercase leading-5 tracking-[0.14em] text-[#567C8D]">
//       {skillsLine}
//     </p>
//   </div>

//   <div className="min-w-0 text-right text-[9.5px] font-bold uppercase leading-4 text-slate-400">
//     {hasValue(props.profile.email) && (
//       <p className="whitespace-nowrap">
//         {props.profile.email}
//       </p>
//     )}

//     {hasValue(props.profile.phone) && (
//       <p className="whitespace-nowrap">
//         {props.profile.phone}
//       </p>
//     )}

//     {hasValue(props.profile.address) && (
//       <p className="truncate">
//         {props.profile.address}
//       </p>
//     )}

//     {hasValue(props.profile.linkedinPortfolio) && (
//       <p className="truncate">
//         {props.profile.linkedinPortfolio}
//       </p>
//     )}
//   </div>
// </header>

//         <main className="flex min-h-0 flex-1 flex-col pt-6">
//           <div className="shrink-0">
//             <p className="mb-4 text-[11px] font-bold text-slate-400">
//               {new Date().toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//               })}
//             </p>

//             {(hasValue(props.recipient.name) || hasValue(props.recipient.title) || hasValue(props.recipient.company) || hasValue(props.recipient.address)) && (
//               <section className="mb-5 rounded-[14px] border border-slate-100 bg-slate-50/80 px-4 py-3 text-[11px] leading-5 text-slate-950">
//                 {hasValue(props.recipient.name) && <p className="font-black">{props.recipient.name}</p>}
//                 {hasValue(props.recipient.title) && <p>{props.recipient.title}</p>}
//                 {hasValue(props.recipient.company) && <p>{props.recipient.company}</p>}
//                 {hasValue(props.recipient.address) && <p>{props.recipient.address}</p>}
//               </section>
//             )}

//             {hasValue(props.recipient.name) && (
//               <div className="mb-4 text-[13px] font-black text-slate-950">
//                 Dear {props.recipient.name},
//               </div>
//             )}
//           </div>

//           <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[16px] border border-slate-100 bg-white px-5 py-4 shadow-[0_12px_35px_rgba(15,23,42,0.04)]">
//             <div className="min-h-0 flex-1 overflow-hidden text-slate-900">
//               <Body
//                 body={props.body}
//                 design={compactDesign}
//                 onUpdateBody={props.onUpdateBody}
//                 className="prose-p:my-2 prose-p:text-justify prose-strong:text-slate-950 prose-ul:my-2 prose-li:my-1"
//               />
//             </div>

//             <div className="mt-3 shrink-0 border-t border-slate-100 pt-3 [&>div]:mt-1 [&_p]:text-slate-950 [&_img]:h-8">
//               <Signature
//                 signature={props.signature}
//                 profile={props.profile}
//                 accent="#111827"
//               />
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CeoBoardLetterTemplate;


import React from 'react';
import { Body, Signature } from './ProfessionalTemplateParts';

const CeoBoardLetterTemplate = (props) => {
  const hasValue = (value) => Boolean(value?.trim?.());

  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const accentColor = design.color || '#567C8D';
  const inkColor = '#0F172A';
  const mutedText = '#64748B';

  const bodyDesign = {
    ...design,
    fontFamily:
      design.fontFamily ||
      '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 12.2, 11.8), 12.8),
    lineHeight: Number(design.lineHeight) || 1.58,
  };

  const cleanSkills = skills.filter((skill) => hasValue(skill)).slice(0, 5);

  const skillsLine =
    cleanSkills.length > 0
      ? cleanSkills.join(' • ')
      : profile.currentJobTitle ||
        recipient.targetRole ||
        'Strategic Leadership • Business Transformation';

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

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled;

  const signatureToRender = {
    ...signature,
    closing: hasValue(signature.closing) ? signature.closing : 'Sincerely,',
  };

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily: bodyDesign.fontFamily,
        color: inkColor,
      }}
    >
      {/* TOP EXECUTIVE ACCENT */}
      <div className="h-[6px]" style={{ backgroundColor: inkColor }} />

      <div className="relative px-[20mm] py-[17mm]">
        {/* SUBTLE LEFT RULE */}
        <div
          className="absolute left-0 top-0 h-full w-[3px]"
          style={{ backgroundColor: accentColor }}
        />

        {/* HEADER */}
        <header className="border-b border-slate-200 pb-6">
          <div className="grid grid-cols-[minmax(0,1fr)_68mm] items-start gap-8">
            <div className="min-w-0">
              {hasValue(profile.fullName) && (
                <h1 className="text-[35px] font-black leading-[1.05] tracking-[-0.04em] text-slate-950">
                  {profile.fullName}
                </h1>
              )}

              <p
                className="mt-3 max-w-[112mm] text-[11.5px] font-black uppercase leading-5 tracking-[0.16em]"
                style={{ color: accentColor }}
              >
                {skillsLine}
              </p>

              {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                <p className="mt-3 text-[12px] font-semibold leading-5 text-slate-600">
                  {[recipient.targetRole, recipient.company]
                    .filter((value) => hasValue(value))
                    .join(' · ')}
                </p>
              )}
            </div>

            {contactParts.length > 0 && (
              <div className="min-w-0 text-right text-[10.5px] font-bold uppercase leading-5 tracking-[0.06em] text-slate-500">
                {hasValue(profile.email) && (
                  <p className="whitespace-nowrap">{profile.email}</p>
                )}

                {hasValue(profile.phone) && (
                  <p className="whitespace-nowrap">{profile.phone}</p>
                )}

                {hasValue(profile.address) && (
                  <p className="truncate">{profile.address}</p>
                )}

                {hasValue(profile.linkedinPortfolio) && (
                  <p className="truncate">{profile.linkedinPortfolio}</p>
                )}
              </div>
            )}
          </div>
        </header>

        {/* DATE + RECIPIENT */}
        <section className="mt-7 grid grid-cols-[1fr_auto] gap-8">
          <div>
            {hasRecipient && (
              <div className="border-l-4 border-slate-200 pl-5">
                <p className="mb-2 text-[10.5px] font-black uppercase tracking-[0.18em] text-slate-400">
                  Recipient
                </p>

                <div className="space-y-0.5 text-[13px] leading-5 text-slate-700">
                  {hasValue(recipient.name) && (
                    <p className="font-black text-slate-950">
                      {recipient.name}
                    </p>
                  )}

                  {hasValue(recipient.title) && (
                    <p className="font-medium">{recipient.title}</p>
                  )}

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
          </div>

          <div className="text-right">
            <p className="mb-2 text-[10.5px] font-black uppercase tracking-[0.18em] text-slate-400">
              Date
            </p>

            <p className="text-[13px] font-semibold text-slate-700">
              {formattedDate}
            </p>
          </div>
        </section>

        {/* SALUTATION */}
        {hasValue(recipient.name) && (
          <section className="mt-8">
            <p className="text-[14px] font-black text-slate-950">
              Dear {recipient.name},
            </p>
          </section>
        )}

        {/* BODY */}
        <section className="mt-5">
          <Body
            body={props.body}
            design={bodyDesign}
            onUpdateBody={props.onUpdateBody}
            className="text-left text-slate-800 prose-p:my-2.5 prose-p:font-medium prose-p:leading-relaxed prose-strong:font-semibold prose-strong:text-slate-950 prose-ul:my-2.5 prose-li:my-1.5"
          />
        </section>

        {/* SKILLS SNAPSHOT */}
        {cleanSkills.length > 0 && (
          <section className="mt-8 border-y border-slate-200 py-4">
            <p className="mb-3 text-[10.5px] font-black uppercase tracking-[0.18em] text-slate-400">
              Executive Strengths
            </p>

            <div className="flex flex-wrap gap-2">
              {cleanSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-full border px-3 py-1.5 text-[11px] font-black leading-tight"
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

        {/* SIGNATURE - NATURAL FLOW */}
        {showSignature && (
          <footer className="mt-9 border-t border-slate-200 pt-5 [&>div]:mt-0 [&_img]:h-12 [&_p]:text-slate-950">
            <Signature
              signature={signatureToRender}
              profile={profile}
              accent={inkColor}
            />
          </footer>
        )}
      </div>
    </div>
  );
};

export default CeoBoardLetterTemplate;