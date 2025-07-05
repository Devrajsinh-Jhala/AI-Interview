"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation"; // <-- Import useSearchParams
import { Button } from "@/components/ui/button"; // Assuming you use shadcn/ui button

export default function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams(); // <-- Get search params

  // Determine the initial view based on the URL query parameter
  const initialView = searchParams.get("view");
  const [isSigningUp, setIsSigningUp] = useState(initialView === "sign-up");

  // This useEffect ensures the form updates if the user navigates between views
  // e.g., using browser back/forward buttons on the same page.
  useEffect(() => {
    setIsSigningUp(searchParams.get("view") === "sign-up");
  }, [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (isSigningUp) {
      // Handle Sign Up
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage("Success! Please check your email for a confirmation link.");
      }
    } else {
      // Handle Sign In
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Successful login! Refresh to let the root layout handle the session
        // Or redirect directly
        router.push("/dashboard");
      }
    }
  };

  const toggleView = () => {
    // When toggling, update the URL as well for a better UX
    const nextView = isSigningUp ? "sign-in" : "sign-up";
    router.replace(`/auth?view=${nextView}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">
          {isSigningUp ? "Create an Account" : "Welcome Back"}
        </h1>
        <p className="text-sm text-gray-500">
          {isSigningUp
            ? "Start your free trial today."
            : "Sign in to continue."}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="text-sm font-medium" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md" // Example styling
          />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            className="w-full px-3 py-2 border rounded-md" // Example styling
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {message && <p className="text-sm text-green-500">{message}</p>}

        <Button type="submit" className="w-full">
          {isSigningUp ? "Create Account" : "Sign In"}
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={toggleView}
          className="text-sm text-blue-600 hover:underline"
        >
          {isSigningUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
