import React from 'react';

const MicrosoftMark = () => (
  <span
    className="grid h-[30px] w-[30px] shrink-0 grid-cols-2 gap-[2px]"
    aria-hidden="true"
  >
    {Array.from({ length: 4 }).map((_, index) => (
      <span key={index} className="bg-current" />
    ))}
  </span>
);

const BainMark = () => (
  <span
    className="
      flex h-[42px] w-[42px]
      shrink-0
      items-center justify-center
      rounded-full
      border-[3px] border-current
    "
    aria-hidden="true"
  >
    <span
      className="
        ml-[2px]
        h-0 w-0
        border-b-[7px]
        border-l-[10px]
        border-t-[7px]
        border-b-transparent
        border-l-current
        border-t-transparent
      "
    />
  </span>
);

const companies = [
  {
    name: 'Google',
    className:
      'text-[27px] font-medium tracking-[-0.055em] sm:text-[29px]',
  },
  {
    name: 'Microsoft',
    mark: <MicrosoftMark />,
    className:
      'text-[23px] font-medium tracking-[-0.045em] sm:text-[25px]',
  },
  {
    name: 'McKinsey\n& Company',
    className:
      'whitespace-pre-line font-serif text-[20px] font-semibold leading-[0.82] tracking-[-0.045em] sm:text-[22px]',
  },
  {
    name: 'Goldman\nSachs',
    className:
      'whitespace-pre-line font-serif text-[21px] font-semibold leading-[0.8] tracking-[-0.05em] sm:text-[23px]',
  },
  {
    name: 'amazon',
    className:
      'text-[28px] font-bold tracking-[-0.06em] sm:text-[31px]',
  },
  {
    name: 'Bain & Company',
    markAfter: <BainMark />,
    className:
      'text-[15px] font-bold tracking-[-0.045em] sm:text-[16px]',
  },
  {
    name: 'BOSTON\nCONSULTING\nGROUP',
    className:
      'whitespace-pre-line text-[14px] font-black leading-[0.8] tracking-[-0.03em] sm:text-[15px]',
  },
];

const TrustedCompanies = () => {
  return (
    <section
      className="
        relative z-10
        overflow-hidden
        bg-[#FBF8F2]
      "
      aria-labelledby="trusted-companies-title"
    >
      {/* ---------------------------------------------------------
          SUBTLE BACKGROUND DETAIL

          No image is needed here.
          Keep this section intentionally calm.
          --------------------------------------------------------- */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-[90px] -top-[120px]
          h-[310px] w-[310px]
          rounded-full
          bg-[#DDE5D7]/25
          blur-[80px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-[120px] top-[-100px]
          h-[320px] w-[320px]
          rounded-full
          border border-[#DCD5C9]/30
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-[165px] top-[-55px]
          h-[360px] w-[360px]
          rounded-full
          border border-[#E7E0D6]/35
        "
      />

      <div
        className="
          relative mx-auto
          w-full max-w-[1680px]
          px-5
          py-10
          sm:px-8
          sm:py-11
          lg:px-12
          lg:py-12
          xl:px-16
        "
      >
        {/* -------------------------------------------------------
            SECTION TITLE
            ------------------------------------------------------- */}

        <div className="flex items-center justify-center gap-4 sm:gap-7">
          <span
            className="
              hidden h-px w-[54px]
              bg-[linear-gradient(90deg,transparent,#B9852B)]
              sm:block
            "
          />

          <h2
            id="trusted-companies-title"
            className="
              text-center
              text-[10px]
              font-black
              uppercase
              tracking-[0.34em]
              text-[#708A9B]
              sm:text-[11px]
              lg:text-[12px]
            "
          >
            Trusted by talent at leading companies
          </h2>

          <span
            className="
              hidden h-px w-[54px]
              bg-[linear-gradient(90deg,#B9852B,transparent)]
              sm:block
            "
          />
        </div>

        {/* -------------------------------------------------------
            COMPANY LOGOS
            ------------------------------------------------------- */}

        <div
          className="
            mt-9
            grid
            grid-cols-2
            items-stretch
            gap-y-7
            text-[#78909F]
            sm:grid-cols-4
            sm:gap-y-8
            lg:mt-10
            lg:grid-cols-7
            lg:gap-0
          "
        >
          {companies.map(
            ({ name, mark, markAfter, className }, index) => (
              <div
                key={name}
                className={`
                  group
                  relative
                  flex
                  min-h-[66px]
                  items-center
                  justify-center
                  px-4
                  transition-all
                  duration-300

                  ${
                    index !== companies.length - 1
                      ? `
                          lg:after:absolute
                          lg:after:right-0
                          lg:after:top-1/2
                          lg:after:h-[46px]
                          lg:after:w-px
                          lg:after:-translate-y-1/2
                          lg:after:bg-[#DDD8D0]
                        `
                      : ''
                  }
                `}
                aria-label={name.replaceAll('\n', ' ')}
              >
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2.5
                    opacity-[0.92]
                    grayscale
                    transition-all
                    duration-300
                    group-hover:-translate-y-[1px]
                    group-hover:text-[#294C64]
                    group-hover:opacity-100
                  "
                >
                  {mark}

                  <span className={className}>
                    {name}
                  </span>

                  {markAfter}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Fine bottom accent */}
      <div
        aria-hidden="true"
        className="
          absolute bottom-0 left-1/2
          h-px w-[92%]
          -translate-x-1/2
          bg-[linear-gradient(
            90deg,
            transparent,
            rgba(112,138,155,0.24),
            transparent
          )]
        "
      />
    </section>
  );
};

export default TrustedCompanies;
