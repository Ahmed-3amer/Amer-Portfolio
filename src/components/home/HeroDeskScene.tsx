import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, FileText } from 'lucide-react';
import { useCvModal } from '@/context/CvModalContext';
import { useSmoothScroll } from '@/context/SmoothScrollContext';
import { PROFILE } from '@/data/profile';

export function HeroDeskScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const skyWrapRef = useRef<HTMLDivElement>(null);
  const shadowPlateRef = useRef<HTMLDivElement>(null);
  const copyColRef = useRef<HTMLDivElement>(null);
  const windowFrameRef = useRef<HTMLDivElement>(null);

  const { openCvModal } = useCvModal();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion) {
        // Paper-Edge Mask Reveal on initial mount
        gsap.fromTo(
          '[data-hero-line]',
          { yPercent: 110, opacity: 0.001 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.05,
            stagger: 0.11,
            ease: 'power3.out',
            delay: 0.12,
          },
        );

        gsap.fromTo(
          '[data-hero-fade]',
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.09,
            ease: 'power2.out',
            delay: 0.42,
          },
        );

        // Multi-Layer Physical Scroll Parallax as viewer leaves Hero Desk
        if (sectionRef.current) {
          const scrollConfig = {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
            invalidateOnRefresh: true,
          };

          if (skyWrapRef.current) {
            gsap.fromTo(
              skyWrapRef.current,
              { yPercent: -5, scale: 1.07 },
              {
                yPercent: 10,
                scale: 1.15,
                ease: 'none',
                force3D: true,
                scrollTrigger: scrollConfig,
              },
            );
          }

          if (shadowPlateRef.current) {
            gsap.fromTo(
              shadowPlateRef.current,
              { x: 0, y: 0 },
              {
                x: 34,
                y: 48,
                ease: 'none',
                force3D: true,
                scrollTrigger: scrollConfig,
              },
            );
          }

          if (windowFrameRef.current) {
            gsap.fromTo(
              windowFrameRef.current,
              { y: 0 },
              {
                y: -26,
                ease: 'none',
                force3D: true,
                scrollTrigger: scrollConfig,
              },
            );
          }

          if (copyColRef.current) {
            gsap.fromTo(
              copyColRef.current,
              { y: 0 },
              {
                y: -52,
                ease: 'none',
                force3D: true,
                scrollTrigger: scrollConfig,
              },
            );
          }
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Ahmed Amer studio desk introduction"
      className="relative min-h-svh w-full overflow-hidden"
    >
      {/* Realistic angled sunlight / moonlight window shadow falling across the wooden desk */}
      <div
        ref={shadowPlateRef}
        aria-hidden="true"
        className="window-cast-shadow will-change-transform"
      />

      {/* Grounded warm tungsten desk-lamp pool (visible only in NIGHT mode) */}
      <div aria-hidden="true" className="night-desk-lamp" />

      {/* Subtle natural lighting wash over left desk surface to guarantee effortless ink readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, var(--desk-lamp-glow) 0%, transparent 56%)',
        }}
      />

      {/* Full-Bleed Asymmetric Architectural Studio Layout */}
      <div className="relative z-10 grid min-h-svh w-full grid-cols-1 lg:grid-cols-12">
        {/* Mobile & Tablet Top Architectural Transom Window (visible below lg) */}
        <div className="relative h-[34svh] min-h-[230px] w-full overflow-hidden lg:hidden">
          <div className="sky-plate sky-plate-day" />
          <div className="sky-plate sky-plate-night" />
          {/* Subtle glass light reflection */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(124deg, transparent 32%, var(--glass-sheen) 48%, transparent 58%)',
            }}
          />
          {/* Real recessed timber window frame & muntin bars */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: 'inset 0 -10px 24px var(--window-jamb-shadow)',
              borderBottom: '10px solid var(--window-frame-outer)',
            }}
          >
            <div
              className="absolute top-0 bottom-0 left-[64%] w-[7px] -translate-x-1/2"
              style={{
                backgroundColor: 'var(--window-mullion)',
                boxShadow:
                  'inset 1px 0 0 var(--window-frame-inner), 2px 0 8px var(--window-jamb-shadow)',
              }}
            />
          </div>
          {/* Wooden windowsill */}
          <div
            aria-hidden="true"
            className="absolute right-0 bottom-0 left-0 h-3"
            style={{
              backgroundColor: 'var(--window-sill)',
              borderTop: '1px solid var(--window-frame-inner)',
              boxShadow: '0 8px 18px var(--wood-shadow)',
            }}
          />
        </div>

        {/* Left Foreground: The Studio Desk Workspace */}
        <div
          ref={copyColRef}
          className="flex flex-col justify-between px-6 pt-12 pb-10 will-change-transform md:px-12 lg:col-span-7 lg:min-h-svh lg:pt-32 lg:pr-12 lg:pb-12 lg:pl-14"
        >
          <div className="my-auto py-4 lg:py-8">
            <div
              data-hero-fade
              className="flex items-center gap-3.5"
            >
              <span
                aria-hidden="true"
                className="inline-block h-px w-8"
                style={{ backgroundColor: 'var(--brass)' }}
              />
              <p
                className="font-mono-tech text-[11px] font-medium tracking-[0.22em] uppercase"
                style={{ color: 'var(--ink-primary)' }}
              >
                {PROFILE.name} · {PROFILE.role}
              </p>
            </div>

            <h1
              className="font-display mt-6 text-[clamp(3.15rem,6.4vw,6.15rem)] leading-[0.95] tracking-[-0.02em]"
              style={{ color: 'var(--ink-primary)' }}
            >
              <span className="block overflow-hidden pb-1">
                <span data-hero-line className="block will-change-transform">
                  Interfaces built with
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-hero-line className="block will-change-transform">
                  <em className="italic">structure</em>, clarity,
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span data-hero-line className="block will-change-transform">
                  and quiet precision.
                </span>
              </span>
            </h1>

            <p
              data-hero-fade
              className="mt-7 max-w-xl text-base leading-[1.68] md:text-lg"
              style={{ color: 'var(--ink-primary)', opacity: 0.82 }}
            >
              {PROFILE.heroIntro}
            </p>

            <div
              data-hero-fade
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => scrollTo('#window-portal')}
                className="font-mono-tech surface-transition inline-flex cursor-pointer items-center gap-2.5 border px-5 py-3.5 text-[11px] tracking-[0.18em] uppercase hover:opacity-85"
                style={{
                  backgroundColor: 'var(--ink-primary)',
                  color: 'var(--paper-primary)',
                  borderColor: 'var(--ink-primary)',
                }}
              >
                <span>Explore Selected Work</span>
                <ArrowDown size={14} strokeWidth={1.7} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={openCvModal}
                className="font-mono-tech surface-transition inline-flex cursor-pointer items-center gap-2 border px-5 py-3.5 text-[11px] tracking-[0.18em] uppercase hover:opacity-80"
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
                <span>Preview CV</span>
              </button>
            </div>
          </div>

          {/* Grounded Studio Margin Scroll Cue */}
          <div
            data-hero-fade
            className="mt-10 flex items-center justify-between border-t pt-5 lg:mt-0"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <span
              className="font-mono-tech text-[10px] tracking-[0.22em] uppercase"
              style={{ color: 'var(--ink-primary)', opacity: 0.72 }}
            >
              01 / Studio Desk — Scroll to step through the window
            </span>
            <span
              className="font-mono-tech hidden text-[10px] tracking-[0.2em] uppercase sm:inline"
              style={{ color: 'var(--ink-primary)', opacity: 0.6 }}
            >
              06 Shipped Works
            </span>
          </div>
        </div>

        {/* Right Full-Height Architectural Timber Window (Desktop lg+) */}
        <div
          ref={windowFrameRef}
          className="relative hidden min-h-svh overflow-hidden will-change-transform lg:col-span-5 lg:block"
        >
          {/* Outer physical timber jamb casing along left & bottom edges */}
          <div
            className="relative h-full w-full overflow-hidden"
            style={{
              borderLeft: '18px solid var(--window-frame-outer)',
              borderBottom: '18px solid var(--window-frame-outer)',
              boxShadow: '-18px 0 38px var(--wood-shadow)',
            }}
          >
            {/* Still Photographic Sky & Clouds (Zero idle drift; parallax only on scroll) */}
            <div
              ref={skyWrapRef}
              className="absolute inset-0 will-change-transform"
              style={{ transform: 'scale(1.07)' }}
            >
              <div className="sky-plate sky-plate-day" />
              <div className="sky-plate sky-plate-night" />
            </div>

            {/* Subtle real glass reflection & atmospheric depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(128deg, var(--glass-tint) 0%, transparent 34%, var(--glass-sheen) 47%, transparent 57%)',
                boxShadow:
                  'inset 14px 12px 34px var(--window-jamb-shadow), inset 0 -10px 24px var(--window-jamb-shadow)',
              }}
            />

            {/* Architectural Timber Mullions (2 columns x 3 panes) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {/* Vertical Center Mullion */}
              <div
                className="absolute top-0 bottom-0 left-1/2 w-[11px] -translate-x-1/2"
                style={{
                  backgroundColor: 'var(--window-mullion)',
                  boxShadow:
                    'inset 1.5px 0 0 var(--window-frame-inner), 4px 0 14px var(--window-jamb-shadow)',
                }}
              />
              {/* Upper Horizontal Muntin */}
              <div
                className="absolute top-[34%] right-0 left-0 h-[10px]"
                style={{
                  backgroundColor: 'var(--window-mullion)',
                  boxShadow:
                    'inset 0 1.5px 0 var(--window-frame-inner), 0 4px 14px var(--window-jamb-shadow)',
                }}
              />
              {/* Lower Horizontal Muntin */}
              <div
                className="absolute top-[68%] right-0 left-0 h-[10px]"
                style={{
                  backgroundColor: 'var(--window-mullion)',
                  boxShadow:
                    'inset 0 1.5px 0 var(--window-frame-inner), 0 4px 14px var(--window-jamb-shadow)',
                }}
              />
              {/* Inner timber chamfer frame highlight */}
              <div
                className="absolute inset-0 border"
                style={{ borderColor: 'var(--window-frame-inner)' }}
              />
            </div>
          </div>

          {/* Physical Protruding Timber Windowsill */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-[18px]"
            style={{
              backgroundColor: 'var(--window-sill)',
              borderTop: '1px solid var(--window-frame-inner)',
              boxShadow: '0 10px 26px var(--wood-shadow)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
