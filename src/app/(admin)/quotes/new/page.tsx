import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewQuotePage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">New Quote</h1>
        <Button variant="outline" asChild>
          <Link href="/quotes">Cancel</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Create Quote</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Quote form coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
