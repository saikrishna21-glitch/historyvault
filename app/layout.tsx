import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ReadingProgress";

export const metadata: Metadata = {
  metadataBase: new URL("https://history-vault.example.com"),
  title: {
    default: "History Vault — The Leaders and Events That Shaped the World",
    template: "%s | History Vault",
  },
  description:
    "An elegant, sourced archive of the world's greatest leaders and the most important events in human history — with citations to reputable references throughout.",
  keywords: [
    "world history",
    "historical leaders",
    "historical events",
    "history timeline",
    "biography archive",
  ],
  openGraph: {
    title: "History Vault",
    description:
      "Explore the complete history of the world's greatest leaders and its most important events.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "History Vault",
    description:
      "Explore the complete history of the world's greatest leaders and its most important events.",
  },
};

// Applied before hydration so the correct theme paints on first frame —
// prevents a flash of the wrong theme when a returning visitor prefers light.
const themeInitScript = `
  (function() {
    try {
      var stored = window.localStorage.getItem('history-vault:theme');
      if (stored === 'light') {
        document.documentElement.classList.add('light');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fraunces (display serif), Inter (body), IBM Plex Mono (data/citations) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ReadingProgress />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
