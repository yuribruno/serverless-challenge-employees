import { randomUUID } from "crypto";
import { IEmployeeRepository } from "../../../domain/interfaces/IEmployeeRepository";
import { CreateEmployeeDto, CreateEmployeeSchema } from "./dtos/EmployeeDto";

export class CreateEmployee {
  constructor(
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(data: CreateEmployeeDto): Promise<void> {
    const validatedEmployeeData = CreateEmployeeSchema.parse(data);
    await this.employeeRepository.create({
      id: randomUUID(),
      ...validatedEmployeeData
    })
  }
}