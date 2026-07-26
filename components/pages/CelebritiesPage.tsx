"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import Arrow from "@/components/ui/Arrow";

const clients = [
  {
    name: "Marcus Scribner",
    credit: "Blackish · 2018 Emmys",
    press: "GQ / US Magazine — Best Dressed",
    image: "/pages/celebrity-1.jpg",
    alt: "Marcus Scribner in C E Clothier at the Emmys",
  },
  {
    name: "Karamo Brown",
    credit: "Queer Eye · 2018 Emmys",
    press: "Vogue / GQ / Vanity Fair",
    image: "/pages/celebrity-2.jpg",
    alt: "Karamo Brown in C E Clothier at the Emmys",
  },
  {
    name: "Derek Fisher",
    credit: "Equalizer 2 premiere",
    press: "Handmade bespoke",
    image: "/pages/celebrity-3.png",
    alt: "Derek Fisher in handmade bespoke C E Clothier",
  },
  {
    name: "Mike Colter",
    credit: "Luke Cage · 2017 VF Oscar Party",
    press: "Vanity Fair",
    image: "/pages/celebrity-4.png",
    alt: "Mike Colter in C E Clothier at the Vanity Fair Oscar Party",
  },
  {
    name: "Cory Hardrict",
    credit: "The Oath",
    press: "Regard Magazine editorial",
    image: "/pages/celebrity-5.png",
    alt: "Cory Hardrict in C E Clothier for Regard Magazine",
  },
];

export default function CelebritiesPage() {
  return (
    <main className="page page--celebrities">
      <PageHero
        eyebrow="Clientèle"
        title={
          <>
            Worn where
            <br /> the world is <em>watching.</em>
          </>
        }
        body="From Emmy carpets to premiere nights, C|E Clothier dresses men who understand the weight of a first impression."
        image="/pages/celebrity-1.jpg"
        imageAlt="C E Clothier celebrity client on the red carpet"
        index="06"
        focal="center top"
      />

      <section className="page-stories">
        <div className="page-stories__intro" data-reveal>
          <p className="eyebrow">Selected clients</p>
          <h2>
            Names that
            <br /> carry a <em>room.</em>
          </h2>
        </div>
        <div className="page-stories__list">
          {clients.map((client, index) => (
            <article
              key={client.name}
              className={`page-story ${index % 2 === 1 ? "page-story--flip" : ""}`}
              data-reveal
            >
              <div className="page-story__media">
                <Image
                  src={client.image}
                  alt={client.alt}
                  fill
                  sizes="(max-width: 800px) 100vw, 48vw"
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="page-story__copy">
                <p className="eyebrow">{client.credit}</p>
                <h3>{client.name}</h3>
                <p>{client.press}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-split" data-reveal>
        <div className="page-split__copy">
          <p className="eyebrow">Private commissions</p>
          <h2>
            The same
            <br /> standard for <em>everyone.</em>
          </h2>
          <p>
            Whether the cameras are rolling or the appointment is entirely private, every garment
            follows the same process: measured, considered, and cut to the man who will wear it.
          </p>
          <Link href="/media" className="text-link">
            See press & media <Arrow />
          </Link>
        </div>
        <div className="page-split__media">
          <Image
            src="/pages/celebrity-3.png"
            alt="Bespoke C E Clothier red carpet look"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>

      <PageCta
        eyebrow="Join the clientèle"
        title={
          <>
            Your carpet.
            <br /> Your <em>terms.</em>
          </>
        }
        image="/pages/celebrity-2.jpg"
        imageAlt="C E Clothier clientèle look"
      />
    </main>
  );
}
