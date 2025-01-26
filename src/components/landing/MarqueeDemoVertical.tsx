import { cn } from "@/lib/utils";
import Marquee from "../ui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's absolutely amazing. The level of detail and effort put into this is truly remarkable. I love it!",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is beyond incredible! The creativity and execution are just top-notch. I can't get enough of it!",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is truly something special. I love the thoughtfulness behind it. It's so refreshing to see something this well-made!",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Alice",
    username: "@alice",
    body: "This is fantastic! The amount of passion and dedication that went into this is evident. I feel inspired just looking at it. Great job!",
    img: "https://avatar.vercel.sh/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "Wow, just wow! I've seen a lot of things, but this stands out in the best possible way. It's brilliant, well-executed, and simply amazing!",
    img: "https://avatar.vercel.sh/bob",
  },
  {
    name: "Emily",
    username: "@emily",
    body: "This is beyond my expectations. The quality is exceptional, and the impact it has is truly inspiring. I'm so glad I got to witness this masterpiece!",
    img: "https://avatar.vercel.sh/emily",
  },
  {
    name: "Michael",
    username: "@michael",
    body: "Absolutely stunning! Every little detail is so well thought out. I could stare at this for hours and still be amazed. A true work of art!",
    img: "https://avatar.vercel.sh/michael",
  },
  {
    name: "Sophia",
    username: "@sophia",
    body: "This is a game-changer! The way everything comes together is just beautiful. I'm in awe of the craftsmanship. Can't stop admiring it!",
    img: "https://avatar.vercel.sh/sophia",
  },
  {
    name: "David",
    username: "@david",
    body: "Mind-blowing! The effort put into this is crystal clear, and it pays off. Every element complements the other perfectly. This is next-level work!",
    img: "https://avatar.vercel.sh/david",
  },
  {
    name: "Olivia",
    username: "@olivia",
    body: "This is pure genius! Everything about it feels so right, so carefully planned and executed. I'm truly impressed by the vision behind this!",
    img: "https://avatar.vercel.sh/olivia",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-60 w-72 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemoVertical() {
  return (
    <div className="my-16">
      <div>
        <h1 className="text-3xl font-medium tracking-tight text-neutrl-900 dark:text-white sm:text-center">
          Loved by thousands of people
        </h1>
        <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-200 sm:text-center">
          Here&apos;s what some of our users have to say about CodeSnap.
        </p>
      </div>
      <div className="relative my-32 flex flex-wrap h-[600px] w-full flex-row items-center justify-center overflow-hidden rounded-lg   md:shadow-xl">
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
      </div>
    </div>
  );
}
