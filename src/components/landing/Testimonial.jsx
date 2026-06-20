import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import kreetiImage from '../../assets/Kreeti-520.jpg';
import AnamikaImage from '../../assets/anamika.png';
import naveenImage from '../../assets/Naveen-520.jpg';
import priyaImage from '../../assets/Priya-520.jpg';
import padmaImage from '../../assets/Padma-520.jpg';
import rohitImage from '../../assets/Rohit.png';
import cheluvarajuImage from '../../assets/R.Cheluvaraju.png';

const testimonials = [
{
  name: 'Rohit',
  role: 'Gamer',
  text: 'The gaming template immediately stood out to me. It felt creative, sharp, and actually matched my personality while still keeping the cover letter structured and easy to send professionally.',
  image: rohitImage,
},
{
  name: 'R. Cheluvaraju',
  role: 'Senior Software Developer at Google',
  text: 'CareerSense helped me turn technical experience into a cover letter that felt concise, relevant, and much more polished. The structure made it easy to highlight impact without overcomplicating the message.',
  image: cheluvarajuImage,
},
{
  name: 'Anamika Mathur',
  role: 'CEO',
  text: 'CareerSense helped me shape my experience into a cover letter that felt clear and confident. It saved time, but more importantly, the draft actually sounded like something I would send.',
  image: AnamikaImage,
},
{
  name: 'Naveen Malhotra',
  role: 'Senior Director',
  text: 'What I liked most was how direct the letter felt. It did not overdo the language, but still brought out the important parts of my experience clearly.',
  image: naveenImage,
},
{
  name: 'Priya Patel',
  role: 'Senior Lead, Human Resource Management',
  text: 'CareerSense makes the cover letter feel more specific to the role instead of sounding like a generic template. The structure is simple, professional, and easy to review.',
  image: priyaImage,
},
{
  name: 'Padma Thyagarajan',
  role: 'Senior Partner, Law Firm',
  text: 'The templates are clean and practical. They give me a strong starting point without making the letter feel overly polished or artificial.',
  image: padmaImage,
},
];

const Testimonial = () => {
  const [page, setPage] = useState(0);
  const visible = useMemo(() => {
    const start = page * 2;
    return testimonials.slice(start, start + 2);
  }, [page]);
  const pageCount = Math.ceil(testimonials.length / 2);

  return (
    <section id="testimonials" className="border-y border-[#C8D9E6] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="cs-card overflow-hidden rounded-[28px]">
          <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#567C8D]">Executive proof</p>
              <h2 className="cs-display mt-4 text-4xl font-extrabold tracking-tight text-slate-950 md:text-3xl">
                Stronger letters, calmer senior searches.
              </h2>
              <p className="mt-5 max-w-md text-base font-semibold leading-8 text-[#567C8D]">
                CareerSense is built for professionals who need polished, specific application writing without losing their voice.
              </p>
              <div className="mt-8 flex gap-2">
                <button
                  onClick={() => setPage((current) => (current === 0 ? pageCount - 1 : current - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C8D9E6] bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-[#567C8D]"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setPage((current) => (current + 1) % pageCount)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C8D9E6] bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-[#567C8D]"
                  aria-label="Next testimonials"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.28 }}
                className="grid gap-5 md:grid-cols-2"
              >
                {visible.map((testimonial) => (
                  <article key={testimonial.name} className="overflow-hidden rounded-2xl border border-[#C8D9E6] bg-white/90 shadow-sm backdrop-blur">
                    <div className="h-48 overflow-hidden bg-slate-100">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#C8D9E6] text-[#567C8D]">
                        <Quote size={18} />
                      </div>
                      <p className="text-sm font-semibold leading-7 text-slate-600">{testimonial.text}</p>
                      <div className="mt-6">
                        <h3 className="cs-display font-extrabold text-slate-950">{testimonial.name}</h3>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
