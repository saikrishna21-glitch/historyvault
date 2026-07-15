"use client";

import { useEffect, useMemo, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import EventCard from "@/components/EventCard";
import FilterBar from "@/components/FilterBar";
import { getEvents, getEventFilterOptions } from "@/lib/data";
import type { HistoricalEvent } from "@/lib/types";

export default function EventsPage() {
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [century, setCentury] = useState("");
  const [continent, setContinent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const options = useMemo(() => getEventFilterOptions(events), [events]);

  const filtered = events.filter(
    (e) =>
      (!century || e.century === century) &&
      (!continent || e.continent === continent) &&
      (!category || e.category === category)
  );

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <SectionHeading
        eyebrow="An interactive record"
        title="Historical Events"
        description="Filter by century, continent, or category to explore the background, causes, and consequences behind each turning point."
      />

      <div className="mt-8">
        <FilterBar
          filters={[
            { label: "Centuries", value: century, options: options.centuries, onChange: setCentury },
            { label: "Continents", value: continent, options: options.continents, onChange: setContinent },
            { label: "Categories", value: category, options: options.categories, onChange: setCategory },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-parchment-dim mt-16 text-center">
          No events match those filters yet — try clearing one.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {filtered.map((event, i) => (
            <EventCard key={event.slug} event={event} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
