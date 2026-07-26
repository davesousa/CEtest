import type { Metadata } from "next";
import CustomShirtsPage from "@/components/pages/CustomShirtsPage";

export const metadata: Metadata = {
  title: "Custom Shirts",
  description:
    "Hand-tailored custom shirts with hundreds of fabrics and full collar, cuff, and monogram options.",
};

export default function Page() {
  return <CustomShirtsPage />;
}
