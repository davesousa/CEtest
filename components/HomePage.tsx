"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Our Story", href: "#story" },
  { label: "The Process", href: "#process" },
  { label: "Collections", href: "#collections" },
  { label: "Contact", href: "#contact" },
];

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

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={diagonal ? "arrow arrow--diagonal" : "arrow"}
    >
      <path d="M5 12h14M14 7l5 5-5 5" />
    </svg>
  );
}

function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`brand-mark ${dark ? "brand-mark--dark" : ""}`}>
      <Image src="/brand-mark.png" alt="C E Clothier" width={72} height={72} priority />
    </span>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroSequenceRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!reduceMotion) {
              entry.target.animate(
                [
                  { opacity: 0, transform: "translateY(2.5rem)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                {
                  duration: 900,
                  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                  fill: "none",
                },
              );
            }
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    revealItems.forEach((item) => observer.observe(item));

    const onMove = (event: PointerEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      setCursorVisible(true);
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("locked", menuOpen || bookingOpen);
    return () => document.body.classList.remove("locked");
  }, [menuOpen, bookingOpen]);

  useEffect(() => {
    const sequence = heroSequenceRef.current;
    const video = heroVideoRef.current;
    if (!sequence || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrame = 0;
    let lastFrame = performance.now();
    let metadataReady = false;
    let videoPrimed = false;
    let primePromise: Promise<void> | null = null;
    let primeTimer = 0;

    const smootherStep = (value: number) =>
      value * value * value * (value * (value * 6 - 15) + 10);

    const setVisualProgress = (progress: number) => {
      const copyExit = Math.min(1, Math.max(0, (progress - 0.42) / 0.32));
      const copyEase = 1 - Math.pow(1 - copyExit, 3);
      const focalPoint = 59 - Math.sin(progress * Math.PI) * 17;
      sequence.style.setProperty("--hero-progress", progress.toFixed(4));
      sequence.style.setProperty("--hero-copy-opacity", (1 - copyEase).toFixed(4));
      sequence.style.setProperty("--hero-copy-shift", `${(-copyEase * 3).toFixed(3)}rem`);
      sequence.style.setProperty("--hero-focal-x", `${focalPoint.toFixed(2)}%`);
    };

    const finishPriming = () => {
      if (videoPrimed) return;
      if (primeTimer) window.clearTimeout(primeTimer);
      video.pause();
      videoPrimed = true;
      metadataReady = true;
      sequence.dataset.videoReady = "true";
      updateTarget();
    };

    const schedulePrimingHandoff = () => {
      if (videoPrimed) return;
      if (primeTimer) window.clearTimeout(primeTimer);
      primeTimer = window.setTimeout(finishPriming, 120);
    };

    const primeVideo = () => {
      if (videoPrimed || primePromise) return;

      primePromise = video
        .play()
        .then(() => {
          schedulePrimingHandoff();
          if ("requestVideoFrameCallback" in video) {
            video.requestVideoFrameCallback(() => finishPriming());
          }
        })
        .catch(() => {
          primePromise = null;
          sequence.dataset.videoReady = "false";
        });
    };

    const renderFrame = (time: number) => {
      const delta = Math.min(64, time - lastFrame);
      lastFrame = time;
      const damping = 1 - Math.exp(-delta * 0.012);
      currentProgress += (targetProgress - currentProgress) * damping;

      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      }

      setVisualProgress(currentProgress);

      if (metadataReady && Number.isFinite(video.duration)) {
        const easedProgress = smootherStep(currentProgress);
        const finalFrame = Math.max(0, video.duration - 1 / 24);
        const targetTime = easedProgress * finalFrame;
        if (Math.abs(video.currentTime - targetTime) > 1 / 60) {
          video.currentTime = targetTime;
        }
      }

      if (Math.abs(targetProgress - currentProgress) > 0.0001) {
        animationFrame = requestAnimationFrame(renderFrame);
      } else {
        animationFrame = 0;
      }
    };

    const updateTarget = () => {
      const bounds = sequence.getBoundingClientRect();
      const scrollDistance = Math.max(1, bounds.height - window.innerHeight);
      targetProgress = Math.min(1, Math.max(0, -bounds.top / scrollDistance));
      primeVideo();

      if (!animationFrame) {
        lastFrame = performance.now();
        animationFrame = requestAnimationFrame(renderFrame);
      }
    };

    const onMetadata = () => {
      primeVideo();
    };

    video.addEventListener("loadedmetadata", onMetadata);
    video.addEventListener("playing", schedulePrimingHandoff);
    window.addEventListener("pointerdown", primeVideo, { passive: true });
    window.addEventListener("touchstart", primeVideo, { passive: true });
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      primeVideo();
    }
    updateTarget();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (primeTimer) window.clearTimeout(primeTimer);
      video.removeEventListener("loadedmetadata", onMetadata);
      video.removeEventListener("playing", schedulePrimingHandoff);
      window.removeEventListener("pointerdown", primeVideo);
      window.removeEventListener("touchstart", primeVideo);
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const openBooking = () => {
    setMenuOpen(false);
    setBookingOpen(true);
    setSent(false);
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <div
        ref={cursorRef}
        className={`custom-cursor ${cursorVisible ? "is-visible" : ""}`}
        aria-hidden="true"
      />

      <header className="site-header">
        <a href="#top" className="logo-link" aria-label="C E Clothier home">
          <BrandMark />
          <span className="logo-type">
            C|E <small>Clothier</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button className="header-book" onClick={openBooking}>
          Book a fitting
          <Arrow diagonal />
        </button>

        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          <i />
          <i />
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <div className="menu-grain" />
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              style={{ "--index": index } as React.CSSProperties}
            >
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <button onClick={openBooking}>Request a private fitting</button>
          <p>Toronto, Canada · By appointment</p>
        </div>
      </div>

      <div className="hero-sequence" id="top" ref={heroSequenceRef}>
        <section className="hero">
          <video
            ref={heroVideoRef}
            className="hero__video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            poster="/ce-hero-poster.webp"
            aria-label="C E Clothier model moving in a bespoke pinstripe suit"
          >
            <source src="/ce-hero-scroll.mp4" type="video/mp4" />
          </video>
          <div className="hero__shade" />
          <div className="hero__rail">
            <p>Private tailoring</p>
            <span />
            <p>Toronto · Est. 2014</p>
          </div>
          <div className="hero__content">
            <p className="eyebrow hero__eyebrow">Driven by passion, delivered with style.</p>
            <h1 aria-label="Made to be remembered">
              <span className="hero-line">
                <i>Made</i>
                <i>to</i>
                <i>be</i>
              </span>
              <span className="hero-line hero-line--indent">
                <i>remembered.</i>
              </span>
            </h1>
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
          <a href="#process" className="text-link">
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
          <a href="#services" className="circle-cta">
            <span>Explore the work</span>
            <Arrow diagonal />
          </a>
        </div>
      </section>

      <section className="recognition" aria-label="Press recognition">
        <p className="eyebrow">Worn on red carpets. Recognized by</p>
        <div className="recognition__track">
          <div>
            <span>GQ</span>
            <i>Vogue</i>
            <span>Vanity Fair</span>
            <i>US Magazine</i>
            <span>GQ</span>
            <i>Vogue</i>
            <span>Vanity Fair</span>
            <i>US Magazine</i>
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

      <footer>
        <div className="footer__top">
          <div>
            <BrandMark />
            <p>Driven by passion,<br />delivered with style.</p>
          </div>
          <form
            className="newsletter"
            onSubmit={(event) => {
              event.preventDefault();
              setNewsletterSent(true);
            }}
          >
            <label htmlFor="email">The private list</label>
            <p>No noise. Just considered updates.</p>
            {newsletterSent ? (
              <div className="newsletter__success">Welcome to the list.</div>
            ) : (
              <div className="newsletter__field">
                <input id="email" type="email" placeholder="Your email address" required />
                <button aria-label="Subscribe">
                  <Arrow />
                </button>
              </div>
            )}
          </form>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} C|E Clothier Inc.</p>
          <div>
            <a href="https://www.instagram.com/ceclothier/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="mailto:info@ceclothier.com">Email</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </footer>

      <div
        className={`booking-modal ${bookingOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <button
          className="booking-modal__backdrop"
          onClick={() => setBookingOpen(false)}
          aria-label="Close booking form"
        />
        <div className="booking-modal__panel">
          <div className="booking-modal__head">
            <BrandMark dark />
            <button onClick={() => setBookingOpen(false)}>Close ×</button>
          </div>
          {sent ? (
            <div className="booking-success">
              <p className="eyebrow">Request received</p>
              <h2>We&apos;ll be in touch.</h2>
              <p>
                Thank you. A member of the C|E team will contact you shortly to arrange your
                private consultation.
              </p>
              <button onClick={() => setBookingOpen(false)}>Return to the site</button>
            </div>
          ) : (
            <>
              <p className="eyebrow">Private consultation</p>
              <h2 id="booking-title">Begin your fitting.</h2>
              <p className="booking-modal__intro">
                Tell us a little about what you&apos;re looking for. We&apos;ll take care of the
                rest.
              </p>
              <form onSubmit={submitBooking}>
                <label>
                  <span>Your name</span>
                  <input type="text" name="name" required />
                </label>
                <label>
                  <span>Email address</span>
                  <input type="email" name="email" required />
                </label>
                <label>
                  <span>I&apos;m interested in</span>
                  <select name="interest" defaultValue="A bespoke suit">
                    <option>A bespoke suit</option>
                    <option>Evening wear</option>
                    <option>Shirting</option>
                    <option>Outerwear</option>
                    <option>Wardrobe consultation</option>
                  </select>
                </label>
                <label>
                  <span>Anything we should know? (optional)</span>
                  <textarea name="message" rows={3} />
                </label>
                <button type="submit">
                  Request a consultation <Arrow />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
