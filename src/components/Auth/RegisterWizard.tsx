"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
} from "@/components/ui/field";
import AuthHeader from "./AuthHeader";
import RegisterStepper from "./RegisterStepper";
import StepName from "./steps/StepName";
import StepPhone from "./steps/StepPhone";
import StepEmail from "./steps/StepEmail";
import StepSecurity from "./steps/StepSecurity";
import { toast } from "@/components/ui/toast";
import { registerAction } from "@/actions/Auth.action";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/schemas/auth.schema";

const STEPS_META = [
  {
    num: 1,
    label: "Name",
    title: "Create an Account",
    subtitle: "Join FreshCart and get 20% off your first grocery order.",
  },
  {
    num: 2,
    label: "Phone",
    title: "Your Phone Number",
    subtitle: "We'll use this to coordinate your 30-min express deliveries.",
  },
  {
    num: 3,
    label: "Email",
    title: "Your Email Address",
    subtitle: "We'll send your receipts, invoices, and coupons here.",
  },
  {
    num: 4,
    label: "Security",
    title: "Set a Password",
    subtitle: "Choose a strong password to keep your account safe.",
  },
] as const;

const TOTAL_STEPS = STEPS_META.length;

const STEP_VALIDATION_FIELDS: Record<number, (keyof RegisterFormValues)[]> = {
  1: ["name"],
  2: ["phone"],
  3: ["email"],
  4: ["password", "rePassword"],
};

const DEFAULT_FORM_VALUES: RegisterFormValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  rePassword: "",
};

export default function RegisterWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const {
    control,
    handleSubmit,
    reset,
    trigger,
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
      setStep(1);
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

  const handleNext = async () => {
    const fieldsToValidate = STEP_VALIDATION_FIELDS[step];
    const isValid = fieldsToValidate ? await trigger(fieldsToValidate) : true;

    if (isValid) {
      setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step < TOTAL_STEPS) {
      e.preventDefault();
      handleNext();
    }
  };

  const currentStepMeta = STEPS_META[step - 1];

  return (
    <div className="w-full">
      <AuthHeader
        title={currentStepMeta.title}
        subtitle={currentStepMeta.subtitle}
      />

      <RegisterStepper
        step={step}
        totalSteps={TOTAL_STEPS}
        currentLabel={currentStepMeta.label}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        className="space-y-6"
      >
        <FieldGroup className="gap-6">
          <FieldSet className="gap-6">
            <FieldLegend className="sr-only">Registration Information</FieldLegend>
            <FieldDescription className="sr-only">
              Fill in your details step-by-step to create an account.
            </FieldDescription>

            {step === 1 && (
              <StepName
                control={control}
                errors={errors}
                onNext={handleNext}
              />
            )}

            {step === 2 && (
              <StepPhone
                control={control}
                errors={errors}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {step === 3 && (
              <StepEmail
                control={control}
                errors={errors}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            )}

            {step === 4 && (
              <StepSecurity
                control={control}
                errors={errors}
                onPrev={handlePrev}
                isSubmitting={isSubmitting}
              />
            )}
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
}
