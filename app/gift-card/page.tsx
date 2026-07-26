import type { Metadata } from "next";
import GiftCardPage from "@/components/pages/GiftCardPage";

export const metadata: Metadata = {
  title: "Gift Card",
  description:
    "Give a flexible C|E Clothier gift toward a suit, jacket, shirt, or bespoke experience.",
};

export default function Page() {
  return <GiftCardPage />;
}
