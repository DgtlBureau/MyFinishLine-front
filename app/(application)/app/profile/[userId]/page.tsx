"use client";

import { ProfileById } from "@/app/components/Application/Profile/ProfileById/ProfileById";
import ChallengesShimmer from "@/app/components/Shared/Shimmer/ChallengesShimmer/ChallengesShimmer";
import ProfileUserlineShimmer from "@/app/components/Shared/Shimmer/ProfileUserlineShimmer/ProfileUserlineShimmer";
import { setUserProfile } from "@/app/lib/features/profile/profileSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfile() {
    const pathname = usePathname();
    const router = useRouter();
    const userId = pathname.split("/").pop();
    const dispatch = useAppDispatch();
    const [isLoad, setIsLoad] = useState(false)

    const getUserProfile = async () => {
        try {
            const { data } = await axios.get("/api/profile/user", { params: { userId: userId } });
            dispatch(setUserProfile(data))
            setIsLoad(true)
        } catch (error: any) {
            setIsLoad(false)
            router.replace("/");
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [userId]);


    return (
        <div className="mt-[56px] flex items-center justify-center w-full">
            {isLoad ? <ProfileById userId={userId} /> : <div className="w-full min-h-screen"><ProfileUserlineShimmer /><ChallengesShimmer /></div>}
        </div>
    );
}