import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-vault-rule mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-lg">
            History <span className="text-gold">Vault</span>
          </p>
          <p className="text-sm text-parchment-dim mt-3 max-w-xs">
            An archive of the leaders and events that shaped human history —
            sourced, cited, and built for careful reading.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-parchment-dim">
            <li><Link href="/leaders" className="hover:text-gold transition-colors">World Leaders</Link></li>
            <li><Link href="/events" className="hover:text-gold transition-colors">Historical Events</Link></li>
            <li><Link href="/timeline" className="hover:text-gold transition-colors">World Timeline</Link></li>
            <li><Link href="/search" className="hover:text-gold transition-colors">Search the Vault</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">A note on sources</p>
          <p className="text-sm text-parchment-dim max-w-sm">
            Every profile and event links to reputable references such as
            Encyclopaedia Britannica, national archives, and museum
            collections. This demo build ships with a small sample dataset —
            see the README for how editorial content is sourced and verified
            before a production launch.
          </p>
        </div>
      </div>
      <div className="border-t border-vault-rule py-6 text-center text-xs text-parchment-dim font-mono">
        © {new Date().getFullYear()} History Vault. Educational use only.
      </div>
    </footer>
  );
}
