import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { getEventBySlug, getEvents } from "@/lib/data";
import LedgerTimeline from "@/components/LedgerTimeline";
import CitationBlock from "@/components/CitationBlock";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";
import EventCard from "@/components/EventCard";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.summary,
    openGraph: { title: event.title, description: event.summary },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const allEvents = await getEvents();
  const related = allEvents
    .filter((e) => e.slug !== event.slug && e.category === event.category)
    .slice(0, 3);

  const years = event.yearEnd && event.yearEnd !== event.yearStart
    ? `${event.yearStart} – ${event.yearEnd}`
    : `${event.yearStart}`;

  return (
    <article className="max-w-5xl mx-auto px-5 md:px-8 py-16">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="dossier overflow-hidden aspect-[21/9] relative">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <p className="eyebrow">{event.category} · {event.continent}</p>
          <h1 className="font-display text-3xl md:text-5xl mt-2 max-w-2xl">{event.title}</h1>
          <p className="font-mono text-sm text-gold-dim mt-2">{years} · {event.century}</p>
        </div>
      </div>

      <p className="text-parchment mt-8 text-lg max-w-3xl">{event.summary}</p>
      <div className="flex flex-wrap gap-3 mt-6">
        <BookmarkButton type="event" slug={event.slug} title={event.title} />
        <ShareButton title={event.title} />
      </div>
      <div className="flex flex-wrap gap-2 mt-5">
        {event.tags.map((tag) => (
          <span key={tag} className="eyebrow border border-vault-rule rounded-full px-3 py-1">
            {tag}
          </span>
        ))}
      </div>

      <section className="mt-16 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="eyebrow text-gold mb-3">Background</h2>
            <p className="text-parchment leading-relaxed">{event.background}</p>
          </div>

          <div>
            <h2 className="eyebrow text-gold mb-3">Causes</h2>
            <ul className="space-y-2">
              {event.causes.map((c) => (
                <li key={c} className="flex gap-3 text-parchment">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gold mb-3">Key People</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {event.keyPeople.map((p) => {
                const content = (
                  <div className="dossier p-4 h-full">
                    <p className="font-display text-lg">{p.name}</p>
                    <p className="text-sm text-parchment-dim mt-1">{p.role}</p>
                  </div>
                );
                return p.leaderSlug ? (
                  <Link key={p.name} href={`/leaders/${p.leaderSlug}`} className="hover:shadow-goldGlow transition-shadow rounded-sm">
                    {content}
                  </Link>
                ) : (
                  <div key={p.name}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* Map — schematic placeholder describing geographic scope.
              Swap for a real map library (e.g. Leaflet or Mapbox) in production. */}
          <div>
            <h2 className="eyebrow text-gold mb-3">Geographic Scope</h2>
            <div className="dossier p-6 flex items-start gap-4 bg-ink-raised/60">
              <MapPin size={20} className="text-gold shrink-0 mt-1" />
              <p className="text-parchment-dim">{event.mapNote}</p>
            </div>
          </div>

          <div>
            <h2 className="eyebrow text-gold mb-3">Consequences</h2>
            <ul className="space-y-2">
              {event.consequences.map((c) => (
                <li key={c} className="flex gap-3 text-parchment">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gold mb-3">Long-Term Impact</h2>
            <p className="text-parchment leading-relaxed">{event.longTermImpact}</p>
          </div>

          <CitationBlock references={event.references} />
        </div>

        <div>
          <h2 className="eyebrow text-gold mb-4">Timeline</h2>
          <LedgerTimeline events={event.timeline} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="eyebrow text-gold mb-6">Related Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((e, i) => (
              <EventCard key={e.slug} event={e} index={i} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-16">
        <Link href="/events" className="eyebrow text-gold hover:text-gold-bright transition-colors">
          ← Back to all events
        </Link>
      </div>
    </article>
  );
}
