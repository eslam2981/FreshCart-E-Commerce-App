import AuthCardWrapper from "@/components/Auth/AuthCardWrapper";
import LoginShowcase from "@/components/Auth/LoginShowcase";
import AuthHeader from "@/components/Auth/AuthHeader";
import LoginForm from "@/components/Auth/LoginForm";
import AuthFooter from "@/components/Auth/AuthFooter";

export default function Login() {
  return (
    <AuthCardWrapper maxWidth="max-w-[1240px]">
      <LoginShowcase />

      <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start lg:justify-center items-center px-4 pt-8 pb-12 sm:px-8 sm:pt-10 sm:pb-16 xl:px-14 lg:py-12 bg-white w-full">
        <div className="w-full max-w-[460px]">
          <AuthHeader
            title="Welcome Back"
            subtitle="Sign in to manage your orders, wishlist, and fresh groceries."
          />
          <LoginForm />
          <AuthFooter
            promptText="Don't have an account?"
            linkText="Create an account"
            linkHref="/register"
          />
        </div>
      </div>
    </AuthCardWrapper>
  );
}
