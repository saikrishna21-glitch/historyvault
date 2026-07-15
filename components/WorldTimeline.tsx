"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Landmark } from "lucide-react";
import type { Leader, HistoricalEvent } from "@/lib/types";

interface TimelineItem {
  type: "leader" | "event";
  slug: string;
  title: string;
  subtitle: string;
  year: number;
}

export default function WorldTimeline({
  leaders,
  events,
}: {
  leaders: Leader[];
  events: HistoricalEvent[];
}) {
  const [typeFilter, setTypeFilter] = useState<"all" | "leader" | "event">("all");

  const items: TimelineItem[] = useMemo(() => {
    const leaderItems: TimelineItem[] = leaders
      .filter((l) => l.birthYear !== null)
      .map((l) => ({
        type: "leader",
        slug: l.slug,
        title: l.name,
        subtitle: `${l.title} · born ${l.birthYear}`,
        year: l.birthYear as number,
      }));

    const eventItems: TimelineItem[] = events.map((e) => ({
      type: "event",
      slug: e.slug,
      title: e.title,
      subtitle: `${e.category} · ${e.continent}`,
      year: e.yearStart,
    }));

    return [...leaderItems, ...eventItems]
      .filter((i) => typeFilter === "all" || i.type === typeFilter)
      .sort((a, b) => a.year - b.year);
  }, [leaders, events, typeFilter]);

  return (
    <div>
      <div className="flex gap-2 mb-10">
        {(["all", "leader", "event"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`eyebrow px-4 py-2 rounded-full border transition-colors ${
              typeFilter === t
                ? "border-gold text-gold bg-gold/10"
                : "border-vault-rule text-parchment-dim hover:border-gold hover:text-gold"
            }`}
          >
            {t === "all" ? "All entries" : t === "leader" ? "Leaders" : "Events"}
          </button>
        ))}
      </div>

      <div className="ledger-rail space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={`${item.type}-${item.slug}`}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: Math.min(i, 10) * 0.03 }}
            className="relative"
          >
            <span className="ledger-tick" />
            <Link
              href={`/${item.type === "leader" ? "leaders" : "events"}/${item.slug}`}
              className="group flex items-start gap-4 glass rounded-xl p-4 hover:shadow-goldGlow transition-shadow"
            >
              <span className="mt-1 text-gold shrink-0">
                {item.type === "leader" ? <User size={16} /> : <Landmark size={16} />}
              </span>
              <span className="min-w-0">
                <span className="font-mono text-xs text-gold-dim">{item.year}</span>
                <span className="block font-display text-lg text-parchment group-hover:text-gold transition-colors">
                  {item.title}
                </span>
                <span className="block text-sm text-parchment-dim">{item.subtitle}</span>
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
