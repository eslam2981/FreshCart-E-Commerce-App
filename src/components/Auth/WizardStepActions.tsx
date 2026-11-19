"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface WizardStepActionsProps {
  onPrev?: () => void;
  onNext?: () => void;
  showPrev?: boolean;
  isLastStep?: boolean;
  isSubmitting?: boolean;
  nextLabel?: string;
  submitLabel?: string;
}

export default function WizardStepActions({
  onPrev,
  onNext,
  showPrev = true,
  isLastStep = false,
  isSubmitting = false,
  nextLabel = "Continue",
  submitLabel = "Create Free Account",
}: WizardStepActionsProps) {
  return (
    <div className={`flex items-center gap-3 ${showPrev ? "pt-2" : "mt-4"}`}>
      {showPrev && onPrev && (
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="h-12 sm:h-[50px] px-5 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2]" />
          <span>Back</span>
        </Button>
      )}

      {isLastStep ? (
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 h-12 sm:h-[50px] rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white font-bold text-sm tracking-wide shadow-[0_10px_25px_-5px_rgba(16,185,129,0.45)] hover:shadow-[0_16px_32px_-5px_rgba(16,185,129,0.55)] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>Creating Account...</span>
          ) : (
            <>
              <span>{submitLabel}</span>
              <Check className="w-4 h-4 stroke-[2.5]" />
            </>
          )}
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onNext}
          className={`${
            showPrev ? "flex-1" : "w-full"
          } h-12 sm:h-[50px] rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-700 text-white font-bold text-sm tracking-wide shadow-[0_10px_25px_-5px_rgba(16,185,129,0.45)] hover:shadow-[0_16px_32px_-5px_rgba(16,185,129,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2`}
        >
          <span>{nextLabel}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Button>
      )}
    </div>
  );
}
