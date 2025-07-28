"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browserClient";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, Github, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(`Login failed: ${loginError.message}`);
    } else {
      router.push("/dashboard");
    }
    
    setIsLoading(false);
  };

  const loginWithProvider = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");
    await supabase.auth.signInWithOAuth({ provider });
    setIsLoading(false);
  };

  const getBackgroundClass = () => {
    return `min-h-screen bg-gradient-to-br flex items-center justify-center p-4 ${
      theme === 'dark'
        ? 'from-neutral-950 via-slate-950 to-neutral-900'
        : 'from-neutral-100 via-slate-100 to-neutral-200'
    }`;
  };

  const getCardClass = () => {
    return `shadow-2xl border-0 backdrop-blur-sm ${
      theme === 'dark'
        ? 'bg-neutral-900/80 border-neutral-800'
        : 'bg-neutral-100/80'
    }`;
  };

  const getInputClass = () => {
    return `pl-10 ${
      theme === 'dark'
        ? 'bg-neutral-800 border-neutral-700 text-white placeholder:text-gray-400'
        : 'bg-neutral-200 border-neutral-300'
    }`;
  };

  const getButtonClass = () => {
    return `w-full ${
      theme === 'dark'
        ? 'border-neutral-700 text-white hover:bg-neutral-800'
        : 'border-neutral-300 bg-neutral-200 hover:bg-neutral-300'
    }`;
  };

  return (
    <div className={getBackgroundClass()}>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-neutral-700 dark:text-neutral-200 hover:underline hover:text-neutral-900 dark:hover:text-white transition-colors bg-neutral-100/80 dark:bg-neutral-900/80 px-3 py-1.5 rounded-md shadow"
      >
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </button>
      <div className="w-full max-w-md mx-auto">
        <Card className={getCardClass()}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-neutral-900 to-slate-900 bg-clip-text text-transparent dark:from-neutral-100 dark:to-slate-100">
              Welcome Back
            </CardTitle>
            <CardDescription className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <div className={`p-3 text-sm border rounded-md ${
                theme === 'dark' 
                  ? 'text-red-400 bg-red-900/20 border-red-800' 
                  : 'text-red-600 bg-red-50 border-red-200'
              }`}>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={getInputClass()}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={getInputClass()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${
                    theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-600'
                  }`}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-neutral-900 to-slate-900 hover:from-neutral-950 hover:to-slate-950 text-white font-medium py-2.5 dark:from-neutral-700 dark:to-slate-700 dark:hover:from-neutral-800 dark:hover:to-slate-800"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className={`w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`} />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={`px-2 ${theme === 'dark' ? 'bg-neutral-900 text-gray-400' : 'bg-neutral-100 text-gray-500'}`}>
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => loginWithProvider("google")}
                disabled={isLoading}
                variant="outline"
                className={getButtonClass()}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                onClick={() => loginWithProvider("github")}
                disabled={isLoading}
                variant="outline"
                className={getButtonClass()}
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>

            <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Don't have an account?{" "}
              <Link href="/sign-up" className={`font-medium transition-colors ${
                theme === 'dark' 
                  ? 'text-neutral-300 hover:text-neutral-200' 
                  : 'text-neutral-700 hover:text-neutral-600'
              }`}>
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
