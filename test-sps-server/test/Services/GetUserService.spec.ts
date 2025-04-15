import { GetUserTransformer } from "../../src/User/Transformer/GetUserTransformer";
import { UserRepositoryMock } from "../__mocks__/UserRepository.mock";
import { IUserRepository } from "../../src/User/Repositories/IUserRepository";
import { GetUserService } from "../../src/User/Services/GetUserService";
import { UserEntity } from "../../src/User/Repositories/entities/UserEntity";
import { GetUserDto } from "../../src/User/Dto/UserDto";

describe("GetUserService", () => {
  let service: GetUserService;
  let repositoryMock: jest.Mocked<IUserRepository>;
  let transformer: GetUserTransformer;

  const paginatedResult = {
    items: [
      new UserEntity({
        name: "Bruno",
        email: "bruno@exemplo.com",
        password: "12345678",
        type: "admin",
      }),
    ],
    page: 1,
    pageSize: 10,
    total: 1,
  };

  beforeEach(() => {
    repositoryMock = UserRepositoryMock();
    transformer = new GetUserTransformer();
    service = new GetUserService(repositoryMock, transformer);

    jest
      .spyOn(transformer, "toDto")
      .mockImplementation((paginated) => paginated);
  });

  it("deve chamar o repositório com paginação correta e retornar o DTO", async () => {
    repositoryMock.findAll.mockResolvedValue(paginatedResult);

    const input: GetUserDto = {
      page: 1,
      pageSize: 10,
    };

    const result = await service.execute(input);

    expect(repositoryMock.findAll).toHaveBeenCalledWith(1, 10);
    expect(transformer.toDto).toHaveBeenCalledWith(paginatedResult);
    expect(result).toHaveProperty("items");
    expect(Array.isArray(result.items)).toBe(true);
  });
});
