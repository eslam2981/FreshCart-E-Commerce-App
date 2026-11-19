"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import AuthSocialButton from "./AuthSocialButton";
import AuthSeparator from "./AuthSeparator";
import PasswordInputField from "./PasswordInputField";
import { toast } from "@/components/ui/toast";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { signIn } from "next-auth/react";

const DEFAULT_LOGIN_VALUES: LoginFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export default function LoginForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: DEFAULT_LOGIN_VALUES,
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Submitting login form:", data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log("NextAuth signIn response:", res);

    if (res?.ok) {
      toast.add({
        type: "success",
        description: "Signed in successfully! Welcome back.",
        timeout: 3000,
      });
      reset(DEFAULT_LOGIN_VALUES);
      router.push("/");
      router.refresh();
    } else {
      toast.add({
        type: "error",
        description: "Incorrect email or password. Please try again.",
        timeout: 3500,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-7">
        <AuthSocialButton
          label="Continue with Google"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        />
      </div>

      <AuthSeparator label="or continue with email" className="my-6 sm:my-7" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="gap-6">
          <FieldSet className="gap-6">
            <FieldLegend className="sr-only">Account Credentials</FieldLegend>
            <FieldDescription className="sr-only">
              Enter your registered email address and password.
            </FieldDescription>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field data-invalid={!!errors.email} className="gap-2">
                  <FieldLabel htmlFor="login-email" className="text-xs sm:text-sm font-semibold text-slate-700">
                    <Mail className="w-4 h-4 text-slate-400 stroke-[2.2]" />
                    <span>Email Address</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="h-12 px-4 rounded-xl border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus-visible:border-emerald-600 focus-visible:ring-4 focus-visible:ring-emerald-500/15 focus-visible:shadow-[0_4px_16px_rgba(16,185,129,0.12)] text-base md:text-sm transition-all duration-200"
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <PasswordInputField
              name="password"
              control={control}
              errors={errors}
              label="Password"
              id="login-password"
              placeholder="••••••••"
              autoComplete="current-password"
              headerRight={
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Forgot password?
                </Link>
              }
            />
          </FieldSet>
        </FieldGroup>

        <div className="pt-1">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field: { value, onChange } }) => (
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                />
                <span className="text-xs sm:text-sm text-slate-600 font-medium">
                  Remember me on this device
                </span>
              </label>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 sm:h-[50px] mt-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white font-bold text-sm tracking-wide shadow-[0_10px_25px_-5px_rgba(16,185,129,0.45)] hover:shadow-[0_16px_32px_-5px_rgba(16,185,129,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
