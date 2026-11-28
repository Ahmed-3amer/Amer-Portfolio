import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface LaptopLiveScreenHandles {
  screenRoot: HTMLDivElement | null;
  codeLines: (HTMLDivElement | null)[];
  caret: HTMLSpanElement | null;
  uiBlocks: (HTMLDivElement | null)[];
  statusBuilding: HTMLSpanElement | null;
  statusReady: HTMLSpanElement | null;
  liveDot: HTMLSpanElement | null;
  nightGlow: HTMLDivElement | null;
}

/**
 * Pure GPU-composited HTML/CSS live Frontend IDE + Building UI Preview
 * mapped pixel-precisely inside `public/images/studio/laptop.webp` bezel.
 * Uses CSS Container Queries (`cqw`) for crisp proportional scaling at any viewport
 * with ZERO per-frame SVG vector re-rasterization (locked 60fps).
 */
export const LaptopLiveScreen = forwardRef<LaptopLiveScreenHandles>(
  function LaptopLiveScreen(_, ref) {
    const screenRootRef = useRef<HTMLDivElement>(null);
    const codeLineRefs = useRef<(HTMLDivElement | null)[]>([]);
    const caretRef = useRef<HTMLSpanElement>(null);
    const uiBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
    const statusBuildingRef = useRef<HTMLSpanElement>(null);
    const statusReadyRef = useRef<HTMLSpanElement>(null);
    const liveDotRef = useRef<HTMLSpanElement>(null);
    const nightGlowRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      get screenRoot() {
        return screenRootRef.current;
      },
      get codeLines() {
        return codeLineRefs.current;
      },
      get caret() {
        return caretRef.current;
      },
      get uiBlocks() {
        return uiBlockRefs.current;
      },
      get statusBuilding() {
        return statusBuildingRef.current;
      },
      get statusReady() {
        return statusReadyRef.current;
      },
      get liveDot() {
        return liveDotRef.current;
      },
      get nightGlow() {
        return nightGlowRef.current;
      },
    }));

    return (
      <>
        {/* Subtle Night-Only Screen Radiance pooling gently onto the desk mat (pure alpha gradient, no blend-mode stall) */}
        <div
          ref={nightGlowRef}
          aria-hidden="true"
          className="laptop-screen-glow-night hero-staged pointer-events-none absolute -inset-x-[12%] top-[82%] -bottom-[32%] z-0"
        />

        {/* Exact Inner Glass Bezel Bounds of laptop.webp (620x381 -> left/right 10.7%, top 6.6%, bottom 12.1%) */}
        <div
          ref={screenRootRef}
          aria-hidden="true"
          className="hero-staged pointer-events-none absolute top-[6.6%] right-[10.7%] bottom-[12.1%] left-[10.7%] z-20 flex flex-col overflow-hidden rounded-[2px] bg-[#151519] select-none"
          style={{ containerType: 'inline-size' }}
        >
          {/* Top Minimal IDE Tab Bar */}
          <div className="flex h-[10.5%] shrink-0 items-center justify-between border-b border-[#2B2A32] bg-[#1C1C22] px-[3%]">
            <div className="flex items-center gap-[2.2cqw]">
              <span className="flex items-center gap-[1.1cqw]">
                <span className="inline-block h-[1.8cqw] w-[1.8cqw] rounded-full bg-[#E36D47]" />
                <span className="inline-block h-[1.8cqw] w-[1.8cqw] rounded-full bg-[#D5A664]" />
                <span className="inline-block h-[1.8cqw] w-[1.8cqw] rounded-full bg-[#69A889]" />
              </span>
              <span className="font-mono-tech flex h-full items-center border-t-[1.5px] border-[#E36D47] bg-[#151519] px-[2.4cqw] py-[0.5cqw] text-[2.45cqw] font-medium tracking-[0.02em] text-[#ECE9E2]">
                Studio.tsx
              </span>
            </div>

            <div className="flex items-center gap-[1.2cqw]">
              <span
                ref={liveDotRef}
                className="inline-block h-[1.6cqw] w-[1.6cqw] rounded-full bg-[#E36D47]"
                style={{ opacity: 0.3 }}
              />
              <span className="font-mono-tech text-[2.1cqw] tracking-[0.1em] text-[#A8A39B]">
                LIVE UI
              </span>
            </div>
          </div>

          {/* Main Split Frontend Workspace: Left Code Editor + Right Live Building UI Preview */}
          <div className="grid min-h-0 flex-1 grid-cols-[55%_45%]">
            {/* LEFT PANE: Clean Frontend React/TSX Code Lines */}
            <div className="font-mono-tech relative flex flex-col justify-center gap-[1.7cqw] border-r border-[#292830] px-[3cqw] py-[2.5cqw] text-[2.55cqw] leading-[1.15] whitespace-nowrap">
              <div
                ref={(el) => {
                  codeLineRefs.current[0] = el;
                }}
                className="hero-staged flex items-center gap-[1.6cqw]"
              >
                <span className="text-[2.1cqw] text-[#555360]">01</span>
                <span>
                  <span className="text-[#E36D47]">import</span>{' '}
                  <span className="text-[#ECE9E2]">{'{ ui }'}</span>{' '}
                  <span className="text-[#E36D47]">from</span>{' '}
                  <span className="text-[#82C29E]">&apos;./craft&apos;</span>
                </span>
              </div>

              <div
                ref={(el) => {
                  codeLineRefs.current[1] = el;
                }}
                className="hero-staged flex items-center gap-[1.6cqw]"
              >
                <span className="text-[2.1cqw] text-[#555360]">02</span>
                <span>
                  <span className="text-[#E36D47]">export</span>{' '}
                  <span className="text-[#7FB2E6]">function</span>{' '}
                  <span className="text-[#F2EFE9]">Studio() {'{'}</span>
                </span>
              </div>

              <div
                ref={(el) => {
                  codeLineRefs.current[2] = el;
                }}
                className="hero-staged flex items-center gap-[1.6cqw]"
              >
                <span className="text-[2.1cqw] text-[#555360]">03</span>
                <span className="pl-[1.6cqw]">
                  <span className="text-[#7FB2E6]">const</span>{' '}
                  <span className="text-[#ECE9E2]">grid =</span>{' '}
                  <span className="text-[#E6B97A]">useFluid()</span>
                </span>
              </div>

              <div
                ref={(el) => {
                  codeLineRefs.current[3] = el;
                }}
                className="hero-staged flex items-center gap-[1.6cqw]"
              >
                <span className="text-[2.1cqw] text-[#555360]">04</span>
                <span className="pl-[1.6cqw]">
                  <span className="text-[#E36D47]">return</span>{' '}
                  <span className="text-[#ECE9E2]">(</span>
                </span>
              </div>

              <div
                ref={(el) => {
                  codeLineRefs.current[4] = el;
                }}
                className="hero-staged -mx-[3cqw] flex items-center gap-[1.6cqw] bg-[#E36D47]/10 px-[3cqw] py-[0.55cqw]"
              >
                <span className="text-[2.1cqw] text-[#8E8980]">05</span>
                <span className="pl-[3cqw]">
                  <span className="text-[#E36D47]">&lt;Hero</span>{' '}
                  <span className="text-[#7FB2E6]">motion</span>
                  <span className="text-[#ECE9E2]">=</span>
                  <span className="text-[#82C29E]">&quot;scroll&quot;</span>
                  <span className="text-[#E36D47]"> /&gt;</span>
                </span>
              </div>

              <div
                ref={(el) => {
                  codeLineRefs.current[5] = el;
                }}
                className="hero-staged flex items-center gap-[1.6cqw]"
              >
                <span className="text-[2.1cqw] text-[#555360]">06</span>
                <span className="pl-[3cqw]">
                  <span className="text-[#E36D47]">&lt;Works</span>{' '}
                  <span className="text-[#7FB2E6]">count</span>
                  <span className="text-[#ECE9E2]">=</span>
                  <span className="text-[#E6B97A]">{'{6}'}</span>
                  <span className="text-[#E36D47]"> /&gt;</span>
                  <span
                    ref={caretRef}
                    className="hero-staged ml-[1cqw] inline-block h-[2.8cqw] w-[0.7cqw] align-middle bg-[#E36D47]"
                  />
                </span>
              </div>

              <div
                ref={(el) => {
                  codeLineRefs.current[6] = el;
                }}
                className="hero-staged flex items-center gap-[1.6cqw]"
              >
                <span className="text-[2.1cqw] text-[#555360]">07</span>
                <span className="pl-[1.6cqw] text-[#ECE9E2]">) {'}'}</span>
              </div>
            </div>

            {/* RIGHT PANE: Live Building UI Preview (Assembles with Code!) */}
            <div className="flex items-center justify-center p-[2.8cqw]">
              <div className="flex h-full w-full flex-col justify-between rounded-[2px] border border-[#2F2E37] bg-[#1E1D23] p-[2.6cqw]">
                {/* UI Block 1: Mini Top Navigation */}
                <div
                  ref={(el) => {
                    uiBlockRefs.current[0] = el;
                  }}
                  className="hero-staged flex items-center justify-between border-b border-[#2E2D36] pb-[1.8cqw]"
                >
                  <div className="flex items-center gap-[1cqw]">
                    <span className="h-[1.2cqw] w-[7.2cqw] rounded-[1px] bg-[#F2EFE9]" />
                    <span className="h-[1.2cqw] w-[4.8cqw] rounded-[1px] bg-[#E36D47]" />
                  </div>
                  <div className="flex items-center gap-[1.1cqw]">
                    <span className="h-[0.9cqw] w-[2.8cqw] rounded-[1px] bg-[#6E6A75]" />
                    <span className="h-[0.9cqw] w-[2.8cqw] rounded-[1px] bg-[#6E6A75]" />
                    <span className="h-[0.9cqw] w-[1.8cqw] rounded-[1px] bg-[#E36D47]" />
                  </div>
                </div>

                {/* UI Block 2: Mini Hero + Coral CTA + Mini Studio Window */}
                <div
                  ref={(el) => {
                    uiBlockRefs.current[1] = el;
                  }}
                  className="hero-staged grid grid-cols-[1fr_24%] items-center gap-[2cqw] py-[1.4cqw]"
                >
                  <div className="flex flex-col gap-[1.4cqw]">
                    <span className="h-[2.1cqw] w-[88%] rounded-[1px] bg-[#F2EFE9]" />
                    <span className="h-[2.1cqw] w-[66%] rounded-[1px] bg-[#D0CCC4]" />
                    <span className="h-[1cqw] w-[92%] rounded-[1px] bg-[#6E6A75]" />
                    <div className="mt-[0.8cqw] flex items-center gap-[1.4cqw]">
                      <span className="flex h-[3.2cqw] w-[11cqw] items-center justify-center rounded-[1px] bg-[#E36D47]">
                        <span className="h-[0.7cqw] w-[6.5cqw] rounded-[1px] bg-[#FAF7F1]" />
                      </span>
                      <span className="h-[3.2cqw] w-[8.5cqw] rounded-[1px] border border-[#5D5964]" />
                    </div>
                  </div>
                  {/* Tiny Window Motif inside Preview */}
                  <div className="relative h-[14.5cqw] w-full rounded-[1px] border border-[#4D4954] bg-[#263246]">
                    <span className="absolute top-[16%] right-[16%] h-[2.1cqw] w-[2.1cqw] rounded-full bg-[#F2EFE9]" />
                    <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#4D4954]" />
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#4D4954]" />
                  </div>
                </div>

                {/* UI Block 3: Mini 2-Column Selected Work Cards */}
                <div
                  ref={(el) => {
                    uiBlockRefs.current[2] = el;
                  }}
                  className="hero-staged grid grid-cols-2 gap-[1.8cqw]"
                >
                  <div className="flex flex-col gap-[1.1cqw] rounded-[1.5px] border border-[#35343F] bg-[#26252D] p-[1.3cqw]">
                    <span className="h-[6.2cqw] w-full rounded-[1px] bg-[#1F5A68]" />
                    <span className="h-[1cqw] w-[72%] rounded-[1px] bg-[#E8E5DE]" />
                    <span className="h-[0.8cqw] w-[42%] rounded-[1px] bg-[#E36D47]" />
                  </div>
                  <div className="flex flex-col gap-[1.1cqw] rounded-[1.5px] border border-[#35343F] bg-[#26252D] p-[1.3cqw]">
                    <span className="h-[6.2cqw] w-full rounded-[1px] bg-[#303746]" />
                    <span className="h-[1cqw] w-[78%] rounded-[1px] bg-[#E8E5DE]" />
                    <span className="h-[0.8cqw] w-[48%] rounded-[1px] bg-[#7FB2E6]" />
                  </div>
                </div>

                {/* UI Block 4: Live Interactive Pill */}
                <div
                  ref={(el) => {
                    uiBlockRefs.current[3] = el;
                  }}
                  className="hero-staged flex items-center justify-between rounded-[1.5px] border border-[#34333D] bg-[#24232A] px-[1.8cqw] py-[1cqw]"
                >
                  <div className="flex items-center gap-[1.2cqw]">
                    <span className="h-[1.5cqw] w-[1.5cqw] rounded-full bg-[#82C29E]" />
                    <span className="font-mono-tech whitespace-nowrap text-[1.9cqw] text-[#D6D2C9]">
                      Interactive · 60fps
                    </span>
                  </div>
                  <span className="h-[1.3cqw] w-[3.8cqw] rounded-[1px] bg-[#E36D47]" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom IDE Status Bar */}
          <div className="font-mono-tech relative flex h-[8.5%] shrink-0 items-center justify-between border-t border-[#2B2A32] bg-[#1C1C22] px-[3%] text-[2.15cqw]">
            <span className="text-[#918C84]">TSX · React 19 · GSAP</span>
            <div className="relative flex items-center">
              <span ref={statusBuildingRef} className="text-[#E36D47]">
                compiling...
              </span>
              <span
                ref={statusReadyRef}
                className="hero-staged absolute right-0 whitespace-nowrap text-[#82C29E]"
              >
                ✓ ready · 06 works
              </span>
            </div>
          </div>

          {/* Ultra-Subtle Matte Glass Diagonal Specular Highlight */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(125deg, transparent 58%, rgba(255,255,255,0.03) 58.2%, transparent 82%)',
            }}
          />
        </div>
      </>
    );
  },
);
