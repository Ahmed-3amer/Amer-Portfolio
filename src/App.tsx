import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PageTransition } from '@/components/PageTransition';
import { StudioShell } from '@/components/StudioShell';
import { HomePage } from '@/pages/HomePage';

// Lazy-load secondary routes so initial Home Page bundle stays lean and fast
const WorkPage = lazy(() =>
  import('@/pages/WorkPage').then((m) => ({ default: m.WorkPage })),
);
const ProjectDetailPage = lazy(() =>
  import('@/pages/ProjectDetailPage').then((m) => ({
    default: m.ProjectDetailPage,
  })),
);
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
);
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);

export default function App() {
  return (
    <StudioShell>
      <PageTransition>
        {(displayLocation) => (
          <Suspense fallback={null}>
            <Routes location={displayLocation}>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/work/:slug" element={<ProjectDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        )}
      </PageTransition>
    </StudioShell>
  );
}
