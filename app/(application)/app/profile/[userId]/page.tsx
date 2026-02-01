"use client";

import { ProfileById } from "@/app/components/Application/Profile/ProfileById/ProfileById";
import ChallengesShimmer from "@/app/components/Shared/Shimmer/ChallengesShimmer/ChallengesShimmer";
import ProfileUserlineShimmer from "@/app/components/Shared/Shimmer/ProfileUserlineShimmer/ProfileUserlineShimmer";
import { setUserProfile } from "@/app/lib/features/profile/profileSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/app/components/Shared/Loader/Loader";

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
        <div className="min-h-screen pt-14" style={{
            background: `linear-gradient(to bottom,
                #1a2a4a 0%,
                #1e2f4e 8%,
                #213352 15%,
                #243856 22%,
                #273c5a 28%,
                #2a405e 34%,
                #2a4a6a 40%,
                #284a64 46%,
                #264a5e 52%,
                #244a58 58%,
                #224a52 64%,
                #204a4c 70%,
                #1e4446 76%,
                #1c4040 82%,
                #1a3c3c 88%,
                #1a3a3a 100%
            )`
        }}>
            {isLoad ? <ProfileById userId={userId} /> : <div className="flex items-center justify-center w-full min-h-screen"><Loader /></div>}
        </div>
    );
}