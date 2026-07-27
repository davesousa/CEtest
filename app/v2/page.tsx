import type { Metadata } from "next";
import ReactDOM from "react-dom";
import HomePageV2 from "@/components/home-v2/HomePageV2";

export const metadata: Metadata = {
  title: { absolute: "C|E Clothier | Bespoke Menswear in Toronto" },
  description:
    "C|E Clothier creates bespoke menswear in Toronto. Private, by-appointment fittings with creative director Chinedu Ezemenari.",
};

export default function Page() {
  // The hero poster is this page's LCP element and is painted by the video
  // plane rather than by next/image, so it is preloaded explicitly.
  ReactDOM.preload("/ce-hero-poster-v2.webp", { as: "image", fetchPriority: "high" });

  return <HomePageV2 />;
}
