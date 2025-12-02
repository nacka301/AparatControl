import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import SupportCallout from "@/components/auth/SupportCallout";
import SeoJsonLd from "@/components/SeoJsonLd";

const heroImage = "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1400&q=80";

export const metadata: Metadata = {
  title: "Prijava",
  description: "Prijavi se u Aparthost Control kako bi upravljao apartmanima, zadacima i inventarom.",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Prijava | Aparthost Control",
    url: "/login",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Aparthost Control",
  applicationCategory: "Hospitality",
  operatingSystem: "Web",
  url: "https://aparat-control.vercel.app/login",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Pristup za owner i staff članove aparthost tima",
  },
  potentialAction: {
    "@type": "LoginAction",
    target: "https://aparat-control.vercel.app/login",
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 lg:grid lg:grid-cols-[1fr_1.1fr]">
      <SeoJsonLd id="login-ld" data={structuredData} />
      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Dobrodošao natrag</p>
            <h1 className="text-3xl font-semibold tracking-tight">Prijavi se</h1>
            <p className="text-balance text-muted-foreground">
              Pristupi aparthost kontrolnoj ploči za owner i staff timove.
            </p>
          </div>

          <LoginForm />

          <div className="space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              Nemaš račun? {" "}
              <Link className="font-medium text-foreground underline-offset-4 hover:underline" href="/register">
                Zatraži pristup
              </Link>
            </p>
            <SupportCallout />
          </div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src={heroImage}
          alt="Moderan interijer apartmana"
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-white">
          <blockquote className="space-y-4 text-lg">
            <p className="font-medium leading-relaxed">
              “Ovaj sustav nam je skratio koordinaciju čišćenja i inventara za više od 10 sati tjedno.”
            </p>
            <footer className="text-sm text-white/70">Ivan I., vlasnik apartmana u Zadru</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
