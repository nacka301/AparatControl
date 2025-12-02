"use client";

import { useFormState } from "react-dom";
import { registerAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/lib/types";

const initialState: ActionState = {};

export default function RegisterForm() {
  const [state, formAction] = useFormState(registerAction, initialState);

  return (
    <form className="space-y-4" action={formAction}>
      <div className="space-y-2">
        <Label htmlFor="fullName">Ime i prezime</Label>
        <Input id="fullName" name="fullName" placeholder="Ana Apartmani" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Uloga</Label>
        <select
          id="role"
          name="role"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          defaultValue="owner"
        >
          <option value="owner">Owner</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Lozinka</Label>
        <Input id="password" name="password" type="password" minLength={6} required />
      </div>

      {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}

      <Button className="w-full" type="submit">
        Kreiraj račun
      </Button>
    </form>
  );
}
