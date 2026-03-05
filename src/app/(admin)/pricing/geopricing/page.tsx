import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GeopricingPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Geopricing Map Editor
        </h1>
        <Button variant="outline" asChild>
          <Link href="/pricing">Back to Pricing</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pricing Zones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Geopricing map editor coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
