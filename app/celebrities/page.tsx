import type { Metadata } from "next";
import CelebritiesPage from "@/components/pages/CelebritiesPage";

export const metadata: Metadata = {
  title: "Celebrities",
  description:
    "C|E Clothier clientèle—from Emmy carpets to premiere nights—including looks noted by GQ, Vogue, and Vanity Fair.",
};

export default function Page() {
  return <CelebritiesPage />;
}
