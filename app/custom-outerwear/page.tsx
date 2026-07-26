import type { Metadata } from "next";
import OuterwearPage from "@/components/pages/OuterwearPage";

export const metadata: Metadata = {
  title: "Custom Outerwear",
  description:
    "Overcoats made from scratch for Toronto winters and occasion wear by C|E Clothier.",
};

export default function Page() {
  return <OuterwearPage />;
}
