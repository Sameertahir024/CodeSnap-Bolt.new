import { ReactNode } from "react";
import DashboardSideBar from "./_components/DashboardSideBar";
import DashboardTopNav from "./_components/DashboardTopNav";
import Navbar from "@/components/landing/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
    {/* <Navbar/> */}
      <main className="">{children}</main>
      </div>
  );
}
