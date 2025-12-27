import { APIGatewayProxyHandler } from "aws-lambda";
import { CreateEmployee } from "../../aplication/use-cases/employees/createEmployee";
import { CreateEmployeeSchema } from "../../aplication/use-cases/employees/dtos/EmployeeDto";
import { EmployeeRepository } from "../../infra/database/repositories/employeeRepository";
import { formatError } from "../utils/errorHandler";

const repository = new EmployeeRepository();
const createUseCase = new CreateEmployee(repository);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ message: "Body is required" }) };
    }

    const body = JSON.parse(event.body);
    const validatedData = CreateEmployeeSchema.parse(body);
    
    const result = await createUseCase.execute(validatedData);

    return {
      statusCode: 201,
      body: JSON.stringify(result), // Retorna o objeto criado
    };
  } catch (error: any) {
    return formatError(error);
  }
};