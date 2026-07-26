import type { Metadata } from "next";
import MediaPage from "@/components/pages/MediaPage";

export const metadata: Metadata = {
  title: "Media",
  description:
    "C|E Clothier in GQ, Vogue, Vanity Fair, and Us Weekly—plus runway, events, and editorial storytelling.",
};

export default function Page() {
  return <MediaPage />;
}
