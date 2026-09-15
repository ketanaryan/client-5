import { z } from 'zod';

export const UserRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().optional(),
});

export const WorkRequestSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  dueDate: z.string().datetime().optional(),
});

// Additional Zod schemas for forms and APIs...
