import Link from "next/link";
import { LayoutGrid } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full  text-white py-8 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <LayoutGrid className="h-6 w-6" />
              <span className="text-base font-semibold">CodeSanp</span>
            </div>
            <p className="text-sm text-gray-400">
              © copyright Startup 2024. All rights reserved.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Pages</h3>
            <div className="grid gap-2">
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/features"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Socials</h3>
            <div className="grid gap-2">
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Facebook
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Twitter
              </Link>
              <Link
                href="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Legal</h3>
            <div className="grid gap-2">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Register */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Register</h3>
            <div className="grid gap-2">
              <Link
                href="/signup"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/demo"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Book a demo
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center opacity-30 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-clap font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
          CodeSpan
        </div>
      </div>
    </footer>
  );
}
