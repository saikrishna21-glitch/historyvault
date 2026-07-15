"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import WorldTimeline from "@/components/WorldTimeline";
import { getLeaders, getEvents } from "@/lib/data";
import type { Leader, HistoricalEvent } from "@/lib/types";

export default function TimelinePage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [events, setEvents] = useState<HistoricalEvent[]>([]);

  useEffect(() => {
    getLeaders().then(setLeaders);
    getEvents().then(setEvents);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-16">
      <SectionHeading
        eyebrow="Ancient to modern"
        title="World Timeline"
        description="Every leader and event in the Vault, arranged chronologically. This build's dataset currently spans the 18th–20th centuries — the architecture is built to extend to Ancient and Medieval history as sourced entries are added."
      />
      <div className="mt-12">
        <WorldTimeline leaders={leaders} events={events} />
      </div>
    </div>
  );
}
