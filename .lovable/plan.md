# Kishoore — Cyberpunk Engineering OS Portfolio

A single-page immersive cyberpunk portfolio styled like a futuristic developer operating system. Built with TanStack Start, React, Tailwind, Framer Motion, GSAP, and Three.js.

## Routes

- `/` — main portfolio (all sections, smooth-scroll between them — single-page experience as the brief implies an OS desktop feel)
- `/resume` — dedicated cinematic resume viewer (embedded PDF with boot animation)
- `/certifications` — full-screen cyberpunk Windows-style file explorer

Each route gets unique SEO metadata.

## Design system (`src/styles.css`)

Dark cyberpunk tokens in oklch:
- `--background` near-black (#08080c), `--surface` charcoal
- `--neon-cyan`, `--neon-purple`, `--neon-magenta`, `--neon-green` (terminal)
- Gradients: `--gradient-hud`, `--gradient-glow`
- Shadows: `--shadow-neon-cyan`, `--shadow-neon-purple`, `--glow-text`
- Fonts: JetBrains Mono (terminal/body), Orbitron or Rajdhani (display headings)
- Reusable utilities: `.scanlines`, `.holo-panel`, `.neon-border`, `.glitch-text`, `.hud-corners`

## Global layers

- `<MatrixRain />` — canvas matrix rain (low opacity)
- `<ParticleField />` — Three.js particle/network nodes background
- `<ScanlineOverlay />` — fixed CRT scanlines + vignette
- `<GridBackground />` — animated perspective grid (CSS)
- `<BootSequence />` — first-load terminal boot animation, then fades into hero
- `<NavHUD />` — floating side HUD with section anchors + system clock
- Framer Motion page/section transitions; GSAP ScrollTrigger for parallax

## Sections (all on `/`)

1. **Hero** — Three.js network particles, animated CPU/RAM/packet HUD widgets, typed boot logs, rotating taglines (Framer Motion), 3 buttons (View Projects, Open Terminal, Download Resume with holo hover).
2. **About** — terminal intro typing effect, holographic profile panel, animated learning timeline, "system profile" stats grid.
3. **Interests** — 7 holo cards (Web Dev, DSA, Problem Solving, Networks, Linux, Ethical Hacking, Cloud) with animated borders, mini sparkline graphs, lucide icons.
4. **Skills Diagnostics** — radar chart (Recharts) for Core Concepts, glowing skill bars per category (Frontend / Backend / Programming / DB / Tools / Concepts), terminal-style metric ticker.
5. **Experience** — vertical "mission log" timeline: Iproat Solutions / Pro-Media with deployment-report styling.
6. **Projects** — 3 tilted holo cards (VantageHub, FlashWork, EV Charging) with `react-parallax-tilt`, terminal overlay on hover, GitHub + Demo buttons, animated network visuals.
7. **Achievements** — animated counters (2500+, 250+), glowing badge cards, ServiceNow CSA highlight.
8. **Certifications preview** — quick grid + button to launch full Windows-style explorer at `/certifications`.
9. **Resume preview** — glowing window with embedded PDF preview + "Open Full Viewer" → `/resume` and direct download.
10. **Terminal** — interactive fake Arch Linux terminal with command history, blinking cursor, supported commands: `whoami`, `skills`, `projects`, `certifications`, `resume`, `achievements`, `contact`, `neofetch`, `sudo`, `clear`, `help`. Triggers in-page navigation for relevant commands.
11. **Contact** — encrypted-transmission panel, mailto contact form (subject/body composed and opened in mail client), animated send pulse, social links (GitHub, LinkedIn, LeetCode).
12. **Footer** — animated SVG waveform, glowing divider, terminal signature.

## Certifications explorer (`/certifications`)

- Cyberpunk Windows-style desktop:
  - Sidebar (Quick Access: All Certs, Coursework, Competitions, Trash[disabled])
  - Draggable floating windows (`react-rnd`)
  - Title bar with traffic-light buttons, neon borders
  - Folder/file icons, double-click to open
  - Fake "DECRYPTING…" loading sequence before each PDF/image renders
  - PDF preview via `<iframe>` of Drive preview URL or react-pdf
  - Verify (opens credential URL) + Download buttons

## Resume page (`/resume`)

- Boot animation: terminal "ACCESSING DOCUMENT…" with progress bar
- Embedded PDF viewer in glowing holo frame
- Animated neon Download button

## Google Drive integration

Connect Google Drive connector. A build-time script (`scripts/sync-drive-assets.ts`) runs via `code--exec` to:
1. List the two folders (resume folder + certificates folder).
2. Download each file via the gateway `?alt=media` to `public/assets/resume/` and `public/assets/certifications/`.
3. Emit `src/data/drive-manifest.ts` with `{ name, file, mimeType, driveId }[]` consumed by Resume + Certifications components.

This keeps assets static (no client-side gateway calls, no auth needed for viewers).

## Data files

- `src/data/profile.ts` — name, taglines, socials, contact email (placeholder until you provide it — easy one-line update)
- `src/data/skills.ts`, `projects.ts`, `experience.ts`, `achievements.ts`, `interests.ts`
- `src/data/drive-manifest.ts` — generated

## Components

```
src/components/
  effects/       MatrixRain, ParticleField (Three.js), ScanlineOverlay, GridBackground, GlitchText, TypeWriter, BootSequence
  hud/           NavHUD, SystemStats, HoloPanel, NeonButton, HoloCard, MissionLogItem
  sections/      Hero, About, Interests, Skills, Experience, Projects, Achievements, CertificationsPreview, ResumePreview, Terminal, Contact, Footer
  certs/         WindowFrame, Sidebar, FileIcon, PdfModal, DecryptingLoader
  terminal/      Terminal, commandRegistry.ts
```

## Dependencies to add

`framer-motion`, `gsap`, `three`, `@react-three/fiber`, `@react-three/drei`, `react-parallax-tilt`, `react-rnd`, `lucide-react` (already present), `recharts` (already present likely).

## Open items (not blocking — easy to swap later)

- **Contact email**: I'll wire a placeholder (`hello@kishoore.dev`) — paste your real email and I'll update one constant.
- **Google Drive auth**: I'll trigger the connector picker as the first build step.

## Performance & responsiveness

- Three.js scene paused via IntersectionObserver when hero off-screen
- Particle count + matrix density reduced on mobile (matchMedia)
- Lazy-load `/certifications` and `/resume` route bundles
- All sections fully responsive with mobile-tuned layouts (cards stack, HUD collapses)

## SEO

Per-route `head()` with title/description/og tags. Single `<h1>` per route. Semantic landmarks. Alt text on all images.