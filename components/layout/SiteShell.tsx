"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { BookingProvider, useBooking } from "@/lib/booking-context";
import { footerNav, mobileNav, primaryNav } from "@/lib/nav";
import Arrow from "@/components/ui/Arrow";
import BrandMark from "@/components/ui/BrandMark";

function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { openBooking, closeBooking, bookingOpen, sent, submitBooking } = useBooking();
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", menuOpen);
    return () => document.body.classList.remove("menu-locked");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const handleOpenBooking = () => {
    closeMenu();
    openBooking();
  };

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${cursorVisible ? "is-visible" : ""}`}
        aria-hidden="true"
      />

      <header className={`site-header ${pathname === "/" ? "site-header--home" : "site-header--page"}`}>
        <Link href="/" className="logo-link" aria-label="C E Clothier home">
          <BrandMark />
          <span className="logo-type">
            C|E <small>Clothier</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={pathname === item.href ? "is-active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="header-book" onClick={handleOpenBooking}>
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
          {mobileNav.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={closeMenu}
              style={{ "--index": index } as React.CSSProperties}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <button onClick={handleOpenBooking}>Request a private fitting</button>
          <p>Toronto, Canada · By appointment</p>
        </div>
      </div>

      {children}

      <footer>
        <div className="footer__top">
          <div>
            <BrandMark />
            <p>
              Driven by passion,
              <br />
              delivered with style.
            </p>
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
        <div className="footer__links" data-reveal>
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} C|E Clothier Inc.</p>
          <div>
            <a href="https://www.instagram.com/ceclothier/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="mailto:chinedu@ceclothier.com">Email</a>
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
          onClick={closeBooking}
          aria-label="Close booking form"
        />
        <div className="booking-modal__panel">
          <div className="booking-modal__head">
            <BrandMark dark />
            <button onClick={closeBooking}>Close ×</button>
          </div>
          {sent ? (
            <div className="booking-success">
              <p className="eyebrow">Request received</p>
              <h2>We&apos;ll be in touch.</h2>
              <p>
                Thank you. A member of the C|E team will contact you shortly to arrange your
                private consultation.
              </p>
              <button onClick={closeBooking}>Return to the site</button>
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
                    <option>Wedding attire</option>
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
    </>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      <SiteChrome>{children}</SiteChrome>
    </BookingProvider>
  );
}
