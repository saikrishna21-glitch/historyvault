import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLeaderBySlug, getLeaders } from "@/lib/data";
import { formatLifespan } from "@/lib/utils";
import LedgerTimeline from "@/components/LedgerTimeline";
import CitationBlock from "@/components/CitationBlock";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";
import LeaderCard from "@/components/LeaderCard";

export async function generateStaticParams() {
  const leaders = await getLeaders();
  return leaders.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const leader = await getLeaderBySlug(params.slug);
  if (!leader) return {};
  return {
    title: leader.name,
    description: leader.summary,
    openGraph: { title: leader.name, description: leader.summary },
  };
}

export default async function LeaderProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const leader = await getLeaderBySlug(params.slug);
  if (!leader) notFound();

  const allLeaders = await getLeaders();
  const related = allLeaders
    .filter((l) => l.slug !== leader.slug && l.category === leader.category)
    .slice(0, 4);

  const sections: { heading: string; body: string }[] = [
    { heading: "Early Life", body: leader.earlyLife },
    { heading: "Rise to Power", body: leader.riseToPower },
    { heading: "Leadership Style", body: leader.leadershipStyle },
    { heading: "Legacy", body: leader.legacy },
  ];

  return (
    <article className="max-w-5xl mx-auto px-5 md:px-8 py-16">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
        <div className="dossier overflow-hidden aspect-[4/5] relative">
          <Image
            src={leader.portraitUrl}
            alt={`Portrait of ${leader.name}`}
            fill
            sizes="220px"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <p className="eyebrow">{leader.category} · {leader.country}</p>
          <h1 className="font-display text-4xl md:text-5xl mt-3">{leader.name}</h1>
          <p className="text-parchment-dim text-lg mt-2">{leader.title}</p>
          <p className="font-mono text-sm text-gold-dim mt-1">
            {formatLifespan(leader.birthYear, leader.deathYear)} · {leader.era}
          </p>
          <p className="text-parchment mt-5 max-w-2xl">{leader.summary}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <BookmarkButton type="leader" slug={leader.slug} title={leader.name} />
            <ShareButton title={leader.name} />
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            {leader.tags.map((tag) => (
              <span key={tag} className="eyebrow border border-vault-rule rounded-full px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Biography ────────────────────────────────────────────────── */}
      <section className="mt-16 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <div>
            <h2 className="eyebrow text-gold mb-3">Biography</h2>
            <p className="text-parchment leading-relaxed">{leader.biography}</p>
          </div>

          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="eyebrow text-gold mb-3">{s.heading}</h2>
              <p className="text-parchment leading-relaxed">{s.body}</p>
            </div>
          ))}

          <div>
            <h2 className="eyebrow text-gold mb-3">Major Achievements</h2>
            <ul className="space-y-2">
              {leader.majorAchievements.map((a) => (
                <li key={a} className="flex gap-3 text-parchment">
                  <span className="text-gold mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {leader.speeches.length > 0 && (
            <div>
              <h2 className="eyebrow text-gold mb-3">Important Speeches</h2>
              <div className="space-y-4">
                {leader.speeches.map((s) => (
                  <div key={s.title} className="dossier p-4">
                    <p className="font-display text-lg">{s.title}</p>
                    <p className="font-mono text-xs text-gold-dim mt-1">{s.year}</p>
                    <p className="text-parchment-dim text-sm mt-2">{s.excerptNote}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <CitationBlock references={leader.references} />
        </div>

        {/* ── Timeline sidebar ─────────────────────────────────────── */}
        <div>
          <h2 className="eyebrow text-gold mb-4">Timeline</h2>
          <LedgerTimeline events={leader.timeline} />
        </div>
      </section>

      {/* ── Related leaders ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="eyebrow text-gold mb-6">Related Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((l, i) => (
              <LeaderCard key={l.slug} leader={l} index={i} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-16">
        <Link href="/leaders" className="eyebrow text-gold hover:text-gold-bright transition-colors">
          ← Back to all leaders
        </Link>
      </div>
    </article>
  );
}
