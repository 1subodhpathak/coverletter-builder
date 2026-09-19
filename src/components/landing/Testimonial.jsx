import React, { useMemo, useState } from 'react';

import {
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowRight,
} from 'lucide-react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import AnamikaImage from '../../assets/anamika.png';
import naveenImage from '../../assets/Naveen-520.jpg';
import priyaImage from '../../assets/Priya-520.jpg';
import padmaImage from '../../assets/Padma-520.jpg';
import rohitImage from '../../assets/Rohit.png';
import cheluvarajuImage from '../../assets/R.Cheluvaraju.png';

import testimonyBackground from '../../assets/testimony.png';


const testimonials = [
  {
    name: 'Rohit',
    role: 'Gamer',
    text:
      'The gaming template immediately stood out to me. It felt creative, sharp, and actually matched my personality while still keeping the cover letter structured and easy to send professionally.',
    image: rohitImage,
  },
  {
    name: 'R. Cheluvaraju',
    role: 'Senior Software Developer at Google',
    text:
      'CareerSense helped me turn technical experience into a cover letter that felt concise, relevant, and much more polished. The structure made it easy to highlight impact without overcomplicating the message.',
    image: cheluvarajuImage,
  },
  {
    name: 'Anamika Mathur',
    role: 'CEO',
    text:
      'CareerSense helped me shape my experience into a cover letter that felt clear and confident. It saved time, but more importantly, the draft actually sounded like something I would send.',
    image: AnamikaImage,
  },
  {
    name: 'Naveen Malhotra',
    role: 'Senior Director',
    text:
      'What I liked most was how direct the letter felt. It did not overdo the language, but still brought out the important parts of my experience clearly.',
    image: naveenImage,
  },
  {
    name: 'Priya Patel',
    role: 'Senior Lead, Human Resource Management',
    text:
      'CareerSense makes the cover letter feel more specific to the role instead of sounding like a generic template. The structure is simple, professional, and easy to review.',
    image: priyaImage,
  },
  {
    name: 'Padma Thyagarajan',
    role: 'Senior Partner, Law Firm',
    text:
      'The templates are clean and practical. They give me a strong starting point without making the letter feel overly polished or artificial.',
    image: padmaImage,
  },
];


const Testimonial = () => {
  const [page, setPage] = useState(0);

  const visible = useMemo(() => {
    const start = page * 2;

    return testimonials.slice(
      start,
      start + 2
    );
  }, [page]);


  const pageCount = Math.ceil(
    testimonials.length / 2
  );


  const previousPage = () => {
    setPage((current) =>
      current === 0
        ? pageCount - 1
        : current - 1
    );
  };


  const nextPage = () => {
    setPage(
      (current) =>
        (current + 1) % pageCount
    );
  };


  return (
    <section
      id="testimonials"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#071F32]
        text-white
      "
    >
      {/* =====================================================
          SAME EXISTING BACKGROUND IMAGE
          ===================================================== */}

      <img
        src={testimonyBackground}
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


      {/* dark wash */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#061D2F]/28
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
          max-w-[1640px]
          px-5
          py-8
          sm:px-8
          lg:px-12
          lg:py-9
          xl:px-16
        "
      >
        {/* ===================================================
            TOP HEADING + NAV
            =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            {/* eyebrow */}

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
                  bg-[#E1B95D]
                "
              />

              <p
                className="
                  text-[8.5px]
                  font-black
                  uppercase
                  tracking-[0.30em]
                  text-[#E3C579]
                  sm:text-[9px]
                "
              >
                Real Professionals. Real Results.
              </p>
            </div>


            {/* title */}

            <h2
              className="
                mt-3
                font-serif
                text-[36px]
                font-semibold
                leading-[0.95]
                tracking-[-0.045em]
                text-[#FFFDF8]
                sm:text-[40px]
                lg:text-[38px]
              "
            >
              Trusted by professionals
              <span className="text-[#DFAE48]">
                .
              </span>
            </h2>
          </div>


          {/* ===============================================
              NAVIGATION
              =============================================== */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <button
              type="button"
              className="
                group
                hidden
                items-center
                gap-2
                border-b
                border-[#D7AE50]
                pb-1
                text-[10.5px]
                font-semibold
                text-[#D4E0E7]
                transition
                hover:text-white
                sm:flex
              "
            >
              See more stories

              <ArrowRight
                size={13}
                className="
                  transition-transform
                  group-hover:translate-x-1
                "
              />
            </button>


            <button
              type="button"
              onClick={previousPage}
              aria-label="Previous testimonials"
              className="
                flex
                h-[42px]
                w-[42px]
                items-center
                justify-center
                rounded-full
                border
                border-[#587589]
                bg-[#0B2A40]/60
                text-[#D7E4EA]
                transition-all
                hover:border-[#D7AE50]
                hover:text-white
              "
            >
              <ChevronLeft
                size={18}
              />
            </button>


            <button
              type="button"
              onClick={nextPage}
              aria-label="Next testimonials"
              className="
                flex
                h-[42px]
                w-[42px]
                items-center
                justify-center
                rounded-full
                border
                border-[#D9AC4B]
                bg-[#0B2A40]/65
                text-[#E4B74F]
                transition-all
                hover:bg-[#12374F]
              "
            >
              <ChevronRight
                size={18}
              />
            </button>
          </div>
        </div>


        {/* ===================================================
            TESTIMONIAL CARDS
            =================================================== */}

        <AnimatePresence
          mode="wait"
          initial={false}
        >
          <motion.div
            key={page}
            initial={{
              opacity: 0,
              x: 16,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -16,
            }}
            transition={{
              duration: 0.28,
              ease: 'easeOut',
            }}
            className="
              mt-6
              grid
              gap-4
              md:grid-cols-2
              xl:gap-5
            "
          >
            {visible.map(
              (testimonial) => (
                <article
                  key={testimonial.name}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-[15px]
                    border
                    border-[#47677B]/70
                    bg-[#102D43]/72
                    p-4
                    shadow-[0_14px_30px_rgba(0,0,0,.16)]
                    backdrop-blur-[7px]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-[#628296]
                    hover:bg-[#12334A]/78
                  "
                >
                  <div
                    className="
                      grid
                      items-center
                      gap-5
                      sm:grid-cols-[118px_1fr]
                    "
                  >
                    {/* =====================================
                        PHOTO
                        ===================================== */}

                    <div
                      className="
                        h-[118px]
                        w-full
                        overflow-hidden
                        rounded-[10px]
                        border
                        border-white/10
                        bg-[#17384F]
                        sm:w-[118px]
                      "
                    >
                      <img
                        src={
                          testimonial.image
                        }
                        alt={
                          testimonial.name
                        }
                        loading="lazy"
                        decoding="async"
                        className="
                          h-full
                          w-full
                          object-cover
                          object-center
                        "
                      />
                    </div>


                    {/* =====================================
                        CONTENT
                        ===================================== */}

                    <div
                      className="
                        min-w-0
                      "
                    >
                      {/* quote */}

                      <div
                        className="
                          mb-2
                          flex
                          h-[28px]
                          w-[28px]
                          items-center
                          justify-center
                          rounded-full
                          bg-[#D8A844]/14
                          text-[#E9BC5D]
                        "
                      >
                        <Quote
                          size={15}
                          fill="currentColor"
                          strokeWidth={1.4}
                        />
                      </div>


                      {/* testimonial */}

                      <blockquote
                        className="
                          line-clamp-4
                          text-[12px]
                          font-medium
                          leading-[1.58]
                          text-[#E3EBF0]
                          sm:text-[12.5px]
                        "
                      >
                        “{testimonial.text}”
                      </blockquote>


                      {/* identity */}

                      <div
                        className="
                          mt-3
                        "
                      >
                        <h3
                          className="
                            font-serif
                            text-[17px]
                            font-semibold
                            leading-none
                            tracking-[-0.02em]
                            text-white
                          "
                        >
                          {
                            testimonial.name
                          }
                        </h3>


                        <p
                          className="
                            mt-1.5
                            truncate
                            text-[7.5px]
                            font-black
                            uppercase
                            tracking-[0.18em]
                            text-[#8FA9B8]
                          "
                        >
                          {
                            testimonial.role
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              )
            )}
          </motion.div>
        </AnimatePresence>


        {/* ===================================================
            PAGINATION
            =================================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2
          "
        >
          {Array.from({
            length: pageCount,
          }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                setPage(index)
              }
              aria-label={`Show testimonial page ${
                index + 1
              }`}
              className={`
                rounded-full
                transition-all
                duration-300

                ${
                  page === index
                    ? `
                        h-[8px]
                        w-[20px]
                        bg-[#D9A842]
                      `
                    : `
                        h-[7px]
                        w-[7px]
                        bg-[#527083]
                        hover:bg-[#7591A2]
                      `
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


export default Testimonial;
