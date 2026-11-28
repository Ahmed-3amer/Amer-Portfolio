import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CorrespondenceScene } from '@/components/home/CorrespondenceScene';
import { HeroDeskScene } from '@/components/home/HeroDeskScene';
import { OpeningNoteScene } from '@/components/home/OpeningNoteScene';
import { OutdoorWorkScene } from '@/components/home/OutdoorWorkScene';
import { StudioCraftScene } from '@/components/home/StudioCraftScene';
import { WindowPortalScene } from '@/components/home/WindowPortalScene';

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
      {/* Act I: Seated Inside the Luxury Wooden Studio */}
      <HeroDeskScene />
      <OpeningNoteScene />

      {/* Signature Portal: Camera Pushes Through the Architectural Window */}
      <WindowPortalScene />

      {/* Act II: Outdoor Architectural Space — All 6 Projects across 3 Narrative Chapters */}
      <OutdoorWorkScene />

      {/* Act III: Calm Return to the Wooden Studio Desk — Principles, Craft & Direct Correspondence */}
      <StudioCraftScene />
      <CorrespondenceScene />
    </div>
  );
}
