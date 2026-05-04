import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import users from "@/data/users.json";
import { sessionCookieName, verifySessionToken } from "@/lib/session";
import type { User } from "@/lib/types";

export async function getCurrentUser(): Promise<Omit<User, "password"> | null> {
  const cookieStore = await cookies();
  const session = await verifySessionToken(
    cookieStore.get(sessionCookieName)?.value,
  );
  if (!session) {
    return null;
  }

  const user = (users as User[]).find((item) => item.email === session.email);
  if (!user) {
    return null;
  }

  const { password: _password, ...publicUser } = user;
  return publicUser;
}

export async function requireUser(): Promise<Omit<User, "password">> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export function validateUser(email: string, password: string): User | null {
  return (
    (users as User[]).find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase().trim() &&
        user.password === password,
    ) ?? null
  );
}
