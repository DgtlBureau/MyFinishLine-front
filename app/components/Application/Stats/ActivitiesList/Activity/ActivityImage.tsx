import Image from "next/image"


export const ActivityImage = ({ activityName }: { activityName: string }) => {
    return (
        <div className="">
            <Image src={''} width={78} height={78} alt={activityName} />
        </div>
    )
}