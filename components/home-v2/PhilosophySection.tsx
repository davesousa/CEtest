import Link from "next/link";
import Arrow from "@/components/ui/Arrow";
import PressBand from "./PressBand";
import SpineEyebrow from "./SpineEyebrow";

export default function PhilosophySection() {
  return (
    <section className="v2-philosophy v2-field--paper" id="story" aria-labelledby="v2-philosophy-title">
      <div className="v2-philosophy__meta" data-v2-reveal>
        <SpineEyebrow index="01" label="Our philosophy" />
        <p className="v2-philosophy__place">Toronto / Canada</p>
      </div>

      <div className="v2-philosophy__statement">
        <h2 id="v2-philosophy-title" data-v2-lines>
          Clothes should say <em>who you are</em>
          <br /> before you do.
        </h2>
      </div>

      <div className="v2-philosophy__copy">
        <p data-v2-reveal>
          Founded by creative director Chinedu Ezemenari, C|E Clothier creates garments that
          balance timeless codes with a distinctly modern confidence.
        </p>
        <Link href="/our-process" className="v2-text-link" data-v2-reveal>
          Discover our approach <Arrow />
        </Link>
      </div>

      <PressBand />
    </section>
  );
}
