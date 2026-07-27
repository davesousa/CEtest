# Homepage v2 — UX / IA Spec

**Route:** `/v2` (new page, built beside the live `/`)
**Consumed by:** `content-strategist` (copy deck), then `ui-designer` (implementation), then `nextjs-engineer` if any wiring is needed.
**Status of `/`:** untouched. `components/HomePage.tsx` and its CSS remain the live page. `/v2` is a parallel implementation.

This is a **refinement spec, not a redesign brief.** The brand's visual language, section intent, and conversion model are correct. What is being fixed is structure, pacing, CTA clarity, container discipline, and motion intent.

---

## 1. Page goal & primary user intent

**Who lands here:** A man in the Greater Toronto Area, typically 28–55, with money and an occasion — a wedding, a promotion, a red carpet or gala, or a decision to stop buying off-the-rack. He is usually arriving from Instagram, a referral, or a branded search. He is not comparison-shopping on price; he is deciding whether this house is credible, whether the aesthetic is his, and whether the process feels private rather than retail.

**Primary intent:** *"Is this the tailor for me, and what does it feel like to work with him?"*

**Single most important action:** **Book a private fitting** (the existing `useBooking` modal). Everything else on the page is either evidence supporting that decision or a lateral path for a visitor who isn't ready yet.

**Single most important thing to learn if he does not convert:** that C|E Clothier is a Toronto bespoke house, founded 2014 by Chinedu Ezemenari, whose work is recognized at a national-press level and whose garments are individually patterned. Brand recall is the secondary success metric — which is exactly what the hero's "Made to be remembered" stage is doing, and why it earns its place.

**Goal conflict check:** The page currently serves one goal cleanly. The only latent conflict is the *Services* section, which currently behaves as a mini product catalog with four competing enquiry buttons. That is a second goal (browse categories) wearing the primary goal's clothes. Section 3 resolves it.

---

## 2. Content inventory & prioritization

### Critical — immediately visible in the first viewport
| Item | Notes |
| --- | --- |
| Brand identity: `C|E Clothier · Toronto` | Hero-level, not nav-level. Currently an eyebrow above the tagline — correct placement, keep. |
| Primary headline: "Driven by passion, delivered with style." | The brand line. Keep as `h1`. |
| One supporting sentence | Currently "Bespoke garments for men who understand that style is more than what you wear." Keep one sentence only. |
| One CTA group | Book a private fitting. **Must gain a visible text label** (see §4). |
| Dominant moving image | The scroll-scrubbed video plane, full-bleed. |

Nothing else enters the first viewport. No stats, no schedule, no address, no press logos, no promo.

### Critical — visible on the page (below fold, but non-negotiable)
- The philosophy statement ("Clothes should say who you are before you do") + founder attribution.
- Third-party press recognition (GQ, Vogue, Vanity Fair, Us Weekly).
- Proof of process — that garments are individually patterned, from a real cloth library.
- At least one full-scale photograph of finished work on a real client.
- The four disciplines (Suits, Evening, Shirting, Outerwear) — as a *wardrobe scope* statement, not a catalog.
- Terminal booking CTA with location/appointment context.

### Secondary — present, but subordinate
- "Discover our approach" → `/our-process`.
- "Explore the work" → `/custom-suits`.
- Per-discipline links to `/custom-suits`, `/custom-shirts`, `/custom-outerwear`, `/weddings`.
- Toronto / private studio / by appointment context (decision-stage logistics).
- Desktop vertical rail ("Private tailoring · Toronto · Est. 2014") and scroll cue.

### Tertiary — keep off this page
- Pricing or lead-time detail → belongs on `/our-process`.
- FAQ → belongs on `/contact` or `/our-process`. **Do not add an accordion to the homepage.**
- Newsletter → already in the global footer. Do not duplicate in-page.
- Full celebrity/clientèle gallery → `/celebrities`. The press marquee is the homepage's entire allocation of social proof.
- Client testimonial quotes → **no asset exists today.** Deferred; see §9.

### Cut outright from v2
1. **The four circular arrow buttons inside the service items.** Four identical unlabelled circles that all open the same generic booking modal with no context carried. They dilute the primary CTA fourfold and mislead: they look like "learn more about Shirting" and behave like "open a booking form."
2. **The faux-image slot on the third craft pillar** (`.craft-card--detail`'s giant typographic `C` / `E` graphic standing in for a photograph). It exists because a third detail photo was never shot. Solve it with real imagery or with an honest typographic beat — not with a decorative placeholder pretending to be a photo.
3. **"Swipe to explore"** in the services intro (mobile-only instruction text). If the list reads as scrollable, it doesn't need instructions; the restructure in §3 removes the need entirely.
4. **The bordered container on each service item.** See §3 — cards without interaction that fills them.

---

## 3. Disclosure decisions

**Governing principle for this page: everything is inline.** This is an editorial luxury homepage. Accordions, tabs, tooltips, and side panels all signal "information density to be managed," which is the opposite of the brand's posture. Progressive disclosure here happens through **scroll and page depth**, not through UI controls.

| Content | Disclosure | Why |
| --- | --- | --- |
| Booking form | **Modal** (existing `useBooking`) | The only modal on the page. Correct: it is a focused, single-task interruption that must not lose the visitor's scroll position or the emotional context they just built. Keep the pattern exactly as-is. |
| Philosophy / craft / editorial / disciplines | **Inline, full sections** | Each is persuasion content. Hiding persuasion content behind a control means most visitors never see it. |
| Press recognition | **Inline band, attached to the philosophy section** | See §6. |
| Depth on each discipline | **Separate pages** (`/custom-suits`, `/custom-shirts`, `/custom-outerwear`, `/weddings`) | These pages already exist and are better than any in-page expansion could be. The homepage's job is to establish scope and route. |
| Process detail | **Separate page** (`/our-process`) | Three pillars on the homepage; the full sequence lives on its own page. |
| Discipline preview imagery (desktop) | **Hover-revealed, non-essential** | Enrichment only. The row is fully understandable and fully clickable without it. Never the sole carrier of information. |
| Location / by-appointment | **Inline, in the final section only** | It's decision-stage logistics. It belongs beside the terminal CTA, not in the hero (hard rule) and not repeated mid-page — the global footer already carries it a second time. |
| Second hero copy stage ("Made to be remembered") | **Time-based disclosure via scroll scrub** | Sequential, never simultaneous — so the first viewport still holds exactly one composition. This is the page's signature disclosure mechanic. |

**Explicitly rejected** for `/v2`, so it isn't reintroduced later: FAQ accordion, service tabs, testimonial carousel with dots or arrows, filter pills, stat strip, icon row, cookie/promo bar, floating chat bubble, exit-intent overlay, in-hero badges or chips of any kind, section-progress indicator, and a persistent bottom booking bar on desktop.

**Card policy applied.** After the cuts above, `/v2` contains **zero card containers.** The craft blocks become editorial image-and-caption pairs (image + heading + line of copy, no border, no box). The discipline list becomes hairline-divided rows. The one place a container is legitimate — a container built around user interaction — is the booking modal panel, which already exists.

---

## 4. CTA strategy

### Primary CTA — Book a private fitting
Single action, single destination (booking modal). It appears in exactly **three** places on `/v2`, plus the global header:

1. **Hero hairline bar** (in-sequence). Currently a bare circular arrow with only an `aria-label`. **This must gain a visible text label.** A luxury homepage can be quiet, but it cannot be illegible: an unlabelled circle asks the visitor to guess what the single most important action on the page does. The fix adds clarity without adding clutter — the hairline bar becomes: supporting sentence on the left, and on the right a small-caps label ("Book a private fitting") sitting directly beside the existing circular arrow, both inside **one link/button target**. That is still one CTA group, one composition, no new element competing for attention.
2. **Terminal fitting section** — the full-weight primary. This is the page's conversion moment and should be the single loudest element on the page.
3. **Global header** — persistent, subordinate weight.

**Mobile gap to close.** Today the header's "Book a fitting" button only renders at ≥1050px; below that it lives inside the mobile menu. Mobile visitors therefore have no persistent path to the primary action across a very long scroll. **Recommendation:** surface a compact text "Book" affordance in the mobile header beside the menu toggle, with a ≥44×44px touch target. **Trade-off, stated explicitly:** a sticky bottom booking bar would convert better than a header link, but it permanently occupies the bottom edge of every viewport, which is precisely the kind of persistent chrome this brand shouldn't wear. Recommendation is the restrained option; if the client later prioritizes measured conversion over restraint, the bar is the lever to pull, and the honest version of that trade is "we will look slightly more like a DTC store."

### Secondary CTAs — navigational, visibly subordinate
- "Discover our approach" → `/our-process` (philosophy section) — text link with rule, existing `.text-link` register.
- "Explore the work" → `/custom-suits` (editorial section) — the existing circular-arrow-plus-label treatment. This is the one place a labelled circle CTA is already correct.
- Four discipline rows → their respective pages. Whole-row link targets, no button, no per-row circle.

**Hierarchy rule for `ui-designer`:** at any scroll position, at most one CTA may read as primary. Where a secondary CTA is on screen simultaneously with a primary one, the secondary must be unmistakably lighter in weight.

### Repetition logic
The page is roughly 7–8 viewport-heights of scroll on desktop and considerably more on mobile. Primary CTA repetition is therefore: **once in the hero (present through ~95% of the hero sequence), once persistently in the header, once at the terminus.** No mid-page booking interruption — the middle of the page is doing persuasion work, and a booking prompt at the craft or editorial section would interrupt an argument before it lands.

---

## 5. Navigation & wayfinding

**Arrival:** Instagram bio link, referral, branded search, and print/press mentions — overwhelmingly to `/`. `/v2` is a staging route for now; once promoted it inherits all of this traffic.

**Onward paths from this page, in expected order of use:**
1. Booking modal (primary).
2. `/our-process` — the highest-intent secondary; "how does this work" is the top unanswered question for a first-time bespoke buyer.
3. `/custom-suits` — the aesthetic-validation path.
4. Discipline pages — self-selecting visitors with a specific need (a wedding, an overcoat).
5. `/about` and `/celebrities` via global nav.

**Wayfinding:**
- **No breadcrumbs.** This is the root; breadcrumbs would be noise.
- **Keep the existing section anchor IDs** (`#top`, `#story`, `#process`, `#collections`, `#services`, `#contact`). They cost nothing, they're already deep-linked from elsewhere, and the hero scroll cue depends on `#story`.
- **Keep the desktop scroll cue as the hero's only progress indicator**, and make it earn its place by behaving like a cue rather than permanent chrome (see §6, Hero).
- **No section-progress rail or dot navigation.** A homepage that tells you how far through it you are is a homepage that has admitted it's long.
- **Keep the footer "Back to top ↑"** — it is the return path after a long scroll and already exists globally.
- **Global header stays fully intact** on `/v2`, including the `site-header--home` treatment. Note for `ui-designer`: `SiteShell` currently selects that treatment with `pathname === "/"`, so `/v2` will render the `--page` variant unless the condition is widened. Flagging it as a behavior to verify, not as a licence to restructure `SiteShell`; the minimal correct change is to include `/v2` in that condition.

---

## 6. Section-by-section structure

### Recommended order

| # | Section | Change from current |
| --- | --- | --- |
| 1 | Hero — scroll-scrubbed video sequence | Keep. Refine (below). |
| 2 | Philosophy / manifesto | Keep in place. |
| 2b | Press recognition band | **Moved** — from position 5 to a band attached to the base of the philosophy section. |
| 3 | Craft — the C|E standard | Keep. Restructure containers. |
| 4 | Editorial / the collection | Keep. |
| 5 | The disciplines (was Services) | Keep position. Restructure from cards to editorial rows. |
| 6 | Fitting — terminal CTA | Keep. |

### Why the press band moves

Three reasons, in order of weight:

1. **Claim → proof adjacency.** The philosophy section makes the page's boldest assertion: *clothes should say who you are before you do*, from a house you've likely never heard of. The natural next question is "says who?" Answering it immediately with four national mastheads is the single highest-leverage sequencing change available on this page. At position 5 the proof arrives after the visitor has already decided, having sat through three long sections.
2. **Pacing.** The current order stacks three consecutive dark sections at the end (press, disciplines, fitting) — a long tonal monotony right where the page should be building toward its conversion moment. Moving the press band up leaves the dark run as disciplines → fitting, which is a legitimate two-beat crescendo into the CTA.
3. **It stops being an "icon row."** As a standalone dark band, four logos in a marquee is exactly the pill-cluster/icon-row pattern the brand rules push against. Attached to the philosophy section as its closing evidentiary line, it reads as an editorial credit rather than a logo garden.

**Section integrity:** the press band stays its own `<section aria-label="Press recognition">` for semantics and screen-reader navigation, but shares the philosophy section's paper field, separated from the copy above by a hairline. One job — *establish who C|E is and why he's credible* — expressed in two registers: the founder's voice, then third-party corroboration.

**Implementation note and fallback:** the press logos are currently filtered for a dark ground (`invert`, `brightness` boosts). On paper they need to render as ink marks — which is how GQ, Vogue, and Vanity Fair natively appear, so this is a truer treatment. `ui-designer` must verify all four assets, including the `us-weekly.png` raster, render cleanly as dark-on-paper. **If any logo cannot,** keep the band on ink and place it directly after the hero instead — that preserves reason 1 (the most important one) and partially fixes pacing.

---

### 1. Hero — scroll-scrubbed sequence

**Job:** Establish the brand as a house, land one line, offer one action. Nothing else.

**Structure (unchanged skeleton):** full-bleed video plane; sticky viewport inside a tall scroll track (currently 300svh mobile / 260svh desktop); copy stages occupying one grid area, cross-fading; hairline bottom bar carrying the supporting sentence and the CTA group; desktop-only vertical rail (left) and scroll cue (right).

**Preserve exactly:** the full-bleed edge-to-edge video plane, the grayscale + contrast treatment, the poster-to-video handoff, the video-priming and touch-unlock logic (it solves real iOS autoplay/scrub constraints), the rAF-lerped scrub with easing, the sticky-track model, `#top`, and the video/poster assets.

**No overlays.** No badges, chips, stickers, ratings, counters, or floating labels on the video plane, at any scroll position, at any breakpoint.

**Polish opportunities — ranked by impact:**

1. **Give the CTA a visible label.** The most important fix on the page. See §4.

2. **Restructure the stage timing so the sequence has a real dramatic arc.** Currently the second stage lands around 34–49% progress and then holds essentially unchanged until 92% — roughly 1.7 viewport-heights of scroll in which nothing evolves but video frames and a 5% focal drift. The visitor is scrolling and being told nothing new, which reads as length rather than intent. Recommended shape:

   | Progress | State |
   | --- | --- |
   | 0.00 – 0.20 | Stage 1 holds fully. Brand, headline, supporting line, CTA. |
   | 0.20 – 0.34 | Stage 1 exits (lift + soft blur, as now). |
   | 0.30 – 0.42 | Stage 2 enters, line-by-line, slightly overlapping stage 1's exit. |
   | 0.42 – 0.70 | Stage 2 holds. |
   | 0.70 – 0.80 | Stage 2 exits. |
   | 0.80 – 1.00 | **Release frame** — copy-free. Only the moving image, the hairline bar's CTA, and the scroll cue's progress fill. |

   The release frame is the recommended answer to the dead zone: instead of adding a third copy stage (which risks turning the hero into a slideshow and spending copy budget it doesn't have), give the visitor a deliberate wordless beat of pure cinema before the philosophy section crosses in. It is the most couture option and it adds nothing to the page.
   *Optional variant if `content-strategist` produces a line strong enough to earn it:* a single short third whisper — no eyebrow, no second line — occupying 0.80–0.92, with the release frame compressed to 0.92–1.00. Default to the release frame; the third stage must be argued for, not assumed.

3. **Hold the CTA through the release frame.** The hairline bar currently fades out at 95%. It should persist through the release frame and fade only in the final few percent as the philosophy section arrives — so the visitor is never mid-hero without a path to the primary action.

4. **Make the scroll cue behave like a cue.** It currently reads as permanent chrome. It should be absent on load until the video is ready, appear once, and fade out by roughly 10% progress — while its progress fill continues to track the whole sequence. (Consider whether the fill and the "Scroll to play" label should decouple: the label is an invitation and should leave; the fill is orientation and can stay.)

5. **Fix the focal drift on desktop.** The tracked focal point (53% → 48% across the sequence) is overridden at ≥1050px by a static `object-position: center 35%`, so the intended camera drift is dead on the breakpoint where it would be most visible. Either apply the tracked value on the axis that matters at desktop framing, or drive both axes from the scrub. Small change, disproportionate gain in "this was directed" feel.

6. **Gate copy entry on the poster paint.** Stage 1's entrance animations currently run on a fixed delay regardless of media readiness, so on a slow connection the headline can animate in over flat `#131313`. Hold the copy entrance until the poster has painted (the existing `data-video-ready` flag is the natural hook).

7. **The hairline circle** (bottom-right, `.hero::after`): it is a hairline geometric form consistent with the circular CTA language, not a badge, so it may stay — but it currently reads as a stray shape. Either tie it subtly to scroll progress (a slow scale or rotation across the sequence) so it reads as directed, or drop it. Do not add a second one.

8. **Mobile scroll budget.** 300svh at mobile scroll speeds is a long commitment before the first content section. Recommend reducing the mobile track toward ~220–240svh and re-tuning the stage windows against it; the sequence should feel deliberate, not like an obstacle between the visitor and the page.

---

### 2. Philosophy / manifesto

**Job:** One idea, in the founder's voice — that clothing is identity — and the credibility to say it.

**Content priority:** (1) the large statement, (2) founder attribution naming Chinedu Ezemenari, (3) the press evidence, (4) the route to `/our-process`.

**Structure, top to bottom:** hairline meta row (section eyebrow / place) → the large display statement, given generous room and set as the section's dominant element → hairline → indexed supporting paragraph (`01`) with founder attribution → subordinate "Discover our approach" link → hairline → **press band**.

**Refine:**
- The statement is currently the strongest typographic moment on the page and should stay that way. Give it more surrounding silence than its neighbours, not less.
- The section index (`01`) implies a numbered series that the rest of the page doesn't continue. Either commit to indexing every major section consistently or drop the number. **Recommend committing** — a consistent `01 / 02 / 03 …` spine across the philosophy, craft, editorial, and disciplines sections is a genuine editorial device and it aids orientation on a long page without adding a progress UI.
- **CTA placement:** secondary text link only, positioned after the supporting copy. No booking CTA in this section.

**Press band (2b):**
- **Job:** third-party corroboration, in one breath.
- One line of framing copy, then the four marks. Keep the marquee — motion is what stops four logos from reading as a static icon row, and it lets the set breathe without demanding equal-width alignment.
- Pause the marquee on hover and on keyboard focus.
- Add soft edge masks so marks enter and leave rather than clipping at the section edge.
- **Reduced motion: the marquee must not animate.** Today the global reduced-motion rule collapses all animation durations to `0.01ms`, which snaps the marquee to its end transform rather than stopping it — the logos can land mid-clip or out of view. Reduced motion needs an explicit static layout: four marks, evenly distributed, no track, no duplication. This is a real defect in the current implementation, not a nice-to-have.
- Only the first set of logos is exposed to assistive technology; the duplicate set stays `aria-hidden`. The current implementation already does this correctly — preserve it.

---

### 3. Craft — the C|E standard

**Job:** Prove the process is real. This is the section that converts skepticism into trust.

**Content priority:** (1) the section thesis ("Built around you" + no-templates supporting line), (2) individual pattern-making, (3) the cloth library, (4) the detail choices.

**Structure:** heading block (eyebrow / display heading / supporting line, three-column at desktop as now) → an asymmetric, vertically offset sequence of three beats. Keep the existing rhythm where the second beat sits dramatically lower than the first and the third is smaller and offset — the deliberate misalignment is doing real editorial work.

**Refine:**
- **Remove the card framing.** Each beat is an image, a heading, and one line of copy — no border, no box, no padded container. Nothing in this section is interactive beyond the image hover, so nothing needs a container. (The existing markup is already close to this; it's the `--detail` beat and the visual reading as a "card grid" that need attention.)
- **Solve the third beat honestly.** The typographic `C` / `E` graphic standing in for a missing photograph is the weakest moment on the page. Two acceptable resolutions, in order of preference:
  - **A (preferred):** use real craft photography. `/public/pages/process-1…4.jpg` are existing in-house process images. Reuse one for the third beat. Caveat: they were shot for `/our-process`, so verify the crop and grayscale treatment hold at homepage scale.
  - **B:** drop the image slot entirely and let the third beat be a purely typographic statement — a heading and a line, in intentional negative space. Asymmetry by design rather than by shortage.
  - Do **not** ship a decorative graphic occupying an image slot.
- Keep the `01 / 03`, `02 / 03` frame counters on the images — they're an editorial device consistent with the numbered spine.
- Keep the pointer-tracked ambient glow on this section's background; it is one of the page's nicest existing details. Disable it on touch devices, where it can only ever be triggered accidentally.
- **CTA placement: none.** This section's only job is proof. The route to process depth was already offered in the philosophy section.

---

### 4. Editorial / the collection

**Job:** Show the outcome on a real person, and let the aesthetic do the arguing.

**Content priority:** (1) the photograph at full scale, (2) the display heading, (3) one line of positioning copy, (4) the route to `/custom-suits`.

**Structure:** split field — image occupying the larger share, copy column the smaller (the existing 1.14fr / 0.86fr desktop split is well-judged; keep it). Image caption ("Portraits in character — Vol. I") stays as an editorial credit inside the image field.

**Refine:**
- The image should read as the largest single photographic moment on the page — larger in presence than any craft beat. Let it run to at least a full viewport height at desktop.
- Add restrained scroll parallax on the image (see §7) — this is the natural place for it, and it's the one section where the composition has room to move without disturbing the copy.
- **CTA placement:** the existing labelled circular CTA ("Explore the work"), bottom of the copy column, right-aligned at desktop as now. Secondary weight. This is the correct home for the page's aesthetic-validation path.

---

### 5. The disciplines (currently "Services")

**Job:** Establish the *scope* of the wardrobe and route self-selecting visitors to the right page. This is a routing section, not a catalog and not a conversion section.

**Structure — this is the section with the largest restructure:**

Replace the four bordered, horizontally-scrolling card panels with a **hairline-divided editorial list of four rows**, stacked vertically, full width, in the numbered spine (`01`–`04`):

```
─────────────────────────────────────────────
01   Bespoke Suits          An individual pattern, cut …   →
─────────────────────────────────────────────
02   Evening                Black tie reinterpreted …      →
─────────────────────────────────────────────
03   Shirting               Perfect proportion …           →
─────────────────────────────────────────────
04   Outerwear              Purposeful silhouettes …       →
─────────────────────────────────────────────
```

**Why this over the current cards:**
- Four bordered panels are containers with no interaction to contain — they exist only to fence off text, which is what the card rule prohibits.
- The horizontal scroll-snap carousel hides content behind a gesture and needs an instruction label ("Swipe to explore") to be discoverable. Vertical rows need no instruction.
- Rows scale honestly from mobile to desktop with no layout change and no hidden content.
- A full-row link target is a far larger, more forgiving hit area than a 3rem circle — better on touch, better for motor accessibility.
- Typographically, a hairline-ruled index list is closer to the brand's editorial register than a grid of boxes.

**Each row:** index number, discipline name (display type, the row's dominant element), one line of copy, and a directional affordance at the trailing edge. **The entire row is a single link** to its page — `01` → `/custom-suits`, `02` → `/weddings` (the closest existing home for evening/black-tie; confirm with the client, and if evening wear has no page, route to `/custom-suits` rather than inventing one), `03` → `/custom-shirts`, `04` → `/custom-outerwear`. One link per row, not a link plus a button.

**Desktop enrichment:** on row hover/focus, reveal a single grayscale image preview of that discipline, positioned in the section's open field. Available assets: `ce-collection.jpg` (suits), `pages/wedding-1.jpg` (evening), `pages/shirts.jpg` (shirting), `pages/outerwear.jpg` (outerwear). Enrichment only — never the sole carrier of meaning, disabled below 1050px and under reduced motion.

**CTA placement:** no booking CTA in this section. Removing four booking entry points here is deliberate: it concentrates the primary action in the hero, the header, and the terminus, and it stops four navigational-looking arrows from opening a form.

---

### 6. Fitting — terminal CTA

**Job:** Convert. This is the loudest moment on the page and the only place the primary CTA carries full weight.

**Structure:** full-bleed grayscale photograph with a directional scrim, copy block left-aligned and vertically centred, logistics line pinned to the bottom edge.

**Content priority:** (1) the primary CTA, (2) the display heading, (3) eyebrow framing, (4) Toronto / private studio / by appointment.

**Refine:**
- The CTA is currently a light solid button — correct. It must be visibly the heaviest interactive element on the entire page. Verify that nothing above it (including the hero's newly-labelled CTA) competes.
- Keep the logistics line as plain type pinned to the bottom hairline. It answers "where, and how does this work" at the exact moment of decision. Do not restyle it into a stat strip or a set of pills, and do not add hours, pricing, or a map.
- The section should read as a held image, not a scroll event. Restraint here; the motion budget was spent earlier.
- Global footer follows immediately via `SiteShell`. Verify the transition from this section's dark field into the footer reads as intentional rather than as two adjacent dark blocks.

---

## 7. Flow / journey map

```
Instagram / referral / branded search
        │
        ▼
  ┌─────────────────────────────────────────────────────────┐
  │ HERO — cinematic scrub sequence                         │
  │ stage 1 (brand + line + CTA) → stage 2 → release frame  │
  │ CTA present throughout                                  │
  └───────┬──────────────────────────────┬──────────────────┘
          │ scrolls on                   │ books now  ──────────┐
          ▼                                                     │
  PHILOSOPHY — the claim, in the founder's voice                │
          ▼                                                     │
  PRESS BAND — "says who?" answered                             │
          ▼                                                     │
  CRAFT — the process is real  ──── needs detail ──▶ /our-process
          ▼                                                     │
  EDITORIAL — the outcome  ──────── needs to see ──▶ /custom-suits
          ▼                                                     │
  DISCIPLINES — scope + routing ─── specific need ──▶ discipline page
          ▼                                                     │
  FITTING — primary CTA, full weight ─────────────────────────┐ │
          ▼                                                   ▼ ▼
      FOOTER (newsletter = soft capture)              BOOKING MODAL
                                                              │
                                                              ▼
                                                    Confirmation state
                                                    ("We'll be in touch")
```

**Branches that materially change structure:**
- **Reduced-motion visitor:** the hero collapses from a 3-stage sequence to a single static composition, and the marquee becomes a static row. The rest of the page is structurally identical. See §8 and §9.
- **Slow connection / video fails:** the hero holds the poster frame; the copy stages must still be reachable. **If the video cannot play at all, the sequence must not trap the visitor** in a tall scroll track with a frozen frame and no progression — collapse to the static composition (poster + stage 1 + CTA at 100svh). The current implementation sets `data-video-ready="pending"` on playback rejection but does not act on it; `/v2` must.
- **Returning visitor / direct anchor arrival** (e.g. `/v2#services`): lands mid-page, bypassing the hero. The header and the terminal CTA are the only booking paths available, which is exactly why the mobile header gap in §4 matters.
- **Conversion:** the modal's success state is terminal and returns the visitor to the page. Unchanged.

There is no logged-in state, no empty state, and no personalization on this page.

---

## 8. Responsive disclosure adjustments

The disclosure strategy is deliberately near-identical across breakpoints — no content is hidden on mobile that desktop shows, and nothing collapses into a control. Structural differences:

**Hero**
- **Desktop (≥1050px):** vertical rail and scroll cue present; copy is offset into an asymmetric diagonal composition; scroll track ~260svh.
- **Mobile:** rail and cue absent (correct — they'd be clutter at that scale, and the cue's rotated placement has nowhere to live); copy is a single left-aligned stack; scroll track reduced per §6 item 8. The stage sequence itself is preserved — this is the brand's signature mechanic and must not be flattened on mobile.
- The CTA label must remain legible at mobile scale. If the label and supporting sentence cannot coexist on one hairline row, stack them — do not drop the label back to a bare circle.

**Press band**
- Desktop: larger marks, wider gaps, slower track.
- Mobile: smaller marks, tighter gaps. Same mechanic. Reduced motion at either size: static row (four marks may wrap to two rows on narrow viewports).

**Craft**
- Desktop: three beats in an offset two-column field with dramatic vertical displacement.
- Mobile: single column, sequential. **The vertical offsets that carry the section's character at desktop cannot survive a single column** — replace them with varied image aspect ratios and varied left/right insets so the sequence still reads as composed rather than as a stack of three identical blocks.

**Editorial**
- Desktop: side-by-side split, image dominant.
- Mobile: image above, copy below, full width. Parallax reduced or removed — the effect needs the image to be larger than its frame's motion, and at mobile scale it mostly costs performance.

**Disciplines**
- **This is the one section whose structure genuinely changes, and it changes by simplifying:** desktop rows have four typographic zones (index / name / copy / affordance) plus the hover preview; mobile rows drop to index + name + copy with the affordance inline at the end of the row, and no preview. Same rows, same links, same order, same count — no carousel, no snap-scroll, no hidden items.

**Fitting**
- Desktop: copy inset from the left, image framing wide.
- Mobile: copy occupies the field with a heavier scrim to hold contrast; logistics line stays pinned. Verify the CTA sits comfortably above the fold of that section on short viewports.

**Global header**
- The mobile "Book" affordance in §4 is the only structural addition. The mobile menu itself is unchanged.

---

## 9. Edge cases & states

| State | Required structure |
| --- | --- |
| **Reduced motion** | Hero: static 100svh composition — poster (or paused frame), stage 1 only, labelled CTA, no scroll track. **Stage 2's line should not be rendered at all**, rather than left in the DOM at zero opacity where it can still be read by assistive tech or reached by focus. It is a restatement, not unique information, so nothing essential is lost. Press band: static row. All scroll reveals: content visible immediately, no offset. No parallax, no hover previews, no pointer-tracked glow. The current implementation happens to hide stage 2 correctly only because a chain of custom properties never updates — that's accidental, not designed; make it explicit. |
| **Video slow to load** | Poster holds; copy entrance gated on poster paint; scroll cue withheld until ready. No layout shift when the video takes over. |
| **Video fails / autoplay blocked** | Collapse to the reduced-motion static composition. Never a tall scroll track over a frozen frame. |
| **Images fail** | Every image needs meaningful `alt`. Craft beats and discipline rows must remain fully comprehensible from type alone — no information lives only in a photograph. |
| **JS disabled** | Full content order renders and is readable; the hero shows the static composition. The booking modal is JS-dependent, so the header/footer email and phone links are the fallback contact path — they already exist in the global shell. |
| **Booking submit — in flight** | The modal needs an explicit pending state on submit (disabled control, visible progress). Verify the existing `useBooking` flow covers it; if it doesn't, that's a modal-scoped follow-up outside `/v2`'s remit, not something to solve by restyling the modal. |
| **Booking submit — failure** | Human-readable error inside the modal with a retry path and the direct email/phone as an escape hatch. Never a silent failure, never a raw error dump. |
| **Booking success** | Existing confirmation state, unchanged. Ensure focus moves into the confirmation so screen-reader users are told the submission landed. |
| **Newsletter (footer)** | Global, unchanged. |
| **Short viewport / landscape phone** | The 100svh sticky hero must not clip the CTA. Verify the hairline bar and its label survive a ~380px-tall landscape viewport; if not, the release-frame timing (not the CTA) is what gives. |
| **Keyboard traversal** | Tab order must follow visual order through all six sections. Discipline rows are one tab stop each, not two. The marquee's duplicated logos must not be focusable. |
| **Permissions / roles** | Not applicable — fully public page, no auth, no gated content. |

### Accessibility notes

- **Focus states are the largest accessibility gap in the current stylesheet — there is no `:focus-visible` styling anywhere in `app/globals.css`.** Every interactive element on `/v2` (hero CTA group, philosophy text link, editorial circle CTA, four discipline rows, terminal CTA) needs a visible focus indicator that survives on both the ink and paper fields and over photography. Circular and image-backed controls are the hard cases; solve them deliberately rather than relying on the UA default. Separately, the booking modal's inputs set `outline: 0` with no visible replacement — flagging as a global follow-up, outside `/v2` scope.
- **The unlabelled hero CTA** is an accessibility issue as much as a conversion one. `aria-label` alone serves screen readers while leaving sighted visitors — including anyone with a cognitive or attention difference — to guess. The visible label in §4 fixes both.
- **Contrast.** Copy over the video and over the fitting photograph must clear WCAG 2.1 AA (4.5:1 body, 3:1 for large display type) at *every* frame of the scrub, not just the poster. The existing gradient scrims mostly handle this; the risk sits in the release frame and mid-sequence, where the underlying frames are brightest. Also check the low-contrast greys already in use: `--grey` (#9b9b98) on ink, the 0.72-opacity press marks, and the hero supporting sentence at 76% white — all are near the line and some are likely under it at small sizes.
- **Touch targets** ≥44×44px with adequate spacing: the mobile header "Book" affordance, the discipline rows (comfortable — full-width rows), and the terminal CTA.
- **Semantics:** one `h1` (the hero tagline). The hero's stage-2 line is an `h2` today and already carries an `aria-label` because it's split into per-word elements — preserve that pattern anywhere type is split for animation, and confirm split text is announced as a sentence rather than as loose words. Each section keeps a single `h2`; discipline names and craft beats are `h3`. Every section is a real `<section>` with an accessible name.
- **Motion:** `prefers-reduced-motion` must be honoured by the JS-driven motion, not only by CSS. GSAP's `matchMedia` is the right mechanism, and the reduced branch should genuinely not build the animations rather than building them at zero duration.
- **The marquee** needs pause on hover *and* on focus, and must be static under reduced motion (see §9 table).
- **Screen-reader traversal** of the numbered spine: index numbers (`01`–`04`, `01 / 03`) are decorative ordinals. Where they add nothing to the spoken content, hide them from assistive tech; where they're the row's only ordinal cue, keep them but ensure they don't fragment the row's accessible name.

---

## Motion choreography outline

**Library recommendation: GSAP + ScrollTrigger** — appropriate for this brief, and note for the implementer that **nothing animation-related is currently installed** (dependencies are `next`, `react`, `react-dom`, `postcss`, `sharp` only; all existing motion is hand-rolled CSS animation, WAAPI, and a bespoke rAF loop). In React, use the `useGSAP` hook from `@gsap/react` for scoping and cleanup. Verify current plugin licensing at install time.

**Critical implementation constraint — do not rewrite the hero engine.** The hero's scrub is a tuned custom rAF loop with exponential smoothing that also handles video priming, the iOS touch-unlock path, and the metadata-ready handoff. Scrubbing `video.currentTime` is the fiddliest thing GSAP could be asked to do here, and the existing solution works. **Keep the bespoke hero engine and extend it** (new stage windows, release frame, cue behavior, focal fix); use GSAP for everything *below* the hero. Trade-off stated plainly: two motion systems on one page is less tidy than one, and the alternative is risking the single best thing about this site to gain tidiness. Not worth it.

**Collision warning:** `SiteShell` runs a global `IntersectionObserver` over `[data-reveal]` and animates matches with WAAPI on every route change. If `/v2` uses `data-reveal`, every element will be animated twice by two systems. **`/v2` must use a distinct attribute** (e.g. `data-v2-reveal`). This is also why `SiteShell` needs no changes — do not modify the global observer.

**Choreography, in priority order:**

1. **Hero scrub (existing, refined).** The page's anchor motion. New stage windows per §6, the release frame, CTA persistence, cue fade, focal-drift fix. Everything remains scroll-linked and reversible — no time-based animation inside the sequence except the initial entrance.
2. **Masked line reveals on the display type.** The philosophy statement, craft heading, editorial heading, and terminal heading each reveal line-by-line from behind a mask with a slight upward translate and a short stagger. Once, on first entry, not reversible — this is the page's second signature and it should feel typeset, not animated. `SplitText` handles the line splitting; re-split on resize.
3. **Section reveals.** Everything else that enters — craft beats, discipline rows, press band, logistics line — uses one shared, restrained fade-and-rise, batched via ScrollTrigger. One easing curve and one distance for the whole page; the existing 900ms `cubic-bezier(0.22, 1, 0.36, 1)` is a good reference. Discipline rows stagger against each other so the list assembles rather than appearing.
4. **Press marquee (existing, refined).** Continuous linear track, pause on hover and focus, edge masks, static under reduced motion.
5. **Discipline row hover (desktop).** Index and name shift on the horizontal axis, the trailing affordance advances, the row's hairline draws, and the image preview cross-fades in. One coordinated gesture, fast (~250–350ms), and fully reversible.
6. **Editorial image parallax.** Subtle — on the order of 5–8% of the image's height across its scroll range. Scrubbed. Desktop only. If it's noticeable as an effect, it's too much.
7. **Craft ambient pointer glow (existing).** Keep as-is; gate to pointer-capable devices.

**Budget discipline.** That is five motion systems below the hero. If any of them can't be executed with real precision, cut #6 first, then #5's preview, then #5 entirely. **#1, #2, and #4 are the intentional motions this page is built on** — they are the minimum, and they are also sufficient. A page with three perfect motions beats a page with seven adequate ones, and this brand in particular cannot afford motion that looks approximate.

---

## Do not change

**Brand and design tokens**
- `--ink` #080808, `--charcoal` #121212, `--paper` #f0efeb, `--grey` #9b9b98, `--line-dark`, `--line-light`.
- Cormorant Garamond (display) and Manrope (sans) via `next/font`, and the `--font-display` / `--font-sans` variables.
- Monochrome discipline: all photography and video grayscale. **No new hues.** No purple, cream, sepia, newsprint, or accent color of any kind.
- The typographic register: uppercase letter-spaced eyebrows, tight negative-tracked display type, italic emphasis in a lighter grey, hairline rules, numbered indices.
- Circular arrow CTA language and the `Arrow` component.
- `BrandMark`, the `C|E Clothier` lockup, and the wordmark's `C|E` + small-caps `Clothier` construction.

**Structure and platform**
- `SiteShell` — header, mobile menu, footer, `BookingProvider`, and the global `[data-reveal]` observer. `/v2` renders inside it and changes nothing in it. (The single permitted exception: widening the `site-header--home` path condition to include `/v2`.)
- The `useBooking` / `BookingProvider` pattern and the booking modal's markup, fields, interest options, and success state. The primary CTA opens this modal — no inline forms, no separate booking page, no scheduler embed.
- `lib/nav.ts` and all navigation labels and destinations.
- The live `/` route and `components/HomePage.tsx` — untouched.
- Existing section anchor IDs: `#top`, `#story`, `#process`, `#collections`, `#services`, `#contact`.
- Global footer content, including the newsletter capture.

**Hero specifics**
- `/ce-hero-scroll-v2.mp4` and `/ce-hero-poster-v2.webp` — same assets, no re-encode, no crop, no substitution.
- Full-bleed edge-to-edge video plane. Never inset, never framed, never in a container, never behind a mask or shape.
- The sticky-track scroll-scrub model itself.
- The video priming / touch-unlock / metadata-handoff logic.
- Grayscale + contrast filter treatment on the video.

**Brand positioning and messaging**
- "Driven by passion, delivered with style." — the brand line.
- "Made to be remembered." — the second stage.
- Toronto · Est. 2014 · founded by Chinedu Ezemenari.
- Bespoke, private, by-appointment positioning. No retail, DTC, or e-commerce framing anywhere: no "shop," no "add to cart," no pricing, no discounts, no urgency devices, no scarcity counters.
- The four disciplines and their count: Suits, Evening, Shirting, Outerwear.
- The press set: GQ, Vogue, Vanity Fair, Us Weekly.

**Asset reality (for `content-strategist` and `ui-designer`)**
The homepage-native image library is small: `ce-collection.jpg`, `ce-detail-2.jpg`, `ce-detail-3.jpg`, `editorial.jpg`, plus the hero video and poster. Reuse from `/public/pages/` (`process-1…4`, `shirts`, `outerwear`, `wedding-1`, `celebrity-*`) is permitted where this spec calls for it, with the caveat that those images were composed for other pages — verify crops and grayscale treatment at homepage scale. **Do not spec any layout that requires photography that does not exist.** Note also that several source files are large (`ce-detail-3.jpg` ~3.3MB, `pages/outerwear.jpg` ~3.9MB); `next/image` with correct `sizes` is mandatory, and LCP on this page belongs to the hero poster, which must not be displaced by an eagerly-loaded section image.

---

## Handoff

**`content-strategist` needs to write:** the hero supporting sentence (one sentence, must sit on a hairline row beside a CTA label); the hero CTA's visible label; the philosophy statement and its supporting paragraph with founder attribution; the press band's single framing line; the craft section thesis and three beat headings with one line each; the editorial heading and positioning line; four discipline names and one line each; the terminal heading, eyebrow, CTA label, and logistics line; and a recommendation on whether a third hero stage is warranted (default: no — the release frame is the recommendation). Every section eyebrow needs to work as part of a consistent numbered editorial spine.

**`ui-designer` then executes** this structure against the existing token set, with the motion choreography above, and must resolve: the press band's ink-vs-paper decision against the actual logo assets, the craft third-beat resolution (real photography preferred), focus-visible states across both fields, and the mobile header booking affordance.
