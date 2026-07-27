import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/ui/Arrow";
import SpineEyebrow from "./SpineEyebrow";

export default function EditorialSection() {
  return (
    <section
      className="v2-editorial v2-field--paper"
      id="collections"
      aria-labelledby="v2-editorial-title"
    >
      <figure className="v2-editorial__frame" data-v2-reveal>
        <div className="v2-editorial__plane" data-v2-parallax>
          <Image
            src="/ce-collection.jpg"
            alt="A C|E Clothier client laughing in a textured check jacket and knitted tie."
            fill
            sizes="(max-width: 1049px) 100vw, 57vw"
          />
        </div>
        <figcaption>Portraits in character — Vol. I</figcaption>
      </figure>

      <div className="v2-editorial__copy">
        <div data-v2-reveal>
          <SpineEyebrow index="03" label="The collection" />
        </div>
        {/* The spaces around each break are load-bearing: JSX drops the newline
            between a text node and a tag, and the heading's text content is what
            assistive tech reads out. */}
        <h2 id="v2-editorial-title" data-v2-lines>
          The quiet{" "}
          <br />
          <em>power</em> of{" "}
          <br />
          presence.
        </h2>
        <p className="v2-editorial__body" data-v2-reveal>
          Updated classics. Modern interpretations. Garments created not to follow an occasion,
          but to define it.
        </p>
        <Link href="/custom-suits" className="v2-circle-cta" data-v2-reveal>
          <span>Explore the work</span>
          <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
