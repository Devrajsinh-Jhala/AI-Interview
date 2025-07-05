"use client";

import Link from "next/link";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { Button } from "./ui/button";

const Footer = () => {
  const { user } = useSupabaseAuth();
  const isSignedIn = !!user;

  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 py-8">
          {/* Branding & Copyright */}
          <div className="text-center sm:text-left">
            <Link
              href="/"
              className="flex items-center justify-center sm:justify-start space-x-2 mb-2"
            >
              <div className="bg-blue-600 text-white p-2 rounded-md">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                InterviewAI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Navigation & CTA */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 items-center">
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2 hidden lg:block"></div>

            {/* Conditional Auth Buttons */}
            {isSignedIn ? (
              <Button asChild size="sm">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth?view=sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
