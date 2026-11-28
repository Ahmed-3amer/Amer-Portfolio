import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useLocation, type Location } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from '@/context/SmoothScrollContext';
import { getProjectBySlug } from '@/data/projects';

function getRouteLabel(pathname: string): string {
  if (pathname === '/') return '00 / Studio Desk';
  if (pathname === '/work') return '01 / Selected Work';
  if (pathname.startsWith('/work/')) {
    const slug = pathname.replace('/work/', '');
    const project = getProjectBySlug(slug);
    return project
      ? `${project.index} / ${project.shortTitle}`
      : 'Project Dossier';
  }
  if (pathname === '/about') return '02 / Studio Perspective';
  if (pathname === '/contact') return '03 / Direct Correspondence';
  return 'Ahmed Amer';
}

function getDocumentTitle(pathname: string): string {
  if (pathname === '/') return 'Ahmed Amer — Frontend Developer';
  if (pathname === '/work') return 'Selected Work — Ahmed Amer';
  if (pathname.startsWith('/work/')) {
    const slug = pathname.replace('/work/', '');
    const project = getProjectBySlug(slug);
    return project
      ? `${project.shortTitle} — Ahmed Amer`
      : 'Project Dossier — Ahmed Amer';
  }
  if (pathname === '/about') return 'About — Ahmed Amer';
  if (pathname === '/contact') return 'Contact — Ahmed Amer';
  return 'Ahmed Amer — Frontend Developer';
}

interface PageTransitionProps {
  children: (displayLocation: Location) => ReactNode;
}

/**
 * Physical Archival Paper-Sheet Route Transition Controller.
 * Keeps the continuous wooden studio & lighting atmosphere alive across routes
 * with zero white flash, synchronized scroll reset at peak sheet coverage,
 * and safe browser back/forward handling.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState<Location>(location);
  const [transitionLabel, setTransitionLabel] = useState<string>(() =>
    getRouteLabel(location.pathname),
  );

  const sheetRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const { scrollTo, stopScroll, startScroll } = useSmoothScroll();

  useEffect(() => {
    document.title = getDocumentTitle(location.pathname);
  }, [location.pathname]);

  useLayoutEffect(() => {
    if (sheetRef.current) {
      gsap.set(sheetRef.current, { yPercent: 100, force3D: true });
    }
  }, []);

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion || !sheetRef.current) {
      setDisplayLocation(location);
      scrollTo(0, true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    const sheet = sheetRef.current;
    const label = labelRef.current;
    const content = contentRef.current;

    gsap.killTweensOf([sheet, label, content].filter(Boolean));
    isTransitioningRef.current = true;
    setTransitionLabel(getRouteLabel(location.pathname));
    stopScroll();

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
        gsap.set(sheet, { yPercent: 100, force3D: true });
        startScroll();
      },
    });

    // Phase 1: Physical Archival Paper Sheet rises cleanly from below to cover viewport
    tl.fromTo(
      sheet,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.36,
        ease: 'power3.inOut',
        force3D: true,
      },
      0,
    );

    if (label) {
      tl.fromTo(
        label,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out', force3D: true },
        0.14,
      );
    }

    // Midpoint (fully covered): swap route & reset scroll cleanly to top with zero visual jump
    tl.add(() => {
      setDisplayLocation(location);
      scrollTo(0, true);
      window.scrollTo(0, 0);
    }, 0.37);

    // Let React mount the incoming route & clean up old ScrollTriggers
    tl.add(() => {
      ScrollTrigger.refresh();
    }, 0.44);

    if (label) {
      tl.to(
        label,
        { opacity: 0, y: -10, duration: 0.16, ease: 'power2.in', force3D: true },
        0.46,
      );
    }

    // Phase 2: Archival Paper Sheet sweeps upward revealing the fresh route smoothly
    tl.to(
      sheet,
      {
        yPercent: -100,
        duration: 0.44,
        ease: 'power3.out',
        force3D: true,
      },
      0.48,
    );

    if (content) {
      tl.fromTo(
        content,
        { opacity: 0.88, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          force3D: true,
        },
        0.5,
      );
    }

    return () => {
      if (isTransitioningRef.current) {
        gsap.killTweensOf([sheet, label, content].filter(Boolean));
        gsap.set(sheet, { yPercent: 100, force3D: true });
        if (content) gsap.set(content, { clearProps: 'transform,opacity' });
        startScroll();
        isTransitioningRef.current = false;
      }
    };
  }, [location, displayLocation.pathname, scrollTo, stopScroll, startScroll]);

  return (
    <>
      <div ref={contentRef} className="w-full">
        {children(displayLocation)}
      </div>

      {/* Physical Archival Paper Transition Sheet (GPU-only transform, zero white flash) */}
      <div
        ref={sheetRef}
        aria-hidden="true"
        className="archival-paper pointer-events-none fixed inset-0 z-45 flex flex-col justify-between border-t-2 px-6 py-10 will-change-transform md:px-14"
        style={{
          borderColor: 'var(--brass)',
          boxShadow: '0 -24px 56px -14px var(--wood-shadow)',
          transform: 'translate3d(0, 100%, 0)',
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-mono-tech text-[11px] tracking-[0.22em] uppercase"
            style={{ color: 'var(--ink-muted)' }}
          >
            Ahmed Amer · Studio
          </span>
          <span
            className="font-mono-tech text-[11px] tracking-[0.2em] uppercase"
            style={{ color: 'var(--brass)' }}
          >
            Frontend Developer
          </span>
        </div>

        <div ref={labelRef} className="my-auto text-center">
          <p
            className="font-mono-tech text-[11px] tracking-[0.26em] uppercase"
            style={{ color: 'var(--brass)' }}
          >
            Opening Folio
          </p>
          <p
            className="font-display mt-3 text-[clamp(2.2rem,5vw,4.4rem)] italic"
            style={{ color: 'var(--ink-primary)' }}
          >
            {transitionLabel}
          </p>
        </div>

        <div
          className="h-px w-full"
          style={{ backgroundColor: 'var(--hairline)' }}
        />
      </div>
    </>
  );
}
