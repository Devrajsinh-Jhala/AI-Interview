// /app/pricing/page.tsx

"use client";

import { PLANS, PlanId } from "@/lib/plans";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

// --- Data defined LOCALLY within the component ---
// This keeps your original plans.ts file untouched.
const PRICING_DETAILS: Record<
  PlanId,
  {
    price: number;
    description: string;
    features: string[];
    highlighted?: boolean;
  }
> = {
  free_trial: {
    // This won't be displayed, but good for completeness
    price: 0,
    description: "Get a feel for our platform.",
    features: ["1 Interview Credit"],
  },
  basic: {
    price: 9,
    description: "Perfect for occasional practice.",
    features: [
      "5 Interview Credits",
      "Standard AI Feedback",
      "Access to Interview History",
    ],
  },
  pro: {
    price: 25,
    description: "For serious job seekers.",
    features: [
      "15 Interview Credits",
      "Advanced AI Feedback",
      "In-depth Performance Analytics",
      "Priority Email Support",
    ],
    highlighted: true, // We'll mark this as the most popular
  },
  excel: {
    price: 49,
    description: "For professionals who want to master every interview.",
    features: [
      "30 Interview Credits",
      "All Pro Features",
      "Dedicated Mentor Support",
    ],
  },
};

export default function PricingPage() {
  // We get the original plans and filter out 'free_trial' for display
  const purchasablePlans = Object.entries(PLANS).filter(
    ([id]) => id !== "free_trial"
  );

  const handleChoosePlan = (planId: PlanId) => {
    // This is where you would handle the Stripe checkout logic.
    console.log(`User chose plan: ${planId}`);
    alert(`You selected the ${PLANS[planId].name} plan!`);
  };

  return (
    <div className="min-h-screen w-full py-8 lg:py-12 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that&apos;s right for you and land your dream job.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {purchasablePlans.map(([id, plan]) => {
            const planId = id as PlanId;
            const details = PRICING_DETAILS[planId];

            return (
              <Card
                key={id}
                className={cn(
                  "flex flex-col relative", // Use flex-col to make footer stick to bottom
                  {
                    "border-2 border-primary shadow-lg dark:border-primary/70":
                      details.highlighted,
                  }
                )}
              >
                {details.highlighted && (
                  <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="pt-10">
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>{details.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-extrabold">
                      ${details.price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {details.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleChoosePlan(planId)}
                    className="w-full"
                    variant={details.highlighted ? "default" : "outline"}
                    size="lg"
                  >
                    Choose Plan
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            All plans are billed monthly. You can cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
