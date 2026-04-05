import type { MetadataRoute } from "next";

const BASE_URL = "https://kerai-app.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2025-04-02"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/signup`,
      lastModified: new Date("2025-04-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
