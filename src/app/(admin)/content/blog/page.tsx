import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function BlogContentPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          Blog Content Management
        </h1>
        <Button>New Post</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
            <BookOpen className="h-8 w-8" />
            <p>No blog posts yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
