import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  FileText,
} from 'lucide-react';
import { useCvModal } from '@/context/CvModalContext';
import { PROFILE } from '@/data/profile';

export function ContactPage() {
  const [copied, setCopied] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const { openCvModal } = useCvModal();

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-contact-reveal]',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          force3D: true,
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = PROFILE.contact.email;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div
      ref={pageRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-6 pt-32 pb-12 md:px-14 md:pt-40 md:pb-14"
    >
      {/* Continuous Studio Daylight / Night Lamp Atmosphere */}
      <div
        aria-hidden="true"
        className="window-cast-shadow"
        style={{ opacity: 0.24 }}
      />
      <div aria-hidden="true" className="night-desk-lamp" />

      <div className="relative z-10 w-full">
        <p
          data-contact-reveal
          className="font-mono-tech text-[11px] font-medium tracking-[0.24em] uppercase"
          style={{ color: 'var(--brass)' }}
        >
          03 / Direct Correspondence
        </p>

        <h1
          data-contact-reveal
          className="font-display mt-4 max-w-4xl text-[clamp(2.8rem,6.4vw,5.8rem)] leading-[0.96] tracking-[-0.02em]"
          style={{ color: 'var(--ink-primary)' }}
        >
          Direct lines, no clutter.
          <br />
          <em className="italic">Let’s start a clear conversation.</em>
        </h1>

        <p
          data-contact-reveal
          className="mt-5 max-w-xl text-base leading-relaxed md:text-lg"
          style={{ color: 'var(--ink-secondary)' }}
        >
          Available for frontend engineering roles, product collaborations, and
          selected client builds. Reach out directly by email or through GitHub
          and LinkedIn below.
        </p>

        {/* Full-Bleed Tactile Correspondence Folio (Verified Channels Only — Zero Form / Address / Phone) */}
        <div
          data-contact-reveal
          className="archival-paper paper-elevation mt-12 w-full border"
          style={{ borderColor: 'var(--hairline)' }}
        >
          {/* Primary Email & One-Click Copy Row */}
          <div
            className="flex flex-col justify-between gap-6 border-b px-6 py-9 md:flex-row md:items-center md:px-12 md:py-11"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <div>
              <p
                className="font-mono-tech text-[10px] tracking-[0.22em] uppercase"
                style={{ color: 'var(--brass)' }}
              >
                Primary Inbox
              </p>
              <a
                href={`mailto:${PROFILE.contact.email}`}
                className="font-identity mt-2.5 block text-[clamp(1.02rem,4.1vw,2.45rem)] font-semibold tracking-[-0.02em] whitespace-nowrap transition-opacity hover:opacity-75"
                style={{ color: 'var(--ink-primary)' }}
              >
                {PROFILE.contact.email}
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="font-mono-tech surface-transition inline-flex shrink-0 cursor-pointer items-center gap-2.5 self-start border px-6 py-3.5 text-[11px] tracking-[0.18em] uppercase hover:opacity-85 md:self-auto"
              style={{
                backgroundColor: copied ? 'var(--brass)' : 'var(--ink-primary)',
                color: 'var(--paper-primary)',
                borderColor: copied ? 'var(--brass)' : 'var(--ink-primary)',
              }}
            >
              {copied ? (
                <>
                  <Check size={14} strokeWidth={1.85} aria-hidden="true" />
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

          {/* 3-Column Direct Links & Curriculum Vitae Row */}
          <div
            className="grid grid-cols-1 divide-y md:grid-cols-3 md:divide-x md:divide-y-0"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <a
              href={PROFILE.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-transition flex items-center justify-between px-6 py-7 transition-opacity hover:opacity-75 md:px-12"
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
                  className="font-mono-tech mt-2 text-xs md:text-sm"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {PROFILE.contact.githubHandle}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                strokeWidth={1.7}
                style={{ color: 'var(--brass)' }}
                aria-hidden="true"
              />
            </a>

            <a
              href={PROFILE.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-transition flex items-center justify-between px-6 py-7 transition-opacity hover:opacity-75 md:px-12"
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
                  className="font-mono-tech mt-2 text-xs md:text-sm"
                  style={{ color: 'var(--ink-primary)' }}
                >
                  {PROFILE.contact.linkedinHandle}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                strokeWidth={1.7}
                style={{ color: 'var(--brass)' }}
                aria-hidden="true"
              />
            </a>

            <div
              className="flex flex-col justify-between gap-4 px-6 py-7 md:px-12"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div>
                <p
                  className="font-mono-tech text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--ink-muted)' }}
                >
                  03 / Curriculum Vitae
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={openCvModal}
                    className="font-mono-tech inline-flex cursor-pointer items-center gap-1.5 border-b pb-0.5 text-xs hover:opacity-75"
                    style={{
                      color: 'var(--ink-primary)',
                      borderColor: 'var(--brass)',
                    }}
                  >
                    <FileText
                      size={13}
                      style={{ color: 'var(--brass)' }}
                      aria-hidden="true"
                    />
                    <span>Preview</span>
                  </button>
                  <a
                    href={PROFILE.cv.pdfUrl}
                    download={PROFILE.cv.pdfFileName}
                    className="font-mono-tech inline-flex items-center gap-1 text-xs hover:opacity-75"
                    style={{ color: 'var(--ink-secondary)' }}
                  >
                    <Download size={12} aria-hidden="true" />
                    <span>PDF</span>
                  </a>
                  <a
                    href={PROFILE.cv.docxUrl}
                    download={PROFILE.cv.docxFileName}
                    className="font-mono-tech inline-flex items-center gap-1 text-xs hover:opacity-75"
                    style={{ color: 'var(--ink-secondary)' }}
                  >
                    <Download size={12} aria-hidden="true" />
                    <span>DOCX</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Studio Colophon */}
      <footer
        className="relative z-10 mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
        style={{ borderColor: 'var(--hairline)' }}
      >
        <Link
          to="/"
          className="font-mono-tech surface-transition inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase hover:opacity-75"
          style={{ color: 'var(--ink-primary)' }}
        >
          <ArrowLeft
            size={13}
            strokeWidth={1.7}
            style={{ color: 'var(--brass)' }}
            aria-hidden="true"
          />
          <span>Return to Studio Desk</span>
        </Link>

        <p
          className="font-mono-tech text-[10px] tracking-[0.2em] uppercase"
          style={{ color: 'var(--ink-secondary)' }}
        >
          © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.role}
        </p>
      </footer>
    </div>
  );
}
