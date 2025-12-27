import { Employee } from "../../../domain/entities/employee";
import { IEmployeeRepository } from "../../../domain/interfaces/IEmployeeRepository";

export class GetEmployeeById {
  constructor(
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(id: string): Promise<Employee> {
    if (!id) {
      throw new Error("ID not provided.");
    }

    const employee = await this.employeeRepository.getById(id);

    if (!employee) {
      throw new Error("Employee not found.");
    }

    return employee;
  }
}