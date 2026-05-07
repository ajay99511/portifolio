import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

interface BlogMarkdownProps {
  content: string;
}

export default function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <div className="blog-prose text-zinc-200">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-10 mb-5">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-10 mb-4">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mt-8 mb-3">{children}</h3>,
          p: ({ children }) => <p className="text-zinc-300 leading-8 mb-5 text-[15px] sm:text-base">{children}</p>,
          ul: ({ children }) => <ul className="mb-5 list-disc pl-6 space-y-2 text-zinc-300">{children}</ul>,
          ol: ({ children }) => <ol className="mb-5 list-decimal pl-6 space-y-2 text-zinc-300">{children}</ol>,
          li: ({ children }) => <li className="leading-7">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-brand-cyan/60 bg-brand-cyan/8 px-4 py-3 rounded-r-md mb-6 text-zinc-200 italic">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className={`${className} block bg-[#060b12] border border-zinc-800 rounded-lg p-4 overflow-x-auto text-[13px]`}>
                  {children}
                </code>
              );
            }

            return (
              <code className="bg-zinc-900 border border-zinc-700 rounded px-1.5 py-0.5 text-[0.9em] text-brand-cyan">
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
                className="text-brand-cyan hover:text-cyan-200 underline underline-offset-4"
              >
                {children}
              </a>
            );
          },
          hr: () => <hr className="my-8 border-zinc-800" />,
          table: ({ children }) => (
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border-collapse border border-zinc-800 text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border border-zinc-800 bg-zinc-900 px-3 py-2 text-left">{children}</th>,
          td: ({ children }) => <td className="border border-zinc-800 px-3 py-2 text-zinc-300">{children}</td>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
