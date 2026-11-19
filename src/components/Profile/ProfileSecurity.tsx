"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateLoggedUserData,
  updateLoggedUserPassword,
} from "@/services/user.service";
import { toast } from "@/components/ui/toast";
import { UserCheck, KeyRound, Loader2, AlertCircle } from "lucide-react";
import {
  updateProfileSchema,
  changePasswordSchema,
  type UpdateProfileValues,
  type ChangePasswordValues,
} from "@/schemas/auth.schema";

export default function ProfileSecurity() {
  const { data: session, update } = useSession();
  const token = session?.token;
  const user = session?.user;

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors, isSubmitting: isUpdatingProfile },
  } = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: (user as { phone?: string })?.phone || "",
    },
    mode: "onChange",
  });

  // Keep form in sync when session loads
  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.name || "",
        email: user.email || "",
        phone: (user as { phone?: string })?.phone || "",
      });
    }
  }, [user, resetProfile]);

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: isUpdatingPassword },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    mode: "onChange",
  });

  const onUpdateProfile = async (data: UpdateProfileValues) => {
    if (!token) return;

    try {
      const payload: { name: string; phone: string; email?: string } = {
        name: data.name.trim(),
        phone: data.phone.trim(),
      };

      // Only send email if user updated it (avoids Route API email duplicate check bug)
      if (data.email.trim().toLowerCase() !== user?.email?.toLowerCase()) {
        payload.email = data.email.trim();
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
    }
  };

  const onChangePassword = async (data: ChangePasswordValues) => {
    if (!token) return;

    try {
      const res = await updateLoggedUserPassword(
        {
          currentPassword: data.currentPassword,
          password: data.password,
          rePassword: data.rePassword,
        },
        token
      );

      if (res.message === "success" || Boolean(res.token)) {
        toast.add({
          type: "success",
          description: "Password changed successfully!",
          timeout: 3000,
        });
        resetPassword();
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

          <form onSubmit={handleProfileSubmit(onUpdateProfile)} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                {...registerProfile("name")}
                className={`w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border ${
                  profileErrors.name
                    ? "border-rose-400 focus:border-rose-500"
                    : "border-slate-200 focus:border-emerald-500"
                } bg-slate-50/50 focus:bg-white focus:outline-none transition-all`}
              />
              {profileErrors.name && (
                <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{profileErrors.name.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...registerProfile("email")}
                className={`w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border ${
                  profileErrors.email
                    ? "border-rose-400 focus:border-rose-500"
                    : "border-slate-200 focus:border-emerald-500"
                } bg-slate-50/50 focus:bg-white focus:outline-none transition-all`}
              />
              {profileErrors.email && (
                <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{profileErrors.email.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number (e.g. 01012345678)
              </label>
              <input
                type="tel"
                placeholder="01012345678"
                {...registerProfile("phone")}
                className={`w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border ${
                  profileErrors.phone
                    ? "border-rose-400 focus:border-rose-500"
                    : "border-slate-200 focus:border-emerald-500"
                } bg-slate-50/50 focus:bg-white focus:outline-none transition-all`}
              />
              {profileErrors.phone && (
                <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{profileErrors.phone.message}</span>
                </p>
              )}
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

          <form onSubmit={handlePasswordSubmit(onChangePassword)} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...registerPassword("currentPassword")}
                className={`w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border ${
                  passwordErrors.currentPassword
                    ? "border-rose-400 focus:border-rose-500"
                    : "border-slate-200 focus:border-emerald-500"
                } bg-slate-50/50 focus:bg-white focus:outline-none transition-all`}
              />
              {passwordErrors.currentPassword && (
                <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{passwordErrors.currentPassword.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                New Password (1 Uppercase + 1 Special Character)
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...registerPassword("password")}
                className={`w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border ${
                  passwordErrors.password
                    ? "border-rose-400 focus:border-rose-500"
                    : "border-slate-200 focus:border-emerald-500"
                } bg-slate-50/50 focus:bg-white focus:outline-none transition-all`}
              />
              {passwordErrors.password && (
                <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{passwordErrors.password.message}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...registerPassword("rePassword")}
                className={`w-full h-11 px-3.5 text-xs sm:text-sm rounded-xl border ${
                  passwordErrors.rePassword
                    ? "border-rose-400 focus:border-rose-500"
                    : "border-slate-200 focus:border-emerald-500"
                } bg-slate-50/50 focus:bg-white focus:outline-none transition-all`}
              />
              {passwordErrors.rePassword && (
                <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{passwordErrors.rePassword.message}</span>
                </p>
              )}
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
