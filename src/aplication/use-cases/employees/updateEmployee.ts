import { IEmployeeRepository } from "../../../domain/interfaces/IEmployeeRepository";
import { UpdateEmployeeDto, UpdateEmployeeSchema } from "./dtos/EmployeeDto";

export class UpdateEmployee {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(id: string, data: UpdateEmployeeDto): Promise<void> {
    if (!id) {
      throw new Error("ID not provided.");
    }

    const validatedEmployeeData = UpdateEmployeeSchema.parse(data);

    const employeeExists = await this.employeeRepository.getById(id);
    if (!employeeExists) {
      throw new Error("Employee not found.");
    }

    await this.employeeRepository.update(id, validatedEmployeeData);
  }
}