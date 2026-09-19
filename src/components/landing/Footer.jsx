import React, { useState } from 'react';

import {
  ArrowRight,
  Linkedin,
  Mail,
  Twitter,
  Phone,
  MapPin,
  Coffee,
  X,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';

import BlueLogo from '../../assets/logos/BlueGray.png';
import footerBackground from '../../assets/footer.png';


const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfz55NWi27Do0xWsPxNVEMU6CTqW8diTrwk3oxR62ufMVsPxg/viewform';


const productLinks = [
  {
    label: 'Builder',
    path: '/builder',
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    label: 'Templates',
    href: '#templates',
  },
  {
    label: 'Testimonials',
    href: '#testimonials',
  },
];


const builderLinks = [
  'Executive letter builder',
  'Resume upload',
  'Job description match',
  'A4 PDF export',
];


const Footer = () => {
  const navigate = useNavigate();

  const [isCoffeeOpen, setIsCoffeeOpen] =
    useState(false);


  /* =========================================================
     EXISTING NAVIGATION
     ========================================================= */

  const handleLink = (item) => {
    if (item.path) {
      navigate(item.path);
    }

    if (item.href) {
      document
        .querySelector(item.href)
        ?.scrollIntoView({
          behavior: 'smooth',
        });
    }
  };


  return (
    <>
      <footer
        className="
          relative
          isolate
          overflow-hidden
          bg-[#061B2B]
          text-white
        "
      >
        {/* ===================================================
            OFFICE LOBBY BACKGROUND
            =================================================== */}

        <img
  src={footerBackground}
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
    blur-[3px]
    scale-105
    opacity-50
  "
/>


        {/* ===================================================
            READABILITY OVERLAYS
            Keep lobby visible but make footer content readable.
            =================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[#061A29]/58
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(
              90deg,
              rgba(3,18,29,.94)_0%,
              rgba(4,23,36,.86)_31%,
              rgba(5,28,43,.70)_56%,
              rgba(5,26,40,.55)_100%
            )]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(
              180deg,
              rgba(3,17,27,.22)_0%,
              rgba(3,17,27,.32)_52%,
              rgba(2,14,23,.92)_100%
            )]
          "
        />


        {/* subtle top accent */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#D8AE58]/60
            to-transparent
          "
        />


        {/* ===================================================
            MAIN FOOTER
            =================================================== */}

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

          {/* =================================================
              TOP CTA
              ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-5
              rounded-[17px]
              border
              border-white/15
              bg-[#08263A]/72
              px-5
              py-5
              shadow-[0_18px_44px_rgba(0,0,0,.20)]
              backdrop-blur-[9px]
              sm:px-6
              lg:flex-row
              lg:items-center
              lg:justify-between
              lg:px-7
            "
          >
            <div>
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
                    w-7
                    bg-[#E0B457]
                  "
                />

                <p
                  className="
                    text-[8px]
                    font-black
                    uppercase
                    tracking-[0.28em]
                    text-[#E4C06B]
                  "
                >
                  Ready for your next move?
                </p>
              </div>


              <h3
                className="
                  mt-2
                  font-serif
                  text-[22px]
                  font-semibold
                  tracking-[-0.03em]
                  text-[#FFFDF8]
                  sm:text-[25px]
                "
              >
                Build a letter that sounds like you,
                only sharper.
              </h3>


              <p
                className="
                  mt-1.5
                  text-[11.5px]
                  font-medium
                  text-[#B8CBD6]
                  sm:text-[12px]
                "
              >
                Join the CareerSense network or grab a
                virtual coffee with our mentors.
              </p>
            </div>


            <button
              type="button"
              onClick={() =>
                setIsCoffeeOpen(true)
              }
              className="
                group
                inline-flex
                h-[48px]
                shrink-0
                items-center
                justify-center
                gap-3
                self-start
                rounded-[9px]
                border
                border-[#E8C36A]
                bg-[linear-gradient(115deg,#F1CF7A,#E7B64C)]
                px-5
                text-[12px]
                font-extrabold
                text-[#102D47]
                shadow-[0_8px_22px_rgba(0,0,0,.18)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:brightness-105
                lg:self-auto
              "
            >
              <Coffee
                size={16}
                strokeWidth={2}
              />

              Coffee Connect

              <ArrowRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>


          {/* =================================================
              LINKS AREA
              ================================================= */}

          <div
            className="
              grid
              gap-8
              py-8
              sm:grid-cols-2
              lg:grid-cols-[1.35fr_.72fr_1fr_1.15fr]
              lg:gap-7
              lg:py-9
            "
          >
            {/* ===============================================
                BRAND
                =============================================== */}

            <div
              className="
                lg:pr-8
              "
            >
              <button
                type="button"
                onClick={() =>
                  navigate('/')
                }
                className="
                  flex
                  items-center
                  gap-3
                  text-left
                "
              >
                <div
                  className="
                    flex
                    h-[52px]
                    w-[52px]
                    shrink-0
                    items-center
                    justify-center
                  "
                >
                  <img
                    src={BlueLogo}
                    alt="CareerSense Logo"
                    className="
                      h-full
                      w-full
                      object-contain
                    "
                  />
                </div>


                <div>
                  <h2
                    className="
                      text-[24px]
                      font-black
                      leading-none
                      tracking-[-0.045em]
                    "
                  >
                    <span className="text-[#F5EFEB]">
                      Career
                    </span>

                    <span className="text-[#E3BA5E]">
                      Sense
                    </span>
                  </h2>

                  <p
                    className="
                      mt-1.5
                      text-[7.5px]
                      font-black
                      uppercase
                      tracking-[0.28em]
                      text-[#AFC7D5]
                    "
                  >
                    Executive Letters
                  </p>
                </div>
              </button>


              <p
                className="
                  mt-4
                  max-w-[355px]
                  text-[11.5px]
                  font-medium
                  leading-[1.65]
                  text-[#B1C5D0]
                "
              >
                Premium cover letters, executive
                templates, and Cora AI guidance for
                serious applications.
              </p>


              {/* socials */}

              <div
                className="
                  mt-5
                  flex
                  gap-2
                "
              >
                <a
                  href="mailto:support@careersenseai.com"
                  aria-label="Email CareerSense"
                  className="
                    flex
                    h-[36px]
                    w-[36px]
                    items-center
                    justify-center
                    rounded-[9px]
                    border
                    border-[#587286]/65
                    bg-[#08283D]/70
                    text-[#B9CCD6]
                    backdrop-blur
                    transition-all
                    hover:-translate-y-0.5
                    hover:border-[#D5AB52]
                    hover:text-[#E8C267]
                  "
                >
                  <Mail size={15} />
                </a>


                <a
                  href="https://www.linkedin.com"
                  aria-label="CareerSense on LinkedIn"
                  className="
                    flex
                    h-[36px]
                    w-[36px]
                    items-center
                    justify-center
                    rounded-[9px]
                    border
                    border-[#587286]/65
                    bg-[#08283D]/70
                    text-[#B9CCD6]
                    backdrop-blur
                    transition-all
                    hover:-translate-y-0.5
                    hover:border-[#D5AB52]
                    hover:text-[#E8C267]
                  "
                >
                  <Linkedin size={15} />
                </a>


                <a
                  href="https://twitter.com"
                  aria-label="CareerSense on Twitter"
                  className="
                    flex
                    h-[36px]
                    w-[36px]
                    items-center
                    justify-center
                    rounded-[9px]
                    border
                    border-[#587286]/65
                    bg-[#08283D]/70
                    text-[#B9CCD6]
                    backdrop-blur
                    transition-all
                    hover:-translate-y-0.5
                    hover:border-[#D5AB52]
                    hover:text-[#E8C267]
                  "
                >
                  <Twitter size={15} />
                </a>
              </div>
            </div>


            {/* ===============================================
                PRODUCT
                =============================================== */}

            <div
              className="
                lg:border-l
                lg:border-white/10
                lg:pl-7
              "
            >
              <h3
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.20em]
                  text-[#E2BD68]
                "
              >
                Product
              </h3>

              <ul
                className="
                  mt-4
                  space-y-2.5
                "
              >
                {productLinks.map(
                  (item) => (
                    <li
                      key={
                        item.label
                      }
                    >
                      <button
                        type="button"
                        onClick={() =>
                          handleLink(
                            item
                          )
                        }
                        className="
                          group
                          inline-flex
                          items-center
                          gap-2
                          text-[11px]
                          font-medium
                          text-[#B6C8D2]
                          transition
                          hover:text-white
                        "
                      >
                        {
                          item.label
                        }

                        <ArrowRight
                          size={10}
                          className="
                            opacity-0
                            transition-all
                            group-hover:translate-x-0.5
                            group-hover:opacity-100
                          "
                        />
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>


            {/* ===============================================
                WORKFLOWS
                =============================================== */}

            <div
              className="
                lg:border-l
                lg:border-white/10
                lg:pl-7
              "
            >
              <h3
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.20em]
                  text-[#E2BD68]
                "
              >
                Workflows
              </h3>

              <ul
                className="
                  mt-4
                  space-y-2.5
                "
              >
                {builderLinks.map(
                  (item) => (
                    <li
                      key={item}
                      className="
                        text-[11px]
                        font-medium
                        text-[#B6C8D2]
                      "
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>


            {/* ===============================================
                CONTACT
                =============================================== */}

            <div
              className="
                lg:border-l
                lg:border-white/10
                lg:pl-7
              "
            >
              <h3
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.20em]
                  text-[#E2BD68]
                "
              >
                Contact
              </h3>


              <ul
                className="
                  mt-4
                  space-y-3
                  text-[11px]
                  font-medium
                  text-[#B6C8D2]
                "
              >
                {/* Email */}

                <li
                  className="
                    flex
                    items-center
                    gap-2.5
                  "
                >
                  <Mail
                    size={14}
                    className="
                      shrink-0
                      text-[#D8AF59]
                    "
                  />

                  <a
                    href="mailto:support@careersenseai.com"
                    className="
                      transition
                      hover:text-white
                    "
                  >
                    support@careersenseai.com
                  </a>
                </li>


                {/* Phones */}

                <li
                  className="
                    flex
                    items-start
                    gap-2.5
                  "
                >
                  <Phone
                    size={14}
                    className="
                      mt-[2px]
                      shrink-0
                      text-[#D8AF59]
                    "
                  />

                  <div
                    className="
                      flex
                      flex-col
                      gap-1.5
                    "
                  >
                    <a
                      href="tel:+12018936385"
                      className="
                        transition
                        hover:text-white
                      "
                    >
                      +1 (201) 893-6385
                    </a>

                    <a
                      href="tel:+919891422329"
                      className="
                        transition
                        hover:text-white
                      "
                    >
                      +91 9891422329
                    </a>
                  </div>
                </li>


                {/* Address */}

                <li
                  className="
                    flex
                    items-start
                    gap-2.5
                  "
                >
                  <MapPin
                    size={14}
                    className="
                      mt-[2px]
                      shrink-0
                      text-[#D8AF59]
                    "
                  />

                  <div
                    className="
                      leading-[1.55]
                    "
                  >
                    85 CourtHouse Pl,
                    Jersey City
                    <br />
                    New Jersey - 07306
                  </div>
                </li>
              </ul>
            </div>
          </div>


          {/* =================================================
              COPYRIGHT BAR
              ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-t
              border-white/12
              pt-5
              text-[9.5px]
              font-medium
              text-[#879FAC]
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <span>
              Copyright © 2026 CareerSense.
              All rights reserved.
            </span>


            <div
              className="
                flex
                flex-wrap
                gap-x-5
                gap-y-2
              "
            >
              <a
                href="#"
                className="
                  transition
                  hover:text-[#E2BD68]
                "
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="
                  transition
                  hover:text-[#E2BD68]
                "
              >
                Terms of Service
              </a>

              <a
                href="mailto:support@careersenseai.com"
                className="
                  transition
                  hover:text-[#E2BD68]
                "
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>


      {/* =====================================================
          COFFEE CONNECT MODAL

          Functionality preserved.
          ===================================================== */}

      {isCoffeeOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-[#051A2A]/72
            p-4
            backdrop-blur-md
          "
        >
          <div
            className="
              relative
              flex
              h-[80vh]
              w-full
              max-w-2xl
              flex-col
              overflow-hidden
              rounded-[20px]
              border
              border-[#D8C69E]
              bg-white
              shadow-[0_28px_80px_rgba(0,0,0,.35)]
            "
          >
            {/* Modal header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[#E8E0D2]
                bg-[#FBF7EF]
                px-5
                py-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-[10px]
                    bg-[#0B304B]
                    text-[#E7BE62]
                    shadow-sm
                  "
                >
                  <Coffee
                    size={18}
                  />
                </div>


                <div>
                  <h3
                    className="
                      font-serif
                      text-[18px]
                      font-semibold
                      text-[#102D47]
                    "
                  >
                    Coffee Connect
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-[9px]
                      font-semibold
                      text-[#738B9A]
                    "
                  >
                    Connect with the CareerSense team
                  </p>
                </div>
              </div>


              <button
                type="button"
                onClick={() =>
                  setIsCoffeeOpen(false)
                }
                aria-label="Close Coffee Connect"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#DDD5C8]
                  bg-white
                  text-[#687E8B]
                  transition
                  hover:bg-[#F3EEE6]
                  hover:text-[#102D47]
                "
              >
                <X size={17} />
              </button>
            </div>


            {/* Form */}

            <div
              className="
                relative
                flex-1
                bg-white
              "
            >
              <iframe
                src={GOOGLE_FORM_URL}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  border-0
                "
                title="Coffee Connect Form"
              >
                Loading...
              </iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default Footer;
