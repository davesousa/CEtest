# Homepage v2 — Backend / Next.js Impact

**Route:** `/v2`  
**Status:** technical polish complete (no Firebase wiring required)

## Goal

Production-ready TypeScript/Next.js quality for the `/v2` homepage: correct font token ownership, GSAP plugin safety, hero engine verification against UX spec, SiteShell mobile Book wiring, and compile/lint cleanliness. Live `/` remains untouched.

## Impacted files / modules

| File | Role |
| --- | --- |
| `app/globals.css` | Removed `:root` `--font-display` / `--font-sans` fallbacks that shadowed `next/font`; menu-open hides compact Book |
| `app/layout.tsx` | Owns Cormorant Garamond / Manrope via `next/font` CSS variables (unchanged, verified) |
| `components/home-v2/home-v2.css` | Removed compensating `html:root` font override; line-mask overflow; v2-scoped styles |
| `components/home-v2/HomePageV2.tsx` | GSAP ScrollTrigger + SplitText line reveals; `data-v2-reveal` only (no change required) |
| `components/home-v2/HeroSequence.tsx` | Custom rAF scrub; stage windows aligned to UX; reduced-motion sync on mount |
| `app/v2/page.tsx` | Server Component + metadata + LCP poster preload (verified) |
| `components/layout/SiteShell.tsx` | `/v2` home header + mobile Book → `useBooking` (verified, no change) |
| `package.json` | `gsap` ^3.15.0, `@gsap/react` ^2.1.2 |

## Conflicts & refactors

1. **Font token shadowing (fixed):** `:root` in `globals.css` redeclared `--font-display` / `--font-sans` as Georgia/Arial, outranking `next/font` on `<html>`. Removed those two declarations site-wide; removed the temporary `html:root` override from `home-v2.css`.
2. **SplitText Club concern (resolved — keep):** As of GSAP 3.13+, SplitText ships in the public `gsap` npm package. Project is on 3.15.0; `import { SplitText } from "gsap/SplitText"` is valid with no Club membership. ScrollTrigger is free core. No free-fallback rewrite.
3. **Reveal systems:** SiteShell observes `[data-reveal]`; v2 uses `[data-v2-reveal]` / `[data-v2-lines]` / `[data-v2-row]` only — confirmed zero `[data-reveal]` inside `.home-v2`.
4. **No Firebase / booking schema changes:** booking continues through existing `useBooking` modal.

## Data model / auth / write paths

None. Homepage v2 is static content + client motion + existing booking modal.

## Env vars, indexes, rules

None required.

## Risks

- Font fix is site-wide — `/` and all pages now correctly render Manrope / Cormorant Garamond (intended).
- SplitText rewrites heading DOM; `useGSAP` cleanup already `revert()`s splits.
- Hero remains a bespoke rAF scrub (not GSAP) per UX constraint — two motion systems by design.
- Mobile Book styles still live in `home-v2.css` (load with `/v2` only); SiteShell only mounts the button on `/v2`.

## What was wired / verified

### Fonts
- `layout.tsx` sets `--font-display` / `--font-sans` on `<html>` via next/font classNames.
- Runtime check on `/v2`: body = Manrope; hero `h1` = Cormorant Garamond; CSS vars resolve to those faces (not Georgia/Arial).

### SplitText / GSAP
- Kept `gsap/SplitText` + `gsap/ScrollTrigger` + `@gsap/react` `useGSAP` with scoped cleanup.
- No GSAP video scrubbing in the hero.

### Hero engine (vs UX §6)
- Stage windows: 0.20–0.34 exit / 0.30–0.42 enter / 0.70–0.80 stage-2 exit / release frame after.
- CTA hairline bar fades only 0.94–1.00 (persists through release).
- Scroll cue label fades by ~10% progress; fill still tracks `--v2-progress`.
- Desktop focal uses `--v2-focal-x` / `--v2-focal-y` (not overridden by static object-position).
- Reduced motion / early video fail → `heroMode="static"`, 100svh, Stage 2 not in DOM.
- Touch unlock + priming preserved; custom `currentTime` seek loop unchanged.

### Next.js quality
- `app/v2/page.tsx`: Server Component, absolute metadata title, `ReactDOM.preload` for hero poster LCP.
- `npm run lint` (`tsc --noEmit`): **pass**.
- `/v2` HTTP 200; no runtime import errors.

### SiteShell mobile Book
- Renders only when `pathname === "/v2"`; `onClick={handleOpenBooking}` → `useBooking().openBooking`; closes menu first.

## Remaining for ui-designer / cro-strategist

- CRO: measure whether header “Book” vs sticky bottom bar converts better on mobile (UX already flags the trade-off).
- Contrast audit on release-frame / mid-scrub frames and low-contrast greys (`--grey`, press marks, hero support at 90% white).
- Optional: move `.header-book--compact` styles from `home-v2.css` into `globals.css` next to `.header-book` for ownership clarity (behavior is already correct).
- No missing loading/error UI states for this page (static content).
