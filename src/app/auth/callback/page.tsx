"use client";

import { createClient } from "@/lib/supabase/browserClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          router.push("/login?error=auth_failed");
          return;
        }

        if (data.session) {
          console.log("Authentication successful, redirecting to dashboard");
          router.push("/dashboard");
        } else {
          console.log("No session found, redirecting to login");
          router.push("/login");
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        router.push("/login?error=unexpected_error");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing authentication...</h1>
        <p>Please wait while we complete your login.</p>
      </div>
    </div>
  );
} 