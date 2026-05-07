import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/blogs/BlogCard";
import { getAllBlogPosts, getFeaturedBlogPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Engineering notes, architecture patterns, and implementation playbooks by Ajay.",
};

export default async function BlogsPage() {
  const [posts, featuredPosts] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPosts(1),
  ]);

  const featured = featuredPosts[0] ?? posts[0];
  const remaining = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : posts;

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Navbar />

      <section className="section-px pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700/80 bg-zinc-900/50 text-zinc-300 font-mono text-[10px] uppercase tracking-widest mb-4">
            Knowledge Stream
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">Blogs & Insights</h1>
          <p className="text-zinc-400 max-w-3xl text-sm sm:text-base leading-relaxed">
            A living archive of engineering decisions, architecture patterns, and practical lessons from building modern systems.
          </p>
        </div>

        {featured ? (
          <div className="mb-10 sm:mb-14">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-orange mb-3">Featured Post</p>
            <BlogCard post={featured} featured />
          </div>
        ) : null}

        {remaining.length > 0 ? (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-4">Recent Posts</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {remaining.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        ) : !featured ? (
          <div className="neo-panel rounded-xl border border-zinc-800/85 p-8 sm:p-12 text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-2">No blog posts yet</p>
            <p className="text-zinc-400 text-sm">Create your first markdown post inside `src/content/blogs`.</p>
          </div>
        ) : null}
      </section>

      <footer className="py-8 sm:py-12 section-px border-t border-white/8 bg-black/85 text-center safe-bottom">
        <p className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-[0.18em]">
          Copyright 2026 AJAY // ENGINEERING_BLOG
        </p>
      </footer>
    </main>
  );
}
