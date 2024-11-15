const z = require('zod');

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(50, { message: 'Name must be at most 50 characters long' })
    .trim(),
  email: z.string().email({ message: 'Invalid email' }).toLowerCase(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(50, { message: 'Password must be at most 50 characters long' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Confirm password must be at least 6 characters long' })
    .max(50, {
      message: 'Confirm password must be at most 50 characters long',
    })
    .refine(
      (data: { password: string; confirmPassword: string }) =>
        data.password === data.confirmPassword,
      {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      }
    ),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email entered' }).toLowerCase(),
  password: z.string(),
});
