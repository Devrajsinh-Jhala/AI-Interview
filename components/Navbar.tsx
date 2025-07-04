"use client";

import Link from "next/link";
import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon} from "lucide-react";

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <nav className="w-full border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
          {/* <Link
            href="/dashboard"
            className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link> */}
          <Link
            href="/pricing"
            className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
          >
            Pricing
          </Link>

          {isSignedIn ? (
            <>
              {/* <div>
                {user?.hasImage && (
                  <Image
                    src={user.imageUrl}
                    alt={user.firstName! || "User Avatar"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
              </div> */}
              <UserButton />
              <Button asChild>
                <Link href="/dashboard">Start Interview</Link>
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Button asChild>
                <Link href="/sign-up">Start Free Trial</Link>
              </Button>
            </>
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
            <SheetContent side="right" className="w-64 p-4 space-y-4">
              <div className="space-y-2">
                {/* <Link
                  href="/dashboard"
                  className="block text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link> */}
                <Link
                  href="/pricing"
                  className="block text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Pricing
                </Link>

                {isSignedIn ? (
                  <>
                    <p className="text-sm text-gray-600">
                      Hi, {user?.firstName}
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/dashboard">Start Interview</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="block text-sm text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Button asChild className="w-full">
                      <Link href="/sign-up">Start Free Trial</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
