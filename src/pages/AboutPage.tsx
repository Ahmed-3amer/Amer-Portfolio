import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, Download, FileText } from 'lucide-react';
import { useCvModal } from '@/context/CvModalContext';
import { ABOUT_CONTENT, PROFILE } from '@/data/profile';

export function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { openCvModal } = useCvModal();

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-reveal]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          force3D: true,
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen w-full">
      {/* Top Wood Studio Perspective Header */}
      <header className="relative w-full overflow-hidden px-6 pt-32 pb-14 md:px-14 md:pt-40 md:pb-16">
        <div
          aria-hidden="true"
          className="window-cast-shadow"
          style={{ opacity: 0.22 }}
        />
        <div aria-hidden="true" className="night-desk-lamp" />

        <div className="relative z-10">
          <p
            data-about-reveal
            className="font-mono-tech text-[11px] font-medium tracking-[0.24em] uppercase"
            style={{ color: 'var(--brass)' }}
          >
            02 / {ABOUT_CONTENT.eyebrow}
          </p>
          <h1
            data-about-reveal
            className="font-display mt-4 max-w-4xl text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.98] tracking-[-0.02em]"
            style={{ color: 'var(--ink-primary)' }}
          >
            {ABOUT_CONTENT.headline}
          </h1>

          <div
            data-about-reveal
            className="font-mono-tech mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 border-t pt-5 text-[11px] tracking-[0.18em] uppercase"
            style={{
              borderColor: 'var(--hairline)',
              color: 'var(--ink-secondary)',
            }}
          >
            <span>{PROFILE.name}</span>
            <span style={{ color: 'var(--brass)' }}>{PROFILE.role}</span>
            <span>06 Shipped Works</span>
            <span>React · Next.js · TypeScript</span>
          </div>
        </div>
      </header>

      {/* Full-Bleed Archival Paper Sheet: Perspective, Path & Craft */}
      <section
        aria-label="Frontend perspective, working principles, and core craft"
        className="archival-paper paper-elevation relative z-10 w-full border-y"
        style={{ borderColor: 'var(--hairline)' }}
      >
        {/* Part 1: Personal Perspective, Passion & Courses/Scholarships Foundation */}
        <div
          className="grid w-full grid-cols-1 border-b lg:grid-cols-12"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <aside
            className="flex flex-col justify-between gap-8 border-b px-6 py-12 md:px-14 md:py-16 lg:col-span-4 lg:border-r lg:border-b-0"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <div>
              <p
                className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
                style={{ color: 'var(--brass)' }}
              >
                01 / Path &amp; Perspective
              </p>
              <h2
                className="font-display mt-3 text-3xl leading-snug md:text-4xl"
                style={{ color: 'var(--ink-primary)' }}
              >
                Curiosity turned into disciplined frontend craft.
              </h2>
            </div>

            <div
              className="space-y-3 border-t pt-6"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <p
                className="font-mono-tech text-[10px] tracking-[0.2em] uppercase"
                style={{ color: 'var(--brass)' }}
              >
                Foundation Highlights
              </p>
              <ul className="space-y-2 text-sm leading-relaxed" style={{ color: 'var(--ink-secondary)' }}>
                <li>Genuine focus on visual clarity, layout &amp; code</li>
                <li>Structured courses &amp; intensive scholarships</li>
                <li>Real-world collaborative &amp; client engineering</li>
              </ul>
            </div>
          </aside>

          <div className="space-y-6 px-6 py-12 md:px-14 md:py-16 lg:col-span-8">
            {ABOUT_CONTENT.perspective.map((paragraph, idx) => (
              <p
                key={idx}
                data-about-reveal
                className={
                  idx === 0
                    ? 'text-lg leading-[1.78] md:text-xl'
                    : 'text-base leading-[1.8] md:text-[1.05rem]'
                }
                style={{
                  color:
                    idx === 0 ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Part 2: 4 Grounded Working Principles */}
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
              02 / Working Principles
            </p>
            <h2
              className="font-display mt-3 text-3xl leading-snug md:text-4xl"
              style={{ color: 'var(--ink-primary)' }}
            >
              How every interface is shaped.
            </h2>
          </div>

          <div
            className="divide-y lg:col-span-8"
            style={{ borderColor: 'var(--hairline)' }}
          >
            {ABOUT_CONTENT.workingPrinciples.map((principle) => (
              <div
                key={principle.index}
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

        {/* Part 3: Core Craft & Tools (3 Verified Pillars, Zero Fake Percentages) */}
        <div
          className="grid w-full grid-cols-1 divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0"
          style={{ borderColor: 'var(--hairline)' }}
        >
          {ABOUT_CONTENT.craftGroups.map((group, idx) => (
            <div
              key={group.id}
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
      </section>

      {/* Bottom Wood Studio Band: Formal Credentials & CV Direct Bridge */}
      <section
        aria-label="Curriculum Vitae access"
        className="relative z-10 w-full px-6 py-16 md:px-14 md:py-20"
      >
        <div
          className="archival-paper paper-elevation border p-7 md:p-12"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <p
            className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
            style={{ color: 'var(--brass)' }}
          >
            03 / Formal Credentials &amp; Curriculum Vitae
          </p>
          <p
            className="mt-4 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: 'var(--ink-primary)' }}
          >
            {ABOUT_CONTENT.cvBridgeNote}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
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
              <FileText size={14} strokeWidth={1.7} aria-hidden="true" />
              <span>Preview CV</span>
            </button>

            <a
              href={PROFILE.cv.pdfUrl}
              download={PROFILE.cv.pdfFileName}
              className="font-mono-tech surface-transition inline-flex items-center gap-2 border px-5 py-3 text-[11px] tracking-[0.18em] uppercase hover:opacity-80"
              style={{
                backgroundColor: 'var(--paper-secondary)',
                color: 'var(--ink-primary)',
                borderColor: 'var(--hairline)',
              }}
            >
              <Download
                size={13}
                strokeWidth={1.7}
                style={{ color: 'var(--brass)' }}
                aria-hidden="true"
              />
              <span>Download PDF</span>
            </a>

            <a
              href={PROFILE.cv.docxUrl}
              download={PROFILE.cv.docxFileName}
              className="font-mono-tech surface-transition inline-flex items-center gap-2 border px-5 py-3 text-[11px] tracking-[0.18em] uppercase hover:opacity-80"
              style={{
                backgroundColor: 'var(--paper-secondary)',
                color: 'var(--ink-primary)',
                borderColor: 'var(--hairline)',
              }}
            >
              <Download
                size={13}
                strokeWidth={1.7}
                style={{ color: 'var(--brass)' }}
                aria-hidden="true"
              />
              <span>Download Word (.docx)</span>
            </a>
          </div>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-7"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <Link
            to="/work"
            className="font-mono-tech surface-transition inline-flex items-center gap-2 border-b pb-1 text-xs tracking-[0.18em] uppercase hover:opacity-75"
            style={{ color: 'var(--ink-primary)', borderColor: 'var(--brass)' }}
          >
            <span>Explore Selected Work</span>
            <ArrowRight
              size={14}
              strokeWidth={1.7}
              style={{ color: 'var(--brass)' }}
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/contact"
            className="font-mono-tech surface-transition inline-flex items-center gap-2 border-b pb-1 text-xs tracking-[0.18em] uppercase hover:opacity-75"
            style={{ color: 'var(--ink-primary)', borderColor: 'var(--hairline)' }}
          >
            <span>Direct Correspondence</span>
            <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
