import React from "react";

interface AuthCardWrapperProps {
  children: React.ReactNode;
  maxWidth?: string;
}

export default function AuthCardWrapper({
  children,
  maxWidth = "max-w-[1240px]",
}: AuthCardWrapperProps) {
  return (
    <div className="w-full bg-white lg:bg-[#f8fafc] p-0 lg:py-10 xl:py-12 lg:px-6 xl:px-8 flex flex-col lg:flex-row items-center justify-start lg:justify-center min-h-0 lg:min-h-[calc(100vh-140px)]">
      <div
        className={`w-full ${maxWidth} bg-white border-0 lg:border border-slate-200/90 rounded-none lg:rounded-[2rem] shadow-none lg:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.09),0_0_0_1px_rgba(226,232,240,0.8)] overflow-hidden grid grid-cols-1 lg:grid-cols-12`}
      >
        {children}
      </div>
    </div>
  );
}
