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
      className={`bg-surface-raised/50 rounded-xl border border-surface-border group transition-transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,240,255,0.06)] ${
        featured ? "p-5 sm:p-6" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-500 group-hover:text-brand-neon/60 transition-colors">
          {post.category}
        </span>
        <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-brand-neon transition-colors" />
      </div>

      <h2 className={`${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"} font-semibold tracking-tight mb-2 text-white`}>
        <Link href={`/blogs/${post.slug}`} className="hover:text-brand-neon transition-colors">
          {post.title}
        </Link>
      </h2>

      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-4">{post.description}</p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-none border border-brand-purple/30 bg-brand-purple/5 text-[11px] font-mono uppercase tracking-wider text-brand-purple"
          >
            <Tag size={11} className="text-brand-purple" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-zinc-500 group-hover:text-brand-neon/50 transition-colors">
        <span>{formatBlogDate(post.publishedAt)}</span>
        <span className="inline-flex items-center gap-1">
          <Clock3 size={12} />
          {post.readingTimeMinutes} min read
        </span>
      </div>
    </article>
  );
}
