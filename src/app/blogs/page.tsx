import Link from "next/link";
import { ArrowUpRight, Clock3, Tag } from "lucide-react";
import { BlogPost, formatBlogDate, getAllBlogPosts, getFeaturedBlogPosts } from "@/lib/blogs";

function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={`bg-surface-raised/50 rounded-none border border-surface-border group transition-all hover:-translate-y-1 ${
        featured ? "p-5 sm:p-6 shadow-[0_0_30px_rgba(0,240,255,0.06)]" : "p-4 sm:p-5"
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-neon/60">
          {post.category}
        </span>
        <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-brand-neon transition-colors" />
      </div>

      <h2 className={`${featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"} font-semibold text-white tracking-tight mb-2`}>
        <Link href={`/blogs/${post.slug}`} className="hover:text-brand-neon transition-colors">
          {post.title}
        </Link>
      </h2>

      <p className="text-blue-200/60 font-light text-sm sm:text-base leading-relaxed mb-4">{post.description}</p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-none border border-brand-purple/30 bg-brand-purple/5 text-[10px] font-mono uppercase tracking-wider text-brand-purple"
          >
            <Tag size={11} className="text-brand-purple" />
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-wider text-brand-neon/50">
        <span>{formatBlogDate(post.publishedAt)}</span>
        <span className="inline-flex items-center gap-1">
          <Clock3 size={12} />
          {post.readingTimeMinutes} min read
        </span>
      </div>
    </article>
  );
}

export default async function Blogs() {
  const [posts, featuredPosts] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPosts(1),
  ]);

  const featured = featuredPosts[0] ?? posts[0];
  const remaining = featured
    ? posts.filter((post: BlogPost) => post.slug !== featured.slug)
    : posts;

  return (
    <div className="min-h-screen bg-surface-bg flex flex-col items-center">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-brand-neon/40 bg-brand-neon/5 text-brand-neon font-mono text-[10px] uppercase tracking-widest mb-4">
            Knowledge Stream
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-gradient-mid to-brand-purple tracking-tighter uppercase mb-4">Blogs & Insights</h1>
          <p className="text-blue-200/60 font-light max-w-3xl text-sm sm:text-base leading-relaxed">
            A living archive of engineering decisions, architecture patterns, and practical lessons from building modern systems.
          </p>
        </div>

        {featured ? (
          <div className="mb-10 sm:mb-14">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-purple mb-3">Featured Post</p>
            <BlogCard post={featured} featured />
          </div>
        ) : null}

        {remaining.length > 0 ? (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-neon/60 mb-4">Recent Posts</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {remaining.map((post: BlogPost) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        ) : !featured ? (
          <div className="bg-surface-raised/50 border border-surface-border p-8 sm:p-12 text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-brand-neon/50 mb-2">No blog posts yet</p>
            <p className="text-blue-200/60 text-sm">Create your first markdown post inside src/content/blogs.</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
