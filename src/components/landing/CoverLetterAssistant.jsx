import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Briefcase,
  CalendarDays,
  ChevronDown,
  Maximize2,
  Minimize2,
  PenLine,
  Repeat2,
  Send,
  Target,
  UserRound,
  Users,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { answerCoverLetterQuestion } from '../../services/groqService';
import { useStore } from '../../store/useStore';

import { Lottie } from 'lottie-react';

import ctaBackground from '../../assets/cta.png';
import coraGif from '../../assets/CORA.gif';
import coraPng from '../../assets/CORA.png';
import coraLandingPng from '../../assets/CORA2.png';
import coraSound from '../../assets/CORA.mp4';
import coraLottieData from '../../assets/CORA_backup.json';


/* ============================================================
   CONFIG
   ============================================================ */

const MAX_CHARS = 280;
const CORA_ANIMATION_DURATION = 3000;


/* ============================================================
   CORA PORTRAIT (LOTTIE ANIMATION)
   ============================================================ */

const CoraPortrait = ({ playbackId }) => {
  return (
    <div
      className="
        relative
        aspect-square
        w-full
        max-w-[520px]
        flex
        items-center
        justify-center
      "
      aria-label="CORA, the Career Optimization and Readiness Assistant"
    >
      <Lottie
        key={playbackId}
        src={coraLottieData}
        loop={false}
        autoplay={true}
        style={{ width: '100%', height: '100%' }}
        className="h-full w-full object-contain"
      />
    </div>
  );
};


/* ============================================================
   PREDEFINED QUESTIONS
   ============================================================ */

const presetQuestions = [
  {
    question:
      'How do I start a cover letter for a business analyst role?',
    answer:
      'Quick answer: Open with fit, not enthusiasm.\n\nBest move: Start with the business problem or role scope you can handle, then connect it to one relevant result.\n\nAvoid: Generic openings that sound copied from AI.',
  },

  {
    question:
      'Should I mention salary expectations in my cover letter?',
    answer:
      'Quick answer: Usually no.\n\nBest move: Mention compensation only if the job post asks for it directly.\n\nAvoid: Leading with salary before proving fit and value.',
  },

  {
    question:
      'How long should my cover letter be?',
    answer:
      'Quick answer: Keep it to one page.\n\nBest move: Aim for roughly 250-400 words with a sharp opening, proof, and close.\n\nAvoid: Long background summaries or resume repetition.',
  },

  {
    question:
      'How do I tailor a cover letter to a job description?',
    answer: '',
  },

  {
    question:
      'Should I use ATS keywords in my cover letter?',
    answer: '',
  },

  {
    question:
      'What should I say if I do not know the hiring manager name?',
    answer: '',
  },

  {
    question:
      'How do I end a cover letter strongly?',
    answer: '',
  },

  {
    question:
      'Should I mention salary expectations in a cover letter?',
    answer: '',
  },

  {
    question:
      'Can I use bullet points in a cover letter?',
    answer: '',
  },

  {
    question:
      'How do I explain a career gap in a cover letter?',
    answer: '',
  },

  {
    question:
      'How can I make my cover letter sound less generic?',
    answer: '',
  },

  {
    question:
      'How do I write a cover letter if I am changing industries?',
    answer: '',
  },

  {
    question:
      'Should I repeat my resume in my cover letter?',
    answer: '',
  },

  {
    question:
      'What tone should a senior executive cover letter use?',
    answer: '',
  },

  {
    question:
      'How do I write a cover letter for a product manager role?',
    answer: '',
  },

  {
    question:
      'How do I write a cover letter for a marketing manager role?',
    answer: '',
  },

  {
    question:
      'How do I write a cover letter for a finance role?',
    answer: '',
  },

  {
    question:
      'How do I show leadership impact in a cover letter?',
    answer: '',
  },

  {
    question:
      'How many achievements should I include in a cover letter?',
    answer: '',
  },

  {
    question:
      'Should I mention why I want this company specifically?',
    answer: '',
  },

  {
    question:
      'How do I write a cover letter with no direct experience?',
    answer: '',
  },

  {
    question:
      'Can a cover letter be too formal?',
    answer: '',
  },

  {
    question:
      'What should I avoid in the first paragraph of a cover letter?',
    answer: '',
  },

  {
    question:
      'How do I write a strong cover letter for a startup role?',
    answer: '',
  },

  {
    question:
      'What is the best structure for a one-page cover letter?',
    answer: '',
  },
];


/* ============================================================
   QUESTION KEYWORDS
   ============================================================ */

const coverLetterKeywords = [
  'cover letter',
  'letter',
  'application',
  'apply',
  'job',
  'role',
  'resume',
  'hiring',
  'recruiter',
  'company',
  'position',
  'paragraph',
  'opening',
  'closing',
  'ats',
];


/* ============================================================
   COMPONENT
   ============================================================ */

const CoverLetterAssistant = () => {
  const navigate = useNavigate();

  const resetBuilder =
    useStore(
      (state) =>
        state.resetBuilder
    );


  /* ==========================================================
     STATE
     ========================================================== */

  const [
    question,
    setQuestion,
  ] = useState('');


  const [
    answer,
    setAnswer,
  ] = useState(
    presetQuestions[0].answer
  );


  const [
    activeQuestion,
    setActiveQuestion,
  ] = useState(
    presetQuestions[0].question
  );


  const [
    history,
    setHistory,
  ] = useState([
    {
      question:
        presetQuestions[0].question,

      answer:
        presetQuestions[0].answer,
    },
  ]);


  const [
    historyIndex,
    setHistoryIndex,
  ] = useState(0);


  const [
    selectedPreset,
    setSelectedPreset,
  ] = useState('');


  const [
    isLoading,
    setIsLoading,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState('');


  const [
    isAnswerExpanded,
    setIsAnswerExpanded,
  ] = useState(false);


  const [
    isMeetCoraOpen,
    setIsMeetCoraOpen,
  ] = useState(false);


  const [
    isCoraMuted,
    setIsCoraMuted,
  ] = useState(false);


  const [
    coraPlaybackId,
    setCoraPlaybackId,
  ] = useState(0);


  /*
   * Only controls whether the answer panel is
   * visible inside Screen 2.
   *
   * It does not affect the underlying API/history.
   */
  const [
    hasConversation,
    setHasConversation,
  ] = useState(false);


  const coraAudioRef =
    useRef(null);


  /* ==========================================================
     DERIVED VALUES
     ========================================================== */

  const charsLeft =
    MAX_CHARS -
    question.length;


  const isCoverLetterQuestion =
    useMemo(() => {
      const normalized =
        question.toLowerCase();

      return coverLetterKeywords.some(
        (keyword) =>
          normalized.includes(
            keyword
          )
      );
    }, [question]);


  const activeHistoryItem =
    history[historyIndex] ||
    history[0];


  /* ==========================================================
     BUILDER
     ========================================================== */

  const openBuilderStart =
    () => {
      resetBuilder();

      navigate(
        '/builder'
      );
    };


  /* ==========================================================
     CORA INTRODUCTION
     ========================================================== */

  const meetCora = () => {
    const audio =
      new Audio(coraSound);

    audio.muted = false;
    audio.volume = 0.9;

    coraAudioRef.current?.pause();

    coraAudioRef.current =
      audio;

    setIsCoraMuted(false);

    setCoraPlaybackId(
      (current) =>
        current + 1
    );

    setIsMeetCoraOpen(true);

    audio.play().catch(() => {
      /*
       * Introduction remains usable if
       * browser blocks automatic playback.
       */
    });
  };


  const closeCoraIntroduction =
    () => {
      coraAudioRef.current?.pause();

      if (
        coraAudioRef.current
      ) {
        coraAudioRef.current.currentTime =
          0;
      }

      setIsMeetCoraOpen(false);
    };


  const toggleCoraSound =
    () => {
      if (
        !coraAudioRef.current
      ) {
        return;
      }

      const nextMuted =
        !isCoraMuted;

      coraAudioRef.current.muted =
        nextMuted;

      setIsCoraMuted(
        nextMuted
      );
    };


  const replayCoraIntroduction =
    () => {
      let audio =
        coraAudioRef.current;

      if (!audio) {
        audio = new Audio(
          coraSound
        );

        audio.volume = 0.9;

        coraAudioRef.current =
          audio;
      }

      audio.pause();
      audio.currentTime = 0;
      audio.muted = isCoraMuted;

      setCoraPlaybackId(
        (current) =>
          current + 1
      );

      audio.play().catch(() => {
        /* Keep the visual replay available if media playback is blocked. */
      });
    };


  useEffect(() => {
    if (
      !isMeetCoraOpen
    ) {
      return undefined;
    }

    const handleKeyDown =
      (event) => {
        if (
          event.key ===
          'Escape'
        ) {
          closeCoraIntroduction();
        }
      };


    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';


    window.addEventListener(
      'keydown',
      handleKeyDown
    );


    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [isMeetCoraOpen]);


  useEffect(
    () => () =>
      coraAudioRef.current?.pause(),
    []
  );


  /* ==========================================================
     INPUT
     ========================================================== */

  const handleQuestionChange =
    (event) => {
      setQuestion(
        event.target.value.slice(
          0,
          MAX_CHARS
        )
      );

      setError('');
    };


  /* ==========================================================
     ASK CORA
     ========================================================== */

  const askQuestion =
    async () => {
      const cleanQuestion =
        question.trim();


      if (
        cleanQuestion.length <
        10
      ) {
        setError(
          'Ask a little more specifically so CORA can help.'
        );

        return;
      }


      if (
        !isCoverLetterQuestion
      ) {
        setError(
          'This assistant only answers cover letter questions.'
        );

        return;
      }


      setIsLoading(true);
      setError('');
      setHasConversation(true);

      setActiveQuestion(
        cleanQuestion
      );


      const reply =
        await answerCoverLetterQuestion(
          cleanQuestion
        );


      setAnswer(reply);


      setHistory(
        (current) => {
          const next = [
            {
              question:
                cleanQuestion,

              answer:
                reply,
            },

            ...current.filter(
              (item) =>
                item.question !==
                cleanQuestion
            ),
          ];

          return next.slice(
            0,
            8
          );
        }
      );


      setIsLoading(false);
    };


  useEffect(() => {
    setHistoryIndex(0);
  }, [history.length]);


  /* ==========================================================
     EXPANDED ANSWER
     ========================================================== */

  useEffect(() => {
    if (
      !isAnswerExpanded
    ) {
      return undefined;
    }


    const handleKeyDown =
      (event) => {
        if (
          event.key ===
          'Escape'
        ) {
          setIsAnswerExpanded(
            false
          );
        }
      };


    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';


    window.addEventListener(
      'keydown',
      handleKeyDown
    );


    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [isAnswerExpanded]);


  /* ==========================================================
     PRESET
     ========================================================== */

  const usePreset =
    async (item) => {
      setQuestion(
        item.question
      );

      setActiveQuestion(
        item.question
      );

      setError('');
      setHasConversation(true);


      if (item.answer) {
        setAnswer(
          item.answer
        );


        setHistory(
          (current) => {
            const next = [
              {
                question:
                  item.question,

                answer:
                  item.answer,
              },

              ...current.filter(
                (entry) =>
                  entry.question !==
                  item.question
              ),
            ];

            return next.slice(
              0,
              8
            );
          }
        );

        return;
      }


      setIsLoading(true);


      const reply =
        await answerCoverLetterQuestion(
          item.question
        );


      setAnswer(reply);


      setHistory(
        (current) => {
          const next = [
            {
              question:
                item.question,

              answer:
                reply,
            },

            ...current.filter(
              (entry) =>
                entry.question !==
                item.question
            ),
          ];

          return next.slice(
            0,
            8
          );
        }
      );


      setIsLoading(false);
    };


  /* ==========================================================
     HISTORY
     ========================================================== */

  const reviewHistoryItem =
    (item) => {
      if (!item) {
        return;
      }

      setQuestion(
        item.question
      );

      setActiveQuestion(
        item.question
      );

      setAnswer(
        item.answer
      );

      setError('');
      setHasConversation(true);
    };


  /* ==========================================================
     QUICK PROMPTS
     ========================================================== */

  const quickSuggestions = [
    {
      label:
        'Help me write an opening line',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'start a cover letter'
            )
        ) ||
        presetQuestions[0],
    },

    {
      label:
        'Make this more executive',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'senior executive'
            )
        ) ||
        presetQuestions[0],
    },

    {
      label:
        'Tailor for a specific role',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'job description'
            )
        ) ||
        presetQuestions[0],
    },

    {
      label:
        'Highlight achievements',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'leadership impact'
            )
        ) ||
        presetQuestions[0],
    },
  ];


  /* ==========================================================
     MAIN SCREEN CAPABILITIES
     ========================================================== */

  const overviewCapabilities = [
    {
      icon: PenLine,

      title:
        'Stronger opening lines',

      text:
        'Hook readers with impact',
    },

    {
      icon: BarChart3,

      title:
        'Executive tone',

      text:
        'Polished and professional',
    },

    {
      icon: Target,

      title:
        'Measurable achievements',

      text:
        'Highlight what matters',
    },

    {
      icon: UserRound,

      title:
        'Role-specific guidance',

      text:
        'Tailored to your goals',
    },
  ];


  /* ==========================================================
     SCREEN 2 CATEGORY OPTIONS
     ========================================================== */

  const assistanceOptions = [
    {
      icon: PenLine,

      title:
        'Stronger opening lines',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'start a cover letter'
            )
        ) ||
        presetQuestions[0],
    },

    {
      icon: UserRound,

      title:
        'Executive tone',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'senior executive'
            )
        ) ||
        presetQuestions[0],
    },

    {
      icon: BarChart3,

      title:
        'Measurable achievements',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'leadership impact'
            )
        ) ||
        presetQuestions[0],
    },

    {
      icon: Target,

      title:
        'Role-specific guidance',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'job description'
            )
        ) ||
        presetQuestions[0],
    },

    {
      icon: CalendarDays,

      title:
        'Handling a career gap',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'career gap'
            )
        ) ||
        presetQuestions[0],
    },

    {
      icon: Repeat2,

      title:
        'Changing industries',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'changing industries'
            )
        ) ||
        presetQuestions[0],
    },

    {
      icon: Users,

      title:
        'Showcasing leadership',

      item:
        presetQuestions.find(
          (item) =>
            item.question.includes(
              'leadership impact'
            )
        ) ||
        presetQuestions[0],
    },

    {
      icon: Briefcase,

      title:
        'Interview readiness',

      item: {
        question:
          'How can my cover letter position me better for job interviews?',

        answer: '',
      },
    },
  ];


  /* ==========================================================
     START CHAT
     ========================================================== */

  const startChatWithCora =
    () => {
      if (
        question.trim().length >=
        10
      ) {
        askQuestion();
        return;
      }

      document
        .getElementById(
          'cora-inner-question'
        )
        ?.focus();
    };


  /* ==========================================================
     UI
     ========================================================== */

  return (
    <section
      id="cover-letter-questions"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#071F32]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <img
        src={ctaBackground}
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


      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[#041928]/14
        "
      />


      {/* =====================================================
          SCREEN 1
          COMPACT OVERVIEW
          ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1640px]
          px-5
          py-7
          sm:px-8
          lg:px-12
          lg:py-8
          xl:px-16
        "
      >
        <div
          className="
            grid
            items-center
            gap-8
            lg:grid-cols-[0.37fr_0.63fr]
            xl:gap-10
          "
        >
          {/* =================================================
              LEFT
              ================================================= */}

          <div
            className="
              max-w-[520px]
            "
          >
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
                  bg-[#E3B64C]
                "
              />

              <p
                className="
                  text-[8.5px]
                  font-black
                  uppercase
                  tracking-[0.30em]
                  text-[#E8C567]
                  sm:text-[9px]
                "
              >
                AI Assistant for Executive Cover Letters
              </p>
            </div>


            {/* heading */}

            <h2
              className="
                mt-4
                font-serif
                text-[42px]
                font-semibold
                leading-[0.94]
                tracking-[-0.05em]
                text-[#FFFDF8]
                sm:text-[48px]
                xl:text-[54px]
              "
            >
              Meet{' '}

              <span
                className="
                  bg-[linear-gradient(115deg,#F7D880,#E2A937)]
                  bg-clip-text
                  text-transparent
                "
              >
                CORA
              </span>

              <span
                className="
                  text-[#E6B84C]
                "
              >
                .
              </span>
            </h2>


            {/* subhead */}

            <p
              className="
                mt-4
                text-[15px]
                font-medium
                text-[#E8C567]
                sm:text-[16px]
              "
            >
              Career Optimization & Readiness Assistant
            </p>


            {/* description */}

            <p
              className="
                mt-2.5
                max-w-[500px]
                text-[12.5px]
                font-medium
                leading-[1.65]
                text-[#ABC1CD]
                sm:text-[13px]
              "
            >
              Get expert guidance on opening lines,
              tone, achievements, and positioning —
              so you can write with confidence and
              stand out in competitive roles.
            </p>


            {/* actions */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                gap-5
              "
            >
              <button
                type="button"
                onClick={
                  meetCora
                }
                className="
                  group
                  inline-flex
                  h-[48px]
                  min-w-[220px]
                  items-center
                  justify-between
                  rounded-[9px]
                  border
                  border-[#EBC66E]
                  bg-[linear-gradient(115deg,#F4D27B,#E9B64B)]
                  px-5
                  text-[13px]
                  font-extrabold
                  text-[#0D3048]
                  shadow-[0_10px_24px_rgba(0,0,0,.16)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:brightness-105
                "
              >
                Meet CORA

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>


              <button
                type="button"
                onClick={
                  openBuilderStart
                }
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  text-[11px]
                  font-bold
                  text-[#CFDCE3]
                  transition
                  hover:text-white
                "
              >
                Start building instead

                <ArrowRight
                  size={12}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>


            {/* tagline */}

            <div
              className="
                mt-7
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-7
                  bg-[#DCAD45]
                "
              />

              <p
                className="
                  text-[7px]
                  font-black
                  uppercase
                  tracking-[0.24em]
                  text-[#89A4B3]
                "
              >
                Smarter preparation. Brighter opportunities.
              </p>
            </div>
          </div>


          {/* =================================================
              COMPACT CORA CARD
              ================================================= */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[22px]
              border
              border-[#E0D4BF]
              bg-[linear-gradient(135deg,#FFFDF9_0%,#F8F3E9_100%)]
              p-5
              text-[#102D47]
              shadow-[0_20px_52px_rgba(0,0,0,.18)]
              sm:p-6
            "
          >
            <div
              className="
                grid
                items-center
                gap-5
                md:grid-cols-[0.43fr_0.57fr]
              "
            >
              {/* CORA */}

              <div
                className="
                  relative
                  flex
                  min-h-[255px]
                  items-center
                  justify-center
                "
              >
                <img
                  src={coraLandingPng}
                  alt="CORA"
                  className="
                    relative
                    z-10
                    h-[250px]
                    w-auto
                    max-w-full
                    object-contain
                    drop-shadow-[0_18px_15px_rgba(16,45,71,.20)]
                  "
                />


                <span
                  aria-hidden="true"
                  className="
                    absolute
                    right-[9%]
                    top-[11%]
                    text-[25px]
                    text-[#E3B54B]
                  "
                >
                  ✦
                </span>
              </div>


              {/* CAPABILITIES */}

              <div>
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                  "
                >
                  <h3
                    className="
                      font-serif
                      text-[27px]
                      font-semibold
                      tracking-[-0.04em]
                      text-[#102D47]
                    "
                  >
                    CORA
                  </h3>


                  <span
                    className="
                      rounded-full
                      bg-[#F6EAD0]
                      px-2.5
                      py-1
                      text-[7px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-[#B47B1E]
                    "
                  >
                    AI Assistant
                  </span>
                </div>


                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      h-[7px]
                      w-[7px]
                      rounded-full
                      bg-[#54C17E]
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-semibold
                      text-[#7894A6]
                    "
                  >
                    Ready to guide
                  </span>


                  <span
                    className="
                      ml-2
                      hidden
                      h-px
                      w-6
                      bg-[#C7D4DA]
                      xl:block
                    "
                  />


                  <span
                    className="
                      hidden
                      text-[6.5px]
                      font-black
                      uppercase
                      tracking-[0.17em]
                      text-[#91A7B4]
                      xl:block
                    "
                  >
                    Executive writing. Higher opportunities.
                  </span>
                </div>


                <div
                  className="
                    mt-5
                    grid
                    gap-2.5
                    sm:grid-cols-2
                  "
                >
                  {overviewCapabilities.map(
                    ({
                      icon: Icon,
                      title,
                      text,
                    }) => (
                      <div
                        key={title}
                        className="
                          flex
                          min-h-[72px]
                          items-center
                          gap-3
                          rounded-[12px]
                          border
                          border-[#E2DDD4]
                          bg-white/72
                          px-3
                          py-2.5
                          shadow-[0_4px_12px_rgba(16,45,71,.035)]
                        "
                      >
                        <span
                          className="
                            flex
                            h-[37px]
                            w-[37px]
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#F8EED7]
                            text-[#173B53]
                          "
                        >
                          <Icon
                            size={16}
                            strokeWidth={1.8}
                          />
                        </span>


                        <div>
                          <h4
                            className="
                              text-[10.5px]
                              font-extrabold
                              leading-[1.18]
                              text-[#133650]
                            "
                          >
                            {title}
                          </h4>


                          <p
                            className="
                              mt-1
                              text-[8px]
                              font-medium
                              leading-[1.25]
                              text-[#829BAA]
                            "
                          >
                            {text}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>


                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-3
                  "
                >
                  <p
                    className="
                      font-serif
                      text-[12px]
                      italic
                      text-[#7E9EAF]
                    "
                  >
                    Better letters. Bigger opportunities.
                  </p>

                  <span
                    className="
                      h-px
                      flex-1
                      bg-[#BBCBD3]
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* =====================================================
          SCREEN 2
          ===================================================== */}

      {createPortal(
        <AnimatePresence>
          {isMeetCoraOpen && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.22,
              }}
              className="
                fixed
                inset-0
                z-[200]
                overflow-y-auto
                bg-[#F8F4EC]
              "
              role="dialog"
              aria-modal="true"
              aria-labelledby="meet-cora-title"
            >
              {/* =============================================
                  HEADER
                  ============================================= */}

              <div
                className="
                  relative
                  z-20
                  h-[74px]
                  border-b
                  border-[#E6DED1]
                  bg-[#FAF6EE]
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-full
                    max-w-[1600px]
                    items-center
                    justify-center
                    px-6
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >
                    <span
                      className="
                        h-px
                        w-11
                        bg-[#D6A33D]
                      "
                    />

                    <p
                      className="
                        text-[8px]
                        font-black
                        uppercase
                        tracking-[0.30em]
                        text-[#B77B1D]
                      "
                    >
                      Meet Your Assistant
                    </p>

                    <span
                      className="
                        h-px
                        w-11
                        bg-[#D6A33D]
                      "
                    />
                  </div>


                  <div
                    className="
                      absolute
                      right-5
                      top-1/2
                      flex
                      -translate-y-1/2
                      items-center
                      gap-2
                      sm:right-8
                    "
                  >
                    <button
                      type="button"
                      onClick={
                        toggleCoraSound
                      }
                      aria-label={
                        isCoraMuted
                          ? 'Play CORA introduction sound'
                          : 'Mute CORA introduction sound'
                      }
                      className="
                        flex
                        h-[38px]
                        w-[38px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#C5D1D8]
                        text-[#628197]
                        transition
                        hover:bg-white
                        hover:text-[#173A51]
                      "
                    >
                      {isCoraMuted ? (
                        <VolumeX
                          size={16}
                        />
                      ) : (
                        <Volume2
                          size={16}
                        />
                      )}
                    </button>


                    <button
                      type="button"
                      onClick={
                        closeCoraIntroduction
                      }
                      aria-label="Close CORA"
                      className="
                        flex
                        h-[38px]
                        w-[38px]
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#C5D1D8]
                        text-[#628197]
                        transition
                        hover:bg-white
                        hover:text-[#173A51]
                      "
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>
              </div>


              {/* =============================================
                  DARK BACKDROP
                  ============================================= */}

              <div
                className="
                  absolute
                  inset-x-0
                  top-[74px]
                  h-[52%]
                  overflow-hidden
                  bg-[#0A304B]
                "
              >
                <img
                  src={ctaBackground}
                  alt=""
                  aria-hidden="true"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    opacity-42
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-[#082B44]/20
                  "
                />
              </div>


              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-[48%]
                  z-[1]
                  h-[220px]
                  bg-gradient-to-b
                  from-transparent
                  via-[#EEF0EB]/82
                  to-[#F8F4EC]
                "
              />


              {/* =============================================
                  INNER PAGE
                  ============================================= */}

              <div
                className="
                  relative
                  z-10
                  mx-auto
                  w-full
                  max-w-[1580px]
                  px-5
                  pb-7
                  pt-5
                  sm:px-8
                  lg:px-12
                "
              >
                {/* title */}

                <div
                  className="
                    ml-auto
                    max-w-[870px]
                    lg:w-[61%]
                  "
                >
                  <h3
                    id="meet-cora-title"
                    className="
                      font-serif
                      text-[38px]
                      font-semibold
                      leading-[0.95]
                      tracking-[-0.05em]
                      text-white
                      sm:text-[46px]
                      lg:text-[52px]
                    "
                  >
                    Hi, this is{' '}

                    <span
                      className="
                        text-[#E7B84D]
                      "
                    >
                      CORA.
                    </span>
                  </h3>


                  <p
                    className="
                      mt-2
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.27em]
                      text-[#C7D7E0]
                      sm:text-[9px]
                    "
                  >
                    Career Optimization &amp; Readiness Assistant
                  </p>
                </div>


                {/* columns */}

                <div
                  className="
                    mt-3
                    grid
                    items-center
                    gap-5
                    lg:grid-cols-[0.38fr_0.62fr]
                  "
                >
                  {/* =========================================
                      CORA LEFT
                      ========================================= */}

                  <div
                    className="
                      relative
                      hidden
                      min-h-[520px]
                      items-center
                      justify-center
                      lg:flex
                    "
                  >
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -left-[42%]
                        top-[6%]
                        h-[78%]
                        w-[123%]
                        rounded-full
                        border
                        border-[#D4A542]/55
                      "
                    />


                    <div
                      className="
                        absolute
                        left-0
                        top-[10%]
                        max-w-[145px]
                      "
                    >
                      <p
                        className="
                          text-[9px]
                          font-black
                          uppercase
                          leading-[1.75]
                          tracking-[0.27em]
                          text-[#CFDDE5]
                        "
                      >
                        Smarter
                        <br />
                        Preparation.
                        <br />
                        Brighter
                        <br />
                        Opportunities.
                      </p>

                      <span
                        className="
                          mt-3
                          block
                          h-[2px]
                          w-7
                          bg-[#E0B34E]
                        "
                      />
                    </div>


                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        left-[5%]
                        top-[39%]
                        text-[30px]
                        text-[#E6B84C]
                      "
                    >
                      ✦
                    </span>


                    <motion.button
                      type="button"
                      onClick={
                        replayCoraIntroduction
                      }
                      aria-label="Replay CORA introduction and sound"
                      title="Replay CORA introduction"
                      initial={{
                        opacity: 0,
                        scale: 0.95,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="
                        relative
                        group
                        mt-12
                        cursor-pointer
                        w-full
                        max-w-[405px]
                        rounded-[24px]
                        outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#E6B84C]
                        focus-visible:ring-offset-4
                        focus-visible:ring-offset-[#0B304B]
                      "
                    >
                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          inset-x-[20%]
                          bottom-[5%]
                          h-[12%]
                          rounded-full
                          bg-black/25
                          blur-2xl
                        "
                      />

                      <CoraPortrait
                        playbackId={
                          coraPlaybackId
                        }
                      />
                      <span className="pointer-events-none absolute bottom-[7%] left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-[#082B45]/75 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.16em] text-[#F2CF77] opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                        Click to replay
                      </span>
                    </motion.button>
                  </div>


                  {/* =========================================
                      CORA WORKSPACE
                      ========================================= */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 14,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      duration: 0.38,
                    }}
                    className="
                      overflow-hidden
                      rounded-[19px]
                      border
                      border-[#E3D8C6]
                      bg-[#FFFDFA]/98
                      p-4
                      text-[#102D47]
                      shadow-[0_22px_58px_rgba(10,34,50,.17)]
                      sm:p-5
                    "
                  >
                    {/* =======================================
                        STATUS
                        ======================================= */}

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
                          h-[38px]
                          w-[38px]
                          shrink-0
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-full
                          border
                          border-[#D6AD51]
                          bg-[#0B304B]
                        "
                      >
                        <img
                          src={coraPng}
                          alt=""
                          className="
                            h-full
                            w-full
                            object-contain
                          "
                        />
                      </span>


                      <div>
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <p
                            className="
                              text-[11px]
                              font-black
                              text-[#FFFDF8]
                            "
                          >
                            CORA
                          </p>


                          <span
                            className="
                              rounded-full
                              bg-[#F6E9CC]
                              px-2
                              py-1
                              text-[6.5px]
                              font-black
                              uppercase
                              tracking-[0.12em]
                              text-[#B47A1B]
                            "
                          >
                            AI Assistant
                          </span>
                        </div>


                        <div
                          className="
                            mt-0.5
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <span
                            className="
                              h-[6px]
                              w-[6px]
                              rounded-full
                              bg-[#51BF79]
                            "
                          />

                          <p
                            className="
                              text-[8px]
                              font-semibold
                              text-[#88A0AE]
                            "
                          >
                            Ready now
                          </p>
                        </div>
                      </div>
                    </div>


                    {/* =======================================
                        INTRO
                        ======================================= */}

                    <div
                      className="
                        ml-[48px]
                        mt-2
                        rounded-[14px]
                        rounded-tl-[5px]
                        bg-[#EEF3F5]
                        px-4
                        py-3
                      "
                    >
                      <p
                        className="
                          text-[11px]
                          font-medium
                          leading-[1.5]
                          text-[#173A52]
                          sm:text-[11.5px]
                        "
                      >
                        Hi, I’m CORA. I can help you write
                        stronger openings, refine executive
                        tone, highlight measurable achievements,
                        and tailor your letter for specific roles.
                      </p>
                    </div>


                    {/* =======================================
                        8 OPTIONS
                        ======================================= */}

                    <p
                      className="
                        mt-3
                        text-[6.5px]
                        font-black
                        uppercase
                        tracking-[0.24em]
                        text-[#7894A6]
                      "
                    >
                      How can I help you today?
                    </p>


                    <div
                      className="
                        mt-2
                        grid
                        gap-2
                        sm:grid-cols-2
                        xl:grid-cols-4
                      "
                    >
                      {assistanceOptions.map(
                        ({
                          icon: Icon,
                          title,
                          item,
                        }) => (
                          <button
                            key={title}
                            type="button"
                            disabled={
                              isLoading
                            }
                            onClick={() =>
                              usePreset(
                                item
                              )
                            }
                            className="
                              group
                              flex
                              min-h-[54px]
                              items-center
                              gap-2.5
                              rounded-[9px]
                              border
                              border-[#E5DED1]
                              bg-[#FFFCF6]
                              px-3
                              py-2
                              text-left
                              transition
                              hover:-translate-y-0.5
                              hover:border-[#D1B679]
                              hover:bg-white
                              disabled:opacity-60
                            "
                          >
                            <Icon
                              size={16}
                              strokeWidth={1.7}
                              className="
                                shrink-0
                                text-[#173B53]
                              "
                            />


                            <span
                              className="
                                flex
                                min-w-0
                                flex-1
                                items-center
                                justify-between
                                gap-1
                              "
                            >
                              <span
                                className="
                                  text-[8.5px]
                                  font-bold
                                  leading-[1.18]
                                  text-[#173A52]
                                "
                              >
                                {title}
                              </span>


                              <ArrowRight
                                size={9}
                                className="
                                  shrink-0
                                  text-[#7895A5]
                                  transition-transform
                                  group-hover:translate-x-0.5
                                "
                              />
                            </span>
                          </button>
                        )
                      )}
                    </div>


                    {/* =======================================
                        ALL 25 PREDEFINED QUESTIONS
                        ======================================= */}

                    <div
                      className="
                        mt-3
                      "
                    >
                      <div
                        className="
                          mb-1.5
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >
                        <p
                          className="
                            text-[6.5px]
                            font-black
                            uppercase
                            tracking-[0.24em]
                            text-[#7894A6]
                          "
                        >
                          More Questions
                        </p>


                        <span
                          className="
                            text-[6px]
                            font-black
                            uppercase
                            tracking-[0.12em]
                            text-[#A1B1BB]
                          "
                        >
                          {presetQuestions.length} common questions
                        </span>
                      </div>


                      <div
                        className="
                          relative
                        "
                      >
                        <select
                          value={
                            selectedPreset
                          }
                          disabled={
                            isLoading
                          }
                          onChange={(
                            event
                          ) => {
                            const value =
                              event.target.value;

                            setSelectedPreset(
                              value
                            );

                            const selected =
                              presetQuestions.find(
                                (
                                  item
                                ) =>
                                  item.question ===
                                  value
                              );

                            if (
                              selected
                            ) {
                              usePreset(
                                selected
                              );
                            }
                          }}
                          className="
                            h-[42px]
                            w-full
                            appearance-none
                            rounded-[9px]
                            border
                            border-[#BCD0DA]
                            bg-white
                            px-3
                            pr-10
                            text-[9px]
                            font-semibold
                            text-[#173A52]
                            outline-none
                            transition
                            hover:border-[#9FB9C7]
                            focus:border-[#C99B3E]
                            focus:ring-2
                            focus:ring-[#DAB96E]/15
                            disabled:opacity-60
                          "
                        >
                          <option
                            value=""
                            disabled
                          >
                            Select from 25 common cover letter questions
                          </option>


                          {presetQuestions.map(
                            (
                              item,
                              index
                            ) => (
                              <option
                                key={
                                  item.question
                                }
                                value={
                                  item.question
                                }
                              >
                                {index + 1}.{' '}
                                {item.question}
                              </option>
                            )
                          )}
                        </select>


                        <ChevronDown
                          size={14}
                          aria-hidden="true"
                          className="
                            pointer-events-none
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-[#658598]
                          "
                        />
                      </div>
                    </div>


                    {/* =======================================
                        ASK ANYTHING
                        ======================================= */}

                    <p
                      className="
                        mt-3
                        text-[6.5px]
                        font-black
                        uppercase
                        tracking-[0.24em]
                        text-[#7894A6]
                      "
                    >
                      Or ask me anything
                    </p>


                    <div
                      className="
                        mt-1.5
                        flex
                        h-[46px]
                        items-center
                        rounded-[10px]
                        border
                        border-[#BCCED8]
                        bg-white
                        p-1
                        transition
                        focus-within:border-[#7FA3B6]
                        focus-within:ring-2
                        focus-within:ring-[#ADC5D3]/20
                      "
                    >
                      <textarea
                        id="cora-inner-question"
                        value={
                          question
                        }
                        onChange={
                          handleQuestionChange
                        }
                        rows={1}
                        placeholder="Ask CORA anything about your cover letter..."
                        className="
                          h-full
                          min-w-0
                          flex-1
                          resize-none
                          bg-transparent
                          px-3
                          py-[9px]
                          text-[10px]
                          font-medium
                          leading-5
                          text-[#173A52]
                          outline-none
                          placeholder:text-[#8DA4B2]
                        "
                      />


                      <button
                        type="button"
                        onClick={
                          askQuestion
                        }
                        disabled={
                          isLoading
                        }
                        aria-label="Ask CORA"
                        className="
                          flex
                          h-[36px]
                          w-[36px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#EAF1F5]
                          text-[#638499]
                          transition
                          hover:bg-[#0B304B]
                          hover:text-white
                          disabled:opacity-50
                        "
                      >
                        {isLoading ? (
                          <img
                            src={
                              coraPng
                            }
                            alt=""
                            className="
                              h-5
                              w-5
                              animate-pulse
                            "
                          />
                        ) : (
                          <Send
                            size={13}
                          />
                        )}
                      </button>
                    </div>


                    {/* error/count */}

                    <div
                      className="
                        mt-1
                        flex
                        min-h-[11px]
                        items-center
                        justify-between
                      "
                    >
                      {error ? (
                        <p
                          className="
                            text-[7px]
                            font-semibold
                            text-[#BC4B4B]
                          "
                        >
                          {error}
                        </p>
                      ) : (
                        <span />
                      )}


                      <p
                        className={`
                          text-[6px]
                          font-bold
                          uppercase
                          tracking-[0.11em]

                          ${
                            charsLeft <
                            40
                              ? 'text-[#BC4B4B]'
                              : 'text-[#829AA8]'
                          }
                        `}
                      >
                        {charsLeft} characters left
                      </p>
                    </div>


                    {/* =======================================
                        QUICK PROMPTS
                        ======================================= */}

                    <div
                      className="
                        mt-1
                        flex
                        flex-wrap
                        items-center
                        gap-1.5
                      "
                    >
                      <span
                        className="
                          mr-1
                          text-[6px]
                          font-black
                          uppercase
                          tracking-[0.13em]
                          text-[#7894A6]
                        "
                      >
                        Suggested prompts
                      </span>


                      {quickSuggestions.map(
                        ({
                          label,
                          item,
                        }) => (
                          <button
                            key={label}
                            type="button"
                            disabled={
                              isLoading
                            }
                            onClick={() =>
                              usePreset(
                                item
                              )
                            }
                            className="
                              rounded-full
                              border
                              border-[#D9E2E7]
                              bg-[#EDF3F6]
                              px-2.5
                              py-1
                              text-[7px]
                              font-semibold
                              text-[#496A7E]
                              transition
                              hover:border-[#B9CDD7]
                              hover:bg-[#E6EFF3]
                              disabled:opacity-60
                            "
                          >
                            {label}
                          </button>
                        )
                      )}
                    </div>


                    {/* =======================================
                        ANSWER
                        ======================================= */}

                    {hasConversation && (
                      <div
                        className="
                          mt-2.5
                          overflow-hidden
                          rounded-[10px]
                          border
                          border-[#E2D2B3]
                          bg-[#FAF4E9]
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-3
                            border-b
                            border-[#E5DAC7]
                            px-3
                            py-1.5
                          "
                        >
                          <div
                            className="
                              min-w-0
                            "
                          >
                            <p
                              className="
                                text-[6px]
                                font-black
                                uppercase
                                tracking-[0.15em]
                                text-[#AF771B]
                              "
                            >
                              CORA&apos;s Answer
                            </p>


                            <p
                              className="
                                mt-0.5
                                truncate
                                text-[8px]
                                font-extrabold
                                text-[#173A52]
                              "
                            >
                              {
                                activeQuestion
                              }
                            </p>
                          </div>


                          <div
                            className="
                              flex
                              shrink-0
                              items-center
                              gap-1
                            "
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setIsAnswerExpanded(
                                  true
                                )
                              }
                              aria-label="Maximize answer"
                              className="
                                flex
                                h-[23px]
                                w-[23px]
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[#C8D5DC]
                                bg-white
                                text-[#5D7D90]
                              "
                            >
                              <Maximize2
                                size={9}
                              />
                            </button>


                            <span
                              className="
                                px-1
                                text-[6.5px]
                                font-bold
                                text-[#77909E]
                              "
                            >
                              {historyIndex + 1}
                              {' / '}
                              {history.length}
                            </span>


                            <button
                              type="button"
                              onClick={() =>
                                setHistoryIndex(
                                  (
                                    current
                                  ) =>
                                    Math.max(
                                      current -
                                        1,
                                      0
                                    )
                                )
                              }
                              disabled={
                                historyIndex ===
                                0
                              }
                              aria-label="Previous question"
                              className="
                                flex
                                h-[23px]
                                w-[23px]
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[#D1D9DD]
                                bg-white/75
                                text-[#6C8796]
                                disabled:opacity-30
                              "
                            >
                              <ArrowLeft
                                size={9}
                              />
                            </button>


                            <button
                              type="button"
                              onClick={() =>
                                setHistoryIndex(
                                  (
                                    current
                                  ) =>
                                    Math.min(
                                      current +
                                        1,
                                      history.length -
                                        1
                                    )
                                )
                              }
                              disabled={
                                historyIndex >=
                                history.length -
                                  1
                              }
                              aria-label="Next question"
                              className="
                                flex
                                h-[23px]
                                w-[23px]
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[#D1D9DD]
                                bg-white/75
                                text-[#6C8796]
                                disabled:opacity-30
                              "
                            >
                              <ArrowRight
                                size={9}
                              />
                            </button>
                          </div>
                        </div>


                        <button
                          type="button"
                          onClick={() =>
                            reviewHistoryItem(
                              activeHistoryItem
                            )
                          }
                          className="
                            block
                            w-full
                            text-left
                          "
                        >
                          <div
                            className="
                              max-h-[70px]
                              overflow-y-auto
                              px-3
                              py-2
                              [scrollbar-width:thin]
                            "
                          >
                            {isLoading ? (
                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  text-[8px]
                                  font-semibold
                                  text-[#637E8E]
                                "
                              >
                                <img
                                  src={
                                    coraPng
                                  }
                                  alt=""
                                  className="
                                    h-4
                                    w-4
                                    animate-pulse
                                  "
                                />

                                CORA is thinking...
                              </div>
                            ) : (
                              <p
                                className="
                                  whitespace-pre-line
                                  text-[8.5px]
                                  font-medium
                                  leading-[1.5]
                                  text-[#35566B]
                                "
                              >
                                {answer}
                              </p>
                            )}
                          </div>
                        </button>
                      </div>
                    )}


                    {/* =======================================
                        PRIMARY CHAT CTA
                        ======================================= */}

                    <button
                      type="button"
                      onClick={
                        startChatWithCora
                      }
                      disabled={
                        isLoading
                      }
                      className="
                        group
                        mt-3
                        inline-flex
                        h-[46px]
                        w-full
                        items-center
                        justify-between
                        rounded-[9px]
                        border
                        border-[#E6BB58]
                        bg-[linear-gradient(110deg,#F1C95F,#E7B344)]
                        px-5
                        text-[12px]
                        font-extrabold
                        text-[#0B304B]
                        shadow-[0_8px_18px_rgba(80,56,13,.11)]
                        transition
                        hover:brightness-105
                        disabled:opacity-60
                      "
                    >
                      <span>
                        {isLoading
                          ? 'CORA is thinking...'
                          : 'Start Chat with CORA'}
                      </span>


                      <ArrowRight
                        size={14}
                        className="
                          transition-transform
                          group-hover:translate-x-1
                        "
                      />
                    </button>
                  </motion.div>
                </div>


                {/* bottom */}

                <div
                  className="
                    mt-4
                    flex
                    flex-col
                    gap-3
                    lg:grid
                    lg:grid-cols-[0.38fr_0.62fr]
                    lg:gap-5
                  "
                >
                  <button
                    type="button"
                    onClick={
                      closeCoraIntroduction
                    }
                    className="
                      inline-flex
                      w-fit
                      items-center
                      gap-2.5
                      text-[10px]
                      font-semibold
                      text-[#57778A]
                      transition
                      hover:text-[#102D47]
                    "
                  >
                    <ArrowLeft
                      size={13}
                    />

                    Back to overview
                  </button>


                  <div
                    className="
                      flex
                      items-center
                      justify-center
                      gap-4
                      text-[6px]
                      font-black
                      uppercase
                      tracking-[0.25em]
                      text-[#86A0AF]
                    "
                  >
                    <span
                      className="
                        h-px
                        w-7
                        bg-[#A5B8C3]
                      "
                    />

                    <span>
                      Same goals. A brighter you.
                    </span>

                    <span
                      className="
                        h-px
                        w-7
                        bg-[#A5B8C3]
                      "
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}


      {/* =====================================================
          EXPANDED ANSWER
          ===================================================== */}

      {isAnswerExpanded && (
        <div
          className="
            fixed
            inset-0
            z-[300]
            flex
            items-center
            justify-center
            bg-[#041522]/80
            p-4
            backdrop-blur-sm
            sm:p-8
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="expanded-answer-title"
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setIsAnswerExpanded(
                false
              );
            }
          }}
        >
          <div
            className="
              flex
              max-h-[min(82dvh,760px)]
              w-full
              max-w-4xl
              flex-col
              overflow-hidden
              rounded-[18px]
              border
              border-[#D7C9AE]
              bg-[#FBF6EC]
              text-[#102D47]
              shadow-[0_28px_90px_rgba(0,0,0,.38)]
            "
          >
            {/* modal header */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-5
                border-b
                border-[#DDD3C3]
                px-5
                py-4
                sm:px-7
                sm:py-5
              "
            >
              <div
                className="
                  min-w-0
                "
              >
                <p
                  className="
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-[#B0791D]
                  "
                >
                  CORA&apos;s Answer
                </p>


                <h3
                  id="expanded-answer-title"
                  className="
                    mt-1
                    text-base
                    font-extrabold
                    leading-snug
                    text-[#17364D]
                    sm:text-lg
                  "
                >
                  {activeQuestion}
                </h3>
              </div>


              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                "
              >
                {history.length >
                  0 && (
                  <>
                    <span
                      className="
                        hidden
                        text-xs
                        font-bold
                        text-[#6D8494]
                        sm:inline
                      "
                    >
                      {historyIndex + 1}
                      {' / '}
                      {history.length}
                    </span>


                    <button
                      type="button"
                      onClick={() =>
                        setHistoryIndex(
                          (
                            current
                          ) =>
                            Math.max(
                              current -
                                1,
                              0
                            )
                        )
                      }
                      disabled={
                        historyIndex ===
                        0
                      }
                      aria-label="Previous question"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#C7D4DC]
                        bg-white/75
                        text-[#46697F]
                        transition
                        hover:bg-white
                        disabled:opacity-30
                      "
                    >
                      <ArrowLeft
                        size={14}
                      />
                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        setHistoryIndex(
                          (
                            current
                          ) =>
                            Math.min(
                              current +
                                1,
                              history.length -
                                1
                            )
                        )
                      }
                      disabled={
                        historyIndex >=
                        history.length -
                          1
                      }
                      aria-label="Next question"
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#C7D4DC]
                        bg-white/75
                        text-[#46697F]
                        transition
                        hover:bg-white
                        disabled:opacity-30
                      "
                    >
                      <ArrowRight
                        size={14}
                      />
                    </button>
                  </>
                )}


                <button
                  type="button"
                  onClick={() =>
                    setIsAnswerExpanded(
                      false
                    )
                  }
                  aria-label="Minimize answer"
                  title="Minimize answer"
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#0B304B]
                    text-white
                    transition
                    hover:bg-[#08273D]
                  "
                >
                  <Minimize2
                    size={15}
                  />
                </button>
              </div>
            </div>


            {/* modal answer */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                px-5
                py-5
                [scrollbar-color:#9eb0ba_transparent]
                [scrollbar-width:thin]
                sm:px-7
                sm:py-7
              "
            >
              {isLoading ? (
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    text-sm
                    font-semibold
                    text-[#577487]
                  "
                >
                  <img
                    src={coraPng}
                    alt=""
                    className="
                      h-7
                      w-7
                      animate-pulse
                      object-contain
                    "
                  />

                  CORA is thinking...
                </div>
              ) : (
                <p
                  className="
                    whitespace-pre-line
                    text-[15px]
                    font-medium
                    leading-7
                    text-[#315268]
                    sm:text-base
                    sm:leading-8
                  "
                >
                  {answer}
                </p>
              )}
            </div>


            {/* modal footer */}

            <div
              className="
                flex
                items-center
                justify-between
                border-t
                border-[#DDD3C3]
                px-5
                py-3
                text-[10px]
                font-bold
                text-[#708696]
                sm:px-7
              "
            >
              <span>
                Expanded reading view
              </span>

              <span>
                Press Esc to minimize
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


export default CoverLetterAssistant;
