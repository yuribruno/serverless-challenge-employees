import { CreateEmployee } from "../src/aplication/use-cases/employees/createEmployee";
import { DeleteEmployee } from "../src/aplication/use-cases/employees/deleteEmployee";
import { GetEmployeeById } from "../src/aplication/use-cases/employees/getEmployeeById";
import { UpdateEmployee } from "../src/aplication/use-cases/employees/updateEmployee";
import { mockEmployeeRepository } from "./mockEmployeeRepository";

describe('Feature: Employee Management', () => {
  let repository: any;

  beforeEach(() => {
    repository = mockEmployeeRepository();
  });

  describe('Scenario: Registering a new employee', () => {
    test('Given valid data, When I attempt to register, Then it should save the employee', async () => {
      const useCase = new CreateEmployee(repository);
      const data = { name: 'Yuri Bruno', age: 36, position: 'Software Engineer' };

      await useCase.execute(data);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({ name: 'Yuri Bruno' }));
    });

    test('Given an age under 18, When I attempt to register, Then it should throw a validation error', async () => {
      const useCase = new CreateEmployee(repository);
      const data = { name: 'John Doe', age: 17, position: 'Intern' };

      await expect(useCase.execute(data)).rejects.toThrow();
    });
  });

  describe('Scenario: Fetching an employee by ID', () => {
    test('Given an existing ID, When I search for it, Then it should return the employee details', async () => {
      const useCase = new GetEmployeeById(repository);
      const mockData = { id: '123', name: 'Yuri', age: 25, position: 'Dev' };
      repository.getById.mockResolvedValue(mockData);

      const result = await useCase.execute('123');

      expect(result).toEqual(mockData);
    });

    test('Given a non-existent ID, When I search for it, Then it should throw "Employee not found"', async () => {
      const useCase = new GetEmployeeById(repository);
      repository.getById.mockResolvedValue(null);

      await expect(useCase.execute('999')).rejects.toThrow('Employee not found');
    });
  });

  describe('Scenario: Updating employee information', () => {
    test('Given valid updates for an existing employee, When I save, Then it should update the record', async () => {
      const useCase = new UpdateEmployee(repository);
      repository.getById.mockResolvedValue({ id: '123', name: 'Old Name', age: 30, position: 'Dev' });

      await useCase.execute('123', { name: 'New Name' });

      expect(repository.update).toHaveBeenCalledWith('123', { name: 'New Name' });
    });
  });

  describe('Scenario: Removing an employee', () => {
    test('Given an existing employee ID, When I delete it, Then it should call the repository to remove the record', async () => {
      const useCase = new DeleteEmployee(repository);
      repository.getById.mockResolvedValue({ id: '123', name: 'Yuri', age: 25, position: 'Dev' });

      await useCase.execute('123');

      expect(repository.delete).toHaveBeenCalledWith('123');
    });
  });
});