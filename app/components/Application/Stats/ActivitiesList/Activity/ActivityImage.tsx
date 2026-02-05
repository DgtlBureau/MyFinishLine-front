import Image, { StaticImageData } from "next/image"
import runnerIcon from '@/public/icons/activity-icons/runner.svg'
import walkIcon from '@/public/icons/activity-icons/walking.svg'
import workoutIcon from '@/public/icons/activity-icons/workout.svg'
import stairStepperIcon from '@/public/icons/activity-icons/stepper.svg'
import eBikeRideIcon from '@/public/icons/activity-icons/e-bike.svg'
import InlineSkateIcon from '@/public/icons/activity-icons/rolling.svg'
import cannoeIcon from '@/public/icons/activity-icons/cannoe.svg'
import rowingIcon from '@/public/icons/activity-icons/rowing.svg'
import StandUpPaddlingIcon from '@/public/icons/activity-icons/paddle.svg'
import skiingIcon from '@/public/icons/activity-icons/skiing.svg'
import iceSkateIcon from '@/public/icons/activity-icons/iceskating.svg'
import snowShoeIcon from '@/public/icons/activity-icons/snowshoe.svg'
import handCycleIcon from '@/public/icons/activity-icons/bicycle.svg'
import mountainCycleIcon from '@/public/icons/activity-icons/mountain-bike.svg'
import swimleIcon from '@/public/icons/activity-icons/swim.svg'
import rollerSkiIcon from '@/public/icons/activity-icons/skirolling.svg'
import whellChairIcon from '@/public/icons/activity-icons/wheelchair.svg'
import ellipticalIcon from '@/public/icons/activity-icons/stepper-2.svg'
import kayakingIcon from '@/public/icons/activity-icons/kayak.svg'
import virtualRunIcon from '@/public/icons/activity-icons/virtual-running.svg'
import { Activity as ActivityIcon } from "lucide-react";

type ActivityType =
    | 'run'
    | 'walk'
    | 'workout'
    | 'stairstepper'
    | 'ebikeride'
    | 'inlineskate'
    | 'canoeing'
    | 'rowing'
    | 'standuppaddling'
    | 'nordicski'
    | 'iceskate'
    | 'snowshoe'
    | 'handcycle'
    | 'ride'
    | 'swim'
    | 'rollerski'
    | 'wheelchair'
    | 'elliptical'
    | 'kayaking'
    | 'virtualrun'

const activityImages: Record<ActivityType, StaticImageData> = {
    run: runnerIcon,
    walk: walkIcon,
    workout: workoutIcon,
    stairstepper: stairStepperIcon,
    ebikeride: eBikeRideIcon,
    inlineskate: InlineSkateIcon,
    canoeing: cannoeIcon,
    rowing: rowingIcon,
    standuppaddling: StandUpPaddlingIcon,
    nordicski: skiingIcon,
    iceskate: iceSkateIcon,
    snowshoe: snowShoeIcon,
    handcycle: handCycleIcon,
    ride: mountainCycleIcon,
    swim: swimleIcon,
    rollerski: rollerSkiIcon,
    wheelchair: whellChairIcon,
    elliptical: ellipticalIcon,
    kayaking: kayakingIcon,
    virtualrun: virtualRunIcon,
}

export const ActivityImage = ({ sport_type }: { sport_type: string }) => {

    const key = sport_type.toLowerCase() as ActivityType

    const currentIcon =
        activityImages[key]

    return (

        <div className="w-[40px] min-w-[40px] h-[40px] p-2 flex items-center bg-white/20 backdrop-blur-xl backdrop-saturate-150 justify-center rounded-full shadow-lg border border-white/40">
            {currentIcon ? <Image src={currentIcon} width={20} height={20} alt={sport_type} className="object-contain" />
                :
                <ActivityIcon width={16} height={16} className="text-[#4A5FC1]" />}
        </div>

    )
}