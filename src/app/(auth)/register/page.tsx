import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";
import SupportCallout from "@/components/auth/SupportCallout";
import SeoJsonLd from "@/components/SeoJsonLd";

const heroImage = "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80";

export const metadata: Metadata = {
  title: "Registracija",
  description: "Kreiraj Aparthost Control račun za owner ili staff tim članove.",
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    title: "Registracija | Aparthost Control",
    url: "/register",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RegisterAction",
  name: "Registracija aparthost članova",
  target: {
    "@type": "EntryPoint",
    urlTemplate: "https://aparat-control.vercel.app/register",
    actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
  },
  result: {
    "@type": "Organization",
    name: "Aparthost Control",
  },
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 lg:grid lg:grid-cols-[1.1fr_1fr]">
      <SeoJsonLd id="register-ld" data={structuredData} />
      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src={heroImage}
          alt="Elegantno uređeni dnevni boravak"
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 55vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">Hospitality automation</p>
          <h2 className="mt-2 text-3xl font-semibold leading-tight">
            Kreiraj tim koji reagira prije nego što gost primijeti problem.
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Stvori račun</p>
            <h1 className="text-3xl font-semibold tracking-tight">Registracija</h1>
            <p className="text-balance text-muted-foreground">
              Postavi owner ili staff pristup za svoj aparthost tim u par minuta.
            </p>
          </div>

          <RegisterForm />

          <div className="space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              Već imaš račun? {" "}
              <Link className="font-medium text-foreground underline-offset-4 hover:underline" href="/login">
                Prijavi se
              </Link>
            </p>
            <SupportCallout />
          </div>
        </div>
      </div>
    </div>
  );
}
