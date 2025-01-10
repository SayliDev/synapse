import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessageProps {
  content: string;
  isAi: boolean;
}

const ChatMessage = ({ content, isAi }: ChatMessageProps) => {
  return (
    <div
      className={`flex gap-4 items-start p-4 ${
        isAi ? "" : "flex-row-reverse text-right"
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
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-md !my-4 "
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
            {content.trim()}
          </ReactMarkdown>
        ) : (
          <p className="text-zinc-50">{content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
