"use server";

import { RegisterFormValues } from "@/schemas/auth.schema";

export interface AuthSuccessResponse {
  message: "success";
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export interface AuthFailResponse {
  message?: string;
  statusMsg?: string;
  errors?: {
    msg?: string;
    param?: string;
    location?: string;
  };
}

export type AuthResponse = AuthSuccessResponse | AuthFailResponse;

export async function registerAction(values: RegisterFormValues): Promise<AuthResponse> {
  const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

  try {
    const response = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data: AuthResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Signup Action Error:", error);
    return {
      statusMsg: "fail",
      message:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during signup",
    };
  }
}

// Request password reset code
export async function forgotPasswordAction(email: string): Promise<{ statusMsg?: string; message?: string }> {
  const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/forgotPasswords`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    return res.json();
  } catch (error) {
    return {
      statusMsg: "fail",
      message: error instanceof Error ? error.message : "Failed to send reset code",
    };
  }
}

// Verify password reset code
export async function verifyResetCodeAction(resetCode: string): Promise<{ status?: string; message?: string; statusMsg?: string }> {
  const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/verifyResetCode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resetCode }),
    });

    return res.json();
  } catch (error) {
    return {
      statusMsg: "fail",
      message: error instanceof Error ? error.message : "Failed to verify reset code",
    };
  }
}

// Update password
export async function resetPasswordAction(email: string, newPassword: string): Promise<{ token?: string; statusMsg?: string; message?: string }> {
  const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

  try {
    const res = await fetch(`${BASE_URL}/api/v1/auth/resetPassword`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    return res.json();
  } catch (error) {
    return {
      statusMsg: "fail",
      message: error instanceof Error ? error.message : "Failed to reset password",
    };
  }
}
