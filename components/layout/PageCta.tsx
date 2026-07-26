"use client";

import Image from "next/image";
import { useBooking } from "@/lib/booking-context";
import Arrow from "@/components/ui/Arrow";

type PageCtaProps = {
  eyebrow?: string;
  title?: React.ReactNode;
  button?: string;
  image?: string;
  imageAlt?: string;
};

export default function PageCta({
  eyebrow = "Your next chapter",
  title = (
    <>
      Let&apos;s make
      <br /> something <em>personal.</em>
    </>
  ),
  button = "Book your private fitting",
  image = "/editorial.jpg",
  imageAlt = "A tailored tuxedo in the C E Clothier studio",
}: PageCtaProps) {
  const { openBooking } = useBooking();

  return (
    <section className="fitting">
      <Image src={image} alt={imageAlt} fill sizes="100vw" />
      <div className="fitting__overlay" />
      <div className="fitting__content" data-reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <button onClick={openBooking} className="light-button">
          {button} <Arrow diagonal />
        </button>
      </div>
      <div className="fitting__details">
        <p>Toronto, Ontario</p>
        <p>Private studio · By appointment</p>
      </div>
    </section>
  );
}
