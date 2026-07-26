import type { Metadata } from "next";
import CustomSuitsPage from "@/components/pages/CustomSuitsPage";

export const metadata: Metadata = {
  title: "Custom Suits",
  description:
    "Individual patterns, canvassed construction, and 1,000+ fabrics. Custom suits by C|E Clothier in Toronto.",
};

export default function Page() {
  return <CustomSuitsPage />;
}
