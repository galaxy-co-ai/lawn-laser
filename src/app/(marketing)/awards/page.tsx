import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Awards | Elite Lawn Care",
  description:
    "Elite Lawn Care has been recognized as an Inc. 5000 company, BBB A+ rated, and Best of Moore & South OKC.",
};

const AWARDS = [
  {
    title: "Inc. 5000 fastest-growing private companies",
    years: "2022, 2023, 2024, 2025",
    description:
      "Recognized four consecutive years as one of America's fastest-growing private companies by Inc. Magazine.",
  },
  {
    title: "BBB A+ accredited business",
    years: "Current",
    description:
      "Maintaining the highest rating with the Better Business Bureau for our commitment to customer service and ethical business practices.",
  },
  {
    title: "Best of Moore & South OKC",
    years: "2024",
    description:
      "Voted the best lawn care provider by Moore and South Oklahoma City residents.",
  },
];

export default function AwardsPage() {
  return (
    <section className="section-gap bg-background">
      <div className="container-marketing">
        <h1 className="text-foreground mb-4">Awards and recognition</h1>
        <p className="text-lg text-muted-foreground mb-10">
          We&apos;re proud to be recognized for our commitment to quality lawn
          care and customer service.
        </p>

        <div className="space-y-6">
          {AWARDS.map((award) => (
            <div
              key={award.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-col gap-1 mb-2">
                <h3 className="text-foreground text-base font-semibold">
                  {award.title}
                </h3>
                <p className="text-sm text-primary font-medium">
                  {award.years}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
