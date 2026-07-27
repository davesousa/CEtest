"use client";

import Image from "next/image";
import Arrow from "@/components/ui/Arrow";
import { useBooking } from "@/lib/booking-context";

export default function FittingSection() {
  const { openBooking } = useBooking();

  return (
    <section
      className="v2-fitting v2-field--media"
      id="contact"
      aria-labelledby="v2-fitting-title"
    >
      <Image
        className="v2-fitting__image"
        src="/editorial.jpg"
        alt="A tailored tuxedo in the C|E Clothier studio."
        fill
        sizes="100vw"
      />
      <div className="v2-fitting__scrim" aria-hidden="true" />

      <div className="v2-fitting__content">
        <p className="eyebrow v2-fitting__eyebrow" data-v2-reveal>
          Your next chapter
        </p>
        <h2 id="v2-fitting-title" data-v2-lines>
          Let&apos;s make
          <br /> something <em>personal.</em>
        </h2>
        <button type="button" className="v2-primary-cta" onClick={openBooking} data-v2-reveal>
          Book your private fitting
          <Arrow diagonal />
        </button>
      </div>

      <p className="v2-fitting__logistics" data-v2-reveal>
        <span>Toronto, Ontario</span>
        <span>Private studio · By appointment</span>
      </p>
    </section>
  );
}
