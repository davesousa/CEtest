"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import { useBooking } from "@/lib/booking-context";
import Arrow from "@/components/ui/Arrow";

const options = [
  {
    title: "Collar",
    text: "Spread, cutaway, classic, or button-down—proportioned to your neck and lapel width.",
  },
  {
    title: "Cuff",
    text: "Single, double, or cocktail. Chosen to sit cleanly under your jacket sleeve.",
  },
  {
    title: "Monogram",
    text: "Discreet initials where only you know to look—or nowhere at all.",
  },
  {
    title: "Cloth",
    text: "Hundreds of shirting fabrics: poplin, twill, oxford, and seasonal textures.",
  },
];

export default function CustomShirtsPage() {
  const { openBooking } = useBooking();

  return (
    <main className="page page--shirts">
      <PageHero
        eyebrow="Custom shirts"
        title={
          <>
            Perfect
            <br /> <em>proportion.</em>
          </>
        }
        body="Hand tailored shirting with hundreds of cloths and every collar, cuff, and monogram decided by you."
        image="/pages/shirts.jpg"
        imageAlt="Custom C E Clothier dress shirts"
        index="04"
      />

      <section className="page-duo" data-reveal>
        <div className="page-duo__media">
          <Image
            src="/pages/shirts.jpg"
            alt="Folded custom shirts from C E Clothier"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <div className="page-duo__media page-duo__media--offset">
          <Image
            src="/pages/shirts-alt.jpg"
            alt="Shirt collar and cuff detail"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="manifesto" data-reveal>
        <div className="manifesto__meta">
          <p className="eyebrow">Shirting</p>
          <p>Hand tailored</p>
        </div>
        <div className="manifesto__statement">
          <p>
            A collar made to sit
            <br /> <em>exactly right.</em>
          </p>
        </div>
        <div className="manifesto__copy">
          <span className="section-index">02</span>
          <p>
            Hundreds of shirting fabrics. Patterns cut to your measurements. Construction that holds
            its shape through long days and late evenings—because the shirt is where comfort and
            polish meet.
          </p>
          <button type="button" className="text-link" onClick={openBooking}>
            Commission shirts <Arrow />
          </button>
        </div>
      </section>

      <section className="page-options" data-reveal>
        <div className="page-options__intro">
          <p className="eyebrow">Your decisions</p>
          <h2>
            Every detail,
            <br /> considered.
          </h2>
        </div>
        <div className="page-options__grid">
          {options.map((option, index) => (
            <article key={option.title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{option.title}</h3>
              <p>{option.text}</p>
            </article>
          ))}
        </div>
        <Link href="/custom-suits" className="text-link">
          Pair with a custom suit <Arrow />
        </Link>
      </section>

      <PageCta
        eyebrow="Build your rotation"
        title={
          <>
            Shirts that
            <br /> earn their <em>keep.</em>
          </>
        }
        image="/pages/shirts-alt.jpg"
        imageAlt="Custom shirt detail"
        button="Book a shirting consultation"
      />
    </main>
  );
}
