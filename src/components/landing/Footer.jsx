import React, { useState } from 'react';
import { FileText, Linkedin, Mail, Twitter, Phone, MapPin, Coffee, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlueLogo from '../../assets/logos/BlueGray.png';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfz55NWi27Do0xWsPxNVEMU6CTqW8diTrwk3oxR62ufMVsPxg/viewform";

const productLinks = [
  { label: 'Builder', path: '/builder' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Templates', href: '#templates' },
  { label: 'Testimonials', href: '#testimonials' },
];

const builderLinks = ['Executive letter builder', 'Resume upload', 'Job description match', 'A4 PDF export'];

const Footer = () => {
  const navigate = useNavigate();
  const [isCoffeeOpen, setIsCoffeeOpen] = useState(false);

  const handleLink = (item) => {
    if (item.path) navigate(item.path);
    if (item.href) document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#C8D9E6] py-14 text-slate-900">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Top CTA Banner */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 rounded-[24px] border border-[#C8D9E6] bg-white px-8 py-8 shadow-sm md:flex-row lg:px-10">
          <div>
            <h3 className="text-xl font-extrabold text-[#2F4156]">
              Initialize Career Uplink?
            </h3>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              Join the network or grab a virtual coffee with our mentors.
            </p>
          </div>

          <button
            onClick={() => setIsCoffeeOpen(true)}
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#2F4156] px-6 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#233244]"
          >
            <Coffee size={18} /> Coffee Connect
          </button>
        </div>
        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & About Description & Socials */}
          <div className="flex flex-col">
            <button onClick={() => navigate('/')} className="flex items-center gap-3 self-start">
              <img src={BlueLogo} alt="CareerSense Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-2xl shadow-xs shrink-0" />
              <div className="text-left">
                <h1 className="text-[25px] font-black leading-none tracking-[-0.04em]">
                  <span className="text-[#2F4156]">Career</span><span className="text-[#567C8D]">Sense</span>
                </h1>
                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.28em] text-[#C8D9E6]">
                  Executive Letters
                </p>
              </div>
            </button>
            <p className="mt-4 max-w-sm text-sm font-semibold leading-6 text-slate-500">
              Premium cover letters, executive templates, and Grow AI drafting for senior job applications.
            </p>
            <div className="mt-6 flex gap-3 text-slate-500">
              <a href="mailto:support@careersenseai.com" className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C8D9E6] transition hover:text-[#567C8D]">
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

          {/* Column 2: Product */}
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

          {/* Column 3: Workflows */}
          <div>
            <h3 className="cs-display font-extrabold text-slate-950">Workflows</h3>
            <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-500">
              {builderLinks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div>
            <h3 className="cs-display font-extrabold text-slate-950">Contact</h3>
            <ul className="mt-4 space-y-3.5 text-sm font-semibold text-slate-500">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#567C8D]" />
                <a href="mailto:support@careersenseai.com" className="hover:text-[#567C8D]">
                  support@careersenseai.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 text-[#567C8D]" />
                <div className="flex flex-col gap-1.5">
                  <a href="tel:+12018936385" className="hover:text-[#567C8D] flex items-center gap-1.5">
                    <span>🇺🇸</span> <span>+1 (201) 893-6385</span>
                  </a>
                  <a href="tel:+919891422329" className="hover:text-[#567C8D] flex items-center gap-1.5">
                    <span>🇮🇳</span> <span>+91 9891422329</span>
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-[#567C8D]" />
                <div className="leading-relaxed">
                  85 CourtHouse Pl, Jersey City<br />
                  New Jersey - 07306
                </div>
              </li>
            </ul>
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

      {/* Coffee Connect Modal */}
      {isCoffeeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F4156]/40 p-4 backdrop-blur-sm">
          <div className="relative flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-[24px] border border-[#C8D9E6] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#C8D9E6] bg-[#F5EFEB] p-4 px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2F4156] shadow-sm">
                  <Coffee size={18} />
                </div>
                <h3 className="font-bold text-[#2F4156]">Coffee Connect</h3>
              </div>
              <button
                onClick={() => setIsCoffeeOpen(false)}
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative flex-1 bg-white">
              <iframe
                src={GOOGLE_FORM_URL}
                className="absolute inset-0 h-full w-full border-0"
                title="Coffee Connect Form"
              >
                Loading...
              </iframe>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
