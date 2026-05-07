import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock3, CalendarDays, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import BlogCard from "@/components/blogs/BlogCard";
import BlogMarkdown from "@/components/blogs/BlogMarkdown";
import {
  formatBlogDate,
  getBlogPostBySlug,
  getBlogSlugs,
  getRelatedBlogPosts,
} from "@/lib/blogs";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || post.draft) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || post.draft) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(post.slug, post.tags, 3);

  return (
    <main id="main-content" className="min-h-screen bg-black">
      <Navbar />

      <article className="section-px pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            Back_To_Blogs
          </Link>
        </div>

        <header className="mb-8 sm:mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-zinc-700 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              {post.category}
            </span>
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-zinc-700 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                <Tag size={11} className="text-brand-orange" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4 max-w-4xl">{post.title}</h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed mb-5">{post.description}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} />
              {formatBlogDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={13} />
              {post.readingTimeMinutes} min read
            </span>
            <span>By {post.author}</span>
          </div>
        </header>

        <div className="neo-panel rounded-xl border border-zinc-800/90 p-5 sm:p-8 lg:p-10">
          <BlogMarkdown content={post.content} />
        </div>

        {relatedPosts.length > 0 ? (
          <section className="mt-12 sm:mt-16">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-5">Related Posts</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <footer className="py-8 sm:py-12 section-px border-t border-white/8 bg-black/85 text-center safe-bottom">
        <p className="font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-[0.18em]">
          Copyright 2026 AJAY // BLOG_READER
        </p>
      </footer>
    </main>
  );
}
