export const profile = {
  name: "Ajay",
  role: "Full-Stack Software Engineer",
  location: "United States / Remote",
  status: "Azure Certified Developer",
  summary:
    "Results-driven Full-Stack Software Engineer with hands-on experience building scalable marketplace applications using modern technologies. Proficient in Node.js, React Native, TypeScript, and Azure Cloud Services with expertise in RESTful API design, microservices architecture, and containerized deployments using Docker and Kubernetes.",
  github: "https://github.com/ajay99511",
  linkedin: "https://www.linkedin.com/in/e-aj-47b71238b/",
  leetcode: "https://leetcode.com/u/ajay216/",
};

export const expertiseGroups = [
  {
    title: "Cloud & DevOps",
    skills: [
      "Azure (App Service, Functions, AKS)",
      "Azure Service Bus",
      "Azure Cosmos DB / Blob Storage",
      "Docker & Kubernetes",
      "CI/CD pipelines",
      "Azure DevOps",
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      "Node.js & Express.js",
      "ASP.NET Core / MVC",
      "Python / Flask",
      "RESTful APIs & GraphQL",
      "OAuth 2.0 / JWT / Passport.js",
      "Event-Driven Architecture",
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: [
      "React.js & Next.js",
      "React Native (Expo)",
      "TypeScript / JavaScript",
      "Angular",
      "Redux",
      "Bootstrap / Tailwind",
    ],
  },
  {
    title: "Data, Testing & AI",
    skills: [
      "PostgreSQL / SQL Server",
      "Redis Caching / BullMQ",
      "Jest & TDD",
      "Machine Learning",
      "scikit-learn / Pandas",
      "Python Data Science",
    ],
  },
];

export const timelineEntries = [
  {
    title: "Software Engineer",
    company: "SLK Holdings",
    period: "Jul 2024 — Present",
    highlights: [
      "Developed and shipped a full-stack C2C marketplace using Node.js, Express, and React Native with real-time features, cutting initial page load times by 40%.",
      "Deployed production infrastructure on Azure (App Services, Functions, Service Bus, Cosmos DB, AKS), containerized with Docker and orchestrated via Kubernetes.",
      "Built event-driven, asynchronous pipelines with Azure Service Bus and BullMQ for order fulfillment, reducing manual intervention by 90%.",
      "Reduced API response times by 60% through a Redis caching layer for shipping rates, token caching, and connection pooling on PostgreSQL schemas.",
      "Integrated Stripe Payment Gateway with idempotent webhooks and FedEx Shipping API for real-time tracking, cutting operational costs by 70%.",
    ],
  },
  {
    title: "Master of Science in Computer Science",
    company: "University of Central Missouri (GPA: 3.5)",
    period: "Dec 2022 — May 2024",
    highlights: [
      "Architected a full-stack dating platform with real-time messaging using .NET 8, Angular 16, and SignalR, achieving sub-500ms latency.",
      "Developed a Diabetes Prediction model using Python, XGBoost, and Flask APIs achieving 87% accuracy and deployed with <200ms API response time.",
      "Built normalized SQL Server databases utilizing Entity Framework and optimized stored procedures handling 100+ concurrent users.",
    ],
  },
  {
    title: "Azure Certified Developer Associate",
    company: "Microsoft",
    period: "Issued: 2024",
    highlights: [
      "Certified in designing, building, testing, and maintaining cloud applications and services on Microsoft Azure (AZ-204).",
      "Demonstrated expertise in deploying serverless functions, managing cloud infrastructure, and implementing Azure Key Vault security.",
    ],
  },
  {
    title: "Bachelor of Technology in Computer Science",
    company: "Jawaharlal Nehru Institute of Technology",
    period: "Aug 2018 — May 2022",
    highlights: [
      "Engineered an environmental ML model using Random Forest and scikit-learn for Soil Moisture Prediction with 82% accuracy.",
      "Processed 5,000+ data points, engineered domain-specific usage ratios, and performed correlation analysis using Pandas and SciPy.",
    ],
  },
  {
    title: "Open Source Projects & Achievements",
    company: "Independent Developer",
    period: "Ongoing",
    highlights: [
      "Built 'GitScripe': An agentic platform using a multi-agent LLM pipeline to transform raw Git history into structured intelligence with RAG chat.",
      "Developed 'Chronos Planner': A desktop-first, offline Flutter app powered by Drift ORM, Provider, and advanced desktop API bindings.",
      "Shipped 'FastBeat': A fully offline Jetpack Compose Android media player utilizing Media3 ExoPlayer, Hilt, and a Room persistent DB.",
      "Secured certifications including Google's Technical Support Fundamentals (2023) and UoM's Python for Everybody Specialization (2022).",
    ],
  },
];
