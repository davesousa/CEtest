"use client";

import Image from "next/image";
import { useBooking } from "@/lib/booking-context";
import Arrow from "@/components/ui/Arrow";


const services = [
  {
    number: "01",
    title: "Bespoke Suits",
    text: "An individual pattern, cut and constructed exclusively for your frame.",
  },
  {
    number: "02",
    title: "Evening",
    text: "Black tie reinterpreted with confidence, restraint, and considered detail.",
  },
  {
    number: "03",
    title: "Shirting",
    text: "Perfect proportion, exceptional cloth, and a collar made to sit exactly right.",
  },
  {
    number: "04",
    title: "Outerwear",
    text: "Purposeful silhouettes designed to command a room—and a Toronto winter.",
  },
];

const pressLogos = [
  { name: "GQ", src: "/press/gq.svg", className: "gq" },
  { name: "Vogue", src: "/press/vogue.svg", className: "vogue" },
  { name: "Vanity Fair", src: "/press/vanity-fair.svg", className: "vanity" },
  { name: "Us Weekly", src: "/press/us-weekly.png", className: "us-weekly" },
];

const HERO_SCROLL_SCRIPT = String.raw`
(() => {
  if (window.__ceHeroScrollBound) return;
  window.__ceHeroScrollBound = true;

  const init = () => {
    const sequence = document.querySelector("[data-hero-sequence]");
    const video = document.getElementById("ce-hero-video");
    if (!sequence || !video) {
      window.setTimeout(init, 50);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    let target = 0;
    let current = 0;
    let frame = 0;
    let lastTime = performance.now();
    let ready = false;
    let priming = false;
    let handoffTimer = 0;

    const focalTrack = [
      [0, 53],
      [0.2, 52],
      [0.4, 51],
      [0.6, 50],
      [0.8, 49],
      [1, 48],
    ];

    const trackedFocalPoint = (progress) => {
      for (let index = 1; index < focalTrack.length; index += 1) {
        const previous = focalTrack[index - 1];
        const next = focalTrack[index];
        if (progress <= next[0]) {
          const localProgress = (progress - previous[0]) / (next[0] - previous[0]);
          const easedProgress = localProgress * localProgress * (3 - 2 * localProgress);
          return previous[1] + (next[1] - previous[1]) * easedProgress;
        }
      }
      return focalTrack[focalTrack.length - 1][1];
    };

    const rangeProgress = (progress, start, end) =>
      Math.min(1, Math.max(0, (progress - start) / (end - start)));

    const smoothProgress = (progress) => progress * progress * (3 - 2 * progress);

    const setVisuals = (progress) => {
      const primaryExit = smoothProgress(rangeProgress(progress, 0.24, 0.43));
      const secondaryLead = smoothProgress(rangeProgress(progress, 0.28, 0.43));
      const secondaryFollow = smoothProgress(rangeProgress(progress, 0.34, 0.49));
      const secondaryExit = smoothProgress(rangeProgress(progress, 0.92, 1));
      const bottomExit = smoothProgress(rangeProgress(progress, 0.95, 1));
      const focalPoint = trackedFocalPoint(progress);

      sequence.style.setProperty("--hero-progress", progress.toFixed(4));
      sequence.style.setProperty("--hero-focal-x", focalPoint.toFixed(2) + "%");
      sequence.style.setProperty("--hero-primary-opacity", (1 - primaryExit).toFixed(4));
      sequence.style.setProperty("--hero-primary-y", (-primaryExit * 2.5).toFixed(3) + "rem");
      sequence.style.setProperty("--hero-primary-blur", (primaryExit * 8).toFixed(2) + "px");
      sequence.style.setProperty(
        "--hero-secondary-opacity",
        (1 - secondaryExit).toFixed(4),
      );
      sequence.style.setProperty("--hero-secondary-blur", ((1 - secondaryLead) * 8 + secondaryExit * 4).toFixed(2) + "px");
      sequence.style.setProperty(
        "--hero-secondary-eyebrow-opacity",
        (secondaryLead * (1 - secondaryExit)).toFixed(4),
      );
      sequence.style.setProperty(
        "--hero-secondary-one-opacity",
        (secondaryLead * (1 - secondaryExit)).toFixed(4),
      );
      sequence.style.setProperty(
        "--hero-secondary-two-opacity",
        (secondaryFollow * (1 - secondaryExit)).toFixed(4),
      );
      sequence.style.setProperty(
        "--hero-secondary-one-y",
        ((1 - secondaryLead) * 3 - secondaryExit * 1.5).toFixed(3) + "rem",
      );
      sequence.style.setProperty(
        "--hero-secondary-two-y",
        ((1 - secondaryFollow) * 3.75 - secondaryExit * 1.5).toFixed(3) + "rem",
      );
      sequence.style.setProperty("--hero-bottom-opacity", (1 - bottomExit).toFixed(4));
    };

    const render = (time) => {
      const delta = Math.min(64, time - lastTime);
      lastTime = time;
      current += (target - current) * (1 - Math.exp(-delta * 0.0095));

      if (Math.abs(target - current) < 0.0001) current = target;
      setVisuals(current);

      if (ready && Number.isFinite(video.duration)) {
        const finalFrame = Math.max(0, video.duration - 1 / 24);
        const desiredTime = current * finalFrame;
        if (Math.abs(video.currentTime - desiredTime) > 1 / 60) {
          video.currentTime = desiredTime;
        }
      }

      if (Math.abs(target - current) > 0.0001) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const update = () => {
      const bounds = sequence.getBoundingClientRect();
      const distance = Math.max(1, bounds.height - window.innerHeight);
      target = Math.min(1, Math.max(0, -bounds.top / distance));
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(render);
      }
    };

    const handoffToScroll = () => {
      if (ready) return;
      window.clearTimeout(handoffTimer);
      video.pause();
      ready = true;
      priming = false;
      sequence.dataset.videoReady = "true";
      update();
    };

    const prime = () => {
      if (ready || priming) return;
      priming = true;
      video.muted = true;
      video.playsInline = true;

      const playback = video.play();
      handoffTimer = window.setTimeout(handoffToScroll, 160);
      if (playback) {
        playback.catch(() => {
          sequence.dataset.videoReady = "pending";
        });
      }
    };

    const unlockOnTouch = () => {
      if (!ready) {
        prime();
        return;
      }
      const playback = video.play();
      window.setTimeout(() => {
        video.pause();
        update();
      }, 80);
      if (playback) playback.catch(() => {});
    };

    video.pause();
    video.addEventListener("loadedmetadata", prime, { once: true });
    window.addEventListener("pointerdown", unlockOnTouch, { passive: true, once: true });
    window.addEventListener("touchstart", unlockOnTouch, { passive: true, once: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    if (video.readyState >= 1) prime();
    update();
  };

  requestAnimationFrame(init);
})();
`;

export default function HomePage() {
  const { openBooking } = useBooking();

  return (
    <main>
      <div className="hero-sequence" id="top" data-hero-sequence>
        <section className="hero">
          <video
            id="ce-hero-video"
            className="hero__video"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            poster="/ce-hero-poster-v2.webp"
            aria-label="C E Clothier model moving in a bespoke pinstripe suit"
          >
            <source src="/ce-hero-scroll-v2.mp4" type="video/mp4" />
          </video>
          <script
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: HERO_SCROLL_SCRIPT }}
          />
          <div className="hero__shade" />
          <div className="hero__rail">
            <p>Private tailoring</p>
            <span />
            <p>Toronto · Est. 2014</p>
          </div>
          <div className="hero__content">
            <div className="hero__stages">
              <div className="hero-stage hero-stage--primary">
                <p className="eyebrow hero__eyebrow">C|E Clothier · Toronto</p>
                <h1 className="hero-tagline">
                  <span className="hero-tagline__line">
                    Driven by <em>passion,</em>
                  </span>
                  <span className="hero-tagline__line">
                    delivered with <em>style.</em>
                  </span>
                </h1>
              </div>
              <div className="hero-stage hero-stage--secondary">
                <p className="eyebrow hero__eyebrow">The C|E standard</p>
                <h2 aria-label="Made to be remembered">
                  <span className="hero-line">
                    <i>Made</i>
                    <i>to</i>
                    <i>be</i>
                  </span>
                  <span className="hero-line hero-line--indent">
                    <i>remembered.</i>
                  </span>
                </h2>
              </div>
            </div>
            <div className="hero__bottom">
              <p>
                Bespoke garments for men who understand that style is more than what you wear.
              </p>
              <button
                className="round-link"
                onClick={openBooking}
                aria-label="Book a private fitting"
              >
                <Arrow diagonal />
              </button>
            </div>
          </div>
          <a href="#story" className="scroll-cue" aria-label="Scroll to our story">
            <span>Scroll to play</span>
            <i>
              <b />
            </i>
          </a>
        </section>
      </div>

      <section className="manifesto" id="story">
        <div className="manifesto__meta" data-reveal>
          <p className="eyebrow">Our philosophy</p>
          <p>Toronto / Canada</p>
        </div>
        <div className="manifesto__statement" data-reveal>
          <p>
            Clothes should say <em>who you are</em>
            <br /> before you do.
          </p>
        </div>
        <div className="manifesto__copy" data-reveal>
          <span className="section-index">01</span>
          <p>
            Founded by creative director Chinedu Ezemenari, C|E Clothier creates garments that
            balance timeless codes with a distinctly modern confidence.
          </p>
          <a href="/our-process" className="text-link">
            Discover our approach <Arrow />
          </a>
        </div>
      </section>

      <section className="craft" id="process">
        <div className="craft__heading" data-reveal>
          <p className="eyebrow">The C|E standard</p>
          <h2>Built around you.</h2>
          <p>
            No templates. No shortcuts. Every garment begins with a conversation and ends with
            something unmistakably yours.
          </p>
        </div>

        <div className="craft__grid">
          <article className="craft-card craft-card--tall" data-reveal>
            <div className="craft-card__image">
              <Image
                src="/ce-detail-3.jpg"
                alt="A hand-basted C E Clothier suit during fitting"
                fill
                sizes="(max-width: 700px) 92vw, 35vw"
              />
              <span>01 / 03</span>
            </div>
            <div className="craft-card__copy">
              <h3>Measured, not sized</h3>
              <p>
                We study posture, proportion, and movement to draft an individual pattern around
                your body.
              </p>
            </div>
          </article>

          <article className="craft-card craft-card--wide" data-reveal>
            <div className="craft-card__image">
              <Image
                src="/ce-detail-2.jpg"
                alt="C E Clothier lining and Vitale Barberis Canonico cloth label"
                fill
                sizes="(max-width: 700px) 92vw, 48vw"
              />
              <span>02 / 03</span>
            </div>
            <div className="craft-card__copy">
              <h3>Cloth with character</h3>
              <p>
                A library of over 1,000 fabrics from the finest mills in England, Italy, and
                beyond.
              </p>
            </div>
          </article>

          <article className="craft-card craft-card--detail" data-reveal>
            <div className="detail-graphic" aria-hidden="true">
              <span>C</span>
              <i />
              <span>E</span>
            </div>
            <div className="craft-card__copy">
              <h3>Details, considered</h3>
              <p>
                Lapel, lining, button, stitch—every choice is an opportunity to tell your story.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="editorial" id="collections">
        <div className="editorial__image" data-reveal>
          <Image
            src="/ce-collection.jpg"
            alt="C E Clothier client in a double-breasted checked suit"
            fill
            sizes="(max-width: 800px) 100vw, 58vw"
          />
          <p>Portraits in character — Vol. I</p>
        </div>
        <div className="editorial__copy" data-reveal>
          <p className="eyebrow">The collection</p>
          <h2>
            The quiet
            <br />
            <em>power</em> of
            <br />
            presence.
          </h2>
          <p className="editorial__body">
            Updated classics. Modern interpretations. Garments created not to follow an occasion,
            but to define it.
          </p>
          <a href="/custom-suits" className="circle-cta">
            <span>Explore the work</span>
            <Arrow diagonal />
          </a>
        </div>
      </section>

      <section className="recognition" aria-label="Press recognition">
        <p className="eyebrow">Worn on red carpets. Recognized by</p>
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

      <section className="services" id="services">
        <div className="services__intro" data-reveal>
          <div>
            <p className="eyebrow">Made for the moment</p>
            <h2>A complete wardrobe,<br />one considered piece at a time.</h2>
          </div>
          <p>Swipe to explore</p>
        </div>
        <div className="services__list">
          {services.map((service) => (
            <article key={service.title} data-reveal>
              <span>{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <button onClick={openBooking} aria-label={`Enquire about ${service.title}`}>
                <Arrow diagonal />
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="fitting" id="contact">
        <Image
          src="/editorial.jpg"
          alt="A tailored tuxedo in the C E Clothier studio"
          fill
          sizes="100vw"
        />
        <div className="fitting__overlay" />
        <div className="fitting__content" data-reveal>
          <p className="eyebrow">Your next chapter</p>
          <h2>
            Let&apos;s make
            <br /> something <em>personal.</em>
          </h2>
          <button onClick={openBooking} className="light-button">
            Book your private fitting <Arrow diagonal />
          </button>
        </div>
        <div className="fitting__details">
          <p>Toronto, Ontario</p>
          <p>Private studio · By appointment</p>
        </div>
      </section>

    </main>
  );
}
