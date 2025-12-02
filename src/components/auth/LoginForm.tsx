"use client";

import { useFormState } from "react-dom";
import { loginAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ActionState } from "@/lib/types";

const initialState: ActionState = {};

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <form className="space-y-4" action={formAction}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="owner@apartmani.hr" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Lozinka</Label>
        <Input id="password" name="password" type="password" minLength={6} required />
      </div>

      {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}

      <Button className="w-full" type="submit">
        Prijavi se
      </Button>
    </form>
  );
}
