import type { MetadataRoute } from "next";
import { getLeaders, getEvents } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://history-vault.example.com";
  const [leaders, events] = await Promise.all([getLeaders(), getEvents()]);

  const staticRoutes = ["", "/leaders", "/events", "/timeline", "/search"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const leaderRoutes = leaders.map((l) => ({
    url: `${base}/leaders/${l.slug}`,
    lastModified: new Date(),
  }));

  const eventRoutes = events.map((e) => ({
    url: `${base}/events/${e.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...leaderRoutes, ...eventRoutes];
}
