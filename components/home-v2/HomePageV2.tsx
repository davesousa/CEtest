"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import CraftSection from "./CraftSection";
import DisciplinesSection from "./DisciplinesSection";
import EditorialSection from "./EditorialSection";
import FittingSection from "./FittingSection";
import HeroSequence from "./HeroSequence";
import PhilosophySection from "./PhilosophySection";
import "./home-v2.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const REVEAL_EASE = "power3.out";

export default function HomePageV2() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      // Everything below is motion enrichment layered on top of content that is
      // already visible and readable, so the reduced-motion branch simply never
      // builds it rather than building it at zero duration.
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const revealItems = gsap.utils.toArray<HTMLElement>("[data-v2-reveal]");
        if (revealItems.length) {
          gsap.set(revealItems, { opacity: 0, y: 38 });
          ScrollTrigger.batch(revealItems, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: REVEAL_EASE,
                stagger: 0.08,
                overwrite: true,
              }),
          });
        }

        // The discipline list assembles as a list rather than as four
        // independent blocks, so it gets its own staggered trigger.
        const rows = gsap.utils.toArray<HTMLElement>("[data-v2-row]");
        const rowList = rows[0]?.parentElement;
        if (rows.length && rowList) {
          gsap.from(rows, {
            opacity: 0,
            y: 34,
            duration: 0.85,
            ease: REVEAL_EASE,
            stagger: 0.09,
            scrollTrigger: { trigger: rowList, start: "top 84%", once: true },
          });
        }

        // The page's second signature: display type is typeset into place line
        // by line from behind a mask. Splits re-run on resize and font load, but
        // a heading that has already played is restored rather than replayed.
        const played = new WeakSet<Element>();
        const splits = gsap.utils.toArray<HTMLElement>("[data-v2-lines]").map((heading) =>
          SplitText.create(heading, {
            type: "lines",
            mask: "lines",
            linesClass: "v2-line",
            autoSplit: true,
            onSplit(self) {
              if (played.has(heading)) {
                gsap.set(self.lines, { yPercent: 0, opacity: 1 });
                return;
              }
              return gsap.from(self.lines, {
                yPercent: 120,
                opacity: 0,
                duration: 1.15,
                ease: "power4.out",
                stagger: 0.085,
                scrollTrigger: {
                  trigger: heading,
                  start: "top 86%",
                  once: true,
                  onEnter: () => played.add(heading),
                },
              });
            },
          }),
        );

        return () => splits.forEach((split) => split.revert());
      });

      // Editorial parallax: the image drifts a few percent inside its frame.
      // Desktop only — at mobile scale it costs performance and reads as nothing.
      media.add("(prefers-reduced-motion: no-preference) and (min-width: 1050px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-v2-parallax]").forEach((plane) => {
          gsap.fromTo(
            plane,
            { yPercent: -3.5 },
            {
              yPercent: 3.5,
              ease: "none",
              scrollTrigger: {
                trigger: plane.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <main className="home-v2" ref={rootRef}>
      <HeroSequence />
      <PhilosophySection />
      <CraftSection />
      <EditorialSection />
      <DisciplinesSection />
      <FittingSection />
    </main>
  );
}
