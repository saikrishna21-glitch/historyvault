"use client";

import { motion } from "framer-motion";
import type { TimelineEvent } from "@/lib/types";

export default function LedgerTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="ledger-rail space-y-8 py-2">
      {events.map((ev, i) => (
        <motion.div
          key={`${ev.year}-${i}`}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          className="relative"
        >
          <span className="ledger-tick" />
          <p className="font-mono text-xs text-gold">{ev.year}</p>
          <p className="text-parchment mt-1">{ev.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
