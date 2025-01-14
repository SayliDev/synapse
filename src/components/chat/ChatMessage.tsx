import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MessageActions from "./MessageActions";

interface ChatMessageProps {
  content: string;
  isAi: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ChatMessage = ({ content, isAi, containerRef }: ChatMessageProps) => {
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current && messageRef.current) {
      const container = containerRef.current;
      const messageElement = messageRef.current;

      // Calcule la position de défilement nécessaire
      const scrollPosition =
        messageElement.offsetTop + messageElement.clientHeight;
      const containerHeight = container.clientHeight;
      const offset = 100; // Ajoute un offset pour compenser la barre de message

      container.scrollTo({
        top: scrollPosition - containerHeight + offset,
        behavior: "smooth",
      });
    }
  }, [containerRef]);

  useEffect(() => {
    setVisibleWords([]);

    if (isAi) {
      const words = content.split(" ");
      let index = 0;

      const interval = setInterval(() => {
        if (index < words.length) {
          setVisibleWords((prev) => {
            const newWords = [...prev, words[index]];
            setTimeout(scrollToBottom, 0);
            return newWords;
          });
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    } else {
      setVisibleWords(content.split(" "));
      setTimeout(scrollToBottom, 0);
    }
  }, [content, isAi, scrollToBottom]);

  return (
    <div
      ref={messageRef}
      className={`flex gap-4 items-start p-4 ${
        isAi ? "" : "flex-row-reverse text-right items-start"
      }`}
    >
      <Avatar>
        {isAi ? (
          <AvatarFallback>IA</AvatarFallback>
        ) : (
          <AvatarImage src="https://github.com/shadcn.png" alt="user" />
        )}
      </Avatar>
      <div className={`flex-1 ${isAi ? "prose prose-invert" : ""}`}>
        {isAi ? (
          <ReactMarkdown
            className="custom-pre-bg"
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark as any}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md !my-4"
                    showLineNumbers
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props}>{children}</code>
                );
              },
              p: ({ children }) => <p className="my-2">{children}</p>,
              ul: ({ children }) => (
                <ul className="list-disc list-inside my-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside my-4">{children}</ol>
              ),
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold my-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold my-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-bold my-2">{children}</h3>
              ),
              strong: ({ children }) => (
                <strong className="font-bold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
          >
            {visibleWords.join(" ")}
          </ReactMarkdown>
        ) : (
          <p className="text-zinc-50">{content}</p>
        )}
        <MessageActions isAi={isAi} />
      </div>
    </div>
  );
};

export default ChatMessage;
