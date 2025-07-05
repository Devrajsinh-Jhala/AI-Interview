// app/api/clerk-user-created/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix"; // for verifying signature (optional, secure)
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // must be service role
);

export async function POST(req: NextRequest) {
    const payload = await req.text(); // get raw body for signature check
    const headers = req.headers;

    const svix_id = headers.get("svix-id")!;
    const svix_timestamp = headers.get("svix-timestamp")!;
    const svix_signature = headers.get("svix-signature")!;

    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

    const wh = new Webhook(webhookSecret);

    let evt: any;
    try {
        evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error("Webhook verification failed", err);
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // ✅ Extract user data
    const { id, email_addresses, image_url, first_name, last_name } = evt.data;

    const email = email_addresses?.[0]?.email_address;
    const full_name = `${first_name ?? ""} ${last_name ?? ""}`.trim();

    const { error } = await supabase.from("profiles").insert({
        id,
        email,
        full_name,
        avatar_url: image_url,
    });

    if (error) {
        console.error("Supabase insert failed", error);
        return new NextResponse("Supabase insert failed", { status: 500 });
    }

    return new NextResponse("User created in Supabase ✅", { status: 200 });
}
