import { Metadata } from "next";
import AuthCardWrapper from "@/components/Auth/AuthCardWrapper";
import LoginShowcase from "@/components/Auth/LoginShowcase";
import ForgotPasswordView from "@/components/Auth/ForgotPasswordView";

export const metadata: Metadata = {
  title: "Forgot Password - FreshCart",
  description: "Reset your FreshCart account password securely.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCardWrapper maxWidth="max-w-[1240px]">
      <LoginShowcase />

      <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start lg:justify-center items-center px-4 pt-8 pb-12 sm:px-8 sm:pt-10 sm:pb-16 xl:px-14 lg:py-12 bg-white w-full">
        <div className="w-full max-w-[460px]">
          <ForgotPasswordView />
        </div>
      </div>
    </AuthCardWrapper>
  );
}
