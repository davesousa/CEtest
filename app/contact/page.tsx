import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact C|E Clothier in Toronto—chinedu@ceclothier.com · 416.613.7780 · by appointment.",
};

export default function Page() {
  return <ContactPage />;
}
