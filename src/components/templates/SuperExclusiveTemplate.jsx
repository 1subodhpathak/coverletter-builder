// import React from 'react';
// import { Link2, Mail, MapPin, Phone, Sparkles, Target, Trophy, Users } from 'lucide-react';
// import { Body } from './ProfessionalTemplateParts';

// const hasValue = (value) => Boolean(value?.trim?.());

// const getInitials = (fullName = '') => {
//   const parts = fullName.trim().split(/\s+/).filter(Boolean);
//   if (parts.length === 0) return 'CL';
//   if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
//   return `${parts[0][0] || ''}${parts[parts.length - 1][0] || ''}`.toUpperCase();
// };

// const formatExperience = (years, months) => {
//   const yearValue = hasValue(years) ? `${years} year${years === '1' ? '' : 's'}` : '';
//   const monthValue = hasValue(months) ? `${months} month${months === '1' ? '' : 's'}` : '';
//   return [yearValue, monthValue].filter(Boolean).join(' ');
// };

// const normalizeEditableValue = (value = '') => value.replace(/\n+/g, ' ').trim();

// const InlineEditable = ({
//   as = 'span',
//   value,
//   onCommit,
//   className = '',
//   placeholder = 'Click to edit',
//   multiline = false,
//   breakAll = false,
//   enabled = false,
//   ...rest
// }) => {
//   const Component = as;
//   const displayValue = hasValue(value) ? value : enabled ? placeholder : '';

//   return (
//     <Component
//       className={`${className} ${enabled ? 'rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4ab67]/60 focus:ring-offset-2' : ''} ${!hasValue(value) && enabled ? 'text-white/55 italic' : ''} ${breakAll ? 'break-all' : ''}`}
//       contentEditable={enabled}
//       suppressContentEditableWarning={true}
//       {...rest}
//       onBlur={(event) => onCommit?.(normalizeEditableValue(event.currentTarget.textContent || ''))}
//       onKeyDown={(event) => {
//         if (!multiline && event.key === 'Enter') {
//           event.preventDefault();
//           event.currentTarget.blur();
//         }
//       }}
//     >
//       {displayValue}
//     </Component>
//   );
// };

// const SuperExclusiveTemplate = (props) => {
//   const isEditorMode = Boolean(props.isEditorMode);
//   const initials = getInitials(props.profile.fullName);
//   const expertise = props.skills?.filter((value) => hasValue(value)).slice(0, 7) || [];
//   const editableSkills = isEditorMode
//     ? (props.skills?.length ? props.skills.slice(0, 7) : ['', '', ''])
//     : expertise;
//   const experienceLabel = formatExperience(props.profile.experienceYears, props.profile.experienceMonths);
//   const strengthCards = [
//     hasValue(props.profile.currentJobTitle) ? {
//       icon: Trophy,
//       title: props.profile.currentJobTitle,
//       body: experienceLabel || 'Current leadership focus and hands-on execution experience.',
//     } : null,
//     hasValue(props.recipient.targetRole) ? {
//       icon: Target,
//       title: 'Target Role',
//       body: props.recipient.targetRole,
//     } : null,
//     expertise[0] ? {
//       icon: Users,
//       title: expertise[0],
//       body: expertise[1] || 'Core professional strength highlighted throughout the letter.',
//     } : null,
//   ].filter(Boolean);

//   const profileRows = [
//     hasValue(props.profile.currentJobTitle) ? { title: props.profile.currentJobTitle, body: experienceLabel || 'Professional experience available' } : null,
//     hasValue(props.recipient.targetRole) ? { title: 'Applying For', body: props.recipient.targetRole } : null,
//     hasValue(props.profile.address) ? { title: 'Location', body: props.profile.address } : null,
//   ].filter(Boolean);

//   const footerHighlights = [
//     experienceLabel ? { title: 'Experience Depth', body: experienceLabel } : null,
//     hasValue(props.recipient.company) ? { title: 'Target Company', body: props.recipient.company } : null,
//     expertise[0] ? { title: 'Core Expertise', body: expertise[0] } : null,
//   ].filter(Boolean);

//   return (
//     <div
//       id="cover-letter-preview"
//       className="mx-auto overflow-hidden bg-white shadow-2xl"
//       style={{
//         width: '210mm',
//         minHeight: '297mm',
//         fontFamily: props.design.fontFamily || '"Helvetica Neue", Arial, sans-serif',
//       }}
//     >
//       <div className="grid min-h-[297mm] grid-cols-[58mm_1fr]">
//         <aside className="flex flex-col bg-[#162232] px-6 py-8 text-white">
//           <div className="flex justify-center pb-8">
//             <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-full border border-[#c79a52] text-[#d4ab67]">
//               <span className="absolute left-[14px] top-[10px] text-[26px] font-medium">{initials[0] || 'C'}</span>
//               <span className="absolute bottom-[8px] right-[14px] text-[26px] font-medium">{initials[1] || 'L'}</span>
//               <span className="absolute h-[1px] w-[58px] rotate-[130deg] bg-[#c79a52]" />
//             </div>
//           </div>

//           <SidebarSection title="Contact">
//             <SidebarLine
//               icon={Phone}
//               value={props.profile.phone}
//               enabled={isEditorMode}
//               placeholder="Phone"
//               onCommit={(value) => props.onUpdateProfileField?.('phone', value)}
//             />
//             <SidebarLine
//               icon={Mail}
//               value={props.profile.email}
//               breakAll
//               enabled={isEditorMode}
//               placeholder="Email"
//               onCommit={(value) => props.onUpdateProfileField?.('email', value)}
//             />
//             <SidebarLine
//               icon={Link2}
//               value={props.profile.linkedinPortfolio}
//               breakAll
//               enabled={isEditorMode}
//               placeholder="LinkedIn / Portfolio"
//               onCommit={(value) => props.onUpdateProfileField?.('linkedinPortfolio', value)}
//             />
//             <SidebarLine
//               icon={MapPin}
//               value={props.profile.address}
//               enabled={isEditorMode}
//               placeholder="Location"
//               onCommit={(value) => props.onUpdateProfileField?.('address', value)}
//             />
//           </SidebarSection>

//           {(expertise.length > 0 || isEditorMode) && (
//             <SidebarSection title="Expertise">
//               <ul className="space-y-2.5 pl-4 text-[12px] leading-5 text-white/90">
//                 {editableSkills.map((skill, index) => (
//                   <li key={`${skill || 'skill'}-${index}`} className="list-disc marker:text-[#d4ab67]">
//                     <InlineEditable
//                       value={skill}
//                       enabled={isEditorMode}
//                       placeholder={`Skill ${index + 1}`}
//                       onCommit={(value) => props.onUpdateSkill?.(index, value)}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </SidebarSection>
//           )}

//           {strengthCards.length > 0 && (
//             <SidebarSection title="Key Strengths">
//               <div className="space-y-5">
//                 {strengthCards.map(({ icon: Icon, title, body }) => (
//                   <div key={title} className="flex gap-3">
//                     <Icon size={16} className="mt-1 shrink-0 text-[#d4ab67]" />
//                     <div>
//                       <p className="text-[12px] font-semibold leading-5 text-white">{title}</p>
//                       <p className="mt-0.5 text-[11px] leading-5 text-white/75">{body}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </SidebarSection>
//           )}

//           {profileRows.length > 0 && (
//             <SidebarSection title="Profile">
//               <div className="space-y-5">
//                 {profileRows.map((row) => (
//                   <div key={row.title}>
//                     <p className="text-[12px] font-semibold leading-5 text-white">{row.title}</p>
//                     <p className="mt-0.5 text-[11px] leading-5 text-white/75">{row.body}</p>
//                   </div>
//                 ))}
//               </div>
//             </SidebarSection>
//           )}
//         </aside>

//         <main className="flex flex-col px-10 py-8 text-[#111827]">
//           <header className="border-b border-[#d9bb86] pb-5">
//             <h1 className="text-[34px] font-semibold uppercase tracking-[0.04em] text-[#152235]">
//               <InlineEditable
//                 value={props.profile.fullName}
//                 enabled={isEditorMode}
//                 placeholder="Your Name"
//                 onCommit={(value) => props.onUpdateProfileField?.('fullName', value)}
//                 className={!hasValue(props.profile.fullName) && isEditorMode ? '!text-slate-400' : ''}
//               />
//             </h1>
//             {(hasValue(props.profile.currentJobTitle) || hasValue(props.skills?.[0]) || hasValue(props.skills?.[1]) || isEditorMode) && (
//               <p className="mt-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[#c4954f]">
//                 <InlineEditable
//                   value={props.profile.currentJobTitle}
//                   enabled={isEditorMode}
//                   placeholder="Current Title"
//                   onCommit={(value) => props.onUpdateProfileField?.('currentJobTitle', value)}
//                   className={!hasValue(props.profile.currentJobTitle) && isEditorMode ? '!text-[#c4954f]/55' : ''}
//                 />
//                 {'  |  '}
//                 <InlineEditable
//                   value={props.skills?.[0] || ''}
//                   enabled={isEditorMode}
//                   placeholder="Primary Skill"
//                   onCommit={(value) => props.onUpdateSkill?.(0, value)}
//                   className={!hasValue(props.skills?.[0]) && isEditorMode ? '!text-[#c4954f]/55' : ''}
//                 />
//                 {'  |  '}
//                 <InlineEditable
//                   value={props.skills?.[1] || ''}
//                   enabled={isEditorMode}
//                   placeholder="Secondary Skill"
//                   onCommit={(value) => props.onUpdateSkill?.(1, value)}
//                   className={!hasValue(props.skills?.[1]) && isEditorMode ? '!text-[#c4954f]/55' : ''}
//                 />
//               </p>
//             )}
//           </header>

//           <section className="pb-8 pt-8">
//             <p className="text-[11px] text-[#111827]">
//               {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
//             </p>

//             <div className="mt-7 space-y-0.5 text-[12px] leading-6 text-[#111827]">
//               {(hasValue(props.recipient.name) || isEditorMode) && (
//                 <InlineEditable
//                   as="p"
//                   value={props.recipient.name}
//                   enabled={isEditorMode}
//                   placeholder="Hiring Manager"
//                   onCommit={(value) => props.onUpdateRecipientField?.('name', value)}
//                   className={`font-semibold ${!hasValue(props.recipient.name) && isEditorMode ? '!text-slate-400' : ''}`}
//                 />
//               )}
//               {(hasValue(props.recipient.title) || isEditorMode) && (
//                 <InlineEditable
//                   as="p"
//                   value={props.recipient.title}
//                   enabled={isEditorMode}
//                   placeholder="Hiring Manager Title"
//                   onCommit={(value) => props.onUpdateRecipientField?.('title', value)}
//                   className={!hasValue(props.recipient.title) && isEditorMode ? '!text-slate-400' : ''}
//                 />
//               )}
//               {(hasValue(props.recipient.company) || isEditorMode) && (
//                 <InlineEditable
//                   as="p"
//                   value={props.recipient.company}
//                   enabled={isEditorMode}
//                   placeholder="Company Name"
//                   onCommit={(value) => props.onUpdateRecipientField?.('company', value)}
//                   className={!hasValue(props.recipient.company) && isEditorMode ? '!text-slate-400' : ''}
//                 />
//               )}
//               {(hasValue(props.recipient.address) || isEditorMode) && (
//                 <InlineEditable
//                   as="p"
//                   value={props.recipient.address}
//                   enabled={isEditorMode}
//                   placeholder="Company Address"
//                   multiline={true}
//                   onCommit={(value) => props.onUpdateRecipientField?.('address', value)}
//                   className={!hasValue(props.recipient.address) && isEditorMode ? '!text-slate-400' : ''}
//                 />
//               )}
//             </div>
//           </section>

//           <div className="flex-1">
//             <Body
//               body={props.body}
//               design={{ ...props.design, fontFamily: props.design.fontFamily || '"Helvetica Neue", Arial, sans-serif', lineHeight: 1.85, fontSize: props.design.fontSize || 13.5 }}
//               onUpdateBody={props.onUpdateBody}
//               className="text-[13px] leading-[1.85] text-[#111827] prose-p:mb-6 prose-strong:font-semibold"
//             />
//           </div>

//           {(hasValue(props.signature.closing) || hasValue(props.profile.fullName) || props.signature.enabled || isEditorMode) && (
//             <div className="mt-8">
//               {(hasValue(props.signature.closing) || isEditorMode) && (
//                 <InlineEditable
//                   as="p"
//                   value={props.signature.closing}
//                   enabled={isEditorMode}
//                   placeholder="Closing"
//                   onCommit={(value) => props.onUpdateSignatureField?.('closing', value)}
//                   className={`font-bold text-slate-900 ${!hasValue(props.signature.closing) && isEditorMode ? '!text-slate-400' : ''}`}
//                 />
//               )}
//               {props.signature.enabled ? (
//                 props.signature.image ? (
//                   <img src={props.signature.image} alt={`${props.profile.fullName} signature`} className="mt-4 h-14 max-w-[180px] object-contain" />
//                 ) : (
//                   <InlineEditable
//                     as="div"
//                     value={props.signature.text}
//                     enabled={isEditorMode}
//                     placeholder="Typed Signature"
//                     onCommit={(value) => props.onUpdateSignatureField?.('text', value)}
//                     className={`mt-4 text-3xl ${!hasValue(props.signature.text) && isEditorMode ? '!text-slate-400' : ''}`}
//                     style={{ fontFamily: props.signature.font, color: '#111827' }}
//                   />
//                 )
//               ) : null}
//               {(hasValue(props.profile.fullName) || isEditorMode) && (
//                 <p className="mt-1 text-sm font-black text-slate-900">
//                   <InlineEditable
//                     value={props.profile.fullName}
//                     enabled={isEditorMode}
//                     placeholder="Your Name"
//                     onCommit={(value) => props.onUpdateProfileField?.('fullName', value)}
//                     className={!hasValue(props.profile.fullName) && isEditorMode ? '!text-slate-400' : ''}
//                   />
//                 </p>
//               )}
//             </div>
//           )}

//           {footerHighlights.length > 0 && (
//             <footer className="mt-8 border-t border-[#d9bb86] pt-5">
//               <div className="grid grid-cols-3 gap-6">
//                 {footerHighlights.map((item, index) => (
//                   <div key={`${item.title}-${index}`} className="flex items-start gap-3">
//                     <Sparkles size={18} className="mt-0.5 shrink-0 text-[#c4954f]" />
//                     <div>
//                       <p className="text-[11px] font-semibold text-[#111827]">{item.title}</p>
//                       <p className="mt-0.5 text-[10px] leading-5 text-[#374151]">{item.body}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </footer>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// const SidebarSection = ({ title, children }) => (
//   <section className="mt-8">
//     <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#d4ab67]">{title}</p>
//     <div className="mt-2 h-px w-24 bg-[#d4ab67]" />
//     <div className="mt-4">{children}</div>
//   </section>
// );

// const SidebarLine = ({ icon: Icon, value, breakAll = false, enabled = false, placeholder = 'Click to edit', onCommit }) => (
//   hasValue(value) || enabled ? (
//     <div className="mt-3 flex items-start gap-3 text-[12px] text-white/90">
//       <Icon size={14} className="mt-1 shrink-0 text-white" />
//       <InlineEditable
//         value={value}
//         enabled={enabled}
//         breakAll={breakAll}
//         placeholder={placeholder}
//         onCommit={onCommit}
//         className={breakAll ? 'leading-5' : 'leading-5'}
//       />
//     </div>
//   ) : null
// );

// export default SuperExclusiveTemplate;


import React from 'react';
import {
  Link2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Target,
  Trophy,
  Users,
} from 'lucide-react';
import { Body } from './ProfessionalTemplateParts';

const hasValue = (value) => Boolean(value?.trim?.());

const getInitials = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return 'CL';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0] || ''}${parts[parts.length - 1][0] || ''}`.toUpperCase();
};

const formatExperience = (years, months) => {
  const yearValue = hasValue(years)
    ? `${years} year${years === '1' ? '' : 's'}`
    : '';

  const monthValue = hasValue(months)
    ? `${months} month${months === '1' ? '' : 's'}`
    : '';

  return [yearValue, monthValue].filter(Boolean).join(' ');
};

const normalizeEditableValue = (value = '') => value.replace(/\n+/g, ' ').trim();

const InlineEditable = ({
  as = 'span',
  value,
  onCommit,
  className = '',
  placeholder = 'Click to edit',
  multiline = false,
  breakAll = false,
  enabled = false,
  ...rest
}) => {
  const Component = as;
  const displayValue = hasValue(value) ? value : enabled ? placeholder : '';

  return (
    <Component
      className={`${className} ${
        enabled
          ? 'rounded-sm focus:outline-none focus:ring-2 focus:ring-[#d4ab67]/60 focus:ring-offset-2'
          : ''
      } ${
        !hasValue(value) && enabled ? 'italic text-white/55' : ''
      } ${breakAll ? 'break-all' : ''}`}
      contentEditable={enabled}
      suppressContentEditableWarning={true}
      {...rest}
      onBlur={(event) =>
        onCommit?.(normalizeEditableValue(event.currentTarget.textContent || ''))
      }
      onKeyDown={(event) => {
        if (!multiline && event.key === 'Enter') {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
    >
      {displayValue}
    </Component>
  );
};

const SuperExclusiveTemplate = (props) => {
  const isEditorMode = Boolean(props.isEditorMode);

  const initials = getInitials(props.profile.fullName);

  const expertise =
    props.skills?.filter((value) => hasValue(value)).slice(0, 7) || [];

  const editableSkills = isEditorMode
    ? props.skills?.length
      ? props.skills.slice(0, 7)
      : ['', '', '']
    : expertise;

  const experienceLabel = formatExperience(
    props.profile.experienceYears,
    props.profile.experienceMonths
  );

  const strengthCards = [
    hasValue(props.profile.currentJobTitle)
      ? {
          icon: Trophy,
          title: props.profile.currentJobTitle,
          body:
            experienceLabel ||
            'Current leadership focus and hands-on execution experience.',
        }
      : null,

    hasValue(props.recipient.targetRole)
      ? {
          icon: Target,
          title: 'Target Role',
          body: props.recipient.targetRole,
        }
      : null,

    expertise[0]
      ? {
          icon: Users,
          title: expertise[0],
          body:
            expertise[1] ||
            'Core professional strength highlighted throughout the letter.',
        }
      : null,
  ].filter(Boolean);

  const profileRows = [
    hasValue(props.profile.currentJobTitle)
      ? {
          title: props.profile.currentJobTitle,
          body: experienceLabel || 'Professional experience available',
        }
      : null,

    hasValue(props.recipient.targetRole)
      ? {
          title: 'Applying For',
          body: props.recipient.targetRole,
        }
      : null,

    hasValue(props.profile.address)
      ? {
          title: 'Location',
          body: props.profile.address,
        }
      : null,
  ].filter(Boolean);

  const footerHighlights = [
    experienceLabel
      ? {
          title: 'Experience Depth',
          body: experienceLabel,
        }
      : null,

    hasValue(props.recipient.company)
      ? {
          title: 'Target Company',
          body: props.recipient.company,
        }
      : null,

    expertise[0]
      ? {
          title: 'Core Expertise',
          body: expertise[0],
        }
      : null,
  ].filter(Boolean);

  const bodyDesign = {
    ...props.design,
    fontFamily:
      props.design.fontFamily || '"Helvetica Neue", Arial, sans-serif',
    fontSize: Math.min(Math.max(Number(props.design.fontSize) || 12, 11.5), 12.5),
    lineHeight: 1.58,
  };

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white shadow-2xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily:
          props.design.fontFamily || '"Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div className="grid min-h-[297mm] grid-cols-[58mm_1fr]">
        {/* SIDEBAR */}
        <aside className="bg-[#162232] px-6 py-8 text-white">
          <div className="flex justify-center pb-7">
            <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-full border border-[#c79a52] text-[#d4ab67]">
              <span className="absolute left-[14px] top-[10px] text-[26px] font-medium">
                {initials[0] || 'C'}
              </span>

              <span className="absolute bottom-[8px] right-[14px] text-[26px] font-medium">
                {initials[1] || 'L'}
              </span>

              <span className="absolute h-[1px] w-[58px] rotate-[130deg] bg-[#c79a52]" />
            </div>
          </div>

          <SidebarSection title="Contact">
            <SidebarLine
              icon={Phone}
              value={props.profile.phone}
              enabled={isEditorMode}
              placeholder="Phone"
              onCommit={(value) => props.onUpdateProfileField?.('phone', value)}
            />

            <SidebarLine
              icon={Mail}
              value={props.profile.email}
              breakAll
              enabled={isEditorMode}
              placeholder="Email"
              onCommit={(value) => props.onUpdateProfileField?.('email', value)}
            />

            <SidebarLine
              icon={Link2}
              value={props.profile.linkedinPortfolio}
              breakAll
              enabled={isEditorMode}
              placeholder="LinkedIn / Portfolio"
              onCommit={(value) =>
                props.onUpdateProfileField?.('linkedinPortfolio', value)
              }
            />

            <SidebarLine
              icon={MapPin}
              value={props.profile.address}
              enabled={isEditorMode}
              placeholder="Location"
              onCommit={(value) => props.onUpdateProfileField?.('address', value)}
            />
          </SidebarSection>

          {(expertise.length > 0 || isEditorMode) && (
            <SidebarSection title="Expertise">
              <ul className="space-y-2.5 pl-4 text-[12px] leading-5 text-white/90">
                {editableSkills.map((skill, index) => (
                  <li
                    key={`${skill || 'skill'}-${index}`}
                    className="list-disc marker:text-[#d4ab67]"
                  >
                    <InlineEditable
                      value={skill}
                      enabled={isEditorMode}
                      placeholder={`Skill ${index + 1}`}
                      onCommit={(value) => props.onUpdateSkill?.(index, value)}
                    />
                  </li>
                ))}
              </ul>
            </SidebarSection>
          )}

          {strengthCards.length > 0 && (
            <SidebarSection title="Key Strengths">
              <div className="space-y-4">
                {strengthCards.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex gap-3">
                    <Icon size={16} className="mt-1 shrink-0 text-[#d4ab67]" />

                    <div>
                      <p className="text-[12px] font-semibold leading-5 text-white">
                        {title}
                      </p>

                      <p className="mt-0.5 text-[11px] leading-5 text-white/75">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarSection>
          )}

          {profileRows.length > 0 && (
            <SidebarSection title="Profile">
              <div className="space-y-4">
                {profileRows.map((row) => (
                  <div key={row.title}>
                    <p className="text-[12px] font-semibold leading-5 text-white">
                      {row.title}
                    </p>

                    <p className="mt-0.5 text-[11px] leading-5 text-white/75">
                      {row.body}
                    </p>
                  </div>
                ))}
              </div>
            </SidebarSection>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main className="px-10 py-8 text-[#111827]">
          {/* HEADER */}
          <header className="border-b border-[#d9bb86] pb-5">
            <h1 className="text-[34px] font-semibold uppercase leading-tight tracking-[0.04em] text-[#152235]">
              <InlineEditable
                value={props.profile.fullName}
                enabled={isEditorMode}
                placeholder="Your Name"
                onCommit={(value) =>
                  props.onUpdateProfileField?.('fullName', value)
                }
                className={
                  !hasValue(props.profile.fullName) && isEditorMode
                    ? '!text-slate-400'
                    : ''
                }
              />
            </h1>

            {(hasValue(props.profile.currentJobTitle) ||
              hasValue(props.skills?.[0]) ||
              hasValue(props.skills?.[1]) ||
              isEditorMode) && (
              <p className="mt-3 text-[12px] font-semibold uppercase leading-snug tracking-[0.16em] text-[#c4954f]">
                <InlineEditable
                  value={props.profile.currentJobTitle}
                  enabled={isEditorMode}
                  placeholder="Current Title"
                  onCommit={(value) =>
                    props.onUpdateProfileField?.('currentJobTitle', value)
                  }
                  className={
                    !hasValue(props.profile.currentJobTitle) && isEditorMode
                      ? '!text-[#c4954f]/55'
                      : ''
                  }
                />

                {'  |  '}

                <InlineEditable
                  value={props.skills?.[0] || ''}
                  enabled={isEditorMode}
                  placeholder="Primary Skill"
                  onCommit={(value) => props.onUpdateSkill?.(0, value)}
                  className={
                    !hasValue(props.skills?.[0]) && isEditorMode
                      ? '!text-[#c4954f]/55'
                      : ''
                  }
                />

                {'  |  '}

                <InlineEditable
                  value={props.skills?.[1] || ''}
                  enabled={isEditorMode}
                  placeholder="Secondary Skill"
                  onCommit={(value) => props.onUpdateSkill?.(1, value)}
                  className={
                    !hasValue(props.skills?.[1]) && isEditorMode
                      ? '!text-[#c4954f]/55'
                      : ''
                  }
                />
              </p>
            )}
          </header>

          {/* DATE + RECIPIENT */}
          <section className="pt-7">
            <div className="grid grid-cols-[1fr_auto] gap-8">
              <div>
                <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#c4954f]">
                  To
                </p>

                <div className="space-y-0.5 text-[13px] leading-snug text-[#111827]">
                  {(hasValue(props.recipient.name) || isEditorMode) && (
                    <InlineEditable
                      as="p"
                      value={props.recipient.name}
                      enabled={isEditorMode}
                      placeholder="Hiring Manager"
                      onCommit={(value) =>
                        props.onUpdateRecipientField?.('name', value)
                      }
                      className={`font-semibold ${
                        !hasValue(props.recipient.name) && isEditorMode
                          ? '!text-slate-400'
                          : ''
                      }`}
                    />
                  )}

                  {(hasValue(props.recipient.title) || isEditorMode) && (
                    <InlineEditable
                      as="p"
                      value={props.recipient.title}
                      enabled={isEditorMode}
                      placeholder="Hiring Manager Title"
                      onCommit={(value) =>
                        props.onUpdateRecipientField?.('title', value)
                      }
                      className={
                        !hasValue(props.recipient.title) && isEditorMode
                          ? '!text-slate-400'
                          : ''
                      }
                    />
                  )}

                  {(hasValue(props.recipient.company) || isEditorMode) && (
                    <InlineEditable
                      as="p"
                      value={props.recipient.company}
                      enabled={isEditorMode}
                      placeholder="Company Name"
                      onCommit={(value) =>
                        props.onUpdateRecipientField?.('company', value)
                      }
                      className={`font-semibold ${
                        !hasValue(props.recipient.company) && isEditorMode
                          ? '!text-slate-400'
                          : ''
                      }`}
                    />
                  )}

                  {(hasValue(props.recipient.address) || isEditorMode) && (
                    <InlineEditable
                      as="p"
                      value={props.recipient.address}
                      enabled={isEditorMode}
                      placeholder="Company Address"
                      multiline={true}
                      onCommit={(value) =>
                        props.onUpdateRecipientField?.('address', value)
                      }
                      className={
                        !hasValue(props.recipient.address) && isEditorMode
                          ? '!text-slate-400'
                          : ''
                      }
                    />
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#c4954f]">
                  Date
                </p>

                <p className="text-[13px] font-medium text-[#111827]">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </section>

          {/* OPTIONAL PROFESSIONAL HIGHLIGHTS */}
          {footerHighlights.length > 0 && (
            <section className="mt-7 border-y border-[#ead9bb] py-4">
              <div className="grid grid-cols-3 gap-5">
                {footerHighlights.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="flex items-start gap-2.5"
                  >
                    <Sparkles
                      size={16}
                      className="mt-0.5 shrink-0 text-[#c4954f]"
                    />

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#111827]">
                        {item.title}
                      </p>

                      <p className="mt-0.5 text-[11px] leading-5 text-[#374151]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* BODY - NATURAL FLOW */}
          <section className="mt-7">
            <Body
              body={props.body}
              design={bodyDesign}
              onUpdateBody={props.onUpdateBody}
              className="text-[12.5px] leading-[1.58] text-[#111827] prose-p:my-2.5 prose-p:font-medium prose-p:leading-relaxed prose-strong:font-semibold"
            />
          </section>

          {/* SIGNATURE - NATURAL FLOW, NOT STUCK TO BOTTOM */}
          {(hasValue(props.signature.closing) ||
            hasValue(props.profile.fullName) ||
            props.signature.enabled ||
            isEditorMode) && (
            <section className="mt-8">
              {(hasValue(props.signature.closing) || isEditorMode) && (
                <InlineEditable
                  as="p"
                  value={props.signature.closing}
                  enabled={isEditorMode}
                  placeholder="Closing"
                  onCommit={(value) =>
                    props.onUpdateSignatureField?.('closing', value)
                  }
                  className={`text-[14px] font-semibold text-slate-900 ${
                    !hasValue(props.signature.closing) && isEditorMode
                      ? '!text-slate-400'
                      : ''
                  }`}
                />
              )}

              {props.signature.enabled ? (
                props.signature.image ? (
                  <img
                    src={props.signature.image}
                    alt={`${props.profile.fullName} signature`}
                    className="mt-3 h-12 max-w-[170px] object-contain"
                  />
                ) : (
                  <InlineEditable
                    as="div"
                    value={props.signature.text}
                    enabled={isEditorMode}
                    placeholder="Typed Signature"
                    onCommit={(value) =>
                      props.onUpdateSignatureField?.('text', value)
                    }
                    className={`mt-3 text-[31px] leading-none ${
                      !hasValue(props.signature.text) && isEditorMode
                        ? '!text-slate-400'
                        : ''
                    }`}
                    style={{
                      fontFamily: props.signature.font,
                      color: '#111827',
                    }}
                  />
                )
              ) : null}

              {(hasValue(props.profile.fullName) || isEditorMode) && (
                <p className="mt-2 text-[12px] font-black uppercase tracking-[0.12em] text-slate-900">
                  <InlineEditable
                    value={props.profile.fullName}
                    enabled={isEditorMode}
                    placeholder="Your Name"
                    onCommit={(value) =>
                      props.onUpdateProfileField?.('fullName', value)
                    }
                    className={
                      !hasValue(props.profile.fullName) && isEditorMode
                        ? '!text-slate-400'
                        : ''
                    }
                  />
                </p>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

const SidebarSection = ({ title, children }) => (
  <section className="mt-7">
    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#d4ab67]">
      {title}
    </p>

    <div className="mt-2 h-px w-24 bg-[#d4ab67]" />

    <div className="mt-4">{children}</div>
  </section>
);

const SidebarLine = ({
  icon: Icon,
  value,
  breakAll = false,
  enabled = false,
  placeholder = 'Click to edit',
  onCommit,
}) =>
  hasValue(value) || enabled ? (
    <div className="mt-3 flex items-start gap-3 text-[12px] leading-5 text-white/90">
      <Icon size={14} className="mt-1 shrink-0 text-white" />

      <InlineEditable
        value={value}
        enabled={enabled}
        breakAll={breakAll}
        placeholder={placeholder}
        onCommit={onCommit}
        className="leading-5"
      />
    </div>
  ) : null;

export default SuperExclusiveTemplate;