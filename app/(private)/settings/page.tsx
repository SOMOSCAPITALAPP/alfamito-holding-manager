import { SettingsView } from "@/components/SettingsView";
import users from "@/data/users.json";
import type { User } from "@/lib/types";

export default function SettingsPage() {
  return <SettingsView users={users as User[]} />;
}
