import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elite Lawn Care",
    short_name: "Elite Lawn",
    description:
      "Oklahoma City's top-rated lawn care & pest control. 1700+ five-star reviews.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5f0",
    theme_color: "#2d6a2e",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
