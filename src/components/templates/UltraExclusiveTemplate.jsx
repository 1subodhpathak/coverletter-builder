import React from 'react';
import {
  ChevronRight,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Quote,
  Send,
  Target,
  TrendingUp,
  Trophy,
  UserRound,
  Users,
} from 'lucide-react';

const hasValue = (value) => Boolean(value?.trim?.());

const normalizeEditableValue = (value = '') => value.replace(/\n+/g, ' ').trim();

const getInitials = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return ['E', 'L'];
  if (parts.length === 1) {
    return [parts[0][0] || 'E', parts[0][1] || parts[0][0] || 'L'];
  }

  return [parts[0][0] || 'E', parts[parts.length - 1][0] || 'L'];
};

const toDisplayNameLines = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length <= 2) {
    return [parts.slice(0, 1).join(' '), parts.slice(1).join(' ')].filter(Boolean);
  }

  const midpoint = Math.ceil(parts.length / 2);
  return [parts.slice(0, midpoint).join(' '), parts.slice(midpoint).join(' ')];
};

const formatLongDate = () =>
  new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

const formatExperience = (years, months) => {
  const yearValue = hasValue(years) ? `${years}+` : '10+';
  const monthValue = hasValue(months) ? `${months}` : '';

  return monthValue ? `${yearValue}.${monthValue}` : yearValue;
};

const extractBodyBlocks = (body = '') => {
  if (typeof window === 'undefined') {
    return [{ tag: 'p', html: body }];
  }

  const parser = new window.DOMParser();
  const doc = parser.parseFromString(`<div>${body}</div>`, 'text/html');
  const root = doc.body.firstElementChild || doc.body;
  const blocks = [];

  Array.from(root.childNodes).forEach((node) => {
    if (node.nodeType === window.Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) blocks.push({ tag: 'p', html: text });
      return;
    }

    if (node.nodeType !== window.Node.ELEMENT_NODE) return;

    const element = node;
    const tag = element.tagName.toLowerCase();

    if (tag === 'ul' || tag === 'ol') {
      Array.from(element.children).forEach((child) => {
        if (child.tagName.toLowerCase() === 'li' && child.innerHTML.trim()) {
          blocks.push({ tag: 'p', html: child.innerHTML.trim() });
        }
      });
      return;
    }

    if (element.innerHTML.trim()) {
      blocks.push({
        tag: tag === 'p' ? 'p' : 'div',
        html: element.innerHTML.trim(),
      });
    }
  });

  return blocks.length > 0 ? blocks : [{ tag: 'p', html: body }];
};

const serializeBodyBlocks = (blocks = []) =>
  blocks
    .map(({ tag = 'p', html = '' }) => `<${tag}>${html}</${tag}>`)
    .join('');

const InlineEditable = ({
  as = 'span',
  value,
  onCommit,
  className = '',
  placeholder = 'Click to edit',
  enabled = false,
  multiline = false,
  breakAll = false,
  mutedPlaceholderClass = 'text-[#c5ab79] italic',
  ...rest
}) => {
  const Component = as;
  const displayValue = hasValue(value) ? value : enabled ? placeholder : '';

  return (
    <Component
      className={`${className} ${
        enabled
          ? 'rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C9A35D]/70 focus:ring-offset-2 focus:ring-offset-white'
          : ''
      } ${
        !hasValue(value) && enabled ? mutedPlaceholderClass : ''
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

const EditableBodyBlock = ({ html, onCommit, className = '' }) => (
  <div
    className={`focus:outline-none focus:ring-2 focus:ring-[#C9A35D]/70 focus:ring-offset-2 focus:ring-offset-white ${className}`}
    data-editor-body="true"
    contentEditable={true}
    suppressContentEditableWarning={true}
    dangerouslySetInnerHTML={{ __html: html }}
    onBlur={(event) => onCommit(event.currentTarget.innerHTML)}
  />
);

const SidebarContactLine = ({
  icon: Icon,
  value,
  enabled = false,
  placeholder,
  onCommit,
}) =>
  hasValue(value) || enabled ? (
    <div className="flex items-start gap-2.5 text-[10.5px] leading-4 text-[#173B35]">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#173B35] text-[#F5EFE3]">
        <Icon size={13} />
      </div>

      <InlineEditable
        value={value}
        enabled={enabled}
        placeholder={placeholder}
        onCommit={onCommit}
        breakAll
        className="pt-1 font-semibold"
        mutedPlaceholderClass="text-[#6d7e78] italic"
      />
    </div>
  ) : null;

const UltraExclusiveTemplate = (props) => {
  const palette = {
    page: '#FFFFFF',
    sidebar: '#F6F2E8',
    sidebarBorder: 'rgba(202, 161, 91, 0.28)',
    forest: '#173B35',
    forestSoft: '#36574F',
    gold: '#C9A35D',
    goldLine: '#D8BC8B',
    goldBorder: '#CCB27F',
    ivory: '#F5EFE3',
    ink: '#111827',
    muted: '#4B5563',
    surface: '#FAF7EF',
  };

  const isEditorMode = Boolean(props.isEditorMode);
  const profile = props.profile || {};
  const recipient = props.recipient || {};
  const signature = props.signature || {};
  const skills = props.skills || [];

  const [initialA, initialB] = getInitials(profile.fullName);
  const nameLines = toDisplayNameLines(profile.fullName);

  const bodyBlocks = extractBodyBlocks(props.body);
  const leadBlock = bodyBlocks[0] || {
    tag: 'p',
    html: 'Your opening paragraph appears here.',
  };
  const narrativeBlocks = bodyBlocks.slice(1);

  const updateBodyBlock = (index, html) => {
    const nextBlocks = bodyBlocks.map((block, blockIndex) =>
      blockIndex === index ? { ...block, html } : block
    );

    props.onUpdateBody?.(serializeBodyBlocks(nextBlocks));
  };

  const cleanSkills = skills.filter((skill) => hasValue(skill)).slice(0, 5);

  const strengths = (
    cleanSkills.length > 0
      ? cleanSkills
      : [
          'Strategic Vision',
          'People & Culture',
          'Business Growth',
          'Innovation Mindset',
        ]
  )
    .slice(0, 3)
    .map((skill, index) => ({
      icon: [Target, Users, TrendingUp][index] || Target,
      title: skill,
      description:
        [
          'Turning long-term vision into clear business direction.',
          'Building trusted teams and stakeholder alignment.',
          'Driving outcomes through disciplined execution.',
        ][index] || 'A leadership strength presented with executive clarity.',
    }));

  const footerStats = [
    {
      icon: Trophy,
      value: formatExperience(profile.experienceYears, profile.experienceMonths),
      label: 'Years of Experience',
    },
    {
      icon: TrendingUp,
      value: `${Math.max(cleanSkills.length, 4)}`,
      label: 'Core Strengths',
    },
    {
      icon: Globe2,
      value: hasValue(recipient.company) ? recipient.company : 'Target Company',
      label: 'Target Company',
    },
  ];

  const showSignature =
    hasValue(signature.closing) ||
    hasValue(profile.fullName) ||
    signature.enabled ||
    isEditorMode;

  return (
    <div
      id="cover-letter-preview"
      className="mx-auto bg-white shadow-2xl"
      style={{
        width: '210mm',
        minHeight: '297mm',
        boxSizing: 'border-box',
        fontFamily:
          props.design?.fontFamily ||
          '"Inter", "Aptos", "Helvetica Neue", Arial, sans-serif',
        backgroundColor: palette.page,
        color: palette.ink,
      }}
    >
      <div
        className="grid min-h-[297mm] bg-white"
        style={{ gridTemplateColumns: '56mm 1fr' }}
      >
        {/* SIDEBAR */}
        <aside
          className="text-[#173B35]"
          style={{
            backgroundColor: palette.sidebar,
            color: palette.forest,
            boxShadow: `inset -1px 0 0 ${palette.sidebarBorder}`,
          }}
        >
          <div className="px-6 pb-5 pt-5">
            {/* MONOGRAM */}
            <div
              className="mx-auto flex h-[76px] w-[76px] items-center justify-center border shadow-[inset_0_0_0_2px_rgba(201,163,93,0.24)]"
              style={{
                borderColor: palette.goldBorder,
                backgroundColor: palette.forest,
              }}
            >
              <div
                className="relative h-[58px] w-[58px]"
                style={{ color: palette.ivory }}
              >
                <span className="absolute left-1 top-0 text-[26px] font-light leading-none">
                  {initialA}
                </span>

                <span className="absolute bottom-0 right-1 text-[26px] font-light leading-none">
                  {initialB}
                </span>

                <span
                  className="absolute left-[8px] top-[28px] h-px w-[45px] rotate-[-48deg]"
                  style={{ backgroundColor: palette.gold }}
                />
              </div>
            </div>

            {/* NAME */}
            <div className="mt-4 text-center">
              <div
                className="space-y-0.5 text-[15px] font-semibold uppercase leading-tight tracking-[0.2em]"
                style={{ color: palette.forest }}
              >
                {(nameLines.length > 0 ? nameLines : ['Your', 'Name']).map(
                  (line, index) => (
                    <div key={`${line}-${index}`}>
                      <InlineEditable
                        value={line}
                        enabled={false}
                        className="block"
                      />
                    </div>
                  )
                )}
              </div>

              <p
                className="mt-3 text-[10px] font-semibold uppercase leading-4 tracking-[0.1em]"
                style={{ color: palette.gold }}
              >
                <InlineEditable
                  value={[profile.currentJobTitle, cleanSkills[0], cleanSkills[1]]
                    .filter(hasValue)
                    .slice(0, 3)
                    .join('  |  ')}
                  enabled={isEditorMode}
                  placeholder="Strategist  |  Leader"
                  onCommit={(value) => {
                    const parts = value
                      .split('|')
                      .map((part) => part.trim())
                      .filter(Boolean);

                    props.onUpdateProfileField?.('currentJobTitle', parts[0] || '');
                    props.onUpdateSkill?.(0, parts[1] || '');
                    props.onUpdateSkill?.(1, parts[2] || '');
                  }}
                  mutedPlaceholderClass="text-[#c9a35d]/65 italic"
                />
              </p>

              <p
                className="mt-2 text-[10.5px] italic"
                style={{ color: palette.forestSoft }}
              >
                Driving Impact. Building Futures.
              </p>
            </div>

            <div
              className="mx-auto mt-4 h-px w-10"
              style={{ backgroundColor: palette.goldLine }}
            />

            {/* CONTACT */}
            <SidebarSection title="Let's Connect" palette={palette}>
              <div className="space-y-2.5">
                <SidebarContactLine
                  icon={Phone}
                  value={profile.phone}
                  enabled={isEditorMode}
                  placeholder="Phone"
                  onCommit={(value) => props.onUpdateProfileField?.('phone', value)}
                />

                <SidebarContactLine
                  icon={Mail}
                  value={profile.email}
                  enabled={isEditorMode}
                  placeholder="Email"
                  onCommit={(value) => props.onUpdateProfileField?.('email', value)}
                />

                <SidebarContactLine
                  icon={Linkedin}
                  value={profile.linkedinPortfolio}
                  enabled={isEditorMode}
                  placeholder="linkedin.com/in/yourname"
                  onCommit={(value) =>
                    props.onUpdateProfileField?.('linkedinPortfolio', value)
                  }
                />

                <SidebarContactLine
                  icon={MapPin}
                  value={profile.address}
                  enabled={isEditorMode}
                  placeholder="City, State"
                  onCommit={(value) =>
                    props.onUpdateProfileField?.('address', value)
                  }
                />
              </div>
            </SidebarSection>

            {/* STRENGTHS */}
            <SidebarSection title="What I Bring" palette={palette}>
              <div className="space-y-3">
                {strengths.map(({ icon: Icon, title, description }, index) => (
                  <div key={`${title}-${index}`} className="flex gap-2.5">
                    <Icon
                      className="mt-0.5 shrink-0"
                      style={{ color: palette.gold }}
                      size={18}
                      strokeWidth={1.8}
                    />

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.05em] text-[#111827]">
                        {title}
                      </p>

                      <p
                        className="mt-0.5 text-[9.8px] font-medium leading-4"
                        style={{ color: palette.forest }}
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarSection>
          </div>

          {/* QUOTE */}
          <div
            className="px-6 py-4"
            style={{ backgroundColor: palette.forest, color: palette.ivory }}
          >
            <Quote size={18} style={{ color: palette.gold }} />

            <p className="mt-3 text-[10.5px] italic leading-5">
              The best way to predict the future is to create it.
            </p>

            <p className="mt-2 text-[10px] font-semibold" style={{ color: palette.gold }}>
              Peter Drucker
            </p>
          </div>
        </aside>

        {/* MAIN */}
        <main
          className="px-7 py-6 text-[#111827]"
          style={{ backgroundColor: palette.page, color: palette.ink }}
        >
          {/* HEADER */}
          <header className="border-b pb-4" style={{ borderColor: palette.goldLine }}>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1" style={{ backgroundColor: palette.goldLine }} />

              <p className="text-[9.5px] font-black uppercase tracking-[0.18em] text-[#111827]">
                Cover Letter
              </p>

              <div className="h-px flex-1" style={{ backgroundColor: palette.goldLine }} />
            </div>

            <div className="mt-4 grid grid-cols-[1fr_auto] gap-6">
              <div>
                <p className="text-[11.5px] font-semibold text-[#111827]">
                  {formatLongDate()}
                </p>

                {(hasValue(recipient.targetRole) || hasValue(recipient.company)) && (
                  <p className="mt-1.5 text-[11px] font-semibold text-[#4B5563]">
                    {[recipient.targetRole, recipient.company]
                      .filter(hasValue)
                      .join(' · ')}
                  </p>
                )}
              </div>

              {(hasValue(recipient.name) ||
                hasValue(recipient.title) ||
                hasValue(recipient.company) ||
                hasValue(recipient.address)) && (
                <div
                  className="min-w-[40mm] max-w-[58mm] border-l-4 pl-3 text-[11px] leading-4 text-[#4B5563]"
                  style={{ borderColor: palette.gold }}
                >
                  <p className="mb-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#6B7280]">
                    To
                  </p>

                  {hasValue(recipient.name) && (
                    <p className="font-black text-[#111827]">{recipient.name}</p>
                  )}

                  {hasValue(recipient.title) && <p>{recipient.title}</p>}

                  {hasValue(recipient.company) && (
                    <p className="font-bold text-[#111827]">{recipient.company}</p>
                  )}

                  {hasValue(recipient.address) && (
                    <p className="break-words">{recipient.address}</p>
                  )}
                </div>
              )}
            </div>
          </header>

          {/* BODY */}
          <section className="mt-5">
            <div
              className="grid grid-cols-[22px_1fr] bg-white"
              style={{ border: `1px solid ${palette.goldBorder}` }}
            >
              <div
                className="flex items-center justify-center"
                style={{ backgroundColor: palette.forest, color: palette.gold }}
              >
                <ChevronRight size={15} strokeWidth={2.5} />
              </div>

              <div className="px-4 py-3">
                <EditableBodyBlock
                  html={leadBlock.html}
                  onCommit={(html) => updateBodyBlock(0, html)}
                  className="text-[11.7px] font-medium leading-6 text-[#111827] [&>*:last-child]:mb-0"
                />
              </div>
            </div>

            {narrativeBlocks.length > 0 && (
              <div
                className="relative ml-4 mt-4 pl-3"
                style={{ borderLeft: `1px dotted ${palette.goldLine}` }}
              >
                {narrativeBlocks.map((block, index) => {
                  const Icon = [UserRound, TrendingUp, Target, Send][index] || Target;

                  return (
                    <div
                      key={`narrative-${index}`}
                      className="relative pb-4 pl-2 last:pb-0"
                    >
                      <div
                        className="absolute -left-[29px] top-1 flex h-7 w-7 items-center justify-center rounded-full shadow-[0_0_0_4px_#ffffff]"
                        style={{
                          backgroundColor: palette.forest,
                          color: palette.ivory,
                        }}
                      >
                        <Icon size={13} strokeWidth={2} />
                      </div>

                      <EditableBodyBlock
                        html={block.html}
                        onCommit={(html) => updateBodyBlock(index + 1, html)}
                        className="text-[11.7px] font-medium leading-6 text-[#111827] [&>*:last-child]:mb-0"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* IMPACT STATS */}
          <section className="mt-5 border-y py-3" style={{ borderColor: palette.goldLine }}>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1" style={{ backgroundColor: palette.goldLine }} />

              <p className="text-[9.5px] font-black uppercase tracking-[0.16em] text-[#111827]">
                Track Record
              </p>

              <div className="h-px flex-1" style={{ backgroundColor: palette.goldLine }} />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {footerStats.map(({ icon: Icon, value, label }, index) => (
                <div
                  key={`${label}-${index}`}
                  className="flex items-start gap-2 pr-2 last:pr-0"
                  style={{
                    borderRight:
                      index === footerStats.length - 1
                        ? 'none'
                        : `1px solid ${palette.goldLine}`,
                  }}
                >
                  <Icon
                    size={18}
                    className="mt-0.5 shrink-0"
                    style={{ color: palette.forest }}
                    strokeWidth={1.7}
                  />

                  <div>
                    <p className="text-[9.8px] font-black leading-4 text-[#111827]">
                      {value}
                    </p>

                    <p
                      className="mt-0.5 text-[8.8px] font-medium leading-3"
                      style={{ color: palette.muted }}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SIGNATURE */}
          {showSignature && (
            <footer className="mt-5 border-t pt-4" style={{ borderColor: palette.goldLine }}>
              <InlineEditable
                as="p"
                value={signature.closing}
                enabled={isEditorMode}
                placeholder="Warm regards,"
                onCommit={(value) => props.onUpdateSignatureField?.('closing', value)}
                className={`text-[12px] font-semibold text-[#111827] ${
                  !hasValue(signature.closing) && isEditorMode ? '!text-slate-400' : ''
                }`}
                mutedPlaceholderClass="text-slate-400 italic"
              />

              {signature.enabled ? (
                signature.image ? (
                  <img
                    src={signature.image}
                    alt={`${profile.fullName || 'Profile'} signature`}
                    className="mt-2 h-10 max-w-[150px] object-contain"
                  />
                ) : (
                  <InlineEditable
                    as="div"
                    value={signature.text}
                    enabled={isEditorMode}
                    placeholder={profile.fullName || 'Signature'}
                    onCommit={(value) => props.onUpdateSignatureField?.('text', value)}
                    className={`mt-2 text-[26px] leading-none ${
                      !hasValue(signature.text) && isEditorMode ? '!text-slate-400' : ''
                    }`}
                    style={{
                      fontFamily: signature.font || '"Segoe Script", "Brush Script MT", cursive',
                      color: palette.forest,
                    }}
                    mutedPlaceholderClass="text-slate-400 italic"
                  />
                )
              ) : null}

              {(hasValue(profile.fullName) || isEditorMode) && (
                <p className="mt-1.5 text-[11.5px] font-black uppercase tracking-[0.08em] text-[#111827]">
                  <InlineEditable
                    value={profile.fullName}
                    enabled={isEditorMode}
                    placeholder="Your Name"
                    onCommit={(value) => props.onUpdateProfileField?.('fullName', value)}
                    className={!hasValue(profile.fullName) && isEditorMode ? '!text-slate-400' : ''}
                    mutedPlaceholderClass="text-slate-400 italic"
                  />
                </p>
              )}
            </footer>
          )}
        </main>
      </div>
    </div>
  );
};

const SidebarSection = ({ title, palette, children }) => (
  <section className="mt-5">
    <h3 className="text-[9.5px] font-black uppercase tracking-[0.12em] text-[#111827]">
      {title}
    </h3>

    <div className="mt-2 h-px w-9" style={{ backgroundColor: palette.goldLine }} />

    <div className="mt-3">{children}</div>
  </section>
);

export default UltraExclusiveTemplate;