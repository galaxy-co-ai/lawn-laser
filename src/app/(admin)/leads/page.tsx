import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";

export default function LeadsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Leads Pipeline</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <Users className="h-8 w-8" />
            <p>No leads yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
