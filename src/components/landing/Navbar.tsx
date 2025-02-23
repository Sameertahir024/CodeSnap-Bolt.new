"use client";
import React from "react";
import ToggleMenu from "./ToggleMenu";
import config from "@/config";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";

const Navbar = () => {
  let userId = null;
  const user = useAuth();
  if (config?.auth?.enabled) {
    userId = user?.userId;
  }
  return (
    <div className=" ">
      <div className="w-full flex items-center fixed justify-between p-2 border-b z-10 dark:bg-black  bg-white">
        <LayoutGrid />
        <div className="flex items-center gap-2">
          <ToggleMenu />
          {userId ? (
            <UserButton />
          ) : (
            <Link href="/sign-up">
              <Button size="lg" className="text-sm px-8">
                Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
