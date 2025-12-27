import { APIGatewayProxyHandler } from "aws-lambda";
import { GetEmployeeById } from "../../aplication/use-cases/employees/getEmployeeById";
import { EmployeeRepository } from "../../infra/database/repositories/employeeRepository";
import { formatError } from "../utils/errorHandler";

const repository = new EmployeeRepository();
const getUseCase = new GetEmployeeById(repository);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    if (!id) throw new Error("ID is required");

    const employee = await getUseCase.execute(id);

    return {
      statusCode: 200,
      body: JSON.stringify(employee),
    };
  } catch (error: any) {
    return formatError(error);
  }
};