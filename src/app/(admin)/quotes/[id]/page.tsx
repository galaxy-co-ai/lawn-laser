import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { quotes, quoteItems, leads, measurements, services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { QuoteStatusSelect } from "@/components/admin/quote-status-select";

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [quote] = await db
    .select({
      id: quotes.id,
      totalPrice: quotes.totalPrice,
      status: quotes.status,
      createdAt: quotes.createdAt,
      expiresAt: quotes.expiresAt,
      leadId: quotes.leadId,
      measurementId: quotes.measurementId,
      firstName: leads.firstName,
      lastName: leads.lastName,
      email: leads.email,
      phone: leads.phone,
      address: measurements.address,
      lawnSqFt: measurements.lawnSqFt,
      lotSqFt: measurements.lotSqFt,
    })
    .from(quotes)
    .innerJoin(leads, eq(quotes.leadId, leads.id))
    .innerJoin(measurements, eq(quotes.measurementId, measurements.id))
    .where(eq(quotes.id, id))
    .limit(1);

  if (!quote) notFound();

  const items = await db
    .select({
      id: quoteItems.id,
      unitPrice: quoteItems.unitPrice,
      totalPrice: quoteItems.totalPrice,
      quantity: quoteItems.quantity,
      serviceName: services.name,
      serviceCategory: services.category,
    })
    .from(quoteItems)
    .innerJoin(services, eq(quoteItems.serviceId, services.id))
    .where(eq(quoteItems.quoteId, id));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-foreground">
            Quote for {quote.firstName} {quote.lastName}
          </h1>
          <QuoteStatusSelect quoteId={quote.id} currentStatus={quote.status} />
        </div>
        <Button variant="outline" asChild>
          <Link href="/quotes">Back to Quotes</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground">
                {quote.firstName} {quote.lastName}
              </span>
            </div>
            {quote.email && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <a
                  href={`mailto:${quote.email}`}
                  className="text-primary hover:underline"
                >
                  {quote.email}
                </a>
              </div>
            )}
            {quote.phone && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <a
                  href={`tel:${quote.phone}`}
                  className="text-primary hover:underline"
                >
                  {quote.phone}
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Property Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Address</span>
              <span className="text-foreground">{quote.address}</span>
            </div>
            {quote.lawnSqFt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lawn Area</span>
                <span className="text-foreground">
                  {quote.lawnSqFt.toLocaleString()} sq ft
                </span>
              </div>
            )}
            {quote.lotSqFt && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lot Size</span>
                <span className="text-foreground">
                  {quote.lotSqFt.toLocaleString()} sq ft
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Line Items */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Services & Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Service</th>
                  <th className="pb-3 pr-4 font-medium">Category</th>
                  <th className="pb-3 pr-4 font-medium text-right">
                    Unit Price
                  </th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-3 pr-4 font-medium text-foreground">
                      {item.serviceName}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {item.serviceCategory === "lawn-care"
                        ? "Lawn Care"
                        : "Pest Control"}
                    </td>
                    <td className="py-3 pr-4 text-right text-muted-foreground">
                      ${item.unitPrice}
                    </td>
                    <td className="py-3 text-right font-medium text-foreground">
                      ${item.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border">
                  <td
                    colSpan={3}
                    className="pt-3 pr-4 text-right font-semibold text-foreground"
                  >
                    Total
                  </td>
                  <td className="pt-3 text-right text-lg font-bold text-primary">
                    ${quote.totalPrice}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Created</span>
            <span className="text-foreground">
              {new Date(quote.createdAt).toLocaleString()}
            </span>
          </div>
          {quote.expiresAt && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expires</span>
              <span className="text-foreground">
                {new Date(quote.expiresAt).toLocaleString()}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
