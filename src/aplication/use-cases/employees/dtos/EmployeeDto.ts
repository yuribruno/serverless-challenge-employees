import { z } from 'zod';

export const CreateEmployeeSchema = z.object({
  name: z.string().min(3, "The employee name must have at least 3 characters."),
  age: z.number().min(18, "The employee must be of legal age."),
  position: z.string().min(2, "The employee must be of legal age.")
});

export const UpdateEmployeeSchema = CreateEmployeeSchema.partial();

export type CreateEmployeeDto = z.infer<typeof CreateEmployeeSchema>;
export type UpdateEmployeeDto = z.infer<typeof UpdateEmployeeSchema>;