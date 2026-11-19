import { Metadata } from "next";
import ProfileView from "@/components/Profile/ProfileView";

export const metadata: Metadata = {
  title: "My Profile - FreshCart",
  description: "Manage your personal profile and account settings at FreshCart.",
};

export default function ProfilePage() {
  return <ProfileView />;
}
