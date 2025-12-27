import { ZodError } from 'zod';

export const formatError = (error: any) => {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Validation failed",
        errors: error.issues.map(i => ({ field: i.path.join('.'), message: i.message }))
      }),
    };
  }
  return {
    statusCode: 500,
    body: JSON.stringify({ message: error.message || "Internal Server Error" }),
  };
};