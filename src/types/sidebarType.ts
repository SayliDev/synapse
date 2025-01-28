export interface Category {
  name: string;
  count: number;
  color: string;
}

export interface ChatActionsProps {
  chatId: string;
  onRename: (chatId: string) => void;
  onDelete: (chatId: string) => void;
  isExpanded: boolean;
}
