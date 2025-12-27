import { APIGatewayProxyHandler } from "aws-lambda";
import { DeleteEmployee } from "../../aplication/use-cases/employees/deleteEmployee";
import { EmployeeRepository } from "../../infra/database/repositories/employeeRepository";

const repository = new EmployeeRepository();
const deleteUseCase = new DeleteEmployee(repository);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    if (!id) throw new Error("ID is required");

    await deleteUseCase.execute(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Employee deleted successfully" }),
    };
  } catch (error: any) {
    return {
      statusCode: error.message === "Employee not found" ? 404 : 400,
      body: JSON.stringify({ message: error.message }),
    };
  }
};