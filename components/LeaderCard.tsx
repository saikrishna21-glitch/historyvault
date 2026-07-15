"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Leader } from "@/lib/types";
import { formatLifespan } from "@/lib/utils";

export default function LeaderCard({ leader, index = 0 }: { leader: Leader; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.05 }}
    >
      <Link
        href={`/leaders/${leader.slug}`}
        className="group glass block rounded-2xl overflow-hidden hover:shadow-goldGlow transition-shadow"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-ink-raised">
          <Image
            src={leader.portraitUrl}
            alt={`Portrait of ${leader.name}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-90" />
          <span className="absolute top-3 left-3 eyebrow bg-ink/70 px-2 py-1 rounded-full backdrop-blur-sm">
            {leader.era}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-display text-xl text-parchment group-hover:text-gold transition-colors">
            {leader.name}
          </h3>
          <p className="text-sm text-parchment-dim mt-1">{leader.title}</p>
          <div className="flex items-center justify-between mt-4 text-xs font-mono text-gold-dim">
            <span>{leader.country}</span>
            <span>{formatLifespan(leader.birthYear, leader.deathYear)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
