// /components/Sidebar.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react"; // No useRef needed anymore
import { usePathname } from "next/navigation";
import { Home, History, Star, Zap } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/lib/supabaseClient";
import { PLANS, PlanId } from "@/lib/plans";
import { useCreditStore } from "@/lib/stores/creditStore"; // IMPORT THE STORE

// CreditsSkeleton component remains the same...
const CreditsSkeleton = () => (
  <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse">
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
    <div className="h-2.5 bg-gray-200 dark:bg-gray-500 rounded-full my-2"></div>
    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
  </div>
);

export default function Sidebar() {
  const pathname = usePathname();
  const { user, loading: authLoading } = useSupabaseAuth();

  // GET STATE FROM THE GLOBAL STORE INSTEAD OF LOCAL STATE
  const { remaining, total, setInitialCredits } = useCreditStore();

  const [profileLoading, setProfileLoading] = useState(true);
  const [planName, setPlanName] = useState<string>("Free Trial");

  useEffect(() => {
    const fetchProfileAndCredits = async () => {
      if (user) {
        setProfileLoading(true);
        try {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("interview_credits, subscription_tier")
            .eq("id", user.id)
            .single();

          if (error) throw error;

          if (profile) {
            const planId =
              (profile.subscription_tier as PlanId) || "free_trial";
            const planDetails = PLANS[planId] || PLANS.free_trial;

            setPlanName(planDetails.name);
            // SET THE INITIAL STATE IN OUR GLOBAL STORE
            setInitialCredits(
              profile.interview_credits ?? 0,
              planDetails.credits
            );
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setProfileLoading(false);
        }
      } else if (!authLoading) {
        setProfileLoading(false);
      }
    };

    fetchProfileAndCredits();
    // We only need to run this when the user/auth state changes.
  }, [user, authLoading, setInitialCredits]);

  const isLoading = authLoading || profileLoading;
  const creditPercentage = total > 0 ? (remaining / total) * 100 : 0;

  return (
    // The JSX for the sidebar remains exactly the same
    <aside className="hidden md:flex w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r dark:border-slate-800 p-4 flex-col">
      <div className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-md">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            InterviewAI
          </h2>
        </Link>
      </div>

      <div className="flex-grow">
        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
              pathname === "/dashboard" ? "bg-muted text-primary" : ""
            }`}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/dashboard/history"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
              pathname === "/dashboard/history" ? "bg-muted text-primary" : ""
            }`}
          >
            <History className="h-4 w-4" />
            History
          </Link>
        </nav>
      </div>

      <div className="mt-auto">
        {isLoading ? (
          <CreditsSkeleton />
        ) : (
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border dark:border-slate-700">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                Interview Credits
              </h3>
              <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                <Star className="w-3 h-3" /> {planName}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 my-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${creditPercentage}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">
              {/* Use the values from the store */}
              <strong>{remaining}</strong> of {total} remaining
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
