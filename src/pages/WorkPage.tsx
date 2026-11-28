import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import { useCvModal } from '@/context/CvModalContext';
import {
  PROJECT_CHAPTERS,
  PROJECTS,
  type ProjectChapterId,
} from '@/data/projects';

type ChapterFilter = 'all' | ProjectChapterId;

const FILTER_OPTIONS: { id: ChapterFilter; label: string; count: string }[] = [
  { id: 'all', label: 'All Works', count: '06' },
  { id: 'chapter-1', label: 'Ch. I · Operations', count: '02' },
  { id: 'chapter-2', label: 'Ch. II · Spaces & Commerce', count: '03' },
  { id: 'chapter-3', label: 'Ch. III · Atmosphere', count: '01' },
];

export function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<ChapterFilter>('all');
  const listRef = useRef<HTMLDivElement>(null);
  const { openCvModal } = useCvModal();

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS;
    return PROJECTS.filter((project) => project.chapter === activeFilter);
  }, [activeFilter]);

  const activeChapterMeta = useMemo(
    () => PROJECT_CHAPTERS.find((c) => c.id === activeFilter),
    [activeFilter],
  );

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion || !listRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-archive-row]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power3.out',
          force3D: true,
        },
      );
    }, listRef);

    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div className="relative min-h-screen w-full">
      {/* Top Wood Studio Header */}
      <header className="relative w-full overflow-hidden px-6 pt-32 pb-14 md:px-14 md:pt-40 md:pb-16">
        <div
          aria-hidden="true"
          className="window-cast-shadow"
          style={{ opacity: 0.22 }}
        />
        <div aria-hidden="true" className="night-desk-lamp" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              className="font-mono-tech text-[11px] font-medium tracking-[0.24em] uppercase"
              style={{ color: 'var(--brass)' }}
            >
              01 / Complete Archive · 06 Shipped Interfaces
            </p>
            <h1
              className="font-display mt-3 text-[clamp(3rem,6.8vw,6.2rem)] leading-[0.94] tracking-[-0.02em]"
              style={{ color: 'var(--ink-primary)' }}
            >
              Selected <em className="italic">Work.</em>
            </h1>
          </div>

          <p
            className="max-w-md text-base leading-relaxed md:text-lg"
            style={{ color: 'var(--ink-secondary)' }}
          >
            {activeChapterMeta
              ? activeChapterMeta.subtitle
              : 'Every shipped clinical platform, bilingual enterprise website, architectural showcase, and multi-role web application—indexed with live links and full engineering breakdowns.'}
          </p>
        </div>

        {/* Interactive Chapter Filter Bar (click-driven, crisp Studio Coral active state) */}
        <div
          className="relative z-10 mt-10 flex flex-wrap items-center gap-3 border-t pt-6"
          style={{ borderColor: 'var(--hairline)' }}
          role="tablist"
          aria-label="Filter projects by narrative chapter"
        >
          {FILTER_OPTIONS.map((option) => {
            const isActive = activeFilter === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(option.id)}
                className="font-mono-tech surface-transition inline-flex cursor-pointer items-center gap-2 border px-4 py-2 text-[11px] tracking-[0.16em] uppercase"
                style={{
                  backgroundColor: isActive
                    ? 'var(--ink-primary)'
                    : 'var(--paper-primary)',
                  color: isActive
                    ? 'var(--paper-primary)'
                    : 'var(--ink-primary)',
                  borderColor: isActive ? 'var(--ink-primary)' : 'var(--hairline)',
                }}
              >
                <span>{option.label}</span>
                <span
                  className="text-[10px]"
                  style={{
                    color: isActive ? 'var(--brass)' : 'var(--ink-muted)',
                  }}
                >
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Full-Bleed Archival Paper Project Ledger */}
      <section
        aria-label="Indexed projects archive"
        className="archival-paper paper-elevation relative z-10 w-full border-y"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <div
          ref={listRef}
          className="divide-y"
          style={{ borderColor: 'var(--hairline)' }}
        >
          {filteredProjects.map((project) => {
            const chapter = PROJECT_CHAPTERS.find(
              (c) => c.id === project.chapter,
            );
            return (
              <article
                key={project.slug}
                data-archive-row
                className="grid w-full grid-cols-1 gap-8 px-6 py-10 md:px-14 md:py-12 lg:grid-cols-12 lg:items-center lg:gap-10"
                style={{ borderColor: 'var(--hairline)' }}
              >
                {/* Crisp Uncropped 16:10 Live Preview Plate */}
                <div className="lg:col-span-5">
                  <Link
                    to={`/work/${project.slug}`}
                    className="block aspect-16/10 w-full overflow-hidden border"
                    style={{
                      borderColor: 'var(--hairline)',
                      backgroundColor: 'var(--outdoor-secondary)',
                    }}
                    aria-label={`Open ${project.title} case study`}
                  >
                    <img
                      src={project.screenshotPath}
                      alt={`${project.title} live interface preview`}
                      width={1440}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top"
                    />
                  </Link>
                </div>

                {/* Editorial Engineering Metadata & Direct Actions */}
                <div className="flex flex-col justify-between lg:col-span-7">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p
                        className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
                        style={{ color: 'var(--brass)' }}
                      >
                        {project.index} / {project.category}
                      </p>
                      <span
                        className="font-mono-tech text-[10px] tracking-[0.18em] uppercase"
                        style={{ color: 'var(--ink-muted)' }}
                      >
                        {chapter?.label} · {project.engagement}
                      </span>
                    </div>

                    <h2
                      className="font-identity mt-3 text-[clamp(1.65rem,2.6vw,2.4rem)] leading-[1.1] font-semibold tracking-[-0.025em]"
                      style={{ color: 'var(--ink-primary)' }}
                    >
                      <Link
                        to={`/work/${project.slug}`}
                        className="transition-opacity hover:opacity-75"
                      >
                        {project.title}
                      </Link>
                    </h2>

                    <p
                      className="mt-3.5 max-w-2xl text-[0.96rem] leading-[1.68]"
                      style={{ color: 'var(--ink-secondary)' }}
                    >
                      {project.summary}
                    </p>

                    <p
                      className="font-mono-tech mt-5 text-[10px] leading-relaxed tracking-[0.14em] uppercase"
                      style={{ color: 'var(--ink-muted)' }}
                    >
                      {project.technologies.slice(0, 8).join(' · ')}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-5">
                    <Link
                      to={`/work/${project.slug}`}
                      className="font-mono-tech surface-transition inline-flex items-center gap-2.5 border px-5 py-3 text-[11px] tracking-[0.18em] uppercase hover:opacity-85"
                      style={{
                        backgroundColor: 'var(--ink-primary)',
                        color: 'var(--paper-primary)',
                        borderColor: 'var(--ink-primary)',
                      }}
                    >
                      <span>Read Case Study</span>
                      <ArrowRight size={13} strokeWidth={1.7} aria-hidden="true" />
                    </Link>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono-tech surface-transition inline-flex items-center gap-1.5 border-b pb-1 text-[11px] tracking-[0.18em] uppercase hover:opacity-75"
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
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom Studio Navigation & CV Bridge */}
      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-6 px-6 py-14 md:px-14 md:py-16">
        <div className="flex flex-wrap items-center gap-6">
          <Link
            to="/about"
            className="font-mono-tech surface-transition inline-flex items-center gap-2 border-b pb-1 text-xs tracking-[0.18em] uppercase hover:opacity-75"
            style={{ color: 'var(--ink-primary)', borderColor: 'var(--brass)' }}
          >
            <span>Studio Perspective</span>
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

        <button
          type="button"
          onClick={openCvModal}
          className="font-mono-tech surface-transition inline-flex cursor-pointer items-center gap-2.5 border px-5 py-3 text-[11px] tracking-[0.18em] uppercase hover:opacity-85"
          style={{
            backgroundColor: 'var(--paper-primary)',
            color: 'var(--ink-primary)',
            borderColor: 'var(--hairline)',
          }}
        >
          <FileText
            size={14}
            strokeWidth={1.65}
            style={{ color: 'var(--brass)' }}
            aria-hidden="true"
          />
          <span>Preview &amp; Download CV</span>
        </button>
      </footer>
    </div>
  );
}
