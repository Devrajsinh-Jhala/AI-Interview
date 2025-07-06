// /lib/stores/creditStore.ts

import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';

// Define the shape of our store's state and actions
interface CreditState {
    remaining: number;
    total: number;
    setInitialCredits: (remaining: number, total: number) => void;
    decrementCredits: (userId: string) => Promise<void>; // Make this an async action
}

export const useCreditStore = create<CreditState>((set, get) => ({
    // Initial State
    remaining: 0,
    total: 1,

    // Action to set the state after initial load
    setInitialCredits: (remaining, total) => {
        set({ remaining, total });
    },

    // The main action to be called from the dashboard
    decrementCredits: async (userId: string) => {
        const currentCredits = get().remaining;

        // Guard Condition: Don't do anything if credits are already 0
        if (currentCredits <= 0) {
            console.log("Attempted to decrement credits, but none remain.");
            // We can throw an error to be caught by the calling component
            throw new Error("You have no interview credits remaining.");
        }

        // Optimistic UI update: Update the state immediately for a snappy feel
        set({ remaining: currentCredits - 1 });

        try {
            // Update the database in the background
            const { error } = await supabase
                .from('profiles')
                .update({ interview_credits: currentCredits - 1 })
                .eq('id', userId);

            if (error) {
                // If the database update fails, revert the optimistic UI update
                console.error("Failed to update credits in DB, reverting state.", error);
                set({ remaining: currentCredits }); // Put the credit back
                throw error; // Re-throw the error to be caught by the component
            }

            console.log("Credits successfully updated in DB.");

        } catch (error) {
            // Revert state on any kind of failure
            set({ remaining: currentCredits });
            throw error;
        }
    },
}));