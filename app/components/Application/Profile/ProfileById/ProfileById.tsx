"use client";

import ProfileUserline from "../ProfileUserline/ProfileUserline";
import { Challenges } from "./Challenges/Challenges";

export const ProfileById = ({ userId }: { userId: string | undefined }) => {

    return (
        <div className="w-full">
            <ProfileUserline userId={userId} />
            {userId && <Challenges userId={userId} />}
        </div>
    )
}