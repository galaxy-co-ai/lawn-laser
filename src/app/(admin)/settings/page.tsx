import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BUSINESS } from "@/lib/constants";

export default function SettingsPage() {
  const widgetUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://lawn-laser.vercel.app"}/widget`;
  const embedCode = `<div id="elite-quote-widget"></div>\n<script src="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://lawn-laser.vercel.app"}/widget.js"></script>`;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>

      {/* Business Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Business Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <dt className="font-medium text-foreground">Company</dt>
              <dd className="text-muted-foreground">{BUSINESS.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Phone</dt>
              <dd className="text-muted-foreground">{BUSINESS.phone}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Email</dt>
              <dd className="text-muted-foreground">{BUSINESS.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Address</dt>
              <dd className="text-muted-foreground">
                {BUSINESS.address.street}, {BUSINESS.address.city},{" "}
                {BUSINESS.address.state} {BUSINESS.address.zip}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Reviews</dt>
              <dd className="text-muted-foreground">
                {BUSINESS.reviewCount}+ ({BUSINESS.googleRating} avg)
              </dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Founded</dt>
              <dd className="text-muted-foreground">{BUSINESS.founded}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">
            Business info is configured in <code className="text-foreground">src/lib/constants.ts</code>. Edit that file to update.
          </p>
        </CardContent>
      </Card>

      {/* Widget Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quote Widget</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Widget URL
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              Use this URL to embed the quote widget in an iframe.
            </p>
            <code className="mt-2 block rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground break-all">
              {widgetUrl}
            </code>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              URL Parameters
            </label>
            <div className="mt-1 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-2 pr-4 font-medium">Param</th>
                    <th className="pb-2 pr-4 font-medium">Example</th>
                    <th className="pb-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-mono text-foreground">services</td>
                    <td className="py-2 pr-4 font-mono">fertilization,weed-control</td>
                    <td className="py-2">Pre-select services (comma-separated slugs)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4 font-mono text-foreground">area</td>
                    <td className="py-2 pr-4 font-mono">Oklahoma City</td>
                    <td className="py-2">Pre-fill service area</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-foreground">accent</td>
                    <td className="py-2 pr-4 font-mono">%2316a34a</td>
                    <td className="py-2">Override accent color (URL-encoded hex)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Embed Code
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              Add this to any website to embed the quote widget.
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground">
              {embedCode}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* API Keys Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {[
              { name: "Google Maps", env: "GOOGLE_MAPS_API_KEY", status: !!process.env.GOOGLE_MAPS_API_KEY },
              { name: "Regrid (Parcel Data)", env: "REGRID_API_TOKEN", status: !!process.env.REGRID_API_TOKEN },
              { name: "Clerk Auth", env: "CLERK_SECRET_KEY", status: !!process.env.CLERK_SECRET_KEY },
              { name: "Upstash Redis", env: "UPSTASH_REDIS_DATABASE_KV_REST_API_URL", status: !!process.env.UPSTASH_REDIS_DATABASE_KV_REST_API_URL },
              { name: "Neon Database", env: "DATABASE_URL", status: !!process.env.DATABASE_URL },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between">
                <span className="text-foreground">{integration.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    integration.status
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {integration.status ? "Connected" : "Missing"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
