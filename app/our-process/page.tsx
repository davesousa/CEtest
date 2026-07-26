import type { Metadata } from "next";
import ProcessPage from "@/components/pages/ProcessPage";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "From fitting appointment to commission—how C|E Clothier builds custom and bespoke garments in 6–10 weeks.",
};

export default function Page() {
  return <ProcessPage />;
}
