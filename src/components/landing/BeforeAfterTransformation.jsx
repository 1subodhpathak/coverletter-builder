import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

import transformationBackground from '../../assets/transformation.png';


const Tag = ({ children, tone = 'muted' }) => (
  <span
    className={`
      inline-flex
      items-center
      rounded-full
      border
      px-2.5
      py-1
      text-[8px]
      font-black
      uppercase
      tracking-[0.12em]
      
      ${
        tone === 'positive'
          ? `
              border-[#C9DACF]
              bg-[#EDF5F0]
              text-[#39705F]
            `
          : `
              border-[#D9E0E4]
              bg-[#F1F4F5]
              text-[#788B97]
            `
      }
    `}
  >
    {children}
  </span>
);


const BeforeAfterTransformation = () => {
  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-[#FBF7EF]
      "
      aria-labelledby="transformation-title"
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <img
        src={transformationBackground}
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

      {/* Light wash to ensure the text/cards stay clean */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-white/[0.08]
        "
      />


      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1650px]
          px-5
          py-10
          sm:px-8
          lg:px-12
          lg:py-12
          xl:px-16
        "
      >
        <div
          className="
            grid
            items-center
            gap-8
            lg:grid-cols-[0.34fr_0.66fr]
            xl:gap-12
          "
        >
          {/* =================================================
              LEFT INTRO
              ================================================= */}

          <div className="max-w-[455px]">

            {/* Eyebrow */}
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-[#B37A20]
                "
              />

              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.29em]
                  text-[#A7711C]
                "
              >
                From Generic To Compelling
              </p>
            </div>


            {/* Heading */}
            <h2
              id="transformation-title"
              className="
                mt-5
                max-w-[430px]
                font-serif
                text-[42px]
                font-semibold
                leading-[0.95]
                tracking-[-0.045em]
                text-[#102D47]
                sm:text-[46px]
                lg:text-[50px]
              "
            >
              See what great
              <br />
              looks like
              <span className="text-[#B67C20]">
                .
              </span>
            </h2>


            {/* Description */}
            <p
              className="
                mt-5
                max-w-[410px]
                text-[14px]
                font-medium
                leading-[1.65]
                text-[#547488]
              "
            >
              A stronger cover letter is not about
              adding more words. It is about making
              every sentence specific, relevant,
              and credible.
            </p>


            {/* Simple transformation cue */}
            <div
              className="
                mt-7
                hidden
                items-center
                gap-3
                lg:flex
              "
            >
              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-[#8299A7]
                "
              >
                Generic
              </span>

              <span
                className="
                  h-px
                  w-10
                  bg-[#D0C3AF]
                "
              />

              <ArrowRight
                size={14}
                className="text-[#B67C20]"
              />

              <span
                className="
                  h-px
                  w-10
                  bg-[#D0C3AF]
                "
              />

              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-[#A7711C]
                "
              >
                Executive Ready
              </span>
            </div>
          </div>


          {/* =================================================
              BEFORE / AFTER
              ================================================= */}

          <div
            className="
              relative
              grid
              gap-4
              md:grid-cols-2
              xl:gap-5
            "
          >
            {/* =================================================
                BEFORE
                ================================================= */}

            <article
              className="
                relative
                flex
                min-h-[290px]
                flex-col
                rounded-[15px]
                border
                border-[#D9E0E4]
                bg-white/88
                p-5
                shadow-[0_12px_32px_rgba(20,45,63,0.06)]
                backdrop-blur-[4px]
                sm:p-6
              "
            >
              {/* Header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  border-b
                  border-[#E4E8EA]
                  pb-4
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-[#899BA6]
                    "
                  >
                    Original Draft
                  </p>

                  <h3
                    className="
                      mt-1
                      font-serif
                      text-[23px]
                      font-semibold
                      tracking-[-0.025em]
                      text-[#17364D]
                    "
                  >
                    Before
                  </h3>
                </div>

                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#DCE3E6]
                    bg-[#F5F6F6]
                    text-[10px]
                    font-black
                    text-[#80939E]
                  "
                >
                  01
                </span>
              </div>


              {/* Text */}
              <p
                className="
                  mt-5
                  text-[13.5px]
                  font-medium
                  leading-[1.7]
                  text-[#718692]
                "
              >
                I am writing to express my interest
                in the Chief Executive Officer position.
                I believe my experience and leadership
                skills make me a good fit for this role.
                I am excited about the opportunity to
                contribute to your organization.
              </p>


              {/* tags */}
              <div
                className="
                  mt-auto
                  flex
                  flex-wrap
                  gap-2
                  pt-5
                "
              >
                <Tag>
                  Generic
                </Tag>

                <Tag>
                  Vague
                </Tag>

                <Tag>
                  Common
                </Tag>
              </div>
            </article>


            {/* =================================================
                AFTER
                ================================================= */}

            <article
              className="
                relative
                flex
                min-h-[290px]
                flex-col
                overflow-hidden
                rounded-[15px]
                border
                border-[#D9C69D]
                bg-[#FFFCF7]/94
                p-5
                shadow-[0_16px_38px_rgba(83,63,31,0.08)]
                backdrop-blur-[4px]
                sm:p-6
              "
            >
              {/* subtle gold top line */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-[2px]
                  bg-[linear-gradient(
                    90deg,
                    transparent,
                    #C8983E,
                    transparent
                  )]
                "
              />


              {/* Header */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-3
                  border-b
                  border-[#E9E0D1]
                  pb-4
                "
              >
                <div>
                  <p
                    className="
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-[#B27A20]
                    "
                  >
                    CareerSense Rewrite
                  </p>

                  <h3
                    className="
                      mt-1
                      font-serif
                      text-[23px]
                      font-semibold
                      tracking-[-0.025em]
                      text-[#17364D]
                    "
                  >
                    After
                  </h3>
                </div>


                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-[#D9A646]
                    text-white
                    shadow-[0_4px_12px_rgba(180,124,32,.18)]
                  "
                >
                  <Check
                    size={15}
                    strokeWidth={2.4}
                  />
                </span>
              </div>


              {/* Text */}
              <p
                className="
                  mt-5
                  text-[13.5px]
                  font-medium
                  leading-[1.7]
                  text-[#3D6075]
                "
              >
                I am excited to bring my track record of{' '}

                <mark
                  className="
                    rounded-[3px]
                    bg-[#F2D99C]/65
                    px-1
                    py-0.5
                    font-bold
                    text-[#183A51]
                  "
                >
                  scaling high-growth organizations
                  and delivering measurable results
                </mark>{' '}

                to Global Nexus Holdings. My experience
                leading complex transformations aligns
                directly with your mission to drive
                sustainable, long-term value.
              </p>


              {/* tags */}
              <div
                className="
                  mt-auto
                  flex
                  flex-wrap
                  gap-2
                  pt-5
                "
              >
                <Tag tone="positive">
                  Specific
                </Tag>

                <Tag tone="positive">
                  Strategic
                </Tag>

                <Tag tone="positive">
                  Executive-ready
                </Tag>
              </div>
            </article>


            {/* =================================================
                CENTER TRANSFORMATION INDICATOR
                ================================================= */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-1/2
                z-20
                hidden
                h-[42px]
                w-[42px]
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[#D7C398]
                bg-[#FFF9EF]
                text-[#A9701D]
                shadow-[0_7px_18px_rgba(74,61,40,.10)]
                md:flex
              "
            >
              <ArrowRight
                size={17}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default BeforeAfterTransformation;
