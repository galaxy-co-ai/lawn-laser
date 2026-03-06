import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  new: "default",
  contacted: "outline",
  quoted: "secondary",
  won: "default",
  lost: "destructive",
};

export default async function LeadsPage() {
  const allLeads = await db
    .select({
      id: leads.id,
      firstName: leads.firstName,
      lastName: leads.lastName,
      email: leads.email,
      phone: leads.phone,
      address: leads.address,
      source: leads.source,
      status: leads.status,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .orderBy(desc(leads.createdAt));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Leads Pipeline</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            All Leads ({allLeads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {allLeads.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
              <Users className="h-8 w-8" />
              <p>No leads yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Name</th>
                    <th className="pb-3 pr-4 font-medium">Contact</th>
                    <th className="pb-3 pr-4 font-medium">Source</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-3 pr-4">
                        <Link
                          href={`/leads/${lead.id}`}
                          className="font-medium text-foreground hover:text-primary"
                        >
                          {lead.firstName || lead.lastName
                            ? `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim()
                            : "Unknown"}
                        </Link>
                        {lead.address && (
                          <p className="text-xs text-muted-foreground">
                            {lead.address}
                          </p>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {lead.email && (
                          <p>
                            <a
                              href={`mailto:${lead.email}`}
                              className="hover:text-primary"
                            >
                              {lead.email}
                            </a>
                          </p>
                        )}
                        {lead.phone && <p>{lead.phone}</p>}
                        {!lead.email && !lead.phone && "—"}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {lead.source ?? "—"}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant={STATUS_VARIANT[lead.status] ?? "outline"}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
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
