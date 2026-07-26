import Image from "next/image";

export default function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`brand-mark ${dark ? "brand-mark--dark" : ""}`}>
      <Image src="/brand-mark.png" alt="C E Clothier" width={72} height={72} priority />
    </span>
  );
}
