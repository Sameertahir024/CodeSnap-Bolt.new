"use client";
import React, { useState } from "react";
import ToggleMenu from "./ToggleMenu";
import { Button } from "../ui/button";
import Link from "next/link";
import { LayoutGrid, LogOut, User, ChevronDown, CircleDollarSign } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TokenCounter from "@/app/dashboard/_components/TokenCounter";

const Navbar = () => {
  const { user, loading, signOut, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className=" ">
      <div className="w-full flex items-center fixed justify-between p-2 border-b z-10 dark:bg-black  bg-white">
        <Link href="/">
          <LayoutGrid />
        </Link>
        <div className="flex items-center gap-2">
          <TokenCounter/>
          <ToggleMenu />
          
          {!loading && (
            <>
              {isAuthenticated ? (
                // Show profile image and dropdown when user is logged in
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 p-3  rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                        {user?.user_metadata?.avatar_url ? (
                          <img
                            src={user.user_metadata.avatar_url}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          getInitials(user?.email || "U")
                        )}
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-1" align="end">
                    <DropdownMenuLabel>
                      {user?.user_metadata?.full_name || user?.email}
                      <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-red-600 dark:text-red-400"
                      >
                        <LogOut className="w-4 h-4 " />
                        Logout
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // Show login and sign up buttons when user is not logged in
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button size="lg" className="text-sm px-8" variant="outline">
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button size="lg" className="text-sm px-8">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {/* The old dropdown state and logic is removed, so this block is no longer needed. */}
    </div>
  );
};

export default Navbar;
