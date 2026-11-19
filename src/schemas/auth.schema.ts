import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{7,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      passwordRegex,
      "Password must be more than 6 characters and contain at least one uppercase letter and one special character"
    ),
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
      .regex(
        /^01[0125][0-9]{8}$/,
        "Please enter a valid Egyptian mobile number (e.g. 01012345678)"
      ),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        passwordRegex,
        "Password must be more than 6 characters and contain at least one uppercase letter and one special character"
      ),
    rePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
