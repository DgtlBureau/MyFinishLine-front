import smilePeopleIcom from '@/public/images/landing/placeholders.webp'
import womenSmileIcom from '@/public/images/landing/woman-smile.webp'
import runningManIcom from '@/public/images/landing/running-man.webp'
import hikingIcom from '@/public/images/landing/traveling.webp'
import familyIcom from '@/public/images/landing/family.webp'

export const participationContent = [
    {
        id: 1,
        title: 'For Young people', subtitle: 'Move, explore, and become the hero of your own story',
        image: smilePeopleIcom,
        description: [
            { id: 1, text: 'Turns physical activity into an immersive adventure, not a routine' },
            { id: 2, text: 'Progress unlocks new chapters, locations, and achievements' },
            { id: 3, text: 'Builds consistency and self-discipline through storytelling and gamification' },
            { id: 4, text: 'A global format that connects movement with curiosity and discovery' },
        ]
    },
    {
        id: 2,
        image: womenSmileIcom,
        title: 'For Sport Beginners', subtitle: 'Start your journey at your own pace',
        description: [
            { id: 1, text: 'No pressure — progress is personal' },
            { id: 2, text: 'Clear milestones make the first steps simple and motivating' },
            { id: 3, text: 'Designed to help build a habit, not chase performance' },
            { id: 4, text: 'Movement becomes part of a meaningful story, not an obligation' },
        ]

    },
    {
        id: 3,
        image: runningManIcom,
        title: 'For Professional Athlete', subtitle: 'Structure, motivation, and meaning beyond numbers',
        description: [
            { id: 1, text: 'Adds narrative and emotional depth to daily training routines' },
            { id: 2, text: 'Works as a parallel motivation layer alongside professional programs' },
            { id: 3, text: 'Helps maintain consistency during off-season or recovery phases' },
            { id: 4, text: 'A new way to engage with sport beyond performance metrics' },
        ]

    },
    {
        id: 4,
        image: hikingIcom,
        title: 'For Fitness Enthusiasts', subtitle: 'Rediscover the joy of movement',
        description: [
            { id: 1, text: 'Refreshes training routines with purpose and exploration' },
            { id: 2, text: 'Encourages long-term consistency through milestones and rewards' },
            { id: 3, text: 'Combines personal progress with a sense of global journey' },
            { id: 4, text: 'Makes everyday activity feel intentional and rewarding' },
        ]

    },
    {
        id: 5,
        image: familyIcom,
        title: 'For Active Adults & Life-Experience Generation', subtitle: 'Move at your rhythm, enjoy the journey',
        description: [
            { id: 1, text: 'Designed for flexible pace and personal comfort' },
            { id: 2, text: 'Encourages gentle, regular movement without pressure' },
            { id: 3, text: 'Provides motivation through storytelling, not competition' },
            { id: 4, text: 'A meaningful way to stay active, curious, and engaged' },
        ]

    },
]