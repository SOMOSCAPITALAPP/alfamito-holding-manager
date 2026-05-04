"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateUser } from "@/lib/auth";
import {
  createSessionToken,
  sessionCookieName,
  sessionMaxAgeSeconds,
} from "@/lib/session";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");
  const user = validateUser(email, password);

  if (!user) {
    redirect("/login?error=1");
  }

  const token = await createSessionToken(user.email);
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAgeSeconds,
  });

  redirect(next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
  redirect("/login");
}
