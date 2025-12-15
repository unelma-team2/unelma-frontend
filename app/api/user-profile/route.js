import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_API_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(req) {
    const { supabase_user_id, email } = await req.json();

    // 1. Check if profile exists
    const checkRes = await fetch(
        `${STRAPI_URL}/api/user-profiles?filters[supabase_id][$eq]=${supabase_user_id}`,
        {
            headers: {
                Authorization: `Bearer ${STRAPI_TOKEN}`,
            },
        }
    );

    const checkData = await checkRes.json();

    if (Array.isArray(checkData.data) && checkData.data.length > 0) {
        return NextResponse.json(checkData.data[0]);
    }

    // 2. Create profile
    const createRes = await fetch(`${STRAPI_URL}/api/user-profiles`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${STRAPI_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: {
                supabase_id: supabase_user_id,
                email,
            },
        }),
    });

    const created = await createRes.json();
    return NextResponse.json(created.data);
}
