import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-5 py-32 text-center">
      <p className="eyebrow">Record not found</p>
      <h1 className="font-display text-4xl mt-4">This page isn&apos;t in the archive.</h1>
      <p className="text-parchment-dim mt-4">
        The leader or event you're looking for may have been renamed or
        doesn't exist yet.
      </p>
      <Link
        href="/"
        className="inline-block mt-8 rounded-full bg-gold text-ink px-6 py-3 text-sm font-medium hover:bg-gold-bright transition-colors"
      >
        Return home
      </Link>
    </div>
  );
}
