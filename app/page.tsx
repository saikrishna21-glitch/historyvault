import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import LeaderCard from "@/components/LeaderCard";
import EventCard from "@/components/EventCard";
import SectionHeading from "@/components/SectionHeading";
import WorldTimeline from "@/components/WorldTimeline";
import {
  getFeaturedLeaders,
  getFeaturedEvents,
  getLeaders,
  getEvents,
} from "@/lib/data";

export default async function HomePage() {
  const [featuredLeaders, featuredEvents, allLeaders, allEvents] = await Promise.all([
    getFeaturedLeaders(),
    getFeaturedEvents(),
    getLeaders(),
    getEvents(),
  ]);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-5 md:px-8 pt-24 pb-20 text-center animate-fade-up">
          <p className="eyebrow">An archive of consequence</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.1] mt-5">
            Every empire, revolution,
            <br className="hidden sm:block" /> and{" "}
            <span className="text-gold">turning point</span>, sourced.
          </h1>
          <p className="text-parchment-dim text-lg mt-6 max-w-2xl mx-auto">
            History Vault is a citation-first archive of the leaders and
            events that shaped civilization — built for readers who want the
            full record, not just the headline.
          </p>

          <div className="mt-10 max-w-xl mx-auto">
            <SearchBar variant="hero" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              href="/leaders"
              className="inline-flex items-center gap-2 rounded-full bg-gold text-ink px-6 py-3 text-sm font-medium hover:bg-gold-bright transition-colors"
            >
              Browse Leaders <ArrowRight size={15} />
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full border border-vault-rule px-6 py-3 text-sm font-medium hover:border-gold hover:text-gold transition-colors"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Leaders ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <SectionHeading
            eyebrow="Featured dossiers"
            title="World Leaders"
            description="Profiles built from biography, rise to power, achievements, and legacy — every claim linked to a reputable source."
          />
          <Link
            href="/leaders"
            className="eyebrow text-gold hover:text-gold-bright transition-colors shrink-0"
          >
            View all leaders →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredLeaders.map((leader, i) => (
            <LeaderCard key={leader.slug} leader={leader} index={i} />
          ))}
        </div>
      </section>

      {/* ── Featured Events ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <SectionHeading
            eyebrow="Turning points"
            title="Historical Events"
            description="Background, causes, key people, and long-term impact — with maps and references for every event."
          />
          <Link
            href="/events"
            className="eyebrow text-gold hover:text-gold-bright transition-colors shrink-0"
          >
            View all events →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map((event, i) => (
            <EventCard key={event.slug} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* ── Timeline preview ─────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-16">
        <SectionHeading
          eyebrow="The full record"
          title="A World Timeline"
          description="Leaders and events, arranged chronologically. This preview shows a slice of the archive — open the full timeline for the complete chronology."
        />
        <div className="mt-10">
          <WorldTimeline
            leaders={allLeaders.slice(0, 3)}
            events={allEvents.slice(0, 3)}
          />
        </div>
        <div className="text-center mt-10">
          <Link
            href="/timeline"
            className="inline-flex items-center gap-2 rounded-full border border-vault-rule px-6 py-3 text-sm font-medium hover:border-gold hover:text-gold transition-colors"
          >
            Open the full timeline <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
