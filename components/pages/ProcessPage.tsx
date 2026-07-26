"use client";

import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import { useBooking } from "@/lib/booking-context";
import Arrow from "@/components/ui/Arrow";

const steps = [
  {
    number: "01",
    title: "Fitting Appointment",
    text: "A private consultation in our Toronto studio to understand your wardrobe, occasions, and how you move through the world.",
    image: "/pages/process-1.jpg",
    alt: "Private fitting consultation at C E Clothier",
  },
  {
    number: "02",
    title: "Fabric Selection",
    text: "Choose from a curated library of cloth from the finest mills—weight, hand, and character matched to how you live.",
    image: "/pages/process-2.jpg",
    alt: "Selecting cloth from C E Clothier fabric books",
  },
  {
    number: "03",
    title: "Design",
    text: "Lapel, lining, button, stitch. Every decision is considered so the finished garment feels unmistakably yours.",
    image: "/pages/process-3.jpg",
    alt: "Design details and construction at C E Clothier",
  },
  {
    number: "04",
    title: "Measurement Profile",
    text: "We study posture, proportion, and preference to draft an individual pattern—never a block adjusted after the fact.",
    image: "/pages/process-4.jpg",
    alt: "Measuring for a bespoke C E Clothier garment",
  },
  {
    number: "05",
    title: "Commission",
    text: "Your garment is cut and constructed to your pattern. Fittings refine the final expression before delivery.",
    image: "/pages/process-1.jpg",
    alt: "Commissioned suit ready for final fitting",
  },
];

const mills = [
  "Dormeuil",
  "Drago",
  "Tessitura / Tessilstrona",
  "Marzotto / Marzoni",
  "Vitale Barberis Canonico",
];

export default function ProcessPage() {
  const { openBooking } = useBooking();

  return (
    <main className="page page--process">
      <PageHero
        eyebrow="The process"
        title={
          <>
            From conversation
            <br /> to <em>commission.</em>
          </>
        }
        body="No templates. No shortcuts. Every garment begins with a fitting and ends with something built around you."
        image="/pages/process-2.jpg"
        imageAlt="Fabric selection in the C E Clothier studio"
        index="02"
      />

      <section className="page-steps">
        <div className="page-steps__intro" data-reveal>
          <p className="eyebrow">Five considered stages</p>
          <h2>
            How a C|E
            <br /> garment is <em>made.</em>
          </h2>
        </div>
        <ol className="page-steps__list">
          {steps.map((step) => (
            <li key={step.number} className="page-steps__item" data-reveal>
              <div className="page-steps__media">
                <Image src={step.image} alt={step.alt} fill sizes="(max-width: 800px) 100vw, 48vw" />
                <span>{step.number}</span>
              </div>
              <div className="page-steps__copy">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="page-mills" data-reveal>
        <div className="page-mills__intro">
          <p className="eyebrow">Cloth with character</p>
          <h2>
            Mills we
            <br /> trust.
          </h2>
          <p>
            A library of over 1,000 fabrics from houses that define modern luxury menswear—selected
            for hand, durability, and quiet distinction.
          </p>
        </div>
        <ul className="page-mills__list">
          {mills.map((mill) => (
            <li key={mill}>{mill}</li>
          ))}
        </ul>
      </section>

      <section className="page-split page-split--dark" data-reveal>
        <div className="page-split__copy">
          <p className="eyebrow">Timeline</p>
          <h2>
            Patience,
            <br /> properly <em>timed.</em>
          </h2>
          <div className="page-timeline">
            <article>
              <span>Custom</span>
              <strong>6–7 weeks</strong>
              <p>Made to your measurements with considered construction throughout.</p>
            </article>
            <article>
              <span>Bespoke</span>
              <strong>10 weeks</strong>
              <p>A fully individual pattern, multiple fittings, and complete creative control.</p>
            </article>
          </div>
          <button type="button" className="text-link" onClick={openBooking}>
            Book your fitting <Arrow />
          </button>
        </div>
        <div className="page-split__media">
          <Image
            src="/pages/process-4.jpg"
            alt="Bespoke measurement at C E Clothier"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>

      <PageCta
        eyebrow="Start the process"
        title={
          <>
            Your fitting
            <br /> is the first <em>stitch.</em>
          </>
        }
        image="/pages/process-3.jpg"
        imageAlt="Suit construction detail"
      />
    </main>
  );
}
