"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import { useBooking } from "@/lib/booking-context";
import Arrow from "@/components/ui/Arrow";

const uses = [
  {
    number: "01",
    title: "Suit or jacket",
    text: "Toward a custom suit or sport coat—chosen and cut for the recipient.",
  },
  {
    number: "02",
    title: "Shirting",
    text: "A rotation of hand-tailored shirts in cloths they will actually wear.",
  },
  {
    number: "03",
    title: "Bespoke experience",
    text: "The full C|E journey: fitting, fabric, design, and a garment made around them.",
  },
];

export default function GiftCardPage() {
  const { openBooking } = useBooking();

  return (
    <main className="page page--gift">
      <PageHero
        eyebrow="Gift card"
        title={
          <>
            Give the gift
            <br /> of <em>presence.</em>
          </>
        }
        body="A flexible C|E Clothier gift toward a suit, jacket, shirt, or the full bespoke experience."
        image="/pages/gift-card.jpg"
        imageAlt="C E Clothier gift card"
        index="10"
      />

      <section className="editorial">
        <div className="editorial__image" data-reveal>
          <Image
            src="/pages/gift-card.jpg"
            alt="C E Clothier gift presentation"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <p>Flexible value</p>
        </div>
        <div className="editorial__copy" data-reveal>
          <p className="eyebrow">How it works</p>
          <h2>
            One card.
            <br /> Their <em>choices.</em>
          </h2>
          <p className="editorial__body">
            Ideal when you know they deserve something exceptional—but the silhouette, cloth, and
            detail should remain theirs. We arrange value, presentation, and a private introduction
            to the studio.
          </p>
          <button type="button" className="circle-cta" onClick={openBooking}>
            <span>Enquire about a gift card</span>
            <Arrow diagonal />
          </button>
        </div>
      </section>

      <section className="page-pillars" data-reveal>
        {uses.map((use) => (
          <article key={use.title}>
            <span>{use.number}</span>
            <h3>{use.title}</h3>
            <p>{use.text}</p>
          </article>
        ))}
      </section>

      <section className="page-split page-split--dark" data-reveal>
        <div className="page-split__copy">
          <p className="eyebrow">Occasions</p>
          <h2>
            Weddings,
            <br /> milestones, <em>thanks.</em>
          </h2>
          <p>
            From groomsmen gifts to career milestones, a C|E gift card opens the door to a
            wardrobe that lasts longer than the moment that prompted it.
          </p>
          <Link href="/contact" className="text-link">
            Contact the studio <Arrow />
          </Link>
        </div>
        <div className="page-split__media">
          <Image
            src="/ce-collection.jpg"
            alt="Custom suit available with a gift card"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>

      <PageCta
        eyebrow="Give thoughtfully"
        title={
          <>
            Something they’ll
            <br /> wear with <em>pride.</em>
          </>
        }
        image="/pages/gift-card.jpg"
        imageAlt="C E Clothier gift"
        button="Request a gift card"
      />
    </main>
  );
}
