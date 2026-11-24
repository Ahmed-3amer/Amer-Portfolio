import { type ReactNode } from 'react';
import { CvModal } from '@/components/CvModal';
import { DayNightToggle } from '@/components/DayNightToggle';
import { StudioNav } from '@/components/StudioNav';
import { CvModalProvider } from '@/context/CvModalContext';
import { SmoothScrollProvider } from '@/context/SmoothScrollContext';

export function StudioShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <CvModalProvider>
        <div className="studio-wood-bg min-h-screen w-full">
          <StudioNav />
          <DayNightToggle />
          <main className="relative z-10 w-full">{children}</main>
          <CvModal />
        </div>
      </CvModalProvider>
    </SmoothScrollProvider>
  );
}
