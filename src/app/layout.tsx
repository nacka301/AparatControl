import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = "https://aparat-control.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aparthost Control",
    template: "%s | Aparthost Control",
  },
  description: "Upravljanje apartmanima, inventarom i zadacima za owner i staff timove",
  keywords: [
    "apartmani",
    "hospitality",
    "inventar",
    "zadaci",
    "property management",
    "aparthost",
  ],
  category: "business",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "hr_HR",
    url: siteUrl,
    siteName: "Aparthost Control",
    title: "Aparthost Control",
    description: "Centralizirano upravljanje apartmanima, zadacima i inventarom za vlasnike i timove.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
        width: 1600,
        height: 900,
        alt: "Moderno upravljanje apartmanima",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aparthost Control",
    description: "Digitalni operativni centar za vaše apartmane i hospitality timove.",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  creator: "Aparthost",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className={`${inter.variable} bg-background text-foreground`}>
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
