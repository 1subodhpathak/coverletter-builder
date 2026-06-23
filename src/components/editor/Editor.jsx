import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { generateCoverLetter } from '../../services/groqService';
import LoadingSkeleton from '../landing/LoadingSkeleton';
import { useClerk } from '@clerk/clerk-react';

// --- TEMPLATE IMPORTS ---
import ModernTemplate from '../templates/ModernTemplate';
import IvyLeagueTemplate from '../templates/IvyLeagueTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import SidebarTemplate from '../templates/SidebarTemplate';
import MinimalistTemplate from '../templates/MinimalistTemplate';
import ClassicTemplate from '../templates/ClassicTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ModernColorBlockTemplate from '../templates/ModernColorBlockTemplate';
import ArtisticTemplate from '../templates/ArtisticTemplate';
import TimelineTemplate from '../templates/TimelineTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import { getProfilePhoto } from '../templates/ProfessionalTemplateParts';
import { professionalTemplateIds, templateOptions } from '../templates/templateCatalog';
import {
  getDisplayValue,
  sanitizeProfileForCanvas,
  sanitizeRecipientForCanvas,
  sanitizeSignatureForCanvas,
} from '../../utils/manualFields';
import { getSkillSuggestions } from './skillsLibrary';
import { renderScratchParagraph, scratchParagraphSections } from './scratchParagraphLibrary';

import { 
  Download, Type, Layout, Palette, ChevronLeft, CheckCircle2, Zap,
  PenTool, User, MapPin, Phone, Mail, X, Grid, Camera, Trash2, Upload, 
  Building2, Briefcase, Plus, Sparkles, RefreshCw, Layers, AlignLeft,
  Bold, Italic, Underline, List, Undo2, Redo2, AlignCenter, AlignRight, Eye,
  Search, Settings2, AlertTriangle
} from 'lucide-react';

const Editor = ({ guideTarget }) => {
  const clerk = useClerk();
  // GET DATA FROM STORE
  const { 
    generatedLetter, resumeText, jobDescription, setGeneratedLetter,
    creationMode,
    selectedTemplate, setSelectedTemplate,
    profile, updateProfile,
    recipient, updateRecipient,
    skills, setSkills,
    signature, updateSignature,
    design, updateDesign,
    setStep,
    upsertSavedLetter,
    clerkUserId, clerkGetToken
  } = useStore();
  
  // --- LOCAL UI STATE ---
  const [activeTab, setActiveTab] = useState('profile'); 
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [templateSearch, setTemplateSearch] = useState('');

  // AI REGENERATION STATE
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [aiTone, setAiTone] = useState('Professional');
  const [pendingRebuiltLetter, setPendingRebuiltLetter] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [activeSkillSuggestionIndex, setActiveSkillSuggestionIndex] = useState(0);
  const [selectedScratchOptions, setSelectedScratchOptions] = useState(() => (
    Object.fromEntries(scratchParagraphSections.map((section) => [section.id, 0]))
  ));
  const [sidebarWidth, setSidebarWidth] = useState(340);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [activeFontSize, setActiveFontSize] = useState(14);
  const [pageFitStatus, setPageFitStatus] = useState({ level: 'safe', overflowPx: 0 });
  const lastEditorSelection = useRef(null);
  const skillInputRef = useRef(null);
  const skillDropdownRef = useRef(null);
  const sidebarResizeState = useRef({ startX: 0, startWidth: 340 });
  const pendingSelectionOffsetsRef = useRef(null);
  const previewFrameRef = useRef(null);
  const previewModalFrameRef = useRef(null);
  const photoForwardTemplates = [
    'ceo-portrait',
    'managing-director-photo',
    'magazine-cover',
    'youtube-creator',
    'gamer-arena',
    'student-notes',
    'motion-designer-board',
    'ivy',
    'modern',
    'creative',
  ];
  const selectedTemplateNeedsPhoto = photoForwardTemplates.includes(selectedTemplate);
  const canvasProfile = sanitizeProfileForCanvas(profile);
  const canvasRecipient = sanitizeRecipientForCanvas(recipient);
  const canvasSignature = sanitizeSignatureForCanvas(signature, canvasProfile.fullName);

  // --- PRESET THEMES ---
  const presetThemes = [
    { name: 'Corporate', color: '#1e3a8a', font: 'Georgia, serif', label: 'Finance & Law' },
    { name: 'Tech', color: '#0d9488', font: '"Inter", sans-serif', label: 'Software & IT' },
    { name: 'Creative', color: '#db2777', font: '"Lato", sans-serif', label: 'Design & Media' },
    { name: 'Nature', color: '#16a34a', font: '"Merriweather", serif', label: 'Environmental' },
    { name: 'Classic', color: '#334155', font: '"Courier New", Courier, monospace', label: 'Academic' },
    { name: 'Warm', color: '#ea580c', font: 'Georgia, serif', label: 'Marketing' },
  ];

  const colors = [
        '#000000', '#334155', '#4b5563', '#1e3a8a',
        '#5B7C99', '#8C92AC', '#4F9D9D', '#2563eb', '#0a66c2', '#0891b2',
        '#8FBC8F', '#C1B098', '#7FB098', '#0d9488', '#059669', '#16a34a',
        '#D6AE5D', '#E07A5F', '#D8A1A1', '#ca8a04', '#d97706', '#ea580c', '#dc2626',
        '#9B90C2', '#e11d48', '#db2777', '#c026d3', '#7c3aed', '#5b21b6'
  ];

  const fonts = [
      { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
      { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
      { name: 'Georgia', value: 'Georgia, serif' },
      { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
      { name: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
      { name: 'Garamond', value: 'Garamond, serif' },
      { name: 'Tahoma', value: 'Tahoma, Verdana, sans-serif' },
      { name: 'Courier New', value: '"Courier New", Courier, monospace' },
      { name: 'Inter', value: '"Inter", sans-serif' },
      { name: 'Roboto', value: '"Roboto", sans-serif' },
      { name: 'Open Sans', value: '"Open Sans", sans-serif' },
      { name: 'Lato', value: '"Lato", sans-serif' },
      { name: 'Montserrat', value: '"Montserrat", sans-serif' },
      { name: 'Raleway', value: '"Raleway", sans-serif' },
      { name: 'Poppins', value: '"Poppins", sans-serif' },
      { name: 'Nunito', value: '"Nunito", sans-serif' },
      { name: 'Merriweather', value: '"Merriweather", serif' },
      { name: 'Playfair Display', value: '"Playfair Display", serif' },
      { name: 'Lora', value: '"Lora", serif' },
      { name: 'Spectral', value: '"Spectral", serif' }
  ];

  const signatureStyles = [
    { name: 'Great Vibes', value: "'Great Vibes', cursive" },
    { name: 'Alex Brush', value: "'Alex Brush', cursive" },
    { name: 'Dancing Script', value: "'Dancing Script', cursive" },
    { name: 'Sacramento', value: "'Sacramento', cursive" },
    { name: 'Allura', value: "'Allura', cursive" },
    { name: 'Parisienne', value: "'Parisienne', cursive" },
    { name: 'Petit Formal Script', value: "'Petit Formal Script', cursive" },
    { name: 'Qwigley', value: "'Qwigley', cursive" },
    { name: 'Tangerine', value: "'Tangerine', cursive" },
    { name: 'Monsieur La Doulaise', value: "'Monsieur La Doulaise', cursive" },
    { name: 'Yellowtail', value: "'Yellowtail', cursive" },
    { name: 'Satisfy', value: "'Satisfy', cursive" },
    { name: 'Kaushan Script', value: "'Kaushan Script', cursive" },
    { name: 'Marck Script', value: "'Marck Script', cursive" },
    { name: 'Text Only', value: "inherit" },
  ];

  const templates = templateOptions;
  const selectedTemplateIndex = Math.max(templates.findIndex((template) => template.id === selectedTemplate), 0);
  const currentTemplateMeta = templates[selectedTemplateIndex] || templates[0];
  const filteredTemplates = templates.filter((template) => {
    const query = templateSearch.trim().toLowerCase();

    if (!query) return true;

    return [template.name, template.tag, template.id]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(query));
  });
  const isScratchMode = creationMode === 'scratch';
  const engineLocked = isScratchMode;
  const skillSuggestions = getSkillSuggestions(newSkill, skills);
  const scratchContext = {
    jobTitle: getDisplayValue(canvasRecipient.targetRole) || 'the role',
    companyName: getDisplayValue(canvasRecipient.company) || 'your organization',
    industryDomain: getDisplayValue(canvasRecipient.targetRole) || getDisplayValue(canvasProfile.currentJobTitle) || 'this field',
    skillFunction: skills[0] || 'core business functions',
    fieldName: getDisplayValue(canvasProfile.currentJobTitle) || getDisplayValue(canvasRecipient.targetRole) || 'my field',
    skillOne: skills[0] || 'communication',
    skillTwo: skills[1] || 'problem-solving',
    skillThree: skills[2] || 'time management',
    companyFocus: 'innovation and customer success',
    skillsDomain: skills.slice(0, 2).join(' and ') || getDisplayValue(canvasRecipient.targetRole) || 'the relevant domain',
  };

  const cycleTemplate = (direction) => {
    if (!templates.length) return;
    const nextIndex = (selectedTemplateIndex + direction + templates.length) % templates.length;
    const nextTemplate = templates[nextIndex];
    if (nextTemplate) {
      setSelectedTemplate(nextTemplate.id);
    }
  };

  // --- FUNCTIONS ---

  useEffect(() => {
    if (guideTarget?.tab && !(guideTarget.tab === 'ai' && engineLocked)) {
      setActiveTab(guideTarget.tab);
    }
  }, [guideTarget, engineLocked]);

  useEffect(() => {
    if (engineLocked && activeTab === 'ai') {
      setActiveTab('profile');
    }
  }, [activeTab, engineLocked]);

  useEffect(() => {
    const saveTimeout = window.setTimeout(() => {
      upsertSavedLetter();
    }, 300);

    return () => window.clearTimeout(saveTimeout);
  }, [
    upsertSavedLetter,
    generatedLetter,
    selectedTemplate,
    creationMode,
    profile,
    recipient,
    skills,
    signature,
    design,
    resumeText,
    jobDescription,
  ]);

  useEffect(() => {
    if (!pendingSelectionOffsetsRef.current) return;

    const restorePendingSelection = () => {
      const editable = getActiveEditable();
      if (!editable) return;

      restoreSelectionFromOffsets(editable, pendingSelectionOffsetsRef.current);
      pendingSelectionOffsetsRef.current = null;
    };

    const frameId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(restorePendingSelection);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [generatedLetter]);

  useEffect(() => {
    let frameId = 0;
    let resizeObserver = null;

    const measurePageFit = () => {
      const previewRoot =
        previewFrameRef.current?.querySelector?.('#cover-letter-preview') ||
        previewModalFrameRef.current?.querySelector?.('#cover-letter-preview') ||
        document.querySelector('.document-scale-content #cover-letter-preview');

      if (!previewRoot) return;

      const visibleHeight = previewRoot.clientHeight;
      const contentHeight = Math.max(
        previewRoot.scrollHeight,
        previewRoot.offsetHeight,
        previewRoot.getBoundingClientRect().height
      );
      const overflowPx = Math.max(0, Math.ceil(contentHeight - visibleHeight));
      const thresholdPx = 24;

      setPageFitStatus({
        level: overflowPx > 0 ? 'overflow' : visibleHeight - contentHeight <= thresholdPx ? 'tight' : 'safe',
        overflowPx,
      });
    };

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(measurePageFit);
    };

    scheduleMeasure();
    window.addEventListener('resize', scheduleMeasure);

    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(scheduleMeasure);
      if (previewFrameRef.current) resizeObserver.observe(previewFrameRef.current);
      if (previewModalFrameRef.current) resizeObserver.observe(previewModalFrameRef.current);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', scheduleMeasure);
      resizeObserver?.disconnect();
    };
  }, [generatedLetter, selectedTemplate, design, profile, recipient, skills, signature, isPreviewOpen]);

  const pageFitNotice =
    pageFitStatus.level === 'overflow'
      ? {
          tone: 'border-amber-200 bg-amber-50 text-amber-900',
          title: 'A4 overflow detected',
          detail: `This letter is running past one page by about ${pageFitStatus.overflowPx}px. Print export will scale it down to fit one A4 page.`,
        }
      : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!skillDropdownRef.current?.contains(event.target)) {
        setIsSkillDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveSkillSuggestionIndex(0);
  }, [newSkill]);

  useEffect(() => {
    if (!isResizingSidebar) return undefined;

    const handleMouseMove = (event) => {
      const deltaX = event.clientX - sidebarResizeState.current.startX;
      const nextWidth = Math.min(560, Math.max(340, sidebarResizeState.current.startWidth + deltaX));
      setSidebarWidth(nextWidth);
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
    };

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizingSidebar]);

  const handleRegenerateAI = async () => {
    if (!resumeText) return alert("No resume text found. Please upload a data source first.");
    if (engineLocked) return;
    
    setIsRegenerating(true);
    try {
      const newLetter = await generateCoverLetter({
        jobDescription,
        resumeText: resumeText,
        companyName: canvasRecipient.company,
        targetRole: canvasRecipient.targetRole,
        recipientName: canvasRecipient.name,
        recipientTitle: canvasRecipient.title,
        signatureName: getDisplayValue(canvasSignature.text) || getDisplayValue(canvasProfile.fullName),
        currentJobTitle: canvasProfile.currentJobTitle,
        experienceYears: canvasProfile.experienceYears,
        experienceMonths: canvasProfile.experienceMonths,
        tone: aiTone
      });

      if (newLetter?.trim()) {
        setPendingRebuiltLetter(newLetter);
        setIsCompareOpen(true);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to regenerate. Check API Key.");
    } finally {
      setIsRegenerating(false);
    }
  };

  const acceptRebuiltLetter = () => {
    if (pendingRebuiltLetter) {
      setGeneratedLetter(pendingRebuiltLetter);
    }
    setPendingRebuiltLetter('');
    setIsCompareOpen(false);
  };

  const discardRebuiltLetter = () => {
    setPendingRebuiltLetter('');
    setIsCompareOpen(false);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate photo size (up to 5MB)
    const MAX_PHOTO_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_PHOTO_SIZE) {
      alert("Photo file size exceeds the 5MB limit. Please choose a smaller photo.");
      e.target.value = ''; // Reset file input
      return;
    }

    if (clerkUserId && clerkGetToken) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const token = await clerkGetToken();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/careersense/coverletter/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          updateProfile({ photo: data.url, showPhoto: true });
        } else {
          console.error("Failed to upload photo to S3");
        }
      } catch (err) {
        console.error("Error uploading photo:", err);
      }
    } else {
      const reader = new FileReader();
      reader.onloadend = () => updateProfile({ photo: reader.result, showPhoto: true });
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate signature size (up to 1MB)
    const MAX_SIGNATURE_SIZE = 1 * 1024 * 1024;
    if (file.size > MAX_SIGNATURE_SIZE) {
      alert("Signature file size exceeds the 1MB limit. Please choose a smaller signature image.");
      e.target.value = ''; // Reset file input
      return;
    }

    if (clerkUserId && clerkGetToken) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const token = await clerkGetToken();
        const response = await fetch(`${import.meta.env.VITE_API_URL}/careersense/coverletter/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          updateSignature({ image: data.url, enabled: true });
        } else {
          console.error("Failed to upload signature to S3");
        }
      } catch (err) {
        console.error("Error uploading signature:", err);
      }
    } else {
      const reader = new FileReader();
      reader.onloadend = () => updateSignature({ image: reader.result, enabled: true });
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = (skillToAdd = newSkill) => {
    const trimmedSkill = skillToAdd.trim();
    if (!trimmedSkill) return;

    const alreadyAdded = skills.some((skill) => skill.toLowerCase() === trimmedSkill.toLowerCase());
    if (alreadyAdded) {
      setNewSkill('');
      setIsSkillDropdownOpen(false);
      return;
    }

    setSkills([...skills, trimmedSkill]);
    setNewSkill('');
    setIsSkillDropdownOpen(false);
    setActiveSkillSuggestionIndex(0);
  };
  
  const handleRemoveSkill = (index) => setSkills(skills.filter((_, i) => i !== index));
  const handleSkillUpdate = (index, value) => {
    const nextSkills = [...skills];
    nextSkills[index] = value;
    setSkills(nextSkills);
  };
  const handleSkillKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isSkillDropdownOpen) setIsSkillDropdownOpen(true);
      setActiveSkillSuggestionIndex((current) => (
        skillSuggestions.length ? (current + 1) % skillSuggestions.length : 0
      ));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isSkillDropdownOpen) setIsSkillDropdownOpen(true);
      setActiveSkillSuggestionIndex((current) => (
        skillSuggestions.length ? (current - 1 + skillSuggestions.length) % skillSuggestions.length : 0
      ));
      return;
    }

    if (e.key === 'Escape') {
      setIsSkillDropdownOpen(false);
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();

      if (isSkillDropdownOpen && skillSuggestions[activeSkillSuggestionIndex]) {
        handleAddSkill(skillSuggestions[activeSkillSuggestionIndex]);
        return;
      }

      handleAddSkill();
    }
  };

  const handleSelectSkillSuggestion = (skill) => {
    handleAddSkill(skill);
    skillInputRef.current?.focus();
  };
  const handleScratchOptionChange = (sectionId, optionIndex) => {
    setSelectedScratchOptions((current) => ({
      ...current,
      [sectionId]: optionIndex,
    }));
  };
  const handleSidebarResizeStart = (event) => {
    sidebarResizeState.current = {
      startX: event.clientX,
      startWidth: sidebarWidth,
    };
    setIsResizingSidebar(true);
  };
  const createStarterParagraphHtml = (sectionId, text) => (
    `<p data-starter-section="${sectionId}">${text}</p>`
  );
  const replaceScratchSection = (currentLetter, sectionId, nextParagraphHtml) => {
    if (typeof window === 'undefined') {
      return nextParagraphHtml;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = currentLetter?.trim() || '';

    const existingSection = wrapper.querySelector(`[data-starter-section="${sectionId}"]`);
    if (existingSection) {
      existingSection.outerHTML = nextParagraphHtml;
      return wrapper.innerHTML;
    }

    return wrapper.innerHTML
      ? `${wrapper.innerHTML}\n${nextParagraphHtml}`
      : nextParagraphHtml;
  };
  const insertScratchParagraph = (sectionId, text) => {
    const renderedText = renderScratchParagraph(text, scratchContext).trim();
    if (!renderedText) return;

    const nextParagraphHtml = createStarterParagraphHtml(sectionId, renderedText);
    const nextLetter = replaceScratchSection(generatedLetter, sectionId, nextParagraphHtml);

    setGeneratedLetter(nextLetter);
  };
  const loadScratchStarterLetter = () => {
    const defaultSectionOrder = ['opening', 'background', 'achievement', 'company-interest', 'closing'];
    const html = defaultSectionOrder
      .map((sectionId) => {
        const section = scratchParagraphSections.find((item) => item.id === sectionId);
        const optionIndex = selectedScratchOptions[sectionId] || 0;
        const option = section?.options?.[optionIndex];
        return option
          ? createStarterParagraphHtml(sectionId, renderScratchParagraph(option, scratchContext).trim())
          : '';
      })
      .filter(Boolean)
      .join('\n');

    if (html) {
      setGeneratedLetter(html);
    }
  };
  const handleProfileFieldUpdate = (field, value) => updateProfile({ [field]: value });
  const handleRecipientFieldUpdate = (field, value) => updateRecipient({ [field]: value });
  const handleSignatureFieldUpdate = (field, value) => updateSignature({ [field]: value });
  
  const applyTheme = (theme) => {
    updateDesign({ color: theme.color, fontFamily: theme.font });
  };

  const handleBodyUpdate = (newHTML) => setGeneratedLetter(newHTML);

  useEffect(() => {
    const saveEditorSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const anchorElement = selection.anchorNode?.nodeType === Node.ELEMENT_NODE
        ? selection.anchorNode
        : selection.anchorNode?.parentElement;
      const editable = anchorElement?.closest?.('.document-scale-content [data-editor-body="true"]');

      if (editable) {
        lastEditorSelection.current = selection.getRangeAt(0).cloneRange();
        setActiveFontSize(getSelectionFontSize(editable));
      }
    };

    document.addEventListener('selectionchange', saveEditorSelection);
    return () => document.removeEventListener('selectionchange', saveEditorSelection);
  }, []);

  useEffect(() => {
    setActiveFontSize(design.fontSize);
  }, [design.fontSize]);

  const getActiveEditable = () => {
    const selection = window.getSelection();
    const selectedNode = selection?.rangeCount ? selection.getRangeAt(0).commonAncestorContainer : null;
    const selectedElement = selectedNode?.nodeType === Node.ELEMENT_NODE ? selectedNode : selectedNode?.parentElement;
    const selectedEditable = selectedElement?.closest?.('.document-scale-content #cover-letter-preview [data-editor-body="true"]');

    return selectedEditable || document.querySelector('.document-scale-content #cover-letter-preview [data-editor-body="true"]');
  };

  const syncEditedBody = () => {
    const updatedEditable = getActiveEditable();
    if (updatedEditable) {
      setGeneratedLetter(updatedEditable.innerHTML);
      const updatedSelection = window.getSelection();
      if (updatedSelection?.rangeCount) {
        lastEditorSelection.current = updatedSelection.getRangeAt(0).cloneRange();
      }
    }
  };

  const replaceFontSizeTags = (editable, fontSize) => {
    editable.querySelectorAll('font[size="7"]').forEach((fontNode) => {
      const span = document.createElement('span');
      span.style.fontSize = `${fontSize}px`;
      span.innerHTML = fontNode.innerHTML;
      fontNode.replaceWith(span);
    });
  };

  const getSelectionFontSize = (editable) => {
    const selection = window.getSelection();
    const anchorNode = selection?.anchorNode;
    const anchorElement = anchorNode?.nodeType === Node.ELEMENT_NODE
      ? anchorNode
      : anchorNode?.parentElement;
    const targetElement = anchorElement?.closest?.('span, p, li, div') || anchorElement || editable;
    const computedSize = Number.parseFloat(window.getComputedStyle(targetElement).fontSize);

    if (Number.isFinite(computedSize)) {
      return Math.round(computedSize);
    }

    return design.fontSize;
  };

  const getSelectionOffsets = (root, range) => {
    if (!root || !range) return null;

    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(root);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;

    const selectedTextLength = range.toString().length;
    return {
      start,
      end: start + selectedTextLength,
    };
  };

  const restoreSelectionFromOffsets = (root, offsets) => {
    if (!root || !offsets) return;

    const selection = window.getSelection();
    if (!selection) return;

    const range = document.createRange();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let currentNode = walker.nextNode();
    let currentOffset = 0;
    let startNode = null;
    let startOffset = 0;
    let endNode = null;
    let endOffset = 0;

    while (currentNode) {
      const nextOffset = currentOffset + currentNode.textContent.length;

      if (!startNode && offsets.start <= nextOffset) {
        startNode = currentNode;
        startOffset = Math.max(0, offsets.start - currentOffset);
      }

      if (!endNode && offsets.end <= nextOffset) {
        endNode = currentNode;
        endOffset = Math.max(0, offsets.end - currentOffset);
        break;
      }

      currentOffset = nextOffset;
      currentNode = walker.nextNode();
    }

    if (!startNode) {
      startNode = root;
      startOffset = 0;
    }

    if (!endNode) {
      endNode = startNode;
      endOffset = startOffset;
    }

    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);
    selection.removeAllRanges();
    selection.addRange(range);
    lastEditorSelection.current = range.cloneRange();
  };

  const runEditorCommand = (command, value = null) => {
    const selection = window.getSelection();
    const editable = getActiveEditable();
    const currentRange = selection?.rangeCount ? selection.getRangeAt(0).cloneRange() : lastEditorSelection.current?.cloneRange?.() || null;
    const selectionOffsets = editable && currentRange ? getSelectionOffsets(editable, currentRange) : null;

    if (lastEditorSelection.current && selection) {
      selection.removeAllRanges();
      selection.addRange(lastEditorSelection.current);
    } else {
      editable?.focus();
    }

    if (command === 'decreaseFontSize') {
      const currentSize = getSelectionFontSize(editable);
      const nextSize = Math.max(6, Math.min(15, currentSize - 1));
      document.execCommand('fontSize', false, '7');
      if (editable) replaceFontSizeTags(editable, nextSize);
    } else if (command === 'increaseFontSize') {
      const currentSize = getSelectionFontSize(editable);
      const nextSize = Math.max(6, Math.min(15, currentSize + 1));
      document.execCommand('fontSize', false, '7');
      if (editable) replaceFontSizeTags(editable, nextSize);
    } else if (command === 'setFontSize') {
      const nextSize = Math.max(6, Math.min(15, Number(value) || design.fontSize));
      document.execCommand('fontSize', false, '7');
      if (editable) replaceFontSizeTags(editable, nextSize);
    } else {
      document.execCommand(command, false, value);
    }

    editable?.focus();
    syncEditedBody();
    if (editable && selectionOffsets) {
      setActiveFontSize(command === 'setFontSize'
        ? Math.max(6, Math.min(15, Number(value) || getSelectionFontSize(editable)))
        : command === 'decreaseFontSize'
          ? Math.max(6, Math.min(15, getSelectionFontSize(editable)))
          : command === 'increaseFontSize'
            ? Math.max(6, Math.min(15, getSelectionFontSize(editable)))
            : getSelectionFontSize(editable));
      pendingSelectionOffsetsRef.current = selectionOffsets;
      restoreSelectionFromOffsets(editable, selectionOffsets);
    }
  };

  const handleDownload = async () => {
    if (!clerkUserId) {
      alert("Please sign in first to export your cover letter.");
      clerk.openSignIn({});
      return;
    }

    const sourceElement =
      previewModalFrameRef.current?.querySelector('#cover-letter-preview') ||
      previewFrameRef.current?.querySelector('#cover-letter-preview') ||
      document.querySelector('.document-scale-content #cover-letter-preview');
    if (!sourceElement) return;

    const originalTitle = document.title;
    const docTitleClean = canvasProfile.fullName 
      ? `Cover_Letter_${canvasProfile.fullName.trim().replace(/\s+/g, '_')}` 
      : 'Cover_Letter';
    const filename = canvasProfile.fullName ? `Cover_Letter_${canvasProfile.fullName}.pdf` : 'Cover_Letter.pdf';
    const normalizeExportPreview = (previewNode) => {
      if (!(previewNode instanceof Element)) return;

      previewNode.style.setProperty('background', '#ffffff', 'important');
      previewNode.style.setProperty('background-color', '#ffffff', 'important');
      previewNode.style.setProperty('box-shadow', 'none', 'important');
      previewNode.style.setProperty('filter', 'none', 'important');
    };

    try {
      const waitForImages = async (root) => {
        const images = Array.from(root.querySelectorAll('img'));
        const pendingImages = images.filter((image) => !image.complete || image.naturalWidth === 0);

        await Promise.all(
          pendingImages.map((image) => new Promise((resolve) => {
            const finish = () => resolve();
            image.addEventListener('load', finish, { once: true });
            image.addEventListener('error', finish, { once: true });
          }))
        );
      };

      const cloneActiveStylesheets = () => Array.from(
        document.querySelectorAll('style, link[rel="stylesheet"]')
      ).map((node) => node.cloneNode(true));

      const prepareExportPreview = (previewNode) => {
        if (!(previewNode instanceof Element)) return;

        normalizeExportPreview(previewNode);
        previewNode.setAttribute('data-export-mode', 'print');
        previewNode.setAttribute('data-template', selectedTemplate);
        previewNode.style.width = '210mm';
        previewNode.style.height = 'auto';
        previewNode.style.minHeight = '297mm';
        previewNode.style.maxHeight = 'none';
        previewNode.style.margin = '0';
        previewNode.style.boxSizing = 'border-box';
        previewNode.style.boxShadow = 'none';
        previewNode.style.overflow = 'hidden';
        previewNode.querySelectorAll('[contenteditable="true"]').forEach((node) => {
          node.setAttribute('contenteditable', 'false');
        });
        previewNode.querySelectorAll('[data-editor-body="true"]').forEach((node) => {
          node.removeAttribute('data-editor-body');
        });
      };

      const waitForPrintStyles = async (printDocument) => {
        const stylesheetLinks = Array.from(
          printDocument.querySelectorAll('link[rel="stylesheet"]')
        );

        await Promise.all(
          stylesheetLinks.map((link) => new Promise((resolve) => {
            if (link.sheet) {
              resolve();
              return;
            }

            const finish = () => resolve();
            link.addEventListener('load', finish, { once: true });
            link.addEventListener('error', finish, { once: true });
          }))
        );
      };

      const printPdf = async () => {
        const exportElement = sourceElement.cloneNode(true);
        prepareExportPreview(exportElement);
        exportElement.style.overflow = 'hidden';

        const iframe = document.createElement('iframe');
        iframe.setAttribute('aria-hidden', 'true');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        iframe.style.opacity = '0';
        iframe.style.pointerEvents = 'none';
        document.body.appendChild(iframe);

        const printDocument = iframe.contentDocument;
        const iframeWindow = iframe.contentWindow;
        if (!printDocument || !iframeWindow) {
          iframe.remove();
          return;
        }

        printDocument.open();
        printDocument.write('<!doctype html><html><head></head><body><div class="print-root"><div class="print-fit-shell"></div></div></body></html>');
        printDocument.close();

        const head = printDocument.head;
        if (!head) {
          iframe.remove();
          return;
        }

        const base = printDocument.createElement('base');
        base.href = document.baseURI;
        head.appendChild(base);

        const meta = printDocument.createElement('meta');
        meta.setAttribute('charset', 'utf-8');
        head.appendChild(meta);

        const title = printDocument.createElement('title');
        title.textContent = filename;
        head.appendChild(title);

        cloneActiveStylesheets().forEach((node) => {
          head.appendChild(node);
        });

        const printStyles = printDocument.createElement('style');
        printStyles.textContent = `
          @page {
            size: A4;
            margin: 0;
          }

          html, body {
            margin: 0;
            padding: 0;
            background: #ffffff;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .print-root {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: #ffffff;
            overflow: hidden;
          }

          .print-fit-shell {
            width: 210mm;
            min-height: 297mm;
            overflow: hidden;
          }

          #cover-letter-preview {
            width: 210mm !important;
            min-height: 297mm !important;
            height: auto !important;
            max-height: none !important;
            margin: 0 !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            filter: none !important;
            overflow: hidden !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
          }

          #cover-letter-preview[data-export-mode="print"] {
            background: #ffffff !important;
            background-color: #ffffff !important;
          }

          #cover-letter-preview[data-template="modern-block"][data-export-mode="print"] .modern-block-sidebar {
            background: #ffffff !important;
            background-color: #ffffff !important;
          }

          #cover-letter-preview[data-export-mode="print"] [data-pdf-bg="white"] {
            background: #ffffff !important;
            background-color: #ffffff !important;
          }

          #cover-letter-preview[data-export-mode="print"] .export-no-shadow,
          #cover-letter-preview[data-export-mode="print"] [class*="shadow"] {
            box-shadow: none !important;
          }

          #cover-letter-preview[data-template="career-pivot"][data-export-mode="print"] [data-print-decorative="true"],
          #cover-letter-preview[data-template="fresh-graduate-internship"][data-export-mode="print"] [data-print-decorative="true"],
          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] [data-print-decorative="true"] {
            display: none !important;
          }

          #cover-letter-preview[data-template="fresh-graduate-internship"][data-export-mode="print"] [style*="clip-path"],
          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] [style*="clip-path"] {
            clip-path: none !important;
          }

          #cover-letter-preview[data-template="fresh-graduate-internship"][data-export-mode="print"] [class*="backdrop-blur"],
          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] [class*="backdrop-blur"] {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }

          #cover-letter-preview[data-template="fresh-graduate-internship"][data-export-mode="print"] header,
          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] header {
            overflow: visible !important;
          }

          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] > div,
          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] header,
          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] aside,
          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] main {
            overflow: visible !important;
          }

          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] > div {
            min-height: auto !important;
          }

          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] [data-screen-fancy="internal-promotion-transfer"] {
            display: none !important;
          }

          #cover-letter-preview[data-template="internal-promotion-transfer"][data-export-mode="print"] [data-print-only="internal-promotion-transfer"] {
            display: block !important;
          }

          * {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          @media print {
            @page {
              size: A4;
              margin: 0;
            }

            html,
            body {
              width: 210mm;
              min-height: 297mm;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            body * {
              visibility: hidden !important;
            }

            .print-root,
            .print-fit-shell {
              visibility: visible !important;
              overflow: visible !important;
              width: 210mm !important;
              min-height: 297mm !important;
            }

            #cover-letter-preview,
            #cover-letter-preview * {
              visibility: visible !important;
            }

            #cover-letter-preview {
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 210mm !important;
              min-height: 297mm !important;
              margin: 0 !important;
              box-shadow: none !important;
              overflow: visible !important;
            }
          }
        `;
        head.appendChild(printStyles);

        const mountNode = printDocument.querySelector('.print-fit-shell');
        if (!mountNode) {
          iframe.remove();
          return;
        }

        mountNode.appendChild(exportElement);

        await waitForPrintStyles(printDocument);
        await iframeWindow.document.fonts?.ready;
        await waitForImages(printDocument);
        await new Promise((resolve) => iframeWindow.requestAnimationFrame(() => iframeWindow.requestAnimationFrame(resolve)));

        const cleanup = () => {
          document.title = originalTitle;
          window.setTimeout(() => iframe.remove(), 250);
        };

        iframeWindow.addEventListener('afterprint', cleanup, { once: true });
        document.title = docTitleClean;
        iframeWindow.focus();
        iframeWindow.print();
        document.title = originalTitle;
      };

      await printPdf();
    } catch (error) {
      console.error('Print/PDF export failed:', error);
    }
  };

  const renderSelectedTemplate = (updateBody = handleBodyUpdate, options = {}) => {
    const { isEditorMode = true } = options;
    const props = {
      body: generatedLetter,
      design,
      profile: canvasProfile,
      signature: canvasSignature,
      recipient: canvasRecipient,
      skills,
      onUpdateBody: updateBody,
      onUpdateProfileField: handleProfileFieldUpdate,
      onUpdateRecipientField: handleRecipientFieldUpdate,
      onUpdateSkill: handleSkillUpdate,
      onUpdateSignatureField: handleSignatureFieldUpdate,
      isEditorMode,
    };

    switch (selectedTemplate) {
      case 'modern': return <ModernTemplate {...props} />;
      case 'ivy': return <IvyLeagueTemplate {...props} />;
      case 'executive': return <ExecutiveTemplate {...props} />;
      case 'sidebar': return <SidebarTemplate {...props} />;
      case 'minimalist': return <MinimalistTemplate {...props} />;
      case 'classic': return <ClassicTemplate {...props} />;
      case 'creative': return <CreativeTemplate {...props} />;
      case 'modern-block': return <ModernColorBlockTemplate {...props} />;
      case 'artistic': return <ArtisticTemplate {...props} />;
      case 'timeline': return <TimelineTemplate {...props} />;
      default:
        if (professionalTemplateIds.includes(selectedTemplate)) {
          return <ProfessionalTemplate {...props} variant={selectedTemplate} />;
        }
        return <ModernTemplate {...props} />;
    }
  };

  const renderLivePreview = (id) => {
    const previewBody = `
      ${canvasRecipient.name ? `<p>Dear ${canvasRecipient.name},</p>` : ''}
      <p>I am writing to express my strong interest in the open position${canvasRecipient.company ? ` at <strong>${canvasRecipient.company}</strong>` : ''}. As an experienced professional with a proven track record of success, I am eager to contribute my skills in strategic planning and project management to your team.</p>
    `;

    const props = { 
        body: previewBody, 
        design: { ...design, fontSize: 10, margins: 1 }, 
        profile: canvasProfile, 
        signature: canvasSignature, 
        recipient: canvasRecipient, 
        skills, 
        onUpdateBody: () => {} 
    };

    switch(id) {
        case 'modern': return <ModernTemplate {...props} />;
        case 'ivy': return <IvyLeagueTemplate {...props} />;
        case 'executive': return <ExecutiveTemplate {...props} />;
        case 'sidebar': return <SidebarTemplate {...props} />;
        case 'minimalist': return <MinimalistTemplate {...props} />;
        case 'classic': return <ClassicTemplate {...props} />;
        case 'creative': return <CreativeTemplate {...props} />;
        case 'modern-block': return <ModernColorBlockTemplate {...props} />;
        case 'artistic': return <ArtisticTemplate {...props} />;
        case 'timeline': return <TimelineTemplate {...props} />;
        default:
          if (professionalTemplateIds.includes(id)) {
            return <ProfessionalTemplate {...props} variant={id} />;
          }
          return <ModernTemplate {...props} />;
    }
  };

  return (
    <div className="relative top-0 flex min-h-[calc(100vh-80px)] flex-col bg-[#f8fafc] font-sans selection:bg-[#0a66c2]/20 lg:h-[calc(100vh-80px)] lg:flex-row lg:overflow-hidden">
      
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Allura&family=Dancing+Script:wght@400..700&family=Great+Vibes&family=Kaushan+Script&family=Marck+Script&family=Monsieur+La+Doulaise&family=Parisienne&family=Petit+Formal+Script&family=Qwigley&family=Sacramento&family=Satisfy&family=Tangerine:wght@400;700&family=Yellowtail&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Lato:wght@400;700&family=Lora:ital,wght@0,400;0,600;1,400&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@400;600;700&family=Nunito:wght@400;600;700&family=Open+Sans:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Poppins:wght@400;600;700&family=Raleway:wght@400;600;700&family=Roboto:wght@400;500;700&family=Spectral:ital,wght@0,400;0,600;1,400&display=swap');
          
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
          .document-scale-frame {
            --document-scale: 0.36;
            --document-frame-width: 286px;
            --document-frame-height: 404px;
            position: relative;
            width: var(--document-frame-width);
            min-width: var(--document-frame-width);
            height: var(--document-frame-height);
            min-height: var(--document-frame-height);
          }
          .document-scale-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            min-height: 297mm;
            transform: scale(var(--document-scale));
            transform-origin: top left;
          }
          @media (min-width: 360px) {
            .document-scale-frame {
              --document-scale: 0.4;
              --document-frame-width: 318px;
              --document-frame-height: 449px;
            }
          }
          @media (min-width: 390px) {
            .document-scale-frame {
              --document-scale: 0.45;
              --document-frame-width: 357px;
              --document-frame-height: 505px;
            }
          }
          @media (min-width: 640px) {
            .document-scale-frame {
              --document-scale: 0.65;
              --document-frame-width: 516px;
              --document-frame-height: 730px;
            }
          }
          @media (min-width: 768px) {
            .document-scale-frame {
              --document-scale: 0.8;
              --document-frame-width: 635px;
              --document-frame-height: 898px;
            }
          }
          @media (min-width: 1024px) {
            .document-scale-frame {
              --document-scale: 0.9;
              --document-frame-width: 715px;
              --document-frame-height: 1011px;
            }
          }
          @media (min-width: 1280px) {
            .document-scale-frame {
              --document-scale: 1;
              --document-frame-width: 794px;
              --document-frame-height: 1123px;
            }
          }
          @media (max-width: 640px) {
            .editor-panel input,
            .editor-panel select,
            .editor-panel textarea,
            .editor-panel button {
              min-height: 44px;
            }
          }
        `}
      </style>

      {/* --- TEMPLATE SELECTION MODAL --- */}
      <AnimatePresence>
        {isCompareOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 16 }}
              className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0a66c2]">Tone Rebuild Review</p>
                  <h2 className="text-[17px] font-bold tracking-tight text-slate-900">Compare current document with the new tone version</h2>
                  <p className="mt-1 text-[13px] text-slate-500">The main cover letter will only update if you approve the rebuilt version.</p>
                </div>
                <button onClick={discardRebuiltLetter} className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900">
                  <X size={18} />
                </button>
              </div>
              <div className="grid flex-1 gap-4 overflow-y-auto bg-[#f8fafc] p-4 custom-scrollbar md:grid-cols-2 md:p-6">
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Current Version</p>
                  </div>
                  <div className="p-4 text-[14px] leading-7 text-slate-700">
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: generatedLetter }} />
                  </div>
                </div>
                <div className="rounded-xl border border-[#0a66c2]/25 bg-white shadow-sm">
                  <div className="border-b border-[#0a66c2]/15 bg-[#eef6ff] px-4 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#0a66c2]">Rebuilt Version · {aiTone}</p>
                  </div>
                  <div className="p-4 text-[14px] leading-7 text-slate-700">
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: pendingRebuiltLetter }} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
                <button onClick={discardRebuiltLetter} className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                  Keep Current Version
                </button>
                <button onClick={acceptRebuiltLetter} className="rounded-md bg-[#0a66c2] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm hover:bg-[#004182]">
                  Use Rebuilt Version
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {isTemplateModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 bottom-0 top-20 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm sm:top-24 sm:p-6 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
            >
              <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-slate-200 bg-white p-4 sm:items-center sm:p-6">
                <div>
                  <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">Template Library</h2>
                  <p className="text-slate-500 text-[13px] mt-0.5">Select a layout configuration. Content adapts automatically.</p>
                </div>
                <button onClick={() => setIsTemplateModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-md transition-colors bg-white border border-slate-200 text-slate-500 hover:text-slate-900">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 custom-scrollbar sm:p-8">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      value={templateSearch}
                      onChange={(e) => setTemplateSearch(e.target.value)}
                      placeholder="Search templates by name or category"
                      className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-[13px] text-slate-900 outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]"
                    />
                  </div>
                  <p className="text-[12px] font-semibold text-slate-500">
                    Showing {filteredTemplates.length} of {templates.length} templates
                  </p>
                </div>
                {filteredTemplates.length === 0 ? (
                  <div className="flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 text-center">
                    <Search size={24} className="text-slate-400" />
                    <p className="mt-4 text-[14px] font-bold text-slate-900">No templates match that search</p>
                    <p className="mt-1 text-[12px] font-medium text-slate-500">Try a template name like Ivy, Executive, ATS, or Data.</p>
                  </div>
                ) : (
                <div className="grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                  {filteredTemplates.map((tpl) => (
                      <motion.button 
                        whileHover={{ y: -4 }}
                        key={tpl.id} 
                        onClick={() => { setSelectedTemplate(tpl.id); setIsTemplateModalOpen(false); setTemplateSearch(''); }} 
                        className={`group relative rounded-lg transition-all duration-300 overflow-hidden text-left bg-white shadow-sm border ${selectedTemplate === tpl.id ? 'ring-2 ring-[#0a66c2] border-[#0a66c2]' : 'border-slate-200 hover:border-[#0a66c2]/40'}`}
                      >
                          <div className="relative w-full pt-[141.4%] bg-slate-100 overflow-hidden"> 
                              <div className="absolute top-0 left-0 w-[210mm] origin-top-left transform scale-[0.28] sm:scale-[0.38] md:scale-[0.45] pointer-events-none select-none bg-white shadow-sm">{renderLivePreview(tpl.id)}</div>
                              <div className={`absolute inset-0 bg-[#0a66c2]/0 group-hover:bg-[#0a66c2]/5 transition-colors`} />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 border-t border-slate-100 flex justify-between items-center z-10">
                              <span className="text-[13px] font-bold text-slate-900">{tpl.name}</span>
                              {selectedTemplate === tpl.id ? (
                                  <span className="bg-[#0a66c2] text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 font-bold uppercase tracking-wider shadow-sm"><CheckCircle2 size={12} /> Active</span>
                              ) : (
                                  <span className="text-[#0a66c2] text-[11px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Select</span>
                              )}
                          </div>
                      </motion.button>
                  ))}
                </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PREVIEW MODAL --- */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 pt-20 backdrop-blur-sm sm:p-6 sm:pt-24"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="mt-0 flex min-h-0 w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-[#f8fafc] shadow-2xl sm:max-h-[calc(100vh-3rem)]"
            >
              <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0a66c2]">Document Render</p>
                  <h2 className="text-[16px] font-bold text-slate-900">Print Preview</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={handleDownload} className="inline-flex items-center gap-2 rounded-md bg-[#0a66c2] px-4 py-2 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#004182]">
                    <Download size={16} />
                    Print / Save PDF
                  </button>
                  <button onClick={() => setIsPreviewOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900">
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="flex flex-1 justify-center overflow-auto p-2 custom-scrollbar sm:p-6">
                <div ref={previewModalFrameRef} className="document-scale-frame border border-slate-200 bg-white shadow-xl">
                  <div className="document-scale-content">
                    {renderSelectedTemplate(() => {}, { isEditorMode: false })}
                  </div>
                </div>
              </div>
              {pageFitNotice && (
                <div className={`border-t px-4 py-3 text-[12px] font-medium leading-5 sm:px-6 ${pageFitNotice.tone}`}>
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold">{pageFitNotice.title}</p>
                      <p>{pageFitNotice.detail}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SIDEBAR (CONTROLS) --- */}
      <div
        className="editor-panel z-10 flex max-h-[72vh] w-full shrink-0 flex-col border-b border-slate-200 bg-white shadow-sm lg:relative lg:h-full lg:max-h-none lg:w-[var(--sidebar-width)] lg:min-w-[var(--sidebar-width)] lg:border-b-0 lg:border-r"
        style={{ '--sidebar-width': `${sidebarWidth}px` }}
      >
        <div className="px-4 pb-3 pt-4 sm:px-5 sm:pt-5">
            <div className="flex bg-slate-100/80 p-1 rounded-md border border-slate-200/50">
              <button onClick={() => setActiveTab('profile')} className={`flex-1 py-1.5 rounded text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all ${activeTab === 'profile' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}><User size={14} /> Data</button>
              <button onClick={() => setActiveTab('design')} className={`flex-1 py-1.5 rounded text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all ${activeTab === 'design' ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}><Palette size={14} /> Style</button>
              {isScratchMode ? (
                <button
                  onClick={() => setActiveTab('starter-kit')}
                  className={`flex-1 py-1.5 rounded text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'starter-kit'
                      ? 'bg-white text-[#0a66c2] shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Sparkles size={14} className={activeTab === 'starter-kit' ? 'fill-current' : ''} /> Starter Kit
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('ai')}
                  title="Open Engine"
                  className={`flex-1 py-1.5 rounded text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === 'ai'
                      ? 'bg-white text-[#0a66c2] shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Zap size={14} className={activeTab === 'ai' ? 'fill-current' : ''} /> Engine
                </button>
              )}
            </div>
            {activeTab === 'design' && (
              <p className="mt-2 text-[11px] font-medium leading-4 text-slate-500">
                Style controls work best on professional templates such as <span className="font-semibold text-slate-700">Ivy League</span>, <span className="font-semibold text-slate-700">ATS Friendly</span>, <span className="font-semibold text-slate-700">Modern Clean</span>, <span className="font-semibold text-slate-700">Executive</span>, <span className="font-semibold text-slate-700">Classic Format</span>, and <span className="font-semibold text-slate-700">Sidebar Mono</span>.
              </p>
            )}
            {isScratchMode && activeTab === 'starter-kit' && (
              <p className="mt-2 text-[11px] font-medium leading-4 text-slate-500">
                Use these starter sections to quickly build a strong first draft for scratch mode.
              </p>
            )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar sm:p-5">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                  <motion.div 
                    key="profile"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                      <div className="rounded-md border border-[#C8D9E6] bg-[#F5EFEB]/70 p-3 text-[12px] font-semibold leading-5 text-[#567C8D]">
                        These fields only use manual input. Resume uploads and job descriptions will not fill them automatically. If you want a field hidden on the canvas, keep a single blank space in that field.
                      </div>

                      <div className="space-y-3">
                          <div className="flex items-center justify-between">
                              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5"><Camera size={14} /> Profile Picture</h3>
                              <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" checked={profile.showPhoto} onChange={(e) => updateProfile({ showPhoto: e.target.checked })} />
                                  <div className="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:bg-[#0a66c2] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full"></div>
                              </label>
                          </div>
                          {profile.showPhoto && (
                              <div className="flex items-center gap-3 p-3 rounded-md border border-slate-200 bg-slate-50/50">
                                  <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">{profile.photo ? (<img src={profile.photo} alt="Profile" className="h-full w-full object-cover" />) : (<User size={18} className="text-slate-400" />)}</div>
                                  <div className="flex-1 flex gap-2">
                                      <label className="flex-1 py-1.5 bg-white border border-slate-200 rounded-md text-[12px] font-bold text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors text-center shadow-sm">Upload<input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} /></label>
                                      {profile.photo && (<button onClick={() => updateProfile({ photo: null })} className="px-2.5 py-1.5 text-red-600 hover:bg-red-50 rounded-md border border-slate-200 bg-white shadow-sm"><Trash2 size={14} /></button>)}
                                  </div>
                              </div>
                          )}
                      </div>

                      <div className="space-y-4">
                          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">Personal Variables</h3>
                          <div className="space-y-3">
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Full Name</label><input type="text" value={profile.fullName} onChange={(e) => updateProfile({ fullName: e.target.value })} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" /></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Email</label><input type="text" value={profile.email} onChange={(e) => updateProfile({ email: e.target.value })} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" /></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Phone</label><input type="text" value={profile.phone} onChange={(e) => updateProfile({ phone: e.target.value })} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" /></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Location</label><input type="text" value={profile.address} onChange={(e) => updateProfile({ address: e.target.value })} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" /></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">LinkedIn / Portfolio</label><input type="text" value={profile.linkedinPortfolio || ''} onChange={(e) => updateProfile({ linkedinPortfolio: e.target.value })} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" placeholder="https://linkedin.com/in/yourname" /></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Current Job Title</label><input type="text" value={profile.currentJobTitle || ''} onChange={(e) => updateProfile({ currentJobTitle: e.target.value })} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" /></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Experience in Years</label><input type="number" min="0" value={profile.experienceYears || ''} onChange={(e) => updateProfile({ experienceYears: e.target.value })} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" /></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Experience in Months</label><input type="number" min="0" max="11" value={profile.experienceMonths || ''} onChange={(e) => updateProfile({ experienceMonths: e.target.value })} className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" /></div>
                          </div>
                      </div>

                      <div className="space-y-4">
                           <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">Target Employer</h3>
                           <div className="space-y-3">
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Company Name</label><div className="relative"><Building2 className="absolute left-3 top-2.5 text-slate-400" size={14} /><input type="text" value={recipient.company} onChange={(e) => updateRecipient({ company: e.target.value })} className="w-full pl-9 px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" /></div></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Target Job Role / Position</label><div className="relative"><Briefcase className="absolute left-3 top-2.5 text-slate-400" size={14} /><input type="text" value={recipient.targetRole || ''} onChange={(e) => updateRecipient({ targetRole: e.target.value })} className="w-full pl-9 px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" /></div></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Hiring Manager</label><div className="relative"><User className="absolute left-3 top-2.5 text-slate-400" size={14} /><input type="text" value={recipient.name} onChange={(e) => updateRecipient({ name: e.target.value })} className="w-full pl-9 px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" placeholder="Hiring Manager" /></div></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Hiring Manager Designation</label><div className="relative"><Briefcase className="absolute left-3 top-2.5 text-slate-400" size={14} /><input type="text" value={recipient.title || ''} onChange={(e) => updateRecipient({ title: e.target.value })} className="w-full pl-9 px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" /></div></div>
                              <div><label className="text-[11px] font-semibold text-slate-600 mb-1 block">Company Address</label><div className="relative"><MapPin className="absolute left-3 top-2.5 text-slate-400" size={14} /><input type="text" value={recipient.address} onChange={(e) => updateRecipient({ address: e.target.value })} className="w-full pl-9 px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]" placeholder="City, state, country or full address" /></div></div>
                          </div>
                      </div>

                      <div className="space-y-3">
                          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">Highlight Skills</h3>
                          <div className="relative" ref={skillDropdownRef}>
                            <div className="flex gap-2">
                               <input
                                 ref={skillInputRef}
                                 type="text"
                                 value={newSkill}
                                 onChange={(e) => {
                                   setNewSkill(e.target.value);
                                   setIsSkillDropdownOpen(true);
                                 }}
                                 onFocus={() => setIsSkillDropdownOpen(true)}
                                 onKeyDown={handleSkillKeyDown}
                                 className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] outline-none focus:ring-1 focus:ring-[#0a66c2] transition-all shadow-sm"
                                 placeholder="Enter skill..."
                               />
                               <button onClick={() => handleAddSkill()} className="px-3 py-2 bg-slate-100 border border-slate-200 text-slate-600 rounded-md hover:bg-slate-200 transition-colors shadow-sm"><Plus size={16} /></button>
                            </div>
                            {isSkillDropdownOpen && skillSuggestions.length > 0 && (
                              <div className="absolute left-0 right-12 top-[calc(100%+0.35rem)] z-20 max-h-64 overflow-y-auto rounded-md border border-slate-200 bg-white p-1 shadow-xl">
                                {skillSuggestions.map((skill, index) => (
                                  <button
                                    key={skill}
                                    type="button"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => handleSelectSkillSuggestion(skill)}
                                    className={`flex w-full items-center rounded px-3 py-2 text-left text-[13px] transition-colors ${
                                      activeSkillSuggestionIndex === index
                                        ? 'bg-[#eef6ff] text-[#0a66c2]'
                                        : 'text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    {skill}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {skills.map((skill, i) => (
                               <motion.span layout key={i} className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded text-[11px] font-semibold shadow-sm group">
                                  {skill}
                                  <button onClick={() => handleRemoveSkill(i)} className="text-slate-400 hover:text-red-600"><X size={12} /></button>
                               </motion.span>
                            ))}
                          </div>
                      </div>

                      <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Signature</h3>
                              <label className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" checked={signature.enabled} onChange={(e) => updateSignature({ enabled: e.target.checked })} />
                                  <div className="w-8 h-4 bg-slate-200 rounded-full peer peer-checked:bg-[#0a66c2] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-full"></div>
                              </label>
                          </div>
                          <div className="space-y-3 rounded-md border border-slate-200 bg-slate-50/50 p-3">
                            <select value={signature.closing} onChange={(e) => updateSignature({ closing: e.target.value })} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-slate-900 outline-none focus:ring-1 focus:ring-[#0a66c2]">
                              <option>Sincerely,</option>
                              <option>Best regards,</option>
                              <option>Kind regards,</option>
                              <option>Regards,</option>
                              <option>Yours faithfully,</option>
                            </select>
                            <p className="text-[11px] font-medium leading-4 text-slate-500">
                              This toggle only hides the handwritten signature. Your closing line and full name will still appear on the letter.
                            </p>
                            {signature.enabled && (
                              <>
                                <input type="text" value={signature.text || profile.fullName || ''} onChange={(e) => updateSignature({ text: e.target.value })} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-900 outline-none focus:ring-1 focus:ring-[#0a66c2]" placeholder="Typed signature name" />
                                <div className="space-y-1.5">
                                  <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                                    Signature Style
                                  </label>
                                  <div className="relative">
                                    <select
                                      value={signature.font}
                                      onChange={(e) => updateSignature({ font: e.target.value })}
                                      className="w-full appearance-none rounded-md border border-slate-200 bg-white px-3 py-2 text-[13px] font-semibold text-slate-900 outline-none transition-all shadow-sm focus:ring-1 focus:ring-[#0a66c2]"
                                    >
                                      {signatureStyles.map((style) => (
                                        <option key={style.name} value={style.value}>
                                          {style.name}
                                        </option>
                                      ))}
                                    </select>
                                    <ChevronLeft className="absolute right-3 top-2.5 rotate-[-90deg] text-slate-400 pointer-events-none" size={14} />
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3">
                                  <div className="flex h-12 w-24 items-center justify-center overflow-hidden rounded border border-slate-100 bg-slate-50">
                                    {signature.image ? (
                                      <img src={signature.image} alt="Uploaded signature" className="max-h-full max-w-full object-contain" />
                                    ) : (
                                      <PenTool size={18} className="text-slate-400" />
                                    )}
                                  </div>
                                  <div className="flex flex-1 gap-2">
                                    <label className="flex-1 cursor-pointer rounded-md border border-slate-200 bg-white py-1.5 text-center text-[12px] font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                                      Upload Signature
                                      <input type="file" className="hidden" accept="image/*" onChange={handleSignatureUpload} />
                                    </label>
                                    {signature.image && (
                                      <button onClick={() => updateSignature({ image: null })} className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-red-600 shadow-sm hover:bg-red-50">
                                        <Trash2 size={14} />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                      </div>
                  </motion.div>
              )}

              {activeTab === 'design' && (
                  <motion.div 
                    key="design"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-8"
                  >
                      <button onClick={() => setIsTemplateModalOpen(true)} className="w-full py-4 border border-dashed border-slate-300 bg-slate-50 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-[#eef6ff] hover:border-[#0a66c2]/40 hover:text-[#0a66c2] text-slate-600 transition-all group">
                           <div className="bg-white p-2 rounded border border-slate-200 shadow-sm transition-colors"><Layout size={18} /></div>
                           <span className="text-[13px] font-bold text-slate-900 group-hover:text-[#0a66c2]">Change Template Layout</span>
                           <span className="text-[11px] text-slate-500 font-medium">Current: {currentTemplateMeta?.name}</span>
                      </button>

                      {selectedTemplateNeedsPhoto && (
                        <div className="rounded-lg border border-[#0a66c2]/20 bg-[#eef6ff] p-3">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                              <h3 className="text-[12px] font-bold text-slate-900">Template Image</h3>
                              <p className="mt-0.5 text-[11px] font-medium leading-4 text-slate-500">This layout uses your profile image as a key visual.</p>
                            </div>
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-white">
                              <img src={getProfilePhoto(profile)} alt="Template visual" className="h-full w-full object-cover" />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <label className="flex-1 cursor-pointer rounded-md border border-slate-200 bg-white py-2 text-center text-[12px] font-bold text-slate-700 shadow-sm transition-colors hover:bg-slate-50">
                              {profile.photo ? 'Replace Image' : 'Upload Image'}
                              <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                            </label>
                            {profile.photo && (
                              <button onClick={() => updateProfile({ photo: null })} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-red-600 shadow-sm hover:bg-red-50">
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="space-y-4">
                           <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2"><Settings2 size={14} /> Quick Themes</h3>
                           <div className="grid grid-cols-2 gap-2">
                              {presetThemes.map(theme => (
                                  <button key={theme.name} onClick={() => applyTheme(theme)} className="px-3 py-2.5 bg-white border border-slate-200 rounded-md hover:border-[#0a66c2]/40 hover:shadow-sm transition-all text-left flex items-center gap-2">
                                      <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: theme.color }}></div>
                                      <div className="min-w-0">
                                          <span className="font-bold text-slate-900 text-[12px] block truncate">{theme.name}</span>
                                          <span className="text-[10px] text-slate-500 block truncate leading-none mt-0.5">{theme.label}</span>
                                      </div>
                                  </button>
                              ))}
                           </div>
                      </div>

                      <div className="space-y-3">
                          <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2">Accent Color</h3>
                          <div className="flex gap-2 flex-wrap bg-slate-50 p-3 rounded-md border border-slate-200">
                              {colors.map(c => (
                                  <button key={c} onClick={() => updateDesign({ color: c })} className={`w-5 h-5 rounded border border-slate-200 shadow-sm transition-transform hover:scale-110 ${design.color === c ? 'ring-2 ring-offset-2 ring-[#0a66c2] scale-110' : ''}`} style={{ backgroundColor: c }} title={c} />
                              ))}
                          </div>
                      </div>

                      <div className="space-y-5">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 pb-2"><Type size={14} /> Typography</div>
                          
                          <div className="space-y-2">
                              <label className="text-[11px] text-slate-600 font-semibold">Font Family</label>
                              <div className="relative">
                                  <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] text-slate-900 outline-none appearance-none cursor-pointer focus:ring-1 focus:ring-[#0a66c2] transition-all shadow-sm" value={design.fontFamily} onChange={(e) => updateDesign({ fontFamily: e.target.value })}>{fonts.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}</select>
                                  <ChevronLeft className="absolute right-3 top-2.5 rotate-[-90deg] text-slate-400 pointer-events-none" size={14} />
                              </div>
                          </div>

                          <div className="space-y-3">
                               <div className="flex justify-between text-[11px] text-slate-600 font-semibold"><span>Base Text Size</span><span className="text-slate-900 font-bold">{design.fontSize}px</span></div>
                               <input type="range" min="10" max="18" step="1" value={design.fontSize} onChange={(e) => updateDesign({ fontSize: parseInt(e.target.value) })} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0a66c2]" />
                          </div>

                          <div className="space-y-3">
                               <div className="flex justify-between text-[11px] text-slate-600 font-semibold"><span>Document Margins</span><span className="text-slate-900 font-bold">{design.margins}rem</span></div>
                               <input type="range" min="1" max="4" step="0.5" value={design.margins} onChange={(e) => updateDesign({ margins: parseFloat(e.target.value) })} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0a66c2]" />
                          </div>
                      </div>
                  </motion.div>
              )}

              {activeTab === 'starter-kit' && isScratchMode && (
                  <motion.div
                    key="starter-kit"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-5"
                  >
                    <div className="overflow-hidden rounded-[22px] border border-[#C8D9E6] bg-[linear-gradient(135deg,rgba(245,239,235,0.96),rgba(255,255,255,0.98))] shadow-[0_18px_45px_rgba(47,65,86,0.08)]">
                      <div className="border-b border-[#C8D9E6]/70 px-4 py-4 sm:px-5">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="inline-flex items-center rounded-full border border-[#C8D9E6] bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#567C8D] shadow-sm">
                            Starter Kit
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#567C8D]/80">
                            Scratch Mode
                          </span>
                        </div>
                        <h3 className="text-[17px] font-black tracking-tight text-[#2F4156]">
                          Turn a blank letter into a polished first draft in minutes.
                        </h3>
                        <p className="mt-2 max-w-[34ch] text-[12px] leading-5 text-[#567C8D]">
                          Choose a paragraph style for each section, preview it with your role and company details, then insert single blocks or load a complete starter letter.
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-px bg-[#C8D9E6]/70">
                        {[
                          { label: 'Sections', value: String(scratchParagraphSections.length).padStart(2, '0') },
                          { label: 'Options each', value: '05' },
                          { label: 'Best for', value: 'Fast draft' },
                        ].map((item) => (
                          <div key={item.label} className="bg-white px-4 py-3">
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#567C8D]">{item.label}</p>
                            <p className="mt-1 text-[13px] font-bold text-[#2F4156]">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-[#C8D9E6] bg-white p-4 shadow-[0_18px_45px_rgba(47,65,86,0.06)] sm:p-5">
                      <div className="flex flex-col gap-3 border-b border-[#C8D9E6]/60 pb-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-[12px] font-black uppercase tracking-[0.16em] text-[#567C8D]">Paragraph Library</h3>
                          <p className="mt-1 text-[12px] leading-5 text-slate-500">
                            Each card represents one section of the letter. Switch between five versions and keep the tone that feels closest to your voice.
                          </p>
                        </div>
                        <button
                          onClick={loadScratchStarterLetter}
                          className="inline-flex items-center justify-center rounded-xl bg-[#2F4156] px-4 py-2.5 text-[12px] font-black text-white shadow-[0_12px_24px_rgba(47,65,86,0.18)] transition-all hover:bg-[#567C8D]"
                        >
                          Load Starter Letter
                        </button>
                      </div>

                      <div className="mt-4 space-y-4">
                        {scratchParagraphSections.map((section) => {
                          const selectedOptionIndex = selectedScratchOptions[section.id] || 0;
                          const selectedOption = section.options[selectedOptionIndex];
                          const renderedPreview = renderScratchParagraph(selectedOption, scratchContext);

                          return (
                            <div
                              key={section.id}
                              className="overflow-hidden rounded-[20px] border border-[#D7E1E8] bg-[linear-gradient(180deg,#ffffff,#f9fbfc)] shadow-[0_14px_30px_rgba(47,65,86,0.05)]"
                            >
                              <div className="flex flex-col gap-3 border-b border-[#E4EBF0] px-4 py-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#F5EFEB] px-2 text-[10px] font-black text-[#567C8D]">
                                      {String(selectedOptionIndex + 1).padStart(2, '0')}
                                    </span>
                                    <h4 className="text-[13px] font-black text-[#2F4156]">{section.title}</h4>
                                  </div>
                                  <p className="mt-2 text-[11px] font-medium leading-5 text-[#567C8D]">
                                    Preview is personalized using the company, role, and skills from your current draft.
                                  </p>
                                </div>
                                <button
                                  onClick={() => insertScratchParagraph(section.id, selectedOption)}
                                  className="inline-flex shrink-0 items-center justify-center rounded-xl border border-[#C8D9E6] bg-white px-3.5 py-2 text-[11px] font-black text-[#2F4156] shadow-sm transition-all hover:border-[#567C8D]/45 hover:bg-[#F5EFEB]"
                                >
                                  Replace Section
                                </button>
                              </div>

                              <div className="px-4 py-4">
                                <div className="mb-3 flex flex-wrap gap-2">
                                  {section.options.map((_, optionIndex) => (
                                    <button
                                      key={`${section.id}-${optionIndex}`}
                                      onClick={() => handleScratchOptionChange(section.id, optionIndex)}
                                      className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] transition-all ${
                                        selectedOptionIndex === optionIndex
                                          ? 'bg-[#2F4156] text-white shadow-sm'
                                          : 'border border-[#D7E1E8] bg-[#F8FAFB] text-[#567C8D] hover:bg-white hover:text-[#2F4156]'
                                      }`}
                                    >
                                      Option {optionIndex + 1}
                                    </button>
                                  ))}
                                </div>

                                <div className="rounded-[16px] border border-[#E4EBF0] bg-[#FBFCFD] px-4 py-3">
                                  <p className="text-[12px] leading-6 text-slate-600">
                                    {renderedPreview}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
              )}

              {activeTab === 'ai' && (
                  <motion.div 
                    key="ai"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                      {isRegenerating ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                          <div className="p-4 bg-slate-50 border-b border-slate-200">
                             <div className="flex items-center gap-2">
                               <RefreshCw size={16} className="animate-spin text-[#0a66c2]" />
                               <span className="text-[13px] font-bold text-slate-900">AI is rebuilding your document...</span>
                             </div>
                          </div>
                          <LoadingSkeleton />
                        </div>
                      ) : (
                        <div className="bg-gradient-to-br from-[#0a66c2] to-[#004182] p-5 rounded-xl shadow-md text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <Zap size={64} />
                            </div>

                            <h3 className="text-[15px] font-bold mb-2 flex items-center gap-2 relative z-10"><Zap size={16} className="fill-current text-blue-200" /> Analysis Engine</h3>
                            <p className="text-[12px] text-blue-100/90 mb-5 leading-relaxed relative z-10">Choose a new tone and rebuild the document. You will be able to compare both versions before replacing the current letter.</p>
                            
                            <div className="space-y-4 relative z-10">
                                 <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">Document Tone</label>
                                    <div className="relative">
                                        <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-[13px] text-white outline-none appearance-none focus:bg-white/20 transition-all cursor-pointer backdrop-blur-sm" value={aiTone} onChange={(e) => setAiTone(e.target.value)}>
                                            <option className="text-slate-900">Professional</option>
                                            <option className="text-slate-900">Confident</option>
                                            <option className="text-slate-900">Enthusiastic</option>
                                            <option className="text-slate-900">Persuasive</option>
                                        </select>
                                        <ChevronLeft className="absolute right-3 top-2.5 rotate-[-90deg] text-blue-200 pointer-events-none" size={14} />
                                    </div>
                                 </div>

                                 <motion.button 
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleRegenerateAI}
                                    disabled={isRegenerating}
                                    className="w-full py-2.5 bg-white text-[#0a66c2] hover:bg-slate-50 rounded-md font-bold text-[13px] shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
                                 >
                                    <Layers size={16} />
                                    Rebuild Document
                                 </motion.button>
                            </div>
                        </div>
                      )}
                  </motion.div>
              )}
            </AnimatePresence>
        </div>

        <div className="space-y-2 border-t border-slate-200 bg-slate-50/50 p-4 sm:p-5">
          <button onClick={() => setIsPreviewOpen(true)} className="w-full py-2 bg-white border border-slate-200 text-slate-700 rounded-md text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all shadow-sm"><Eye size={16} /> Print Preview</button>
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleDownload} 
            className="w-full py-2 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-md text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Download size={16} /> Print / Save PDF
          </motion.button>
          <div className="pt-2 mt-2 border-t border-slate-200">
            <button onClick={() => setStep(2)} className="w-full py-2 text-slate-500 rounded-md text-[12px] font-semibold flex items-center justify-center gap-1 hover:text-slate-800 transition-all"><ChevronLeft size={14} /> Back to Parameters</button>
          </div>
        </div>
        <button
          type="button"
          aria-label="Resize sidebar"
          onMouseDown={handleSidebarResizeStart}
          className={`group absolute right-0 top-0 hidden h-full w-3 translate-x-1/2 cursor-col-resize items-stretch justify-center lg:flex ${
            isResizingSidebar ? 'bg-[#C8D9E6]/55' : 'bg-transparent hover:bg-[#C8D9E6]/35'
          }`}
        >
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-slate-200 transition-colors group-hover:bg-[#567C8D]/45" />
          <span className="absolute left-1/2 top-1/2 h-12 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_8px_20px_rgba(47,65,86,0.16)] ring-1 ring-slate-200 transition-all group-hover:h-16 group-hover:bg-[#F5EFEB]" />
        </button>
      </div>

      {/* --- PREVIEW AREA --- */}
      <div className="relative flex min-h-[78vh] flex-1 flex-col overflow-hidden bg-[#f8fafc] lg:min-h-0">
        <EditorToolbar runCommand={runEditorCommand} activeFontSize={activeFontSize} />
        <div className="relative flex flex-1 justify-center overflow-auto p-2 pt-20 custom-scrollbar sm:p-6 sm:pt-24 lg:p-12 lg:pt-28">
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(100, 116, 139, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(100, 116, 139, 0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            <div className="pointer-events-none absolute inset-x-0 top-2 z-20 flex items-center justify-center px-3 sm:top-3 lg:top-4">
              <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur">
                <button
                  type="button"
                  onClick={() => cycleTemplate(-1)}
                  aria-label="Previous template"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-[#0a66c2]/30 hover:bg-[#eef6ff] hover:text-[#0a66c2]"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="min-w-[140px] text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Canvas Template</p>
                  <p className="text-[12px] font-bold text-slate-900">{currentTemplateMeta?.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => cycleTemplate(1)}
                  aria-label="Next template"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-[#0a66c2]/30 hover:bg-[#eef6ff] hover:text-[#0a66c2]"
                >
                  <ChevronLeft size={16} className="rotate-180" />
                </button>
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                ref={previewFrameRef}
                className="document-scale-frame border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300"
              >
                 <div className="document-scale-content">
                   {renderSelectedTemplate()}
                 </div>
              </motion.div>
              {pageFitNotice && (
                <div className={`mt-4 w-full max-w-[715px] rounded-lg border px-4 py-3 text-[12px] font-medium leading-5 shadow-sm ${pageFitNotice.tone}`}>
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold">{pageFitNotice.title}</p>
                      <p>{pageFitNotice.detail}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};

const EditorToolbar = ({ runCommand, activeFontSize }) => {
  const fontSizes = Array.from({ length: 10 }, (_, index) => index + 6);
  const buttons = [
    { label: 'Undo', icon: Undo2, command: 'undo' },
    { label: 'Redo', icon: Redo2, command: 'redo' },
    { label: 'Bold', icon: Bold, command: 'bold' },
    { label: 'Italic', icon: Italic, command: 'italic' },
    { label: 'Underline', icon: Underline, command: 'underline' },
    { label: 'Bullets', icon: List, command: 'insertUnorderedList' },
    { label: 'Align left', icon: AlignLeft, command: 'justifyLeft' },
    { label: 'Align center', icon: AlignCenter, command: 'justifyCenter' },
    { label: 'Align right', icon: AlignRight, command: 'justifyRight' },
  ];

  return (
    <div className="relative z-20 flex min-h-14 flex-col items-start justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:px-6 sm:py-2">
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#0a66c2] leading-none">Editor Canvas</p>
        <p className="mt-1 text-[12px] font-medium text-slate-500">Select text directly on the document to apply formatting.</p>
      </div>
      <div className="flex w-full flex-wrap items-center gap-1.5 sm:w-auto sm:justify-end">
        {buttons.map(({ label, icon: Icon, text, command }) => (
          <button
            key={label}
            type="button"
            title={label}
            aria-label={label}
            onMouseDown={(e) => {
              e.preventDefault();
              runCommand(command);
            }}
            className="flex h-8 min-w-8 items-center justify-center rounded-md border border-slate-200 bg-white px-2 text-slate-600 transition-colors hover:border-[#0a66c2]/30 hover:bg-[#eef6ff] hover:text-[#0a66c2]"
          >
            {Icon ? <Icon size={15} strokeWidth={2} /> : <span className="text-[11px] font-black">{text}</span>}
          </button>
        ))}
        <div className="flex h-8 items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 text-slate-600">
          <button
            type="button"
            title="Decrease font size"
            aria-label="Decrease font size"
            onMouseDown={(e) => {
              e.preventDefault();
              runCommand('decreaseFontSize');
            }}
            className="flex h-6 min-w-8 items-center justify-center rounded border border-slate-200 bg-slate-50 px-1.5 text-[11px] font-black transition-colors hover:border-[#0a66c2]/30 hover:bg-[#eef6ff] hover:text-[#0a66c2]"
          >
            A-
          </button>
          <button
            type="button"
            title="Increase font size"
            aria-label="Increase font size"
            onMouseDown={(e) => {
              e.preventDefault();
              runCommand('increaseFontSize');
            }}
            className="flex h-6 min-w-8 items-center justify-center rounded border border-slate-200 bg-slate-50 px-1.5 text-[11px] font-black transition-colors hover:border-[#0a66c2]/30 hover:bg-[#eef6ff] hover:text-[#0a66c2]"
          >
            A+
          </button>
        </div>
        <label className="flex h-8 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-[11px] font-black text-slate-600">
          Size
          <select
            value={String(activeFontSize)}
            aria-label="Font size"
            className="h-6 rounded border border-slate-200 bg-slate-50 px-1 text-[11px] font-black text-slate-700 outline-none focus:border-[#0a66c2]"
            onChange={(e) => {
              if (!e.target.value) return;
              runCommand('setFontSize', e.target.value);
            }}
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>{size}px</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Editor;
