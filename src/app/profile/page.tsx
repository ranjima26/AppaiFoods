import type { Metadata } from "next";
import Profile from "@/app/components/profile";

export const metadata: Metadata = { title: "My Account | Appai Foods" };

export default function ProfilePage() {
  return <Profile />;
}
