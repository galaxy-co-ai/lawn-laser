import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Elite Lawn Care | Top-Rated Lawn & Pest Control in OKC",
    template: "%s | Elite Lawn Care",
  },
  description:
    "Oklahoma City's top-rated lawn care and pest control. 1,700+ reviews, Inc. 5000 company. Custom fertilization, weed control, and pest management for the OKC metro.",
  metadataBase: new URL("https://weedcontrolokc.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Elite Lawn Care",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
