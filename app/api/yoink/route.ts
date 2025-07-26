import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  let yoink_id;

  if (!token) {
    return NextResponse.json(
      { error: "Authorization token missing" },
      { status: 400 }
    );
  }

  // Verify the token with Supabase
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  // Parse request body to get the text content
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  let name = body.name;
  const content_url = body.content_url || null;

  if (!name || typeof name !== "string") {
    name = "Untitled";
  }

  // get the user's membership. If they are premium, then increment yoink.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("membership")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  if (profile.membership == "premium") {
    // increment yoink
    const { data: newYoink, error: insertError } = await supabase
      .from("yoinks")
      .insert([{ user_id: data.user.id, content_url, name }])
      .select()
      .single();

    yoink_id = newYoink.id;

    if (insertError) {
      console.log(insertError);
      return NextResponse.json(
        { error: "Failed to add yoink" },
        { status: 500 }
      );
    }
  } else {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count, error: yoinksError } = await supabase
      .from("yoinks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", data.user.id)
      .gte("created_at", startOfMonth.toISOString());

    if (yoinksError) {
      return NextResponse.json(
        { error: "Failed to fetch yoinks" },
        { status: 500 }
      );
    } else if (count && count > 4) {
      return NextResponse.json(
        { error: "Monthly yoink limit reached" },
        { status: 403 }
      );
    } else {
      const { data: newYoink, error: insertError } = await supabase
        .from("yoinks")
        .insert([{ user_id: data.user.id, content_url, name }])
        .select()
        .single();

      yoink_id = newYoink.id;

      if (insertError) {
        return NextResponse.json(
          { error: "Failed to add yoink" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ yoink_id });
}
