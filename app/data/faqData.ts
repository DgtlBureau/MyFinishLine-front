import { CircleQuestionMarkIcon, type LucideIcon } from "lucide-react";

interface IVariantsProps {
  id: number;
  question: string;
  sub_answer?: string;
  answer: {
    id: number;
    variant: string;
  }[];
}

interface IDataPrpps {
  id: number;
  isVisible: boolean;
  icon: LucideIcon;
  category: string;
  variants: IVariantsProps[];
}

export const faqData: IDataPrpps[] = [
  {
    id: 1,
    isVisible: true,
    icon: CircleQuestionMarkIcon,
    category: "all",
    variants: [
      {
        id: 1,
        question: "How do I join a challenge?",
        answer: [
          {
            id: 1,
            variant:
              "**Pick your journey:** Purchase a challenge from our store.",
          },
          {
            id: 2,
            variant:
              "**Check your email:** After purchase, we’ll automatically send you a 6-digit access code.",
          },
          {
            id: 3,
            variant:
              "**Open the App:** Go through link to the MyFinishLine to our website.",
          },
          {
            id: 4,
            variant:
              "**Activate:** Enter your code to unlock the challenge and start your adventure.",
          },
        ],
      },
      {
        id: 2,
        question: "Can I participate from any country?",
        answer: [
          {
            id: 1,
            variant:
              "Absolutely! MyFinishLine is a global community without location restrictions. We welcome participants from all over the world and ship our physical medals internationally upon completion.",
          },
        ],
      },
      {
        id: 3,
        question: "Do I need to be a professional athlete?",
        answer: [
          {
            id: 1,
            variant:
              "Not at all! Our challenges are designed for everyone. You can complete the distance at your own pace—whether you run, walk, hike, or cycle. It's about your personal progress.",
          },
        ],
      },
      {
        id: 4,
        question: "How do I track my distance?",
        sub_answer: "You have two options to log your miles:",
        answer: [
          {
            id: 1,
            variant:
              "**Automatic Sync:** Connect your fitness app or wearable. We support integration with **Strava, Garmin, Fitbit**. Your workouts will automatically sync to the challenge.",
          },
          {
            id: 2,
            variant:
              "**Manual Entry:** If you don't use a tracker or prefer to log it yourself (e.g., treadmill workouts), you can manually enter your distance and time directly in the app.",
          },
        ],
      },
      {
        id: 5,
        question: "What types of exercise count?",
        answer: [
          {
            id: 1,
            variant:
              "Any distance-based activity counts! This includes running, walking (even walking the dog), cycling, swimming, and more. You choose how you want to move toward the finish line.",
          },
        ],
      },
      {
        id: 6,
        question: "Can I do multiple challenges at once?",
        answer: [
          {
            id: 1,
            variant:
              "Yes. If you bought a bundle or multiple challenges, you can participate in them simultaneously or one by one. In the app, you simply select which challenge is 'Active' to ensure your miles count toward the specific route you are currently focusing on.",
          },
        ],
      },
      {
        id: 7,
        question: "Is there a time limit to finish?",
        answer: [
          {
            id: 1,
            variant:
              "Yes, you have **1 year (365 days)** from the date you purchase/activate the challenge to complete the distance. This is plenty of time to finish the route at a comfortable pace. If the challenge isn't completed within this timeframe, the progress may expire",
          },
        ],
      },
      {
        id: 8,
        question: "When can I register?",
        answer: [
          {
            id: 1,
            variant:
              "Registration is open year-round. You can start your journey whenever you are ready. Our global goal is to circle the Earth by the end of 2026, but your personal start date is up to you.",
          },
        ],
      },
      {
        id: 9,
        question: "What do I get for finishing?",
        answer: [
          {
            id: 1,
            variant:
              "Your main reward is a premium **physical medal** shipped to your door. Each medal represents a specific region. Inside the app, you also earn digital rewards like avatar skins, badges, and story chapters as you progress.",
          },
        ],
      },
      {
        id: 10,
        question: "How do I claim my medal?",
        answer: [
          {
            id: 1,
            variant:
              "Once you reach 100% of the distance for a specific challenge, the **'Claim Medal'** button will unlock in your profile. Simply click it, enter your current shipping address, and we will dispatch your reward.",
          },
        ],
      },
      {
        id: 11,
        question: "How much does it cost?",
        answer: [
          {
            id: 1,
            variant:
              "Pricing depends on the package you choose. Check the store page for current pricing.",
          },
        ],
      },
      {
        id: 12,
        question: "My activation code isn't working. What should I do?",
        answer: [
          {
            id: 1,
            variant:
              "Your code is linked to the email address you used at checkout. If you are having trouble, try activating it via your Profile settings inside the app. If it still doesn't work, please contact our support team.",
          },
        ],
      },
      {
        id: 13,
        question: "Is my data safe?",
        answer: [
          {
            id: 1,
            variant:
              "Yes, your privacy is our priority. We comply with strict privacy laws and API agreements (like Strava's). We do **not** share your private location maps or personal data with other users unless you explicitly choose to share specific non-sensitive achievements. We only use the distance data needed to move your avatar on the map.",
          },
        ],
      },
    ],
  },
];
