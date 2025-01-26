import { cn } from "@/lib/utils";
import Image from "next/image";
import Marquee from "../ui/marquee";

const reviews = [
  {
    id: 1,
    img: "/companies/croped.png",
  },

  {
    id: 5,
    img: "/companies/tiny.png",
  },
  {
    id: 6,
    img: "/companies/onw.png",
  },

  {
    id: 9,
    img: "/companies/OnlyFans.png",
  },
  {
    id: 10,
    img: "/companies/Zomato.png",
  },
  {
    id: 2,
    img: "/companies/ford.png",
  },
  {
    id: 3,
    img: "/companies/google.png",
  },
];

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl  p-4"
      )}
    >
      <div className="flex flex-row  items-center gap-2">
        <Image
          className="rounded-full grayscale brightness-100 hover:grayscale-0 w-auto h-auto"
          width={90}
          height={50}
          alt=""
          src={img}
        />
      </div>
    </figure>
  );
};

export function Companies() {
  return (
    <div className="relative flex  w-full flex-col items-center justify-center overflow-hidden ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.id} img={review.img} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
