import Link from "next/link";
import { ArrowUpRight, Clock3, Tag } from "lucide-react";
import type { BlogPost } from "@/lib/blogs";
import { formatBlogDate } from "@/lib/blogs";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`neo-panel rounded-xl border border-zinc-800/85 group transition-transform hover:-translate-y-1 ${
        featured ? "p-5 sm:p-6" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
          {post.category}
        </span>
        <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-brand-cyan transition-colors" />
      </div>

      <h2 className={`${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"} font-semibold tracking-tight mb-2`}>
        <Link href={`/blogs/${post.slug}`} className="hover:text-brand-cyan transition-colors">
          {post.title}
        </Link>
      </h2>

      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4">{post.description}</p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-zinc-700 text-[10px] font-mono uppercase tracking-wider text-zinc-400"
          >
            <Tag size={11} className="text-brand-orange" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
        <span>{formatBlogDate(post.publishedAt)}</span>
        <span className="inline-flex items-center gap-1">
          <Clock3 size={12} />
          {post.readingTimeMinutes} min read
        </span>
      </div>
    </article>
  );
}
