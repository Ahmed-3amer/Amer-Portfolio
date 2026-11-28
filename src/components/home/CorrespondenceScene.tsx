import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUp, ArrowUpRight, Check, Copy, FileText } from 'lucide-react';
import { useCvModal } from '@/context/CvModalContext';
import { useSmoothScroll } from '@/context/SmoothScrollContext';
import { PROFILE } from '@/data/profile';

export function CorrespondenceScene() {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const { openCvModal } = useCvModal();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion || !footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-correspondence-reveal]',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // Clipboard fallback when restricted
      const input = document.createElement('input');
      input.value = PROFILE.contact.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <footer
      ref={footerRef}
      aria-label="Direct correspondence and studio closing"
      className="relative w-full overflow-hidden pt-20 pb-10 md:pt-28 md:pb-12"
    >
      {/* Calm Closing Desk Lighting */}
      <div
        aria-hidden="true"
        className="window-cast-shadow"
        style={{ opacity: 0.22 }}
      />
      <div aria-hidden="true" className="night-desk-lamp" />

      <div className="relative z-10 w-full px-6 md:px-14">
        {/* Correspondence Headline */}
        <div data-correspondence-reveal className="max-w-4xl">
          <p
            className="font-mono-tech text-[11px] font-medium tracking-[0.24em] uppercase"
            style={{ color: 'var(--brass)' }}
          >
            05 / Direct Correspondence
          </p>
          <h2
            className="font-display mt-4 text-[clamp(2.6rem,5.8vw,5.4rem)] leading-[0.98] tracking-[-0.02em]"
            style={{ color: 'var(--ink-primary)' }}
          >
            Have a project or role in mind?{' '}
            <em className="italic">Let’s start a clear conversation.</em>
          </h2>
        </div>

        {/* Monumental Direct Email + Copy Action */}
        <div
          data-correspondence-reveal
          className="archival-paper paper-elevation mt-12 border"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-6 border-b px-6 py-8 md:px-10 md:py-10"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <div>
              <p
                className="font-mono-tech text-[10px] tracking-[0.22em] uppercase"
                style={{ color: 'var(--ink-muted)' }}
              >
                Primary Inbox
              </p>
              <a
                href={`mailto:${PROFILE.contact.email}`}
                className="font-identity mt-1.5 inline-block text-[clamp(1.02rem,4.1vw,2.35rem)] font-semibold tracking-[-0.02em] whitespace-nowrap transition-opacity hover:opacity-75"
                style={{ color: 'var(--ink-primary)' }}
              >
                {PROFILE.contact.email}
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-live="polite"
              className="font-mono-tech surface-transition inline-flex cursor-pointer items-center gap-2.5 border px-5 py-3 text-[11px] tracking-[0.18em] uppercase hover:opacity-85"
              style={{
                backgroundColor: copied
                  ? 'var(--brass)'
                  : 'var(--ink-primary)',
                color: 'var(--paper-primary)',
                borderColor: copied ? 'var(--brass)' : 'var(--ink-primary)',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} strokeWidth={2} aria-hidden="true" />
                  <span>Email Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} strokeWidth={1.7} aria-hidden="true" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Verified Channels Ledger (Strictly Email, GitHub, LinkedIn + CV) */}
          <div
            className="grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <a
              href={PROFILE.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-6 py-6 transition-opacity hover:opacity-75 md:px-8"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div>
                <p
                  className="font-mono-tech text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  01 / GitHub
                </p>
                <p
                  className="font-mono-tech mt-1 text-xs font-medium tracking-[0.06em]"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {PROFILE.contact.githubHandle}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                strokeWidth={1.65}
                style={{ color: 'var(--brass)' }}
                aria-hidden="true"
              />
            </a>

            <a
              href={PROFILE.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-6 py-6 transition-opacity hover:opacity-75 md:px-8"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div>
                <p
                  className="font-mono-tech text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  02 / LinkedIn
                </p>
                <p
                  className="font-mono-tech mt-1 text-xs font-medium tracking-[0.06em]"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {PROFILE.contact.linkedinHandle}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                strokeWidth={1.65}
                style={{ color: 'var(--brass)' }}
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              onClick={openCvModal}
              className="group flex w-full cursor-pointer items-center justify-between px-6 py-6 text-left transition-opacity hover:opacity-75 md:px-8"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div>
                <p
                  className="font-mono-tech text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--brass)' }}
                >
                  03 / Curriculum Vitae
                </p>
                <p
                  className="font-mono-tech mt-1 text-xs font-medium tracking-[0.06em]"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  Preview · PDF &amp; Word (.docx)
                </p>
              </div>
              <FileText
                size={16}
                strokeWidth={1.65}
                style={{ color: 'var(--brass)' }}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* Minimal Understated Colophon Bar */}
        <div
          className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <p
            className="font-mono-tech text-[10px] tracking-[0.2em] uppercase"
            style={{ color: 'var(--ink-primary)', opacity: 0.72 }}
          >
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.role}
          </p>

          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="font-mono-tech group inline-flex cursor-pointer items-center gap-2 text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-75"
            style={{ color: 'var(--ink-primary)', opacity: 0.8 }}
          >
            <span>Return to Top</span>
            <ArrowUp
              size={13}
              strokeWidth={1.7}
              style={{ color: 'var(--brass)' }}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
