import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string().trim().min(1, "First name cannot be empty"),

  lastName: z.string().trim().min(1, "Last name cannot be empty"),

  email: z.string().trim().email("Please enter a valid email address"),

  phone: z.string().trim().optional(),
  role: z
    .enum(["Admin", "User"], {
      errorMap: () => ({ message: "Role must be either 'Admin' or 'User'" }),
    })
    .default("User"),

  status: z
    .enum(["Active", "Inactive"], {
      errorMap: () => ({
        message: "Status must be either 'Active' or 'Inactive'",
      }),
    })
    .default("Active"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateUserSchema = z.object({
  firstName: z.string().trim().min(1, "First name cannot be empty").optional(),

  lastName: z.string().trim().min(1, "Last name cannot be empty").optional(),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional(),

  phone: z.string().trim().optional(),
  role: z.enum(["Admin", "User"]).optional(),

  status: z.enum(["Active", "Inactive"]).optional(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
