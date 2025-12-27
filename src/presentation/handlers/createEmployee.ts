import { APIGatewayProxyHandler } from "aws-lambda";
import { CreateEmployee } from "../../aplication/use-cases/employees/createEmployee";
import { CreateEmployeeSchema } from "../../aplication/use-cases/employees/dtos/EmployeeDto";
import { EmployeeRepository } from "../../infra/database/repositories/employeeRepository";

const repository = new EmployeeRepository();
const createUseCase = new CreateEmployee(repository);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    
    const validatedData = CreateEmployeeSchema.parse(body);

    const result = await createUseCase.execute(validatedData);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Employee created successfully", data: result }),
    };
  } catch (error: any) {
    return {
      statusCode: error.name === 'ZodError' ? 400 : 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
};