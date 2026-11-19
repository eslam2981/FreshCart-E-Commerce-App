"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  KeyRound,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import {
  forgotPasswordAction,
  verifyResetCodeAction,
  resetPasswordAction,
} from "@/actions/Auth.action";
import { toast } from "@/components/ui/toast";

export default function ForgotPasswordView() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 1: Send reset code
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await forgotPasswordAction(email.trim());
      if (res.statusMsg === "success" || res.message?.toLowerCase().includes("reset code sent")) {
        toast.add({
          type: "success",
          description: "Reset code sent! Check your inbox.",
          timeout: 3500,
        });
        setStep(2);
      } else {
        setErrorMessage(res.message || "Failed to send reset code. Please check your email address.");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify reset code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetCode.trim()) {
      setErrorMessage("Please enter the reset code sent to your email.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await verifyResetCodeAction(resetCode.trim());
      if (res.status === "Success" || res.statusMsg === "success") {
        toast.add({
          type: "success",
          description: "Code verified! Please create a new password.",
          timeout: 3000,
        });
        setStep(3);
      } else {
        setErrorMessage(res.message || "Invalid or expired reset code. Please try again.");
      }
    } catch {
      setErrorMessage("Verification failed. Please check the code and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Set new password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await resetPasswordAction(email.trim(), newPassword);
      if (res.token) {
        toast.add({
          type: "success",
          description: "Password reset successfully! You can now sign in.",
          timeout: 4000,
        });
        router.push("/login");
      } else {
        setErrorMessage(res.message || "Failed to reset password. Please try again.");
      }
    } catch {
      setErrorMessage("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100 shadow-xs">
          {step === 1 && <Mail className="w-7 h-7 stroke-[2]" />}
          {step === 2 && <KeyRound className="w-7 h-7 stroke-[2]" />}
          {step === 3 && <Lock className="w-7 h-7 stroke-[2]" />}
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Enter Verification Code"}
          {step === 3 && "Set New Password"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          {step === 1 && "Enter your email address and we'll send you a recovery code."}
          {step === 2 && `Enter the 6-digit code sent to ${email}`}
          {step === 3 && "Choose a strong password with at least 6 characters."}
        </p>

        <div className="flex items-center justify-center gap-2 mt-5">
          <span className={`h-2 rounded-full transition-all ${step === 1 ? "w-8 bg-emerald-600" : "w-2 bg-slate-200"}`} />
          <span className={`h-2 rounded-full transition-all ${step === 2 ? "w-8 bg-emerald-600" : "w-2 bg-slate-200"}`} />
          <span className={`h-2 rounded-full transition-all ${step === 3 ? "w-8 bg-emerald-600" : "w-2 bg-slate-200"}`} />
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2.5 animate-in fade-in-50">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div>
            <label className="text-xs sm:text-sm font-semibold text-slate-700 block mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 text-sm transition-all outline-none"
              />
              <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Code...</span>
              </>
            ) : (
              <>
                <span>Send Reset Code</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div>
            <label className="text-xs sm:text-sm font-semibold text-slate-700 block mb-2">
              6-Digit Reset Code
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                placeholder="e.g. 123456"
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 text-sm font-mono tracking-widest transition-all outline-none"
              />
              <KeyRound className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <span>Verify Code</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full text-xs text-slate-500 hover:text-slate-800 transition-colors py-1 flex items-center justify-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change email address</span>
          </button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="text-xs sm:text-sm font-semibold text-slate-700 block mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 text-sm transition-all outline-none"
              />
              <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm font-semibold text-slate-700 block mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 text-sm transition-all outline-none"
              />
              <ShieldCheck className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Resetting Password...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Update Password</span>
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-8 text-center pt-6 border-t border-slate-100">
        <Link
          href="/login"
          className="text-xs sm:text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
}
