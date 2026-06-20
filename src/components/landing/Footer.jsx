import React from 'react';
import { FileText, Linkedin, Mail, Twitter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const productLinks = [
  { label: 'Builder', path: '/builder' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Templates', href: '#templates' },
  { label: 'Testimonials', href: '#testimonials' },
];

const builderLinks = ['Executive letter builder', 'Resume upload', 'Job description match', 'A4 PDF export'];

const Footer = () => {
  const navigate = useNavigate();

  const handleLink = (item) => {
    if (item.path) navigate(item.path);
    if (item.href) document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#C8D9E6] py-14 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-[#C8D9E6] pb-10 md:flex-row md:items-center md:justify-between">
          <div>
            <button onClick={() => navigate('/')} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2F4156] text-white">
                <FileText size={22} />
              </div>
              <div className="text-left">
                <p className="cs-display text-xl font-extrabold leading-none tracking-tight">CareerSense</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#567C8D]">Executive Letters</p>
              </div>
            </button>
            <p className="mt-4 max-w-md text-sm font-semibold leading-6 text-slate-500">
              Premium cover letters, executive templates, and Grow AI drafting for senior job applications.
            </p>
          </div>
          <div className="flex gap-3 text-slate-500">
            <a href="mailto:hello@careersense.ai" className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C8D9E6] transition hover:text-[#567C8D]">
              <Mail size={18} />
            </a>
            <a href="https://www.linkedin.com" className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C8D9E6] transition hover:text-[#567C8D]">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com" className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C8D9E6] transition hover:text-[#567C8D]">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-10 md:grid-cols-3">
          <div>
            <h3 className="cs-display font-extrabold text-slate-950">Product</h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-500">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <button onClick={() => handleLink(item)} className="hover:text-[#567C8D]">{item.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="cs-display font-extrabold text-slate-950">Workflows</h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-500">
              {builderLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#C8D9E6] bg-white p-6">
            <h3 className="cs-display font-extrabold text-slate-950">Grow updates</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
              Product updates for executive templates, AI writing, and application tools.
            </p>
            <div className="mt-5 flex gap-2">
              <input className="min-w-0 flex-1 rounded-lg border border-[#C8D9E6] bg-white px-3 py-2 text-sm outline-none focus:border-[#567C8D] focus:ring-2 focus:ring-[#567C8D]/15" placeholder="Email address" />
              <button className="rounded-lg bg-[#2F4156] px-4 py-2 text-sm font-black text-white hover:bg-[#567C8D]">Join</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#C8D9E6] pt-6 text-sm font-semibold text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>Copyright © 2026 CareerSense. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#567C8D]">Privacy Policy</a>
            <a href="#" className="hover:text-[#567C8D]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
