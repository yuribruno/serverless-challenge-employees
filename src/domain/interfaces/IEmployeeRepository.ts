import { Employee } from "../entities/employee";

export interface IEmployeeRepository {
  create(employee: Employee): Promise<void>;
  update(id: string, data: Partial<Omit<Employee, 'id'>>): Promise<void>;
  getById(id: string): Promise<Employee | null>;
  delete(id: string): Promise<void>;
}