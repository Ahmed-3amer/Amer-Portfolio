import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextValue {
  stopScroll: () => void;
  startScroll: () => void;
  scrollTo: (target: string | number | HTMLElement, immediate?: boolean) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 0.92,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.4,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Pause smooth scroll engine when browser tab is hidden to save CPU & battery
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    // Debounced ScrollTrigger recalculation on viewport resize / mobile orientation switch
    let resizeTimer: number | undefined;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 180);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.clearTimeout(resizeTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(onTick);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const stopScroll = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const startScroll = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, immediate = false) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { immediate });
        return;
      }
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
      } else if (typeof target === 'string') {
        document.querySelector(target)?.scrollIntoView({
          behavior: immediate ? 'auto' : 'smooth',
        });
      } else {
        target.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth' });
      }
    },
    [],
  );

  const value = useMemo<SmoothScrollContextValue>(
    () => ({ stopScroll, startScroll, scrollTo }),
    [stopScroll, startScroll, scrollTo],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll(): SmoothScrollContextValue {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScroll must be used within SmoothScrollProvider');
  }
  return context;
}
