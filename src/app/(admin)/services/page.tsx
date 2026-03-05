import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">
        Service Management
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <Wrench className="h-8 w-8" />
            <p>No services configured yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
