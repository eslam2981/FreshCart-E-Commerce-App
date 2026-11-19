"use client";

import React, { useState } from "react";
import { Control, Controller, FieldErrors, Path, FieldValues } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordInputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  label: string;
  id: string;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  headerRight?: React.ReactNode;
}

export default function PasswordInputField<T extends FieldValues>({
  name,
  control,
  errors,
  label,
  id,
  placeholder = "More than 6 chars",
  autoComplete = "new-password",
  autoFocus = false,
  className = "gap-2",
  inputClassName = "h-12 pl-4 pr-11 rounded-xl border-slate-200 bg-slate-50/70 hover:bg-slate-50 focus:bg-white focus-visible:border-emerald-600 focus-visible:ring-4 focus-visible:ring-emerald-500/15 focus-visible:shadow-[0_4px_16px_rgba(16,185,129,0.12)] text-base md:text-sm transition-all duration-200",
  labelClassName = "text-xs sm:text-sm font-semibold text-slate-700",
  headerRight,
}: PasswordInputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field data-invalid={!!errors[name]} className={className}>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor={id} className={labelClassName}>
              <Lock className="w-4 h-4 text-slate-400 stroke-[2.2]" />
              <span>{label}</span>
            </FieldLabel>
            {headerRight}
          </div>
          <div className="relative">
            <Input
              {...field}
              id={id}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              autoComplete={autoComplete}
              autoFocus={autoFocus}
              className={inputClassName}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer transition-colors"
              aria-label={showPassword ? `Hide ${label}` : `Show ${label}`}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4 stroke-[2]" />
              ) : (
                <Eye className="w-4 h-4 stroke-[2]" />
              )}
            </button>
          </div>
          {errorMessage && (
            <FieldError className="text-[10px] sm:text-xs text-destructive mt-0.5">
              {errorMessage}
            </FieldError>
          )}
        </Field>
      )}
    />
  );
}
