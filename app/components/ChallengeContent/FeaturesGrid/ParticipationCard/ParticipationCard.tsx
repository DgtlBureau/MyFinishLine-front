import Image, { StaticImageData } from "next/image"

interface IParticipationProps {
    title: string
    subtitle?: string
    description: { id: number, text: string }[]
    image: StaticImageData | string
    reverse?: boolean
}

export const ParticipationCard = ({ title, subtitle, description, image, reverse = false }: IParticipationProps) => {
    return (
        <div className={`flex flex-col md:flex-row rounded-[8px] border-[1px] border-[#B7B9E2] overflow-hidden gap-4 md:gap-6 ${reverse ? 'md:flex-row-reverse' : ''}`}>
            <div className="relative w-full md:w-1/2 aspect-[37/32]">
                <Image src={image} fill alt={title} className="object-cover" />
            </div>
            <div className="px-4 pb-6 pt-2 md:p-8 lg:p-12 w-full md:w-1/2 flex flex-col items-center justify-center gap-4 md:gap-6">
                <h3 className="font-semibold text-xl sm:text-2xl lg:text-3xl leading-[1] bg-gradient-to-r from-[#3B559D] to-[#66AF69] bg-clip-text text-transparent">
                    {title}
                    {subtitle && (<>
                        : <span className="text-black">{subtitle}: </span>
                    </>)}
                </h3>
                <ol className="list-disc pl-5">{description.map((item) => (<li key={item.id} className="text-base md:text-lg text-[#71717A]"><p>{item.text}</p></li>))}</ol>
            </div>
        </div>
    )
}