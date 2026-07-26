"use client";

import Image from "next/image";
import { ReactNode, useEffect, useRef } from "react";
import { useBooking } from "@/lib/booking-context";
import Arrow from "@/components/ui/Arrow";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  body: string;
  image: string;
  imageAlt: string;
  index?: string;
  ctaLabel?: string;
  focal?: string;
};

export default function PageHero({
  eyebrow,
  title,
  body,
  image,
  imageAlt,
  index = "01",
  ctaLabel = "Book a private fitting",
  focal = "center",
}: PageHeroProps) {
  const { openBooking } = useBooking();
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const media = mediaRef.current;
    if (!hero || !media) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      media.style.transform = `translate3d(0, ${progress * 14}%, 0) scale(${1 + progress * 0.06})`;
      media.style.opacity = String(1 - progress * 0.35);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="page-hero" id="top" ref={heroRef}>
      <div className="page-hero__media" ref={mediaRef}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: focal }}
        />
        <div className="page-hero__shade" />
      </div>
      <div className="page-hero__content">
        <div className="page-hero__meta">
          <p className="eyebrow">{eyebrow}</p>
          <span>{index}</span>
        </div>
        <h1>{title}</h1>
        <div className="page-hero__bottom">
          <p>{body}</p>
          <button className="round-link" onClick={openBooking} aria-label={ctaLabel}>
            <Arrow diagonal />
          </button>
        </div>
      </div>
      <div className="page-hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <i>
          <b />
        </i>
      </div>
    </section>
  );
}
