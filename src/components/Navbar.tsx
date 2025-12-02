import Link from "next/link";
import { roleHome } from "@/lib/roles";
import { getProfile } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";

const navLinks = [
  { href: "/dashboard", label: "Owner dashboard", roles: ["owner"] },
  { href: "/staff", label: "Staff dashboard", roles: ["owner", "staff"] },
];

export default async function Navbar() {
  const profile = await getProfile();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={profile ? roleHome[profile.role] : "/"} className="text-lg font-semibold tracking-tight">
          Aparthost Control
        </Link>

        <nav className="flex items-center gap-3 text-sm font-medium">
          {profile ? (
            <>
              {navLinks
                .filter((link) => link.roles.includes(profile.role))
                .map((link) => (
                  <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-foreground">
                    {link.label}
                  </Link>
                ))}
              <span className="hidden text-muted-foreground sm:inline">{profile.full_name}</span>
              <LogoutButton />
            </>
          ) : (
            <div className="flex gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Prijava</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Registracija</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
