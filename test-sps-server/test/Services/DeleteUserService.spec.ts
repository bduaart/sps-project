import { UserEntity } from "../../src/User/Repositories/entities/UserEntity";
import { DeleteUserService } from "../../src/User/Services/DeleteUserService";
import { IUserRepository } from "../../src/User/Repositories/IUserRepository";
import { UserRepositoryMock } from "../__mocks__/UserRepository.mock";

describe("DeleteUserService", () => {
  let service: DeleteUserService;
  let repositoryMock: jest.Mocked<IUserRepository>;

  const existingUser = new UserEntity({
    name: "Bruno",
    email: "bruno@exemplo.com",
    password: "12345678",
    type: "admin",
  });

  beforeEach(() => {
    repositoryMock = UserRepositoryMock();
    service = new DeleteUserService(repositoryMock);
  });

  it("deve lançar erro se usuário não existir", async () => {
    repositoryMock.findById.mockResolvedValue(undefined);

    await expect(service.execute({ id: "123" }, "12")).rejects.toThrow(
      "Usuário não existe!",
    );
    expect(repositoryMock.delete).not.toHaveBeenCalled();
  });

  it("deve deletar usuário se ele existir", async () => {
    repositoryMock.findById.mockResolvedValue(existingUser);
    repositoryMock.delete.mockResolvedValue();

    await service.execute({ id: existingUser.id }, "12");

    expect(repositoryMock.findById).toHaveBeenCalledWith(existingUser.id);
    expect(repositoryMock.delete).toHaveBeenCalledWith(existingUser.id);
  });
});
