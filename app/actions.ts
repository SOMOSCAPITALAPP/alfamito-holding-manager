"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateUser } from "@/lib/auth";
import { sessionCookieName } from "@/lib/session";

export async function loginAction(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const user = validateUser(email, password);

  if (!user) {
    redirect("/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, user.email, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect("/dashboard");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
  redirect("/login");
}
