export interface PressMark {
  name: string;
  src: string;
  slug: string;
}

export interface CraftBeat {
  counter: string;
  title: string;
  body: string;
  image: {
    src: string;
    alt: string;
    sizes: string;
  };
}

export interface Discipline {
  index: string;
  name: string;
  line: string;
  href: string;
  accessibleName: string;
  preview: {
    src: string;
    alt: string;
  };
}

export const pressMarks: PressMark[] = [
  { name: "GQ", src: "/press/gq.svg", slug: "gq" },
  { name: "Vogue", src: "/press/vogue.svg", slug: "vogue" },
  { name: "Vanity Fair", src: "/press/vanity-fair.svg", slug: "vanity" },
  { name: "Us Weekly", src: "/press/us-weekly.png", slug: "us-weekly" },
];

export const craftBeats: CraftBeat[] = [
  {
    counter: "01 / 03",
    title: "Measured, not sized",
    body: "We study posture, proportion, and movement to draft an individual pattern around your body.",
    image: {
      src: "/ce-detail-3.jpg",
      alt: "A hand-basted C|E Clothier suit during a fitting.",
      sizes: "(max-width: 699px) 100vw, (max-width: 1049px) 46vw, 32vw",
    },
  },
  {
    counter: "02 / 03",
    title: "Cloth with character",
    body: "A library of more than 1,000 fabrics from the finest mills in England, Italy, and beyond.",
    image: {
      src: "/ce-detail-2.jpg",
      alt: "C|E Clothier lining beside a Vitale Barberis Canonico cloth label.",
      sizes: "(max-width: 699px) 86vw, (max-width: 1049px) 46vw, 42vw",
    },
  },
  {
    counter: "03 / 03",
    title: "Details, considered",
    body: "Lapel, lining, button, stitch—every choice is an opportunity to tell your story.",
    image: {
      src: "/pages/process-4.jpg",
      alt: "A hand-drawn C|E Clothier tuxedo concept, annotated with lapel slope and shoulder pitch.",
      sizes: "(max-width: 699px) 76vw, (max-width: 1049px) 40vw, 30vw",
    },
  },
];

export const disciplines: Discipline[] = [
  {
    index: "01",
    name: "Bespoke Suits",
    line: "An individual pattern, cut and constructed exclusively for your frame.",
    href: "/custom-suits",
    accessibleName:
      "Bespoke Suits — An individual pattern, cut and constructed exclusively for your frame.",
    preview: {
      src: "/ce-collection.jpg",
      alt: "A C|E Clothier client wearing a tailored suit.",
    },
  },
  {
    index: "02",
    name: "Evening",
    line: "Black tie reinterpreted with confidence, restraint, and considered detail.",
    href: "/weddings",
    accessibleName:
      "Evening — Black tie reinterpreted with confidence, restraint, and considered detail.",
    preview: {
      src: "/pages/wedding-1.jpg",
      alt: "A C|E Clothier client in formal eveningwear.",
    },
  },
  {
    index: "03",
    name: "Shirting",
    line: "Perfect proportion, exceptional cloth, and a collar made to sit exactly right.",
    href: "/custom-shirts",
    accessibleName:
      "Shirting — Perfect proportion, exceptional cloth, and a collar made to sit exactly right.",
    preview: {
      src: "/pages/shirts.jpg",
      alt: "A C|E Clothier custom shirt with a precisely fitted collar.",
    },
  },
  {
    index: "04",
    name: "Outerwear",
    line: "Purposeful silhouettes designed to command a room—and a Toronto winter.",
    href: "/custom-outerwear",
    accessibleName:
      "Outerwear — Purposeful silhouettes designed to command a room—and a Toronto winter.",
    preview: {
      src: "/pages/outerwear.jpg",
      alt: "A C|E Clothier client wearing tailored outerwear.",
    },
  },
];
