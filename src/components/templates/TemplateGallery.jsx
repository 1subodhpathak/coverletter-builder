import React, {
  useMemo,
  useState,
} from 'react';

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from 'lucide-react';

import {
  useNavigate,
} from 'react-router-dom';

import ModernTemplate from './ModernTemplate';
import IvyLeagueTemplate from './IvyLeagueTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import SidebarTemplate from './SidebarTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import ClassicTemplate from './ClassicTemplate';
import CreativeTemplate from './CreativeTemplate';
import ModernColorBlockTemplate from './ModernColorBlockTemplate';
import ArtisticTemplate from './ArtisticTemplate';
import TimelineTemplate from './TimelineTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';

import {
  getTemplateDescription,
  professionalTemplateIds,
  templateOptions,
} from './templateCatalog';


/* ============================================================
   SAMPLE TEMPLATE DATA
   ============================================================ */

const sampleProps = {
  body: `
    <p>Dear Hiring Manager,</p>

    <p>
      I help teams turn complex business problems into clear execution plans.
      At Northstar Analytics, I partnered with product, sales, and finance
      leaders to improve reporting accuracy and reduce weekly manual work
      by 18 hours.
    </p>

    <p>
      Your role calls for someone who can combine analytical rigor with
      stakeholder communication. My background in dashboard design,
      process improvement, and cross-functional project delivery aligns
      closely with those needs.
    </p>

    <ul>
      <li>
        <strong>Reporting:</strong>
        Built executive dashboards used by 40+ leaders.
      </li>

      <li>
        <strong>Operations:</strong>
        Improved monthly close reporting speed by 28%.
      </li>

      <li>
        <strong>Communication:</strong>
        Presented insights to senior stakeholders weekly.
      </li>
    </ul>

    <p>
      I would welcome the opportunity to discuss how I can contribute
      to your team.
    </p>
  `,

  design: {
    fontFamily: '"Manrope", Arial, sans-serif',
    fontSize: 14,
    lineHeight: 1.72,
    margins: 2.25,
    color: '#506F80',
  },

  profile: {
    fullName: 'POOJA BANSAL',
    email: 'Bansal.Pooja@email.com',
    phone: '+91 98765 43210',
    address: 'Gurugram, India',
    linkedinPortfolio: 'linkedin.com/in/poojabansal',
    photo: null,
    showPhoto: false,
  },

  recipient: {
    name: 'Hiring Manager',
    title: 'Recruiting Team',
    company: 'Synchrony',
    address: 'Hyderabad, India',
  },

  signature: {
    enabled: true,
    text: 'Pooja Bansal',
    image: null,
    font: "'Great Vibes', cursive",
    closing: 'Best regards,',
  },

  skills: [
    'Business Reporting',
    'SQL',
    'Power BI',
    'Stakeholder Management',
  ],

  onUpdateBody: () => {},
};


/* ============================================================
   DARK GRID
   ============================================================ */

const DarkGrid = () => (
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      opacity-[0.10]
    "
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)
      `,
      backgroundSize: '38px 38px',
    }}
  />
);


/* ============================================================
   GENERIC TEMPLATE GALLERY
   Used when TemplateGallery itself is embedded somewhere.
   ============================================================ */

const TemplateGallery = ({
  title = 'Professional Templates',
  description = 'Click any template to preview it with sample cover-letter data.',
}) => {
  const [selectedId, setSelectedId] =
    useState('modern');

  const selected =
    templateOptions.find(
      (template) =>
        template.id === selectedId
    ) || templateOptions[0];

  return (
    <section
      className="
        overflow-hidden
        rounded-[26px]
        border
        border-[#E4DED4]
        bg-[#FBF8F2]
        shadow-[0_14px_45px_rgba(15,42,67,0.07)]
      "
    >
      {/* Header */}
      <div
        className="
          relative
          overflow-hidden
          bg-[#0D2B42]
          p-6
          lg:p-8
        "
      >
        <DarkGrid />

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-28
            h-80
            w-80
            rounded-full
            bg-[#66889B]
            opacity-20
            blur-[90px]
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-5
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.25em]
                text-[#E3B550]
              "
            >
              Template Studio
            </p>

            <h2
              className="
                cs-display
                mt-3
                text-[32px]
                font-medium
                tracking-[-0.03em]
                text-white
              "
            >
              {title}
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-[13px]
                leading-6
                text-[#BED0D8]
              "
            >
              {description}
            </p>
          </div>

          <div
            className="
              w-fit
              rounded-full
              border
              border-[#58758A]
              bg-[#183A51]
              px-4
              py-2
              text-[10px]
              font-black
              uppercase
              tracking-[0.17em]
              text-[#C9D8E0]
            "
          >
            {templateOptions.length} Templates
          </div>
        </div>
      </div>


      {/* Body */}
      <div
        className="
          grid
          gap-6
          p-5
          lg:p-6
          xl:grid-cols-[1fr_0.92fr]
        "
      >
        {/* List */}
        <div
          className="
            grid
            max-h-[900px]
            gap-4
            overflow-y-auto
            pr-2
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {templateOptions.map(
            (template) => {
              const active =
                selectedId ===
                template.id;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() =>
                    setSelectedId(
                      template.id
                    )
                  }
                  className={`
                    group
                    overflow-hidden
                    rounded-[18px]
                    border
                    bg-white
                    text-left
                    transition-all
                    duration-300

                    ${
                      active
                        ? `
                          border-[#D8A64D]
                          shadow-[0_12px_28px_rgba(15,42,67,0.11)]
                          ring-1
                          ring-[#D8A64D]
                        `
                        : `
                          border-[#E5E1DA]
                          shadow-[0_7px_22px_rgba(15,42,67,0.05)]
                          hover:-translate-y-1
                          hover:border-[#CCD9DF]
                          hover:shadow-[0_13px_28px_rgba(15,42,67,0.09)]
                        `
                    }
                  `}
                >
                  <TemplateFrame
                    id={template.id}
                    scaleClass="scale-[0.28]"
                  />

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      border-t
                      border-[#EEEAE3]
                      px-4
                      py-3.5
                    "
                  >
                    <div
                      className="
                        min-w-0
                      "
                    >
                      <p
                        className="
                          truncate
                          text-[12px]
                          font-bold
                          text-[#102A43]
                        "
                      >
                        {template.name}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[9px]
                          font-black
                          uppercase
                          tracking-[0.12em]
                          text-[#7E929C]
                        "
                      >
                        {template.tag}
                      </p>
                    </div>

                    <span
                      className={`
                        ml-3
                        shrink-0
                        rounded-full
                        px-2.5
                        py-1
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.12em]

                        ${
                          active
                            ? `
                              bg-[#F5E7C8]
                              text-[#8D6828]
                            `
                            : `
                              bg-[#EEF3F5]
                              text-[#66889B]
                            `
                        }
                      `}
                    >
                      {active
                        ? 'Selected'
                        : 'Preview'}
                    </span>
                  </div>
                </button>
              );
            }
          )}
        </div>


        {/* Selected */}
        <div
          className="
            rounded-[22px]
            border
            border-[#E5E0D7]
            bg-[#F7F4EE]
            p-5
          "
        >
          <div
            className="
              mb-4
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.20em]
                  text-[#9A7630]
                "
              >
                Selected Template
              </p>

              <h3
                className="
                  mt-1
                  text-[18px]
                  font-bold
                  text-[#102A43]
                "
              >
                {selected.name}
              </h3>
            </div>

            <span
              className="
                rounded-full
                bg-white
                px-3
                py-1.5
                text-[9px]
                font-black
                uppercase
                tracking-[0.12em]
                text-[#607F90]
                shadow-sm
              "
            >
              {selected.tag}
            </span>
          </div>

          <div
            className="
              overflow-hidden
              rounded-[18px]
              border
              border-[#DED9D0]
              bg-white
              shadow-[0_10px_24px_rgba(15,42,67,0.07)]
            "
          >
            <TemplateFrame
              id={selected.id}
              scaleClass="scale-[0.48] sm:scale-[0.58] xl:scale-[0.52]"
              tall
            />
          </div>
        </div>
      </div>
    </section>
  );
};


/* ============================================================
   LANDING PAGE TEMPLATE SHOWCASE
   ============================================================ */

export const TemplateShowcase = () => {
  const navigate = useNavigate();

  const featuredTemplates = useMemo(() => {
    const preferred = [
      'ivy',
      'executive',
      'boardroom',
      'modern',
    ];

    const result = [];

    preferred.forEach((keyword) => {
      const match = templateOptions.find((template) => {
        const searchable =
          `${template.id} ${template.name} ${template.tag}`.toLowerCase();

        return searchable.includes(keyword);
      });

      if (
        match &&
        !result.some((item) => item.id === match.id)
      ) {
        result.push(match);
      }
    });

    templateOptions.forEach((template) => {
      if (
        result.length < 12 &&
        !result.some((item) => item.id === template.id)
      ) {
        result.push(template);
      }
    });

    return result.slice(0, 12);
  }, []);

  const defaultIndex = Math.max(
    0,
    featuredTemplates.findIndex((template) =>
      `${template.id} ${template.name}`
        .toLowerCase()
        .includes('executive')
    )
  );

  const [activeIndex, setActiveIndex] =
    useState(defaultIndex >= 0 ? defaultIndex : 0);

  const [windowStart, setWindowStart] =
    useState(0);

  const visibleTemplates = useMemo(
    () =>
      Array.from(
        {
          length: Math.min(
            4,
            featuredTemplates.length
          ),
        },
        (_, offset) => {
          const index =
            (windowStart + offset) %
            featuredTemplates.length;

          return {
            template:
              featuredTemplates[index],
            index,
          };
        }
      ),
    [featuredTemplates, windowStart]
  );

  const previous = () => {
    const nextStart =
      windowStart === 0
        ? featuredTemplates.length - 1
        : windowStart - 1;

    setWindowStart(nextStart);

    setActiveIndex(
      (nextStart + 1) %
        featuredTemplates.length
    );
  };

  const next = () => {
    const nextStart =
      (windowStart + 1) %
      featuredTemplates.length;

    setWindowStart(nextStart);

    setActiveIndex(
      (nextStart + 1) %
        featuredTemplates.length
    );
  };

  const openTemplateGallery = () => {
    navigate('/dashboard?view=templates');
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FBF7EF]
        py-14
        lg:py-16
      "
    >
      {/* =====================================================
          EDITORIAL BACKGROUND DETAILS
          ===================================================== */}

      {/* Top-left soft light */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[170px]
          -top-[180px]
          h-[520px]
          w-[520px]
          rounded-full
          bg-white/70
          blur-[95px]
        "
      />

      {/* Very subtle middle warmth */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[42%]
          top-[15%]
          h-[430px]
          w-[620px]
          rounded-full
          bg-[#F5E7CF]/28
          blur-[110px]
        "
      />

      {/* Top-right arcs */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[165px]
          -top-[270px]
          h-[520px]
          w-[520px]
          rounded-full
          border
          border-[#C89538]/80
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[105px]
          -top-[230px]
          h-[455px]
          w-[455px]
          rounded-full
          border
          border-[#E4D4B7]/65
        "
      />

      {/* Bottom-left arcs */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[350px]
          -left-[300px]
          h-[560px]
          w-[560px]
          rounded-full
          border
          border-[#C89538]/55
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[300px]
          -left-[245px]
          h-[475px]
          w-[475px]
          rounded-full
          border
          border-white/90
        "
      />

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1700px]
          px-5
          sm:px-8
          lg:px-10
          xl:px-14
        "
      >
        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[0.32fr_0.68fr]
            xl:gap-12
          "
        >
          {/* =================================================
              LEFT CONTENT
              ================================================= */}

          <div className="max-w-[510px]">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B17A21]" />

              <p
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.27em]
                  text-[#A56F1D]
                  sm:text-[11px]
                "
              >
                Professional Templates
              </p>
            </div>

            <h2
              className="
                max-w-[470px]
                font-serif
                text-[48px]
                font-semibold
                leading-[0.94]
                tracking-[-0.045em]
                text-[#102D47]
                sm:text-[54px]
                lg:text-[58px]
                xl:text-[42px]
              "
            >
              Executive-grade
              <br />
              templates.
            </h2>

            <p
              className="
                mt-6
                max-w-[470px]
                text-[15px]
                font-medium
                leading-[1.7]
                text-[#496A80]
                sm:text-[16px]
              "
            >
              Choose from{' '}
              <span className="font-bold text-[#264B64]">
                {templateOptions.length}+
              </span>{' '}
              executive-focused templates, created
              by career experts and optimized for
              today&apos;s top roles.
            </p>

            <button
              type="button"
              onClick={openTemplateGallery}
              className="
                group
                mt-7
                inline-flex
                h-[54px]
                min-w-[280px]
                items-center
                justify-between
                rounded-[10px]
                bg-[#0B304B]
                px-6
                text-[14px]
                font-extrabold
                text-white
                shadow-[0_12px_28px_rgba(11,48,75,0.16)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#08273D]
              "
            >
              Browse All Templates

              <ArrowRight
                size={18}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>

          {/* =================================================
              RIGHT CAROUSEL
              ================================================= */}

          <div className="relative min-w-0">
            {/* Previous */}
            <button
              type="button"
              onClick={previous}
              aria-label="Previous template"
              className="
                absolute
                -left-7
                top-[44%]
                z-30
                hidden
                h-[54px]
                w-[54px]
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#D6DFE4]
                bg-white/95
                text-[#173B56]
                shadow-[0_10px_28px_rgba(15,42,67,0.09)]
                backdrop-blur-md
                transition-all
                hover:scale-105
                hover:bg-white
                lg:flex
                xl:-left-9
              "
            >
              <ChevronLeft
                size={23}
                strokeWidth={1.8}
              />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              aria-label="Next template"
              className="
                absolute
                -right-7
                top-[44%]
                z-30
                hidden
                h-[54px]
                w-[54px]
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#D6DFE4]
                bg-white/95
                text-[#173B56]
                shadow-[0_10px_28px_rgba(15,42,67,0.09)]
                backdrop-blur-md
                transition-all
                hover:scale-105
                hover:bg-white
                lg:flex
                xl:-right-9
              "
            >
              <ChevronRight
                size={23}
                strokeWidth={1.8}
              />
            </button>

            {/* ===============================================
                DESKTOP
                =============================================== */}

            <div
              className="
                hidden
                items-start
                justify-center
                gap-4
                lg:flex
                xl:gap-5
              "
            >
              {visibleTemplates.map(
                ({ template, index }) => {
                  const active =
                    index === activeIndex;

                  return (
                    <LandingTemplateCard
                      key={template.id}
                      template={template}
                      active={active}
                      onClick={() => {
                        if (active) {
                          openTemplateGallery();
                          return;
                        }

                        setActiveIndex(index);
                      }}
                    />
                  );
                }
              )}
            </div>

            {/* ===============================================
                MOBILE
                =============================================== */}

            <div
              className="
                flex
                snap-x
                snap-mandatory
                gap-5
                overflow-x-auto
                pb-4
                lg:hidden
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {featuredTemplates.map(
                (template, index) => (
                  <LandingTemplateCard
                    key={template.id}
                    template={template}
                    active={
                      index === activeIndex
                    }
                    mobile
                    onClick={() =>
                      setActiveIndex(index)
                    }
                  />
                )
              )}
            </div>

            {/* ===============================================
                PAGINATION DOTS
                =============================================== */}

            <div
              className="
                mt-7
                hidden
                items-center
                justify-center
                gap-2
                lg:flex
              "
            >
              {Array.from({
                length: Math.min(
                  4,
                  featuredTemplates.length
                ),
              }).map((_, index) => (
                <span
                  key={index}
                  className={`
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      index === 0
                        ? `
                            h-[9px]
                            w-[9px]
                            bg-[#B27B20]
                          `
                        : `
                            h-[8px]
                            w-[8px]
                            bg-[#C7D0D5]
                          `
                    }
                  `}
                />
              ))}
            </div>

            {/* ===============================================
                MOBILE NAV
                =============================================== */}

            <div
              className="
                mt-5
                flex
                justify-center
                gap-3
                lg:hidden
              "
            >
              <button
                type="button"
                onClick={previous}
                aria-label="Previous template"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D6DFE4]
                  bg-white
                  text-[#173B56]
                  shadow-sm
                "
              >
                <ChevronLeft size={19} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next template"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D6DFE4]
                  bg-white
                  text-[#173B56]
                  shadow-sm
                "
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


/* ============================================================
   LANDING TEMPLATE CARD
   ============================================================ */

const LandingTemplateCard = ({
  template,
  active = false,
  mobile = false,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      group
      shrink-0
      snap-center
      text-left
      outline-none
      transition-all
      duration-300

      ${
        mobile
          ? 'w-[245px]'
          : 'w-[23%] min-w-[170px] max-w-[235px]'
      }

      ${
        active
          ? `
              relative
              z-20
            `
          : `
              relative
              z-10
              opacity-[0.97]
              hover:-translate-y-1
              hover:opacity-100
            `
      }
    `}
  >
    {/* document shell */}
    <div
      className={`
        relative
        overflow-hidden
        rounded-[4px]
        border
        bg-[#F8F4EC]
        p-[8px]
        transition-all
        duration-300

        ${
          active
            ? `
                border-[#DED4C4]
                shadow-[0_18px_38px_rgba(15,42,67,0.13)]
              `
            : `
                border-[#DEDCD6]
                shadow-[0_10px_26px_rgba(15,42,67,0.08)]
                group-hover:shadow-[0_16px_34px_rgba(15,42,67,0.12)]
              `
        }
      `}
    >
      {/* Inner paper */}
      <div
        className="
          overflow-hidden
          border
          border-[#ECE7DF]
          bg-white
          shadow-[0_4px_12px_rgba(15,42,67,0.05)]
        "
      >
        <LandingTemplatePreview
          id={template.id}
        />
      </div>
    </div>

    {/* title */}
    <div className="pt-4 text-center">
      <p
        className="
          truncate
          text-[10px]
          font-black
          uppercase
          tracking-[0.16em]
          text-[#607E90]
          transition-colors
          group-hover:text-[#173A54]
          sm:text-[11px]
        "
      >
        {template.name}
      </p>
    </div>
  </button>
);


/* ============================================================
   LANDING TEMPLATE PREVIEW
   ============================================================ */

const LandingTemplatePreview = ({
  id,
}) => (
  <div
    className="
      relative
      aspect-[210/297]
      w-full
      overflow-hidden
      bg-white
    "
  >
    <div
      className="
        pointer-events-none
        absolute
        left-1/2
        top-0
        w-[210mm]
        origin-top
        -translate-x-1/2

        scale-[0.29]
        sm:scale-[0.29]

        lg:scale-[0.18]
        xl:scale-[0.215]
        2xl:scale-[0.255]
      "
    >
      {renderTemplate(id)}
    </div>
  </div>
);


/* ============================================================
   FULL TEMPLATE LIBRARY PAGE
   ============================================================ */

export const TemplateLibraryPage = () => {
  const [
    previewId,
    setPreviewId,
  ] = useState(null);

  const [
    templateSearch,
    setTemplateSearch,
  ] = useState('');


  const previewTemplate =
    templateOptions.find(
      (template) =>
        template.id === previewId
    );


  const filteredTemplates =
    useMemo(() => {
      const query =
        templateSearch
          .trim()
          .toLowerCase();

      if (!query) {
        return templateOptions;
      }

      return templateOptions.filter(
        (template) =>
          [
            template.name,
            template.tag,
            template.id,
            getTemplateDescription(
              template
            ),
          ]
            .filter(Boolean)
            .some((value) =>
              value
                .toLowerCase()
                .includes(query)
            )
      );
    }, [templateSearch]);


  return (
    <section
      className="
        min-h-[calc(100vh-120px)]
        space-y-5
      "
    >
      {/* ================================================
          HERO / SEARCH
         ================================================ */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[26px]
          bg-[#0D2B42]
          p-6
          shadow-[0_18px_50px_rgba(15,42,67,0.14)]
          sm:p-7
          lg:p-8
        "
      >
        <DarkGrid />

        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-24
            h-[340px]
            w-[340px]
            rounded-full
            bg-[#66889B]
            opacity-20
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[-150px]
            left-[30%]
            h-[300px]
            w-[500px]
            rounded-full
            bg-[#D8A64D]
            opacity-[0.06]
            blur-[100px]
          "
        />


        <div className="relative">
          <div
            className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <div>
              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.24em]
                  text-[#E3B550]
                "
              >
                Template Library
              </p>

              <h2
                className="
                  cs-display
                  mt-2
                  max-w-[760px]
                  text-[30px]
                  font-medium
                  tracking-[-0.03em]
                  text-white
                  sm:text-[34px]
                "
              >
                Choose a cover letter
                design that feels like
                you.
              </h2>

              <p
                className="
                  mt-3
                  max-w-3xl
                  text-[12px]
                  leading-6
                  text-[#BED0D8]
                "
              >
                Browse all{' '}
                {templateOptions.length}{' '}
                professional,
                executive and
                specialist templates
                using realistic sample
                data before opening one
                in the builder.
              </p>
            </div>


            <div
              className="
                w-fit
                rounded-full
                border
                border-[#58758A]
                bg-[#183A51]
                px-4
                py-2
                text-[9px]
                font-black
                uppercase
                tracking-[0.17em]
                text-[#C9D8E0]
              "
            >
              {templateOptions.length}{' '}
              Layouts
            </div>
          </div>


          {/* Search */}
          <div
            className="
              mt-7
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div
              className="
                relative
                w-full
                sm:max-w-lg
              "
            >
              <Search
                size={16}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#6D8795]
                "
              />

              <input
                type="text"
                value={
                  templateSearch
                }
                onChange={(event) =>
                  setTemplateSearch(
                    event.target.value
                  )
                }
                placeholder="Search templates by name, category, or style"
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#D9E1E4]
                  bg-white
                  pl-11
                  pr-4
                  text-[12px]
                  font-medium
                  text-[#102A43]
                  outline-none
                  shadow-sm
                  transition
                  placeholder:text-[#98A8AF]
                  focus:border-[#D8A64D]
                  focus:ring-2
                  focus:ring-[#D8A64D]/20
                "
              />
            </div>


            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#B9CBD4]
              "
            >
              Showing{' '}
              {filteredTemplates.length}{' '}
              of{' '}
              {templateOptions.length}
            </p>
          </div>
        </div>
      </div>


      {/* ================================================
          NO RESULTS
         ================================================ */}

      {filteredTemplates.length ===
      0 ? (
        <div
          className="
            flex
            min-h-[330px]
            flex-col
            items-center
            justify-center
            rounded-[24px]
            border
            border-dashed
            border-[#D4DEE2]
            bg-white
            px-6
            text-center
            shadow-[0_10px_34px_rgba(15,42,67,0.05)]
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-[#EAF1F3]
              text-[#66889B]
            "
          >
            <Search size={20} />
          </div>

          <p
            className="
              mt-4
              text-[14px]
              font-bold
              text-[#102A43]
            "
          >
            No templates match that
            search.
          </p>

          <p
            className="
              mt-2
              text-[11px]
              text-[#778D98]
            "
          >
            Try terms like Executive,
            Ivy, ATS, Modern, Data or
            Creative.
          </p>
        </div>
      ) : (
        /* ================================================
           TEMPLATE GRID
           ================================================ */

        <div
          className="
            grid
            gap-5
            xl:grid-cols-2
            2xl:grid-cols-3
          "
        >
          {filteredTemplates.map(
            (
              template,
              index
            ) => (
              <article
                key={template.id}
                className="
                  group
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#E5E0D7]
                  bg-white
                  shadow-[0_8px_28px_rgba(15,42,67,0.06)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#D6E0E4]
                  hover:shadow-[0_16px_36px_rgba(15,42,67,0.10)]
                "
              >
                {/* Card Header */}
                <div
                  className="
                    flex
                    min-h-[112px]
                    items-start
                    justify-between
                    gap-4
                    border-b
                    border-[#EEEAE3]
                    px-5
                    py-5
                  "
                >
                  <div
                    className="
                      min-w-0
                    "
                  >
                    <p
                      className="
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.17em]
                        text-[#9A7630]
                      "
                    >
                      {template.tag ||
                        'Professional'}
                    </p>

                    <h3
                      className="
                        mt-2
                        text-[17px]
                        font-bold
                        tracking-[-0.015em]
                        text-[#102A43]
                      "
                    >
                      {template.name}
                    </h3>

                    <p
                      className="
                        mt-2
                        max-w-md
                        text-[11px]
                        font-medium
                        leading-5
                        text-[#758B97]
                      "
                    >
                      {getTemplateDescription(
                        template
                      )}
                    </p>
                  </div>


                  {index < 6 && (
                    <span
                      className="
                        shrink-0
                        rounded-full
                        bg-[#F5E8CB]
                        px-3
                        py-1.5
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.13em]
                        text-[#8C6726]
                      "
                    >
                      Top Pick
                    </span>
                  )}
                </div>


                {/* Preview */}
                <button
                  type="button"
                  onClick={() =>
                    setPreviewId(
                      template.id
                    )
                  }
                  className="
                    block
                    w-full
                    bg-[#F7F4EE]
                    p-5
                    text-left
                  "
                  aria-label={`Preview ${template.name}`}
                >
                  <div
                    className="
                      overflow-hidden
                      rounded-[16px]
                      border
                      border-[#DED9D0]
                      bg-white
                      shadow-[0_8px_22px_rgba(15,42,67,0.07)]
                      transition
                      group-hover:shadow-[0_12px_28px_rgba(15,42,67,0.10)]
                    "
                  >
                    <TemplateFrame
                      id={template.id}
                      scaleClass="scale-[0.42] sm:scale-[0.48] xl:scale-[0.4]"
                      library
                    />
                  </div>
                </button>


                {/* footer */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-t
                    border-[#EEEAE3]
                    bg-white
                    px-5
                    py-4
                  "
                >
                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-2
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.13em]
                      text-[#7C929D]
                    "
                  >
                    <span>
                      Cover Letter
                    </span>

                    <span className="text-[#C0C8CC]">
                      •
                    </span>

                    <span
                      className="
                        truncate
                      "
                    >
                      {template.tag}
                    </span>
                  </div>


                  <button
                    type="button"
                    onClick={() =>
                      setPreviewId(
                        template.id
                      )
                    }
                    className="
                      flex
                      h-9
                      items-center
                      gap-1.5
                      rounded-lg
                      bg-[#102A43]
                      px-3.5
                      text-[10px]
                      font-bold
                      text-white
                      transition
                      hover:bg-[#183B58]
                    "
                  >
                    Preview

                    <ArrowRight
                      size={12}
                    />
                  </button>
                </div>
              </article>
            )
          )}
        </div>
      )}


      {/* ================================================
          PREVIEW MODAL
         ================================================ */}

      {previewTemplate && (
        <div
          className="
            fixed
            inset-0
            z-[70]
            flex
            items-center
            justify-center
            bg-[#061A29]/90
            p-4
            backdrop-blur-md
          "
        >
          <div
            className="
              flex
              h-[92vh]
              w-full
              max-w-6xl
              flex-col
              overflow-hidden
              rounded-[24px]
              border
              border-[#355368]
              bg-[#F7F4EE]
              shadow-[0_30px_80px_rgba(0,0,0,0.38)]
            "
          >
            {/* modal header */}
            <div
              className="
                relative
                overflow-hidden
                bg-[#0D2B42]
                px-5
                py-4
              "
            >
              <DarkGrid />

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.20em]
                      text-[#E3B550]
                    "
                  >
                    Template Preview
                  </p>

                  <h3
                    className="
                      mt-1
                      text-[17px]
                      font-bold
                      text-white
                    "
                  >
                    {previewTemplate.name}
                  </h3>
                </div>


                <button
                  type="button"
                  onClick={() =>
                    setPreviewId(null)
                  }
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#4E6E82]
                    bg-[#17384F]
                    text-white
                    transition
                    hover:bg-[#22485F]
                  "
                  aria-label="Close preview"
                >
                  <X size={17} />
                </button>
              </div>
            </div>


            {/* preview body */}
            <div
              className="
                flex-1
                overflow-auto
                p-5
                sm:p-7
              "
            >
              <div
                className="
                  mx-auto
                  w-fit
                  origin-top
                  scale-[0.58]
                  sm:scale-[0.72]
                  lg:scale-[0.86]
                  xl:scale-100
                "
              >
                {renderTemplate(
                  previewTemplate.id
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


/* ============================================================
   TEMPLATE FRAME
   ============================================================ */

const TemplateFrame = ({
  id,
  scaleClass,
  tall = false,
  library = false,
  showcase = false,
}) => {
  let heightClass =
    'h-[260px] sm:h-[300px]';

  if (library) {
    heightClass =
      'h-[420px] sm:h-[520px]';
  } else if (showcase) {
    heightClass =
      'h-[390px] sm:h-[430px]';
  } else if (tall) {
    heightClass =
      'h-[520px] sm:h-[680px]';
  }


  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-[#F7F4EE]
        ${heightClass}
      `}
    >
      <div
        className={`
          pointer-events-none
          absolute
          left-1/2
          top-4
          w-[210mm]
          origin-top
          -translate-x-1/2
          ${scaleClass}
        `}
      >
        {renderTemplate(id)}
      </div>
    </div>
  );
};


/* ============================================================
   TEMPLATE RENDERER
   ============================================================ */

export const renderTemplate = (
  id,
  overrideProps = {}
) => {
  const props = {
    ...sampleProps,
    ...overrideProps,
  };


  switch (id) {
    case 'modern':
      return (
        <ModernTemplate
          {...props}
        />
      );

    case 'ivy':
      return (
        <IvyLeagueTemplate
          {...props}
        />
      );

    case 'executive':
      return (
        <ExecutiveTemplate
          {...props}
        />
      );

    case 'sidebar':
      return (
        <SidebarTemplate
          {...props}
        />
      );

    case 'minimalist':
      return (
        <MinimalistTemplate
          {...props}
        />
      );

    case 'classic':
      return (
        <ClassicTemplate
          {...props}
        />
      );

    case 'creative':
      return (
        <CreativeTemplate
          {...props}
        />
      );

    case 'modern-block':
      return (
        <ModernColorBlockTemplate
          {...props}
        />
      );

    case 'artistic':
      return (
        <ArtisticTemplate
          {...props}
        />
      );

    case 'timeline':
      return (
        <TimelineTemplate
          {...props}
        />
      );

    default:
      if (
        professionalTemplateIds.includes(
          id
        )
      ) {
        return (
          <ProfessionalTemplate
            {...props}
            variant={id}
          />
        );
      }

      return (
        <ModernTemplate
          {...props}
        />
      );
  }
};


export default TemplateGallery;
