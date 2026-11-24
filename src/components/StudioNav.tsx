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
        className="fixed top-6 left-6 z-40 flex items-center gap-5 md:top-8 md:left-10 md:gap-8"
      >
        <Link
          to="/"
          className="font-mono-tech surface-transition text-xs font-medium tracking-[0.22em] uppercase hover:opacity-75"
          style={{ color: 'var(--ink-primary)' }}
        >
          {PROFILE.name}
        </Link>

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
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          className="font-mono-tech inline-flex cursor-pointer items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase md:hidden"
          style={{ color: 'var(--ink-primary)' }}
        >
          {mobileOpen ? (
            <X size={16} strokeWidth={1.6} aria-hidden="true" />
          ) : (
            <Menu size={16} strokeWidth={1.6} aria-hidden="true" />
          )}
          <span>{mobileOpen ? 'Close' : 'Index'}</span>
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="archival-paper fixed inset-0 z-30 flex flex-col justify-between px-6 pt-28 pb-10 md:hidden"
          style={{ color: 'var(--ink-primary)' }}
        >
          <div className="flex flex-col gap-5">
            <NavLink
              to="/"
              onClick={() => setMobileOpen(false)}
              className="font-display border-b pb-3 text-4xl"
              style={{ borderColor: 'var(--hairline)' }}
            >
              Home
            </NavLink>
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="font-display border-b pb-3 text-4xl"
                style={{ borderColor: 'var(--hairline)' }}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleOpenCv}
              className="font-display cursor-pointer border-b pb-3 text-left text-4xl italic"
              style={{ borderColor: 'var(--hairline)', color: 'var(--brass)' }}
            >
              Preview &amp; Download CV
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <p
              className="font-mono-tech text-[11px] tracking-[0.16em] uppercase"
              style={{ color: 'var(--ink-muted)' }}
            >
              Direct Correspondence
            </p>
            <a
              href={`mailto:${PROFILE.contact.email}`}
              className="text-sm"
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
