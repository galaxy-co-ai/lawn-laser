import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Lead #{id}</h1>
        <Button variant="outline" asChild>
          <Link href="/leads">Back to Leads</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Lead Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Lead detail view coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
