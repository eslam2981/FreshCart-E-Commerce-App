import AuthCardWrapper from "@/components/Auth/AuthCardWrapper";
import RegisterShowcase from "@/components/Auth/RegisterShowcase";
import RegisterWizard from "@/components/Auth/RegisterWizard";
import RegisterForm from "@/components/Auth/RegisterForm";
import AuthFooter from "@/components/Auth/AuthFooter";

export default function Register() {
  return (
    <AuthCardWrapper maxWidth="max-w-[1300px]">
      <RegisterShowcase />

      <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start lg:justify-center items-center px-4 pt-8 pb-12 sm:px-8 sm:pt-10 sm:pb-16 xl:px-12 lg:py-5 xl:py-6 bg-white w-full">
        <div className="w-full max-w-[460px]">
          <div className="block lg:hidden">
            <RegisterWizard />
          </div>

          <div className="hidden lg:block">
            <RegisterForm />
          </div>

          <AuthFooter
            promptText="Already have an account?"
            linkText="Sign in"
            linkHref="/login"
          />
        </div>
      </div>
    </AuthCardWrapper>
  );
}
