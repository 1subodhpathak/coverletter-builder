import { mkdir, readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { URL } from 'node:url';

/* global console */

const siteUrl = String(process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://coverletter.careersenseai.com').replace(/\/$/, '');
const distHtmlPath = new URL('../dist/index.html', import.meta.url);

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const escapeJson = (value) => JSON.stringify(value).replaceAll('<', '\\u003c');

const pageTitle = 'Free AI Cover Letter Builder | ATS-Friendly Letters in Seconds - CareerSense';
const pageDescription = 'Generate tailored, ATS-friendly cover letters matched to any job description in seconds with CareerSense AI. Pick executive templates and export instant PDF.';

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'CareerSense AI Cover Letter Builder',
      url: siteUrl,
      description: pageDescription,
      publisher: {
        '@type': 'Organization',
        name: 'CareerSense',
        url: 'https://careersenseai.com',
        logo: 'https://careersenseai.com/CSlogo.png'
      }
    },
    {
      '@type': 'WebApplication',
      '@id': `${siteUrl}/#webapp`,
      name: 'CareerSense AI Cover Letter Builder',
      url: siteUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description: pageDescription,
      offers: {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'USD',
        category: 'Free'
      },
      featureList: [
        'AI Resume and Job Description Calibration',
        'ATS-Optimized Formatting and Keywords',
        'Executive & Professional Letter Templates',
        'Instant High-Resolution PDF Download',
        'Tone Customization for Leadership & Tech Roles'
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the AI Cover Letter Builder work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CareerSense analyzes your resume experience and target job description to automatically generate a tailored, ATS-friendly cover letter highlighting relevant achievements and keywords.'
          }
        },
        {
          '@type': 'Question',
          name: 'Are these cover letters ATS-friendly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. All CareerSense cover letter templates are designed with clean typography, standard layouts, and optimal keyword density to pass Applicant Tracking Systems like Greenhouse, Lever, and Workday.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can I edit and customize the generated cover letter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You have complete control to edit any text, adjust tone, choose templates, and instantly download a high-resolution PDF.'
          }
        },
        {
          '@type': 'Question',
          name: 'Is CareerSense AI Cover Letter Builder free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, you can create, customize, and export professional cover letters for free using CareerSense.'
          }
        }
      ]
    }
  ]
};

// LIGHT THEME HTML MATCHING ACTIVE PRODUCTION REACT APP 1:1
const prerenderBody = `
  <div id="root">
    <div class="relative min-h-screen overflow-x-hidden bg-[#F5EFEB] font-sans text-slate-950">
      <!-- EXACT PRODUCTION NAVBAR (NO EXTRA BUTTONS) -->
      <header class="relative z-50 w-full border-b border-white/10 bg-[#082B45]/95 text-white shadow-[0_10px_30px_rgba(3,22,36,0.22)] backdrop-blur-xl">
        <div class="mx-auto flex w-full max-w-[1600px] min-h-16 items-center justify-between gap-3 px-4 py-2 sm:px-8 sm:py-3">
          <a href="/" class="flex items-center gap-3 shrink-0">
            <img src="/BlueGray.png" alt="CareerSense Logo" class="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-2xl shadow-xs shrink-0" />
            <div class="text-left">
              <span class="text-[25px] font-black leading-none tracking-[-0.04em] block">
                <span class="text-[#F5EFEB]">Career</span><span class="text-[#E3BA5E]">Sense</span>
              </span>
              <span class="mt-1 text-[9px] font-black uppercase tracking-[0.28em] text-[#AFC7D5] block">
                Executive Letters
              </span>
            </div>
          </a>

          <nav class="hidden items-center gap-4 xl:gap-6 text-xs font-bold text-[#D6E3EA] lg:flex">
            <a href="https://resume.careersenseai.com/" class="transition hover:text-white">Career Tools</a>
            <a href="#methods" class="transition hover:text-white">Build Options</a>
            <a href="#cover-letter-questions" class="transition hover:text-white">Ai</a>
            <a href="#anatomy" class="transition hover:text-white">Letter Guide</a>
            <a href="#templates" class="transition hover:text-white">Templates</a>
            <a href="#testimonials" class="transition hover:text-white">Reviews</a>
            <a href="https://careersenseai.com/pricing" class="transition hover:text-white">Pricing</a>
          </nav>

          <!-- Clean right section without extra build button per user request -->
          <div class="flex items-center gap-2 shrink-0"></div>
        </div>
      </header>

      <!-- EXACT PRODUCTION HERO SECTION (MATCHES Home.jsx 1:1) -->
      <section class="relative isolate overflow-hidden bg-[#F6EFE4] lg:h-[calc(100dvh-82px)] lg:min-h-0 border-b border-[#D8C7B0]/60">
        <!-- HERO BACKGROUND IMAGE -->
        <img src="/hero.png" alt="" aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full object-cover object-center" />
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(248,241,230,0.99)_0%,rgba(248,241,230,0.97)_31%,rgba(248,241,230,0.84)_46%,rgba(248,241,230,0.30)_61%,rgba(248,241,230,0.03)_78%)]"></div>
        <div aria-hidden="true" class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.02),rgba(247,240,229,.10)_70%,rgba(247,240,229,.20))]"></div>

        <div class="relative z-10 mx-auto grid w-full max-w-[1580px] gap-8 px-5 py-8 sm:px-8 lg:h-full lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-12 lg:py-5 xl:px-16">
          <!-- LEFT CONTENT -->
          <div class="max-w-[660px] lg:translate-y-[clamp(32px,4.5vh,48px)]">
            <div class="mb-4 flex items-center gap-3">
              <span class="h-px w-7 bg-[#BA8125]"></span>
              <p class="text-[10px] font-black uppercase tracking-[0.29em] text-[#A56F1D]">
                Executive Cover Letter Builder
              </p>
            </div>

            <h1 class="max-w-[620px] font-serif text-[clamp(46px,6.2vh,66px)] font-semibold leading-[0.97] tracking-[-0.045em] text-[#102D47]">
              Letters for serious<br />
              applications.
            </h1>

            <div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-bold text-[#587488]">
              <span>Build</span>
              <span class="text-[#A56F1D] font-extrabold">Smarter</span>
              <span>with CareerSense intelligence.</span>
            </div>

            <p class="mt-4 max-w-[590px] text-[15px] font-medium leading-[1.62] text-[#31546B] xl:text-[16px]">
              Polished, job-specific cover letters with executive-level structure and intelligent guidance. Go from your experience to a compelling, editable draft in minutes.
            </p>

            <!-- CTAS -->
            <div class="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="/builder" class="group inline-flex h-[50px] min-w-[245px] items-center justify-between rounded-[9px] bg-[#0B3A5B] px-6 text-[13px] font-extrabold text-white shadow-[0_10px_24px_rgba(11,58,91,.17)] hover:bg-[#082F4B] transition-all">
                <span>Start Building Free</span>
                <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
              <a href="#methods" class="group inline-flex h-[50px] min-w-[220px] items-center justify-center gap-3 rounded-[9px] border border-[#9EB1BD] bg-white/60 px-5 text-[13px] font-extrabold text-[#14344D] backdrop-blur-sm hover:bg-white/90 transition-all">
                <span class="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8C267] text-[#102D47] text-xs font-bold">&#9658;</span>
                <span>See How It Works</span>
              </a>
            </div>

            <!-- BENEFITS CHECKMARKS -->
            <div class="mt-6 grid max-w-[560px] gap-x-7 gap-y-2.5 sm:grid-cols-2">
              <div class="flex items-center gap-2.5 text-[12.5px] font-semibold text-[#294960]">
                <span class="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-[#B88627] text-[12px] font-bold text-[#B88627]">&#10003;</span>
                <span>Executive-grade templates</span>
              </div>
              <div class="flex items-center gap-2.5 text-[12.5px] font-semibold text-[#294960]">
                <span class="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-[#B88627] text-[12px] font-bold text-[#B88627]">&#10003;</span>
                <span>AI-powered guidance</span>
              </div>
              <div class="flex items-center gap-2.5 text-[12.5px] font-semibold text-[#294960]">
                <span class="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-[#B88627] text-[12px] font-bold text-[#B88627]">&#10003;</span>
                <span>Job-specific tailoring</span>
              </div>
              <div class="flex items-center gap-2.5 text-[12.5px] font-semibold text-[#294960]">
                <span class="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-[#B88627] text-[12px] font-bold text-[#B88627]">&#10003;</span>
                <span>Download as PDF</span>
              </div>
            </div>

            <!-- STATS PILLS -->
            <div class="mt-6 flex w-full max-w-[650px] flex-wrap gap-x-5 gap-y-3 border-t border-[#D7CFC3] pt-5 sm:flex-nowrap sm:gap-x-4">
              <div class="flex min-w-[125px] items-center gap-2.5 sm:min-w-0 sm:flex-1">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/80 bg-[#EDF2F5]/90 text-[#163D59] shadow-[0_4px_12px_rgba(16,45,71,.05)] font-bold text-xs">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div>
                  <p class="text-[21px] font-black leading-none tracking-[-0.025em] text-[#102D47]">65</p>
                  <p class="mt-1 text-[8.5px] font-black uppercase tracking-[0.14em] text-[#637C8E]">Templates</p>
                </div>
              </div>
              <div class="flex min-w-[125px] items-center gap-2.5 sm:min-w-0 sm:flex-1">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/80 bg-[#EDF2F5]/90 text-[#163D59] shadow-[0_4px_12px_rgba(16,45,71,.05)] font-bold text-xs">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                </div>
                <div>
                  <p class="text-[21px] font-black leading-none tracking-[-0.025em] text-[#102D47]">A4</p>
                  <p class="mt-1 text-[8.5px] font-black uppercase tracking-[0.14em] text-[#637C8E]">Preview</p>
                </div>
              </div>
              <div class="flex min-w-[125px] items-center gap-2.5 sm:min-w-0 sm:flex-1">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/80 bg-[#EDF2F5]/90 text-[#163D59] shadow-[0_4px_12px_rgba(16,45,71,.05)] font-bold text-xs">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <div>
                  <p class="text-[21px] font-black leading-none tracking-[-0.025em] text-[#102D47]">3</p>
                  <p class="mt-1 text-[8.5px] font-black uppercase tracking-[0.14em] text-[#637C8E]">ways to start</p>
                </div>
              </div>
              <div class="flex min-w-[125px] items-center gap-2.5 sm:min-w-0 sm:flex-1">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-white/80 bg-[#EDF2F5]/90 text-[#163D59] shadow-[0_4px_12px_rgba(16,45,71,.05)] font-bold text-xs">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/></svg>
                </div>
                <div>
                  <p class="text-[21px] font-black leading-none tracking-[-0.025em] text-[#102D47]">ATS</p>
                  <p class="mt-1 text-[8.5px] font-black uppercase tracking-[0.14em] text-[#637C8E]">Friendly</p>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT PRODUCT PREVIEW (BUILDER CARD OVERLAY MATCHING REACT UI) -->
          <div class="relative hidden h-full min-h-0 lg:block">
            <div id="methods" class="absolute right-[1.5%] top-1/2 w-[355px] -translate-y-1/2 scroll-mt-24 overflow-hidden rounded-[18px] border border-[#D9E1E6] bg-white/96 p-[18px] shadow-[0_24px_60px_rgba(19,43,60,.18)] backdrop-blur-xl xl:right-[3%] xl:w-[375px]">
              <!-- Header -->
              <div class="flex items-start gap-3 border-b border-[#E7ECEF] pb-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF2F6] text-[#123A57] font-bold text-sm">
                  &nearr;
                </div>
                <div>
                  <p class="text-[14px] font-black tracking-[-0.02em] text-[#102D47]">CareerSense Builder</p>
                  <p class="mt-0.5 text-[10.5px] font-medium text-[#7A909F]">Turn your experience into impact</p>
                </div>
              </div>

              <!-- Methods -->
              <div class="mt-4 space-y-2.5">
                <div class="group flex min-h-[86px] w-full items-center gap-3 rounded-[11px] border border-[#E1E8EC] bg-white px-3.5 py-3 text-left shadow-[0_3px_10px_rgba(16,45,71,.035)]">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-[#EDF3F6] text-[#254B65]">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <p class="truncate text-[11.5px] font-extrabold text-[#15364E]">Build from Scratch</p>
                      <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#15956A] text-[9px] font-black text-white">&#10003;</span>
                    </div>
                    <p class="mt-1 line-clamp-2 text-[9.5px] font-medium leading-[1.4] text-[#7B909E]">Open the editor, write manually, and use professional formatting tools.</p>
                  </div>
                </div>

                <div class="group flex min-h-[86px] w-full items-center gap-3 rounded-[11px] border border-[#E1E8EC] bg-white px-3.5 py-3 text-left shadow-[0_3px_10px_rgba(16,45,71,.035)]">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-[#EDF3F6] text-[#254B65]">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <p class="truncate text-[11.5px] font-extrabold text-[#15364E]">Resume Based Letter</p>
                      <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#15956A] text-[9px] font-black text-white">&#10003;</span>
                    </div>
                    <p class="mt-1 line-clamp-2 text-[9.5px] font-medium leading-[1.4] text-[#7B909E]">Cora AI analyzes your resume and creates a strong general cover letter.</p>
                  </div>
                </div>

                <div class="group flex min-h-[86px] w-full items-center gap-3 rounded-[11px] border border-[#E1E8EC] bg-white px-3.5 py-3 text-left shadow-[0_3px_10px_rgba(16,45,71,.035)]">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] bg-[#FFF1D5] text-[#B17A1C]">
                    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <p class="truncate text-[11.5px] font-extrabold text-[#15364E]">Job-Specific Calibration</p>
                      <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#15956A] text-[9px] font-black text-white">&#10003;</span>
                    </div>
                    <p class="mt-1 line-clamp-2 text-[9.5px] font-medium leading-[1.4] text-[#7B909E]">Cora AI matches your resume to a role and writes a tailored letter.</p>
                  </div>
                </div>
              </div>

              <!-- CTA -->
              <a href="/builder" class="group mt-4 flex h-[50px] w-full items-center justify-center gap-3 rounded-[10px] bg-[#0B304B] text-[12.5px] font-extrabold text-white shadow-[0_9px_20px_rgba(11,48,75,.17)] hover:bg-[#08283F] transition-all">
                <span>Generate My Letter</span>
                <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- HIGHLIGHTS SECTION -->
      <section class="py-16 px-5 sm:px-8 lg:px-12 max-w-[1400px] mx-auto">
        <h2 class="text-2xl font-bold tracking-tight text-[#102D47] sm:text-3xl text-center">
          Why Job Seekers Choose CareerSense Cover Letters
        </h2>
        <p class="mt-3 text-sm text-[#587488] text-center max-w-2xl mx-auto">
          Every cover letter is calibrated to pass recruitment software and capture the attention of hiring directors.
        </p>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-2xl border border-[#D8C7B0]/80 bg-white p-6 shadow-sm">
            <div class="text-2xl mb-3">&#127919;</div>
            <h3 class="text-base font-bold text-[#102D47]">JD Keyword Match</h3>
            <p class="mt-2 text-xs text-slate-600 leading-relaxed">Extracts top keywords, technical skills, and cultural themes directly from the job posting to ensure immediate relevance.</p>
          </div>
          <div class="rounded-2xl border border-[#D8C7B0]/80 bg-white p-6 shadow-sm">
            <div class="text-2xl mb-3">&#9989;</div>
            <h3 class="text-base font-bold text-[#102D47]">ATS Architecture</h3>
            <p class="mt-2 text-xs text-slate-600 leading-relaxed">Standard margin hierarchy, clean Unicode typography, and structured headings that parse without errors.</p>
          </div>
          <div class="rounded-2xl border border-[#D8C7B0]/80 bg-white p-6 shadow-sm">
            <div class="text-2xl mb-3">&#128188;</div>
            <h3 class="text-base font-bold text-[#102D47]">Executive Tone</h3>
            <p class="mt-2 text-xs text-slate-600 leading-relaxed">Tailors tone across Executive, Confident, Technical, and Creative styles to match your industry culture.</p>
          </div>
          <div class="rounded-2xl border border-[#D8C7B0]/80 bg-white p-6 shadow-sm">
            <div class="text-2xl mb-3">&#128424;</div>
            <h3 class="text-base font-bold text-[#102D47]">Instant PDF Export</h3>
            <p class="mt-2 text-xs text-slate-600 leading-relaxed">Export print-ready, high-resolution PDFs formatted to pair seamlessly with your CareerSense resume.</p>
          </div>
        </div>
      </section>

      <!-- HOW IT WORKS -->
      <section id="methods" class="py-16 px-5 sm:px-8 lg:px-12 bg-white border-y border-[#D8C7B0]/60">
        <div class="max-w-[1400px] mx-auto">
          <h2 class="text-2xl font-bold tracking-tight text-[#102D47] sm:text-3xl text-center">
            How It Works in 3 Simple Steps
          </h2>
          <div class="mt-10 grid gap-8 sm:grid-cols-3">
            <div class="text-center p-6">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6EFE4] text-[#102D47] font-black text-lg border border-[#D8C7B0]">1</div>
              <h3 class="mt-4 text-base font-bold text-slate-900">Upload Resume</h3>
              <p class="mt-2 text-xs text-slate-600 leading-relaxed">Upload your existing resume to let AI extract your top career achievements and measurable metrics.</p>
            </div>
            <div class="text-center p-6">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6EFE4] text-[#102D47] font-black text-lg border border-[#D8C7B0]">2</div>
              <h3 class="mt-4 text-base font-bold text-slate-900">Paste Job Description</h3>
              <p class="mt-2 text-xs text-slate-600 leading-relaxed">Paste the requirements from your target job listing to automatically identify required skills and competencies.</p>
            </div>
            <div class="text-center p-6">
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6EFE4] text-[#102D47] font-black text-lg border border-[#D8C7B0]">3</div>
              <h3 class="mt-4 text-base font-bold text-slate-900">Generate &amp; Download</h3>
              <p class="mt-2 text-xs text-slate-600 leading-relaxed">AI synthesizes your unique background into a compelling, ATS-friendly cover letter ready for 1-click export.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ SECTION -->
      <section class="py-16 px-5 sm:px-8 lg:px-12 max-w-[1200px] mx-auto">
        <h2 class="text-2xl font-bold tracking-tight text-[#102D47] sm:text-3xl text-center">
          Frequently Asked Questions
        </h2>
        <div class="mt-8 space-y-4">
          <div class="rounded-2xl border border-[#D8C7B0]/80 bg-white p-6 shadow-xs">
            <h3 class="text-sm font-bold text-slate-900">How does the AI Cover Letter Builder work?</h3>
            <p class="mt-2 text-xs text-slate-600 leading-relaxed">CareerSense analyzes your resume experience and target job description to automatically generate a tailored, ATS-friendly cover letter highlighting relevant achievements and keywords.</p>
          </div>
          <div class="rounded-2xl border border-[#D8C7B0]/80 bg-white p-6 shadow-xs">
            <h3 class="text-sm font-bold text-slate-900">Are these cover letters ATS-friendly?</h3>
            <p class="mt-2 text-xs text-slate-600 leading-relaxed">Yes. All CareerSense cover letter templates are designed with clean typography, standard layouts, and optimal keyword density to pass Applicant Tracking Systems like Greenhouse, Lever, and Workday.</p>
          </div>
          <div class="rounded-2xl border border-[#D8C7B0]/80 bg-white p-6 shadow-xs">
            <h3 class="text-sm font-bold text-slate-900">Can I edit and customize the generated cover letter?</h3>
            <p class="mt-2 text-xs text-slate-600 leading-relaxed">Yes. You have complete control to edit any text, adjust tone, choose templates, and instantly download a high-resolution PDF.</p>
          </div>
          <div class="rounded-2xl border border-[#D8C7B0]/80 bg-white p-6 shadow-xs">
            <h3 class="text-sm font-bold text-slate-900">Is CareerSense AI Cover Letter Builder free?</h3>
            <p class="mt-2 text-xs text-slate-600 leading-relaxed">Yes, you can create, customize, and export professional cover letters for free using CareerSense.</p>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="border-t border-[#D8C7B0] bg-[#082B45] px-5 py-12 sm:px-8 text-[#D6E3EA]">
        <div class="mx-auto grid max-w-[1400px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div class="flex items-center gap-2">
              <img src="/BlueGray.png" alt="CareerSense" class="h-8 w-8 object-contain" />
              <span class="text-lg font-black text-white">Career<span class="text-[#E3BA5E]">Sense</span></span>
            </div>
            <p class="mt-3 text-xs leading-relaxed text-[#9BB5C6]">
              Boardroom-ready executive cover letters and career acceleration tools helping candidates stand out.
            </p>
          </div>
          <div>
            <h4 class="text-xs font-black uppercase tracking-wider text-white">CareerSense Suite</h4>
            <ul class="mt-3 space-y-2 text-xs text-[#9BB5C6]">
              <li><a href="https://resume.careersenseai.com/" class="hover:text-[#E3BA5E]">AI Resume Builder</a></li>
              <li><a href="https://ats.careersenseai.com/" class="hover:text-[#E3BA5E]">ATS Score Checker</a></li>
              <li><a href="https://certifi.careersenseai.com/" class="hover:text-[#E3BA5E]">Skill Certification</a></li>
              <li><a href="https://careersenseai.com/career-gps" class="hover:text-[#E3BA5E]">Career GPS</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-xs font-black uppercase tracking-wider text-white">Platform</h4>
            <ul class="mt-3 space-y-2 text-xs text-[#9BB5C6]">
              <li><a href="https://careersenseai.com/pricing" class="hover:text-[#E3BA5E]">Pricing &amp; Plans</a></li>
              <li><a href="https://careersenseai.com/partner-program" class="hover:text-[#E3BA5E]">Partner Program</a></li>
              <li><a href="mailto:support@careersenseai.com" class="hover:text-[#E3BA5E]">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-xs font-black uppercase tracking-wider text-white">Formatting Guarantee</h4>
            <p class="mt-3 text-xs leading-relaxed text-[#9BB5C6]">
              Designed with strict adherence to recruiter margins, font fallbacks, and Applicant Tracking System parse rules.
            </p>
          </div>
        </div>
        <div class="mx-auto mt-8 max-w-[1400px] border-t border-white/10 pt-6 text-center text-xs text-[#9BB5C6]">
          &copy; 2026 CareerSense AI. All rights reserved.
        </div>
      </footer>
    </div>
  </div>
`;

async function prerender() {
  try {
    const rawHtml = await readFile(distHtmlPath, 'utf8');

    // 1. GENERATE APP SHELL FOR PRIVATE / INTERNAL ROUTES (dist/app.html + pre-created directories)
    // Prevents flash of homepage when users directly hit /dashboard, /builder, etc.
    // Instead of showing the full pre-rendered landing page, it renders a clean brand spinner
    // loader on frame 1 until React mounts.
    // All SEO pages continue to receive 100% full semantic content with ZERO loader.
    const APP_ROUTES = [
      '/dashboard',
      '/builder'
    ];

    const appShellLoader = '<div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #F5EFEB;"><div style="width: 36px; height: 36px; border: 3.5px solid #E2E8F0; border-top-color: #082B45; border-radius: 50%; animation: cs-spin 0.8s linear infinite;"></div></div>';
    const appShellStyles = '<style>@keyframes cs-spin { to { transform: rotate(360deg); } }</style>';
    const appShellHtml = rawHtml
      .replace('</head>', `${appShellStyles}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${appShellLoader}</div>`);

    for (const appRoute of APP_ROUTES) {
      const dir = new URL(`../dist${appRoute}/`, import.meta.url);
      await mkdir(dir, { recursive: true });
      await writeFile(new URL('index.html', dir), appShellHtml, 'utf8');
      const directHtmlPath = new URL(`../dist${appRoute}.html`, import.meta.url);
      await writeFile(directHtmlPath, appShellHtml, 'utf8');
    }
    await writeFile(new URL('../dist/app.html', import.meta.url), appShellHtml, 'utf8');
    console.log('âœ“ Generated Cover Letter app.html shell with theme loader for internal app routes.');

    // Replace <div id="root"></div> with styled prerenderBody
    let html = rawHtml.replace(/<div id="root"><\/div>/, prerenderBody);
    if (!html.includes('Executive Cover Letter Builder')) {
      html = html.replace(/<div id="root">[\s\S]*?<\/div>/, prerenderBody);
    }

    // Ensure stylesheet link is at the very top of <head> to eliminate white flash
    const stylesheetMatch = html.match(/<link rel="stylesheet"[^>]+>/);
    if (stylesheetMatch) {
      const stylesheetTag = stylesheetMatch[0];
      html = html.replace(stylesheetTag, '');
      html = html.replace('<head>', `<head>\n    ${stylesheetTag}`);
    }

    // Ensure schema is updated
    const schemaTag = `<script type="application/ld+json">${escapeJson(schema)}</script>`;
    if (html.includes('application/ld+json')) {
      html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schemaTag);
    } else {
      html = html.replace('</head>', `  ${schemaTag}\n</head>`);
    }

    await writeFile(distHtmlPath, html, 'utf8');
    console.log('✓ Successfully prerendered Cover Letter Builder landing page into dist/index.html');

    // Keep sitemap synced with current build date
    const buildDate = new Date().toISOString().slice(0, 10);
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${buildDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;
    await writeFile(new URL('../dist/sitemap.xml', import.meta.url), sitemapXml, 'utf8');
    await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemapXml, 'utf8');
    console.log(`✓ Updated sitemap.xml with build date ${buildDate}`);
  } catch (err) {
    console.error('Error during Cover Letter prerender:', err);
    process.exit(1);
  }
}

prerender();
