import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroDeskScene } from '@/components/home/HeroDeskScene';
import { OpeningNoteScene } from '@/components/home/OpeningNoteScene';
import { WindowPortalScene } from '@/components/home/WindowPortalScene';
import { PROJECT_CHAPTERS, PROJECTS } from '@/data/projects';

export function HomePage() {
  useEffect(() => {
    let active = true;
    document.fonts?.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="w-full">
      {/* Act I: Seated Inside the Wooden Studio */}
      <HeroDeskScene />
      <OpeningNoteScene />

      {/* Signature Transition: Camera Pushes Through the Architectural Window */}
      <WindowPortalScene />

      {/* Act II Outdoor Space Threshold (Expanded with Full 3 Chapters + Desk Return in Phase E) */}
      <section
        id="selected-work"
        aria-label="Outdoor architectural gallery threshold"
        className="outdoor-stone-surface relative w-full border-t px-6 py-24 md:px-14 md:py-32"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p
              className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
              style={{ color: 'var(--brass)' }}
            >
              Outdoor Architectural Space · Phase E Work Bench Ahead
            </p>
            <p
              className="font-mono-tech text-[11px] tracking-[0.18em] uppercase"
              style={{ color: 'var(--ink-muted)' }}
            >
              {PROJECTS.length} Projects · {PROJECT_CHAPTERS.length} Chapters
            </p>
          </div>

          <div
            className="divide-y border-y"
            style={{ borderColor: 'var(--hairline)' }}
          >
            {PROJECT_CHAPTERS.map((chapter) => {
              const chapterCount = PROJECTS.filter(
                (project) => project.chapter === chapter.id,
              ).length;
              return (
                <div
                  key={chapter.id}
                  className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:items-baseline"
                  style={{ borderColor: 'var(--hairline)' }}
                >
                  <span
                    className="font-mono-tech text-xs tracking-[0.2em] uppercase md:col-span-2"
                    style={{ color: 'var(--brass)' }}
                  >
                    {chapter.label}
                  </span>
                  <h3
                    className="font-display text-3xl md:col-span-5 md:text-4xl"
                    style={{ color: 'var(--ink-primary)' }}
                  >
                    {chapter.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed md:col-span-4"
                    style={{ color: 'var(--ink-secondary)' }}
                  >
                    {chapter.subtitle}
                  </p>
                  <span
                    className="font-mono-tech text-xs tracking-[0.16em] uppercase md:col-span-1 md:text-right"
                    style={{ color: 'var(--ink-muted)' }}
                  >
                    0{chapterCount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
