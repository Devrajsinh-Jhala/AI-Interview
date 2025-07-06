// /app/dashboard/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useCreditStore } from "@/lib/stores/creditStore"; // IMPORT THE STORE

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useSupabaseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showNoCreditsModal, setShowNoCreditsModal] = useState(false);

  // GET THE ACTION FROM OUR GLOBAL STORE
  const decrementCredits = useCreditStore((state) => state.decrementCredits);

  const handleStartInterview = async () => {
    if (!user) {
      alert("You must be logged in to start an interview.");
      return;
    }

    setIsLoading(true);

    try {
      // JUST CALL THE ACTION FROM THE STORE. ALL LOGIC IS IN THERE.
      await decrementCredits(user.id);

      console.log("SUCCESS: Starting interview.");
      alert("Starting interview!");

      // NO router.refresh() NEEDED! Zustand handles the real-time update.
    } catch (error: any) {
      // The store will throw an error if credits are 0 or if DB update fails.
      console.error("Failed to start interview:", error.message);
      if (error.message.includes("no interview credits")) {
        setShowNoCreditsModal(true);
      } else {
        alert(`An error occurred: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* The Card and other JSX remains exactly the same */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Start a New Mock Interview
        </h1>
        <p className="mt-2 text-muted-foreground">
          Configure your session and our AI will tailor the experience for you.
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Interview Settings</CardTitle>
            <CardDescription>
              Choose your desired configuration for the mock interview.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Focus</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="meta">Meta</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Interview Level</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry-Level</SelectItem>
                  <SelectItem value="mid">Mid-Level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleStartInterview}
              size="lg"
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? "Starting..." : "Start Interview"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* The Modal Definition remains exactly the same */}
      <Dialog open={showNoCreditsModal} onOpenChange={setShowNoCreditsModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Out of Credits</DialogTitle>
            <DialogDescription>
              You have no interview credits left. Please upgrade your plan to
              continue practicing.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNoCreditsModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => router.push("/pricing")}>
              Upgrade Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
