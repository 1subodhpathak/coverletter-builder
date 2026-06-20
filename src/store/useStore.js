// import { create } from 'zustand';

// export const useStore = create((set) => ({
//   // --- Data State ---
//   file: null,
//   resumeText: '',
//   resumeName: '',
//   jobDescription: '',
//   companyName: '',
  
//   // --- App Flow State ---
//   step: 1, // <--- THIS MUST BE 1 FOR THE UPLOADER TO SHOW
//   isGenerating: false,
  
//   // --- Content State ---
//   generatedLetter: '<p>Your cover letter will appear here...</p>', 
  
//   // --- Actions ---
//   setFile: (file) => set({ file }),
//   setResumeText: (text) => set({ resumeText: text }),
//   setResumeName: (name) => set({ resumeName: name }),
//   setJobDescription: (desc) => set({ jobDescription: desc }),
//   setCompanyName: (name) => set({ companyName: name }),
  
//   setStep: (step) => set({ step }),
//   setIsGenerating: (isGenerating) => set({ isGenerating }),
//   setGeneratedLetter: (html) => set({ generatedLetter: html }),
// }));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_LETTER_HTML = '<p>Your tailored cover letter will appear here...</p>';

const clampExperienceMonths = (value) => {
  if (value === '' || value === null || typeof value === 'undefined') return '';

  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) return '';

  return String(Math.min(Math.max(parsed, 0), 11));
};

const normalizeProfileUpdate = (profile = {}) => {
  const normalized = { ...profile };

  if (Object.prototype.hasOwnProperty.call(normalized, 'experienceMonths')) {
    normalized.experienceMonths = clampExperienceMonths(normalized.experienceMonths);
  }

  return normalized;
};

const createStoredDocumentId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const stripHtml = (value = '') => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const hasMeaningfulLetterContent = (html = '') => {
  const text = stripHtml(html);
  return Boolean(text) && text !== stripHtml(DEFAULT_LETTER_HTML) && text.length > 20;
};

const buildSavedLetterTitle = ({ recipient = {}, profile = {}, creationMode }) => {
  const targetRole = recipient.targetRole?.trim();
  const company = recipient.company?.trim();
  const fullName = profile.fullName?.trim();

  if (targetRole && company) return `${targetRole} · ${company}`;
  if (targetRole) return targetRole;
  if (company) return `Cover Letter · ${company}`;
  if (fullName) return `${fullName} Cover Letter`;
  if (creationMode === 'resume-job') return 'Job-Specific Cover Letter';
  if (creationMode === 'resume') return 'Resume Based Cover Letter';
  return 'Cover Letter Draft';
};

const upsertStoredDocument = (documents = [], nextDocument) => {
  const existingIndex = documents.findIndex(
    (document) => document.name === nextDocument.name && document.text === nextDocument.text
  );

  if (existingIndex === -1) {
    return [
      {
        id: createStoredDocumentId(),
        createdAt: new Date().toISOString(),
        ...nextDocument,
      },
      ...documents,
    ];
  }

  const updatedDocuments = [...documents];
  updatedDocuments[existingIndex] = {
    ...updatedDocuments[existingIndex],
    ...nextDocument,
    createdAt: new Date().toISOString(),
  };

  return updatedDocuments;
};

const getBackendUrl = () => import.meta.env.VITE_API_URL || '';

const authenticatedFetch = async (endpoint, options = {}, clerkGetToken) => {
  const baseUrl = getBackendUrl();
  if (!baseUrl) return null;

  try {
    const token = await clerkGetToken();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    };

    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers
    });
    return response;
  } catch (error) {
    console.error(`Error in authenticatedFetch for ${endpoint}:`, error);
    return null;
  }
};

export const useStore = create(
  persist(
    (set, get) => ({
      // --- Auth State ---
      clerkUserId: null,
      clerkGetToken: null,

      // --- Data State ---
      file: null,
      resumeText: '',
      resumeName: '',
      jobDescription: '',
      companyName: '',
      storedResumes: [],
      storedJobDescriptions: [],
      savedLetters: [],
      activeLetterId: null,
      
      // --- App Flow State ---
      step: 0,
      creationMode: null,
      isGenerating: false,
      
      // --- Content State ---
      generatedLetter: '<p>Your tailored cover letter will appear here...</p>', 

      // --- Editor / Document State ---
      selectedTemplate: 'modern',
      profile: {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        linkedinPortfolio: '',
        currentJobTitle: '',
        experienceYears: '',
        experienceMonths: '',
        photo: null,
        showPhoto: false,
      },
      recipient: {
        name: '',
        title: '',
        company: '',
        address: '',
        targetRole: '',
      },
      skills: ['Project Management', 'Strategic Planning', 'Team Leadership'],
      signature: {
        text: '',
        image: null,
        font: "'Great Vibes', cursive",
        enabled: true,
        closing: 'Sincerely,',
      },
      design: {
        fontFamily: '"Inter", sans-serif',
        fontSize: 14,
        lineHeight: 1.6,
        margins: 2.5,
        color: '#0a66c2',
      },
      
      // --- Actions ---
      setAuth: ({ userId, getToken }) => set({ clerkUserId: userId, clerkGetToken: getToken }),
      
      syncWithBackend: async () => {
        const { clerkUserId, clerkGetToken } = get();
        if (!clerkUserId || !clerkGetToken) return;

        try {
          const response = await authenticatedFetch('/careersense/coverletter/all', {}, clerkGetToken);
          if (response && response.ok) {
            const data = await response.json();
            set({
              profile: { ...get().profile, ...data.profile },
              skills: data.skills || get().skills,
              signature: { ...get().signature, ...data.signature },
              design: { ...get().design, ...data.design },
              storedResumes: data.storedResumes || [],
              storedJobDescriptions: data.storedJobDescriptions || [],
              savedLetters: data.savedLetters || []
            });
          }
        } catch (error) {
          console.error('[Zustand] Sync failed:', error);
        }
      },

      setFile: (file) => set({ file }),
      setResumeText: (text) => set({ resumeText: text }),
      setResumeName: (name) => set({ resumeName: name }),
      setJobDescription: (desc) => set({ jobDescription: desc }),
      
      addStoredResume: async ({ name, text, skills = [] }) => {
        let finalDoc;
        set((state) => {
          const updated = upsertStoredDocument(state.storedResumes, {
            name,
            text,
            skills,
            type: 'resume',
          });
          finalDoc = updated.find((d) => d.name === name && d.text === text);
          return { storedResumes: updated };
        });

        const { clerkUserId, clerkGetToken } = get();
        if (clerkUserId && clerkGetToken && finalDoc) {
          await authenticatedFetch('/careersense/coverletter/resumes', {
            method: 'POST',
            body: JSON.stringify({ id: finalDoc.id, name, text, skills })
          }, clerkGetToken);
        }
      },
      
      deleteStoredResume: async (id) => {
        set((state) => ({
          storedResumes: state.storedResumes.filter((document) => document.id !== id),
        }));

        const { clerkUserId, clerkGetToken } = get();
        if (clerkUserId && clerkGetToken) {
          await authenticatedFetch(`/careersense/coverletter/resumes/${id}`, {
            method: 'DELETE'
          }, clerkGetToken);
        }
      },

      addStoredJobDescription: async ({ name, text }) => {
        let finalDoc;
        set((state) => {
          const updated = upsertStoredDocument(state.storedJobDescriptions, {
            name,
            text,
            type: 'job-description',
          });
          finalDoc = updated.find((d) => d.name === name && d.text === text);
          return { storedJobDescriptions: updated };
        });

        const { clerkUserId, clerkGetToken } = get();
        if (clerkUserId && clerkGetToken && finalDoc) {
          await authenticatedFetch('/careersense/coverletter/job-descriptions', {
            method: 'POST',
            body: JSON.stringify({ id: finalDoc.id, name, text })
          }, clerkGetToken);
        }
      },

      deleteStoredJobDescription: async (id) => {
        set((state) => ({
          storedJobDescriptions: state.storedJobDescriptions.filter((document) => document.id !== id),
        }));

        const { clerkUserId, clerkGetToken } = get();
        if (clerkUserId && clerkGetToken) {
          await authenticatedFetch(`/careersense/coverletter/job-descriptions/${id}`, {
            method: 'DELETE'
          }, clerkGetToken);
        }
      },

      upsertSavedLetter: async () => {
        let finalLetter = null;
        set((state) => {
          if (!hasMeaningfulLetterContent(state.generatedLetter)) {
            return state;
          }

          const now = new Date().toISOString();
          const letterId = state.activeLetterId || createStoredDocumentId();
          const existingLetter = state.savedLetters.find((letter) => letter.id === letterId);
          const nextLetter = {
            id: letterId,
            createdAt: existingLetter?.createdAt || now,
            updatedAt: now,
            title: buildSavedLetterTitle({
              recipient: state.recipient,
              profile: state.profile,
              creationMode: state.creationMode,
            }),
            company: state.recipient.company?.trim() || state.companyName?.trim() || 'Open application',
            creationMode: state.creationMode || 'scratch',
            generatedLetter: state.generatedLetter,
            selectedTemplate: state.selectedTemplate,
            profile: state.profile,
            recipient: state.recipient,
            skills: state.skills,
            signature: state.signature,
            design: state.design,
            resumeText: state.resumeText,
            resumeName: state.resumeName,
            jobDescription: state.jobDescription,
            companyName: state.companyName,
          };

          const existingIndex = state.savedLetters.findIndex((letter) => letter.id === letterId);
          const savedLetters =
            existingIndex === -1
              ? [nextLetter, ...state.savedLetters]
              : state.savedLetters.map((letter, index) => (index === existingIndex ? nextLetter : letter));

          finalLetter = nextLetter;
          return {
            savedLetters: savedLetters.sort(
              (first, second) => new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime()
            ),
            activeLetterId: letterId,
          };
        });

        const { clerkUserId, clerkGetToken } = get();
        if (clerkUserId && clerkGetToken && finalLetter) {
          await authenticatedFetch('/careersense/coverletter/saved-letters', {
            method: 'POST',
            body: JSON.stringify(finalLetter)
          }, clerkGetToken);
        }
      },

      loadSavedLetter: (id) =>
        set((state) => {
          const savedLetter = state.savedLetters.find((letter) => letter.id === id);

          if (!savedLetter) return state;

          return {
            activeLetterId: savedLetter.id,
            step: 4,
            creationMode: savedLetter.creationMode || 'scratch',
            file: null,
            resumeText: savedLetter.resumeText || '',
            resumeName: savedLetter.resumeName || '',
            jobDescription: savedLetter.jobDescription || '',
            companyName: savedLetter.companyName || savedLetter.company || '',
            generatedLetter: savedLetter.generatedLetter || DEFAULT_LETTER_HTML,
            isGenerating: false,
            selectedTemplate: savedLetter.selectedTemplate || 'modern',
            profile: {
              ...state.profile,
              ...savedLetter.profile,
            },
            recipient: {
              ...state.recipient,
              ...savedLetter.recipient,
            },
            skills: savedLetter.skills?.length
              ? savedLetter.skills
              : ['Project Management', 'Strategic Planning', 'Team Leadership'],
            signature: {
              text: '',
              image: null,
              font: "'Great Vibes', cursive",
              enabled: true,
              closing: 'Sincerely,',
              ...savedLetter.signature,
            },
            design: {
              fontFamily: '"Inter", sans-serif',
              fontSize: 14,
              lineHeight: 1.6,
              margins: 2.5,
              color: '#0a66c2',
              ...savedLetter.design,
            },
          };
        }),

      deleteSavedLetter: async (id) => {
        set((state) => ({
          savedLetters: state.savedLetters.filter((letter) => letter.id !== id),
          activeLetterId: state.activeLetterId === id ? null : state.activeLetterId,
        }));

        const { clerkUserId, clerkGetToken } = get();
        if (clerkUserId && clerkGetToken) {
          await authenticatedFetch(`/careersense/coverletter/saved-letters/${id}`, {
            method: 'DELETE'
          }, clerkGetToken);
        }
      },

      setCompanyName: (name) => {
        set((state) => ({ 
          companyName: name,
          recipient: { ...state.recipient, company: name }
        }));
      },
      
      setStep: (step) => set({ step }),
      setCreationMode: (creationMode) => set({ creationMode }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      setGeneratedLetter: (html) => set({ generatedLetter: html }),
      
      setSelectedTemplate: (selectedTemplate) => set({ selectedTemplate }),
      
      updateProfile: async (profile) => {
        set((state) => ({ profile: { ...state.profile, ...normalizeProfileUpdate(profile) } }));
        const { clerkUserId, clerkGetToken, profile: updatedProfile } = get();
        if (clerkUserId && clerkGetToken) {
          await authenticatedFetch('/careersense/coverletter/profile', {
            method: 'PUT',
            body: JSON.stringify({ profile: updatedProfile })
          }, clerkGetToken);
        }
      },

      updateRecipient: (recipient) => set((state) => ({ recipient: { ...state.recipient, ...recipient } })),
      
      setSkills: async (skills) => {
        set({ skills });
        const { clerkUserId, clerkGetToken } = get();
        if (clerkUserId && clerkGetToken) {
          await authenticatedFetch('/careersense/coverletter/profile', {
            method: 'PUT',
            body: JSON.stringify({ skills })
          }, clerkGetToken);
        }
      },

      updateSignature: async (signature) => {
        set((state) => ({ signature: { ...state.signature, ...signature } }));
        const { clerkUserId, clerkGetToken, signature: updatedSignature } = get();
        if (clerkUserId && clerkGetToken) {
          await authenticatedFetch('/careersense/coverletter/profile', {
            method: 'PUT',
            body: JSON.stringify({ signature: updatedSignature })
          }, clerkGetToken);
        }
      },

      updateDesign: async (design) => {
        set((state) => ({ design: { ...state.design, ...design } }));
        const { clerkUserId, clerkGetToken, design: updatedDesign } = get();
        if (clerkUserId && clerkGetToken) {
          await authenticatedFetch('/careersense/coverletter/profile', {
            method: 'PUT',
            body: JSON.stringify({ design: updatedDesign })
          }, clerkGetToken);
        }
      },

      resetBuilder: () => set((state) => ({
        step: 0,
        creationMode: null,
        activeLetterId: null,
        file: null,
        resumeText: '',
        resumeName: '',
        jobDescription: '',
        companyName: '',
        generatedLetter: DEFAULT_LETTER_HTML,
        isGenerating: false,
        selectedTemplate: 'modern',
        profile: {
          fullName: state.profile.fullName || '',
          email: state.profile.email || '',
          phone: state.profile.phone || '',
          address: state.profile.address || '',
          linkedinPortfolio: state.profile.linkedinPortfolio || '',
          currentJobTitle: state.profile.currentJobTitle || '',
          experienceYears: state.profile.experienceYears || '',
          experienceMonths: state.profile.experienceMonths || '',
          photo: state.profile.photo || null,
          showPhoto: Boolean(state.profile.showPhoto),
        },
        recipient: { name: '', title: '', company: '', address: '', targetRole: '' },
        skills: ['Project Management', 'Strategic Planning', 'Team Leadership'],
        signature: { text: '', image: null, font: "'Great Vibes', cursive", enabled: true, closing: 'Sincerely,' },
        design: { fontFamily: '"Inter", sans-serif', fontSize: 14, lineHeight: 1.6, margins: 2.5, color: '#0a66c2' },
      })),
    }),
    {
      name: 'careersense-storage',
      partialize: (state) => ({
        resumeText: state.resumeText,
        resumeName: state.resumeName,
        jobDescription: state.jobDescription,
        companyName: state.companyName,
        storedResumes: state.storedResumes,
        storedJobDescriptions: state.storedJobDescriptions,
        savedLetters: state.savedLetters,
        activeLetterId: state.activeLetterId,
        generatedLetter: state.generatedLetter,
        selectedTemplate: state.selectedTemplate,
        profile: state.profile,
        recipient: state.recipient,
        skills: state.skills,
        signature: state.signature,
        design: state.design,
        step: state.step,
        creationMode: state.creationMode,
      }),
    }
  )
);
