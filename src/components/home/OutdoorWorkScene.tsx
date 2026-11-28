import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECT_CHAPTERS, PROJECTS, type Project } from '@/data/projects';

function ChapterFolioActions({ project }: { project: Project }) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-5">
      <Link
        to={`/work/${project.slug}`}
        className="font-mono-tech group inline-flex items-center gap-2.5 border px-5 py-3 text-[11px] tracking-[0.18em] uppercase transition-opacity hover:opacity-85"
        style={{
          backgroundColor: 'var(--ink-primary)',
          color: 'var(--paper-primary)',
          borderColor: 'var(--ink-primary)',
        }}
      >
        <span>Read Case Study</span>
        <ArrowRight
          size={13}
          strokeWidth={1.7}
          aria-hidden="true"
        />
      </Link>

      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono-tech group inline-flex items-center gap-1.5 border-b pb-1 text-[11px] tracking-[0.18em] uppercase transition-opacity hover:opacity-75"
        style={{
          color: 'var(--ink-primary)',
          borderColor: 'var(--brass)',
        }}
      >
        <span>Live Site</span>
        <ArrowUpRight
          size={13}
          strokeWidth={1.7}
          style={{ color: 'var(--brass)' }}
          aria-hidden="true"
        />
      </a>
    </div>
  );
}

export function OutdoorWorkScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  const chapter1 = PROJECT_CHAPTERS[0];
  const chapter2 = PROJECT_CHAPTERS[1];
  const chapter3 = PROJECT_CHAPTERS[2];

  const [makkahLab, patronMedical] = PROJECTS.filter(
    (p) => p.chapter === 'chapter-1',
  );
  const [solutionGroup, architectPortfolio, exclusiveEcommerce] =
    PROJECTS.filter((p) => p.chapter === 'chapter-2');
  const [weatherApp] = PROJECTS.filter((p) => p.chapter === 'chapter-3');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const isDesktop = window.innerWidth >= 1024;

    const ctx = gsap.context(() => {
      // 1) Horizontal Drift Headlines on Chapter banners (bounded inside outer padding so letters never clip)
      gsap.utils.toArray<HTMLElement>('[data-drift-left]').forEach((el) => {
        gsap.fromTo(
          el,
          { x: isDesktop ? 36 : 12 },
          {
            x: 0,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom 25%',
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-drift-right]').forEach((el) => {
        gsap.fromTo(
          el,
          { x: isDesktop ? -20 : -8 },
          {
            x: isDesktop ? 24 : 8,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom 25%',
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      // 2) Internal Image Mask Parallax on every project photographic plate (subtle bleed preserving UI text)
      gsap.utils.toArray<HTMLElement>('[data-plate-img]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -2.2, scale: 1.045 },
          {
            yPercent: 2.2,
            scale: 1.015,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: img.parentElement ?? img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      // 3) Asymmetric Dual-Speed Parallax in Chapter II (Desktop only for crisp mobile flow)
      if (isDesktop) {
        gsap.utils.toArray<HTMLElement>('[data-parallax-slow]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 22 },
            {
              y: -22,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.35,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-parallax-fast]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 56 },
            {
              y: -52,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.35,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      }

      // 4) Clean Paper-Edge Editorial Reveals for project text panels
      gsap.utils.toArray<HTMLElement>('[data-editorial-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              once: true,
            },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="selected-work" ref={rootRef} className="relative w-full">
      {/* ====================================================================
          CHAPTER I — SYSTEMS BUILT FOR REAL OPERATIONS (Full-Bleed Folios)
         ==================================================================== */}
      <section
        aria-label="Chapter I: Systems Built for Real Operations"
        className="outdoor-stone-surface relative w-full overflow-hidden border-t"
        style={{ borderColor: 'var(--hairline)' }}
      >
        {/* Chapter I Full-Bleed Architectural Header with Horizontal Drift */}
        <div
          className="border-b px-6 pt-20 pb-14 md:px-14 md:pt-28 md:pb-16"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p
              className="font-mono-tech text-[11px] tracking-[0.24em] uppercase"
              style={{ color: 'var(--brass)' }}
            >
              {chapter1.label} · 01 — 02
            </p>
            <p
              className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
              style={{ color: 'var(--ink-muted)' }}
            >
              Enterprise &amp; Clinical Platforms
            </p>
          </div>

          <div className="mt-5">
            <h2
              data-drift-left
              className="font-display text-[clamp(2.8rem,6.4vw,6.2rem)] leading-[0.95] tracking-[-0.02em] will-change-transform"
              style={{ color: 'var(--ink-primary)' }}
            >
              Systems Built for
            </h2>
            <h2
              data-drift-right
              className="font-display pl-[4vw] text-[clamp(2.8rem,6.4vw,6.2rem)] leading-[0.95] tracking-[-0.02em] italic will-change-transform md:pl-[10vw]"
              style={{ color: 'var(--ink-primary)' }}
            >
              Real Operations.
            </h2>
          </div>

          <p
            className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: 'var(--ink-secondary)' }}
          >
            {chapter1.subtitle}
          </p>
        </div>

        {/* PROJECT 01 — MAKKAH LAB (LIS): Full-Bleed Asymmetric Split */}
        {makkahLab && (
          <article
            className="grid w-full grid-cols-1 border-b lg:grid-cols-[1.35fr_0.85fr]"
            style={{ borderColor: 'var(--hairline)' }}
          >
            {/* Left Full-Bleed Visual Plate (Preserves native 16:10 composition without cropping UI) */}
            <div
              className="relative flex items-center overflow-hidden border-b lg:border-r lg:border-b-0"
              style={{
                borderColor: 'var(--hairline)',
                backgroundColor: 'var(--outdoor-secondary)',
              }}
            >
              <Link
                to={`/work/${makkahLab.slug}`}
                className="group block aspect-16/10 w-full overflow-hidden"
                aria-label={`Open ${makkahLab.title} case study`}
              >
                <img
                  data-plate-img
                  src={makkahLab.screenshotPath}
                  alt={`${makkahLab.title} live interface preview`}
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center will-change-transform"
                />
              </Link>
              <span
                className="font-mono-tech pointer-events-none absolute bottom-4 left-5 border px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase"
                style={{
                  backgroundColor: 'var(--paper-primary)',
                  color: 'var(--ink-primary)',
                  borderColor: 'var(--hairline)',
                }}
              >
                {makkahLab.index} · {makkahLab.engagement}
              </span>
            </div>

            {/* Right Architectural Dossier Specs */}
            <div
              data-editorial-reveal
              className="flex flex-col justify-between px-6 py-10 md:px-10 md:py-12 lg:px-12"
            >
              <div>
                <p
                  className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--brass)' }}
                >
                  {makkahLab.index} / {makkahLab.category}
                </p>

                <h3
                  className="font-identity mt-3 text-[clamp(1.75rem,2.8vw,2.55rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {makkahLab.shortTitle}
                </h3>

                <p
                  className="mt-4 text-[0.95rem] leading-[1.68]"
                  style={{ color: 'var(--ink-secondary)' }}
                >
                  {makkahLab.summary}
                </p>

                {/* Crisp Architectural Highlights Ledger */}
                <ul
                  className="mt-6 divide-y border-y"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  {makkahLab.highlights.slice(0, 3).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-4 py-3 text-sm leading-relaxed"
                      style={{
                        borderColor: 'var(--hairline)',
                        color: 'var(--ink-primary)',
                      }}
                    >
                      <span
                        className="font-mono-tech shrink-0 pt-0.5 text-[10px] tracking-[0.16em]"
                        style={{ color: 'var(--brass)' }}
                      >
                        0{idx + 1}
                      </span>
                      <span style={{ opacity: 0.88 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <p
                  className="font-mono-tech text-[10px] leading-relaxed tracking-[0.14em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {makkahLab.technologies.slice(0, 8).join(' · ')}
                </p>
                <ChapterFolioActions project={makkahLab} />
              </div>
            </div>
          </article>
        )}

        {/* PROJECT 02 — PATRON MEDICAL GROUP: Reversed Full-Bleed Split */}
        {patronMedical && (
          <article
            className="grid w-full grid-cols-1 border-b lg:grid-cols-[0.85fr_1.35fr]"
            style={{ borderColor: 'var(--hairline)' }}
          >
            {/* Left Specs (Order 2 on mobile, Order 1 on desktop) */}
            <div
              data-editorial-reveal
              className="order-2 flex flex-col justify-between px-6 py-10 md:px-10 md:py-12 lg:order-1 lg:border-r lg:px-12"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div>
                <p
                  className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--brass)' }}
                >
                  {patronMedical.index} / {patronMedical.category}
                </p>

                <h3
                  className="font-identity mt-3 text-[clamp(1.75rem,2.8vw,2.55rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {patronMedical.shortTitle}
                </h3>

                <p
                  className="mt-4 text-[0.95rem] leading-[1.68]"
                  style={{ color: 'var(--ink-secondary)' }}
                >
                  {patronMedical.summary}
                </p>

                <ul
                  className="mt-6 divide-y border-y"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  {patronMedical.highlights.slice(0, 3).map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-4 py-3 text-sm leading-relaxed"
                      style={{
                        borderColor: 'var(--hairline)',
                        color: 'var(--ink-primary)',
                      }}
                    >
                      <span
                        className="font-mono-tech shrink-0 pt-0.5 text-[10px] tracking-[0.16em]"
                        style={{ color: 'var(--brass)' }}
                      >
                        0{idx + 1}
                      </span>
                      <span style={{ opacity: 0.88 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <p
                  className="font-mono-tech text-[10px] leading-relaxed tracking-[0.14em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {patronMedical.technologies.slice(0, 8).join(' · ')}
                </p>
                <ChapterFolioActions project={patronMedical} />
              </div>
            </div>

            {/* Right Full-Bleed Visual Plate (Preserves native 16:10 composition without cropping UI) */}
            <div
              className="relative order-1 flex items-center overflow-hidden border-b lg:order-2 lg:border-b-0"
              style={{
                borderColor: 'var(--hairline)',
                backgroundColor: 'var(--outdoor-secondary)',
              }}
            >
              <Link
                to={`/work/${patronMedical.slug}`}
                className="group block aspect-16/10 w-full overflow-hidden"
                aria-label={`Open ${patronMedical.title} case study`}
              >
                <img
                  data-plate-img
                  src={patronMedical.screenshotPath}
                  alt={`${patronMedical.title} live interface preview`}
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center will-change-transform"
                />
              </Link>
              <span
                className="font-mono-tech pointer-events-none absolute right-5 bottom-4 border px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase"
                style={{
                  backgroundColor: 'var(--paper-primary)',
                  color: 'var(--ink-primary)',
                  borderColor: 'var(--hairline)',
                }}
              >
                {patronMedical.index} · {patronMedical.engagement}
              </span>
            </div>
          </article>
        )}
      </section>

      {/* ====================================================================
          CHAPTER II — DIGITAL SPACES & COMMERCE (Asymmetric Dual-Speed Spreads)
         ==================================================================== */}
      <section
        aria-label="Chapter II: Digital Spaces and Commerce"
        className="outdoor-stone-surface relative w-full overflow-hidden"
      >
        {/* Chapter II Full-Bleed Header with Opposing Horizontal Drift */}
        <div
          className="border-b px-6 pt-24 pb-14 md:px-14 md:pt-32 md:pb-16"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p
              className="font-mono-tech text-[11px] tracking-[0.24em] uppercase"
              style={{ color: 'var(--brass)' }}
            >
              {chapter2.label} · 03 — 05
            </p>
            <p
              className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
              style={{ color: 'var(--ink-muted)' }}
            >
              Architecture, Portfolios &amp; Multi-Role Commerce
            </p>
          </div>

          <div className="mt-5">
            <h2
              data-drift-right
              className="font-display text-[clamp(2.8rem,6.4vw,6.2rem)] leading-[0.95] tracking-[-0.02em] will-change-transform"
              style={{ color: 'var(--ink-primary)' }}
            >
              Digital Spaces
            </h2>
            <h2
              data-drift-left
              className="font-display pl-[4vw] text-[clamp(2.8rem,6.4vw,6.2rem)] leading-[0.95] tracking-[-0.02em] italic will-change-transform md:pl-[12vw]"
              style={{ color: 'var(--ink-primary)' }}
            >
              &amp; Commerce.
            </h2>
          </div>

          <p
            className="mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: 'var(--ink-secondary)' }}
          >
            {chapter2.subtitle}
          </p>
        </div>

        {/* ASYMMETRIC DUAL-SPEED EDITORIAL SPREAD: 03 Solution Group + 04 Architect Portfolio */}
        <div
          className="grid w-full grid-cols-1 border-b lg:grid-cols-12"
          style={{ borderColor: 'var(--hairline)' }}
        >
          {/* 03 — Solution Group (Wider Left Architectural Column, Slower Parallax) */}
          {solutionGroup && (
            <article
              data-parallax-slow
              className="flex flex-col justify-between border-b px-6 py-14 will-change-transform md:px-14 md:py-20 lg:col-span-7 lg:border-r lg:border-b-0"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div>
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <span
                    className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: 'var(--brass)' }}
                  >
                    {solutionGroup.index} / {solutionGroup.category}
                  </span>
                  <span
                    className="font-mono-tech text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: 'var(--ink-muted)' }}
                  >
                    {solutionGroup.engagement}
                  </span>
                </div>

                <Link
                  to={`/work/${solutionGroup.slug}`}
                  className="block aspect-16/10 w-full overflow-hidden border"
                  style={{
                    borderColor: 'var(--hairline)',
                    backgroundColor: 'var(--outdoor-secondary)',
                  }}
                >
                  <img
                    data-plate-img
                    src={solutionGroup.screenshotPath}
                    alt={`${solutionGroup.title} live interface preview`}
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center will-change-transform"
                  />
                </Link>

                <div data-editorial-reveal className="mt-7">
                  <h3
                    className="font-identity text-[clamp(1.65rem,2.6vw,2.45rem)] leading-tight font-semibold tracking-[-0.025em]"
                    style={{ color: 'var(--ink-primary)' }}
                  >
                    {solutionGroup.shortTitle}
                  </h3>
                  <p
                    className="mt-3.5 max-w-xl text-base leading-relaxed"
                    style={{ color: 'var(--ink-secondary)' }}
                  >
                    {solutionGroup.summary}
                  </p>
                  <p
                    className="font-mono-tech mt-5 text-[10px] tracking-[0.14em] uppercase"
                    style={{ color: 'var(--ink-muted)' }}
                  >
                    {solutionGroup.technologies.join(' · ')}
                  </p>
                  <ChapterFolioActions project={solutionGroup} />
                </div>
              </div>
            </article>
          )}

          {/* 04 — Mahmoud Fayed Architect Portfolio (Offset Right Column, Faster Parallax) */}
          {architectPortfolio && (
            <article
              data-parallax-fast
              className="flex flex-col justify-center px-6 py-14 will-change-transform md:px-14 md:py-20 lg:col-span-5 lg:pt-36 lg:pb-16"
            >
              <div>
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <span
                    className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
                    style={{ color: 'var(--brass)' }}
                  >
                    {architectPortfolio.index} / {architectPortfolio.category}
                  </span>
                  <span
                    className="font-mono-tech text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: 'var(--ink-muted)' }}
                  >
                    {architectPortfolio.engagement}
                  </span>
                </div>

                <Link
                  to={`/work/${architectPortfolio.slug}`}
                  className="block aspect-16/10 w-full overflow-hidden border"
                  style={{
                    borderColor: 'var(--hairline)',
                    backgroundColor: 'var(--outdoor-secondary)',
                  }}
                >
                  <img
                    data-plate-img
                    src={architectPortfolio.screenshotPath}
                    alt={`${architectPortfolio.title} live interface preview`}
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center will-change-transform"
                  />
                </Link>

                <div data-editorial-reveal className="mt-7">
                  <h3
                    className="font-identity text-[clamp(1.55rem,2.3vw,2.2rem)] leading-tight font-semibold tracking-[-0.025em]"
                    style={{ color: 'var(--ink-primary)' }}
                  >
                    {architectPortfolio.title}
                  </h3>
                  <p
                    className="mt-3.5 text-base leading-relaxed"
                    style={{ color: 'var(--ink-secondary)' }}
                  >
                    {architectPortfolio.summary}
                  </p>
                  <p
                    className="font-mono-tech mt-5 text-[10px] tracking-[0.14em] uppercase"
                    style={{ color: 'var(--ink-muted)' }}
                  >
                    {architectPortfolio.technologies.join(' · ')}
                  </p>
                  <ChapterFolioActions project={architectPortfolio} />
                </div>
              </div>
            </article>
          )}
        </div>

        {/* 05 — EXCLUSIVE MULTI-ACTOR E-COMMERCE: Full-Bleed Architectural Panorama Strip */}
        {exclusiveEcommerce && (
          <article
            className="grid w-full grid-cols-1 border-b lg:grid-cols-12"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <div
              data-editorial-reveal
              className="order-2 flex flex-col justify-between px-6 py-12 md:px-14 md:py-16 lg:order-1 lg:col-span-4 lg:border-r"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div>
                <p
                  className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--brass)' }}
                >
                  {exclusiveEcommerce.index} / {exclusiveEcommerce.category}
                </p>
                <h3
                  className="font-identity mt-4 text-[clamp(1.7rem,2.6vw,2.45rem)] leading-[1.08] font-semibold tracking-[-0.025em]"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {exclusiveEcommerce.shortTitle}
                </h3>
                <p
                  className="mt-4 text-base leading-[1.7]"
                  style={{ color: 'var(--ink-secondary)' }}
                >
                  {exclusiveEcommerce.summary}
                </p>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {exclusiveEcommerce.narrativeRole}
                </p>
              </div>

              <div className="mt-8">
                <p
                  className="font-mono-tech text-[10px] leading-relaxed tracking-[0.14em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {exclusiveEcommerce.technologies.join(' · ')}
                </p>
                <ChapterFolioActions project={exclusiveEcommerce} />
              </div>
            </div>

            <div
              className="relative order-1 flex items-center overflow-hidden border-b lg:order-2 lg:col-span-8 lg:border-b-0"
              style={{
                borderColor: 'var(--hairline)',
                backgroundColor: 'var(--outdoor-secondary)',
              }}
            >
              <Link
                to={`/work/${exclusiveEcommerce.slug}`}
                className="block aspect-16/10 w-full overflow-hidden"
                aria-label={`Open ${exclusiveEcommerce.title} case study`}
              >
                <img
                  data-plate-img
                  src={exclusiveEcommerce.screenshotPath}
                  alt={`${exclusiveEcommerce.title} live interface preview`}
                  width={1440}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top will-change-transform"
                />
              </Link>
              <span
                className="font-mono-tech pointer-events-none absolute right-5 bottom-4 border px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase"
                style={{
                  backgroundColor: 'var(--paper-primary)',
                  color: 'var(--ink-primary)',
                  borderColor: 'var(--hairline)',
                }}
              >
                {exclusiveEcommerce.index} · {exclusiveEcommerce.engagement}
              </span>
            </div>
          </article>
        )}
      </section>

      {/* ====================================================================
          CHAPTER III — ATMOSPHERE & CRAFT (06 · Weather App Under Open Sky)
         ==================================================================== */}
      {weatherApp && (
        <section
          aria-label="Chapter III: Atmosphere and Craft — Weather App"
          className="relative w-full overflow-hidden"
        >
          {/* Still Photographic Sky Returning Behind the Final Outdoor Chapter */}
          <div aria-hidden="true" className="absolute inset-0">
            <div className="sky-plate sky-plate-day" />
            <div className="sky-plate sky-plate-night" />
          </div>

          {/* Seamless Top Atmospheric Dissolve from Outdoor Stone into Open Sky */}
          <div
            aria-hidden="true"
            className="surface-transition pointer-events-none absolute inset-x-0 top-0 h-44"
            style={{
              background:
                'linear-gradient(to bottom, var(--outdoor-base) 0%, transparent 100%)',
            }}
          />

          {/* Subtle Atmospheric Legibility Veil (zero glassmorphism blur — pure natural tonal wash) */}
          <div
            aria-hidden="true"
            className="surface-transition pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 10%, var(--outdoor-horizon) 72%, var(--wood-base) 100%)',
              opacity: 0.72,
            }}
          />

          <div className="relative z-10 px-6 pt-28 pb-24 md:px-14 md:pt-36 md:pb-32">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p
                className="font-mono-tech text-[11px] tracking-[0.24em] uppercase"
                style={{ color: 'var(--brass)' }}
              >
                {chapter3.label} · 06 / 06
              </p>
              <p
                className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
                style={{ color: 'var(--ink-primary)', opacity: 0.72 }}
              >
                Closing the Outdoor Horizon
              </p>
            </div>

            <div className="mt-5">
              <h2
                data-drift-left
                className="font-display text-[clamp(2.8rem,6.4vw,6.2rem)] leading-[0.95] tracking-[-0.02em] will-change-transform"
                style={{ color: 'var(--ink-primary)' }}
              >
                Atmosphere <em className="italic">&amp; Craft.</em>
              </h2>
            </div>

            <article className="mt-12 grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <Link
                  to={`/work/${weatherApp.slug}`}
                  className="paper-elevation block aspect-16/10 w-full overflow-hidden border"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  <img
                    data-plate-img
                    src={weatherApp.screenshotPath}
                    alt={`${weatherApp.title} live interface preview`}
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center will-change-transform"
                  />
                </Link>
              </div>

              <div
                data-editorial-reveal
                className="archival-paper paper-elevation border p-7 md:p-10 lg:col-span-5"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <p
                  className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--brass)' }}
                >
                  {weatherApp.index} / {weatherApp.category}
                </p>
                <h3
                  className="font-identity mt-3 text-[clamp(1.8rem,3vw,2.6rem)] leading-tight font-semibold tracking-[-0.025em]"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {weatherApp.title}
                </h3>
                <p
                  className="mt-4 text-base leading-[1.7]"
                  style={{ color: 'var(--ink-secondary)' }}
                >
                  {weatherApp.summary}
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed italic"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {weatherApp.narrativeRole}
                </p>
                <p
                  className="font-mono-tech mt-6 text-[10px] tracking-[0.14em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  {weatherApp.technologies.join(' · ')}
                </p>
                <ChapterFolioActions project={weatherApp} />
              </div>
            </article>

            {/* Archive Index Bridge */}
            <div
              className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t pt-8"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <p
                className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
                style={{ color: 'var(--ink-primary)', opacity: 0.78 }}
              >
                End of Act II — Returning Indoors to the Studio Desk
              </p>
              <Link
                to="/work"
                className="font-mono-tech group inline-flex items-center gap-2.5 border-b pb-1 text-xs tracking-[0.18em] uppercase transition-opacity hover:opacity-75"
                style={{
                  color: 'var(--ink-primary)',
                  borderColor: 'var(--brass)',
                }}
              >
                <span>Open Full 06-Project Index</span>
                <ArrowRight
                  size={14}
                  strokeWidth={1.7}
                  style={{ color: 'var(--brass)' }}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
