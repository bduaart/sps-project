import { IUserRepository } from "../../src/User/Repositories/IUserRepository";
import { GetUserByIdService } from "../../src/User/Services/GetUserByIdService";
import { GetUserByIdTransformer } from "../../src/User/Transformer/GetUserByIdTransformer";
import { UserEntity } from "../../src/User/Repositories/entities/UserEntity";
import { UserRepositoryMock } from "../__mocks__/UserRepository.mock";

describe("GetUserByIdService", () => {
  let service: GetUserByIdService;
  let repositoryMock: jest.Mocked<IUserRepository>;
  let transformer: GetUserByIdTransformer;

  const existingUser = new UserEntity({
    name: "Bruno",
    email: "bruno@exemplo.com",
    password: "12345678",
    type: "admin",
  });

  beforeEach(() => {
    repositoryMock = UserRepositoryMock();
    transformer = new GetUserByIdTransformer();
    service = new GetUserByIdService(repositoryMock, transformer);

    jest.spyOn(transformer, "toDto").mockImplementation((entity) => ({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      type: entity.type,
    }));
  });

  it("deve lançar erro se usuário não existir", async () => {
    repositoryMock.findById.mockResolvedValue(undefined);

    await expect(service.execute({ id: "fake-id" })).rejects.toThrow(
      "Usuário não existe!",
    );
    expect(transformer.toDto).not.toHaveBeenCalled();
  });

  it("deve retornar usuário transformado se existir", async () => {
    repositoryMock.findById.mockResolvedValue(existingUser);

    const result = await service.execute({ id: existingUser.id });

    expect(repositoryMock.findById).toHaveBeenCalledWith(existingUser.id);
    expect(transformer.toDto).toHaveBeenCalledWith(existingUser);
    expect(result).toHaveProperty("id", existingUser.id);
    expect(result).toHaveProperty("email", existingUser.email);
  });
});
