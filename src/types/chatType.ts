import { RefObject } from "react";

export interface Message {
  content: string;
  isAi: boolean;
  id: string;
  timestamp: string;
}

export interface ChatMessageProps {
  content: string;
  isAi: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

export interface ChatMessagesProps {
  currentChat: Chat | undefined;
  containerRef: RefObject<HTMLDivElement>;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export interface EnhancedMessage extends Message {
  id: string;
  status: string;
  annotations: string[];
  timestamp: string;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
}
