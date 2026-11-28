import { useId } from 'react';
import { useTheme } from '@/context/ThemeContext';

const SUN_RAY_ANGLES = Array.from({ length: 12 }, (_, index) => index * 30);

export function DayNightToggle() {
  const { theme, toggleTheme } = useTheme();
  const uid = useId().replace(/:/g, '');
  const sunGradientId = `sun-disc-${uid}`;
  const moonGradientId = `moon-disc-${uid}`;
  const moonClipId = `moon-clip-${uid}`;

  const isDay = theme === 'day';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch lighting mode. Currently ${isDay ? 'Day' : 'Night'}.`}
      aria-pressed={!isDay}
      title={isDay ? 'Switch to Night lighting' : 'Switch to Day lighting'}
      className="fixed top-4 right-7 z-40 flex cursor-pointer flex-col items-center gap-1 select-none focus:outline-none md:top-7 md:right-12"
    >
      <div className="relative h-14 w-14 md:h-[68px] md:w-[68px]">
        <svg
          viewBox="0 0 84 84"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={sunGradientId} cx="45%" cy="42%" r="58%">
              <stop offset="0%" stopColor="#FFF5D4" />
              <stop offset="52%" stopColor="#FFCA6A" />
              <stop offset="100%" stopColor="#EE9E3C" />
            </radialGradient>

            <radialGradient id={moonGradientId} cx="36%" cy="34%" r="68%">
              <stop offset="0%" stopColor="#F8F7F2" />
              <stop offset="54%" stopColor="#E6E9EE" />
              <stop offset="86%" stopColor="#C9D1DC" />
              <stop offset="100%" stopColor="#AEB8C7" />
            </radialGradient>

            <clipPath id={moonClipId}>
              <circle cx="42" cy="42" r="20.5" />
            </clipPath>
          </defs>

          {/* DAY: Warm Sun Disc & 12 Rounded Rays — completely static */}
          <g
            data-celestial="sun"
            style={{
              opacity: isDay ? 1 : 0,
              transform: isDay ? 'scale(1)' : 'scale(0.88)',
              transformOrigin: '42px 42px',
              transition:
                'opacity var(--theme-duration) var(--theme-ease), transform var(--theme-duration) var(--theme-ease)',
            }}
          >
            {SUN_RAY_ANGLES.map((angle) => (
              <line
                key={angle}
                x1="42"
                y1="11"
                x2="42"
                y2="17.5"
                stroke="#F0B14C"
                strokeWidth="3.2"
                strokeLinecap="round"
                transform={`rotate(${angle} 42 42)`}
              />
            ))}
            <circle cx="42" cy="42" r="17.5" fill={`url(#${sunGradientId})`} />
          </g>

          {/* NIGHT: Larger Detailed Cratered Moon + Quiet Scattered Stars (no ring, completely static) */}
          <g
            data-celestial="moon"
            style={{
              opacity: isDay ? 0 : 1,
              transform: isDay ? 'scale(0.88)' : 'scale(1)',
              transformOrigin: '42px 42px',
              transition:
                'opacity var(--theme-duration) var(--theme-ease), transform var(--theme-duration) var(--theme-ease)',
            }}
          >
            {/* Subtle scattered quiet stars around the moon */}
            <circle cx="11" cy="20" r="1.45" fill="#F2EFE8" opacity="0.9" />
            <circle cx="72" cy="18" r="1.25" fill="#F2EFE8" opacity="0.82" />
            <circle cx="75" cy="48" r="1.05" fill="#F2EFE8" opacity="0.68" />
            <circle cx="13" cy="60" r="1.3" fill="#F2EFE8" opacity="0.78" />
            <circle cx="63" cy="68" r="1.1" fill="#F2EFE8" opacity="0.65" />
            <circle cx="24" cy="11" r="0.9" fill="#F2EFE8" opacity="0.58" />

            {/* Full spherical luminous moon */}
            <circle cx="42" cy="42" r="20.5" fill={`url(#${moonGradientId})`} />

            {/* Realistic lunar maria & crater details clipped cleanly inside moon disc */}
            <g clipPath={`url(#${moonClipId})`}>
              {/* Soft subtle lunar maria shading */}
              <ellipse
                cx="35"
                cy="33"
                rx="9.5"
                ry="7"
                transform="rotate(-18 35 33)"
                fill="#B8C2D0"
                opacity="0.32"
              />
              <ellipse
                cx="50"
                cy="47"
                rx="8.5"
                ry="6"
                transform="rotate(14 50 47)"
                fill="#AEBAC9"
                opacity="0.28"
              />

              {/* Distinct realistic craters with subtle inner shadow & sunlit rim */}
              <circle cx="34.5" cy="34.5" r="4.1" fill="#B6C0CE" opacity="0.72" />
              <circle cx="35.3" cy="35.2" r="3.4" fill="#CBD3DE" opacity="0.58" />

              <circle cx="49.5" cy="38.5" r="3.1" fill="#B1BCCB" opacity="0.68" />
              <circle cx="50.1" cy="39.1" r="2.4" fill="#C7D0DC" opacity="0.52" />

              <circle cx="39.5" cy="49.5" r="2.6" fill="#B3BECC" opacity="0.66" />
              <circle cx="40.0" cy="50.0" r="2.0" fill="#C9D2DD" opacity="0.5" />

              <circle cx="47.5" cy="52.5" r="1.9" fill="#AEB9C8" opacity="0.62" />
              <circle cx="30.2" cy="45.2" r="1.65" fill="#B6C0CE" opacity="0.58" />
              <circle cx="43.8" cy="28.8" r="1.5" fill="#BCC6D4" opacity="0.55" />

              {/* Subtle bottom-right limb shading for 3D lunar depth */}
              <circle
                cx="42"
                cy="42"
                r="20.5"
                fill="none"
                stroke="#9DA8B8"
                strokeWidth="1.6"
                opacity="0.35"
              />
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
