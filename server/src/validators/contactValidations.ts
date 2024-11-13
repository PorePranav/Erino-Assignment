import { z } from 'zod';

export const createContactSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name must be at most 50 characters' })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name must be at most 50 characters' })
    .trim(),
  email: z.string().email('Invalid email').optional(),
  phoneNumber: z
    .string()
    .min(10, { message: 'Phone number should be at least 10 characters' }),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
});

export const updateContactSchema = createContactSchema;
