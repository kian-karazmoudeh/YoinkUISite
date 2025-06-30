import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Get access token and refresh token from Authorization headers
  const authHeader = req.headers.get("authorization");
  const refreshHeader = req.headers.get("x-refresh-token");

  const access_token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  const refresh_token = refreshHeader?.startsWith("Bearer ")
    ? refreshHeader.slice(7)
    : null;

  if (!access_token || !refresh_token) {
    return NextResponse.json(
      { error: "Missing access or refresh token in headers" },
      { status: 400 }
    );
  }

  // Create a Supabase client with the request/response for cookie management
  const supabase = await createClient();

  // Set the session using the access and refresh tokens
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ message: "Session set", user: data.user });
}
