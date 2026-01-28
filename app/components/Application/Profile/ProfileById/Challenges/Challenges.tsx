import ChallengeCard from "@/app/components/ChallengeCard/ChallengeCard"

export const Challenges = ({ userId }: { userId: string }) => {
    return (
        <div className="flex flex-col justify-center px-4 pt-12 pb-4 relative max-w-4xl mx-auto">
            <h2 className="text-3xl font-medium text-center text-white mb-8">Challenges</h2>
            <ChallengeCard userId={userId} />
        </div>
    )
}