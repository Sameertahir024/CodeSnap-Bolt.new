import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import { MarqueeDemoVertical } from "@/components/landing/MarqueeDemoVertical";
import Navbar from "@/components/landing/Navbar";
import Pricing from "@/components/landing/Pricing";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Pricing />
      {/* <MarqueeDemoVertical /> */}
      <Footer />
    </div>
  );
}
