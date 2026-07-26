"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import PageCta from "@/components/layout/PageCta";
import Arrow from "@/components/ui/Arrow";

const details = [
  {
    label: "Email",
    value: "chinedu@ceclothier.com",
    href: "mailto:chinedu@ceclothier.com",
  },
  {
    label: "Phone",
    value: "416.613.7780",
    href: "tel:+14166137780",
  },
  {
    label: "Studio",
    value: "Toronto · By appointment",
    href: undefined,
  },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="page page--contact">
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s begin
            <br /> the <em>conversation.</em>
          </>
        }
        body="Private appointments in Toronto. Reach the studio by email or phone—or send an inquiry below."
        image="/pages/contact.jpg"
        imageAlt="C E Clothier Toronto studio"
        index="09"
      />

      <section className="page-contact" data-reveal>
        <div className="page-contact__details">
          <p className="eyebrow">Studio</p>
          <h2>
            Toronto,
            <br /> by <em>appointment.</em>
          </h2>
          <ul>
            {details.map((detail) => (
              <li key={detail.label}>
                <span>{detail.label}</span>
                {detail.href ? (
                  <a href={detail.href}>{detail.value}</a>
                ) : (
                  <strong>{detail.value}</strong>
                )}
              </li>
            ))}
          </ul>
          <div className="page-contact__media">
            <Image
              src="/pages/contact.jpg"
              alt="Inside the C E Clothier studio"
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
            />
          </div>
        </div>

        <div className="page-contact__form">
          <p className="eyebrow">Inquiry</p>
          {sent ? (
            <div className="page-contact__success">
              <h2>Message received.</h2>
              <p>
                Thank you. A member of the C|E team will be in touch shortly to continue the
                conversation.
              </p>
            </div>
          ) : (
            <>
              <h2>
                Tell us what
                <br /> you’re after.
              </h2>
              <form onSubmit={handleSubmit}>
                <label>
                  <span>Your name</span>
                  <input type="text" name="name" required autoComplete="name" />
                </label>
                <label>
                  <span>Email address</span>
                  <input type="email" name="email" required autoComplete="email" />
                </label>
                <label>
                  <span>Phone (optional)</span>
                  <input type="tel" name="phone" autoComplete="tel" />
                </label>
                <label>
                  <span>I’m interested in</span>
                  <select name="interest" defaultValue="A private fitting">
                    <option>A private fitting</option>
                    <option>A bespoke suit</option>
                    <option>Custom shirts</option>
                    <option>Outerwear</option>
                    <option>Wedding attire</option>
                    <option>Gift card</option>
                    <option>Press / collaboration</option>
                  </select>
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows={4} required />
                </label>
                <button type="submit">
                  Send inquiry <Arrow />
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      <PageCta
        eyebrow="Prefer to book directly?"
        title={
          <>
            Reserve your
            <br /> private <em>fitting.</em>
          </>
        }
        image="/pages/contact.jpg"
        imageAlt="C E Clothier appointment"
      />
    </main>
  );
}
