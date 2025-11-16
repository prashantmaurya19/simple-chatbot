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

/**
 * @param {string} s
 * @param {number} max_length - max length of string s
 * @param {string} [trunc_str=".."] - i length exceeds then it is apeends
 */
export function truncate(s, max_length, trunc_str = "..") {
  return s.length > max_length
    ? s.substring(0, max_length - trunc_str.length) + trunc_str
    : s;
}
