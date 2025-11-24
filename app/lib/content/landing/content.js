import {
  Flag,
  FlagTriangleLeft,
  Flame,
  Shield,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "../../utils";

const COMMON_CARDS_CLASSNAMES = {
  big: "col-span-4 lg:[&_blockquote]:text-base lg:[&_blockquote]:leading-loose lg:[&_blockquote]:text-foreground",
};

const content = {
  hero: {
    // Main top block with purple background
    title: "Optimize Your Workflow \n Accelerate Your Growth",
    subtitle:
      "Simplify project management and boost team productivity with our SaaS platform.",
    description:
      "Over 2+ million teams rely on Lumen to collaborate and get work done.",
    button_label: "Start Testing",
    image: "/images/hero.webp",
  },
  logos: [
    // Marquee (бегущая строка) with companies
    {
      name: "Booking.com",
      logo: "/images/logos/booking.svg",
      className: "dark:hidden",
      url: "https://booking.com",
    },
    {
      name: "Fortinet",
      logo: "/images/logos/fortinet.svg",
      className: "dark:hidden",
      url: "https://fortinet.com",
    },
    {
      name: "IBM",
      logo: "/images/logos/ibm.svg",
      className: "",
      url: "https://ibm.com",
    },
    {
      name: "Logitech",
      logo: "/images/logos/logitech.svg",
      className: "dark:hidden",
      url: "https://logitech.com",
    },
    {
      name: "Netflix",
      logo: "/images/logos/netflix.svg",
      className: "",
      url: "https://netflix.com",
    },
    {
      name: "Spotify",
      logo: "/images/logos/spotify.svg",
      className: "",
      url: "https://spotify.com",
    },
    {
      name: "T-Mobile",
      logo: "/images/logos/t-mobile.svg",
      className: "",
      url: "https://t-mobile.com",
    },
    {
      name: "TIBCO",
      logo: "/images/logos/tibc.svg",
      className: "",
      url: "https://tibco.com",
    },
  ],
  challenges: {
    // Carousel of challenges
    title: "Choose your Challenge",
    description: "Select your Challenge from the list",
    features: [
      {
        id: 1,
        icon: Flag,
        title: "Navigate your way through Russia",
        description: "A jogging challenge to make your moves",
        distance: "315km / 215mi",
        image: {
          src: "/images/features-carousel/1.webp",
          alt: "Navigate your work with clarity",
          width: 1300,
          height: 817,
          className: "ps-4 pt-4",
        },
      },
      {
        id: 2,
        icon: Flame,
        title: "Run with your friends",
        description: "Run and win prizes for all of your family members",
        distance: "315km / 215mi",
        image: {
          src: "/images/features-carousel/2.jpg",
          alt: "Issue tracking with less noise",
          width: 400,
          height: 400,
          className: "pt-4",
        },
      },
    ],
  },
  grid_block: {
    // Cards block
    title: "Feature management that fits your workflow",
    description:
      "Assign, prioritize, and monitor every feature with precision. Lumen helps teams ship faster by bringing structure to your development process, without slowing you down.",
    features: [
      {
        id: 1,
        image: "/images/features-grid/1.webp",
        imageAlt: "Feature management interface",
        title: "Smart Task Management",
        description:
          "Organize and prioritize tasks with intelligent automation that adapts to your workflow patterns.",
        className: "lg:col-span-3",
        width: 423,
        height: 228,
      },
      {
        id: 2,
        image: "/images/features-grid/2.webp",
        imageAlt: "Team collaboration dashboard",
        title: "Team Collaboration",
        description:
          "Connect with your team seamlessly through integrated communication and shared workspaces.",
        className: "lg:col-span-3",
        width: 435,
        height: 228,
      },
      {
        id: 3,
        image: "/images/features-grid/3.webp",
        imageAlt: "Analytics and reporting",
        title: "Advanced Analytics",
        description:
          "Get comprehensive insights into your project performance with detailed analytics and customizable reports.",
        className: "lg:col-span-4",
        width: 599,
        height: 218,
      },
      {
        id: 4,
        image: "/images/features-grid/4.webp",
        imageAlt: "Project timeline view",
        title: "Project Timeline",
        description:
          "Visualize project progress and milestones with interactive timeline views and dependency tracking.",
        className: "lg:col-span-2",
        width: 292,
        height: 215,
      },
      {
        id: 5,
        image: "/images/features-grid/5.webp",
        imageAlt: "Integration capabilities",
        title: "Seamless Integrations",
        description:
          "Connect with your favorite tools and services to create a unified workflow ecosystem.",
        className: "lg:col-span-3",
        width: 417,
        height: 175,
      },
      {
        id: 6,
        image: "/images/features-grid/6.webp",
        imageAlt: "Mobile application",
        title: "Mobile Ready",
        description:
          "Access your projects anywhere with our fully responsive mobile application.",
        className: "lg:col-span-3",
        width: 433,
        height: 155,
      },
    ],
  },
  list_block: {
    // List of cards
    title: "Feature intelligence built for modern product teams",
    decsription:
      "Stay ahead of user needs. Lumen turns your product features into actionable insights, so you can prioritize what matters, streamline delivery, and scale with confidence.",
    features: [
      {
        id: "security",
        icon: Shield,
        title: "Manage features with clarity, not clutter",
        description:
          "Say goodbye to messy event logs. Lumen turns real usage data into clear, grouped feature insights, so you can track what matters, not just what happened.",
        image: {
          src: "/images/features-showcase/1.webp",
          alt: "Advanced Security",
          width: 500,
          height: 400,
        },
      },
      {
        id: "performance",
        icon: Zap,
        title: "Instant answers to product usage questions",
        description:
          "Lumen’s powerful filters make it easy to get actionable usage insights, no SQL needed.",
        image: {
          src: "/images/features-showcase/2.webp",
          alt: "Lightning Fast Performance",
          width: 500,
          height: 400,
        },
      },
      {
        id: "collaboration",
        icon: Users,
        title: "Segment users by feature behavior",
        description:
          "Slice your audience based on real feature interaction.Find champions, trial users, and at-risk accounts in seconds.",
        image: {
          src: "/images/features-showcase/3.webp",
          alt: "Team Collaboration",
          width: 500,
          height: 400,
        },
      },
      {
        id: "analytics",
        icon: TrendingUp,
        title: "Export insights, tie them to business impact",
        description:
          "Send enriched usage data to your warehouse.Blend Lumen metrics with revenue, churn, or NPS to connect product behavior to outcomes.",
        image: {
          src: "/images/features-showcase/4.webp",
          alt: "Smart Analytics",
          width: 500,
          height: 400,
        },
      },
    ],
  },
  feedback_block: {
    // Carousel with feedback cards
    title: "Trusted by modern teams",
    description:
      "Join thousands of product managers, designers, and developers who rely on Lumen to plan, track, and deliver value without the chaos.",
    testimonials: [
      {
        id: "1",
        name: "Sarah Mitchell",
        title: "Head of Product",
        company: "Nike",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        companyLogo: {
          src: "/images/logos/nike.png",
          width: 67.5,
          height: 24,
        },
        testimonial:
          "Lumen has completely changed the way we present our project workflows. We can create visual boards, share tasks instantly, and demo progress live. It’s business-focused collaboration without the overhead.",
        className: COMMON_CARDS_CLASSNAMES.big,
      },
      {
        id: "2",
        name: "Alex Chen",
        title: "Senior Designer",
        company: "Spotify",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        testimonial:
          "Lumen was the missing layer between our product and engineering teams. We’ve never had this much clarity in how tasks move through the pipeline.",
        className: "col-span-2 ",
      },
      {
        id: "3",
        name: "Marcus Johnson",
        title: "VP Product",
        company: "T-Mobile",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        testimonial:
          "We used to lose track of deliverables every week. With Lumen, task ownership is crystal clear and timelines are actually realistic.",
        className: "col-span-2 ",
      },
      {
        id: "4",
        name: "Emily Davis",
        title: "Product Manager",
        company: "Booking",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        testimonial:
          "Lumen blended perfectly into our design-to-dev process. We organize prototypes, handoffs, and sprints without switching tools.",
        className: "col-span-2 ",
      },
      {
        id: "5",
        name: "Ben Parker",
        title: "Engineering Lead",
        company: "IBM",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        testimonial:
          "Since adopting Lumen, our feedback cycles became shorter and much more effective. It's a must-have for any growing product team.",
        className: "col-span-2 ",
      },
      {
        id: "6",
        name: "Samantha Lee",
        title: "Design Director",
        company: "Logitech",
        image:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
        testimonial:
          "Lumen makes it incredibly easy to manage cross-functional work. We’ve cut coordination time in half and deliver with better insights.",
        className: "col-span-2",
      },
      {
        id: "7",
        name: "David Kim",
        title: "CTO",
        company: "Fortinet",
        image:
          "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
        testimonial:
          "We use Lumen across all departments — from tech to support. Creating shared workflows has drastically improved internal communication.”",
        className: "col-span-2",
      },
      {
        id: "8",
        name: "Rachel Green",
        title: "Product Designer",
        company: "Zapier",
        image:
          "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
        companyLogo: {
          src: "/images/logos/zapiar.png",
          width: 105,
          height: 28,
        },
        testimonial:
          "Lumen has completely transformed how we approach daily project planning and execution. Before switching, we constantly missed deadlines due to misalignment. Now, everyone knows what’s happening, who’s responsible, and when things are due. Our productivity skyrocketed, and team communication has never been clearer.",
        className: cn(COMMON_CARDS_CLASSNAMES.big, ""),
      },
      {
        id: "9",
        name: "Mike Johnson",
        title: "Startup Founder",
        company: "Tailwind CSS",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
        companyLogo: {
          src: "/images/logos/tailwindcss.png",
          width: 130,
          height: 20,
        },
        testimonial:
          "I created a workspace, invited my co-founder, and started assigning tasks in 45 seconds. That’s how fast Lumen works.",
        className: cn(
          COMMON_CARDS_CLASSNAMES.big,
          "lg:[&_blockquote]:text-4xl lg:[&_blockquote]:leading-tight lg:shadow-lg"
        ),
      },
    ],
  },
  faq_section: {
    // Faq accordion
    title: "Frequently asked questions:",
    questions: [
      {
        id: "lumen-who-is-it-for",
        question: "What is Lumen and who is it for?",
        answer:
          "Lumen is a task and workflow management platform designed for product teams, developers, and creatives who want to move faster with clarity and control.",
      },
      {
        id: "technical-knowledge",
        question: "Can I use Lumen without technical knowledge?",
        answer:
          "Absolutely! Lumen is designed with simplicity in mind. You can start organizing tasks, creating workflows, and collaborating with your team without any technical background. The intuitive interface makes it easy for anyone to get started.",
      },
      {
        id: "integrations",
        question: "Does Lumen integrate with tools like Slack or Figma?",
        answer:
          "Yes, Lumen integrates seamlessly with popular tools including Slack, Figma, GitHub, Jira, and many more. You can connect your existing workflow tools to create a unified workspace that fits your team's needs.",
      },
      {
        id: "task-automation",
        question: "How does task automation work in Lumen?",
        answer:
          "Lumen offers intelligent task automation that helps streamline repetitive processes. You can set up custom rules, triggers, and workflows that automatically assign tasks, update statuses, send notifications, and move projects through different stages based on your defined criteria.",
      },
      {
        id: "security-compliance",
        question: "Is Lumen secure and compliant?",
        answer:
          "Security is our top priority. Lumen is built with enterprise-grade security features including end-to-end encryption, SOC 2 Type II compliance, GDPR compliance, and regular security audits. Your data is protected with industry-standard security protocols.",
      },
    ],
    contact_block: {
      title: "Still have questions?",
      description:
        "Let's talk. Our team is here to help you make the most of Lumen. Whether it's onboarding, integration, or support.",
      button_label: "Contact us",
    },
  },
  pricing_block: {
    // Pricing block with two cards
    title: "Power your progress with Pro Access",
    description:
      "Increase feature adoption and customer satisfaction with the right Lumen plan.",
    discount_label: "Save 25% on annual plan",
    plans: {
      individual: {
        title: "Individual Plan",
        subtitle: "Best option for solo",
        description: "Designers or Freelancers",
        monthlyPrice: 25,
        annualPrice: 19,
        popular: true,
        features: [
          { name: "Real-time task syncing", included: true },
          { name: "Basic project analytics", included: true },
          { name: "Custom workflows & automation", included: true },
          { name: "Cross-platform integrations", included: true },
          { name: "Unlimited boards & views", included: false },
          { name: "Priority support for teams", included: false },
          { name: "API access (Limited)", included: false },
          { name: "Community support", included: false },
        ],
        cta: {
          text: "Contact us for Custom CRM Integration",
          button: "Contact With Us",
        },
      },
      team: {
        title: "Power Users & Teams",
        subtitle: "Best option for team",
        description: "Agencies or Corporates",
        monthlyPrice: 59,
        annualPrice: 44,
        popular: false,
        features: [
          { name: "Advanced task syncing with dependencies", included: true },
          { name: "Smart automations & conditional triggers", included: true },
          { name: "In-depth usage insights & analytics", included: true },
          { name: "Priority team collaboration tools", included: true },
          { name: "CRM integrations", included: true },
          { name: "Developer toolkit", included: true },
          { name: "API access (Full)", included: true },
          { name: "Premium support & onboarding", included: true },
        ],
        cta: {
          text: "Connect us for Custom CRM Integration",
          button: "Contact With Us",
        },
      },
    },
  },
};

export default content;
