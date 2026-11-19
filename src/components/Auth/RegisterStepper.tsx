import React from "react";

interface RegisterStepperProps {
  step: number;
  totalSteps: number;
  currentLabel: string;
}

export default function RegisterStepper({
  step,
  totalSteps,
  currentLabel,
}: RegisterStepperProps) {
  const percentage = Math.round((step / totalSteps) * 100);

  return (
    <div className="mb-5 w-full">
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="font-bold text-emerald-600">
          Step {step} of {totalSteps} &bull; {currentLabel}
        </span>
        <span className="font-semibold text-slate-400">
          {percentage}% Completed
        </span>
      </div>
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
