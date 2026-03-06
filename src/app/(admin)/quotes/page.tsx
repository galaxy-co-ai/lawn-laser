import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText } from "lucide-react";
import { db } from "@/lib/db";
import { quotes, leads } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  pending: "outline",
  accepted: "default",
  expired: "secondary",
  rejected: "destructive",
};

export default async function QuotesPage() {
  const allQuotes = await db
    .select({
      id: quotes.id,
      totalPrice: quotes.totalPrice,
      status: quotes.status,
      createdAt: quotes.createdAt,
      expiresAt: quotes.expiresAt,
      firstName: leads.firstName,
      lastName: leads.lastName,
      email: leads.email,
    })
    .from(quotes)
    .innerJoin(leads, eq(quotes.leadId, leads.id))
    .orderBy(desc(quotes.createdAt));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Quotes</h1>
        <Button asChild>
          <Link href="/quotes/new">New Quote</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            All Quotes ({allQuotes.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {allQuotes.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-muted-foreground">
              <FileText className="h-8 w-8" />
              <p>No quotes yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Customer</th>
                    <th className="pb-3 pr-4 font-medium">Amount</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 pr-4 font-medium">Created</th>
                    <th className="pb-3 font-medium">Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {allQuotes.map((quote) => (
                    <tr
                      key={quote.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="py-3 pr-4">
                        <Link
                          href={`/quotes/${quote.id}`}
                          className="font-medium text-foreground hover:text-primary"
                        >
                          {quote.firstName} {quote.lastName}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {quote.email}
                        </p>
                      </td>
                      <td className="py-3 pr-4 font-semibold text-foreground">
                        ${quote.totalPrice}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant={STATUS_VARIANT[quote.status] ?? "outline"}>
                          {quote.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {quote.expiresAt
                          ? new Date(quote.expiresAt).toLocaleDateString()
                          : "—"}
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
