"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const { isSignedIn } = useAuth();

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Text Section */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Master Your{" "}
            <span className="text-primary">Technical Interviews</span> with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse drop-shadow-md">
              AI-Powered Practice
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Experience realistic coding interviews with our AI interviewer.
            Receive instant feedback, adaptive hints, and detailed performance
            reports to land your dream job.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Badge variant="secondary">🤖 AI Interviewer</Badge>
            <Badge variant="secondary">⚡ Real-time Feedback</Badge>
            <Badge variant="secondary">📊 Performance Analytics</Badge>
            <Badge variant="secondary">🎯 Company-Specific Prep</Badge>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {isSignedIn ? (
              <>
                <Button asChild size="lg" className="text-lg px-6 py-4">
                  <Link href="/dashboard">Start Interview Practice</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-6 py-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <Link href="/history">View Progress</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="lg" className="text-lg px-6 py-4">
                  <Link href="/sign-up">Start Free Trial</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-6 py-4 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </>
            )}
          </div>

          {/* Trial Message */}
          {!isSignedIn && (
            <p className="text-sm text-gray-500 mt-4">
              ✨ <strong>Free Trial:</strong> Get 1 complete interview session •
              No credit card required
            </p>
          )}
        </div>

        {/* Hero Video/Illustration Section */}
        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-2xl border  p-6 shadow-lg">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center">
                <svg
                  className="w-16 h-16 mx-auto mb-3 opacity-90"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <p className="text-lg font-medium">Watch Demo</p>
                <p className="text-sm text-white/80">
                  See how our AI interviewer works
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
