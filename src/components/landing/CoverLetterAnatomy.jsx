import React, { useState } from 'react';

import anatomyBackground from '../../assets/anatomy.png';


/* ============================================================
   CEO COVER LETTER ANATOMY
   ============================================================ */

const CEOCoverLetterAnatomy = () => {
  const [activePoint, setActivePoint] = useState(null);


  /* ==========================================================
     ANNOTATION CONTENT
     ========================================================== */

  const points = [
    {
      id: 1,
      title: 'Executive Branding',
      content:
        'Position yourself as a Chief Executive immediately. Include a link to your executive portfolio or a summary of your board-level experience.',
    },
    {
      id: 2,
      title: 'Strategic Salutation',
      content:
        'Address the Chairperson of the Board or the Head of the Search Committee. CEOs are hired by boards; speak to them directly.',
    },
    {
      id: 3,
      title: 'The Value Proposition',
      content:
        'Lead with high-level impact: EBITDA growth, market expansion, or successful exits. Define your leadership philosophy in one sentence.',
    },
    {
      id: 4,
      title: 'The Strategic Pillar',
      content:
        'Focus on organizational transformation and P&L mastery. Show how you align culture with commercial objectives to drive shareholder value.',
    },
    {
      id: 5,
      title: 'The Executive Mandate',
      content:
        'Briefly mention how your vision solves their specific "Pain Point"—be it scaling, a turnaround, or an IPO.',
    },
    {
      id: 6,
      title: 'Formal Sign-off',
      content:
        'Use professional closings like "Sincerely" or "With respect." CEOs maintain a balance of authority and professional courtesy.',
    },
  ];


  /* ==========================================================
     INTERACTION
     ========================================================== */

  const activatePoint = (id) => {
    setActivePoint(id);
  };

  const deactivatePoint = () => {
    setActivePoint(null);
  };


  /* ==========================================================
     LETTER SECTION HIGHLIGHT
     ========================================================== */

  const getHighlightClass = (id) => {
    if (activePoint === id) {
      return `
        relative
        z-10
        rounded-[5px]
        bg-[#F8F2E8]
        px-2
        -mx-2
        ring-1
        ring-[#D6B06A]/35
        shadow-[0_5px_16px_rgba(18,45,67,0.055)]
        transition-all
        duration-300
      `;
    }

    if (
      activePoint !== null &&
      activePoint !== id
    ) {
      return `
        opacity-[0.34]
        blur-[0.25px]
        transition-all
        duration-300
      `;
    }

    return `
      transition-all
      duration-300
    `;
  };


  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-[#FBF7EF]
        py-10
        sm:py-12
        lg:py-12
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
          ===================================================== */}

      <img
        src={anatomyBackground}
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
      />

      {/* very light wash */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-white/[0.02]
        "
      />


      {/* =====================================================
          CONTENT WRAPPER
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1580px]
          px-5
          sm:px-8
          lg:px-10
          xl:px-12
        "
      >

        {/* ===================================================
            HEADER
            =================================================== */}

        <header
          className="
            mx-auto
            mb-9
            max-w-[900px]
            text-center
            lg:mb-10
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              className="
                hidden
                h-px
                w-[48px]
                bg-[#B67B1C]
                sm:block
              "
            />

            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.30em]
                text-[#A86F18]
                sm:text-[11px]
              "
            >
              C-Suite Standards
            </p>

            <span
              className="
                hidden
                h-px
                w-[48px]
                bg-[#B67B1C]
                sm:block
              "
            />
          </div>


          <h2
            className="
              mt-4
              font-serif
              text-[36px]
              font-semibold
              leading-[1]
              tracking-[-0.04em]
              text-[#102D47]
              sm:text-[42px]
              lg:text-[38px]
            "
          >
            Anatomy of a CEO Cover Letter
          </h2>


          <p
            className="
              mt-4
              text-[14px]
              font-medium
              italic
              leading-6
              text-[#52738A]
              sm:text-[15px]
            "
          >
            Executive search committees look for vision,
            fiscal discipline, and cultural stewardship.
          </p>
        </header>


        {/* ===================================================
            DESKTOP ANATOMY
            =================================================== */}

        <div
          className="
            relative
            mx-auto
            hidden
            h-[760px]
            w-full
            max-w-[1450px]
            lg:block
          "
        >

          {/* =================================================
              CENTRAL LETTER
              ================================================= */}

          <div
            className="
              absolute
              left-1/2
              top-0
              z-20
              h-[740px]
              w-[550px]
              -translate-x-1/2
              border
              border-[#DEDAD2]
              border-t-[9px]
              border-t-[#102D47]
              bg-white
              px-[52px]
              py-[40px]
              font-serif
              text-[10px]
              leading-[1.43]
              text-[#23384B]
              shadow-[0_24px_55px_rgba(34,40,44,0.12)]
              xl:w-[575px]
              xl:px-[56px]
            "
          >

            {/* ===============================================
                01 EXECUTIVE BRANDING
                =============================================== */}

            <div
              className={`
                flex
                items-end
                justify-between
                gap-5
                border-b
                border-[#DBE2E6]
                pb-5

                ${getHighlightClass(1)}
              `}
              onMouseEnter={() =>
                activatePoint(1)
              }
              onMouseLeave={
                deactivatePoint
              }
            >
              <div>
                <h3
                  className="
                    text-[22px]
                    font-bold
                    leading-none
                    tracking-[-0.03em]
                    text-[#102D47]
                  "
                >
                  Jordan T. Sterling
                </h3>

                <p
                  className="
                    mt-2
                    font-sans
                    text-[7.5px]
                    font-black
                    uppercase
                    leading-[1.45]
                    tracking-[0.15em]
                    text-[#527790]
                  "
                >
                  Chief Executive Officer · Strategic
                  <br />
                  Transformation
                </p>
              </div>


              <div
                className="
                  text-right
                  font-sans
                  text-[6.8px]
                  font-medium
                  uppercase
                  leading-[1.45]
                  text-[#7792A4]
                "
              >
                <p>
                  j.sterling@executive.com
                </p>

                <p>
                  linkedin.com/in/jsterling
                </p>

                <p>
                  London, UK
                </p>
              </div>
            </div>


            {/* ===============================================
                02 STRATEGIC SALUTATION
                =============================================== */}

            <div
              className={`
                mt-6
                font-sans

                ${getHighlightClass(2)}
              `}
              onMouseEnter={() =>
                activatePoint(2)
              }
              onMouseLeave={
                deactivatePoint
              }
            >
              <p
                className="
                  text-[7.5px]
                  font-medium
                  text-[#6F8899]
                "
              >
                May 14, 2026
              </p>


              <div
                className="
                  mt-4
                  text-[8.4px]
                  leading-[1.4]
                "
              >
                <p className="font-bold">
                  Dr. Helena Vance
                </p>

                <p>
                  Chair of the Board
                </p>

                <p>
                  Global Nexus Holdings
                </p>
              </div>


              <p
                className="
                  mt-5
                  text-[9px]
                  font-bold
                  text-[#102D47]
                "
              >
                Dear Dr. Vance and Members of the Board,
              </p>
            </div>


            {/* ===============================================
                03 VALUE PROPOSITION
                =============================================== */}

            <div
              className={`
                mt-6
                text-justify

                ${getHighlightClass(3)}
              `}
              onMouseEnter={() =>
                activatePoint(3)
              }
              onMouseLeave={
                deactivatePoint
              }
            >
              <p>
                Global Nexus Holdings is at a pivotal
                inflection point. As your organization
                moves to decentralize its operations,
                the need for a Chief Executive who can
                balance{' '}

                <strong>
                  fiscal rigor with aggressive innovation
                </strong>{' '}

                has never been greater. Over the last
                decade, I have specialized in scaling
                mid-cap firms into billion-dollar market
                leaders, consistently delivering{' '}

                <strong>
                  average EBITDA improvements of 22%
                </strong>{' '}

                within my first 24 months of tenure.
              </p>
            </div>


            {/* ===============================================
                04 STRATEGIC PILLAR
                =============================================== */}

            <div
              className={`
                mt-5
                text-justify

                ${getHighlightClass(4)}
              `}
              onMouseEnter={() =>
                activatePoint(4)
              }
              onMouseLeave={
                deactivatePoint
              }
            >
              <p>
                During my tenure at Horizon Capstone,
                I orchestrated a complex turnaround
                that involved restructuring{' '}

                <strong>
                  $400M in assets
                </strong>{' '}

                and pivoting the core business model
                toward a high-margin digital ecosystem.
                This strategic shift not only saved
                1,200 jobs but resulted in a 3.5x
                valuation increase prior to our
                successful IPO in 2024.
              </p>


              <p className="mt-3">
                My leadership is built on the principle
                of{' '}

                <strong>
                  radical transparency
                </strong>
                . By aligning the executive suite
                with the Board&apos;s long-term vision,
                I ensure that every operational
                decision serves the ultimate goal
                of sustainable shareholder value.
              </p>
            </div>


            {/* ===============================================
                05 EXECUTIVE MANDATE
                =============================================== */}

            <div
              className={`
                mt-5
                text-justify

                ${getHighlightClass(5)}
              `}
              onMouseEnter={() =>
                activatePoint(5)
              }
              onMouseLeave={
                deactivatePoint
              }
            >
              <p>
                I am drawn to Nexus because of your
                commitment to ESG-driven growth.
                I am eager to discuss how my experience
                in international market penetration
                can facilitate your upcoming expansion
                into the Southeast Asian markets.
              </p>
            </div>


            {/* ===============================================
                06 SIGN OFF
                =============================================== */}

            <div
              className={`
                mt-6

                ${getHighlightClass(6)}
              `}
              onMouseEnter={() =>
                activatePoint(6)
              }
              onMouseLeave={
                deactivatePoint
              }
            >
              <p>
                Sincerely,
              </p>

              <div
                className="
                  mt-5
                  w-[110px]
                  border-t
                  border-[#526977]
                  pt-2
                "
              >
                <p
                  className="
                    font-bold
                    text-[#102D47]
                  "
                >
                  Jordan T. Sterling
                </p>
              </div>
            </div>
          </div>


          {/* =================================================
              ANNOTATIONS

              The TOP value is shared by:
              card + connector + marker.
              ================================================= */}

          <AnatomyCallout
            point={points[0]}
            side="left"
            top="11%"
            activePoint={activePoint}
            onEnter={() =>
              activatePoint(1)
            }
            onLeave={
              deactivatePoint
            }
          />

          <AnatomyCallout
            point={points[1]}
            side="left"
            top="29%"
            activePoint={activePoint}
            onEnter={() =>
              activatePoint(2)
            }
            onLeave={
              deactivatePoint
            }
          />

          <AnatomyCallout
            point={points[2]}
            side="left"
            top="43%"
            activePoint={activePoint}
            onEnter={() =>
              activatePoint(3)
            }
            onLeave={
              deactivatePoint
            }
          />

          <AnatomyCallout
            point={points[3]}
            side="right"
            top="57%"
            activePoint={activePoint}
            onEnter={() =>
              activatePoint(4)
            }
            onLeave={
              deactivatePoint
            }
          />

          <AnatomyCallout
            point={points[4]}
            side="right"
            top="75%"
            activePoint={activePoint}
            onEnter={() =>
              activatePoint(5)
            }
            onLeave={
              deactivatePoint
            }
          />

          <AnatomyCallout
            point={points[5]}
            side="right"
            top="90%"
            activePoint={activePoint}
            onEnter={() =>
              activatePoint(6)
            }
            onLeave={
              deactivatePoint
            }
          />
        </div>


        {/* ===================================================
            MOBILE / TABLET
            =================================================== */}

        <div className="lg:hidden">

          {/* Letter */}
          <div
            className="
              relative
              mx-auto
              max-w-[620px]
              border
              border-[#E3E0DA]
              border-t-[7px]
              border-t-[#102D47]
              bg-white
              p-7
              font-serif
              text-[11px]
              leading-[1.55]
              text-[#23384B]
              shadow-[0_20px_45px_rgba(32,40,46,0.12)]
              sm:p-9
            "
          >
            <div
              className={`
                border-b
                border-[#DDE3E6]
                pb-5

                ${getHighlightClass(1)}
              `}
            >
              <h3
                className="
                  text-[22px]
                  font-bold
                  text-[#102D47]
                "
              >
                Jordan T. Sterling
              </h3>

              <p
                className="
                  mt-2
                  font-sans
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.13em]
                  text-[#557A91]
                "
              >
                Chief Executive Officer · Strategic Transformation
              </p>
            </div>


            <div
              className={`
                mt-6

                ${getHighlightClass(2)}
              `}
            >
              <p className="text-[#668397]">
                May 14, 2026
              </p>

              <div className="mt-4 font-sans">
                <p className="font-bold">
                  Dr. Helena Vance
                </p>

                <p>
                  Chair of the Board
                </p>

                <p>
                  Global Nexus Holdings
                </p>
              </div>

              <p className="mt-5 font-bold">
                Dear Dr. Vance and Members of the Board,
              </p>
            </div>


            <div
              className={`
                mt-5

                ${getHighlightClass(3)}
              `}
            >
              <p>
                Global Nexus Holdings is at a pivotal
                inflection point. As your organization
                moves to decentralize its operations,
                the need for a Chief Executive who can
                balance{' '}

                <strong>
                  fiscal rigor with aggressive innovation
                </strong>{' '}

                has never been greater.
              </p>
            </div>


            <div
              className={`
                mt-4

                ${getHighlightClass(4)}
              `}
            >
              <p>
                During my tenure at Horizon Capstone,
                I orchestrated a complex turnaround
                involving{' '}

                <strong>
                  $400M in assets
                </strong>{' '}

                while aligning operational performance
                with long-term shareholder value.
              </p>

              <p className="mt-3">
                My leadership is built on{' '}

                <strong>
                  radical transparency
                </strong>

                and disciplined execution.
              </p>
            </div>


            <div
              className={`
                mt-4

                ${getHighlightClass(5)}
              `}
            >
              <p>
                I am drawn to Nexus because of your
                commitment to ESG-driven growth and
                would welcome the opportunity to
                discuss the mandate ahead.
              </p>
            </div>


            <div
              className={`
                mt-6

                ${getHighlightClass(6)}
              `}
            >
              <p>
                Sincerely,
              </p>

              <p className="mt-4 font-bold">
                Jordan T. Sterling
              </p>
            </div>
          </div>


          {/* Mobile annotation cards */}
          <div
            className="
              mx-auto
              mt-7
              grid
              max-w-[780px]
              gap-3
              sm:grid-cols-2
            "
          >
            {points.map((point) => {
              const active =
                activePoint === point.id;

              return (
                <button
                  key={point.id}
                  type="button"
                  onMouseEnter={() =>
                    activatePoint(point.id)
                  }
                  onMouseLeave={
                    deactivatePoint
                  }
                  onClick={() =>
                    setActivePoint(
                      active
                        ? null
                        : point.id
                    )
                  }
                  className={`
                    rounded-[13px]
                    border
                    p-4
                    text-left
                    transition-all
                    duration-300

                    ${
                      active
                        ? `
                            border-[#C89335]
                            bg-[#FFF9EF]
                            shadow-[0_10px_25px_rgba(15,42,67,0.08)]
                          `
                        : `
                            border-[#E1D9CC]
                            bg-white/85
                          `
                    }
                  `}
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <span
                      className="
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#B77D1D]
                        text-[10px]
                        font-black
                        text-white
                      "
                    >
                      {point.id}
                    </span>

                    <h4
                      className="
                        font-serif
                        text-[16px]
                        font-bold
                        text-[#102D47]
                      "
                    >
                      {point.title}
                    </h4>
                  </div>

                  <p
                    className="
                      mt-3
                      text-[11px]
                      font-medium
                      leading-5
                      text-[#56778C]
                    "
                  >
                    {point.content}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};


/* ============================================================
   ANATOMY CALLOUT

   Card + line + numbered marker are ONE component,
   therefore they always align perfectly.
   ============================================================ */

const AnatomyCallout = ({
  point,
  side,
  top,
  activePoint,
  onEnter,
  onLeave,
}) => {
  const active =
    activePoint === point.id;

  const isLeft =
    side === 'left';


  return (
    <div
      style={{ top }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`
        absolute
        z-30
        -translate-y-1/2

        ${
          isLeft
            ? `
                left-[1%]
                xl:left-[2%]
              `
            : `
                right-[1%]
                xl:right-[2%]
              `
        }
      `}
    >
      {/* =====================================================
          CARD
          ===================================================== */}

      <div
        className={`
          relative
          w-[285px]
          rounded-[12px]
          border
          bg-white/88
          px-5
          py-4
          backdrop-blur-[3px]
          transition-all
          duration-300
          xl:w-[305px]

          ${
            active
              ? `
                  -translate-y-[2px]
                  border-[#C8973E]
                  shadow-[0_16px_34px_rgba(44,43,39,0.12)]
                `
              : `
                  border-[#DDD5C9]
                  shadow-[0_7px_20px_rgba(44,43,39,0.065)]
                `
          }
        `}
      >
        <h4
          className="
            font-serif
            text-[17px]
            font-bold
            leading-tight
            tracking-[-0.02em]
            text-[#102D47]
          "
        >
          {point.title}
        </h4>

        <p
          className="
            mt-2
            text-[11px]
            font-medium
            leading-[1.55]
            text-[#52738A]
          "
        >
          {point.content}
        </p>
      </div>


      {/* =====================================================
          CONNECTOR

          Extends exactly from card toward the document.
          ===================================================== */}

      <div
        aria-hidden="true"
        className={`
          absolute
          top-1/2
          h-px
          -translate-y-1/2
          bg-[#B87D1D]

          ${
            isLeft
              ? `
                  left-full
                  w-[128px]
                `
              : `
                  right-full
                  w-[128px]
                `
          }

          xl:w-[148px]
        `}
      />


      {/* small dot on card */}
      <span
        aria-hidden="true"
        className={`
          absolute
          top-1/2
          h-[5px]
          w-[5px]
          -translate-y-1/2
          rounded-full
          bg-[#B87D1D]

          ${
            isLeft
              ? `
                  -right-[2px]
                `
              : `
                  -left-[2px]
                `
          }
        `}
      />


      {/* =====================================================
          NUMBER MARKER

          This is intentionally positioned at the END of the
          connector, directly beside the letter.
          ===================================================== */}

      <button
        type="button"
        aria-label={`Highlight ${point.title}`}
        className={`
          absolute
          top-1/2
          z-40
          flex
          h-[27px]
          w-[27px]
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          text-[10px]
          font-black
          text-white
          transition-all
          duration-300

          ${
            isLeft
              ? `
                  left-[calc(100%+114px)]
                  xl:left-[calc(100%+134px)]
                `
              : `
                  right-[calc(100%+114px)]
                  xl:right-[calc(100%+134px)]
                `
          }

          ${
            active
              ? `
                  scale-110
                  bg-[#102D47]
                  shadow-[0_6px_16px_rgba(16,45,71,0.28)]
                  ring-4
                  ring-[#102D47]/10
                `
              : `
                  bg-[#B77D1D]
                  shadow-[0_5px_12px_rgba(183,125,30,0.22)]
                `
          }
        `}
      >
        {point.id}
      </button>
    </div>
  );
};


export default CEOCoverLetterAnatomy;
