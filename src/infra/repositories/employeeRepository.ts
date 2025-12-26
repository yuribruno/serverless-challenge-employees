import { DynamoDB } from "aws-sdk";
import { Employee } from "../../domain/entities/employee";

const dynamo = new DynamoDB.DocumentClient();
const TABLE_NAME = 'EmployeesTable';

export const employeeRepository = {
  async create(employee: Employee): Promise<void> {
    await dynamo.put({
      TableName: TABLE_NAME,
      Item: employee,
    }).promise();
  },
};