import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mic, Paperclip, Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const MessageBar = ({ onSendMessage }: ChatInputProps) => {
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Message sent!");
  //   (e.currentTarget as HTMLFormElement).reset();
  // };

  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-6xl mx-auto relative flex items-center gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-2 text-zinc-400 hover:text-zinc-50"
          aria-label="Attach file"
          type="button"
        >
          <Paperclip className="!h-5 !w-5" />
        </Button>
        <label htmlFor="message-input" className="sr-only">
          Type your message
        </label>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="pl-14 pr-24 h-14  !text-base sm:!text-lg  bg-zinc-800 border-zinc-700 text-zinc-50 placeholder:text-zinc-400 placeholder:text-sm sm:placeholder:text-base"
          placeholder="Type your message..."
        />

        <div className="absolute right-2 flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:!text-red-500"
            aria-label="Toggle voice input"
            type="button"
          >
            <Mic className="!h-5 !w-5" />
          </Button>

          <Button
            size="icon"
            variant="secondary"
            className="text-zinc-400 hover:text-zinc-50"
            aria-label="Send message"
            type="submit"
          >
            <Send className="!h-5 !w-5" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default MessageBar;
