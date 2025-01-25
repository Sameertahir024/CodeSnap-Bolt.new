import { Button } from "@/components/ui/button";
import { Github, ArrowRightIcon } from "lucide-react";
import { ShinyButton } from "../ui/shiny-button";
import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import HeroVideoDialog from "../ui/hero-video-dialog";
import { Companies } from "./Companies";
import { AnimatedShinyText } from "../ui/animated-shiny-text";

export default function Hero() {
  return (
    <section className=" ">
      <div
        className="relative flex min-h-screen flex-col items-center  justify-center
        overflow-hidden px-4 py-20 md:px-8 md:py-40  "
      >
        <div className="flex items-center max-w-lg text-center gap-1 ">
          <div className=" rounded-full  bg-white text-xs text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200  dark:bg-black dark:hover:bg-neutral-800">
            <AnimatedShinyText className="inline-flex text-xs items-center justify-center p-1  transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-300">
              <span>
                🎉Introducing CodeSnap – a game-changer by Sameer Tahir
              </span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
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

      <div className="flex justify-center items-center px-4 md:px-16">
        <div className="p-1 bg-white rounded-lg shadow-[0px_0px_40px_10px_rgba(0,0,0,0.8)] dark:shadow-[0px_0px_50px_15px_rgba(255,255,255,0.8)]">
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
