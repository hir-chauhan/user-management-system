import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z.string().optional(),
  role: z.enum(['Admin', 'User']),
  status: z.enum(['Active', 'Inactive']),
  password: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;