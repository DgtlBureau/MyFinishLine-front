import content from '@/app/lib/content/landing/content';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Image from 'next/image';
import { cn } from "@/app/lib/utils";
import { Autoplay } from "swiper/modules";

interface IFeedbackCardProps {
    name: string,
    subtitle: string,
    description: string,
    image: string
}


const swiperBreakpoints = {
    0: { slidesPerView: 1.2 },
    480: { slidesPerView: 1.5 },
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 3.5 },
};

const testimonials = content.feedback_block.testimonials;

const FeedbackCard = ({ name, subtitle, description, image }: IFeedbackCardProps) => {
    return (
        <div className='p-4 sm:p-6 rounded-xl border-[1px] border-[#E4E4E7] bg-white'>
            <div className='flex gap-3 sm:gap-4'>
                <Image src={image} width={500} height={500} alt={name} className='w-8 h-8 sm:w-10 sm:h-10 rounded-full border-[1px] border-[#E4E4E7]' />
                <div>
                    <h3 className='text-card-foreground truncate text-xs sm:text-sm font-medium'>{name}</h3>
                    <span className="text-muted-foreground truncate text-[10px] sm:text-xs">{subtitle}</span>
                </div>
            </div>
            <p className={cn("text-muted-foreground leading-relaxed text-xs sm:text-sm line-clamp-2 mt-2 sm:mt-3")}>{description}</p>
        </div>
    )
}

export const FeedbackCarusel = () => {

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1.2}
                    breakpoints={swiperBreakpoints}
                    loop={true}
                    speed={5000}
                    autoplay={{
                        delay: 0,
                        reverseDirection: false,
                        disableOnInteraction: false
                    }}
                >
                    {[...testimonials].slice(0, 5).map((item, idx) => (
                        <SwiperSlide key={idx} tag='div'>
                            <FeedbackCard name={item.name} subtitle={item.title} image={item.image} description={item.testimonial} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={1.2}
                    breakpoints={swiperBreakpoints}
                    loop={true}
                    speed={5000}
                    autoplay={{
                        delay: 0,
                        reverseDirection: true,
                        disableOnInteraction: false
                    }}
                >
                    {[...testimonials].slice(4).map((item, idx) => (
                        <SwiperSlide key={idx} tag='div'>
                            <FeedbackCard name={item.name} subtitle={item.title} image={item.image} description={item.testimonial} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}