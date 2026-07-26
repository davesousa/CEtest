import type { Metadata } from "next";
import WeddingsPage from "@/components/pages/WeddingsPage";

export const metadata: Metadata = {
  title: "Weddings",
  description:
    "Wedding garments made from scratch for the groom and wedding party by C|E Clothier in Toronto.",
};

export default function Page() {
  return <WeddingsPage />;
}
