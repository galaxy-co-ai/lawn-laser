import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { leads, quotes } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { LeadStatusSelect } from "@/components/admin/lead-status-select";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [lead] = await db
    .select()
    .from(leads)
    .where(eq(leads.id, id))
    .limit(1);

  if (!lead) notFound();

  const leadQuotes = await db
    .select({
      id: quotes.id,
      totalPrice: quotes.totalPrice,
      status: quotes.status,
      createdAt: quotes.createdAt,
    })
    .from(quotes)
    .where(eq(quotes.leadId, id))
    .orderBy(desc(quotes.createdAt));

  const metadata = lead.metadata as Record<string, unknown> | null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-foreground">
            {lead.firstName || lead.lastName
              ? `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim()
              : "Unknown Lead"}
          </h1>
          <LeadStatusSelect leadId={lead.id} currentStatus={lead.status} />
        </div>
        <Button variant="outline" asChild>
          <Link href="/leads">Back to Leads</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {lead.email && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <a
                  href={`mailto:${lead.email}`}
                  className="text-primary hover:underline"
                >
                  {lead.email}
                </a>
              </div>
            )}
            {lead.phone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <a
                  href={`tel:${lead.phone}`}
                  className="text-primary hover:underline"
                >
                  {lead.phone}
                </a>
              </div>
            )}
            {lead.address && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Address</span>
                <span className="text-foreground">{lead.address}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Source</span>
              <span className="text-foreground">{lead.source ?? "—"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="text-foreground">
                {new Date(lead.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="text-foreground">
                {new Date(lead.updatedAt).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quotes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Quotes ({leadQuotes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {leadQuotes.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No quotes for this lead
            </p>
          ) : (
            <div className="space-y-2">
              {leadQuotes.map((quote) => (
                <Link
                  key={quote.id}
                  href={`/quotes/${quote.id}`}
                  className="flex items-center justify-between rounded-md border border-border p-3 transition-colors hover:bg-secondary/50"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      ${quote.totalPrice}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline">{quote.status}</Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Metadata */}
      {metadata && Object.keys(metadata).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-md bg-secondary p-3 text-xs text-secondary-foreground">
              {JSON.stringify(metadata, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
