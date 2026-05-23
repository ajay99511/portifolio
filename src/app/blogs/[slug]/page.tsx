import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock3, CalendarDays, Tag } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center pt-24 pb-16">
      <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10 sm:mb-14">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-brand-neon/50 hover:text-brand-neon transition-colors font-mono text-xs uppercase tracking-widest mb-8"
          >
            <ArrowLeft size={14} />
            Back to Archive
          </Link>

          <div className="mb-6 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-widest text-brand-purple">
            <span className="bg-brand-purple/5 border border-brand-purple/20 px-2 py-1">{post.category}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-neon via-white to-brand-purple tracking-tighter uppercase mb-4 leading-none">
            {post.title}
          </h1>
          <p className="text-lg sm:text-xl text-blue-200/70 font-light mb-8 max-w-3xl leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-surface-border">
            <div className="flex items-center gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-widest text-blue-200/50">
              <span className="text-brand-neon">By {post.author}</span>
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span className="inline-flex items-center gap-1">
                <Clock3 size={13} />
                {post.readingTimeMinutes} min read
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 border border-brand-purple/30 bg-brand-purple/5 text-[9px] font-mono uppercase tracking-widest text-brand-purple"
                >
                  <Tag size={10} className="text-brand-purple" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="prose prose-invert max-w-none">
          <BlogMarkdown content={post.content} />
        </section>
      </article>
    </div>
  );
}
