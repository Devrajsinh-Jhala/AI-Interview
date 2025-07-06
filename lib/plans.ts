// lib/plans.ts

export const PLANS = {
    free_trial: {
        name: 'Free Trial',
        credits: 1,
    },
    basic: {
        name: 'Basic',
        credits: 5,
    },
    pro: {
        name: 'Pro',
        credits: 15,
    },
    excel: {
        name: 'Excel',
        credits: 30,
    }
};

// A helper type for type safety
export type PlanId = keyof typeof PLANS;