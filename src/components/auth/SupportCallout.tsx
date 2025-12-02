import { Headphones } from "lucide-react";
import Link from "next/link";

const SUPPORT_EMAIL = "support@aparthost.hr";

export default function SupportCallout() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="rounded-full bg-primary/10 p-2 text-primary">
          <Headphones className="h-5 w-5" aria-hidden />
        </span>
        <div className="space-y-1 text-sm">
          <p className="font-medium text-foreground">Trebaš pomoć s pristupom?</p>
          <p className="text-muted-foreground">
            Vlasnik ili voditelj može ti odmah aktivirati račun. Ako zapneš, javi nam se i odradit ćemo provjeru za
            par minuta.
          </p>
          <Link
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center text-primary underline-offset-4 hover:underline"
          >
            Piši na {SUPPORT_EMAIL}
          </Link>
        </div>
      </div>
    </div>
  );
}
