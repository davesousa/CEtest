"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { craftBeats } from "./content";
import SpineEyebrow from "./SpineEyebrow";

/**
 * The ambient glow tracks the pointer across this section only, and only on
 * devices that actually have a pointer — on touch it could only ever be
 * triggered by accident.
 */
function useAmbientGlow(target: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = target.current;
    if (!element) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      frame = 0;
      element.style.setProperty("--v2-glow-x", `${x.toFixed(1)}px`);
      element.style.setProperty("--v2-glow-y", `${y.toFixed(1)}px`);
    };

    const onMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      x = event.clientX - bounds.left;
      y = event.clientY - bounds.top;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    element.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      element.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target]);
}

export default function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useAmbientGlow(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="v2-craft v2-field--ink"
      id="process"
      aria-labelledby="v2-craft-title"
    >
      <div className="v2-craft__heading">
        <div data-v2-reveal>
          <SpineEyebrow index="02" label="The C|E standard" />
        </div>
        <h2 id="v2-craft-title" data-v2-lines>
          Built around you.
        </h2>
        <p className="v2-craft__thesis" data-v2-reveal>
          No templates. No shortcuts. Every garment begins with a conversation and ends with
          something unmistakably yours.
        </p>
      </div>

      <div className="v2-craft__sequence">
        {craftBeats.map((beat, index) => (
          <article
            className={`v2-beat v2-beat--${index + 1}`}
            key={beat.title}
            data-v2-reveal
          >
            <div className="v2-beat__frame">
              <Image
                src={beat.image.src}
                alt={beat.image.alt}
                fill
                sizes={beat.image.sizes}
              />
              <span className="v2-beat__counter" aria-hidden="true">
                {beat.counter}
              </span>
            </div>
            <div className="v2-beat__caption">
              <span className="v2-tick" aria-hidden="true" />
              <h3>{beat.title}</h3>
              <p>{beat.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
