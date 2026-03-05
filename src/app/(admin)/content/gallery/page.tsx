import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Gallery Management
        </h1>
        <Button>Upload Images</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <p>No gallery images yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
