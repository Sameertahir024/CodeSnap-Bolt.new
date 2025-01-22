import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { ShinyButton } from "../ui/shiny-button";
import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import HeroVideoDialog from "../ui/hero-video-dialog";
import { Companies } from "./Companies";

export default function Hero() {
  return (
    <section className=" ">
      <div
        className="relative flex min-h-screen flex-col items-center  justify-center
        overflow-hidden px-4 py-20 md:px-8 md:py-40  "
      >
        <p className="relative z-20 mx-auto mt-4 max-w-lg text-center text-xs">
          Introducing CodeSnap – a game-changer by Sameer Tahir!
        </p>
        <h1
          className="text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl
        text-center text-3xl font-semibold tracking-tight 
         md:text-7xl "
        >
          Build your dream website in seconds – effortless.
        </h1>
        <p
          className="relative z-20 mx-auto mt-4 max-w-lg px-4 text-center text-base/6
        text-gray-600 dark:text-gray-200"
        >
          Transform your ideas into reality with our cutting-edge platform.
          Designed for innovators, built for the future.
        </p>
        <div
          className="mb-3 mt-8 flex w-full flex-col items-center justify-center gap-4
        px-8 sm:flex-row md:mb-20"
        >
          <Link href="/dashboard">
            <Button size="lg" className="text-sm px-8">
              Get Started
            </Button>
          </Link>

          <ShinyButton className="text-sm px-8">
            <span className="flex items-center gap-1">
              <Github />
              GitHub
            </span>
          </ShinyButton>
        </div>
        <DotPattern
          width={22}
          height={16}
          cx={1}
          cy={1}
          cr={1.5}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
        <Companies />
      </div>
      <div className="flex justify-center items-center px-4 md:px-8">
        <div className="p-1 bg-white rounded-lg">
          <div className="relative">
            <HeroVideoDialog
              className="dark:hidden block"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
              thumbnailAlt="Hero Video"
            />
            <HeroVideoDialog
              className="hidden dark:block"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
              thumbnailAlt="Hero Video"
            />
          </div>
        </div>
      </div>
      {/*  */}
    </section>
  );
}
