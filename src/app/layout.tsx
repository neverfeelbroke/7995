import type { Metadata } from "next";
import { Familjen_Grotesk, Poppins } from "next/font/google";
import "./globals.css";

const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-familjen-grotesk",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['600']
});

export const metadata: Metadata = {
  title: "7995.io | Exclusive iGaming Partner",
  description: "Exclusive technology and investment partnership in the iGaming industry. We align capital, strategy, and execution to build long-term market leaders.",
  openGraph: {
    title: "7995.io | Exclusive iGaming Partner",
    description: "Exclusive technology and investment partnership in the iGaming industry. We align capital, strategy, and execution to build long-term market leaders.",
    url: "https://7995.io/",
    siteName: "7995.io",
    images: [
      {
        url: "https://7995.io/og.png",
        width: 720,
        height: 378,
        alt: "7995.io OG Image",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${familjenGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
