import { z } from "zod";

export const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{7,}$/;
export const phoneRegex = /^01[0125][0-9]{8}$/;
export const resetCodeRegex = /^\d{6}$/;

export const passwordErrorMessage =
  "Password must be more than 6 characters and contain at least one uppercase letter and one special character";
export const phoneErrorMessage =
  "Please enter a valid Egyptian mobile number (e.g. 01012345678)";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(passwordRegex, passwordErrorMessage),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(3, "Full name must be at least 3 characters")
      .max(50, "Full name cannot exceed 50 characters"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(phoneRegex, phoneErrorMessage),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(passwordRegex, passwordErrorMessage),
    rePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// Forgot Password Step 1: Send reset code
export const forgotPasswordEmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});
export type ForgotPasswordEmailValues = z.infer<typeof forgotPasswordEmailSchema>;

// Forgot Password Step 2: Verify reset code
export const verifyResetCodeSchema = z.object({
  resetCode: z
    .string()
    .min(1, "Reset code is required")
    .regex(resetCodeRegex, "Reset code must be exactly 6 digits"),
});
export type VerifyResetCodeValues = z.infer<typeof verifyResetCodeSchema>;

// Forgot Password Step 3: Set new password
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Password is required")
      .regex(passwordRegex, passwordErrorMessage),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

// Profile Data Update
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, phoneErrorMessage),
});
export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

// Change Password in Profile
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z
      .string()
      .min(1, "New password is required")
      .regex(passwordRegex, passwordErrorMessage),
    rePassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "New passwords do not match",
    path: ["rePassword"],
  });
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

// Checkout shipping address
export const checkoutAddressSchema = z.object({
  city: z.string().min(1, "Please select a city"),
  details: z
    .string()
    .min(1, "Street address is required")
    .min(5, "Please enter a detailed street address (at least 5 characters)"),
  phone: z
    .string()
    .min(1, "Contact phone number is required")
    .regex(phoneRegex, phoneErrorMessage),
});
export type CheckoutAddressValues = z.infer<typeof checkoutAddressSchema>;

// Saved user address
export const addressSchema = z.object({
  name: z.string().min(1, "Address label is required (e.g. Home, Work)"),
  details: z
    .string()
    .min(1, "Street details are required")
    .min(5, "Please provide complete street address details"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, phoneErrorMessage),
  city: z.string().min(1, "Please select a city"),
});
export type AddressValues = z.infer<typeof addressSchema>;

