import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";
import { MobileCtaBar } from "@/components/marketing/mobile-cta-bar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-14 md:pb-0">{children}</main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
