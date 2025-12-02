"use client";

import { useTransition } from "react";
import { logoutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
    >
      {isPending ? "Odjava..." : "Odjava"}
    </Button>
  );
}
