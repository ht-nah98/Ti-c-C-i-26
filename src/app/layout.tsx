import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Lora,
  Ms_Madi,
  The_Nautigal,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const msMadi = Ms_Madi({
  variable: "--font-ms-madi",
  subsets: ["latin"],
  weight: "400",
});

const theNautigal = The_Nautigal({
  variable: "--font-nautigal",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Mẫu Thiệp Minimalism Nâu - Thiệp Cưới Tối Giản Ấm Áp",
  description:
    "Thiệp cưới online phong cách minimalism nâu — ấm áp, tối giản, trang nhã.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${ebGaramond.variable} ${lora.variable} ${msMadi.variable} ${theNautigal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
