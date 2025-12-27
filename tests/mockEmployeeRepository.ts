import { IEmployeeRepository } from '../src/domain/interfaces/IEmployeeRepository';

export const mockEmployeeRepository = (): jest.Mocked<IEmployeeRepository> => ({
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});