"use client";

import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import Arrow from "@/components/ui/Arrow";

export default function CommunityPage() {
  return (
    <main className="page page--community">
      <PageHero
        eyebrow="Community"
        title={
          <>
            Style with
            <br /> a wider <em>purpose.</em>
          </>
        }
        body="C|E Clothier sponsors The New Six Soccer Club—supporting youth newcomers through sport, belonging, and opportunity."
        image="/pages/community.jpg"
        imageAlt="C E Clothier community sponsorship"
        index="11"
      />

      <section className="manifesto" data-reveal>
        <div className="manifesto__meta">
          <p className="eyebrow">Sponsorship</p>
          <p>Toronto</p>
        </div>
        <div className="manifesto__statement">
          <p>
            Investing in youth
            <br /> who are building a <em>new home.</em>
          </p>
        </div>
        <div className="manifesto__copy">
          <span className="section-index">02</span>
          <p>
            Through our partnership with The New Six Soccer Club, we support programs that engage
            newcomer youth—creating space for teamwork, confidence, and community on and off the
            pitch.
          </p>
          <a
            href="https://thenewsix.ca"
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Visit thenewsix.ca <Arrow />
          </a>
        </div>
      </section>

      <section className="editorial">
        <div className="editorial__image" data-reveal>
          <Image
            src="/pages/community.jpg"
            alt="The New Six Soccer Club community"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <p>The New Six Soccer Club</p>
        </div>
        <div className="editorial__copy" data-reveal>
          <p className="eyebrow">Why it matters</p>
          <h2>
            Belonging is
            <br /> a form of <em>style.</em>
          </h2>
          <p className="editorial__body">
            Craft is local. So is responsibility. We believe a Toronto house should help strengthen
            the city that wears it—starting with young people finding their footing.
          </p>
          <a
            href="https://thenewsix.ca"
            className="circle-cta"
            target="_blank"
            rel="noreferrer"
          >
            <span>Learn about The New Six</span>
            <Arrow diagonal />
          </a>
        </div>
      </section>

      <section className="page-split" data-reveal>
        <div className="page-split__copy">
          <p className="eyebrow">Get involved</p>
          <h2>
            Partnerships
            <br /> with <em>intention.</em>
          </h2>
          <p>
            For community collaborations or to learn more about how C|E Clothier supports The New
            Six, reach the studio. We welcome conversations rooted in impact.
          </p>
          <a href="mailto:chinedu@ceclothier.com" className="text-link">
            Email the studio <Arrow />
          </a>
        </div>
        <div className="page-split__media">
          <Image
            src="/editorial.jpg"
            alt="C E Clothier studio craftsmanship"
            fill
            sizes="(max-width: 800px) 100vw, 50vw"
          />
        </div>
      </section>

      <PageCta
        eyebrow="Wear with purpose"
        title={
          <>
            Look sharp.
            <br /> Lift <em>others.</em>
          </>
        }
        image="/pages/community.jpg"
        imageAlt="Community partnership"
      />
    </main>
  );
}
