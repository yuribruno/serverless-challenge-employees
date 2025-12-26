import { Employee } from '../entities/employee';
import { employeeRepository } from '../../infra/repositories/employeeRepository';
import { v4 as uuid } from 'uuid';

export const createEmployeeUseCase = async (data: Omit<Employee, 'id'>) => {
  if (data.age < 18) {
    throw new Error('The employee must be of legal age.');
  }

  const newEmployee: Employee = {
    id: uuid(),
    ...data
  };

  await employeeRepository.create(newEmployee);
  return newEmployee;
};