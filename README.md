# Ajay Elika — Engineering Portfolio & Technical Showcase

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-729B1B?logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An interactive, high-fidelity engineering portfolio by **Ajay Elika** featuring technical project showcases, systems design thinking, faithfully replicated UI/algorithmic demos, and in-depth engineering blogs.

---

## 🚀 Live Demo

- **Live URL:** [https://ajayelika.vercel.app](https://ajayelika.vercel.app) *(or your deployed domain)*
- **GitHub Repository:** [https://github.com/ajay99511/portifolio](https://github.com/ajay99511/portifolio)

---

## ✨ Key Features & Architecture

- **🎮 High-Fidelity Interactive Project Replicas:**
  - **FastBeat:** Android Media3 audio player UI replica with real playback simulation and queue management.
  - **DayVault:** Flutter state architecture refactor demonstration.
  - **Chronos Planner:** Full interactive task planner and calendar suite.
  - **ICM Fraud Detection & DL Algorithms:** Machine learning analytics pipelines and deep learning interactive models.
  - **RepoPulse, GitScripe, DbPred, SMPred, SocialNetwork, PersonalAssist, and MdExplorer.**
- **📝 Static Markdown Blog Engine:**
  - Zero-database, statically generated articles via `gray-matter`, `react-markdown`, and `remark-gfm`.
  - Automatic reading time calculation, slug generation, and responsive typography.
- **🎨 Modern UI & Interaction Design:**
  - Smooth animations and fluid transitions powered by [Framer Motion](https://www.framer.com/motion/).
  - Custom interactive cursor with fine-pointer detection.
  - Dynamic Dark / Light theme toggle with `next-themes`.
  - Fully accessible keyboard navigation and focus-trapped dialogs (`useFocusTrap`).
- **🧪 Comprehensive Test Coverage:**
  - 40+ unit and property-based tests using [Vitest](https://vitest.dev/), [@testing-library/react](https://testing-library.com/), and [fast-check](https://fast-check.dev/).
  - Viewport overflow validation, typography compliance checks, and interactive component assertions.
- **⚡ Performance & Telemetry:**
  - Integrated with `@vercel/analytics` and `@vercel/speed-insights`.
  - Optimized font loading with `next/font` (Outfit, Space Grotesk, JetBrains Mono, Oxanium).

---

## 🛠️ Tech Stack

| Domain | Technologies |
| --- | --- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/), `@tailwindcss/postcss` |
| **Motion & Icons** | [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/) |
| **Content & Markdown** | `gray-matter`, `react-markdown`, `remark-gfm`, `rehype-slug`, `reading-time` |
| **Testing** | [Vitest](https://vitest.dev/), `@testing-library/react`, `jsdom`, [fast-check](https://fast-check.dev/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```text
portifolio/
├── .github/
│   ├── CODEOWNERS           # Repository code ownership declarations
│   └── workflows/
│       └── ci.yml           # Automated CI workflow (lint, test, build)
├── public/                  # Static assets (images, icons, resume PDF)
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── blogs/           # Blog listing and dynamic [slug] pages
│   │   ├── certifications/  # Certifications showcase
│   │   ├── contact/         # Contact form page
│   │   ├── preview/         # Attachment and PDF resume viewer
│   │   ├── privacy/         # Privacy policy pages
│   │   ├── projects/        # Project catalog and detail pages
│   │   ├── layout.tsx       # Root layout & global SEO metadata
│   │   └── page.tsx         # Portfolio landing page
│   ├── components/          # Reusable UI components
│   │   ├── blogs/           # Blog cards and markdown renderers
│   │   ├── demos/           # Interactive project demo replica components
│   │   ├── walkthrough/     # Step-by-step walkthrough engine
│   │   └── LayoutShell.tsx  # Navbar, footer, and shell wrappers
│   ├── content/
│   │   └── blogs/           # Static Markdown blog articles
│   ├── hooks/               # Custom React hooks (useFocusTrap, usePinnedProjects)
│   ├── lib/                 # Content parsers and project catalog data
│   └── types/               # TypeScript interfaces and type definitions
├── .env.example             # Environment configuration template
├── BLOGS_GUIDE.md           # Guide for publishing new blog articles
├── CHANGELOG.md             # Project version history
├── CONTRIBUTING.md          # Contribution guidelines
├── NEW_PROJECT_AGENT_PROMPT.md # AI Prompt to integrate new projects
├── PROJECT_TEMPLATE.md      # Canonical reference for project replicas
├── SECURITY.md              # Security vulnerability reporting policy
└── package.json             # Dependencies and scripts
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- **Node.js** (v18.17+ or v20+ recommended)
- **npm** (comes with Node.js)

### 2. Clone and Install
```bash
git clone https://github.com/ajay99511/portifolio.git
cd portifolio
npm install
```

### 3. Environment Variables
Copy the example environment file:
```bash
cp .env.example .env.local
```
Configure `NEXT_PUBLIC_SITE_URL` and optional form keys in `.env.local` if needed.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Command | Action |
| --- | --- |
| `npm run dev` | Starts local Next.js development server with Turbopack/Webpack |
| `npm run build` | Compiles and builds optimized production application |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs ESLint across all TypeScript and React files |
| `npm test` | Runs the full Vitest and property-based test suite |

---

## 📖 Contributor Guides

- **Adding a Project:** Read [`PROJECT_TEMPLATE.md`](PROJECT_TEMPLATE.md) and [`NEW_PROJECT_AGENT_PROMPT.md`](NEW_PROJECT_AGENT_PROMPT.md).
- **Publishing a Blog Post:** Read [`BLOGS_GUIDE.md`](BLOGS_GUIDE.md).
- **Submitting Pull Requests:** Read [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## 📄 License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

Developed with ❤️ by **[Ajay Elika](https://github.com/ajay99511)**.
