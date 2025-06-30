"use server";

import { createClient } from "@/utils/supabase/server";

export async function authWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/api/auth/callback?next=%2Fapp",
    },
  });

  if (error) {
    return { status: "error", message: error.message };
  } else {
    return { status: "confirm", message: data.url };
  }
}

export async function authWithGithub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/api/auth/callback?next=%2Fapp",
    },
  });

  if (error) {
    return { status: "error", message: error.message };
  } else {
    return { status: "confirm", message: data.url };
  }
}
