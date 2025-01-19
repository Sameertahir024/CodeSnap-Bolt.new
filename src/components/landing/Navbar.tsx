"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { toast } from 'sonner';


const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => toast('Toast')}>Render Toast</button>;
      <Button onClick={() => setTheme("dark")}>dark</Button>
      <Button onClick={() => setTheme("light")}>light</Button>
    </div>
  );
};

export default Navbar;
