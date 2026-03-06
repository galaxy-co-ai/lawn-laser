import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Users, TrendingUp, DollarSign } from "lucide-react";
import { db } from "@/lib/db";
import { leads, quotes, quoteItems } from "@/lib/db/schema";
import { count, sum, eq, gte, and } from "drizzle-orm";
import Link from "next/link";

async function getStats() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [totalQuotesResult] = await db
    .select({ value: count() })
    .from(quotes);

  const [activeLeadsResult] = await db
    .select({ value: count() })
    .from(leads)
    .where(eq(leads.status, "new"));

  const [monthRevenueResult] = await db
    .select({ value: sum(quotes.totalPrice) })
    .from(quotes)
    .where(
      and(
        eq(quotes.status, "accepted"),
        gte(quotes.createdAt, thirtyDaysAgo)
      )
    );

  const [totalLeadsResult] = await db
    .select({ value: count() })
    .from(leads);

  const [convertedLeadsResult] = await db
    .select({ value: count() })
    .from(leads)
    .where(eq(leads.status, "won"));

  const totalLeads = totalLeadsResult.value;
  const convertedLeads = convertedLeadsResult.value;
  const conversionRate =
    totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  return {
    totalQuotes: totalQuotesResult.value,
    activeLeads: activeLeadsResult.value,
    conversionRate,
    monthRevenue: Number(monthRevenueResult.value ?? 0),
  };
}

async function getRecentLeads() {
  return db
    .select({
      id: leads.id,
      firstName: leads.firstName,
      lastName: leads.lastName,
      email: leads.email,
      phone: leads.phone,
      source: leads.source,
      status: leads.status,
      createdAt: leads.createdAt,
    })
    .from(leads)
    .orderBy(leads.createdAt)
    .limit(5);
}

async function getRecentQuotes() {
  return db
    .select({
      id: quotes.id,
      totalPrice: quotes.totalPrice,
      status: quotes.status,
      createdAt: quotes.createdAt,
      firstName: leads.firstName,
      lastName: leads.lastName,
    })
    .from(quotes)
    .innerJoin(leads, eq(quotes.leadId, leads.id))
    .orderBy(quotes.createdAt)
    .limit(5);
}

export default async function DashboardPage() {
  const [stats, recentLeads, recentQuotes] = await Promise.all([
    getStats(),
    getRecentLeads(),
    getRecentQuotes(),
  ]);

  const statCards = [
    {
      label: "Total Quotes",
      value: stats.totalQuotes.toLocaleString(),
      icon: FileText,
    },
    {
      label: "Active Leads",
      value: stats.activeLeads.toLocaleString(),
      icon: Users,
    },
    {
      label: "Conversion Rate",
      value: `${stats.conversionRate}%`,
      icon: TrendingUp,
    },
    {
      label: "Revenue (30d)",
      value: `$${stats.monthRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Leads</CardTitle>
            <Link
              href="/leads"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No leads yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/leads/${lead.id}`}
                    className="flex items-center justify-between rounded-md border border-border p-3 transition-colors hover:bg-secondary/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {lead.email || lead.phone || "No contact info"}
                      </p>
                    </div>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                      {lead.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Quotes */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Quotes</CardTitle>
            <Link
              href="/quotes"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {recentQuotes.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No quotes yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentQuotes.map((quote) => (
                  <Link
                    key={quote.id}
                    href={`/quotes/${quote.id}`}
                    className="flex items-center justify-between rounded-md border border-border p-3 transition-colors hover:bg-secondary/50"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {quote.firstName} {quote.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      ${quote.totalPrice}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
