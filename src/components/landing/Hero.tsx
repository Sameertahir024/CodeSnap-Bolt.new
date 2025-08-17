import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { ShinyButton } from "../ui/shiny-button";
import DotPattern from "../ui/dot-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";
import HeroVideoDialog from "../ui/hero-video-dialog";
import { Companies } from "./Companies";
import DeveloperButton from "./DeveloperButton";

export default function Hero() {
  return (
    <section className=" ">
      <div
        className=" w-full max-w-[1400px] mx-auto  flex min-h-screen flex-col items-center  justify-center
        overflow-hidden px-4 py-20 md:px-8 md:py-40  "
      >
        <DeveloperButton />
        <h1
          className="text-balance relative z-20 mx-auto mb-4 mt-4 max-w-4xl
        text-center text-3xl font-semibold tracking-tight 
         md:text-7xl "
        >
          Detect AI-written content in seconds – effortlessly.
        </h1>
        
        <p
          className="relative z-20 mx-auto mt-4 max-w-lg px-4 text-center text-base/6
        text-gray-600 dark:text-gray-200"
        >
          Uncover the truth behind content with our AI-powered detector.
          Designed for accuracy, built for trust.
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

          <Link href="https://github.com/Sameertahir024/CodeSnap-Bolt.new" passHref>
            <ShinyButton className="text-sm px-8">
              <a
                target="blank"
                className="flex items-center gap-1"
              >
                <Github />
                GitHub
              </a>
            </ShinyButton>
          </Link>
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
        <div className="p-1 bg-white rounded-lg  shadow-[0px_0px_20px_5px_rgba(0,0,0,0.5)] dark:shadow-[0px_0px_30px_10px_rgba(255,255,255,0.4)]">
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
