import { useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import { PROFILE } from '@/data/profile';

const EMPHASIZED_WORDS = new Set([
  'visual',
  'hierarchy,',
  'responsive',
  'structure,',
  'steady',
  'performance.',
]);

export function OpeningNoteScene() {
  const sectionRef = useRef<HTMLElement>(null);

  const words = useMemo(() => PROFILE.teaserNote.split(' '), []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const wordNodes = gsap.utils.toArray<HTMLElement>('[data-lit-word]');
      if (wordNodes.length > 0 && sectionRef.current) {
        gsap.fromTo(
          wordNodes,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.045,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 76%',
              end: 'bottom 52%',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      gsap.fromTo(
        '[data-note-meta]',
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Opening studio note"
      className="archival-paper paper-elevation relative w-full overflow-hidden border-y"
      style={{ borderColor: 'var(--hairline)' }}
    >
      {/* Subtle sunlight / moonlight window shadow touching upper-right paper edge */}
      <div
        aria-hidden="true"
        className="window-cast-shadow"
        style={{ opacity: 0.16 }}
      />

      <div className="relative z-10 grid w-full grid-cols-1 gap-12 px-6 py-24 md:px-14 md:py-36 lg:grid-cols-12 lg:gap-10">
        {/* Left Architectural Marginalia */}
        <aside className="flex flex-col justify-between gap-8 lg:col-span-4">
          <div data-note-meta className="space-y-4">
            <p
              className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
              style={{ color: 'var(--brass)' }}
            >
              01 / Opening Note
            </p>
            <div
              aria-hidden="true"
              className="h-px w-14"
              style={{ backgroundColor: 'var(--brass)' }}
            />
            <p
              className="font-mono-tech text-[11px] leading-relaxed tracking-[0.16em] uppercase"
              style={{ color: 'var(--ink-secondary)' }}
            >
              Studio Practice
              <br />
              React · Next.js · TypeScript
            </p>
          </div>

          <p
            data-note-meta
            className="font-mono-tech hidden text-[10px] tracking-[0.2em] uppercase lg:block"
            style={{ color: 'var(--ink-muted)' }}
          >
            Next — Approaching the Window
          </p>
        </aside>

        {/* Right Scroll-Lit Reading Column */}
        <div className="lg:col-span-8">
          <p
            className="font-display text-[clamp(2rem,3.9vw,3.65rem)] leading-[1.2] tracking-[-0.015em]"
            style={{ color: 'var(--ink-primary)' }}
          >
            {words.map((word, index) => {
              const isItalic = EMPHASIZED_WORDS.has(word.toLowerCase());
              return (
                <span
                  key={`${word}-${index}`}
                  data-lit-word
                  className={
                    isItalic
                      ? 'mr-[0.26em] inline-block italic'
                      : 'mr-[0.26em] inline-block'
                  }
                >
                  {word}
                </span>
              );
            })}
          </p>

          <div
            data-note-meta
            className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t pt-7"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <Link
              to="/about"
              className="font-mono-tech group inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase transition-opacity hover:opacity-75"
              style={{ color: 'var(--ink-primary)' }}
            >
              <span
                className="border-b pb-1"
                style={{ borderColor: 'var(--brass)' }}
              >
                Read Studio Perspective
              </span>
              <ArrowRight
                size={15}
                strokeWidth={1.65}
                style={{ color: 'var(--brass)' }}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>

            <span
              className="font-mono-tech text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'var(--ink-muted)' }}
            >
              Calm Craft · Dependable Engineering
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
