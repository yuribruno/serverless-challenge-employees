import { IEmployeeRepository } from "../../../domain/interfaces/IEmployeeRepository";

export class DeleteEmployee {
  constructor(
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error("ID not provided.");
    }

    const employeeExists = await this.employeeRepository.getById(id);
    
    if (!employeeExists) {
      throw new Error("Employee not found.");
    }

    await this.employeeRepository.delete(id);
  }
}