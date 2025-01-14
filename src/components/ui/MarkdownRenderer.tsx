import ReactMarkdown from "react-markdown";
import { memo } from "react";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "@/components/Markdown";

// Composant Markdown mémorisé
const MarkdownRenderer = memo(({ content }: { content: string }) => (
  <ReactMarkdown
    className="custom-pre-bg"
    remarkPlugins={[remarkGfm]}
    components={markdownComponents}
  >
    {content}
  </ReactMarkdown>
));

export default MarkdownRenderer;
