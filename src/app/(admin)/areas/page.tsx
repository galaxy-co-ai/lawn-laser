import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { db } from "@/lib/db";
import { serviceAreas } from "@/lib/db/schema";
import { ActiveToggle } from "@/components/admin/active-toggle";

export default async function AreasPage() {
  const areas = await db
    .select({
      id: serviceAreas.id,
      name: serviceAreas.name,
      slug: serviceAreas.slug,
      isActive: serviceAreas.isActive,
      createdAt: serviceAreas.createdAt,
    })
    .from(serviceAreas)
    .orderBy(serviceAreas.name);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">
        Service Area Management
      </h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Service Areas ({areas.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {areas.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
              <MapPin className="h-8 w-8" />
              <p>No service areas defined yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">City</th>
                    <th className="pb-3 pr-4 font-medium">Slug</th>
                    <th className="pb-3 font-medium text-center">Active</th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((area) => (
                    <tr
                      key={area.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-3 pr-4 font-medium text-foreground">
                        {area.name}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {area.slug}
                      </td>
                      <td className="py-3 text-center">
                        <ActiveToggle
                          id={area.id}
                          isActive={area.isActive}
                          endpoint="areas"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
