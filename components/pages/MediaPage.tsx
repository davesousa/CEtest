"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import Arrow from "@/components/ui/Arrow";

const pressLogos = [
  { name: "GQ", src: "/press/gq.svg", className: "gq" },
  { name: "Vogue", src: "/press/vogue.svg", className: "vogue" },
  { name: "Vanity Fair", src: "/press/vanity-fair.svg", className: "vanity" },
  { name: "Us Weekly", src: "/press/us-weekly.png", className: "us-weekly" },
];

const stories = [
  {
    title: "Red carpet moments",
    text: "Emmy nights, premiere evenings, and Oscar-week rooms where C|E Clothier looks were noted by the press that matters.",
    image: "/pages/celebrity-1.jpg",
    alt: "Red carpet moment in C E Clothier",
  },
  {
    title: "Editorial storytelling",
    text: "From Regard Magazine to fashion features, our garments are built to photograph with the same quiet authority they wear in person.",
    image: "/pages/celebrity-5.png",
    alt: "Editorial look in C E Clothier",
  },
  {
    title: "Runway & events",
    text: "Live presentations and private showcases where craft, cloth, and presence meet an audience in real time.",
    image: "/ce-collection.jpg",
    alt: "C E Clothier collection presentation",
  },
];

export default function MediaPage() {
  return (
    <main className="page page--media">
      <PageHero
        eyebrow="Media"
        title={
          <>
            In the pages
            <br /> that <em>matter.</em>
          </>
        }
        body="Press recognition from GQ, Vogue, Vanity Fair, and Us Weekly—alongside runway moments and editorial storytelling."
        image="/pages/media-1.jpg"
        imageAlt="C E Clothier in the press"
        index="07"
      />

      <section className="recognition" aria-label="Press recognition" data-reveal>
        <p className="eyebrow">As seen in</p>
        <div className="recognition__track">
          <div>
            {[...pressLogos, ...pressLogos].map((logo, index) => (
              <span
                className={`recognition__logo recognition__logo--${logo.className}`}
                key={`${logo.name}-${index}`}
                aria-hidden={index >= pressLogos.length ? true : undefined}
              >
                <img
                  src={logo.src}
                  alt={index < pressLogos.length ? logo.name : ""}
                  loading="lazy"
                />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="page-media-grid">
        <div className="page-media-grid__intro" data-reveal>
          <p className="eyebrow">Coverage</p>
          <h2>
            Stories beyond
            <br /> the <em>fitting room.</em>
          </h2>
        </div>
        <div className="page-media-grid__list">
          {stories.map((story) => (
            <article key={story.title} data-reveal>
              <div className="page-media-grid__media">
                <Image src={story.image} alt={story.alt} fill sizes="(max-width: 800px) 100vw, 33vw" />
              </div>
              <h3>{story.title}</h3>
              <p>{story.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial">
        <div className="editorial__image" data-reveal>
          <Image
            src="/pages/media-1.jpg"
            alt="C E Clothier media feature"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <p>Press archive</p>
        </div>
        <div className="editorial__copy" data-reveal>
          <p className="eyebrow">For press</p>
          <h2>
            Looking for
            <br /> imagery or a <em>quote?</em>
          </h2>
          <p className="editorial__body">
            For editorial requests, event coverage, or collaboration inquiries, reach the studio
            directly. We are selective, considered, and always on time.
          </p>
          <Link href="/contact" className="circle-cta">
            <span>Contact the studio</span>
            <Arrow diagonal />
          </Link>
        </div>
      </section>

      <PageCta
        eyebrow="Be part of the story"
        title={
          <>
            Dress for the
            <br /> moment they’ll <em>print.</em>
          </>
        }
        image="/ce-collection.jpg"
        imageAlt="C E Clothier collection look"
      />
    </main>
  );
}
