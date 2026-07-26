"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import { useBooking } from "@/lib/booking-context";
import Arrow from "@/components/ui/Arrow";

const features = [
  {
    number: "01",
    title: "Individual pattern",
    text: "Drafted around your posture and proportion—never a stock block stretched to fit.",
  },
  {
    number: "02",
    title: "Canvassed construction",
    text: "Structure that molds to you over time, with a chest and lapel that roll as they should.",
  },
  {
    number: "03",
    title: "1,000+ fabrics",
    text: "Cloth from the world’s great mills, chosen for season, occasion, and character.",
  },
  {
    number: "04",
    title: "Full customization",
    text: "Lining, buttons, monogram, silhouette—every detail is a decision you make.",
  },
];

export default function CustomSuitsPage() {
  const { openBooking } = useBooking();

  return (
    <main className="page page--suits">
      <PageHero
        eyebrow="Custom suits"
        title={
          <>
            Built around
            <br /> your <em>frame.</em>
          </>
        }
        body="An individual pattern, canvassed construction, and a library of cloth that lets presence speak first."
        image="/ce-collection.jpg"
        imageAlt="C E Clothier client in a custom double-breasted suit"
        index="03"
        focal="center top"
      />

      <section className="services page-services--static">
        <div className="services__intro" data-reveal>
          <div>
            <p className="eyebrow">The C|E suit</p>
            <h2>
              No templates.
              <br /> No shortcuts.
            </h2>
          </div>
          <p>Four foundations</p>
        </div>
        <div className="services__list">
          {features.map((feature) => (
            <article key={feature.title} data-reveal>
              <span>{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <button
                type="button"
                onClick={openBooking}
                aria-label={`Enquire about ${feature.title}`}
              >
                <Arrow diagonal />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial">
        <div className="editorial__image" data-reveal>
          <Image
            src="/ce-detail-2.jpg"
            alt="C E Clothier lining and cloth label detail"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <p>Construction notes</p>
        </div>
        <div className="editorial__copy" data-reveal>
          <p className="eyebrow">Canvassed by hand</p>
          <h2>
            Structure
            <br /> you can <em>feel.</em>
          </h2>
          <p className="editorial__body">
            Our suits are canvassed for shape that softens into your shoulder and chest—never glued
            into a stiff silhouette. The result is comfort with authority.
          </p>
          <Link href="/our-process" className="circle-cta">
            <span>See the process</span>
            <Arrow diagonal />
          </Link>
        </div>
      </section>

      <section className="page-split" data-reveal>
        <div className="page-split__media">
          <Image
            src="/ce-detail-3.jpg"
            alt="Hand-finished suit detail at C E Clothier"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <div className="page-split__copy">
          <p className="eyebrow">Cloth library</p>
          <h2>
            Over a thousand
            <br /> ways to begin.
          </h2>
          <p>
            From soft flannels to crisp mid-weight wools, we guide you toward cloth that matches the
            life you dress for—boardroom, evening, or everyday command.
          </p>
          <div className="page-inline-links">
            <Link href="/custom-shirts" className="text-link">
              Custom shirts <Arrow />
            </Link>
            <Link href="/custom-outerwear" className="text-link">
              Outerwear <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Commission a suit"
        title={
          <>
            Make the room
            <br /> notice <em>quietly.</em>
          </>
        }
        image="/ce-collection.jpg"
        imageAlt="Custom C E Clothier suit"
      />
    </main>
  );
}
