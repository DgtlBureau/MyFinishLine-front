import {
  Activity,
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
    title: "Level Up Your Running \n Unlock Your Achievements",
    subtitle:
      "Turn every run into an adventure. Complete quests, get achievements, and climb the leaderboards with our running platform.",
    description:
      "Over 2+ million players worldwide are gaming their way to fitness with MyFinishLine.",
    button_label: "Start Winning",
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
    title: "Choose Your Running Challenge",
    description: "Pick a challenge that matches your goals and fitness level",
    features: [
      {
        id: 1,
        icon: Trophy,
        title: "The Ultimate Finisher's Journey",
        description:
          "Run your way to earning an exclusive finisher's medal and collecting 7 achievement badges. Each badge represents a different running skill - from endurance to speed. Complete all your runs to unlock the full set and claim your medal. Track your progress through our app and watch your collection grow with every milestone you hit.",
        distance: "315km / 215mi",
        content: [
          {
            id: 1,
            title: "Earn Your Finisher's Medal",
            image: "/images/challenge-page/challenge1.jpg",
            paragraphs: [
              {
                id: 1,
                text: "Push your limits and conquer this virtual challenge to claim a spectacular finisher's medal, the ultimate symbol of your dedication and strength.",
              },
              {
                id: 2,
                text: "Designed for champions, this premium medal is a testament to the miles you've logged and the goals you've crushed.",
              },
              {
                id: 3,
                text: "It arrives presented on a performance-grade ribbon, housed in a sleek, collector's case worthy of your accomplishment.",
              },
              {
                id: 4,
                text: "Wear it with pride—you've earned it.",
              },
            ],
          },
          {
            id: 2,
            title: "Run a Legendary Virtual Route",
            image: "/images/challenge-page/challenge2.jpg",
            paragraphs: [
              {
                id: 1,
                text: "Embark on a 89-mile (143 km) virtual journey through iconic and challenging terrain. From the starting line in the urban wilds to the triumphant finish at the championship grounds, every step tells your story.",
              },
              {
                id: 2,
                text: "Our app is your digital coach and map. Sync your runs, track your progress in real-time, and watch as you advance mile by mile toward the finish line.",
              },
            ],
          },
          {
            id: 3,
            title: "Collect Your Achievement Badges",
            image: "/images/challenge-page/challenge3.jpg",
            paragraphs: [
              {
                id: 1,
                text: "Motivation is earned. As you clock your miles, you'll unlock a series of seven exclusive digital badges, each representing a core pillar of a runner's journey: endurance, speed, consistency, and more.",
              },
              {
                id: 2,
                text: "Complete the collection to prove you've mastered the challenge from every angle.",
              },
            ],
          },
          {
            id: 4,
            title: "Unlock Milestone Postcards",
            image: "/images/challenge-page/challenge4.png",
            paragraphs: [
              {
                id: 1,
                text: "Celebrate every victory along the way! At each major milestone, you'll receive a virtual postcard featuring stunning sports photography and words of inspiration.",
              },
              {
                id: 2,
                text: "Collect all 12 to visually document your entire epic journey from start to finish.",
              },
            ],
          },
        ],
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
        title: "The Championship Course Conquest",
        description:
          "Take on this 89-mile virtual race through iconic running terrain. From city streets to championship tracks, every mile brings new scenery. Sync your runs with our app to follow your progress on the interactive course map. Push through to the finish line to prove you've mastered this legendary distance.",
        distance: "143km / 89mi",
        image: {
          src: "/images/features-carousel/2.jpg",
          alt: "Issue tracking with less noise",
          width: 400,
          height: 400,
          className: "pt-4",
        },
        content: [
          {
            id: 2,
            title: "Conquer the Championship Course",
            image: "/images/challenge-page/challenge2.jpg",
            paragraphs: [
              {
                id: 1,
                text: "This is your race. Tackle a 89-mile (143 km) virtual course that pushes you through the heart of elite competition. From the grueling starting leg to the final stretch on the iconic track, you'll run a path designed for champions.",
              },
              {
                id: 2,
                text: "Your dedicated sports app is your command center. Log every training run and watch your avatar advance on a dynamic map. See your progress unfold with each workout, driving you closer to the ultimate finish line.",
              },
            ],
          },
        ],
      },
    ],
  },
  grid_block: {
    title: "Game features that level up your running",
    description:
      "Earn XP, complete daily quests, and climb seasonal leaderboards.",
    features: [
      {
        id: 1,
        image: "/images/features-grid/1.webp",
        imageAlt: "Running analytics dashboard",
        title: "Smart Run Tracking",
        description:
          "Track pace, distance, and elevation with GPS accuracy. Get personalized insights to optimize your training.",
        className: "lg:col-span-3",
        width: 423,
        height: 228,
      },
      {
        id: 2,
        image: "/images/features-grid/2.webp",
        imageAlt: "Running community features",
        title: "Running Community",
        description:
          "Connect with fellow runners, join group challenges, and share your achievements with a supportive community.",
        className: "lg:col-span-3",
        width: 435,
        height: 228,
      },
      {
        id: 3,
        image: "/images/features-grid/3.webp",
        imageAlt: "Performance analytics",
        title: "Advanced Performance Analytics",
        description:
          "Get comprehensive insights into your running performance with detailed metrics and progress tracking.",
        className: "lg:col-span-4",
        width: 599,
        height: 218,
      },
      {
        id: 4,
        image: "/images/features-grid/4.webp",
        imageAlt: "Training plans",
        title: "Personalized Training Plans",
        description:
          "Follow customized training programs designed for your fitness level and race goals.",
        className: "lg:col-span-2",
        width: 292,
        height: 215,
      },
      {
        id: 5,
        image: "/images/features-grid/5.webp",
        imageAlt: "Device integration",
        title: "Seamless Device Integration",
        description:
          "Sync with your favorite running watches, fitness trackers, and heart rate monitors.",
        className: "lg:col-span-3",
        width: 417,
        height: 175,
      },
      {
        id: 6,
        image: "/images/features-grid/6.webp",
        imageAlt: "Mobile running app",
        title: "Mobile Running Companion",
        description:
          "Take your running stats anywhere with our fully-featured mobile application.",
        className: "lg:col-span-3",
        width: 433,
        height: 155,
      },
    ],
  },
  list_block: {
    title: "Running intelligence built for modern athletes",
    decsription:
      "Stay ahead of your training goals. MyFinishLine turns your running data into actionable insights, so you can optimize performance, prevent injuries, and achieve new personal bests.",
    features: [
      {
        id: "performance",
        icon: Activity,
        title: "Track your runs with precision, not guesswork",
        description:
          "Say goodbye to manual logging. MyFinishLine turns GPS data and heart rate metrics into clear, actionable insights, so you can focus on what matters - your performance.",
        image: {
          src: "/images/features-showcase/1.webp",
          alt: "Running Performance Tracking",
          width: 500,
          height: 400,
        },
      },
      {
        id: "analytics",
        icon: TrendingUp,
        title: "Instant answers to your training questions",
        description:
          "MyFinishLine's powerful analytics make it easy to understand your progress, identify patterns, and adjust your training, no technical knowledge needed.",
        image: {
          src: "/images/features-showcase/2.webp",
          alt: "Training Analytics",
          width: 500,
          height: 400,
        },
      },
      {
        id: "community",
        icon: Users,
        title: "Connect with runners at your level",
        description:
          "Find your running tribe based on pace, goals, and location. Join group runs, share routes, and motivate each other to new achievements.",
        image: {
          src: "/images/features-showcase/3.webp",
          alt: "Running Community",
          width: 500,
          height: 400,
        },
      },
      {
        id: "goals",
        icon: Flag,
        title: "Set goals, track progress, celebrate wins",
        description:
          "Export your running data to create personalized training plans. Connect your running metrics with race results and personal achievements to see real progress.",
        image: {
          src: "/images/features-showcase/4.webp",
          alt: "Goal Tracking",
          width: 500,
          height: 400,
        },
      },
    ],
  },
  feedback_block: {
    // Carousel with feedback cards
    title: "Trusted by runners worldwide",
    description:
      "Join thousands of marathoners, casual joggers, and fitness enthusiasts who rely on MyFinishLine to plan, track, and achieve their running goals.",
    testimonials: [
      {
        id: "1",
        name: "Sarah Mitchell",
        title: "Marathon Runner",
        company: "Nike",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        companyLogo: {
          src: "/images/logos/nike.png",
          width: 67.5,
          height: 24,
        },
        testimonial:
          "MyFinishLine turned my daily run into an epic quest. I'm hooked on completing daily objectives!",
        className: COMMON_CARDS_CLASSNAMES.big,
      },
      {
        id: "2",
        name: "Alex Chen",
        title: "Trail Runner",
        company: "Spotify",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        testimonial:
          "The elevation tracking and trail maps helped me prepare for my first 50K. I've never had this much clarity in my training progress.",
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
          "We used to lose track of deliverables every week. With MyFinishLine, task ownership is crystal clear and timelines are actually realistic.",
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
          "MyFinishLine blended perfectly into our design-to-dev process. We organize prototypes, handoffs, and sprints without switching tools.",
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
          "Since adopting MyFinishLine, our feedback cycles became shorter and much more effective. It's a must-have for any growing product team.",
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
          "MyFinishLine makes it incredibly easy to manage cross-functional work. We’ve cut coordination time in half and deliver with better insights.",
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
          "We use MyFinishLine across all departments — from tech to support. Creating shared workflows has drastically improved internal communication.”",
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
          "MyFinishLine has completely transformed how we approach daily project planning and execution. Before switching, we constantly missed deadlines due to misalignment. Now, everyone knows what’s happening, who’s responsible, and when things are due. Our productivity skyrocketed, and team communication has never been clearer.",
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
          "I created a workspace, invited my co-founder, and started assigning tasks in 45 seconds. That’s how fast MyFinishLine works.",
        className: cn(
          COMMON_CARDS_CLASSNAMES.big,
          "lg:[&_blockquote]:text-4xl lg:[&_blockquote]:leading-tight lg:shadow-lg"
        ),
      },
    ],
  },
  faq_section: {
    title: "Frequently asked questions:",
    questions: [
      {
        id: "myfinishline-who-is-it-for",
        question: "What is MyFinishLine and how does the gamification work?",
        answer:
          "MyFinishLine turns running into an epic RPG adventure. You earn achievements for every milestone, level up your character, collect rare loot, and compete on leaderboards. It's designed for anyone who wants to make fitness fun and addictive.",
      },
      {
        id: "game-mechanics",
        question: "What kind of game elements can I expect?",
        answer:
          "You'll experience challenges, achievement badges, daily quests, seasonal events, loot boxes with virtual rewards, character progression, team challenges, and competitive leaderboards. Every run feels like leveling up in your favorite video game.",
      },
      {
        id: "multiplayer-features",
        question: "Can I play with friends?",
        answer:
          "Absolutely! Form running guilds with friends, challenge each other to head-to-head races, complete cooperative quests together, and climb the team leaderboards. The social features make running a multiplayer experience.",
      },
      {
        id: "rewards-system",
        question: "What kind of rewards can I earn?",
        answer:
          "You'll unlock character customization options, special titles, achievement badges, virtual gear, seasonal rewards, and exclusive content. Higher levels unlock legendary items and special abilities for your running avatar.",
      },
    ],
    contact_block: {
      title: "Ready to level up your running?",
      description:
        "Join the adventure! Our team of gaming and fitness experts is here to help you start your quest. Whether you're a casual jogger or aspiring running legend.",
      button_label: "Start Your Quest",
    },
  },
  pricing_block: {
    title: "Level Up Your Running Experience",
    description:
      "Unlock premium features, exclusive rewards, and enhanced gameplay with MyFinishLine Pro.",
    discount_label: "Save 25% on annual plan",
    plans: {
      individual: {
        title: "Adventurer Plan",
        subtitle: "Adventure",
        description: "Casual gamers & fitness explorers",
        monthlyPrice: 12,
        annualPrice: 9,
        popular: true,
        features: [
          { name: "Basic XP system & level progression", included: true },
          { name: "Daily quests & achievements", included: true },
          { name: "Standard loot boxes", included: true },
          { name: "Basic character customization", included: true },
          { name: "Advanced power-ups & boosts", included: false },
          { name: "Guild creation & management", included: false },
          { name: "Legendary loot drops", included: false },
          { name: "Priority seasonal events", included: false },
        ],
        cta: {
          text: "Start your adventure today",
          button: "Begin Quest",
        },
      },
      team: {
        title: "Guild Master Plan",
        subtitle: "Competitive",
        description: "A lot of challenges and achievements",
        monthlyPrice: 29,
        annualPrice: 22,
        popular: false,
        features: [
          { name: "Advanced XP multipliers & bonus systems", included: true },
          { name: "Epic weekly raids & team challenges", included: true },
          { name: "Premium loot boxes with rare drops", included: true },
          { name: "Full character customization & skins", included: true },
          { name: "Guild management tools & analytics", included: true },
          { name: "Legendary achievement hunting", included: true },
          { name: "Early access to new game modes", included: true },
          { name: "Priority support & game master access", included: true },
        ],
        cta: {
          text: "Unlock legendary status",
          button: "Go Legendary",
        },
      },
    },
  },
};

export default content;
