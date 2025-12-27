import { APIGatewayProxyHandler } from "aws-lambda";
import { UpdateEmployeeSchema } from "../../aplication/use-cases/employees/dtos/EmployeeDto";
import { UpdateEmployee } from "../../aplication/use-cases/employees/updateEmployee";
import { EmployeeRepository } from "../../infra/database/repositories/employeeRepository";

const repository = new EmployeeRepository();
const updateUseCase = new UpdateEmployee(repository);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    const body = JSON.parse(event.body || '{}');

    if (!id) throw new Error("ID is required");

    const validatedData = UpdateEmployeeSchema.parse(body);

    await updateUseCase.execute(id, validatedData);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Employee updated successfully" }),
    };
  } catch (error: any) {
    const statusCode = error.name === 'ZodError' ? 400 : (error.message === "Employee not found" ? 404 : 500);
    return {
      statusCode,
      body: JSON.stringify({ message: error.message }),
    };
  }
};