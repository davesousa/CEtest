"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import { useBooking } from "@/lib/booking-context";
import Arrow from "@/components/ui/Arrow";

const occasions = [
  {
    number: "01",
    title: "Toronto winters",
    text: "Weight, length, and cloth chosen to command cold streets without sacrificing silhouette.",
  },
  {
    number: "02",
    title: "Occasion wear",
    text: "Evening coats and statement overcoats cut to finish a look the moment you arrive.",
  },
  {
    number: "03",
    title: "Made from scratch",
    text: "Pattern, cloth, and construction built exclusively for you—never off-the-rack adjusted.",
  },
];

export default function OuterwearPage() {
  const { openBooking } = useBooking();

  return (
    <main className="page page--outerwear">
      <PageHero
        eyebrow="Custom outerwear"
        title={
          <>
            Presence,
            <br /> even in the <em>cold.</em>
          </>
        }
        body="Overcoats made from scratch for Toronto winters and the occasions that ask you to arrive already composed."
        image="/pages/outerwear.jpg"
        imageAlt="Custom C E Clothier overcoat"
        index="05"
        focal="center top"
      />

      <section className="editorial">
        <div className="editorial__image" data-reveal>
          <Image
            src="/pages/outerwear.jpg"
            alt="Tailored overcoat silhouette"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <p>Outerwear — Made to order</p>
        </div>
        <div className="editorial__copy" data-reveal>
          <p className="eyebrow">Built for climate</p>
          <h2>
            A coat that
            <br /> holds the <em>line.</em>
          </h2>
          <p className="editorial__body">
            From soft structured day coats to fuller winter overcoats, every piece is drafted for
            how you move through the city—and how you want to be remembered when you enter a room.
          </p>
          <button type="button" className="circle-cta" onClick={openBooking}>
            <span>Enquire about outerwear</span>
            <Arrow diagonal />
          </button>
        </div>
      </section>

      <section className="page-pillars page-pillars--stack" data-reveal>
        {occasions.map((item) => (
          <article key={item.title}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="page-split page-split--dark" data-reveal>
        <div className="page-split__copy">
          <p className="eyebrow">Complete the wardrobe</p>
          <h2>
            Layer with
            <br /> intention.
          </h2>
          <p>
            Outerwear is the first impression and the last defense. We cut it to sit cleanly over
            your C|E suit—or stand alone with equal authority.
          </p>
          <div className="page-inline-links">
            <Link href="/custom-suits" className="text-link">
              Custom suits <Arrow />
            </Link>
            <Link href="/weddings" className="text-link">
              Wedding attire <Arrow />
            </Link>
          </div>
        </div>
        <div className="page-split__media">
          <Image
            src="/editorial.jpg"
            alt="Evening tailored look from C E Clothier"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>

      <PageCta
        eyebrow="Commission outerwear"
        title={
          <>
            Own the season
            <br /> you walk <em>through.</em>
          </>
        }
        image="/editorial.jpg"
        imageAlt="C E Clothier evening wear"
      />
    </main>
  );
}
