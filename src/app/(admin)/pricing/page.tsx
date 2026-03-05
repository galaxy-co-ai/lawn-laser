import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">
        Pricing Management
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Geopricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Set pricing zones and multipliers based on service area geography.
            </p>
            <Button variant="outline" asChild>
              <Link href="/pricing/geopricing">Manage Geopricing</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Packages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create and manage service packages and bundles.
            </p>
            <Button variant="outline" asChild>
              <Link href="/pricing/packages">Manage Packages</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
