import { professionalTemplateConfigs } from './professionalTemplateCatalog';

export const getTemplateCategory = (id) => {
  const categories = {
    'ats-friendly': 'ATS Ready',
    'business-analyst': 'Analytics',
    'career-pivot': 'Career Change',
    'fresh-graduate-internship': 'Entry Level',
    'internal-promotion-transfer': 'Internal Move',
    'solution-architect': 'Architecture',
    'professional-plain': 'Plain',
    'media-person': 'Editorial',
    'professional-editorial': 'Editorial',
    'medical-professional': 'Healthcare',
    'professional-clinical': 'Healthcare',
    'nurse-clinical': 'Healthcare',
    'legal-counsel': 'Formal',
    'professional-formal': 'Formal',
    'finance-analyst': 'Finance',
    'data-scientist': 'Data',
    'product-manager': 'Product',
    referral: 'Networking',
    'relocation-remote': 'Remote',
    'teacher-educator': 'Academic',
    hospitality: 'Service',
    'sales-executive': 'Revenue',
    'marketing-manager': 'Marketing',
    'software-engineer': 'Technical',
    'professional-technical': 'Technical',
    'project-manager': 'Delivery',
    'ux-designer': 'Creative',
    'operations-manager': 'Operations',
    'hr-recruiter': 'People',
    government: 'Civic',
    'ceo-portrait': 'Executive',
    'ceo-board-letter': 'Executive',
    'managing-director-photo': 'Executive',
    'ceo-blue-header': 'Executive',
    'executive-banner-letter': 'Executive',
    'ceo-strategy-bar': 'Executive',
    'cfo-boardroom': 'Boardroom',
    'cto-innovation': 'Technology',
    'executive-gold-frame': 'Executive',
    'executive-leadership-classic': 'Executive',
    'vp-operations-executive': 'Operations',
    'executive-profile-sidebar': 'Executive',
    'director-slate': 'Executive',
    'president-classic': 'Classic',
    'chief-people-officer': 'People',
    'gamer-arena': 'Graphic',
    'magazine-cover': 'Graphic',
    'sql-terminal': 'Graphic',
    'youtube-creator': 'Graphic',
    'architect-grid': 'Graphic',
    'student-notes': 'Graphic',
    'motion-designer-board': 'Graphic',
    'super-exclusive': 'Executive',
    'ultra-exclusive': 'Executive',
  };

  return categories[id] || 'Professional';
};

export const getTemplateDescription = (template) => {
  const descriptions = {
    'ats-friendly': 'Clean, parser-safe structure for online applications and applicant tracking systems.',
    ivy: 'Formal academic layout for research, education, fellowships, and selective programs.',
    'business-analyst': 'Data-forward layout for reporting, operations, BI, and analyst roles.',
    'solution-architect': 'Structured design for architecture, consulting, cloud, and systems roles.',
    'media-person': 'Editorial layout for media, communications, production, and content roles.',
    'medical-professional': 'Calm clinical format for healthcare, hospital, and patient-care positions.',
    'ceo-portrait': 'Premium portrait-sidebar design for senior leadership applications.',
    'ceo-board-letter': 'Formal board-facing CEO letter with numbered guide rail and executive typography.',
    'managing-director-photo': 'Minimal editorial photo layout for executive-level letters.',
    'ceo-blue-header': 'Strong blue masthead for high-impact leadership narratives.',
    'executive-banner-letter': 'Executive banner layout with a premium masthead, portrait badge, and polished left quote rail.',
    'ceo-strategy-bar': 'Strategy-first layout for growth, profitability, and transformation stories.',
    'cfo-boardroom': 'Boardroom layout for finance, audit, and capital-focused narratives.',
    'cto-innovation': 'Technology-forward layout for innovation and transformation stories.',
    'executive-gold-frame': 'Gold-accent executive layout with a framed sidebar, achievement panels, and formal application styling.',
    'executive-leadership-classic': 'Classic executive composition with centered masthead, structured strengths sidebar, and formal letter flow.',
    'vp-operations-executive': 'Operational leadership layout for scale, delivery, and execution.',
    'executive-profile-sidebar': 'Executive profile layout with a dark strategy sidebar, summary panel, and premium narrative canvas.',
    'director-slate': 'Refined slate design for polished senior-level applications.',
    'president-classic': 'Classic enterprise layout for formal leadership communication.',
    'chief-people-officer': 'People-focused executive layout for culture and organization stories.',
    'gamer-arena': 'Graphic dark-mode layout with game-inspired scoring, panels, and bright accent structure.',
    'magazine-cover': 'Editorial cover layout with bold typography, photo-forward composition, and feature-style copy.',
    'sql-terminal': 'Terminal-inspired layout with code-editor spacing, line numbers, and high-contrast sections.',
    'youtube-creator': 'Video-page inspired layout with media controls, channel-style identity, and description panel.',
    'architect-grid': 'Architectural grid layout with blueprint spacing, structured content blocks, and crisp blue accents.',
    'student-notes': 'Playful notes-board layout with rounded cards, photo placement, contact blocks, and study-style labels.',
    'motion-designer-board': 'Creative board layout with profile card, sticky note, skill chips, and editorial application flow.',
    'super-exclusive': 'Luxury executive layout with a dark-gold sidebar, refined serif masthead, and boardroom-style positioning.',
    'ultra-exclusive': 'Editorial boardroom design with a soft ivory canvas, deep green sidebar, timeline narrative, and premium impact footer.',
  };

  return descriptions[template.id] || `A polished ${template.tag.toLowerCase()} layout for professional cover letters.`;
};

const baseTemplates = [
  { id: 'modern', name: 'Modern Clean', tag: 'Corporate' },
  { id: 'ivy', name: 'Ivy League', tag: 'Academic' },
  { id: 'executive', name: 'Executive', tag: 'Leadership' },
  { id: 'sidebar', name: 'Sidebar Mono', tag: 'Compact' },
  { id: 'minimalist', name: 'Minimalist', tag: 'Simple' },
  { id: 'classic', name: 'Classic Format', tag: 'Traditional' },
  { id: 'creative', name: 'Creative Shapes', tag: 'Creative' },
  { id: 'modern-block', name: 'Modern Block', tag: 'Modern' },
  { id: 'artistic', name: 'Artistic', tag: 'Warm' },
  { id: 'timeline', name: 'Timeline Pro', tag: 'Premium' },
];

const buildTemplateCatalog = (configs) => {
  const professionalTemplateOptions = Object.entries(configs).map(([id, config]) => ({
    id,
    name: config.name,
    tag: getTemplateCategory(id),
    professional: true,
  }));

  const professionalTemplateIds = professionalTemplateOptions.map((template) => template.id);
  const allTemplateOptions = [...baseTemplates, ...professionalTemplateOptions];
  const templatePriorityOrder = [
    'ivy',
    'super-exclusive',
    'executive',
    'ceo-portrait',
    'ceo-board-letter',
    'chief-people-officer',
    'ultra-exclusive',
    'youtube-creator',
    'sql-terminal',
    'gamer-arena',
    'magazine-cover',
    'student-notes',
    'motion-designer-board',
    'managing-director-photo',
    'executive-banner-letter',
    'operations-manager',
    'ats-friendly',
    'medical-professional',
    'business-analyst',
    'solution-architect',
    'software-engineer',
    'cfo-boardroom',
    'cto-innovation',
    'executive-gold-frame',
    'executive-leadership-classic',
    'executive-profile-sidebar',
    'vp-operations-executive',
    'director-slate',
    'architect-grid',
    'modern',
    'minimalist',
    'classic',
  ];

  const priorityTemplates = templatePriorityOrder
    .map((id) => allTemplateOptions.find((template) => template.id === id))
    .filter(Boolean);

  const remainingTemplates = allTemplateOptions.filter(
    (template) => !templatePriorityOrder.includes(template.id)
  );

  const templateOptions = [...priorityTemplates, ...remainingTemplates];

  return {
    professionalTemplateOptions,
    professionalTemplateIds,
    templateOptions,
    templateCount: templateOptions.length,
  };
};

export const {
  professionalTemplateOptions,
  professionalTemplateIds,
  templateOptions,
  templateCount,
} = buildTemplateCatalog(professionalTemplateConfigs);
