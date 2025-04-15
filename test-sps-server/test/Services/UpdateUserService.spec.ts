import { UserEntity } from "../../src/User/Repositories/entities/UserEntity";
import { UpdateUserService } from "../../src/User/Services/UpdateUserService";
import { IUserRepository } from "../../src/User/Repositories/IUserRepository";
import { UpdateUserTransformer } from "../../src/User/Transformer/UpdateUserTransformer";
import { UpdateUserDto } from "../../src/User/Dto/UserDto";
import { UserRepositoryMock } from "../__mocks__/UserRepository.mock";

describe("UpdateUserService", () => {
  let service: UpdateUserService;
  let repositoryMock: jest.Mocked<IUserRepository>;
  let transformer: UpdateUserTransformer;

  const existingUser = new UserEntity({
    name: "Bruno",
    email: "bruno@exemplo.com",
    password: "12345678",
    type: "admin",
  });

  const updateDto: UpdateUserDto = {
    id: existingUser.id,
    name: "Bruno Atualizado",
    email: "bruno@exemplo.com",
    password: "novaSenha123",
    type: "admin",
  };

  beforeEach(() => {
    repositoryMock = UserRepositoryMock();
    transformer = new UpdateUserTransformer();
    service = new UpdateUserService(repositoryMock, transformer);

    jest.spyOn(transformer, "toEntity").mockImplementation((dto, entity) => ({
      ...entity,
      ...dto,
      updatedAt: new Date(),
    }));
  });

  it("deve lançar erro se o usuário não existir", async () => {
    repositoryMock.findById.mockResolvedValue(undefined);

    await expect(service.execute(updateDto)).rejects.toThrow(
      "Usuário não existe!",
    );
    expect(repositoryMock.update).not.toHaveBeenCalled();
  });

  it("deve atualizar o usuário se ele existir", async () => {
    repositoryMock.findById.mockResolvedValue(existingUser);
    repositoryMock.update.mockResolvedValue({ ...existingUser, ...updateDto });

    const result = await service.execute(updateDto);

    expect(repositoryMock.findById).toHaveBeenCalledWith(updateDto.id);
    expect(transformer.toEntity).toHaveBeenCalledWith(updateDto, existingUser);
    expect(repositoryMock.update).toHaveBeenCalledWith(
      updateDto.id,
      expect.objectContaining({
        name: updateDto.name,
        email: updateDto.email,
      }),
    );
    expect(result).toHaveProperty("email", updateDto.email);
  });
});
