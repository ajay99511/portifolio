# Contributing to Ajay's Portfolio

Thank you for your interest in contributing! Whether you are reporting an issue, suggesting an enhancement, or submitting improvements to documentation and project showcases, your contributions are welcome.

---

## 🧭 Overview & Architecture

This repository hosts the personal engineering portfolio for **Ajay Elika** ([@ajay99511](https://github.com/ajay99511)).

Key components of the architecture:
- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation & Motion:** [Framer Motion](https://www.framer.com/motion/)
- **Testing:** [Vitest](https://vitest.dev/), [@testing-library/react](https://testing-library.com/), [fast-check](https://fast-check.dev/) for property-based testing
- **Content:** Static Markdown with frontmatter parsing via `gray-matter` & `react-markdown`
- **Analytics:** `@vercel/analytics` and `@vercel/speed-insights`

---

## 🛠️ Development Setup

### 1. Prerequisites
- **Node.js:** v18.17+ or v20+ recommended
- **Package Manager:** `npm` (uses `package-lock.json`)

### 2. Installation
```bash
git clone https://github.com/ajay99511/portifolio.git
cd portifolio
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Testing & Verification

Before submitting any Pull Request, ensure that all linting and test suites pass:

```bash
# Run unit & property tests
npm test

# Run ESLint check
npm run lint

# Validate production build
npm run build
```

---

## 📝 Adding New Content

### Adding a New Project Demo
Refer to [`PROJECT_TEMPLATE.md`](PROJECT_TEMPLATE.md) and [`NEW_PROJECT_AGENT_PROMPT.md`](NEW_PROJECT_AGENT_PROMPT.md) for the mandatory step-by-step workflow:
1. Conduct deep source code analysis of the target application (color tokens, layout, navigation).
2. Create an interactive demo component in `src/components/demos/`.
3. Register the demo slug in `src/types/index.ts`.
4. Add project metadata and preview panels to `src/lib/projects.ts`.
5. Register the component in `src/components/ProjectInteractiveView.tsx`.

### Adding a New Blog Post
Refer to [`BLOGS_GUIDE.md`](BLOGS_GUIDE.md):
1. Create a new `.md` file in `src/content/blogs/` named `YYYY-MM-DD-your-slug.md`.
2. Fill in the frontmatter (`slug`, `title`, `description`, `author`, `publishedAt`, `tags`, `category`, etc.).
3. Write your content in Markdown with GitHub Flavored Markdown (tables, code blocks, checklists).

---

## 🌿 Git & Pull Request Guidelines

1. **Branch Naming:**
   - Features: `feature/short-description`
   - Bug fixes: `fix/short-description`
   - Documentation: `docs/short-description`
2. **Commit Messages:** Follow conventional commits:
   - `feat: add interactive demo for repo-pulse`
   - `fix: resolve mobile navigation backdrop overflow`
   - `docs: update blog guide frontmatter specifications`
3. **Pull Requests:** Open a PR against the `main` branch with a clear description of changes, screenshots for visual updates, and verification results.
