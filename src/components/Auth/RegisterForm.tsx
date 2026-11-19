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
import { User, Mail, Phone, ArrowRight } from "lucide-react";
import AuthHeader from "./AuthHeader";
import AuthSocialButton from "./AuthSocialButton";
import AuthSeparator from "./AuthSeparator";
import PasswordInputField from "./PasswordInputField";
import { toast } from "@/components/ui/toast";
import { registerAction } from "@/actions/Auth.action";
import { registerSchema, type RegisterFormValues } from "@/schemas/auth.schema";

const DEFAULT_FORM_VALUES: RegisterFormValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
  rePassword: "",
};

const DESKTOP_INPUT_CLASS =
  "h-9 px-3 rounded-lg border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus-visible:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/15 text-xs sm:text-sm transition-all";

const DESKTOP_PASS_INPUT_CLASS =
  "h-9 pl-3 pr-9 rounded-lg border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus-visible:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-500/15 text-xs sm:text-sm transition-all";

export default function RegisterForm() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    const res = await registerAction(data);

    if (res.message === "success") {
      toast.add({
        type: "success",
        description: "Account created successfully! Welcome to FreshCart.",
        timeout: 3000,
      });
      reset(DEFAULT_FORM_VALUES);
      router.push("/login");
    } else if (res.message === "Account Already Exists") {
      toast.add({
        type: "error",
        description: "An account with this email already exists. Please sign in.",
        timeout: 3500,
      });
    } else {
      toast.add({
        type: "error",
        description: "Unable to complete registration right now. Please try again later.",
        timeout: 3500,
      });
    }
  };

  return (
    <div className="w-full">
      <AuthHeader
        title="Create an Account"
        subtitle="Join FreshCart and get 20% off your first grocery order."
        className="mb-2.5"
        showLogo={false}
      />

      <AuthSocialButton
        label="Sign up with Google"
        className="h-10 px-3.5 rounded-xl text-xs font-semibold"
      />

      <AuthSeparator label="or register with email" className="my-2.5 sm:my-3" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
        <FieldGroup className="gap-2.5">
          <FieldSet className="gap-2">
            <FieldLegend className="sr-only">Personal Information</FieldLegend>
            <FieldDescription className="sr-only">
              Enter your details to create an account.
            </FieldDescription>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Field data-invalid={!!errors.name} className="gap-1">
                  <FieldLabel htmlFor="desktop-register-name" className="text-[11px] font-semibold text-slate-700">
                    <User className="w-3.5 h-3.5 text-slate-400 stroke-[2.2]" />
                    <span>Full Name</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="desktop-register-name"
                    type="text"
                    placeholder="e.g. Sarah Mansour"
                    autoComplete="name"
                    className={DESKTOP_INPUT_CLASS}
                  />
                  {errors.name && (
                    <FieldError className="text-[10px] text-destructive mt-0.5">{errors.name.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Field data-invalid={!!errors.phone} className="gap-1">
                  <FieldLabel htmlFor="desktop-register-phone" className="text-[11px] font-semibold text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-slate-400 stroke-[2.2]" />
                    <span>Phone Number</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="desktop-register-phone"
                    type="tel"
                    placeholder="01012345678"
                    autoComplete="tel"
                    className={DESKTOP_INPUT_CLASS}
                  />
                  {errors.phone && (
                    <FieldError className="text-[10px] text-destructive mt-0.5">{errors.phone.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field data-invalid={!!errors.email} className="gap-1">
                  <FieldLabel htmlFor="desktop-register-email" className="text-[11px] font-semibold text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-slate-400 stroke-[2.2]" />
                    <span>Email Address</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="desktop-register-email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={DESKTOP_INPUT_CLASS}
                  />
                  {errors.email && (
                    <FieldError className="text-[10px] text-destructive mt-0.5">{errors.email.message}</FieldError>
                  )}
                </Field>
              )}
            />

            <PasswordInputField
              name="password"
              control={control}
              errors={errors}
              label="Password"
              id="desktop-register-password"
              placeholder="More than 6 characters"
              autoComplete="new-password"
              className="gap-1"
              labelClassName="text-[11px] font-semibold text-slate-700"
              inputClassName={DESKTOP_PASS_INPUT_CLASS}
            />

            <PasswordInputField
              name="rePassword"
              control={control}
              errors={errors}
              label="Confirm Password"
              id="desktop-register-rePassword"
              placeholder="Repeat your password"
              autoComplete="new-password"
              className="gap-1"
              labelClassName="text-[11px] font-semibold text-slate-700"
              inputClassName={DESKTOP_PASS_INPUT_CLASS}
            />
          </FieldSet>
        </FieldGroup>

        <p className="text-[10px] text-slate-500 text-center leading-tight pt-0.5">
          By registering, you agree to our{" "}
          <Link href="#" className="text-emerald-600 font-semibold hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-emerald-600 font-semibold hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-9.5 mt-1 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white font-bold text-xs tracking-wide shadow-[0_6px_16px_-3px_rgba(16,185,129,0.35)] hover:shadow-[0_10px_20px_-3px_rgba(16,185,129,0.45)] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
