# Ahmed Amer — Interactive Realistic Portfolio (`Amer-Portfolio`)
## Master Implementation Plan & Design Specification

> **Document Purpose:** Single source of truth for the design direction, realistic world rules, verified personal data, technical architecture, and phased execution plan. Every build phase must strictly adhere to this specification.

---

## 1. Core Vision & Strict Non-Negotiable Rules

### Identity
- **Name:** Ahmed Amer *(Full CV Name: Ahmed Mohamed Amer)*
- **Title:** Frontend Developer
- **Language:** English only
- **Primary Concept:** **The Living Studio Desk & Architectural Window** — an Awwwards-grade, deeply cohesive interactive world where the visitor feels physically seated at a real wooden desk beside an architectural window, moving calmly through a story-driven journey as they scroll.

### Hard Creative Constraints
1. **True Physical Realism:** All materials (oak/walnut wood, archival cotton paper, smoked parchment, brushed antique brass, window glass, sky, clouds, stars, shadows) must feel tactile, photographic, and grounded in physical reality.
2. **Full-Bleed Edge-to-Edge (`100vw`):** No boxed containers with 4-sided margins, no traditional card grids, no repetitive equal-height card layouts. Every element lives cohesively across the full viewport surface.
3. **Zero Clichés:** Strictly **NO** glassmorphism (`backdrop-filter` frosted boxes), **NO** neon glows, **NO** cheap glowing box-shadows, **NO** floating generic dark-mode SaaS cards.
4. **Zero Characters:** Strictly **NO** characters, avatars, mascots, or human silhouettes anywhere in the experience.
5. **Authentic Human Copy:** Clear, natural, concise, zero filler/fluff, zero corporate clichés, and **100% truthful** to the verified CV and project details (never invent skills, numbers, or projects).
6. **Direct Contact Only:** Strictly `Email` (with one-click copy), `GitHub`, and `LinkedIn` — **NO** contact form, **NO** physical address/location, and **NO** phone number on the website (phone remains inside the downloadable CV only).
7. **Phased Execution & Model Checkpoints:** Build strictly phase by phase (never all at once). Pause and alert the user **before** starting heavy/complex animation phases so they can select the most suitable model.

---

## 2. Atmosphere, Lighting & `DAY / NIGHT` System

### Living Window, Static Realistic Sky & Spatial Arc (Scenario 1 — Approved)
- **Static Photographic Sky & Clouds:** Sky, clouds, and subtle night stars outside the window are **calm and still at rest** (no idle drifting clouds or restless motion); they shift only in optical depth and perspective during scrolling, unified with the scroll-only `DAY / NIGHT` emblem.
- **DAY Mode (`Morning Oak, Archival Cotton & Sunlit Limestone`):**
  - Calm morning sky with soft light clouds seen through a real architectural timber window.
  - Soft natural warm sunlight entering at an angle, casting realistic window-mullion shadows across the wooden desk and archival paper layers.
  - Stepping through the window opens into a bright, airy sunlit architectural limestone/plaster outdoor horizon (`#EAE7E0` / `#DFDBD2`) for the 3 project chapters before returning calmly to the warm desk at closing.
- **NIGHT Mode (`Midnight Walnut, Soft Desk Lamp & Moonlit Slate`):**
  - Calm deep midnight sky outside the window with faint still night clouds, subtle quiet stars, and cool pale moonlight.
  - Balanced indoors by a grounded warm desk-lamp light pool on the reading/workspace surface (completely realistic, zero neon).
  - Stepping through the window opens into a serene moonlit architectural slate-stone outdoor horizon (`#13171F` / `#1A202B`) before returning calmly to the lamp-lit walnut desk at closing.
- **Narrative Spatial Arc on Home Page:**
  1. **Act I — Inside the Studio Desk (Scenes 1 & 2):** Hero by the architectural window + Opening Note on archival paper (`Scroll-Lit Reading`).
  2. **The Window Portal (Signature Scroll-Pinned Transition):** Camera glides smoothly forward *through* the timber window frame as mullions expand past viewport edges, dissolving monotony while preserving 100% typographic, material, and Day/Night continuity.
  3. **Act II — Outdoor Architectural Horizon (Scene 3 — All 3 Project Chapters):** Expansive matte stone/plaster outdoor gallery giving all 6 shipped projects clean breathing room, culminating poetically with `Weather App` beneath the open sky.
  4. **Act III — Calm Return to the Wooden Desk (Scenes 4 & 5):** Gentle transition back onto oak/walnut timber for Working Principles, Core Craft, Correspondence & CV.

### Persistent `DAY / NIGHT` Celestial Control
- **Placement:** Fixed at **top-right** across all pages, completely independent from the navigation bar.
- **Visual Design:** Custom handcrafted SVG matching the user's two reference images:
  - `DAY`: Warm sunlit disc with soft radial warmth and 12 rounded rays; `DAY / NIGHT` monospace label underneath with `DAY` active and `/ NIGHT` muted.
  - `NIGHT`: Pale luminous full moon with subtle realistic craters inside a delicate thin orbital ring with tiny distant stars; `DAY / NIGHT` label underneath with `NIGHT` active and `DAY /` muted.
- **Motion Rule:** Completely **static at rest** (no constant idle spinning or bouncing). Reacts with subtle, calm motion **only during scrolling** (linked to scroll progress via GSAP ScrollTrigger).
- **Auto Time Detection:** Automatically selects `DAY` (e.g., 06:00–17:59 local time) or `NIGHT` (18:00–05:59 local time) on initial visit. Clicking toggles manually with a smooth full-world lighting transition across sky, window light, shadows, wood, and paper.

---

## 3. Visual Identity: Color Palettes & Typography

### Material-Based Color Tokens

| Surface / Role | `DAY` (Morning Oak & Cotton) | `NIGHT` (Midnight Walnut & Lamp) |
|---|---|---|
| Window Sky Gradient | `#C8D5DF` → `#E5E9E6` | `#11161F` → `#1B2331` |
| Clouds / Celestial Light | `#F6F2EA` / warm sunlight | `#2B3545` clouds / `#DCE3EC` moonlight |
| Wooden Desk Base | `#C5AF94` / `#AE9476` (real oak texture) | `#1B1714` / `#241E19` (real dark walnut texture) |
| Outdoor Stone / Horizon (Act II) | `#EAE7E0` / `#DFDBD2` (sunlit limestone) | `#13171F` / `#1A202B` (moonlit slate) |
| Archival Paper / Folio | `#F5F0E6` (primary), `#EBE4D5` (secondary) | `#231F1B` (primary), `#2C2722` (secondary) |
| Primary Ink | `#1E1B18` | `#ECE6DA` |
| Secondary Ink | `#5E574E` | `#A39A8E` |
| Unified Brass Accent | `#8A6A3B` (warm antique brass) | `#C69E63` (lamp-lit brushed brass) |
| Hairline Dividers | `rgba(30, 27, 24, 0.14)` | `rgba(237, 231, 220, 0.12)` |

### Non-Traditional Editorial Typography System
- **Display & Storytelling Headlines:** `Instrument Serif` (sculpted, tall, architectural monograph aesthetic — distinct from standard developer portfolios).
- **Body & Interface Reading:** `Hanken Grotesk` (refined, human, clean — avoids overused Inter/Poppins/Roboto).
- **Technical Metadata & Index (`DAY / NIGHT`, `01 / 06`, Tech Stack):** `IBM Plex Mono`.

### Kinetic Text Choreography
1. **Paper-Edge Mask Reveal:** Headline lines emerge smoothly from hidden horizontal masks.
2. **Scroll-Lit Reading (About Teaser):** Words smoothly transition from muted graphite to full ink density in sync with scroll progress.
3. **Horizontal Drift Headlines:** Monumental chapter titles drift softly in opposing horizontal Parallax directions while scrolling.
4. **Architectural Marginalia:** Crisp `IBM Plex Mono` index notes, chapter labels, and tech annotations reveal with subtle editorial precision.

---

## 4. Verified Data Specification (Single Source of Truth)

> **Reference CV Files:**
> - PDF: `d:\Programming\PDFs\Personal\My CVs\New Version\Ahmed_Amer_Frontend_Developer_CV.pdf`
> - Word: `d:\Programming\PDFs\Personal\My CVs\New Version\Ahmed_Amer_Frontend_Developer_CV.docx`
> *(Both bundled into `public/cv/` for in-app Preview + Dual PDF/DOCX Download)*

### Contact Information (Strictly Limited to These 3)
- **Email:** `ahmedammer777@gmail.com`
- **GitHub:** `https://github.com/Ahmed-3amer`
- **LinkedIn:** `https://www.linkedin.com/in/ahmed-amer22`
- *(Excluded from website: Address / Location, Phone number)*

### Verified Studio & `/about` Direction (Non-Duplicative, Grounded in CV)
- **Profile Focus:** Frontend Developer skilled in HTML5, CSS3, JavaScript, TypeScript, React.js, and Next.js — focused on building modern, responsive websites delivering smooth, engaging user experiences.
- **`/about` & Home Scene 4 Approach:** Avoid duplicating formal CV sections (ITI, DEPI, Route Academy, Menofia University, Languages) on the site pages since those live inside the interactive **CV Preview / Download** modal. Instead, present authentic, grounded perspective:
  1. **Perspective & Craft:** Authentic narrative sharing Ahmed's genuine interest in frontend development, how structured courses and intensive scholarships shaped his entry into the field, and how he bridges visual judgment with dependable engineering across real client systems.
  2. **Working Principles:** Four concrete pillars grounded in shipped work — *Clarity & Visual Hierarchy*, *Component-Driven Architecture*, *Real-World Readiness* (RTL/LTR, static performance, SEO, E2E reliability), and *Purposeful Motion*.
  3. **Core Craft & Tools (Grouped by Purpose):**
     - *Frontend Core:* Semantic HTML5, CSS3 (Flexbox & Grid), JavaScript (ES6+), TypeScript, Responsive Design
     - *Frameworks & UI Architecture:* React.js, Next.js, Tailwind CSS, CSS Modules, Bootstrap, Component-Driven Architecture, Visual Hierarchy
     - *Data, Visualization & Workflow:* REST API Integration, TanStack Query, Zustand, D3.js / TopoJSON, Playwright E2E, Git & GitHub, Collaborative Workflows, AI-Assisted Development
  4. **Formal Background Bridge:** Direct link/button opening the CV Preview modal (with PDF & Word downloads) for full education, training programs, and formal credentials.

### Selected Projects — Narrative 3-Chapter Distribution

#### Chapter I — Systems Built for Real Operations *(Full-Bleed Architectural Folios)*
1. **Makkah Lab — Laboratory Information System (LIS)** *(Client / Freelance)*
   - **Live URL:** `https://makka-lab.vercel.app/`
   - **Verified Stack:** React 19, JavaScript (ES6+), Vite, Tailwind CSS v4, React Router v7, TanStack Query, Zustand, React Hook Form, Zod, Recharts, Lucide React, jsPDF, JsBarcode, react-to-print, Supabase (PostgreSQL, Auth, RLS, Realtime), Node.js, Express, WebSockets, whatsapp-web.js
   - **Highlights:** Patient intake & National ID search, barcode generation, automated age/gender reference-range result validation (High/Low/Critical), multi-tier billing & corporate co-pay treasury, signed PDF diagnostic reports, automated WhatsApp notifications microservice, 4-role RBAC + audit trails, live analytics dashboard, bilingual RTL/LTR with Dark/Light modes.

2. **Patron Medical Group** *(Client / Freelance)*
   - **Live URL:** `https://patronmg.com/`
   - **Verified Stack:** Next.js 16, React 19, TypeScript, CSS Modules, D3.js (d3-geo), TopoJSON, Playwright, ESLint, Lucide React
   - **Highlights:** Bilingual (Arabic RTL / English LTR) enterprise corporate platform, SSG sub-second performance, filterable medical equipment catalog by specialty & brand partner, custom interactive D3-geo/TopoJSON SVG presence map, automated Playwright E2E tests, dynamic sitemap & JSON-LD SEO.

#### Chapter II — Digital Spaces & Commerce *(Asymmetric Full-Bleed Editorial Spreads)*
3. **Solution Group** *(Client / Freelance)*
   - **Live URL:** `https://www.sgsbe.com/`
   - **Verified Stack:** HTML5, CSS3, JavaScript, Bootstrap, Owl Carousel, AOS, EmailJS
   - **Highlights:** Responsive corporate website for an architectural and engineering office featuring a project slider, smooth on-scroll animations, and a functional contact form.

4. **Mahmoud Fayed — Architect Portfolio** *(Client / Freelance)*
   - **Live URL:** `https://mahmoud-fayed-portfolio.vercel.app/`
   - **Verified Stack:** HTML5, CSS3, Bootstrap
   - **Highlights:** Minimal, lightweight, mobile-friendly responsive portfolio showcasing an architect's projects and design background.

5. **Exclusive Multi-Actor E-commerce** *(Featured Built Project — presented naturally without "experimental/demo" labels)*
   - **Live URL:** `https://e-commerce-website-pure-js.vercel.app/`
   - **Verified Stack:** HTML5, CSS3, JavaScript (ES6), Bootstrap, Web Components, Chart.js, Local Storage, Typed.js, SweetAlert
   - **Highlights:** Multi-role e-commerce web application (customer & admin workflows) with persistent cart, role-specific dashboards, sales analytics charts, and reusable Web Components.

#### Chapter III — Atmosphere & Craft *(Window-Side Closing Piece)*
6. **Weather App** *(Featured Interactive Interface)*
   - **Live URL:** `https://ahmed-3amer.github.io/weather-app/`
   - **Verified Stack:** HTML5, CSS3, JavaScript, Bootstrap, Weather API
   - **Highlights:** Real-time location-based weather forecasts presented through a custom visual interface — serving as a poetic bridge back to the living Day/Night sky outside the studio window.

---

## 5. Technical Architecture & Performance Strategy

- **Core Stack:** `React 19` + `Vite` + `TypeScript` + `Tailwind CSS v4` + Custom Material/Lighting CSS
- **Routing:** `react-router-dom` v7 + custom GSAP physical page transition overlay
- **Animation & Scroll:** `gsap` (`ScrollTrigger`, `SplitText`, `Flip`) + `lenis` synced to `gsap.ticker`
- **Photorealistic World Engine:** Hybrid 2.5D layered photographic textures (`WebP`) with still realistic sky/clouds (zero idle drift), scroll-pinned GSAP Architectural Window Portal transition, and GPU-composited Parallax (`transform`, `opacity`, `clip-path` only)
- **Icons:** Handcrafted custom SVG for `DAY / NIGHT` emblem + minimal `lucide-react` utility icons
- **Performance Targets:** 60fps smooth motion, zero layout thrashing, compressed WebP assets, lazy-loaded lower scenes, automatic animation pause when tab is hidden, full `prefers-reduced-motion` support, responsive adaptation across Desktop, Tablet, and Mobile.

---

## 6. Phased Implementation Roadmap

> **Workflow Rule:** Complete one phase at a time, verify its output, and get user sign-off before advancing.
> **Model Checkpoints (`⚠️`):** Explicitly stop and inform the user *before* starting Phases **D**, **E**, and **F** so they can choose the optimal model for heavy animation and world choreography.

### Phase A — Project Foundation, Design Tokens & Verified Data
- [x] Initialize `React 19 + Vite + TypeScript` app inside workspace root.
- [x] Install core dependencies (`tailwindcss`, `gsap`, `lenis`, `react-router-dom`, `lucide-react`).
- [x] Configure Google Fonts (`Instrument Serif`, `Hanken Grotesk`, `IBM Plex Mono`).
- [x] Build the Day/Night material CSS token system + `ThemeContext` (auto local-time detection, smooth full-world lighting transition, session preference).
- [x] Copy updated `Ahmed_Amer_Frontend_Developer_CV.pdf` and `.docx` to `public/cv/`.
- [x] Author strictly verified TypeScript data modules (`src/data/profile.ts`, `src/data/projects.ts`).
- [x] **Verification:** TypeScript typecheck & production build (`npm run build`) pass cleanly.

### Phase B — Photorealistic World Textures & Curated Live Project Screenshots
- [x] Generate bespoke photorealistic WebP textures & plates:
  - Seamless warm European oak wood grain (DAY) & darkened walnut wood grain (NIGHT).
  - Tactile unbleached cotton archival paper & dark smoked parchment fiber textures.
  - Realistic calm daytime sky/clouds & deep quiet night sky/clouds.
  - Realistic window-mullion sunlight/moonlight shadow projection maps.
- [x] Visit all 6 live project URLs and capture curated, high-resolution, cleanly framed WebP screenshots *(flagging any auth-gated views like Makkah Lab for user confirmation if needed)*.
- [x] Optimize all assets for fast first paint and 60fps compositing.
- [x] **Verification:** Visual audit of every texture and screenshot.

### Phase C — Persistent Full-Bleed Frame, `DAY / NIGHT` Celestial Control & CV Preview Modal
- [x] Integrate `Lenis` smooth scrolling synchronized with `GSAP Ticker` and `ScrollTrigger`.
- [x] Build the persistent edge-to-edge studio chrome:
  - Minimal top-left studio navigation (`AHMED AMER`, `Work`, `About`, `Contact`, `CV`).
  - Independent fixed top-right **`DAY / NIGHT` Celestial Emblem** (custom SVG matching reference images, static at rest, subtle scroll-linked movement only).
- [x] Build the tactile **CV Preview Modal** (embedded PDF viewer + responsive fallback + direct **Download PDF** & **Download Word (.docx)** buttons).
- [x] **Verification:** Browser check of auto Day/Night, toggle transitions, scroll-only icon movement, and CV Preview + dual download.

### Phase D — ⚠️ `[MODEL CHECKPOINT: Heavy Animation & Interactive World Core]` Architectural Window, Opening Scenes & Window Portal Transition
> **Stop & notify user before starting this phase so they can select the best model.**
- [x] Build **Scene 1 (By the Window — Full-Bleed Hero)** on the wooden desk with the real architectural timber window, still photographic sky/clouds (zero idle drift), realistic angled sunlight/moonlight window shadows, Night desk-lamp pool, multi-layer scroll Parallax, and Paper-Edge Mask headline reveal.
- [x] Build **Scene 2 (The Opening Note — About Teaser)** on full-bleed archival paper with **Scroll-Lit Reading** word-by-word ink reveal and mono marginalia.
- [x] Build **The Window Portal Transition** (`GSAP ScrollTrigger` pinned camera push-in through the architectural timber window) opening seamlessly from the indoor studio desk into the expansive **Outdoor Architectural Space** (Act II).
- [x] **Verification:** Visual & 60fps smoothness check across Desktop & Mobile in both `DAY` and `NIGHT` modes.

### Phase E — ⚠️ `[MODEL CHECKPOINT: Heavy Animation & Editorial Choreography]` Outdoor 3-Chapter Work Bench & Return to Desk (Scenes 3, 4 & 5)
> **Stop & notify user before starting this phase so they can select the best model.**
- [ ] Build **Scene 3 (Selected Projects — 3 Narrative Chapters inside the Outdoor Architectural Space, Full-Bleed Edge-to-Edge)**:
  - *Chapter I:* Full-bleed architectural folios for **Makkah Lab (LIS)** & **Patron Medical Group** with depth Parallax and horizontal drift typography.
  - *Chapter II:* Asymmetric dual-speed Parallax editorial spreads for **Solution Group**, **Mahmoud Fayed — Architect Portfolio**, and **Exclusive E-commerce**.
  - *Chapter III:* Atmospheric open-sky closing feature for **Weather App** before returning indoors.
- [ ] Build the smooth **Return to the Wooden Desk** transitioning back to oak/walnut timber for **Scene 4 (Studio Specification Sheet — Working Principles & Core Craft)** and **Scene 5 (Correspondence Card & Closing Horizon)** — Email + Copy button, GitHub, LinkedIn, CV Preview trigger (zero form, zero address/phone).
- [ ] **Verification:** Full scroll walkthrough of Home page in Day & Night modes.

### Phase F — ⚠️ `[MODEL CHECKPOINT: Complex Transitions]` Sub-Pages & Seamless GSAP World Transitions
> **Stop & notify user before starting this phase so they can select the best model.**
- [ ] Build custom **GSAP Physical Paper-Sheet Route Transition Controller** (continuous wood/lighting world across all routes, zero white flash).
- [ ] Build `/work` (full-bleed interactive project archive index with hover preview plates).
- [ ] Build `/work/:slug` (full Project Case Study dossier pages for all 6 projects + "Next Project" transition).
- [ ] Build `/about` (Perspective & Craft, 4 grounded Working Principles, grouped Core Craft & Tools, and direct CV Preview/Download bridge — without duplicating formal CV blocks).
- [ ] Build `/contact` (calm full-bleed direct correspondence page).
- [ ] **Verification:** End-to-end route navigation, browser back/forward behavior, and scroll reset tests.

### Phase G — 60fps Performance Audit, Responsive Polish & Final Browser Verification
- [ ] Fine-tune responsive layouts and Parallax scaling across Desktop, Laptop, Tablet, and Mobile.
- [ ] Audit GPU-only animations, `prefers-reduced-motion`, tab-visibility canvas pause, image payloads, SEO metadata, and favicon.
- [ ] Perform complete live browser QA across Desktop & Mobile in both `DAY` and `NIGHT` modes, verifying all 6 project links, CV preview + PDF/DOCX downloads, zero console errors, and clean `npm run build`.
