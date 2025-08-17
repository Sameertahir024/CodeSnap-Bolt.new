"use client";

import ToggleMenu from "@/components/landing/ToggleMenu";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { useAuth } from "@/lib/hooks/useAuth";
import { Banknote, Folder, HomeIcon, Menu,  LogOut, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import TokenCounter from "./TokenCounter";

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  const { user, loading, signOut, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await signOut();
    // Log out the user and redirect to home
    if (typeof window !== "undefined") {
      await signOut();
      window.location.href = "/";
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <Menu />
            <Link href="/dashboard">
              <span className="sr-only">Overview</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>codeSnap</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    AI content Detector
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/weblInk">
                  <Button variant="outline" className="w-full">
                    <Folder className="mr-2 h-4 w-4" />
                    Web Summary
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        
        <div className="flex justify-center items-center gap-2 ml-auto">
          <TokenCounter />
          
          {!loading && (
            <>
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 p-3 rounded-lg">
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
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </div>
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
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button size="sm" className="text-sm px-4" variant="outline">
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button size="sm" className="text-sm px-4">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
          
          <ToggleMenu />
        </div>
      </header>
      {children}
    </div>
  );
}