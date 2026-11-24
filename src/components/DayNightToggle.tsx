import { useEffect, useId, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '@/context/ThemeContext';

const SUN_RAY_ANGLES = Array.from({ length: 12 }, (_, index) => index * 30);

export function DayNightToggle() {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const sunGroupRef = useRef<SVGGElement>(null);
  const moonGroupRef = useRef<SVGGElement>(null);
  const uid = useId().replace(/:/g, '');
  const sunGradientId = `sun-disc-${uid}`;
  const moonGradientId = `moon-disc-${uid}`;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const targets = [sunGroupRef.current, moonGroupRef.current].filter(
        Boolean,
      );
      if (targets.length === 0) return;

      gsap.fromTo(
        targets,
        { rotation: 0, svgOrigin: '40 40' },
        {
          rotation: 52,
          svgOrigin: '40 40',
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, [pathname]);

  const isDay = theme === 'day';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch lighting mode. Currently ${isDay ? 'Day' : 'Night'}.`}
      aria-pressed={!isDay}
      title={isDay ? 'Switch to Night lighting' : 'Switch to Day lighting'}
      className="fixed top-4 right-5 z-40 flex cursor-pointer flex-col items-center gap-1.5 select-none focus:outline-none md:top-6 md:right-9"
    >
      <div className="relative h-14 w-14 md:h-16 md:w-16">
        <svg
          viewBox="0 0 80 80"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={sunGradientId} cx="46%" cy="44%" r="58%">
              <stop offset="0%" stopColor="#FFF5D4" />
              <stop offset="52%" stopColor="#FFCA6A" />
              <stop offset="100%" stopColor="#EE9E3C" />
            </radialGradient>

            <radialGradient id={moonGradientId} cx="40%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#F5F5F1" />
              <stop offset="68%" stopColor="#E5E8EC" />
              <stop offset="100%" stopColor="#CFD6DF" />
            </radialGradient>
          </defs>

          {/* DAY: Warm Sun Disc & 12 Rounded Rays (static at rest, rotates only on scroll) */}
          <g
            style={{
              opacity: isDay ? 1 : 0,
              transform: isDay ? 'scale(1)' : 'scale(0.86)',
              transformOrigin: '40px 40px',
              transition:
                'opacity var(--theme-duration) var(--theme-ease), transform var(--theme-duration) var(--theme-ease)',
            }}
          >
            <g ref={sunGroupRef} data-celestial="sun">
              {SUN_RAY_ANGLES.map((angle) => (
                <line
                  key={angle}
                  x1="40"
                  y1="10.5"
                  x2="40"
                  y2="16.5"
                  stroke="#F0B14C"
                  strokeWidth="3.1"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 40 40)`}
                />
              ))}
              <circle cx="40" cy="40" r="17" fill={`url(#${sunGradientId})`} />
            </g>
          </g>

          {/* NIGHT: Orbital Ring, Pinpoint Stars & Cratered Moon (rotates only on scroll) */}
          <g
            style={{
              opacity: isDay ? 0 : 1,
              transform: isDay ? 'scale(0.86)' : 'scale(1)',
              transformOrigin: '40px 40px',
              transition:
                'opacity var(--theme-duration) var(--theme-ease), transform var(--theme-duration) var(--theme-ease)',
            }}
          >
            <circle
              cx="40"
              cy="40"
              r="30.5"
              fill="none"
              stroke="rgba(220, 214, 202, 0.34)"
              strokeWidth="1.15"
            />
            <g ref={moonGroupRef} data-celestial="moon">
              {/* Delicate pinpoint stars inside/near orbit */}
              <circle cx="15" cy="18" r="1.35" fill="#EDEBE4" opacity="0.88" />
              <circle cx="67" cy="24" r="1.1" fill="#EDEBE4" opacity="0.72" />
              <circle cx="66" cy="54" r="1.25" fill="#EDEBE4" opacity="0.78" />
              <circle cx="19" cy="61" r="0.95" fill="#EDEBE4" opacity="0.58" />

              {/* Luminous matte moon */}
              <circle cx="40" cy="40" r="15.2" fill={`url(#${moonGradientId})`} />

              {/* Subtle realistic lunar craters */}
              <circle cx="34.5" cy="34.5" r="2.7" fill="#C4CCD6" opacity="0.65" />
              <circle cx="46.2" cy="40.5" r="2.0" fill="#C4CCD6" opacity="0.58" />
              <circle cx="38.5" cy="45.8" r="1.45" fill="#C4CCD6" opacity="0.52" />
            </g>
          </g>
        </svg>
      </div>

      <span className="font-mono-tech text-[10px] tracking-[0.22em] uppercase">
        <span
          className="surface-transition"
          style={{
            color: isDay ? 'var(--ink-primary)' : 'var(--ink-muted)',
            fontWeight: isDay ? 500 : 400,
          }}
        >
          DAY
        </span>
        <span className="mx-1" style={{ color: 'var(--ink-muted)' }}>
          /
        </span>
        <span
          className="surface-transition"
          style={{
            color: isDay ? 'var(--ink-muted)' : 'var(--ink-primary)',
            fontWeight: isDay ? 400 : 500,
          }}
        >
          NIGHT
        </span>
      </span>
    </button>
  );
}
