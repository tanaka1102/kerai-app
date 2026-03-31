import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/home", "/mission", "/history", "/collection", "/gacha", "/plan", "/settings"],
    },
    sitemap: "https://kerai-app.vercel.app/sitemap.xml",
  };
}
