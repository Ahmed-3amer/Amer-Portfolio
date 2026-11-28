import { Navigate, Route, Routes } from 'react-router-dom';
import { PageTransition } from '@/components/PageTransition';
import { StudioShell } from '@/components/StudioShell';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { HomePage } from '@/pages/HomePage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { WorkPage } from '@/pages/WorkPage';

export default function App() {
  return (
    <StudioShell>
      <PageTransition>
        {(displayLocation) => (
          <Routes location={displayLocation}>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </PageTransition>
    </StudioShell>
  );
}
