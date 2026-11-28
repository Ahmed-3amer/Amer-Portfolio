import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, FileText } from 'lucide-react';
import {
  LaptopLiveScreen,
  type LaptopLiveScreenHandles,
} from '@/components/home/LaptopLiveScreen';
import { useCvModal } from '@/context/CvModalContext';
import { useSmoothScroll } from '@/context/SmoothScrollContext';
import { PROFILE } from '@/data/profile';

export function HeroDeskScene() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven choreography refs (zero mouse/hover motion — strictly scroll-driven!)
  const skyWrapRef = useRef<HTMLDivElement>(null);
  const shadowPlateRef = useRef<HTMLDivElement>(null);
  const windowUnitRef = useRef<HTMLDivElement>(null);
  const introCueRef = useRef<HTMLDivElement>(null);
  const introRuleRef = useRef<HTMLSpanElement>(null);
  const introEyebrowRef = useRef<HTMLParagraphElement>(null);
  const introLine1Ref = useRef<HTMLSpanElement>(null);
  const introLine2Ref = useRef<HTMLSpanElement>(null);
  const introScrollHintRef = useRef<HTMLParagraphElement>(null);
  const introArrowRef = useRef<HTMLSpanElement>(null);

  // Front-on modern creative workstation layers
  const deskShadowRef = useRef<HTMLDivElement>(null);
  const chairRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const liveScreenRef = useRef<LaptopLiveScreenHandles>(null);
  const lampRef = useRef<HTMLDivElement>(null);
  const lampBeamRef = useRef<HTMLDivElement>(null);
  const headphonesRef = useRef<HTMLDivElement>(null);
  const mugRef = useRef<HTMLDivElement>(null);
  const deskStackRef = useRef<HTMLDivElement>(null);

  // 3D scattering ambient & ordered content folios
  const ambientSheet1Ref = useRef<HTMLDivElement>(null);
  const ambientSheet2Ref = useRef<HTMLDivElement>(null);
  const ambientSheet3Ref = useRef<HTMLDivElement>(null);

  const nameSheetRef = useRef<HTMLDivElement>(null);
  const roleSheetRef = useRef<HTMLDivElement>(null);
  const copySheetRef = useRef<HTMLDivElement>(null);

  const { openCvModal } = useCvModal();
  const { scrollTo } = useSmoothScroll();

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      if (introCueRef.current) introCueRef.current.style.opacity = '0';
      if (deskStackRef.current) deskStackRef.current.style.opacity = '0';
      if (lampBeamRef.current) lampBeamRef.current.style.opacity = '1';
      if (deskShadowRef.current) deskShadowRef.current.style.opacity = '1';
      const screen = liveScreenRef.current;
      if (screen) {
        if (screen.statusBuilding) screen.statusBuilding.style.opacity = '0';
        if (screen.statusReady) screen.statusReady.style.opacity = '1';
        if (screen.nightGlow) screen.nightGlow.style.opacity = '1';
      }
      return;
    }

    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Crisp 1.15s Opening Choreography at scrollY = 0 (runs cleanly after zero-FOUC first paint)
      const introTl = gsap.timeline({
        delay: 0.12,
        defaults: { ease: 'power3.out' },
      });
      if (introRuleRef.current) {
        introTl.fromTo(
          introRuleRef.current,
          { scaleX: 0, opacity: 1, transformOrigin: 'left center' },
          { scaleX: 1, opacity: 1, duration: 0.7 },
          0.04,
        );
      }
      if (introEyebrowRef.current) {
        introTl.fromTo(
          introEyebrowRef.current,
          { y: 12, opacity: 0 },
          { y: 0, opacity: 0.88, duration: 0.62 },
          0.14,
        );
      }
      const lineNodes = [introLine1Ref.current, introLine2Ref.current].filter(
        Boolean,
      );
      if (lineNodes.length > 0) {
        introTl.fromTo(
          lineNodes,
          { yPercent: 110, opacity: 1 },
          { yPercent: 0, opacity: 1, duration: 0.88, stagger: 0.16, force3D: true },
          0.22,
        );
      }
      if (introScrollHintRef.current) {
        introTl.fromTo(
          introScrollHintRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 0.84, duration: 0.65 },
          0.6,
        );
      }
      if (introArrowRef.current) {
        introTl.fromTo(
          introArrowRef.current,
          { y: -3 },
          { y: 3, duration: 0.42, yoyo: true, repeat: 1, ease: 'power1.inOut' },
          0.84,
        );
      }

      // Initial off-stage states set synchronously BEFORE first paint (zero FOUC!)
      gsap.set(deskShadowRef.current, { opacity: 0, scaleX: 0.85, force3D: true });

      gsap.set(chairRef.current, {
        xPercent: -140,
        scale: 0.94,
        opacity: 0,
        force3D: true,
      });

      gsap.set(deskRef.current, {
        xPercent: -130,
        opacity: 0,
        force3D: true,
      });

      gsap.set(
        [
          laptopRef.current,
          lampRef.current,
          headphonesRef.current,
          mugRef.current,
          deskStackRef.current,
        ],
        {
          x: isMobile ? -150 : -280,
          y: -14,
          opacity: 0,
          force3D: true,
        },
      );

      gsap.set(lampBeamRef.current, { opacity: 0 });

      // Initial states for Pure-GPU HTML Living Frontend Laptop Screen
      const screen = liveScreenRef.current;
      const validCodeLines = screen
        ? screen.codeLines.filter((el): el is HTMLDivElement => Boolean(el))
        : [];
      const validUiBlocks = screen
        ? screen.uiBlocks.filter((el): el is HTMLDivElement => Boolean(el))
        : [];

      if (screen?.screenRoot) {
        gsap.set(screen.screenRoot, { opacity: 0 });
      }
      if (screen?.nightGlow) {
        gsap.set(screen.nightGlow, { opacity: 0 });
      }
      if (validCodeLines.length > 0) {
        gsap.set(validCodeLines, { opacity: 0, x: -8, force3D: true });
      }
      if (validUiBlocks.length > 0) {
        gsap.set(validUiBlocks, { opacity: 0, y: 8, force3D: true });
      }
      if (screen?.caret) {
        gsap.set(screen.caret, { opacity: 0 });
      }
      if (screen?.statusReady) {
        gsap.set(screen.statusReady, { opacity: 0 });
      }
      if (screen?.liveDot) {
        gsap.set(screen.liveDot, { opacity: 0.28 });
      }

      gsap.set(
        [
          ambientSheet1Ref.current,
          ambientSheet2Ref.current,
          ambientSheet3Ref.current,
        ],
        {
          x: isMobile ? 40 : 120,
          y: isMobile ? 160 : 210,
          scale: 0.3,
          rotateX: 45,
          opacity: 0,
          force3D: true,
        },
      );

      gsap.set(nameSheetRef.current, {
        x: isMobile ? 25 : 165,
        y: isMobile ? 200 : 275,
        scale: 0.34,
        rotateX: 44,
        rotateY: -18,
        rotateZ: -12,
        opacity: 0,
        force3D: true,
      });

      gsap.set(roleSheetRef.current, {
        x: isMobile ? 15 : 130,
        y: isMobile ? 165 : 220,
        scale: 0.34,
        rotateX: 40,
        rotateY: 16,
        rotateZ: 10,
        opacity: 0,
        force3D: true,
      });

      gsap.set(copySheetRef.current, {
        x: isMobile ? 12 : 115,
        y: isMobile ? 115 : 150,
        scale: 0.36,
        rotateX: 34,
        rotateY: -10,
        rotateZ: -8,
        opacity: 0,
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: isMobile ? '+=300%' : '+=420%',
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Continuous subtle parallax across Window & Cast Shadow (scroll only)
      if (skyWrapRef.current) {
        tl.fromTo(
          skyWrapRef.current,
          { yPercent: -4, scale: 1.05 },
          {
            yPercent: 6,
            scale: 1.15,
            duration: 1,
            ease: 'none',
            force3D: true,
          },
          0,
        );
      }

      if (shadowPlateRef.current) {
        tl.fromTo(
          shadowPlateRef.current,
          { x: 0, y: 0 },
          {
            x: 48,
            y: 34,
            duration: 1,
            ease: 'none',
            force3D: true,
          },
          0,
        );
      }

      if (windowUnitRef.current) {
        tl.fromTo(
          windowUnitRef.current,
          { y: 0 },
          {
            y: isMobile ? -6 : -12,
            duration: 1,
            ease: 'none',
            force3D: true,
          },
          0,
        );
      }

      // 0.00 -> 0.08: Quiet studio opening prompt glides away smoothly
      if (introCueRef.current) {
        tl.to(
          introCueRef.current,
          { opacity: 0, y: -24, duration: 0.08, ease: 'power2.in' },
          0,
        );
      }

      // STAGE 1 (0.04 -> 0.19): Luxury Executive Chair glides smoothly from the left into center-back
      if (chairRef.current) {
        tl.to(
          chairRef.current,
          {
            xPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.15,
            ease: 'power3.out',
            force3D: true,
          },
          0.04,
        );
      }

      // STAGE 2 (0.14 -> 0.30): Luxury Smoked-Walnut Front-On Desk glides smoothly from left in front of chair
      if (deskShadowRef.current) {
        tl.to(
          deskShadowRef.current,
          { opacity: 1, scaleX: 1, duration: 0.16, ease: 'power2.out', force3D: true },
          0.16,
        );
      }

      if (deskRef.current) {
        tl.to(
          deskRef.current,
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.16,
            ease: 'power3.out',
            force3D: true,
          },
          0.14,
        );
      }

      // STAGE 3 (0.27 -> 0.55): Deliberate, weighted developer tools glide from left into organized tabletop spots
      if (laptopRef.current) {
        tl.to(
          laptopRef.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.13,
            ease: 'power3.out',
            force3D: true,
          },
          0.27,
        );
      }

      // STAGE 3B (0.31 -> 0.72): Pure-GPU Living Frontend Laptop Screen wakes up, writes TSX & builds Live UI
      if (screen?.screenRoot) {
        tl.to(
          screen.screenRoot,
          { opacity: 1, duration: 0.08, ease: 'power2.out' },
          0.31,
        );
      }
      if (screen?.nightGlow) {
        tl.to(
          screen.nightGlow,
          { opacity: 1, duration: 0.12, ease: 'power2.out' },
          0.34,
        );
      }
      if (validCodeLines.length > 0) {
        tl.to(
          validCodeLines,
          {
            opacity: 1,
            x: 0,
            duration: 0.055,
            stagger: 0.04,
            ease: 'power2.out',
            force3D: true,
          },
          0.35,
        );
      }
      if (screen?.caret) {
        tl.to(
          screen.caret,
          { opacity: 1, duration: 0.04, ease: 'none' },
          0.55,
        );
      }
      if (validUiBlocks.length > 0) {
        tl.to(
          validUiBlocks,
          {
            opacity: 1,
            y: 0,
            duration: 0.075,
            stagger: 0.065,
            ease: 'power3.out',
            force3D: true,
          },
          0.39,
        );
      }
      if (screen?.statusBuilding) {
        tl.to(
          screen.statusBuilding,
          { opacity: 0, duration: 0.04, ease: 'power1.in' },
          0.65,
        );
      }
      if (screen?.statusReady) {
        tl.to(
          screen.statusReady,
          { opacity: 1, duration: 0.05, ease: 'power2.out' },
          0.67,
        );
      }
      if (screen?.liveDot) {
        tl.to(
          screen.liveDot,
          { opacity: 1, duration: 0.06, ease: 'power2.out' },
          0.65,
        );
      }

      if (lampRef.current) {
        tl.to(
          lampRef.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.12,
            ease: 'power3.out',
            force3D: true,
          },
          0.34,
        );
      }

      // Dynamic Night Desk-Lamp Illumination awakens right as the brass lamp lands on the desk
      if (lampBeamRef.current) {
        tl.to(
          lampBeamRef.current,
          { opacity: 1, duration: 0.11, ease: 'power2.out' },
          0.42,
        );
      }

      if (headphonesRef.current) {
        tl.to(
          headphonesRef.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.12,
            ease: 'power3.out',
            force3D: true,
          },
          0.4,
        );
      }

      if (mugRef.current) {
        tl.to(
          mugRef.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: 'power3.out',
            force3D: true,
          },
          0.44,
        );
      }

      if (deskStackRef.current) {
        tl.to(
          deskStackRef.current,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: 'power3.out',
            force3D: true,
          },
          0.46,
        );
      }

      // STAGE 4 (0.56 -> 0.94): Paper stack peels off the desk in 3D flight -> Ordered Identity Reveal
      if (deskStackRef.current) {
        tl.to(
          deskStackRef.current,
          {
            y: -42,
            rotateX: 46,
            scale: 1.12,
            opacity: 0,
            duration: 0.09,
            ease: 'power2.in',
            force3D: true,
          },
          0.56,
        );
      }

      // Ambient background scattering papers with curved 3D flutter
      if (ambientSheet1Ref.current) {
        tl.to(
          ambientSheet1Ref.current,
          {
            x: isMobile ? -95 : -175,
            y: isMobile ? -120 : -155,
            rotateX: 6,
            rotateY: 12,
            rotateZ: -17,
            scale: 0.9,
            opacity: 0.6,
            duration: 0.18,
            ease: 'power2.out',
            force3D: true,
          },
          0.57,
        );
      }

      if (ambientSheet2Ref.current) {
        tl.to(
          ambientSheet2Ref.current,
          {
            x: isMobile ? 105 : 240,
            y: isMobile ? -88 : -130,
            rotateX: -8,
            rotateY: -14,
            rotateZ: 15,
            scale: 0.84,
            opacity: 0.54,
            duration: 0.19,
            ease: 'power2.out',
            force3D: true,
          },
          0.59,
        );
      }

      if (ambientSheet3Ref.current) {
        tl.to(
          ambientSheet3Ref.current,
          {
            x: isMobile ? 85 : 210,
            y: isMobile ? -10 : -35,
            rotateX: 8,
            rotateY: 10,
            rotateZ: -10,
            scale: 0.8,
            opacity: 0.46,
            duration: 0.18,
            ease: 'power2.out',
            force3D: true,
          },
          0.61,
        );
      }

      // Ordered Sheet 1 (0.58 -> 0.72): NAME ("Ahmed Amer") — Luxury Upright Syne
      if (nameSheetRef.current) {
        tl.to(
          nameSheetRef.current,
          {
            x: 0,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: -0.65,
            opacity: 1,
            duration: 0.14,
            ease: 'power3.out',
            force3D: true,
          },
          0.58,
        );
      }

      // Ordered Sheet 2 (0.70 -> 0.82): ROLE ("Frontend Developer") — Luxury Upright Syne
      if (roleSheetRef.current) {
        tl.to(
          roleSheetRef.current,
          {
            x: 0,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0.6,
            opacity: 1,
            duration: 0.12,
            ease: 'power3.out',
            force3D: true,
          },
          0.7,
        );
      }

      // Ordered Sheet 3 (0.80 -> 0.94): CONCISE COPY + BOTH BUTTONS
      if (copySheetRef.current) {
        tl.to(
          copySheetRef.current,
          {
            x: 0,
            y: 0,
            scale: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: -0.25,
            opacity: 1,
            duration: 0.14,
            ease: 'power3.out',
            force3D: true,
          },
          0.8,
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Ahmed Amer interactive studio hero"
      className="relative h-svh min-h-[620px] w-full overflow-hidden"
    >
      {/* Realistic angled sunlight / moonlight window shadow sweeping across the wooden room */}
      <div
        ref={shadowPlateRef}
        aria-hidden="true"
        className="window-cast-shadow will-change-transform"
      />

      {/* Grounded warm ambient desk-lamp layer (NIGHT mode base warmth) */}
      <div aria-hidden="true" className="night-desk-lamp" />

      {/* Main 100svh Full-Bleed Architectural Composition */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 pb-4 md:px-10 md:pb-5 lg:pr-5 lg:pl-12">
        {/* Core Studio Stage: Left Interactive Workstation + Right Enlarged 4-Sided Window */}
        <div className="relative grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-6">
          {/* LEFT STAGE (7 cols on desktop): Front-On Larger Creative Workstation + 3D Flying Papers */}
          <div className="hero-perspective hero-folio-stack relative z-20 flex h-full min-h-0 flex-col justify-start pt-[28svh] md:pt-[27svh] lg:col-span-7 lg:pt-[76px]">
            {/* Initial Quiet Studio Entrance Prompt (animated with crisp 1.15s paper-edge choreography at scrollY = 0) */}
            <div
              ref={introCueRef}
              className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center pr-2"
            >
              <div className="flex items-center gap-3">
                <span
                  ref={introRuleRef}
                  aria-hidden="true"
                  className="hero-staged inline-block h-[1.5px] w-9 will-change-transform"
                  style={{ backgroundColor: 'var(--brass)' }}
                />
                <p
                  ref={introEyebrowRef}
                  className="hero-staged font-mono-tech text-[11px] font-medium tracking-[0.22em] uppercase"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  01 / The Studio
                </p>
              </div>
              <p
                className="font-display mt-3 max-w-md text-[clamp(2.2rem,4.1vw,3.7rem)] leading-[1.06] italic"
                style={{ color: 'var(--ink-primary)' }}
              >
                <span className="block overflow-hidden pb-0.5">
                  <span
                    ref={introLine1Ref}
                    className="hero-staged block will-change-transform"
                  >
                    A quiet workspace
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span
                    ref={introLine2Ref}
                    className="hero-staged block will-change-transform"
                  >
                    by the window.
                  </span>
                </span>
              </p>
              <p
                ref={introScrollHintRef}
                className="hero-staged font-mono-tech mt-5 flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase"
                style={{ color: 'var(--ink-primary)' }}
              >
                <span>Scroll to assemble the studio</span>
                <span ref={introArrowRef} className="inline-flex">
                  <ArrowDown
                    size={13}
                    strokeWidth={1.7}
                    style={{ color: 'var(--brass)' }}
                    aria-hidden="true"
                  />
                </span>
              </p>
            </div>

            {/* STRAIGHT FRONT-ON ENLARGED CREATIVE DEVELOPER WORKSTATION (zero-FOUC staged, 60fps GPU composited) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 flex items-end justify-center lg:justify-start lg:pl-0"
            >
              <div className="hero-workstation-stage relative w-[98%] max-w-[580px] lg:w-[min(99%,84svh)] lg:max-w-[780px]">
                {/* Lightweight Grounded Contact Shadow beneath Desk & Chair (zero drop-shadow filter cost) */}
                <div
                  ref={deskShadowRef}
                  className="desk-ground-shadow hero-staged absolute -inset-x-[4%] -bottom-[2%] z-0 h-[12%] will-change-transform"
                />

                {/* Dynamic Night Desk-Lamp Light Cone (awakens softly when brass lamp lands) */}
                <div
                  ref={lampBeamRef}
                  className="lamp-beam-night hero-staged absolute -inset-x-[28%] -top-[105%] -bottom-[15%] z-30 will-change-transform"
                />

                {/* DEPTH LAYER 1: Modern Ergonomic Minimalist Mesh Chair centered symmetrically behind desk */}
                <div className="absolute bottom-[4.5%] left-1/2 z-10 w-[37.5%] -translate-x-1/2">
                  <div ref={chairRef} className="hero-staged w-full will-change-transform">
                    <img
                      src="/images/studio/luxury-chair.webp"
                      alt=""
                      width={392}
                      height={720}
                      decoding="async"
                      className="studio-furniture h-auto w-full object-contain select-none"
                    />
                  </div>
                </div>

                {/* DEPTH LAYER 2: Straight Front-On Smoked-Walnut Desk + Enlarged Organized Developer Tools */}
                <div className="relative z-20 w-full">
                  <div ref={deskRef} className="hero-staged relative w-full will-change-transform">
                    <img
                      src="/images/studio/luxury-desk.webp"
                      alt=""
                      width={1040}
                      height={481}
                      decoding="async"
                      className="studio-furniture relative z-10 h-auto w-full object-contain select-none"
                    />
                  </div>

                  {/* Tool 1 (Far Left): Brushed Antique Brass Architectural Desk Lamp */}
                  <div
                    ref={lampRef}
                    className="hero-staged absolute bottom-[85%] left-[5%] z-20 w-[17.5%] will-change-transform"
                  >
                    <img
                      src="/images/studio/desk-lamp.webp"
                      alt=""
                      width={297}
                      height={520}
                      decoding="async"
                      className="studio-tool h-auto w-full object-contain select-none"
                    />
                  </div>

                  {/* Tool 2 (Left-Center): Minimalist Matte Charcoal Stoneware Mug */}
                  <div
                    ref={mugRef}
                    className="hero-staged absolute bottom-[86%] left-[24%] z-20 w-[7.2%] will-change-transform"
                  >
                    <img
                      src="/images/studio/mug.webp"
                      alt=""
                      width={240}
                      height={201}
                      decoding="async"
                      className="studio-tool h-auto w-full object-contain select-none"
                    />
                  </div>

                  {/* Tool 3 (Slightly Right of Center on Leather Mat): Enlarged Developer Laptop + LIVE Scroll-Synced Screen */}
                  <div
                    ref={laptopRef}
                    className="hero-staged absolute bottom-[85.8%] left-[35.8%] z-30 w-[37%] will-change-transform"
                  >
                    <img
                      src="/images/studio/laptop.webp"
                      alt=""
                      width={620}
                      height={381}
                      decoding="async"
                      className="studio-tool relative z-10 h-auto w-full object-contain select-none"
                    />
                    <LaptopLiveScreen ref={liveScreenRef} />
                  </div>

                  {/* Tool 4 (Right-Center beside Laptop): Crisp Stack of Archival Papers */}
                  <div
                    ref={deskStackRef}
                    className="hero-staged absolute bottom-[87%] left-[73.5%] z-20 h-[6.5%] w-[10.2%] will-change-transform"
                  >
                    <div
                      className="archival-paper absolute inset-x-0 bottom-0 h-[55%] border"
                      style={{
                        borderColor: 'var(--paper-edge)',
                        transform: 'translate(-2px, 0)',
                        boxShadow: '0 2px 5px var(--paper-shadow)',
                      }}
                    />
                    <div
                      className="archival-paper absolute inset-x-0 bottom-[26%] h-[55%] border"
                      style={{
                        borderColor: 'var(--paper-edge)',
                        transform: 'translate(2px, 0)',
                        boxShadow: '0 2px 6px var(--paper-shadow)',
                      }}
                    />
                    <div
                      className="archival-paper absolute inset-x-0 bottom-[52%] flex h-[55%] items-center border px-1.5"
                      style={{
                        borderColor: 'var(--hairline)',
                        boxShadow: '0 3px 8px var(--paper-shadow)',
                      }}
                    >
                      <span
                        className="block h-px w-2/3"
                        style={{ backgroundColor: 'var(--brass)', opacity: 0.75 }}
                      />
                    </div>
                  </div>

                  {/* Tool 5 (Far Right): Luxury Wireless Studio Headphones on Sculpted Walnut Stand */}
                  <div
                    ref={headphonesRef}
                    className="hero-staged absolute right-[4.5%] bottom-[85.5%] z-20 w-[14%] will-change-transform"
                  >
                    <img
                      src="/images/studio/headphones.webp"
                      alt=""
                      width={270}
                      height={420}
                      decoding="async"
                      className="studio-tool h-auto w-full object-contain select-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* AMBIENT 3D SCATTERING PAPER SHEETS */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            >
              <div
                ref={ambientSheet1Ref}
                className="archival-paper paper-elevation hero-staged absolute h-20 w-28 border p-2.5 will-change-transform md:h-24 md:w-36"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <span
                  className="font-mono-tech block text-[8px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  FIG. 01
                </span>
                <div
                  className="mt-2 h-px w-full"
                  style={{ backgroundColor: 'var(--hairline)' }}
                />
                <div
                  className="mt-2 h-px w-3/4"
                  style={{ backgroundColor: 'var(--hairline)' }}
                />
              </div>

              <div
                ref={ambientSheet2Ref}
                className="archival-paper paper-elevation hero-staged absolute h-20 w-28 border p-2.5 will-change-transform md:h-24 md:w-36"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <span
                  className="font-mono-tech block text-[8px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--brass)' }}
                >
                  STUDIO FOLIO
                </span>
                <div
                  className="mt-2 h-px w-2/3"
                  style={{ backgroundColor: 'var(--hairline)' }}
                />
              </div>

              <div
                ref={ambientSheet3Ref}
                className="archival-paper paper-elevation hero-staged absolute hidden h-16 w-24 border p-2 will-change-transform md:block"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <div
                  className="h-px w-full"
                  style={{ backgroundColor: 'var(--hairline)' }}
                />
                <div
                  className="mt-2 h-px w-1/2"
                  style={{ backgroundColor: 'var(--hairline)' }}
                />
              </div>
            </div>

            {/* DEPTH LAYER 3: ORDERED FLYING CONTENT PAPER FOLIOS (1. Name -> 2. Role -> 3. Concise Copy + Buttons) */}
            <div className="relative z-30 flex flex-col items-start gap-1.5 pr-1 md:gap-2">
              {/* SHEET 1: NAME ("Ahmed Amer") — Luxury Sculpted Upright Syne */}
              <div
                ref={nameSheetRef}
                className="archival-paper paper-elevation hero-staged border px-4 py-2 will-change-transform md:px-5 md:py-2.5"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <p
                  className="font-mono-tech text-[9px] tracking-[0.22em] uppercase"
                  style={{ color: 'var(--brass)' }}
                >
                  01 / Name
                </p>
                <h1
                  className="font-identity mt-0.5 text-[clamp(1.9rem,3.4vw,3.2rem)] leading-[1.04] font-semibold tracking-[-0.025em] not-italic"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {PROFILE.name}
                </h1>
              </div>

              {/* SHEET 2: DISCIPLINE ("Frontend Developer") — Luxury Sculpted Upright Syne */}
              <div
                ref={roleSheetRef}
                className="archival-paper paper-elevation hero-staged ml-2 border px-4 py-1.5 will-change-transform md:ml-8 md:px-5 md:py-2"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <p
                  className="font-mono-tech text-[9px] tracking-[0.22em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  02 / Discipline
                </p>
                <p
                  className="font-identity mt-0.5 text-[clamp(1.15rem,2vw,1.8rem)] leading-tight font-medium tracking-[-0.015em] not-italic"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {PROFILE.role}
                </p>
              </div>

              {/* SHEET 3: CONCISE STATEMENT + BOTH ACTION BUTTONS */}
              <div
                ref={copySheetRef}
                className="archival-paper paper-elevation hero-staged max-w-lg border px-4 py-2.5 will-change-transform md:ml-2 md:px-5 md:py-3"
                style={{ borderColor: 'var(--hairline)' }}
              >
                <p
                  className="text-sm leading-relaxed md:text-[0.93rem] md:leading-[1.54]"
                  style={{ color: 'var(--ink-primary)', opacity: 0.9 }}
                >
                  {PROFILE.heroIntro}
                </p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => scrollTo('#window-portal')}
                    className="font-mono-tech surface-transition inline-flex cursor-pointer items-center gap-2 border px-4 py-2 text-[10px] tracking-[0.16em] uppercase hover:opacity-85 md:text-[11px]"
                    style={{
                      backgroundColor: 'var(--ink-primary)',
                      color: 'var(--paper-primary)',
                      borderColor: 'var(--ink-primary)',
                    }}
                  >
                    <span>Explore Selected Work</span>
                    <ArrowDown size={13} strokeWidth={1.7} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={openCvModal}
                    className="font-mono-tech surface-transition inline-flex cursor-pointer items-center gap-2 border px-4 py-2 text-[10px] tracking-[0.16em] uppercase hover:opacity-80 md:text-[11px]"
                    style={{
                      backgroundColor: 'var(--paper-secondary)',
                      color: 'var(--ink-primary)',
                      borderColor: 'var(--hairline)',
                    }}
                  >
                    <FileText
                      size={13}
                      strokeWidth={1.65}
                      style={{ color: 'var(--brass)' }}
                      aria-hidden="true"
                    />
                    <span>Preview CV</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT STAGE (5 cols on desktop): Enlarged Framed 4-Sided Architectural Window embracing DAY / NIGHT */}
          <div className="hidden h-full items-stretch justify-end pt-3 pb-4 lg:col-span-5 lg:flex">
            <div
              ref={windowUnitRef}
              className="relative h-full w-full max-w-[600px] will-change-transform"
            >
              {/* Complete 4-Sided Milled Timber Frame */}
              <div
                className="relative h-full w-full overflow-hidden"
                style={{
                  border: '14px solid var(--window-frame-outer)',
                  boxShadow:
                    'inset 0 0 0 1px var(--window-frame-inner), 0 24px 44px var(--wood-shadow), -10px 10px 26px var(--wood-shadow)',
                }}
              >
                {/* Still Photographic Sky & Clouds (Zero idle drift; parallax strictly on scroll) */}
                <div
                  ref={skyWrapRef}
                  className="absolute inset-0 will-change-transform"
                  style={{ transform: 'scale(1.06)' }}
                >
                  <div className="sky-plate sky-plate-day" />
                  <div className="sky-plate sky-plate-night" />
                </div>

                {/* Whisper Diagonal Glass Light Sheen & Interior Jamb Depth */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(128deg, var(--glass-tint) 0%, transparent 34%, var(--glass-sheen) 47%, transparent 57%)',
                    boxShadow:
                      'inset 12px 12px 28px var(--window-jamb-shadow), inset 0 -8px 20px var(--window-jamb-shadow)',
                  }}
                />

                {/* 2x3 Architectural Timber Mullions */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                >
                  <div
                    className="absolute top-0 bottom-0 left-1/2 w-[10px] -translate-x-1/2"
                    style={{
                      backgroundColor: 'var(--window-mullion)',
                      boxShadow:
                        'inset 1.5px 0 0 var(--window-frame-inner), 3px 0 12px var(--window-jamb-shadow)',
                    }}
                  />
                  <div
                    className="absolute top-[33.5%] right-0 left-0 h-[9px]"
                    style={{
                      backgroundColor: 'var(--window-mullion)',
                      boxShadow:
                        'inset 0 1.5px 0 var(--window-frame-inner), 0 3px 12px var(--window-jamb-shadow)',
                    }}
                  />
                  <div
                    className="absolute top-[67%] right-0 left-0 h-[9px]"
                    style={{
                      backgroundColor: 'var(--window-mullion)',
                      boxShadow:
                        'inset 0 1.5px 0 var(--window-frame-inner), 0 3px 12px var(--window-jamb-shadow)',
                    }}
                  />
                  <div
                    className="absolute inset-0 border"
                    style={{ borderColor: 'var(--window-frame-inner)' }}
                  />
                </div>
              </div>

              {/* Protruding Architectural Wooden Windowsill */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -bottom-3 -left-3 h-[14px]"
                style={{
                  backgroundColor: 'var(--window-sill)',
                  borderTop: '1px solid var(--window-frame-inner)',
                  boxShadow: '0 10px 22px var(--wood-shadow)',
                }}
              />
            </div>
          </div>

          {/* Mobile Framed 4-Sided Architectural Window (symmetric 2x2 panes, wide left & right panes embracing DAY / NIGHT) */}
          <div className="pointer-events-none absolute top-2 -right-3 z-10 h-[25.5svh] max-h-[225px] min-h-[178px] w-[66%] max-w-[262px] lg:hidden">
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                border: '9px solid var(--window-frame-outer)',
                boxShadow:
                  'inset 0 0 0 1px var(--window-frame-inner), inset 8px 8px 18px var(--window-jamb-shadow), 0 14px 28px var(--wood-shadow)',
              }}
            >
              <div className="sky-plate sky-plate-day" />
              <div className="sky-plate sky-plate-night" />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(128deg, var(--glass-tint) 0%, transparent 34%, var(--glass-sheen) 47%, transparent 57%)',
                }}
              />
              <div
                className="absolute top-0 bottom-0 left-1/2 w-[6px] -translate-x-1/2"
                style={{
                  backgroundColor: 'var(--window-mullion)',
                  boxShadow: 'inset 1px 0 0 var(--window-frame-inner)',
                }}
              />
              <div
                className="absolute top-[48%] right-0 left-0 h-[6px]"
                style={{
                  backgroundColor: 'var(--window-mullion)',
                  boxShadow: 'inset 0 1px 0 var(--window-frame-inner)',
                }}
              />
            </div>
            <div
              className="absolute -right-2 -bottom-2 -left-2 h-[9px]"
              style={{
                backgroundColor: 'var(--window-sill)',
                borderTop: '1px solid var(--window-frame-inner)',
                boxShadow: '0 8px 16px var(--wood-shadow)',
              }}
            />
          </div>
        </div>

        {/* Bottom Studio Status Strip */}
        <div
          className="relative z-30 flex shrink-0 items-center justify-between border-t pt-3"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <span
            className="font-mono-tech text-[10px] tracking-[0.2em] uppercase"
            style={{ color: 'var(--ink-primary)', opacity: 0.78 }}
          >
            01 / Studio Desk — Scroll to assemble &amp; reveal
          </span>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={openCvModal}
              className="font-mono-tech hidden cursor-pointer border-b text-[10px] tracking-[0.18em] uppercase transition-opacity hover:opacity-75 sm:inline"
              style={{
                color: 'var(--brass)',
                borderColor: 'var(--brass-soft)',
              }}
            >
              Quick CV Preview
            </button>
            <span
              className="font-mono-tech text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'var(--ink-primary)', opacity: 0.65 }}
            >
              06 Shipped Works
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
