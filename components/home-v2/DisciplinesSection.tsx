"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Arrow from "@/components/ui/Arrow";
import { disciplines } from "./content";
import SpineEyebrow from "./SpineEyebrow";

const ENRICHMENT_QUERY = "(min-width: 1050px) and (prefers-reduced-motion: no-preference)";

export default function DisciplinesSection() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [enriched, setEnriched] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // The hover preview is enrichment only: every row is fully legible and fully
  // clickable without it, so it is withheld below 1050px and under reduced motion.
  useEffect(() => {
    const query = window.matchMedia(ENRICHMENT_QUERY);
    const sync = () => setEnriched(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const container = previewRef.current;
    if (!container) return;
    const panels = Array.from(container.querySelectorAll<HTMLElement>(".v2-preview__item"));

    if (!enriched) {
      gsap.set(container, { autoAlpha: 0 });
      gsap.set(panels, { autoAlpha: 0, scale: 1.05 });
      setActiveIndex(null);
      return;
    }

    const tweens = [
      gsap.to(container, {
        autoAlpha: activeIndex === null ? 0 : 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      }),
      ...panels.map((panel, index) =>
        gsap.to(panel, {
          autoAlpha: index === activeIndex ? 1 : 0,
          scale: index === activeIndex ? 1 : 1.05,
          duration: index === activeIndex ? 0.5 : 0.32,
          ease: "power2.out",
          overwrite: "auto",
        }),
      ),
    ];

    return () => tweens.forEach((tween) => tween.kill());
  }, [activeIndex, enriched]);

  const activate = (index: number) => {
    if (enriched) setActiveIndex(index);
  };

  const deactivate = () => {
    if (enriched) setActiveIndex(null);
  };

  return (
    <section
      className="v2-disciplines v2-field--ink"
      id="services"
      aria-labelledby="v2-disciplines-title"
    >
      <div className="v2-disciplines__intro">
        <div data-v2-reveal>
          <SpineEyebrow index="04" label="The disciplines" />
        </div>
        <h2 id="v2-disciplines-title" data-v2-lines>
          A complete wardrobe,{" "}
          <br />
          one considered piece <span className="v2-hold">at a time.</span>
        </h2>
      </div>

      <div className="v2-disciplines__list">
        {disciplines.map((discipline, index) => (
          <Link
            key={discipline.name}
            href={discipline.href}
            className="v2-row"
            aria-label={discipline.accessibleName}
            data-v2-row
            data-active={enriched && activeIndex === index ? "true" : undefined}
            onPointerEnter={() => activate(index)}
            onPointerLeave={deactivate}
            onFocus={() => activate(index)}
            onBlur={deactivate}
          >
            <span className="v2-row__index" aria-hidden="true">
              {discipline.index}
            </span>
            <span className="v2-row__name">{discipline.name}</span>
            <span className="v2-row__line">{discipline.line}</span>
            <span className="v2-row__affordance" aria-hidden="true">
              <Arrow />
            </span>
          </Link>
        ))}

        <div className="v2-preview" ref={previewRef} aria-hidden="true">
          {disciplines.map((discipline) => (
            <div className="v2-preview__item" key={`preview-${discipline.name}`}>
              <Image
                src={discipline.preview.src}
                alt=""
                fill
                sizes="17rem"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
