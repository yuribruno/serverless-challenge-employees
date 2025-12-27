import { randomUUID } from "crypto";
import { IEmployeeRepository } from "../../../domain/interfaces/IEmployeeRepository";
import { CreateEmployeeDto, CreateEmployeeSchema } from "./dtos/EmployeeDto";
import { Employee } from "../../../domain/entities/employee";

export class CreateEmployee {
  constructor(
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(data: CreateEmployeeDto): Promise<Employee> {
    const validatedData = CreateEmployeeSchema.parse(data);

    const newEmployee: Employee = {
      id: randomUUID(),
      ...validatedData
    };

    await this.employeeRepository.create(newEmployee);
    
    return newEmployee;
  }
}