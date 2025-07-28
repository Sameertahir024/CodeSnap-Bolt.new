"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browserClient";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, Github, User } from "lucide-react";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const supabase = createClient();
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: username,
        },
      },
    });

    if (signUpError) {
      setError(`Sign up failed: ${signUpError.message}`);
    } else {
      router.push("/dashboard");
    }
    
    setIsLoading(false);
  };

  const signUpWithProvider = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");
    await supabase.auth.signInWithOAuth({ provider });
    setIsLoading(false);
  };

  const getBackgroundClass = () => {
    if (!mounted) {
      return "min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4";
    }
    return `min-h-screen bg-gradient-to-br flex items-center justify-center p-4 ${
      theme === 'dark' 
        ? 'from-slate-900 via-blue-900 to-indigo-900' 
        : 'from-slate-50 via-blue-50 to-indigo-100'
    }`;
  };

  const getCardClass = () => {
    if (!mounted) {
      return "shadow-2xl border-0 bg-white/80 backdrop-blur-sm";
    }
    return `shadow-2xl border-0 backdrop-blur-sm ${
      theme === 'dark' 
        ? 'bg-slate-800/80 border-slate-700' 
        : 'bg-white/80'
    }`;
  };

  const getInputClass = () => {
    if (!mounted) {
      return "pl-10";
    }
    return `pl-10 ${
      theme === 'dark' 
        ? 'bg-slate-700 border-slate-600 text-white placeholder:text-gray-400' 
        : ''
    }`;
  };

  const getButtonClass = () => {
    if (!mounted) {
      return "w-full";
    }
    return `w-full ${
      theme === 'dark' 
        ? 'border-slate-600 text-white hover:bg-slate-700' 
        : ''
    }`;
  };

  return (
    <div className={getBackgroundClass()}>
      <div className="w-full max-w-md">
        <Card className={getCardClass()}>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className={`${mounted && theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Join us and start your journey today
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <div className={`p-3 text-sm border rounded-md ${
                mounted && theme === 'dark' 
                  ? 'text-red-400 bg-red-900/20 border-red-800' 
                  : 'text-red-600 bg-red-50 border-red-200'
              }`}>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className={`text-sm font-medium ${mounted && theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={getInputClass()}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className={`text-sm font-medium ${mounted && theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
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
              <label htmlFor="password" className={`text-sm font-medium ${mounted && theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
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
                    mounted && theme === 'dark' ? 'hover:text-gray-300' : 'hover:text-gray-600'
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
              onClick={handleSignUp}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className={`w-full border-t ${mounted && theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`} />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={`px-2 ${mounted && theme === 'dark' ? 'bg-slate-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => signUpWithProvider("google")}
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
                onClick={() => signUpWithProvider("github")}
                disabled={isLoading}
                variant="outline"
                className={getButtonClass()}
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>

            <div className={`text-center text-sm ${mounted && theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Already have an account?{" "}
              <Link href="/login" className={`font-medium transition-colors ${
                mounted && theme === 'dark' 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-500'
              }`}>
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
