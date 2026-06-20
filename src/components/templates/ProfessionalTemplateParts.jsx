import React from 'react';
import fallbackProfilePhoto from '../../assets/Kreeti-520.jpg';

export const getProfilePhoto = (profile) => profile.photo || fallbackProfilePhoto;

const hasValue = (value) => Boolean(value?.trim?.());
const joinContactParts = (...parts) => parts.filter(hasValue);

export const Header = ({ profile }) => (
  <div className="mb-8">
    {hasValue(profile.fullName) && <h1 className="text-4xl font-black tracking-tight text-slate-950">{profile.fullName}</h1>}
    {joinContactParts(profile.email, profile.phone, profile.address, profile.linkedinPortfolio).length > 0 && (
      <p className="mt-3 flex flex-wrap gap-2 text-sm font-semibold text-slate-500">
        {joinContactParts(profile.email, profile.phone, profile.address, profile.linkedinPortfolio).map((part, index) => (
          <React.Fragment key={`${part}-${index}`}>
            {index > 0 && <span>·</span>}
            <span>{part}</span>
          </React.Fragment>
        ))}
      </p>
    )}
  </div>
);

export const Body = ({ body, design, onUpdateBody, className = 'text-slate-700' }) => (
  <div
    className={`prose max-w-none focus:outline-none focus:ring-2 focus:ring-indigo-100 [&_div]:text-[length:inherit] [&_div]:leading-[inherit] [&_li]:text-[length:inherit] [&_li]:leading-[inherit] [&_ol]:text-[length:inherit] [&_ol]:leading-[inherit] [&_p]:text-[length:inherit] [&_p]:leading-[inherit] [&_ul]:text-[length:inherit] [&_ul]:leading-[inherit] ${className}`}
    style={{ fontSize: `${design.fontSize}px`, lineHeight: design.lineHeight }}
    dangerouslySetInnerHTML={{ __html: body }}
    data-editor-body="true"
    contentEditable={true}
    suppressContentEditableWarning={true}
    onBlur={(e) => onUpdateBody(e.currentTarget.innerHTML)}
  />
);

export const Signature = ({ signature, profile, accent }) => {
  const showClosing = hasValue(signature.closing);
  const showScriptSignature = signature.enabled && (Boolean(signature.image) || hasValue(signature.text));
  const showName = hasValue(profile.fullName);

  if (!showClosing && !showScriptSignature && !showName) return null;

  return (
    <div className="mt-10">
      {showClosing && <p className="font-bold text-slate-900">{signature.closing}</p>}
      {showScriptSignature ? (
        signature.image ? (
          <img src={signature.image} alt={`${profile.fullName} signature`} className="mt-4 h-14 max-w-[180px] object-contain" />
        ) : (
          <div className="mt-4 text-3xl" style={{ fontFamily: signature.font, color: accent }}>{signature.text}</div>
        )
      ) : null}
      {showName && <p className="mt-1 text-sm font-black text-slate-900">{profile.fullName}</p>}
    </div>
  );
};

export const PhotoBlock = ({ profile, accent, className = '' }) => (
  <img src={getProfilePhoto(profile)} alt={`${profile.fullName || 'Profile'} profile`} className={`object-cover ${className}`} />
);

export const SidebarContact = ({ profile, recipient }) => (
  <div className="mt-14 space-y-8 text-[14px] leading-6 text-slate-600">
    {joinContactParts(profile.phone, profile.email, profile.address, profile.linkedinPortfolio).length > 0 && (
      <div className="border-y border-slate-300 py-4">
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-700">Contact</p>
        {hasValue(profile.phone) && <p><strong>Phone</strong> · {profile.phone}</p>}
        {hasValue(profile.email) && <p className="mt-2 break-all"><strong>Email</strong> · {profile.email}</p>}
        {hasValue(profile.address) && <p className="mt-2"><strong>Address</strong> · {profile.address}</p>}
        {hasValue(profile.linkedinPortfolio) && <p className="mt-2 break-all"><strong>LinkedIn / Portfolio</strong> · {profile.linkedinPortfolio}</p>}
      </div>
    )}
    {joinContactParts(recipient.name, recipient.title, recipient.company, recipient.address).length > 0 && (
      <div className="border-b border-slate-300 pb-4">
        <p className="mb-4 text-[11px] font-black uppercase tracking-normal text-slate-700">To</p>
        {hasValue(recipient.name) && <p className="font-black text-slate-900">{recipient.name}</p>}
        {hasValue(recipient.title) && <p>{recipient.title}</p>}
        {hasValue(recipient.company) && <p>{recipient.company}</p>}
        {hasValue(recipient.address) && <p>{recipient.address}</p>}
      </div>
    )}
  </div>
);

export const ContactLines = ({ profile, dark = false }) => (
  joinContactParts(profile.address, profile.phone, profile.email, profile.linkedinPortfolio).length > 0 ? (
    <div className={`space-y-2.5 text-[14px] leading-6 ${dark ? 'text-white/85' : 'text-slate-600'}`}>
      <p className={`text-[11px] font-black uppercase tracking-[0.18em] ${dark ? 'text-white' : 'text-slate-900'}`}>Contact</p>
      {hasValue(profile.address) && <p>{profile.address}</p>}
      {hasValue(profile.phone) && <p>{profile.phone}</p>}
      {hasValue(profile.email) && <p className="break-all">{profile.email}</p>}
      {hasValue(profile.linkedinPortfolio) && <p className="break-all">{profile.linkedinPortfolio}</p>}
    </div>
  ) : null
);

export const RecipientBlock = ({ recipient, dark = false }) => (
  joinContactParts(recipient.name, recipient.title, recipient.company, recipient.address).length > 0 ? (
    <div className={`space-y-1 text-[14px] leading-6 ${dark ? 'text-white/85' : 'text-slate-600'}`}>
      <p className={`text-[11px] font-black uppercase tracking-normal ${dark ? 'text-white' : 'text-slate-900'}`}>To</p>
      {hasValue(recipient.name) && <p className={`font-black ${dark ? 'text-white' : 'text-slate-900'}`}>{recipient.name}</p>}
      {hasValue(recipient.title) && <p>{recipient.title}</p>}
      {hasValue(recipient.company) && <p>{recipient.company}</p>}
      {hasValue(recipient.address) && <p>{recipient.address}</p>}
    </div>
  ) : null
);

export const SkillStrip = ({ skills, accent, dark = false }) => skills?.length > 0 && (
  <div className="mt-8 flex flex-wrap gap-2">
    {skills.slice(0, 5).map((skill) => (
      <span key={skill} className={`rounded-full px-3 py-1 text-xs font-black ${dark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`} style={!dark ? { color: accent } : undefined}>
        {skill}
      </span>
    ))}
  </div>
);
