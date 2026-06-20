import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { answerCoverLetterQuestion } from '../../services/groqService';
import { useStore } from '../../store/useStore';

const MAX_CHARS = 280;

const presetQuestions = [
  {
    question: 'How do I start a cover letter for a business analyst role?',
    answer: 'Quick answer: Open with fit, not enthusiasm.\n\nBest move: Start with the business problem or role scope you can handle, then connect it to one relevant result.\n\nAvoid: Generic openings that sound copied from AI.',
  },
  {
    question: 'Should I mention salary expectations in my cover letter?',
    answer: 'Quick answer: Usually no.\n\nBest move: Mention compensation only if the job post asks for it directly.\n\nAvoid: Leading with salary before proving fit and value.',
  },
  {
    question: 'How long should my cover letter be?',
    answer: 'Quick answer: Keep it to one page.\n\nBest move: Aim for roughly 250-400 words with a sharp opening, proof, and close.\n\nAvoid: Long background summaries or resume repetition.',
  },
  {
    question: 'How do I tailor a cover letter to a job description?',
    answer: '',
  },
  {
    question: 'Should I use ATS keywords in my cover letter?',
    answer: '',
  },
  {
    question: 'What should I say if I do not know the hiring manager name?',
    answer: '',
  },
  {
    question: 'How do I end a cover letter strongly?',
    answer: '',
  },
  {
    question: 'Should I mention salary expectations in a cover letter?',
    answer: '',
  },
  {
    question: 'Can I use bullet points in a cover letter?',
    answer: '',
  },
  {
    question: 'How do I explain a career gap in a cover letter?',
    answer: '',
  },
  {
    question: 'How can I make my cover letter sound less generic?',
    answer: '',
  },
  {
    question: 'How do I write a cover letter if I am changing industries?',
    answer: '',
  },
  {
    question: 'Should I repeat my resume in my cover letter?',
    answer: '',
  },
  {
    question: 'What tone should a senior executive cover letter use?',
    answer: '',
  },
  {
    question: 'How do I write a cover letter for a product manager role?',
    answer: '',
  },
  {
    question: 'How do I write a cover letter for a marketing manager role?',
    answer: '',
  },
  {
    question: 'How do I write a cover letter for a finance role?',
    answer: '',
  },
  {
    question: 'How do I show leadership impact in a cover letter?',
    answer: '',
  },
  {
    question: 'How many achievements should I include in a cover letter?',
    answer: '',
  },
  {
    question: 'Should I mention why I want this company specifically?',
    answer: '',
  },
  {
    question: 'How do I write a cover letter with no direct experience?',
    answer: '',
  },
  {
    question: 'Can a cover letter be too formal?',
    answer: '',
  },
  {
    question: 'What should I avoid in the first paragraph of a cover letter?',
    answer: '',
  },
  {
    question: 'How do I write a strong cover letter for a startup role?',
    answer: '',
  },
  {
    question: 'What is the best structure for a one-page cover letter?',
    answer: '',
  },
];

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

const CoverLetterAssistant = () => {
  const navigate = useNavigate();
  const resetBuilder = useStore((state) => state.resetBuilder);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(presetQuestions[0].answer);
  const [activeQuestion, setActiveQuestion] = useState(presetQuestions[0].question);
  const [history, setHistory] = useState([
    {
      question: presetQuestions[0].question,
      answer: presetQuestions[0].answer,
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const charsLeft = MAX_CHARS - question.length;

  const openBuilderStart = () => {
    resetBuilder();
    navigate('/builder');
  };

  const isCoverLetterQuestion = useMemo(() => {
    const normalized = question.toLowerCase();
    return coverLetterKeywords.some((keyword) => normalized.includes(keyword));
  }, [question]);
  const activeHistoryItem = history[historyIndex] || history[0];

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value.slice(0, MAX_CHARS));
    setError('');
  };

  const askQuestion = async () => {
    const cleanQuestion = question.trim();

    if (cleanQuestion.length < 10) {
      setError('Ask a little more specifically so Grow can help.');
      return;
    }

    if (!isCoverLetterQuestion) {
      setError('This assistant only answers cover letter questions.');
      return;
    }

    setIsLoading(true);
    setError('');
    setActiveQuestion(cleanQuestion);
    const reply = await answerCoverLetterQuestion(cleanQuestion);
    setAnswer(reply);
    setHistory((current) => {
      const next = [{ question: cleanQuestion, answer: reply }, ...current.filter((item) => item.question !== cleanQuestion)];
      return next.slice(0, 8);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    setHistoryIndex(0);
  }, [history.length]);

  const usePreset = async (item) => {
    setQuestion(item.question);
    setActiveQuestion(item.question);
    setError('');

    if (item.answer) {
      setAnswer(item.answer);
      setHistory((current) => {
        const next = [{ question: item.question, answer: item.answer }, ...current.filter((entry) => entry.question !== item.question)];
        return next.slice(0, 8);
      });
      return;
    }

    setIsLoading(true);
    const reply = await answerCoverLetterQuestion(item.question);
    setAnswer(reply);
    setHistory((current) => {
      const next = [{ question: item.question, answer: reply }, ...current.filter((entry) => entry.question !== item.question)];
      return next.slice(0, 8);
    });
    setIsLoading(false);
  };

  const reviewHistoryItem = (item) => {
    setQuestion(item.question);
    setActiveQuestion(item.question);
    setAnswer(item.answer);
    setError('');
  };

  return (
    <section id="cover-letter-questions" className="relative overflow-hidden bg-[#2F4156] py-14 text-white sm:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(200,217,230,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,217,230,0.10)_1px,transparent_1px)] bg-[size:34px_34px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(200,217,230,0.22),transparent_30%),radial-gradient(circle_at_82%_28%,rgba(86,124,141,0.26),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8D9E6]/80 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 bg-white/5 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#C8D9E6]">
            
            Have a question regarding Cover letter ?
          </p>
          <h2 className="cs-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Can I help with your <span className="text-[#C8D9E6]">Executive letter</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-7 text-[#C8D9E6] sm:mt-6 sm:text-lg sm:leading-8">
            Ask about opening lines, ATS keywords, tailoring, hiring manager salutations, salary mentions, length, or closing strategy. Grow answers quickly and keeps this free helper lightweight.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl items-start gap-6 sm:mt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[22px] bg-white/8 p-4 sm:rounded-[28px] sm:p-5">
            <div className="rounded-2xl bg-white p-4 text-[#2F4156] sm:p-5">
              <textarea
                value={question}
                onChange={handleQuestionChange}
                rows={4}
                placeholder="Example: How should I tailor a cover letter for a product manager role at a fintech company?"
                className="w-full resize-none bg-transparent text-base font-semibold leading-7 text-[#2F4156] outline-none placeholder:text-[#567C8D]/65"
              />
              <div className="mt-4 border-t border-[#C8D9E6] pt-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-[#567C8D]/70">
                    Choose A Common Question
                  </span>
                  <select
                    value={selectedPreset}
                    onChange={(event) => {
                      setSelectedPreset(event.target.value);
                      const selected = presetQuestions.find((item) => item.question === event.target.value);
                      if (selected) usePreset(selected);
                    }}
                    className="w-full rounded-lg border border-[#C8D9E6] bg-[#F5EFEB]/45 px-4 py-3 text-sm font-bold text-[#2F4156] outline-none transition focus:border-[#567C8D] focus:ring-2 focus:ring-[#C8D9E6]/60"
                  >
                    <option value="" disabled>Select from 20+ common questions</option>
                    {presetQuestions.map((item) => (
                      <option key={item.question} value={item.question}>
                        {item.question}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mt-4 border-t border-[#C8D9E6] pt-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className={`text-xs font-black uppercase tracking-[0.14em] ${charsLeft < 40 ? 'text-rose-500' : 'text-[#567C8D]/70'}`}>
                    {charsLeft} characters left
                  </p>
                  <button
                    onClick={askQuestion}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2F4156] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#567C8D] disabled:cursor-wait disabled:opacity-70"
                  >
                    <Sparkles size={17} />
                    {isLoading ? 'Answering...' : 'Ask Grow'}
                  </button>
                </div>
                {error && <p className="mt-3 text-sm font-bold text-rose-600">{error}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white/8 p-4 sm:p-5">
            <div className="rounded-2xl border border-[#C8D9E6]/70 bg-white p-5">
              <p className="text-sm font-black leading-6 text-[#2F4156]">{activeQuestion}</p>
              <p className="mt-4 whitespace-pre-line text-base font-semibold leading-8 text-[#567C8D]">{answer}</p>

              <div className="mt-6 border-t border-[#C8D9E6] pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-[#567C8D]/70">Previous Questions</p>
                  <p className="text-[11px] font-bold text-[#567C8D]/70">Last {history.length}</p>
                </div>
                <div className="rounded-lg border border-[#C8D9E6] bg-[#F5EFEB]/45 p-3">
                  <button
                    onClick={() => reviewHistoryItem(activeHistoryItem)}
                    className="block w-full text-left"
                  >
                    <p className="text-xs font-black text-[#2F4156]">{activeHistoryItem?.question}</p>
                    <p className="mt-1 text-[11px] font-semibold text-[#567C8D]">{activeHistoryItem?.answer}</p>
                  </button>
                  <div className="mt-3 flex items-center justify-between border-t border-[#C8D9E6] pt-3">
                    <p className="text-[11px] font-bold text-[#567C8D]/70">
                      {history.length === 0 ? '0 of 0' : `${historyIndex + 1} of ${history.length}`}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setHistoryIndex((current) => Math.max(current - 1, 0))}
                        disabled={historyIndex === 0}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#C8D9E6] bg-white text-[#567C8D] transition hover:bg-[#F5EFEB] disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Previous question"
                      >
                        <ArrowLeft size={14} />
                      </button>
                      <button
                        onClick={() => setHistoryIndex((current) => Math.min(current + 1, history.length - 1))}
                        disabled={historyIndex >= history.length - 1}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#C8D9E6] bg-white text-[#567C8D] transition hover:bg-[#F5EFEB] disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Next question"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={openBuilderStart}
              className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#C8D9E6] transition hover:text-white"
            >
              Choose a building option
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverLetterAssistant;
