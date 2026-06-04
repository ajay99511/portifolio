import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

interface BlogMarkdownProps {
  content: string;
}

export default function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <div className="text-blue-100">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-gradient-mid to-brand-purple tracking-tighter uppercase mt-10 mb-5">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tighter uppercase mt-10 mb-4">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-8 mb-3">{children}</h3>,
          p: ({ children }) => <p className="text-blue-200/70 leading-8 mb-5 text-sm sm:text-base font-light">{children}</p>,
          ul: ({ children }) => <ul className="mb-5 list-disc list-outside pl-6 space-y-2 text-muted marker:text-neon-muted">{children}</ul>,
          ol: ({ children }) => <ol className="mb-5 list-decimal list-outside pl-6 space-y-2 text-muted marker:text-neon-muted">{children}</ol>,
          li: ({ children }) => <li className="leading-7 pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-brand-purple/60 bg-brand-purple/10 px-4 py-3 rounded-none mb-6 text-blue-200/80 italic shadow-[inset_0_0_20px_rgba(112,0,255,0.05)]">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className={`${className} block bg-surface-raised border border-surface-border rounded-none p-4 overflow-x-auto text-xs sm:text-sm text-brand-neon font-mono`}>
                  {children}
                </code>
              );
            }

            return (
              <code className="bg-brand-neon/10 border border-brand-neon/30 rounded-none px-1.5 py-0.5 text-[0.9em] text-brand-neon font-mono">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="mb-6">{children}</pre>,
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http://") || href?.startsWith("https://");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-brand-neon hover:text-white underline underline-offset-4 decoration-neon-muted transition-colors font-mono"
              >
                {children}
              </a>
            );
          },
          hr: () => <hr className="my-8 border-surface-border" />,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-surface-border text-sm font-mono text-left">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border border-surface-border bg-surface-raised px-3 py-2 text-brand-neon uppercase tracking-wider">{children}</th>,
          td: ({ children }) => <td className="border border-surface-border px-3 py-2 text-blue-200/70">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
