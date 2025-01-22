import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* -------------------------------------------------------------------------- */
/*                              Merge classnames                              */
/* -------------------------------------------------------------------------- */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* -------------------------------------------------------------------------- */
/*                      Generate initials from full name                      */
/* -------------------------------------------------------------------------- */

export function getInitials(fullName: string): string {
  if (!fullName) return "??";
  const names = fullName.split(" ");
  const initials = names
    .filter((name) => name.length > 0)
    .map((name) => name[0].toUpperCase())
    .slice(0, 2)
    .join("");
  return initials || "??";
}
