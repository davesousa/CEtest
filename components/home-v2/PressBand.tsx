import { pressMarks } from "./content";

/**
 * Third-party corroboration, attached to the base of the philosophy section so
 * the page's boldest claim is answered immediately. The duplicated track is the
 * marquee's second half and is hidden from assistive technology; under reduced
 * motion the clone is removed entirely and the marks lay out statically.
 */
export default function PressBand() {
  return (
    <section className="v2-press" aria-label="Press recognition">
      <p className="v2-press__framing" data-v2-reveal>
        Recognized in the pages of
      </p>
      <div className="v2-press__viewport">
        <div className="v2-press__track">
          <ul className="v2-press__set">
            {pressMarks.map((mark) => (
              <li className={`v2-press__mark v2-press__mark--${mark.slug}`} key={mark.slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mark.src} alt={mark.name} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
          <ul className="v2-press__set v2-press__set--clone" aria-hidden="true">
            {pressMarks.map((mark) => (
              <li
                className={`v2-press__mark v2-press__mark--${mark.slug}`}
                key={`clone-${mark.slug}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={mark.src} alt="" loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
