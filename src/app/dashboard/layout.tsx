import { ReactNode } from "react";
import DashboardSideBar from "./_components/DashboardSideBar";
import DashboardTopNav from "./_components/DashboardTopNav";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <DashboardSideBar />
      <DashboardTopNav>
      <main className="flex flex-col gap-4 p-4 lg:gap-6">{children}</main>
      </DashboardTopNav>
    </div>
  );
}
