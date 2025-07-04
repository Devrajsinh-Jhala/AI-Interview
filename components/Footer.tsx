"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@clerk/nextjs";

const Footer = () => {
  const { isSignedIn } = useAuth();
  return (
    <footer className="border-t ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold text-gray-900">InterviewAI</h2>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 items-center">
          {/* <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Dashboard
          </Link> */}
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
              {/* <UserButton /> */}
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
      </div>
    </footer>
  );
};

export default Footer;
