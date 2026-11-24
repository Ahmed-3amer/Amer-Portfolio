import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { StudioShell } from '@/components/StudioShell';
import { HomePage } from '@/pages/HomePage';

function SubRouteStub({ title }: { title: string }) {
  return (
    <section className="flex min-h-screen w-full items-center pt-28 pb-16">
      <div
        className="archival-paper paper-elevation w-full border-y px-6 py-12 md:px-14"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <p
          className="font-mono-tech text-xs tracking-[0.2em] uppercase"
          style={{ color: 'var(--brass)' }}
        >
          Route Placeholder · Built in Phase F
        </p>
        <h1 className="font-display mt-3 text-5xl md:text-6xl">{title}</h1>
        <Link
          to="/"
          className="font-mono-tech mt-6 inline-block border-b pb-1 text-xs tracking-[0.16em] uppercase"
          style={{ borderColor: 'var(--brass)', color: 'var(--ink-primary)' }}
        >
          Return to Studio Desk
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <StudioShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<SubRouteStub title="Selected Work" />} />
        <Route
          path="/work/:slug"
          element={<SubRouteStub title="Project Dossier" />}
        />
        <Route path="/about" element={<SubRouteStub title="About" />} />
        <Route path="/contact" element={<SubRouteStub title="Contact" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </StudioShell>
  );
}
