import { Category } from "@/types/sidebarType";

// Constantes de style
export const STYLE_CONSTANTS = {
  container: "flex flex-col w-full h-full justify-between overflow-hidden",
  messagesContainer: "flex-1 overflow-y-auto pt-28 sm:pt-0",
  messageWrapper:
    "lg:max-w-[70%] sm:max-w-[90%] max-w-[100%] mx-auto w-full pt-0 sm:pt-10 px-0 sm:px-6",
  messageBar:
    "sticky bottom-0 w-full max-w-[90%] sm:max-w-[70%] mx-auto bg-background/80 backdrop-blur-sm",
} as const;

export const CATEGORIES: Category[] = [
  { name: "Sales", count: 3, color: "white" },
  { name: "Marketing", count: 5, color: "white" },
  { name: "Negotiation", count: 2, color: "white" },
];

export const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-300",
  lime: "bg-lime-300",
  yellow: "bg-yellow-300",
  red: "bg-red-300",
  green: "bg-green-300",
  purple: "bg-purple-300",
  pink: "bg-pink-300",
  orange: "bg-orange-300",
  white: "bg-white",
};
