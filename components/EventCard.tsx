"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { HistoricalEvent } from "@/lib/types";

export default function EventCard({
  event,
  index = 0,
}: {
  event: HistoricalEvent;
  index?: number;
}) {
  const years = event.yearEnd && event.yearEnd !== event.yearStart
    ? `${event.yearStart} – ${event.yearEnd}`
    : `${event.yearStart}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05 }}
    >
      <Link
        href={`/events/${event.slug}`}
        className="group glass block rounded-2xl overflow-hidden hover:shadow-goldGlow transition-shadow"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-ink-raised">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-90" />
          <span className="absolute top-3 left-3 eyebrow bg-ink/70 px-2 py-1 rounded-full backdrop-blur-sm">
            {event.category}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-display text-xl text-parchment group-hover:text-gold transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-parchment-dim mt-2 line-clamp-2">
            {event.summary}
          </p>
          <div className="flex items-center justify-between mt-4 text-xs font-mono text-gold-dim">
            <span>{event.continent}</span>
            <span>{years}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
