"use client";

import { useEffect, useMemo, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import LeaderCard from "@/components/LeaderCard";
import FilterBar from "@/components/FilterBar";
import { getLeaders, getLeaderFilterOptions } from "@/lib/data";
import type { Leader } from "@/lib/types";

export default function LeadersPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [country, setCountry] = useState("");
  const [era, setEra] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getLeaders().then(setLeaders);
  }, []);

  const options = useMemo(() => getLeaderFilterOptions(leaders), [leaders]);

  const filtered = leaders.filter(
    (l) =>
      (!country || l.country === country) &&
      (!era || l.era === era) &&
      (!category || l.category === category)
  );

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <SectionHeading
        eyebrow="The full roster"
        title="World Leaders"
        description="Filter by country, era, or category to find a leader's complete dossier — biography, rise to power, achievements, and legacy."
      />

      <div className="mt-8">
        <FilterBar
          filters={[
            { label: "Countries", value: country, options: options.countries, onChange: setCountry },
            { label: "Eras", value: era, options: options.eras, onChange: setEra },
            { label: "Categories", value: category, options: options.categories, onChange: setCategory },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-parchment-dim mt-16 text-center">
          No leaders match those filters yet — try clearing one.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
          {filtered.map((leader, i) => (
            <LeaderCard key={leader.slug} leader={leader} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
