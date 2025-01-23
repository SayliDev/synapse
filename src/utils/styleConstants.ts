// Constantes de style
const STYLE_CONSTANTS = {
  container: "flex flex-col w-full h-full justify-between overflow-hidden",
  messagesContainer: "flex-1 overflow-y-auto pt-28 sm:pt-0",
  messageWrapper:
    "lg:max-w-[70%] sm:max-w-[90%] max-w-[100%] mx-auto w-full pt-0 sm:pt-10 px-0 sm:px-6",
  messageBar:
    "sticky bottom-0 w-full max-w-[90%] sm:max-w-[70%] mx-auto bg-background/80 backdrop-blur-sm",
} as const;

export default STYLE_CONSTANTS;
