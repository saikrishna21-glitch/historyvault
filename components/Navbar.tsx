"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ScrollText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/leaders", label: "Leaders" },
  { href: "/events", label: "Events" },
  { href: "/timeline", label: "Timeline" },
  { href: "/search", label: "Search" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-vault-rule">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <ScrollText size={20} className="text-gold" />
            <span className="font-display text-lg tracking-wide">
              History <span className="text-gold">Vault</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="eyebrow text-parchment-dim hover:text-gold transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="md:hidden grid place-items-center w-9 h-9 rounded-full border border-vault-rule text-gold"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="md:hidden glass border-b border-vault-rule px-5 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="eyebrow text-parchment hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
