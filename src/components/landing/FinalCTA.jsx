import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';


const benefits = [
  'Executive templates',
  'AI resume analysis',
  'A4 PDF preview',
  'Boardroom-ready language',
];


const FinalCTA = () => {
  const navigate = useNavigate();

  const resetBuilder =
    useStore((state) => state.resetBuilder);


  const openBuilderStart = () => {
    resetBuilder();
    navigate('/builder');
  };


  return (
    <section
      id="final-cta"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#FBF7EF]
      "
    >
      {/* =====================================================
          BACKGROUND / TEXTURE
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(
            135deg,
            rgba(255,255,255,.70)_0%,
            rgba(251,247,239,.88)_38%,
            rgba(248,241,230,.72)_100%
          )]
        "
      />

      {/* soft diagonal light */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-[160px]
          top-[40%]
          h-[240px]
          w-[620px]
          -rotate-[14deg]
          bg-white/30
          blur-[55px]
        "
      />

      {/* top right gold arcs */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[145px]
          -top-[260px]
          h-[410px]
          w-[410px]
          rounded-full
          border
          border-[#C58D2C]/75
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[105px]
          -top-[220px]
          h-[340px]
          w-[340px]
          rounded-full
          border
          border-[#E3D4B9]/65
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
          lg:py-11
          xl:px-16
        "
      >
        <div
          className="
            grid
            items-center
            gap-8
            lg:grid-cols-[1fr_1px_420px]
            xl:grid-cols-[1fr_1px_460px]
            xl:gap-10
          "
        >
          {/* =================================================
              LEFT
              ================================================= */}

          <div>
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
                  bg-[#B67B1C]
                "
              />

              <p
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.30em]
                  text-[#A86F18]
                  sm:text-[10px]
                "
              >
                Ready When You Are
              </p>
            </div>


            {/* Heading */}
            <h2
              className="
                mt-5
                max-w-[790px]
                font-serif
                text-[26px]
                font-semibold
                leading-[0.98]
                tracking-[-0.04em]
                text-[#102D47]
                sm:text-[40px]
                lg:text-[44px]
                xl:text-[38px]
              "
            >
              Build the executive letter
              <br className="hidden sm:block" />
              {' '}
              that opens doors.
            </h2>


            {/* Description */}
            <p
              className="
                mt-4
                max-w-[820px]
                text-[14px]
                font-medium
                leading-[1.65]
                text-[#52738A]
                sm:text-[15px]
              "
            >
              Start manually for free, or let Grow
              turn your resume and target role into
              a sharp, credible executive draft.
            </p>


            {/* ===============================================
                BENEFITS
                =============================================== */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                gap-x-7
                gap-y-3
                xl:gap-x-9
              "
            >
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="
                    flex
                    items-center
                    gap-2.5
                    text-[12px]
                    font-semibold
                    text-[#45677D]
                  "
                >
                  <span
                    className="
                      flex
                      h-[28px]
                      w-[28px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[linear-gradient(145deg,#D9A946,#C68B28)]
                      text-white
                      shadow-[0_5px_12px_rgba(183,125,29,.16)]
                    "
                  >
                    <CheckCircle2
                      size={15}
                      strokeWidth={2.3}
                    />
                  </span>

                  {benefit}
                </div>
              ))}
            </div>
          </div>


          {/* =================================================
              DIVIDER
              ================================================= */}

          <div
            aria-hidden="true"
            className="
              hidden
              h-[205px]
              w-px
              bg-[#DDD2C2]
              lg:block
            "
          />


          {/* =================================================
              CTA BUTTONS
              ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-3
            "
          >
            {/* Primary */}
            <button
              type="button"
              onClick={openBuilderStart}
              className="
                group
                flex
                h-[72px]
                w-full
                items-center
                justify-between
                rounded-[12px]
                bg-[linear-gradient(110deg,#0B304B,#183F5C)]
                px-6
                text-left
                text-[16px]
                font-extrabold
                text-white
                shadow-[0_14px_30px_rgba(11,48,75,.18)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_18px_36px_rgba(11,48,75,.23)]
              "
            >
              <span>
                Create a cover letter
              </span>

              <ArrowRight
                size={20}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>


            {/* Secondary */}
            <button
              type="button"
              onClick={() =>
                navigate('/dashboard')
              }
              className="
                group
                flex
                h-[72px]
                w-full
                items-center
                justify-between
                rounded-[12px]
                border
                border-[#D9C8AB]
                bg-white/72
                px-6
                text-left
                font-serif
                text-[17px]
                font-semibold
                text-[#15364F]
                shadow-[0_7px_20px_rgba(47,52,49,.055)]
                backdrop-blur-[3px]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-[#C9AD7B]
                hover:bg-white
              "
            >
              <span>
                Open dashboard
              </span>

              <ArrowRight
                size={20}
                strokeWidth={1.8}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


export default FinalCTA;
