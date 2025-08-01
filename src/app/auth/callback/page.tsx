// app/auth/callback/page.tsx
"use client";
import { createClient } from "@/lib/supabase/browserClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 1. Get the current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          throw error || new Error("No session found");
        }
console.log("callback data" , session)
        // 2. Check if user already exists in your users table
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("id", session.user.id)
          .single();
console.log("exist user " , existingUser)
        // 3. If new user, initialize with 5 tokens
        if (!existingUser) {
          const { error: dbError } = await supabase
            .from("users")
            .insert([{
              id: session.user.id,
              email: session.user.email,
              token_balance: 2,
              subscription_tier: "basic"
            }]);

          if (dbError) throw dbError;
          
          toast.success("Welcome! You've received 2 free tokens.");
        }

        // 4. Redirect to dashboard
        router.push("/dashboard");

      } catch (error) {
        console.error("Auth callback error:", error);
        router.push("/login?error=auth_failed");
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