import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
  async redirects() {
    return [
      // Old WordPress root-level blog posts → /blog/[slug]
      {
        source: "/bagworms-vs-webworms-whats-the-difference",
        destination: "/blog/bagworms-vs-webworms",
        permanent: true,
      },
      {
        source: "/the-perfect-fertilization-schedule-for-lawns-in-oklahoma-city-ok",
        destination: "/blog/fertilization-schedule-oklahoma-city",
        permanent: true,
      },
      // Old orphaned pages
      { source: "/location-page", destination: "/service-areas/oklahoma-city-ok", permanent: true },
      { source: "/learning-center", destination: "/blog", permanent: true },
      { source: "/category/:path*", destination: "/blog", permanent: true },
      // Old sub-service URLs
      { source: "/weed-control", destination: "/lawn-care/weed-control", permanent: true },
      { source: "/lawn-fertilization", destination: "/lawn-care/fertilization", permanent: true },
      { source: "/grub-control", destination: "/lawn-care/grub-control", permanent: true },
      { source: "/soil-conditioning", destination: "/lawn-care/soil-conditioning", permanent: true },
      { source: "/perimeter-pest-control", destination: "/pest-control/perimeter", permanent: true },
      { source: "/mosquito-control", destination: "/pest-control/mosquito", permanent: true },
      { source: "/flea-tick-control", destination: "/pest-control/flea-tick", permanent: true },
    ];
  },
};

export default nextConfig;
