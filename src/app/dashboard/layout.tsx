// src/app/dashboard/layout.tsx
import Navbar from '@/components/landing/Navbar';
import { TokenProvider } from '@/contexts/TokenContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TokenProvider>
      <Navbar />
      <main>{children}</main>
    </TokenProvider>
  );
}