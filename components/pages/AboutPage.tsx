"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import Arrow from "@/components/ui/Arrow";

const pillars = [
  {
    number: "01",
    title: "Class",
    text: "Quiet codes of dress, reinterpreted for the man who already knows who he is.",
  },
  {
    number: "02",
    title: "Distinction",
    text: "An individual pattern and considered detail so presence arrives before the introduction.",
  },
  {
    number: "03",
    title: "Elegance",
    text: "Balance, restraint, and cloth that moves with you—never against you.",
  },
];

export default function AboutPage() {
  return (
    <main className="page page--about">
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Founded on
            <br /> craft. Driven by <em>passion.</em>
          </>
        }
        body="Luxury custom suits, shirts, and overcoats for men who understand that style is more than what you wear."
        image="/ce-collection.jpg"
        imageAlt="C E Clothier client in a double-breasted checked suit"
        index="01"
        focal="center top"
      />

      <section className="manifesto" data-reveal>
        <div className="manifesto__meta">
          <p className="eyebrow">Est. 2014</p>
          <p>Toronto / Canada</p>
        </div>
        <div className="manifesto__statement">
          <p>
            Every man can tell their style story
            <br /> with <em>class, distinction,</em>
            <br /> and elegance.
          </p>
        </div>
        <div className="manifesto__copy">
          <span className="section-index">02</span>
          <p>
            C|E Clothier was founded by creative director Chinedu Ezemenari with a simple
            conviction: garments should say who you are before you do. From a private Toronto
            studio, we craft suits, shirts, and overcoats made entirely around the wearer.
          </p>
          <Link href="/our-process" className="text-link">
            See how we work <Arrow />
          </Link>
        </div>
      </section>

      <section className="editorial page-editorial--flip">
        <div className="editorial__image" data-reveal>
          <Image
            src="/editorial.jpg"
            alt="Tailored tuxedo detail in the C E Clothier studio"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <p>Studio notes — Vol. II</p>
        </div>
        <div className="editorial__copy" data-reveal>
          <p className="eyebrow">The vision</p>
          <h2>
            Delivered
            <br /> with <em>style.</em>
          </h2>
          <p className="editorial__body">
            Driven by passion, delivered with style. That tagline is more than a line—it is how
            every fitting, every cloth choice, and every finished garment leaves the studio.
          </p>
          <Link href="/custom-suits" className="circle-cta">
            <span>Explore the collection</span>
            <Arrow diagonal />
          </Link>
        </div>
      </section>

      <section className="craft" data-reveal>
        <div className="craft__heading">
          <p className="eyebrow">What we stand for</p>
          <h2>Three words. One standard.</h2>
          <p>
            Class, distinction, and elegance are not slogans—they are the measures against which
            every commission is held.
          </p>
        </div>
        <div className="page-pillars">
          {pillars.map((pillar) => (
            <article key={pillar.title} data-reveal>
              <span>{pillar.number}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-split" data-reveal>
        <div className="page-split__media">
          <Image
            src="/ce-detail-3.jpg"
            alt="Hand-basted C E Clothier suit during fitting"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <div className="page-split__copy">
          <p className="eyebrow">The atelier</p>
          <h2>
            A private
            <br /> Toronto <em>studio.</em>
          </h2>
          <p>
            Appointments are personal by design. We take the time to understand posture,
            proportion, and the life you dress for—then build from there.
          </p>
          <Link href="/contact" className="text-link">
            Visit by appointment <Arrow />
          </Link>
        </div>
      </section>

      <PageCta
        eyebrow="Begin with us"
        title={
          <>
            Your story,
            <br /> cut to <em>measure.</em>
          </>
        }
        image="/ce-collection.jpg"
        imageAlt="C E Clothier tailored look"
      />
    </main>
  );
}
