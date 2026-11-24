import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function WindowPortalScene() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const skyLayerRef = useRef<HTMLDivElement>(null);
  const wallAssemblyRef = useRef<HTMLDivElement>(null);
  const indoorTextRef = useRef<HTMLDivElement>(null);
  const outdoorGroundRef = useRef<HTMLDivElement>(null);
  const outdoorPrologueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      if (wallAssemblyRef.current) wallAssemblyRef.current.style.opacity = '0';
      if (outdoorGroundRef.current) outdoorGroundRef.current.style.opacity = '1';
      if (outdoorPrologueRef.current) outdoorPrologueRef.current.style.opacity = '1';
      return;
    }

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!triggerRef.current || !stageRef.current) return;

      gsap.set([outdoorGroundRef.current, outdoorPrologueRef.current], {
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: isMobile ? '+=125%' : '+=170%',
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 0.00 -> 0.22: Indoor captions gently lift and fade out
      if (indoorTextRef.current) {
        tl.to(
          indoorTextRef.current,
          {
            opacity: 0,
            y: -24,
            duration: 0.22,
            ease: 'power1.in',
          },
          0,
        );
      }

      // 0.04 -> 0.72: Camera pushes smoothly THROUGH the open central glass bay
      if (wallAssemblyRef.current) {
        tl.fromTo(
          wallAssemblyRef.current,
          { scale: 1, opacity: 1 },
          {
            scale: isMobile ? 4.4 : 5.4,
            duration: 0.68,
            ease: 'power2.inOut',
            force3D: true,
          },
          0.04,
        );

        // Softly dissolve outer timber casing & side mullions as they sweep past the viewport edges
        tl.to(
          wallAssemblyRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: 'power1.out',
          },
          0.54,
        );
      }

      // 0.04 -> 0.90: Still photographic sky gently expands in telephoto optical depth
      if (skyLayerRef.current) {
        tl.fromTo(
          skyLayerRef.current,
          { scale: 1.02, yPercent: 0 },
          {
            scale: 1.15,
            yPercent: -3,
            duration: 0.86,
            ease: 'none',
            force3D: true,
          },
          0.04,
        );
      }

      // 0.60 -> 0.96: Outdoor Architectural Horizon unfolds smoothly beneath the open sky
      if (outdoorGroundRef.current) {
        tl.fromTo(
          outdoorGroundRef.current,
          { opacity: 0, yPercent: 8 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.36,
            ease: 'power2.out',
            force3D: true,
          },
          0.6,
        );
      }

      // 0.68 -> 1.00: Act II Selected Work prologue settles calmly into the open architectural space
      if (outdoorPrologueRef.current) {
        tl.fromTo(
          outdoorPrologueRef.current,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.32,
            ease: 'power2.out',
            force3D: true,
          },
          0.68,
        );
      }
    }, triggerRef);

    const frameId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(frameId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="window-portal"
      ref={triggerRef}
      aria-label="Stepping through the studio window into selected work"
      className="relative h-screen w-full overflow-hidden"
    >
      <div
        ref={stageRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Layer 1: Still Photographic Sky & Clouds visible through the window and expanding to full screen */}
        <div
          ref={skyLayerRef}
          className="absolute inset-0 will-change-transform"
        >
          <div className="sky-plate sky-plate-day" />
          <div className="sky-plate sky-plate-night" />
        </div>

        {/* Layer 2: Outdoor Architectural Space Horizon (unveils smoothly after exiting the window) */}
        <div
          ref={outdoorGroundRef}
          className="pointer-events-none absolute inset-0 z-10 will-change-transform"
        >
          {/* Seamless atmospheric gradient bridging sky at upper half into sunlit limestone / moonlit slate below */}
          <div
            className="surface-transition absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 28%, var(--outdoor-horizon) 56%, var(--outdoor-base) 76%, var(--outdoor-base) 100%)',
            }}
          />
          <div
            className="outdoor-stone-surface absolute right-0 bottom-0 left-0 h-[44%]"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 42%, black 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 42%, black 100%)',
            }}
          />
        </div>

        {/* Layer 3: Act II Outdoor Prologue (arrives in the open architectural space) */}
        <div
          ref={outdoorPrologueRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end px-6 pb-14 will-change-transform md:px-14 md:pb-20"
        >
          <div
            className="w-full border-t pt-8"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p
                  className="font-mono-tech text-[11px] tracking-[0.24em] uppercase"
                  style={{ color: 'var(--brass)' }}
                >
                  Act II · Beyond the Window · 06 Selected Works
                </p>
                <h2
                  className="font-display mt-3 text-[clamp(3.2rem,7.2vw,6.8rem)] leading-[0.92] tracking-[-0.02em]"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  Selected <em className="italic">Work</em>
                </h2>
              </div>

              <p
                className="max-w-md text-base leading-relaxed md:text-lg"
                style={{ color: 'var(--ink-secondary)' }}
              >
                Three chapters of shipped interfaces—from clinical systems and
                bilingual medical platforms to architectural spaces and open
                skies.
              </p>
            </div>
          </div>
        </div>

        {/* Layer 4: Continuous Single-Piece Timber Studio Wall + Open 3-Bay Architectural Gallery Window */}
        <div
          ref={wallAssemblyRef}
          className="pointer-events-none absolute inset-0 z-30 will-change-transform"
          style={{ transformOrigin: '50% 54%' }}
        >
          {/* Single continuous oak/walnut timber wall with exact window opening via evenodd clip-path */}
          <div
            className="studio-timber-panel absolute inset-0 hidden md:block"
            style={{
              clipPath:
                'polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 20% 16%, 80% 16%, 80% 80%, 20% 80%, 20% 16%)',
            }}
          />
          <div
            className="studio-timber-panel absolute inset-0 block md:hidden"
            style={{
              clipPath:
                'polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 8% 19%, 92% 19%, 92% 76%, 8% 76%, 8% 19%)',
            }}
          />

          {/* Subtle angled sunlight / moonlight shadow washing across the interior timber wall */}
          <div
            aria-hidden="true"
            className="window-cast-shadow hidden md:block"
            style={{
              inset: 0,
              opacity: 0.24,
              clipPath:
                'polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 20% 16%, 80% 16%, 80% 80%, 20% 80%, 20% 16%)',
            }}
          />

          {/* Desktop 3-Bay Architectural Window Frame (wide unobstructed center bay for camera push-through) */}
          <div
            className="absolute hidden md:block"
            style={{
              left: '20%',
              right: '20%',
              top: '16%',
              bottom: '20%',
              border: '16px solid var(--window-frame-outer)',
              boxShadow:
                'inset 0 0 0 1px var(--window-frame-inner), inset 14px 14px 36px var(--window-jamb-shadow), 0 24px 48px var(--wood-shadow)',
            }}
          >
            {/* Whisper glass specular reflection */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(128deg, transparent 32%, var(--glass-sheen) 47%, transparent 57%)',
              }}
            />
            {/* Upper transom bar (clears top of screen cleanly during zoom) */}
            <div
              className="absolute top-[24%] right-0 left-0 h-[10px]"
              style={{
                backgroundColor: 'var(--window-mullion)',
                boxShadow:
                  'inset 0 1.5px 0 var(--window-frame-inner), 0 4px 14px var(--window-jamb-shadow)',
              }}
            />
            {/* Left architectural bay mullion (sweeps smoothly off left edge) */}
            <div
              className="absolute top-0 bottom-0 left-[22%] w-[10px]"
              style={{
                backgroundColor: 'var(--window-mullion)',
                boxShadow:
                  'inset 1.5px 0 0 var(--window-frame-inner), 4px 0 14px var(--window-jamb-shadow)',
              }}
            />
            {/* Right architectural bay mullion (sweeps smoothly off right edge) */}
            <div
              className="absolute top-0 right-[22%] bottom-0 w-[10px]"
              style={{
                backgroundColor: 'var(--window-mullion)',
                boxShadow:
                  'inset 1.5px 0 0 var(--window-frame-inner), 4px 0 14px var(--window-jamb-shadow)',
              }}
            />
            {/* Protruding bottom timber windowsill */}
            <div
              className="absolute -right-7 -bottom-6 -left-7 h-4"
              style={{
                backgroundColor: 'var(--window-sill)',
                borderTop: '1px solid var(--window-frame-inner)',
                boxShadow: '0 12px 26px var(--wood-shadow)',
              }}
            />
          </div>

          {/* Mobile Architectural Window Frame (open center view + upper transom bar) */}
          <div
            className="absolute block md:hidden"
            style={{
              left: '8%',
              right: '8%',
              top: '19%',
              bottom: '24%',
              border: '11px solid var(--window-frame-outer)',
              boxShadow:
                'inset 0 0 0 1px var(--window-frame-inner), inset 10px 10px 24px var(--window-jamb-shadow)',
            }}
          >
            <div
              className="absolute top-[25%] right-0 left-0 h-[8px]"
              style={{
                backgroundColor: 'var(--window-mullion)',
                boxShadow: 'inset 0 1px 0 var(--window-frame-inner)',
              }}
            />
            <div
              className="absolute top-0 bottom-0 left-[22%] w-[7px]"
              style={{
                backgroundColor: 'var(--window-mullion)',
                boxShadow: 'inset 1px 0 0 var(--window-frame-inner)',
              }}
            />
            <div
              className="absolute top-0 right-[22%] bottom-0 w-[7px]"
              style={{
                backgroundColor: 'var(--window-mullion)',
                boxShadow: 'inset 1px 0 0 var(--window-frame-inner)',
              }}
            />
            <div
              className="absolute -right-4 -bottom-4 -left-4 h-3"
              style={{
                backgroundColor: 'var(--window-sill)',
                borderTop: '1px solid var(--window-frame-inner)',
              }}
            />
          </div>

          {/* Indoor Editorial Captions resting quietly above and beneath the window */}
          <div
            ref={indoorTextRef}
            className="absolute inset-x-0 inset-y-0 flex flex-col justify-between px-6 py-8 md:px-14 md:py-9"
          >
            <div className="pt-16 text-center md:pt-6">
              <p
                className="font-mono-tech text-[10px] font-medium tracking-[0.26em] uppercase"
                style={{ color: 'var(--ink-primary)', opacity: 0.85 }}
              >
                02 / Stepping Outside the Studio
              </p>
            </div>

            <div className="pb-4 text-center md:pb-6">
              <p
                className="font-display text-2xl italic md:text-3xl"
                style={{ color: 'var(--ink-primary)' }}
              >
                Beyond the desk—six interfaces built for real work.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
