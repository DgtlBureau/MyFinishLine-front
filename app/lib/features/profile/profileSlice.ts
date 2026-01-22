import { IActiveChallenge } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProfile {
    id: number,
    first_name: string
    username: string
    last_name: string
    total_moving_time_hours: number
    total_activities_count: number
    total_distance: number
    avatar_url: string
    avatar_symbol: string
    avatar_color: string
    email: string
    full_avatar_url: string | null
    selected_banner: {
        id: number
        image_url: string
        contract_id: number
    } | null
    selected_skin: {
        id: number,
        image_url: string,
        contract_id: number,
        title: string,
        description: string
    } | null
    selected_frame?: { id: number; image_url: string } | null;
}

const initialState: {
    profile: IProfile
    challenges: IActiveChallenge[]
} = {
    profile: {
        id: 0,
        first_name: '',
        last_name: '',
        username: '',
        total_moving_time_hours: 0,
        total_activities_count: 0,
        total_distance: 0,
        avatar_symbol: '',
        avatar_url: '',
        email: '',
        avatar_color: '#fff',
        full_avatar_url: '',
        selected_skin: {
            id: 0,
            image_url: '',
            contract_id: 0,
            title: '',
            description: ''
        },
        selected_banner: {
            id: 0,
            image_url: '',
            contract_id: 0
        }
    },
    challenges: [],
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<IProfile>) => {
            state.profile = action.payload;
        },
        setUserProfieChallenges: (state, action: PayloadAction<IActiveChallenge[]>) => {
            state.challenges = action.payload;
        },
        clearProfile: () => {
            return initialState;
        },
    }
})

export const {
    setUserProfile,
    setUserProfieChallenges,
    clearProfile
} = profileSlice.actions;
export default profileSlice.reducer;