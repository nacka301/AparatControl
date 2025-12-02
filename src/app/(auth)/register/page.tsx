import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Registracija</CardTitle>
          <CardDescription>Kreiraj owner ili staff korisnika</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
          <p className="mt-4 text-sm text-muted-foreground">
            Već imaš račun? <Link className="text-primary" href="/login">Prijavi se</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
