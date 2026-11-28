import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, FileText } from 'lucide-react';
import { useCvModal } from '@/context/CvModalContext';
import { ABOUT_CONTENT } from '@/data/profile';

export function StudioCraftScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const thresholdRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const { openCvModal } = useCvModal();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Return-Indoors Camera Pull-Back: smoothly settles back onto the studio desk from the open sky
      if (shadowRef.current) {
        gsap.fromTo(
          shadowRef.current,
          { x: -24 },
          {
            x: 18,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      if (thresholdRef.current) {
        gsap.fromTo(
          thresholdRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: thresholdRef.current,
              start: 'top 86%',
              once: true,
            },
          },
        );
      }

      if (sheetRef.current) {
        gsap.fromTo(
          sheetRef.current,
          { y: 36, scale: 0.986 },
          {
            y: 0,
            scale: 1,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: sheetRef.current,
              start: 'top 95%',
              end: 'top 38%',
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      gsap.fromTo(
        '[data-craft-row]',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 74%',
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
      aria-label="Act III: Back at the studio desk — working principles and craft"
      className="relative w-full overflow-hidden pt-28 md:pt-36"
    >
      {/* Indoor Wooden Desk Return Atmosphere */}
      <div
        ref={shadowRef}
        aria-hidden="true"
        className="window-cast-shadow will-change-transform"
        style={{ opacity: 0.24 }}
      />
      <div aria-hidden="true" className="night-desk-lamp" />

      {/* Indoor Threshold Caption sitting directly on the oak / walnut wood */}
      <div
        ref={thresholdRef}
        className="relative z-10 flex flex-wrap items-end justify-between gap-6 px-6 pb-10 md:px-14 md:pb-12"
      >
        <div>
          <p
            className="font-mono-tech text-[11px] font-medium tracking-[0.24em] uppercase"
            style={{ color: 'var(--brass)' }}
          >
            Act III · Back at the Studio Desk
          </p>
          <h2
            className="font-display mt-2 text-[clamp(2.5rem,5.2vw,4.8rem)] leading-[0.96] tracking-[-0.02em]"
            style={{ color: 'var(--ink-primary)' }}
          >
            Principles <em className="italic">&amp; Craft.</em>
          </h2>
        </div>

        <Link
          to="/about"
          className="font-mono-tech inline-flex items-center gap-2.5 border-b pb-1 text-xs tracking-[0.18em] uppercase transition-opacity hover:opacity-75"
          style={{
            color: 'var(--ink-primary)',
            borderColor: 'var(--brass)',
          }}
        >
          <span>Full Studio Perspective</span>
          <ArrowRight
            size={14}
            strokeWidth={1.7}
            style={{ color: 'var(--brass)' }}
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Full-Bleed Edge-to-Edge Archival Specification Sheet */}
      <div
        ref={sheetRef}
        className="archival-paper paper-elevation relative z-10 w-full border-y will-change-transform"
        style={{ borderColor: 'var(--hairline)' }}
      >
        {/* Part A: 4 Grounded Working Principles */}
        <div
          className="grid w-full grid-cols-1 border-b lg:grid-cols-12"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div
            className="border-b px-6 py-12 md:px-14 md:py-16 lg:col-span-4 lg:border-r lg:border-b-0"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <p
              className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
              style={{ color: 'var(--brass)' }}
            >
              04 / Working Principles
            </p>
            <p
              className="font-display mt-4 text-3xl leading-snug md:text-4xl"
              style={{ color: 'var(--ink-primary)' }}
            >
              Quiet structure over visual noise.
            </p>
            <p
              className="mt-4 text-sm leading-relaxed md:text-base"
              style={{ color: 'var(--ink-secondary)' }}
            >
              Every engineering decision is shaped by clarity, long-term
              maintainability, and how real people actually move through an
              interface.
            </p>
          </div>

          <div className="divide-y lg:col-span-8" style={{ borderColor: 'var(--hairline)' }}>
            {ABOUT_CONTENT.workingPrinciples.map((principle) => (
              <div
                key={principle.index}
                data-craft-row
                className="grid grid-cols-1 gap-3 px-6 py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:px-12 lg:py-9"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <span
                  className="font-mono-tech text-xs tracking-[0.2em] md:col-span-2"
                  style={{ color: 'var(--brass)' }}
                >
                  {principle.index}
                </span>
                <h3
                  className="font-identity text-lg font-semibold tracking-[-0.02em] md:col-span-4 md:text-xl"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {principle.title}
                </h3>
                <p
                  className="text-sm leading-relaxed md:col-span-6 md:text-[0.95rem]"
                  style={{ color: 'var(--ink-secondary)' }}
                >
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Part B: 3 Verified Core Craft Pillars (Zero Fake Percentages) */}
        <div
          className="grid w-full grid-cols-1 divide-y border-b lg:grid-cols-3 lg:divide-x lg:divide-y-0"
          style={{ borderColor: 'var(--hairline)' }}
        >
          {ABOUT_CONTENT.craftGroups.map((group, idx) => (
            <div
              key={group.id}
              data-craft-row
              className="px-6 py-11 md:px-12 md:py-14"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <p
                className="font-mono-tech text-[10px] tracking-[0.22em] uppercase"
                style={{ color: 'var(--brass)' }}
              >
                0{idx + 1} / Craft Area
              </p>
              <h3
                className="font-identity mt-3 text-xl font-semibold tracking-[-0.02em]"
                style={{ color: 'var(--ink-primary)' }}
              >
                {group.label}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: 'var(--ink-secondary)' }}
              >
                {group.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="font-mono-tech border-b pb-1 text-[11px] tracking-[0.08em]"
                    style={{
                      color: 'var(--ink-primary)',
                      borderColor: 'var(--hairline)',
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Part C: Formal Background & CV Preview Bridge */}
        <div className="flex flex-wrap items-center justify-between gap-6 px-6 py-9 md:px-14">
          <p
            className="max-w-2xl text-sm leading-relaxed md:text-base"
            style={{ color: 'var(--ink-secondary)' }}
          >
            {ABOUT_CONTENT.cvBridgeNote}
          </p>

          <button
            type="button"
            onClick={openCvModal}
            className="font-mono-tech surface-transition inline-flex cursor-pointer items-center gap-2.5 border px-5 py-3 text-[11px] tracking-[0.18em] uppercase hover:opacity-85"
            style={{
              backgroundColor: 'var(--ink-primary)',
              color: 'var(--paper-primary)',
              borderColor: 'var(--ink-primary)',
            }}
          >
            <FileText size={14} strokeWidth={1.65} aria-hidden="true" />
            <span>Preview &amp; Download CV</span>
          </button>
        </div>
      </div>
    </section>
  );
}
