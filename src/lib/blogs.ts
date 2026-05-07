import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOGS_DIRECTORY = path.join(process.cwd(), "src", "content", "blogs");
const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx"]);

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  coverImage?: string;
  readingTimeMinutes: number;
  featured: boolean;
  draft: boolean;
  content: string;
}

function inferSlug(fileName: string) {
  return fileName.replace(path.extname(fileName), "").toLowerCase();
}

function toIsoDateString(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) return fallback;

  return new Date(parsed).toISOString().slice(0, 10);
}

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizePost(data: Record<string, unknown>, fallbackSlug: string, content: string): BlogPost {
  const slugFromData = typeof data.slug === "string" ? data.slug.trim().toLowerCase() : "";
  const slug = slugFromData || fallbackSlug;

  const title = typeof data.title === "string" && data.title.trim() ? data.title.trim() : slug;
  const description =
    typeof data.description === "string" && data.description.trim()
      ? data.description.trim()
      : "No description provided.";
  const author = typeof data.author === "string" && data.author.trim() ? data.author.trim() : "Ajay";

  const publishedAt = toIsoDateString(data.publishedAt, "1970-01-01");
  const updatedAtRaw = toIsoDateString(data.updatedAt, publishedAt);
  const updatedAt = updatedAtRaw === publishedAt ? undefined : updatedAtRaw;

  const tags = toStringArray(data.tags);
  const category =
    typeof data.category === "string" && data.category.trim() ? data.category.trim() : "Engineering";
  const coverImage = typeof data.coverImage === "string" && data.coverImage.trim() ? data.coverImage.trim() : undefined;

  const readingTimeMinutes =
    typeof data.readingTimeMinutes === "number" && Number.isFinite(data.readingTimeMinutes)
      ? Math.max(1, Math.round(data.readingTimeMinutes))
      : Math.max(1, Math.round(readingTime(content).minutes));

  const featured = data.featured === true;
  const draft = data.draft === true;

  return {
    slug,
    title,
    description,
    author,
    publishedAt,
    updatedAt,
    tags,
    category,
    coverImage,
    readingTimeMinutes,
    featured,
    draft,
    content,
  };
}

const readAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  let fileNames: string[] = [];

  try {
    fileNames = await fs.readdir(BLOGS_DIRECTORY);
  } catch (error) {
    const typedError = error as NodeJS.ErrnoException;
    if (typedError.code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const markdownFiles = fileNames.filter((fileName) =>
    SUPPORTED_EXTENSIONS.has(path.extname(fileName).toLowerCase())
  );

  const posts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const absolutePath = path.join(BLOGS_DIRECTORY, fileName);
      const rawFile = await fs.readFile(absolutePath, "utf8");
      const { data, content } = matter(rawFile);

      return normalizePost(data as Record<string, unknown>, inferSlug(fileName), content);
    })
  );

  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate blog slug detected: ${post.slug}`);
    }
    slugs.add(post.slug);
  }

  return posts.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
});

export async function getAllBlogPosts(options?: { includeDrafts?: boolean }) {
  const includeDrafts = options?.includeDrafts ?? false;
  const posts = await readAllBlogPosts();
  return includeDrafts ? posts : posts.filter((post) => !post.draft);
}

export async function getFeaturedBlogPosts(limit = 3) {
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.featured).slice(0, limit);
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getAllBlogPosts({ includeDrafts: true });
  return posts.find((post) => post.slug === slug);
}

export async function getBlogSlugs() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => post.slug);
}

export async function getRelatedBlogPosts(currentSlug: string, tags: string[], limit = 3) {
  const posts = await getAllBlogPosts();
  const tagSet = new Set(tags.map((tag) => tag.toLowerCase()));

  return posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const overlap = post.tags.filter((tag) => tagSet.has(tag.toLowerCase())).length;
      return { post, overlap };
    })
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || Date.parse(b.post.publishedAt) - Date.parse(a.post.publishedAt))
    .slice(0, limit)
    .map((entry) => entry.post);
}

export function formatBlogDate(dateValue: string) {
  return new Date(`${dateValue}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
