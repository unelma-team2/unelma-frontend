// pages/api/user-profile.js
import { NextResponse } from 'next/server';

const STRAPI_URL = process.env.STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(req) {
    try {
        const { supabase_user_id, email, name, phone } = await req.json();

        if (!supabase_user_id || !email || !name) {
            return NextResponse.json({ error: 'Missing required user info' }, { status: 400 });
        }

        // Check if profile exists
        const checkRes = await fetch(
            `${STRAPI_URL}/api/user-profiles?filters[supabase_id][$eq]=${supabase_user_id}`,
            { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
        );
        const checkData = await checkRes.json();

        if (checkData.data?.length) {
            return NextResponse.json(checkData.data[0]);
        }

        // if (Array.isArray(checkData.data) && checkData.data.length > 0) {
        //     // Strip unwanted fields
        //     const profile = checkData.data[0];
        //     const { createdAt, updatedAt, publishedAt, ...filteredProfile } = profile;
        //     return NextResponse.json(filteredProfile);
        // }

        // Create new profile
        const createRes = await fetch(`${STRAPI_URL}/api/user-profiles`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${STRAPI_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: { supabase_id: supabase_user_id, email, name, phone: phone || null },
            }),
        });

        const created = await createRes.json();
        if (!createRes.ok) throw new Error('Strapi create failed: ' + JSON.stringify(created));

        // const { createdAt, updatedAt, publishedAt, ...filteredCreated } = created.data;
        return NextResponse.json(created.data);
    } catch (err) {
        console.error('Error in /api/user-profile:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
