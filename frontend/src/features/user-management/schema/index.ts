import { z } from 'zod';

const phoneValidation = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => {
      if (!val || val.length === 0) return true;
      const digitsOnly = val.replace(/\D/g, '');
      const validFormat = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/.test(val);
      return validFormat && digitsOnly.length >= 7 && digitsOnly.length <= 15;
    },
    { message: 'Please enter a valid phone number (7-15 digits)' }
  );

export const formSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: phoneValidation,
  role: z.enum(['Admin', 'User']),
  status: z.enum(['Active', 'Inactive']),
  password: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;