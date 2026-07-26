import type { Metadata } from "next";
import CommunityPage from "@/components/pages/CommunityPage";

export const metadata: Metadata = {
  title: "Community",
  description:
    "C|E Clothier sponsors The New Six Soccer Club, supporting youth newcomers through sport and community.",
};

export default function Page() {
  return <CommunityPage />;
}
