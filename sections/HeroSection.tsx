"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { ArrowRight, PlayCircle } from "lucide-react";

const HeroSection = () => {
  const { user, loading } = useSupabaseAuth();
  const isSignedIn = !!user;

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Master Your Technical Interviews with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-2">
              AI-Powered Practice
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Experience realistic, conversational interviews with our advanced
            AI. Get instant, actionable feedback and land your dream job faster.
          </p>

          {/* Feature Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
            <Badge variant="secondary">🤖 Conversational AI</Badge>
            <Badge variant="secondary">⚡ Real-time Feedback</Badge>
            <Badge variant="secondary">📊 Performance Analytics</Badge>
            <Badge variant="secondary">🎯 Adaptive Questions</Badge>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Conditional Rendering based on Auth State */}
            {loading ? (
              // Skeleton loaders for buttons while auth state is being determined
              <>
                <div className="h-14 w-52 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="h-14 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
              </>
            ) : isSignedIn ? (
              // Buttons for Signed-In Users
              <>
                <Button
                  asChild
                  size="lg"
                  className="group text-lg px-8 py-7 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link href="/dashboard">
                    Go to Dashboard{" "}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </>
            ) : (
              // Buttons for Signed-Out Users
              <>
                <Button
                  asChild
                  size="lg"
                  className="group text-lg px-8 py-7 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link href="/auth?view=sign-up">
                    Start Free Trial{" "}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="link"
                  size="lg"
                  className="text-lg text-primary"
                >
                  <Link href="/#demo">
                    Watch Demo <PlayCircle className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Trial Message - only show if not signed in and not loading */}
          {!loading && !isSignedIn && (
            <p className="text-sm text-gray-500 mt-4">
              ✨ <strong>1 Free Interview</strong> • No credit card required
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
