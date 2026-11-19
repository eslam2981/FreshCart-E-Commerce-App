"use client";

import { Control, Controller, FieldErrors } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import WizardStepActions from "../WizardStepActions";
import type { RegisterFormValues } from "@/schemas/auth.schema";

interface StepPhoneProps {
  control: Control<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepPhone({ control, errors, onNext, onPrev }: StepPhoneProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Field data-invalid={!!errors.phone} className="gap-2">
            <FieldLabel htmlFor="register-phone" className="text-xs sm:text-sm font-semibold text-slate-700">
              <Phone className="w-4 h-4 text-slate-400 stroke-[2.2]" />
              <span>Phone Number</span>
            </FieldLabel>
            <Input
              {...field}
              id="register-phone"
              type="tel"
              placeholder="01012345678"
              autoComplete="tel"
              autoFocus
              className="h-12 px-4 rounded-xl border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus-visible:border-emerald-600 focus-visible:ring-4 focus-visible:ring-emerald-500/15 focus-visible:shadow-[0_4px_16px_rgba(16,185,129,0.12)] text-base md:text-sm transition-all duration-200"
            />
            {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
          </Field>
        )}
      />

      <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80 text-xs text-emerald-800 flex items-start gap-2.5">
        <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Used exclusively for live driver GPS coordination and order arrival updates. We never share your phone number.
        </p>
      </div>

      <WizardStepActions onPrev={onPrev} onNext={onNext} />
    </div>
  );
}
