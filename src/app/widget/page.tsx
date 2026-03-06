import type { Metadata } from "next";
import { WidgetShell } from "@/components/quote/widget-shell";

export const metadata: Metadata = {
  title: "Get a Quote — Elite Lawn Care",
  robots: { index: false, follow: false },
};

export default async function WidgetPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const services =
    typeof params.services === "string"
      ? params.services.split(",").filter(Boolean)
      : undefined;

  const area = typeof params.area === "string" ? params.area : undefined;
  const accent = typeof params.accent === "string" ? params.accent : undefined;

  return (
    <WidgetShell
      preselectedServices={services}
      preselectedArea={area}
      accentColor={accent}
    />
  );
}
