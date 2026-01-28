"use client";

import { ProfileById } from "@/app/components/Application/Profile/ProfileById/ProfileById";
import Loader from "@/app/components/Shared/Loader/Loader";
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
        <div className="min-h-screen pt-14" style={{
            background: `linear-gradient(to bottom,
                #5170D5 0%,
                #5575D5 8%,
                #5A7AD6 15%,
                #6080D6 22%,
                #6888D4 28%,
                #7090D0 34%,
                #7A9BC8 40%,
                #85A6C4 46%,
                #8FAEC0 52%,
                #99B6BC 58%,
                #A3BEB8 64%,
                #ADC6B4 70%,
                #B7CEB0 76%,
                #C1D6AC 82%,
                #CBDEA8 88%,
                #CEE9D8 100%
            )`
        }}>
            {isLoad ? <ProfileById userId={userId} /> : <div className="flex items-center justify-center w-full min-h-screen"><Loader /></div>}
        </div>
    );
}