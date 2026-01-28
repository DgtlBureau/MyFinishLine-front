"use client"

import { useAppSelector } from "@/app/lib/hooks";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "../../ui/carousel";
import { Button } from "../../ui/button";
import { ArrowRight, Route, CircleDashed } from "lucide-react";
import Image from "next/image";
import amazoniaQuestImage from '@/public/images/landing/level-amazonia.webp'
import { useRouter } from "next/navigation";

export const ExperienceLevels = () => {
    const router = useRouter()
    const { products } = useAppSelector((state) => state.products);
    const data = products

    const handleChooseQuest = (questId: string | number) => {
        router.push(`/challenges/${questId}`)
    }

    return (
        <section
            id="levels"
            className="section-padding relative overflow-x-hidden bg-gradient-to-b from-white from-10% via-indigo-300/90 via-70% to-white-50"
        >
            <div className="container gap-8 lg:grid-cols-3">
                <div>
                    <h2 className="text-center text-4xl lg:text-5xl leading-12">Level Up Your <br /> Sports Experience</h2>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        skipSnaps: false,
                    }}
                    className="cursor-grab"
                >
                    <CarouselContent className="h-full mt-10">
                        {data.map((product, idx) => {

                            const isActive = product.challenge_info?.status?.type === 'active'

                            return (
                                <CarouselItem key={idx} className="basis-1/1 md:basis-1/2 lg:basis-1/3">
                                    <div className="relative flex flex-col rounded-3xl p-6 overflow-hidden aspect-[389/525]">
                                        {!isActive && <div className="absolutue w-fit flex items-center gap-1.5 top-0 left-0 z-10 p-[2px_8px] bg-[#D0EADA] rounded-md"><CircleDashed width={14} height={14} />Coming Soon</div>}
                                        <div className={`mt-auto flex flex-col gap-1.5 ${isActive ? 'z-10' : 'z-0'}`}>
                                            <div className={`flex items-center justify-between ${isActive ? 'z-20' : '1-0'}`}>
                                                <h3 className="text-[24px] text-white font-semibold leading-8">{product.name}</h3>
                                                <p className="flex items-center gap-1.5 text-[14px] text-white font-regular leading-6"><Route width={20} height={20} /> {product.challenge_info?.total_distance} km</p>
                                            </div>
                                            <p className={`text-[14px] text-white leading-6`}>{product.description}</p>
                                        </div>
                                        <div className={`flex items-center justify-between mt-6 ${isActive ? 'z-10' : 'z-0'}`}>
                                            <Button
                                                onClick={() => product.paddle_product_id && handleChooseQuest(product.paddle_product_id)}
                                                disabled={!product.paddle_product_id || !isActive}
                                                className="py-[10px] px-5 rounded-full text-sm leading-5"
                                            >
                                                Choose a Quest
                                                <ArrowRight width={16} height={16} />
                                            </Button>
                                            <p className="text-[24px] font-semibold text-white">${(Number(product.prices?.amount) / 100).toFixed(2)}</p>
                                        </div>
                                        <Image src={product.name.toLocaleLowerCase() === 'amazonia route' ? amazoniaQuestImage : (product.main_image || product.images)} fill alt={product.name} className="object-cover object-center -z-10" />
                                        {isActive ? <div
                                            className={`absolute bottom-0 left-0 right-0 h-[60%] backdrop-blur-md z-0`}
                                            style={{
                                                WebkitMaskImage:
                                                    "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)",
                                                maskImage:
                                                    "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)",
                                            }}
                                        /> : <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md w-full h-full" />}
                                        <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/80 via-black/60 to-transparent z-0" />
                                    </div>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}