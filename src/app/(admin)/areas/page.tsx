import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function AreasPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">
        Service Area Management
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Service Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <MapPin className="h-8 w-8" />
            <p>No service areas defined yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
