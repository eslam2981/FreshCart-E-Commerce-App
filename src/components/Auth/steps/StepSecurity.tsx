"use client";

import Link from "next/link";
import { Control, FieldErrors } from "react-hook-form";
import PasswordInputField from "../PasswordInputField";
import WizardStepActions from "../WizardStepActions";
import type { RegisterFormValues } from "@/schemas/auth.schema";

interface StepSecurityProps {
  control: Control<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  onPrev: () => void;
  isSubmitting: boolean;
}

export default function StepSecurity({
  control,
  errors,
  onPrev,
  isSubmitting,
}: StepSecurityProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PasswordInputField
        name="password"
        control={control}
        errors={errors}
        label="Password"
        id="register-password"
        placeholder="More than 6 chars"
        autoComplete="new-password"
        autoFocus
      />

      <PasswordInputField
        name="rePassword"
        control={control}
        errors={errors}
        label="Confirm Password"
        id="register-rePassword"
        placeholder="Repeat password"
        autoComplete="new-password"
      />

      <p className="text-xs text-slate-500 leading-relaxed text-center pt-1">
        By creating an account, you agree to our{" "}
        <Link href="#" className="text-emerald-600 font-semibold hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-emerald-600 font-semibold hover:underline">
          Privacy Policy
        </Link>
        .
      </p>

      <WizardStepActions
        onPrev={onPrev}
        isLastStep
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
