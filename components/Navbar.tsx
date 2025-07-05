"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/lib/supabaseClient";

const Navbar = () => {
  const { user, loading } = useSupabaseAuth();
  const isSignedIn = !!user;
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Redirect to home to reset state
    router.push("/");
    router.refresh(); // Ensures the server-side state is cleared
  };

  // Render a placeholder or nothing while auth state is loading
  // This prevents the "flash" of signed-out content for signed-in users
  if (loading) {
    return <div className="w-full h-16 border-b bg-white" />;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-md">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">
              InterviewAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Pricing
            </Link>

            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth?view=sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth?view=sign-up">Start Free Trial</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs p-6">
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/pricing"
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Pricing
                  </Link>

                  <hr />

                  {isSignedIn ? (
                    <div className="space-y-4">
                      <Link
                        href="/dashboard"
                        className="block text-base font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        Dashboard
                      </Link>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleSignOut}
                      >
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/auth?view=sign-in">Sign In</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/auth?view=sign-up">Start Free Trial</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
