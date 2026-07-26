"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import { useBooking } from "@/lib/booking-context";
import Arrow from "@/components/ui/Arrow";

export default function WeddingsPage() {
  const { openBooking } = useBooking();

  return (
    <main className="page page--weddings">
      <PageHero
        eyebrow="Weddings"
        title={
          <>
            Two souls.
            <br /> One <em>standard.</em>
          </>
        }
        body="Wedding garments made from scratch for the groom and wedding party—cut for the day you will remember forever."
        image="/pages/wedding-1.jpg"
        imageAlt="Groom in a custom C E Clothier wedding suit"
        index="08"
        focal="center top"
      />

      <section className="page-quote" data-reveal>
        <blockquote>
          <p>
            “Two souls, but a single thought.
            <br /> Two hearts that beat as one.”
          </p>
        </blockquote>
      </section>

      <section className="page-duo page-duo--wedding" data-reveal>
        <div className="page-duo__media">
          <Image
            src="/pages/wedding-1.jpg"
            alt="Wedding party in C E Clothier"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
        <div className="page-duo__media">
          <Image
            src="/pages/wedding-2.jpg"
            alt="Custom wedding suit detail"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="editorial page-editorial--flip">
        <div className="editorial__image" data-reveal>
          <Image
            src="/pages/wedding-2.jpg"
            alt="Bespoke wedding attire from C E Clothier"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <p>Made for the aisle</p>
        </div>
        <div className="editorial__copy" data-reveal>
          <p className="eyebrow">Groom & party</p>
          <h2>
            From scratch,
            <br /> for <em>everyone.</em>
          </h2>
          <p className="editorial__body">
            We create wedding garments from scratch for the groom and the wedding party—matching
            cloth, complementary silhouettes, and a shared sense of occasion that photographs as
            well as it feels.
          </p>
          <button type="button" className="circle-cta" onClick={openBooking}>
            <span>Plan your wedding wardrobe</span>
            <Arrow diagonal />
          </button>
        </div>
      </section>

      <section className="page-split" data-reveal>
        <div className="page-split__copy">
          <p className="eyebrow">Timeline</p>
          <h2>
            Begin early.
            <br /> Arrive <em>ready.</em>
          </h2>
          <p>
            Custom wedding attire typically needs 6–7 weeks; fully bespoke commissions around 10.
            Book a consultation and we’ll map cloth, fittings, and delivery to your date.
          </p>
          <Link href="/our-process" className="text-link">
            Understand the process <Arrow />
          </Link>
        </div>
        <div className="page-split__media">
          <Image
            src="/pages/wedding-1.jpg"
            alt="Groom ready for the ceremony"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>

      <PageCta
        eyebrow="Your day, your cloth"
        title={
          <>
            Dress the
            <br /> promise <em>well.</em>
          </>
        }
        image="/pages/wedding-2.jpg"
        imageAlt="Wedding suit by C E Clothier"
        button="Book a wedding consultation"
      />
    </main>
  );
}
