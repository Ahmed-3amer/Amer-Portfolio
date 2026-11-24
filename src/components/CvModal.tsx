import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Download, ExternalLink, FileText, X } from 'lucide-react';
import { useCvModal } from '@/context/CvModalContext';
import { PROFILE } from '@/data/profile';

export function CvModal() {
  const { isOpen, closeCvModal } = useCvModal();
  const scrimRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCvModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const ctx = gsap.context(() => {
      if (scrimRef.current) {
        gsap.fromTo(
          scrimRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' },
        );
      }
      if (sheetRef.current) {
        gsap.fromTo(
          sheetRef.current,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out' },
        );
      }
    });

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCvModal]);

  if (!isOpen) return null;

  return (
    <div
      ref={scrimRef}
      role="dialog"
      aria-modal="true"
      aria-label="Curriculum Vitae Preview"
      onClick={closeCvModal}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-8"
      style={{ backgroundColor: 'rgba(14, 12, 10, 0.78)' }}
    >
      <div
        ref={sheetRef}
        onClick={(event) => event.stopPropagation()}
        className="archival-paper paper-elevation flex h-full w-full max-w-5xl flex-col overflow-hidden border sm:h-[90vh]"
        style={{
          borderColor: 'var(--hairline)',
          color: 'var(--ink-primary)',
        }}
      >
        <header
          className="flex flex-wrap items-center justify-between gap-4 border-b px-5 py-4 md:px-8"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <div className="flex items-center gap-3">
            <FileText
              size={18}
              strokeWidth={1.6}
              style={{ color: 'var(--brass)' }}
              aria-hidden="true"
            />
            <div>
              <p
                className="font-mono-tech text-[11px] tracking-[0.18em] uppercase"
                style={{ color: 'var(--ink-muted)' }}
              >
                Curriculum Vitae · Dossier
              </p>
              <h2 className="font-display text-2xl leading-tight md:text-3xl">
                {PROFILE.fullName}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={PROFILE.cv.pdfUrl}
              download={PROFILE.cv.pdfFileName}
              className="font-mono-tech surface-transition inline-flex items-center gap-2 border px-3.5 py-2 text-xs tracking-[0.12em] uppercase hover:opacity-80"
              style={{
                backgroundColor: 'var(--ink-primary)',
                color: 'var(--paper-primary)',
                borderColor: 'var(--ink-primary)',
              }}
            >
              <Download size={14} strokeWidth={1.75} aria-hidden="true" />
              Download PDF
            </a>

            <a
              href={PROFILE.cv.docxUrl}
              download={PROFILE.cv.docxFileName}
              className="font-mono-tech surface-transition inline-flex items-center gap-2 border px-3.5 py-2 text-xs tracking-[0.12em] uppercase hover:opacity-80"
              style={{
                backgroundColor: 'var(--paper-secondary)',
                color: 'var(--ink-primary)',
                borderColor: 'var(--hairline)',
              }}
            >
              <Download size={14} strokeWidth={1.75} aria-hidden="true" />
              Download Word
            </a>

            <a
              href={PROFILE.cv.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-tech surface-transition inline-flex items-center gap-1.5 border px-3 py-2 text-xs tracking-[0.12em] uppercase hover:opacity-80"
              style={{
                borderColor: 'var(--hairline)',
                color: 'var(--ink-secondary)',
              }}
              aria-label="Open CV PDF in new browser tab"
            >
              <ExternalLink size={14} strokeWidth={1.7} aria-hidden="true" />
              <span className="hidden sm:inline">Open Tab</span>
            </a>

            <button
              type="button"
              onClick={closeCvModal}
              aria-label="Close CV Preview"
              className="surface-transition inline-flex h-9 w-9 cursor-pointer items-center justify-center border hover:opacity-75"
              style={{
                borderColor: 'var(--hairline)',
                color: 'var(--ink-primary)',
              }}
            >
              <X size={16} strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div
          className="relative flex-1 overflow-hidden"
          style={{ backgroundColor: 'var(--paper-secondary)' }}
        >
          <iframe
            src={`${PROFILE.cv.pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
            title="Ahmed Mohamed Amer Curriculum Vitae Preview"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
