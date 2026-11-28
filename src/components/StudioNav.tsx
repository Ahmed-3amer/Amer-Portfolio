import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useCvModal } from '@/context/CvModalContext';
import { useSmoothScroll } from '@/context/SmoothScrollContext';
import { PROFILE } from '@/data/profile';

const NAV_ITEMS = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

export function StudioNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const { openCvModal } = useCvModal();
  const { stopScroll, startScroll } = useSmoothScroll();

  useEffect(() => {
    setMobileOpen(false);
    startScroll();
  }, [pathname, startScroll]);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => {
      const next = !prev;
      if (next) stopScroll();
      else startScroll();
      return next;
    });
  };

  const handleOpenCv = () => {
    setMobileOpen(false);
    openCvModal();
  };

  return (
    <>
      <nav
        aria-label="Primary studio navigation"
        className="fixed top-5 left-5 z-40 flex flex-col items-start gap-3 md:top-7 md:left-10 md:flex-row md:items-center md:gap-7"
      >
        <Link
          to="/"
          className="font-mono-tech surface-transition group inline-flex items-baseline gap-2 text-[17px] font-medium tracking-[0.16em] uppercase hover:opacity-80 md:gap-2.5 md:text-[23px] md:tracking-[0.17em]"
          style={{ color: 'var(--ink-primary)' }}
        >
          <span>Ahmed</span>
          <span style={{ color: 'var(--brass)' }}>Amer</span>
        </Link>

        <span
          aria-hidden="true"
          className="hidden h-4 w-px md:inline-block"
          style={{ backgroundColor: 'var(--hairline)' }}
        />

        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="font-mono-tech surface-transition relative py-1 text-[11px] tracking-[0.18em] uppercase transition-opacity hover:opacity-75"
              style={({ isActive }) => ({
                color: isActive ? 'var(--ink-primary)' : 'var(--ink-secondary)',
              })}
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className="surface-transition absolute right-0 -bottom-0.5 left-0 h-px transition-transform duration-300"
                    style={{
                      backgroundColor: 'var(--brass)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left center',
                    }}
                  />
                </>
              )}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={handleOpenCv}
            className="font-mono-tech surface-transition cursor-pointer border-b py-0.5 text-[11px] tracking-[0.18em] uppercase hover:opacity-75"
            style={{
              color: 'var(--brass)',
              borderColor: 'var(--brass-soft)',
            }}
          >
            CV
          </button>
        </div>

        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          className="archival-paper surface-transition inline-flex h-11 w-11 cursor-pointer items-center justify-center border md:hidden"
          style={{
            color: 'var(--ink-primary)',
            borderColor: mobileOpen ? 'var(--brass)' : 'var(--hairline)',
            boxShadow: '0 8px 20px -8px var(--paper-shadow)',
          }}
        >
          {mobileOpen ? (
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="archival-paper fixed inset-0 z-30 flex flex-col justify-between px-6 pt-32 pb-10 md:hidden"
          style={{ color: 'var(--ink-primary)' }}
        >
          <div className="flex flex-col">
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className="font-mono-tech flex items-baseline justify-between border-b py-4 text-sm font-medium tracking-[0.22em] uppercase"
              style={({ isActive }) => ({
                borderColor: 'var(--hairline)',
                color: isActive ? 'var(--brass)' : 'var(--ink-primary)',
              })}
            >
              <span>Home</span>
              <span className="text-[10px]" style={{ color: 'var(--ink-muted)' }}>
                00
              </span>
            </NavLink>
            {NAV_ITEMS.map((item, idx) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="font-mono-tech flex items-baseline justify-between border-b py-4 text-sm font-medium tracking-[0.22em] uppercase"
                style={({ isActive }) => ({
                  borderColor: 'var(--hairline)',
                  color: isActive ? 'var(--brass)' : 'var(--ink-primary)',
                })}
              >
                <span>{item.label}</span>
                <span className="text-[10px]" style={{ color: 'var(--ink-muted)' }}>
                  0{idx + 1}
                </span>
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleOpenCv}
              className="font-mono-tech flex cursor-pointer items-baseline justify-between gap-4 border-b py-4 text-left text-sm font-medium tracking-[0.22em] uppercase"
              style={{ borderColor: 'var(--hairline)', color: 'var(--brass)' }}
            >
              <span>Preview CV</span>
              <span className="shrink-0 text-[10px]" style={{ color: 'var(--brass)' }}>
                PDF / DOCX
              </span>
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <p
              className="font-mono-tech text-[10px] tracking-[0.18em] uppercase"
              style={{ color: 'var(--ink-muted)' }}
            >
              Direct Correspondence
            </p>
            <a
              href={`mailto:${PROFILE.contact.email}`}
              className="font-mono-tech text-xs"
              style={{ color: 'var(--ink-secondary)' }}
            >
              {PROFILE.contact.email}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
