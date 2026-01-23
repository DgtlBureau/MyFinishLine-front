import instance from "@/app/lib/utils/instance";
import { cookies } from "next/headers";

export const POST = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // const { data } = await instance.post(
    //   "/user/strava/connect",
    //   {
    //     access_token: tokenData.access_token,
    //     refresh_token: tokenData.refresh_token,
    //   },
    //   {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   },
    // );
  } catch (error) {}
};
