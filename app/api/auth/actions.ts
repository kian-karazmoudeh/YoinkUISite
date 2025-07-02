"use server";

import { DOMAIN } from "@/utils/getDomain";
import { createClient } from "@/utils/supabase/server";

export async function authWithGoogle(next: string = "/pricing") {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${DOMAIN}/api/auth/callback?next=${btoa(next)}`,
    },
  });

  if (error) {
    return { status: "error", message: error.message };
  } else {
    return { status: "confirm", message: data.url };
  }
}

export async function authWithGithub(next: string = "/pricing") {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${DOMAIN}/api/auth/callback?next=${btoa(next)}`,
    },
  });

  if (error) {
    return { status: "error", message: error.message };
  } else {
    return { status: "confirm", message: data.url };
  }
}
