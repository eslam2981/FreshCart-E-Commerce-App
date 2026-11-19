"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import WizardStepActions from "../WizardStepActions";
import type { RegisterFormValues } from "@/schemas/auth.schema";

interface StepEmailProps {
  control: Control<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepEmail({ control, errors, onNext, onPrev }: StepEmailProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Field data-invalid={!!errors.email} className="gap-2">
            <FieldLabel htmlFor="register-email" className="text-xs sm:text-sm font-semibold text-slate-700">
              <Mail className="w-4 h-4 text-slate-400 stroke-[2.2]" />
              <span>Email Address</span>
            </FieldLabel>
            <Input
              {...field}
              id="register-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              autoFocus
              className="h-12 px-4 rounded-xl border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus-visible:border-emerald-600 focus-visible:ring-4 focus-visible:ring-emerald-500/15 focus-visible:shadow-[0_4px_16px_rgba(16,185,129,0.12)] text-base md:text-sm transition-all duration-200"
            />
            {errors.email && <FieldError>{errors.email.message}</FieldError>}
          </Field>
        )}
      />

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
        <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Official tax invoices, digital receipts, and VIP discount coupons will be sent to this email address.
        </p>
      </div>

      <WizardStepActions onPrev={onPrev} onNext={onNext} />
    </div>
  );
}
