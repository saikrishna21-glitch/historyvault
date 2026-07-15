"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Toggles between the dark "Vault" theme and the light "Reading Room" theme.
 * The initial class is applied synchronously in app/layout.tsx (inline
 * script) to avoid a flash of the wrong theme on load.
 */
export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    window.localStorage.setItem("history-vault:theme", next ? "light" : "dark");
  }

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      className="grid place-items-center w-9 h-9 rounded-full border border-vault-rule text-gold hover:border-gold hover:bg-gold/10 transition-colors"
    >
      {isLight ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
