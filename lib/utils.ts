import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a birth/death year pair as "1769 – 1821" or "b. 1935" for the living.
export function formatLifespan(birth: number | null, death: number | null) {
  if (birth === null && death === null) return "";
  if (death === null) return `b. ${birth}`;
  return `${birth} – ${death}`;
}
