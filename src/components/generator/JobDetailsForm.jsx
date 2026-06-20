import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { ArrowRight, Sparkles, Building2, Briefcase } from 'lucide-react';
import { generateCoverLetter } from '../../services/groqService'; // We will create this next

const JobDetails = () => {
  const { 
    jobDescription, setJobDescription, 
    companyName, setCompanyName,
    tone, setTone,
    resumeText, setGeneratedLetter, setStep, setIsGenerating 
  } = useStore();

  const handleGenerate = async () => {
    if (!jobDescription || !companyName) return alert("Please fill in the details");
    
    setIsGenerating(true);
    setStep(3); // Move to Editor immediately to show loading state
    
    try {
      // Call the AI Service
      const letter = await generateCoverLetter({ 
        jobDescription, 
        resumeText, 
        companyName, 
        targetRole: '',
        tone 
      });
      
      setGeneratedLetter(letter);
    } catch (error) {
      console.error("Generation failed", error);
      alert("Failed to generate letter. Please check your API key.");
      setStep(2); // Go back if error
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Target Role Details</h2>
        <p className="text-slate-500 text-sm">Tell us who you are writing to.</p>
      </div>

      <div className="space-y-6">
        
        {/* Company & Role Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Company Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                type="text" 
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="e.g. Google"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Tone</label>
            <select 
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Professional">Professional</option>
              <option value="Confident">Confident</option>
              <option value="Enthusiastic">Enthusiastic</option>
              <option value="Casual">Casual</option>
            </select>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
            <span>Job Description</span>
            <span className="text-indigo-600 cursor-pointer text-[10px] hover:underline">Auto-fill from URL?</span>
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 text-slate-400" size={18} />
            <textarea 
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl h-48 focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm leading-relaxed"
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Generate Button */}
        <button 
          onClick={handleGenerate}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles size={20} /> Generate Cover Letter
        </button>

      </div>
    </div>
  );
};

export default JobDetails;
