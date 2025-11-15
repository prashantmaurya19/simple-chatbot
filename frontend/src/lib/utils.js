import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @param {...import("clsx").ClassValue} inputs
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * return true if dark mode and false otherwise
 * @returns {boolean}
 */
export function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

export function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
}

