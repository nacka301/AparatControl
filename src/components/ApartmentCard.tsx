import Image from "next/image";
import type { Apartment } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Props = {
  apartment: Apartment;
};

export default function ApartmentCard({ apartment }: Props) {
  const cover = apartment.cover_url ?? "/placeholder-apartment.svg";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{apartment.name}</CardTitle>
        <CardDescription>{apartment.location ?? "Bez lokacije"}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-border">
          <Image src={cover} alt={apartment.name} fill className="object-cover" />
        </div>
        {apartment.notes ? <p className="text-sm text-muted-foreground">{apartment.notes}</p> : null}
      </CardContent>
    </Card>
  );
}
