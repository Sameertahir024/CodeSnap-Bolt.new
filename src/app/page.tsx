import { MarqueeDemoVertical } from "@/components/landing/MarqueeDemoVertical";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <Navbar />
      <MarqueeDemoVertical />
    </div>
  );
}
