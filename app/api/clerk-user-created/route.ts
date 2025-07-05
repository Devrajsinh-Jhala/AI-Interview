// app/api/clerk-user-created/route.ts

import { NextRequest } from 'next/server'
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export const config = {
    api: {
        bodyParser: false,
    },
}

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface ClerkUserCreatedEvent {
    type: 'user.created'
    data: {
        id: string
        email_addresses: { email_address: string }[]
        image_url: string
        first_name: string
        last_name: string
        [key: string]: any
    }
}

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.arrayBuffer()
        const payload = Buffer.from(rawBody).toString()

        const headerList = await headers()
        const clerkSignature = headerList.get('svix-signature')
        if (!clerkSignature) {
            return new Response(JSON.stringify({ error: 'Missing Clerk signature' }), { status: 400 })
        }

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!)
        const evt = wh.verify(payload, { 'svix-signature': clerkSignature }) as ClerkUserCreatedEvent

        if (evt.type !== 'user.created') {
            return new Response(JSON.stringify({ message: 'Event ignored' }), { status: 200 })
        }

        const user = evt.data
        const { id, email_addresses, first_name, last_name } = user

        const { error } = await supabase.from('profiles').insert({
            id,
            email: email_addresses?.[0]?.email_address || null,
            full_name: `${first_name || ''} ${last_name || ''}`.trim(),
            subscription_tier: 'free_trial',         // default value
            interview_credits: 1,                    // default value
            razorpay_customer_id: null,
            razorpay_subscription_id: null,
            subscription_status: null
        })

        if (error) {
            console.error('❌ Supabase insert error:', error)
            return new Response(JSON.stringify({ error: 'Insert failed' }), { status: 500 })
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 })
    } catch (err: any) {
        console.error('❌ Webhook error:', err.message || err)
        return new Response(JSON.stringify({ error: 'Webhook failed' }), { status: 400 })
    }
}
