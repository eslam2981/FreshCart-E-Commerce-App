"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  updateLoggedUserData,
  updateLoggedUserPassword,
} from "@/services/user.service";
import { toast } from "@/components/ui/toast";
import { UserCheck, KeyRound, Loader2 } from "lucide-react";

export default function ProfileSecurity() {
  const { data: session, update } = useSession();
  const token = session?.token;
  const user = session?.user;

  // Profile data state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState((user as { phone?: string })?.phone || "");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      setIsUpdatingProfile(true);

      const payload: { name: string; phone: string; email?: string } = {
        name: name.trim(),
        phone: phone.trim(),
      };

      // Only send email if user updated it (avoids Route API email duplicate check bug)
      if (email.trim() && email.trim().toLowerCase() !== user?.email?.toLowerCase()) {
        payload.email = email.trim();
      }

      const res = await updateLoggedUserData(payload, token);

      if (res.message === "success" || Boolean(res.user)) {
        toast.add({
          type: "success",
          description: "Profile updated successfully!",
          timeout: 3000,
        });
        if (update) {
          void update();
        }
      } else {
        const errorMsg =
          (Array.isArray(res.errors) ? res.errors[0]?.msg : (res.errors as { msg?: string })?.msg) ||
          (res.message && res.message !== "fail" ? res.message : undefined) ||
          res.statusMsg ||
          "Failed to update profile.";

        toast.add({
          type: "error",
          description: errorMsg,
          timeout: 4000,
        });
      }
    } catch {
      toast.add({
        type: "error",
        description: "Something went wrong while updating profile.",
        timeout: 3000,
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (newPassword !== rePassword) {
      toast.add({
        type: "error",
        description: "New passwords do not match.",
        timeout: 3000,
      });
      return;
    }

    try {
      setIsUpdatingPassword(true);
      const res = await updateLoggedUserPassword(
        { currentPassword, password: newPassword, rePassword },
        token
      );

      if (res.message === "success" || Boolean(res.token)) {
        toast.add({
          type: "success",
          description: "Password changed successfully!",
          timeout: 3000,
        });
        setCurrentPassword("");
        setNewPassword("");
        setRePassword("");
      } else {
        const errorMsg =
          (Array.isArray(res.errors) ? res.errors[0]?.msg : (res.errors as { msg?: string })?.msg) ||
          (res.message && res.message !== "fail" ? res.message : undefined) ||
          res.statusMsg ||
          "Failed to change password.";

        toast.add({
          type: "error",
          description: errorMsg,
          timeout: 4000,
        });
      }
    } catch {
      toast.add({
        type: "error",
        description: "Something went wrong while changing password.",
        timeout: 3000,
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Update Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCheck className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Update Profile</h2>
              <p className="text-xs text-slate-400">Modify your personal contact details</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01012345678"
                className="w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                {isUpdatingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <KeyRound className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
              <p className="text-xs text-slate-400">Ensure your account is protected with a strong password</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-emerald-500 transition-all"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isUpdatingPassword}
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                {isUpdatingPassword && <Loader2 className="w-4 h-4 animate-spin" />}
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
