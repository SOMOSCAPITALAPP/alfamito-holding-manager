import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://alfamito-holding-manager.vercel.app",
  ),
  title: "Alfamito Holding Manager",
  description: "Coffre-fort privé et tableau de bord bilingue pour Alfamito Sarl.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Alfamito Holding Manager",
    description:
      "Accès privé aux documents officiels, échéances et indicateurs de la holding.",
    images: [
      {
        url: "/alfamito-access-share.svg",
        width: 1200,
        height: 630,
        alt: "Alfamito Holding Manager access card",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
