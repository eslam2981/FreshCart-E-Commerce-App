"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import AuthSocialButton from "../AuthSocialButton";
import AuthSeparator from "../AuthSeparator";
import WizardStepActions from "../WizardStepActions";
import type { RegisterFormValues } from "@/schemas/auth.schema";

interface StepNameProps {
  control: Control<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  onNext: () => void;
}

export default function StepName({ control, errors, onNext }: StepNameProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <AuthSocialButton label="Sign up with Google" />

      <AuthSeparator label="or register with email" className="my-6 sm:my-7" />

      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Field data-invalid={!!errors.name} className="gap-2">
            <FieldLabel htmlFor="register-name" className="text-xs sm:text-sm font-semibold text-slate-700">
              <User className="w-4 h-4 text-slate-400 stroke-[2.2]" />
              <span>Full Name</span>
            </FieldLabel>
            <Input
              {...field}
              id="register-name"
              type="text"
              placeholder="e.g. Sarah Mansour"
              autoComplete="name"
              autoFocus
              className="h-12 px-4 rounded-xl border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus-visible:border-emerald-600 focus-visible:ring-4 focus-visible:ring-emerald-500/15 focus-visible:shadow-[0_4px_16px_rgba(16,185,129,0.12)] text-base md:text-sm transition-all duration-200"
            />
            {errors.name && <FieldError>{errors.name.message}</FieldError>}
          </Field>
        )}
      />

      <WizardStepActions onNext={onNext} showPrev={false} />

      <div className="pt-4 flex items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-100">
        <span className="flex items-center gap-1">
          <span className="text-emerald-600 font-bold">✓</span> Free Cairo Delivery
        </span>
        <span className="flex items-center gap-1">
          <span className="text-emerald-600 font-bold">✓</span> 30-Min Chilled
        </span>
        <span className="flex items-center gap-1">
          <span className="text-emerald-600 font-bold">✓</span> 100% Quality
        </span>
      </div>
    </div>
  );
}
