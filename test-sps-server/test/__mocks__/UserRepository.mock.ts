import { IUserRepository } from "../../src/User/Repositories/IUserRepository";

export const UserRepositoryMock = (): jest.Mocked<IUserRepository> => ({
  findByEmail: jest.fn(),
  findByEmailAndPassword: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});
