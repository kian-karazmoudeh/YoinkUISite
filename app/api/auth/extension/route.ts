import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Get access token and refresh token from Authorization headers
  const authHeader = req.headers.get("Authorization");
  const refreshHeader = req.headers.get("x-refresh-token");

  const access_token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  const refresh_token = refreshHeader?.startsWith("Bearer ")
    ? refreshHeader.slice(7)
    : null;

  //   console.log(req.headers);

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
  if (data.session) {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    let membership: string;
    let numOfYoinks: number;

    const [profileResult, yoinksResult] = await Promise.all([
      supabase
        .from("profiles")
        .select("*")
        .eq("id", data.session.user.id)
        .single(),

      supabase
        .from("yoinks")
        .select("*", { count: "exact", head: true })
        .eq("user_id", data.session.user.id)
        .gte("created_at", startOfMonth.toISOString()),
    ]);

    if (profileResult.error) {
      console.error(
        "Error refreshing membership:",
        profileResult.error.message
      );
      return NextResponse.json({ error: "No Profile found!" }, { status: 500 });
    } else {
      membership = profileResult.data.membership;
    }

    if (yoinksResult.error || yoinksResult.count == null) {
      console.error("Error fetching yoink count");
      return NextResponse.json(
        { error: "Error fetching yoink count!" },
        { status: 500 }
      );
    } else {
      numOfYoinks = yoinksResult.count;
    }

    return NextResponse.json({ data, numOfYoinks, membership });
  } else {
    return NextResponse.json({ error: "No session found!" }, { status: 401 });
  }
}
