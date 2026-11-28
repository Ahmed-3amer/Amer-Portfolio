import { useLayoutEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  getNextProject,
  getProjectBySlug,
  PROJECT_CHAPTERS,
} from '@/data/projects';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const pageRef = useRef<HTMLDivElement>(null);
  const plateImgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!project) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-dossier-reveal]',
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

      // Subtle scroll-scrubbed camera focus zoom on the 16:10 interface showcase plate
      if (plateImgRef.current) {
        gsap.fromTo(
          plateImgRef.current,
          { scale: 1.055 },
          {
            scale: 1,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: plateImgRef.current.parentElement ?? plateImgRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // Staggered scroll reveal for Key Engineering Highlights rows
      const highlightRows = gsap.utils.toArray<HTMLElement>(
        '[data-highlight-item]',
      );
      if (highlightRows.length > 0) {
        gsap.fromTo(
          highlightRows,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: highlightRows[0],
              start: 'top 86%',
              once: true,
            },
          },
        );
      }

      // Calm entrance for Next Case Study continuation band
      const nextBand = pageRef.current?.querySelector('[data-next-dossier]');
      if (nextBand) {
        gsap.fromTo(
          nextBand,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: nextBand,
              start: 'top 88%',
              once: true,
            },
          },
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const chapter = PROJECT_CHAPTERS.find((c) => c.id === project.chapter);
  const nextProject = getNextProject(project.slug);
  const displayDomain = project.liveUrl
    .replace(/^https?:\/\//, '')
    .replace(/\/$/, '');

  return (
    <div ref={pageRef} className="relative min-h-screen w-full">
      {/* Top Dossier Header on Continuous Wood Studio Atmosphere */}
      <header className="relative w-full overflow-hidden px-6 pt-32 pb-12 md:px-14 md:pt-40 md:pb-16">
        <div
          aria-hidden="true"
          className="window-cast-shadow"
          style={{ opacity: 0.2 }}
        />
        <div aria-hidden="true" className="night-desk-lamp" />

        <div className="relative z-10">
          <div
            data-dossier-reveal
            className="flex flex-wrap items-center justify-between gap-4"
          >
            <Link
              to="/work"
              className="font-mono-tech surface-transition inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase hover:opacity-75"
              style={{ color: 'var(--ink-secondary)' }}
            >
              <ArrowLeft
                size={13}
                strokeWidth={1.7}
                style={{ color: 'var(--brass)' }}
                aria-hidden="true"
              />
              <span>Back to Work Index</span>
            </Link>

            <span
              className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
              style={{ color: 'var(--brass)' }}
            >
              {chapter?.label} · {project.index} / 06 · {project.engagement}
            </span>
          </div>

          <h1
            data-dossier-reveal
            className="font-identity mt-7 max-w-4xl text-[clamp(2.2rem,5.2vw,4.5rem)] leading-[1.04] font-semibold tracking-[-0.03em]"
            style={{ color: 'var(--ink-primary)' }}
          >
            {project.title}
          </h1>

          <div
            data-dossier-reveal
            className="mt-7 flex flex-col justify-between gap-6 border-t pt-7 lg:flex-row lg:items-end"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <p
              className="font-display max-w-2xl text-2xl leading-snug italic md:text-3xl"
              style={{ color: 'var(--ink-primary)' }}
            >
              {project.narrativeRole}
            </p>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-tech surface-transition inline-flex shrink-0 items-center gap-2.5 self-start border px-6 py-3.5 text-[11px] tracking-[0.18em] uppercase hover:opacity-85 lg:self-auto"
              style={{
                backgroundColor: 'var(--ink-primary)',
                color: 'var(--paper-primary)',
                borderColor: 'var(--ink-primary)',
              }}
            >
              <span>Visit Live Deployment</span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.75}
                style={{ color: 'var(--brass)' }}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </header>

      {/* Full-Bleed Architectural Stone Plate holding Uncropped 16:10 Live Screenshot */}
      <section
        aria-label={`${project.title} interface showcase`}
        className="outdoor-stone-surface relative z-10 w-full border-t px-6 py-10 md:px-14 md:py-14"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <div
          data-dossier-reveal
          className="paper-elevation mx-auto w-full max-w-[1320px] overflow-hidden border"
          style={{
            borderColor: 'var(--hairline)',
            backgroundColor: 'var(--outdoor-secondary)',
          }}
        >
          <img
            ref={plateImgRef}
            src={project.screenshotPath}
            alt={`${project.title} live interface preview`}
            width={1440}
            height={900}
            decoding="async"
            className="block aspect-16/10 w-full object-cover object-top will-change-transform"
          />
        </div>
      </section>

      {/* Full-Bleed Archival Paper Engineering Specification & Highlights Sheet */}
      <section
        aria-label="Engineering specification and highlights"
        className="archival-paper paper-elevation relative z-10 w-full border-y"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <div className="grid w-full grid-cols-1 lg:grid-cols-12">
          {/* Left Column (4 cols): Structured Technical Metadata & Complete Tech Stack */}
          <aside
            className="border-b px-6 py-12 md:px-14 md:py-16 lg:col-span-4 lg:border-r lg:border-b-0"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <p
              className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
              style={{ color: 'var(--brass)' }}
            >
              Specification Ledger
            </p>

            <dl
              className="mt-6 divide-y border-y"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div
                className="flex justify-between gap-4 py-3.5 text-sm"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <dt
                  className="font-mono-tech text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  Role
                </dt>
                <dd style={{ color: 'var(--ink-primary)' }}>
                  Frontend Developer
                </dd>
              </div>
              <div
                className="flex justify-between gap-4 py-3.5 text-sm"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <dt
                  className="font-mono-tech text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  Category
                </dt>
                <dd className="text-right" style={{ color: 'var(--ink-primary)' }}>
                  {project.category}
                </dd>
              </div>
              <div
                className="flex justify-between gap-4 py-3.5 text-sm"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <dt
                  className="font-mono-tech text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  Engagement
                </dt>
                <dd style={{ color: 'var(--ink-primary)' }}>
                  {project.engagement}
                </dd>
              </div>
              <div
                className="flex justify-between gap-4 py-3.5 text-sm"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <dt
                  className="font-mono-tech text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  Live URL
                </dt>
                <dd className="text-right">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-tech inline-flex items-center gap-1 border-b text-[11px] hover:opacity-75"
                    style={{
                      color: 'var(--brass)',
                      borderColor: 'var(--brass-soft)',
                    }}
                  >
                    <span>{displayDomain}</span>
                    <ArrowUpRight size={11} aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <p
                className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
                style={{ color: 'var(--brass)' }}
              >
                Verified Stack ({String(project.technologies.length).padStart(2, '0')})
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono-tech border px-3 py-1.5 text-[11px] tracking-[0.06em]"
                    style={{
                      borderColor: 'var(--hairline)',
                      backgroundColor: 'var(--paper-secondary)',
                      color: 'var(--ink-primary)',
                    }}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right Column (8 cols): Overview & Full Key Engineering Highlights */}
          <div className="px-6 py-12 md:px-14 md:py-16 lg:col-span-8">
            <p
              className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
              style={{ color: 'var(--brass)' }}
            >
              01 / Project Overview
            </p>
            <p
              className="mt-4 max-w-3xl text-lg leading-[1.75] md:text-xl"
              style={{ color: 'var(--ink-primary)' }}
            >
              {project.summary}
            </p>

            <div className="mt-12">
              <p
                className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
                style={{ color: 'var(--brass)' }}
              >
                02 / Key Engineering Highlights
              </p>
              <ol
                className="mt-5 divide-y border-y"
                style={{ borderColor: 'var(--hairline)' }}
              >
                {project.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    data-highlight-item
                    className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[56px_1fr] sm:items-baseline"
                    style={{ borderColor: 'var(--hairline)' }}
                  >
                    <span
                      className="font-mono-tech text-xs tracking-[0.18em]"
                      style={{ color: 'var(--brass)' }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className="text-base leading-[1.7]"
                      style={{ color: 'var(--ink-primary)' }}
                    >
                      {highlight}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Bleed Next Case Study Continuation Band */}
      <footer className="relative z-10 w-full px-6 py-16 md:px-14 md:py-20">
        <div
          data-next-dossier
          className="archival-paper paper-elevation grid w-full grid-cols-1 items-center gap-8 border p-6 md:p-10 lg:grid-cols-12"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div className="lg:col-span-7">
            <p
              className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
              style={{ color: 'var(--brass)' }}
            >
              Next Case Study · {nextProject.index} / 06
            </p>
            <h2
              className="font-identity mt-3 text-[clamp(1.7rem,3vw,2.75rem)] leading-tight font-semibold tracking-[-0.025em]"
              style={{ color: 'var(--ink-primary)' }}
            >
              {nextProject.title}
            </h2>
            <p
              className="mt-3 max-w-xl text-sm leading-relaxed md:text-base"
              style={{ color: 'var(--ink-secondary)' }}
            >
              {nextProject.summary}
            </p>
            <Link
              to={`/work/${nextProject.slug}`}
              className="font-mono-tech surface-transition mt-6 inline-flex items-center gap-2.5 border px-5 py-3 text-[11px] tracking-[0.18em] uppercase hover:opacity-85"
              style={{
                backgroundColor: 'var(--ink-primary)',
                color: 'var(--paper-primary)',
                borderColor: 'var(--ink-primary)',
              }}
            >
              <span>Open Next Dossier</span>
              <ArrowRight size={13} strokeWidth={1.7} aria-hidden="true" />
            </Link>
          </div>

          <div className="lg:col-span-5">
            <Link
              to={`/work/${nextProject.slug}`}
              className="block aspect-16/10 w-full overflow-hidden border"
              style={{
                borderColor: 'var(--hairline)',
                backgroundColor: 'var(--outdoor-secondary)',
              }}
              aria-label={`Continue to ${nextProject.title}`}
            >
              <img
                src={nextProject.screenshotPath}
                alt={`${nextProject.title} preview`}
                width={1440}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
