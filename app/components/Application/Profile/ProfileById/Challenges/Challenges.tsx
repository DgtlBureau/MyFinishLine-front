import ChallengeCard from "@/app/components/ChallengeCard/ChallengeCard"

export const Challenges = ({ userId }: { userId: string }) => {
    return (
        <div className="flex flex-col justify-center px-2 pt-12 pb-4 rounded-tl-xl rounded-tr-xl relative max-w-4xl mx-auto">
            <h2 className="text-[32px] text-center">Challenges</h2>
            <ChallengeCard userId={userId} />
        </div>
    )
}