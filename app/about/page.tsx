import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in 2014 by Chinedu Ezemenari, C|E Clothier creates luxury custom suits, shirts, and overcoats in Toronto.",
};

export default function Page() {
  return <AboutPage />;
}
