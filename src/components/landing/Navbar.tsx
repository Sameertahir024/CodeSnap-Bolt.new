"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <Button onClick={() => setTheme("dark")}>dark</Button>
      <Button onClick={() => setTheme("light")}>light</Button>
    </div>
  );
};

export default Navbar;
