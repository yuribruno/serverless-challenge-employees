import { DynamoDB } from "aws-sdk";
import { IEmployeeRepository } from "../../../domain/interfaces/IEmployeeRepository";
import { Employee } from "../../../domain/entities/employee";

export class EmployeeRepository implements IEmployeeRepository {
  private TABLE_NAME = process.env.EMPLOYEES_TABLE!;
  private dbClient = new DynamoDB.DocumentClient();

  async create(employee: Employee): Promise<void> {
    await this.dbClient
      .put({
        TableName: this.TABLE_NAME,
        Item: employee
      })
      .promise();
  }

  async update(id: string, data: Partial<Omit<Employee, 'id'>>): Promise<void> {
    const keys = Object.keys(data);
    if (keys.length === 0) return;

    const updateExpression = `set ${keys.map(k => `#${k} = :${k}`).join(', ')}`;
    const expressionAttributeNames = keys.reduce((acc, k) => ({ ...acc, [`#${k}`]: k }), {});
    const expressionAttributeValues = keys.reduce((acc, k) => ({ ...acc, [`:${k}`]: (data as any)[k] }), {});

    await this.dbClient.update({
      TableName: this.TABLE_NAME,
      Key: { id },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    }).promise();
  }

  async getById(id: string): Promise<Employee | null> {
    const result = await this.dbClient.get({
      TableName: this.TABLE_NAME,
      Key: { id },
    }).promise();
    
    return (result.Item as Employee) || null;
  }

  async delete(id: string): Promise<void> {
    await this.dbClient.delete({
      TableName: this.TABLE_NAME,
      Key: { id },
    }).promise();
  }
}