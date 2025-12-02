import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto mt-10 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Prijava</CardTitle>
          <CardDescription>Pristup owner i staff alatima</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-4 text-sm text-muted-foreground">
            Nemaš račun? <Link className="text-primary" href="/register">Registriraj se</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
