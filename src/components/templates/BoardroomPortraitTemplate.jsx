// import React from 'react';
// import { Body, PhotoBlock, SidebarContact, Signature } from './ProfessionalTemplateParts';

// const BoardroomPortraitTemplate = (props) => (
//   <div id="cover-letter-preview" className="mx-auto grid bg-[#d9d9d9] shadow-xl" style={{ width: '210mm', minHeight: '297mm', gridTemplateColumns: '86mm 1fr', fontFamily: props.design.fontFamily }}>
//     <aside className="m-0 bg-[#f2ded5] p-10">
//       <div className="flex h-full flex-col bg-white px-7 py-10">
//         <PhotoBlock profile={props.profile} accent={props.accent} className="mx-auto h-32 w-32 rounded-full border-4 border-white shadow-md" />
//         <h1 className="mt-8 text-center text-3xl font-black uppercase leading-none tracking-[0.08em] text-slate-800">{props.profile.fullName}</h1>
//         <SidebarContact profile={props.profile} recipient={props.recipient} />
//       </div>
//     </aside>
//     <main className="bg-white px-10 py-16">
//       <p className="border-y border-slate-300 py-3 text-sm font-black uppercase tracking-[0.26em] text-slate-600">{props.recipient.company}</p>
//       <div className="mt-8">
//         <Body body={props.body} design={props.design} onUpdateBody={props.onUpdateBody} />
//       </div>
//       <Signature signature={props.signature} profile={props.profile} accent={props.accent} />
//     </main>
//   </div>
// );

// export default BoardroomPortraitTemplate;


import React from 'react';
import { Body, PhotoBlock, Signature } from './ProfessionalTemplateParts';

const hasValue = (value) => Boolean(value?.trim?.());

const normalizeEditableValue = (value = '') => value.replace(/\n+/g, ' ').trim();

const InlineEditable = ({
  as = 'span',
  value,
  onCommit,
  className = '',
  placeholder = 'Click to edit',
  enabled = false,
  breakAll = false,
  ...rest
}) => {
  const Component = as;
  const displayValue = hasValue(value) ? value : enabled ? placeholder : '';

  return (
    <Component
      className={`${className} ${
        enabled
          ? 'rounded-sm focus:outline-none focus:ring-2 focus:ring-[#8B5E4A]/30 focus:ring-offset-2'
          : ''
      } ${
        !hasValue(value) && enabled ? 'italic text-slate-400' : ''
      } ${breakAll ? 'break-all' : ''}`}
      contentEditable={enabled}
      suppressContentEditableWarning={true}
      {...rest}
      onBlur={(event) =>
        onCommit?.(normalizeEditableValue(event.currentTarget.textContent || ''))
      }
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
    >
      {displayValue}
    </Component>
  );
};

const BoardroomPortraitTemplate = (props) => {
  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const design = props.design || {};
  const skills = props.skills || [];

  const isEditorMode = Boolean(props.isEditorMode);

  const accentColor = props.accent || design.color || '#8B5E4A';

  const expertise = skills.filter((value) => hasValue(value)).slice(0, 7);

  const editableSkills = isEditorMode
    ? skills.length
      ? skills.slice(0, 7)
      : ['', '', '']
    : expertise;

  const contactItems = [
    { label: 'Email', value: profile.email, field: 'email', breakAll: true },
    { label: 'Phone', value: profile.phone, field: 'phone' },
    { label: 'Location', value: profile.address, field: 'address' },
    {
      label: 'Portfolio',
      value: profile.linkedinPortfolio,
      field: 'linkedinPortfolio',
      breakAll: true,
    },
  ];

  const recipientItems = [
    { label: 'Name', value: recipient.name, field: 'name' },
    { label: 'Title', value: recipient.title, field: 'title' },
    { label: 'Company', value: recipient.company, field: 'company' },
    { label: 'Address', value: recipient.address, field: 'address' },
  ];

  const showContact =
    contactItems.some((item) => hasValue(item.value)) || isEditorMode;

  const showRecipient =
    recipientItems.some((item) => hasValue(item.value)) || isEditorMode;

  const bodyDesign = {
    ...design,
    fontFamily: 'inherit',
    fontSize: Math.min(Math.max(Number(design.fontSize) || 12, 11.5), 12.5),
    lineHeight: Number(design.lineHeight) || 1.58,
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto grid bg-[#d9d9d9] shadow-xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        gridTemplateColumns: '84mm 1fr',
        fontFamily:
          design.fontFamily ||
          '"Inter", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* LEFT SIDEBAR */}
      <aside className="bg-[#f2ded5] p-8">
        <div className="min-h-full bg-white px-7 py-9 shadow-sm">
          {/* PHOTO */}
          <PhotoBlock
            profile={profile}
            accent={accentColor}
            className="mx-auto h-32 w-32 rounded-full border-4 border-white shadow-md"
          />

          {/* NAME */}
          {(hasValue(profile.fullName) || isEditorMode) && (
            <h1 className="mt-7 text-center text-[27px] font-black uppercase leading-tight tracking-[0.08em] text-slate-800">
              <InlineEditable
                value={profile.fullName}
                enabled={isEditorMode}
                placeholder="Your Name"
                onCommit={(value) =>
                  props.onUpdateProfileField?.('fullName', value)
                }
              />
            </h1>
          )}

          {/* TITLE */}
          {(hasValue(profile.currentJobTitle) || isEditorMode) && (
            <p
              className="mx-auto mt-3 max-w-[54mm] text-center text-[11px] font-black uppercase leading-snug tracking-[0.16em]"
              style={{ color: accentColor }}
            >
              <InlineEditable
                value={profile.currentJobTitle}
                enabled={isEditorMode}
                placeholder="Current Title"
                onCommit={(value) =>
                  props.onUpdateProfileField?.('currentJobTitle', value)
                }
              />
            </p>
          )}

          <div className="mx-auto mt-6 h-px w-20" style={{ backgroundColor: accentColor }} />

          {/* CONTACT */}
          {showContact && (
            <SidebarSection title="Contact" accentColor={accentColor}>
              <div className="space-y-3">
                {contactItems.map((item) =>
                  hasValue(item.value) || isEditorMode ? (
                    <SidebarInfoRow
                      key={item.field}
                      label={item.label}
                      value={item.value}
                      enabled={isEditorMode}
                      breakAll={item.breakAll}
                      placeholder={item.label}
                      onCommit={(value) =>
                        props.onUpdateProfileField?.(item.field, value)
                      }
                    />
                  ) : null
                )}
              </div>
            </SidebarSection>
          )}

          {/* RECIPIENT */}
          {showRecipient && (
            <SidebarSection title="To" accentColor={accentColor}>
              <div className="space-y-2.5">
                {recipientItems.map((item) =>
                  hasValue(item.value) || isEditorMode ? (
                    <SidebarInfoRow
                      key={item.field}
                      label={item.label}
                      value={item.value}
                      enabled={isEditorMode}
                      placeholder={item.label}
                      onCommit={(value) =>
                        props.onUpdateRecipientField?.(item.field, value)
                      }
                    />
                  ) : null
                )}
              </div>
            </SidebarSection>
          )}

          {/* SKILLS / EXPERTISE */}
          {(expertise.length > 0 || isEditorMode) && (
            <SidebarSection title="Expertise" accentColor={accentColor}>
              <div className="flex flex-wrap gap-2">
                {editableSkills.map((skill, index) => (
                  <span
                    key={`${skill || 'skill'}-${index}`}
                    className="rounded-full border px-3 py-1.5 text-[11px] font-black leading-tight"
                    style={{
                      borderColor: `${accentColor}55`,
                      color: accentColor,
                      backgroundColor: `${accentColor}10`,
                    }}
                  >
                    <InlineEditable
                      value={skill}
                      enabled={isEditorMode}
                      placeholder={`Skill ${index + 1}`}
                      onCommit={(value) => props.onUpdateSkill?.(index, value)}
                    />
                  </span>
                ))}
              </div>
            </SidebarSection>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="bg-white px-10 py-12 text-slate-900">
        {/* TOP COMPANY BAR */}
        {(hasValue(recipient.company) ||
          hasValue(recipient.targetRole) ||
          isEditorMode) && (
          <section className="border-y border-slate-300 py-3">
            <p className="text-[12px] font-black uppercase leading-snug tracking-[0.2em] text-slate-600">
              <InlineEditable
                value={recipient.company}
                enabled={isEditorMode}
                placeholder="Company Name"
                onCommit={(value) =>
                  props.onUpdateRecipientField?.('company', value)
                }
              />

              {(hasValue(recipient.targetRole) || isEditorMode) && (
                <>
                  <span className="mx-2 text-slate-300">·</span>
                  <InlineEditable
                    value={recipient.targetRole}
                    enabled={isEditorMode}
                    placeholder="Target Role"
                    onCommit={(value) =>
                      props.onUpdateRecipientField?.('targetRole', value)
                    }
                  />
                </>
              )}
            </p>
          </section>
        )}

        {/* DATE */}
        <section className="mt-7">
          <p className="text-[12.5px] font-semibold text-slate-700">
            {formattedDate}
          </p>
        </section>

        {/* BODY */}
        <section className="mt-7">
          <Body
            body={props.body}
            design={bodyDesign}
            onUpdateBody={props.onUpdateBody}
            className="text-left text-slate-800 prose-p:my-2.5 prose-p:font-medium prose-p:leading-relaxed prose-strong:font-semibold"
          />
        </section>

        {/* SIGNATURE - NATURAL FLOW */}
        {(hasValue(signature.closing) ||
          hasValue(profile.fullName) ||
          signature.enabled) && (
          <footer className="mt-9 border-t border-slate-200 pt-5 [&>div]:mt-0">
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

const SidebarSection = ({ title, accentColor, children }) => (
  <section className="mt-8">
    <p
      className="text-[11px] font-black uppercase tracking-[0.18em]"
      style={{ color: accentColor }}
    >
      {title}
    </p>

    <div
      className="mt-2 h-px w-16"
      style={{ backgroundColor: accentColor }}
    />

    <div className="mt-4">{children}</div>
  </section>
);

const SidebarInfoRow = ({
  label,
  value,
  enabled = false,
  placeholder = '',
  breakAll = false,
  onCommit,
}) => (
  <div>
    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
      {label}
    </p>

    <p className={`mt-0.5 text-[12px] font-semibold leading-5 text-slate-700 ${breakAll ? 'break-all' : ''}`}>
      <InlineEditable
        value={value}
        enabled={enabled}
        placeholder={placeholder}
        breakAll={breakAll}
        onCommit={onCommit}
      />
    </p>
  </div>
);

export default BoardroomPortraitTemplate;