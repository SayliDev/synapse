export interface Message {
  content: string;
  isAi: boolean;
}

export interface ChatMessageProps {
  content: string;
  isAi: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export interface EnhancedMessage extends Message {
  id: string;
  timestamp: Date;
}
