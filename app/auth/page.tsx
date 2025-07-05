import AuthForm from "@/components/AuthForm";
import { Suspense } from "react"; // <-- 1. Import Suspense

// A simple loading skeleton component to show as a fallback
function AuthFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="space-y-4 pt-4">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        {/* 2. Wrap the dynamic component in a Suspense boundary */}
        <Suspense fallback={<AuthFormSkeleton />}>
          <AuthForm />
        </Suspense>
      </div>
    </div>
  );
}
