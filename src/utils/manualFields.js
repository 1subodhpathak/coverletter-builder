export const manualFieldLabels = {
  fullName: 'Full Name',
  email: 'Email',
  phone: 'Phone',
  address: 'Location',
  linkedinPortfolio: 'LinkedIn / Portfolio',
  currentJobTitle: 'Current Job Title',
  experienceYears: 'Total Experience Years',
  experienceMonths: 'Total Experience Months',
  company: 'Company Name',
  targetRole: 'Target Job Role / Position',
  name: 'Hiring Manager',
  title: 'Hiring Manager Designation',
  recipientAddress: 'Company Address',
};

export const isManualFieldFilled = (value) =>
  typeof value === 'string' && value.length > 0;

export const getDisplayValue = (value) =>
  typeof value === 'string' ? value.trim() : '';

export const sanitizeProfileForCanvas = (profile = {}) => ({
  ...profile,
  fullName: getDisplayValue(profile.fullName),
  email: getDisplayValue(profile.email),
  phone: getDisplayValue(profile.phone),
  address: getDisplayValue(profile.address),
  linkedinPortfolio: getDisplayValue(profile.linkedinPortfolio),
  currentJobTitle: getDisplayValue(profile.currentJobTitle),
  experienceYears: getDisplayValue(profile.experienceYears),
  experienceMonths: getDisplayValue(profile.experienceMonths),
});

export const sanitizeRecipientForCanvas = (recipient = {}) => ({
  ...recipient,
  name: getDisplayValue(recipient.name),
  title: getDisplayValue(recipient.title),
  company: getDisplayValue(recipient.company),
  address: getDisplayValue(recipient.address),
  targetRole: getDisplayValue(recipient.targetRole),
});

export const sanitizeSignatureForCanvas = (signature = {}, fallbackName = '') => ({
  ...signature,
  text: getDisplayValue(signature.text) || getDisplayValue(fallbackName),
  closing: getDisplayValue(signature.closing) || 'Sincerely,',
});

export const getManualFieldErrors = ({ profile = {}, recipient = {} }) => {
  const missing = [];

  if (!isManualFieldFilled(profile.fullName)) missing.push(manualFieldLabels.fullName);
  if (!isManualFieldFilled(profile.email)) missing.push(manualFieldLabels.email);
  if (!isManualFieldFilled(profile.phone)) missing.push(manualFieldLabels.phone);
  if (!isManualFieldFilled(profile.address)) missing.push(manualFieldLabels.address);
  if (!isManualFieldFilled(profile.currentJobTitle)) missing.push(manualFieldLabels.currentJobTitle);
  if (!isManualFieldFilled(profile.experienceYears)) missing.push(manualFieldLabels.experienceYears);
  if (!isManualFieldFilled(profile.experienceMonths)) missing.push(manualFieldLabels.experienceMonths);
  if (!isManualFieldFilled(recipient.company)) missing.push(manualFieldLabels.company);
  if (!isManualFieldFilled(recipient.targetRole)) missing.push(manualFieldLabels.targetRole);
  if (!isManualFieldFilled(recipient.name)) missing.push(manualFieldLabels.name);
  if (!isManualFieldFilled(recipient.title)) missing.push(manualFieldLabels.title);
  if (!isManualFieldFilled(recipient.address)) missing.push(manualFieldLabels.recipientAddress);

  return missing;
};
