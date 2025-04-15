import { CreateUserTransformer } from "../../src/User/Transformer/CreateUserTransformer";
import { CreateUserDto } from "../../src/User/Dto/UserDto";
import { CreateUserService } from "../../src/User/Services/CreateUserService";
import { UserEntity } from "../../src/User/Repositories/entities/UserEntity";
import { MailProducer } from "../../src/Workers/SendEmail/MailProducer";
import { UserTypeEnum } from "../../src/User/Enum/UserTypeEnum";
import { UserRepositoryMock } from "../__mocks__/UserRepository.mock";

jest.mock("../../src/Workers/SendEmail/MailProducer");

describe("CreateUserService", () => {
  let service: CreateUserService;
  let repositoryMock: ReturnType<typeof UserRepositoryMock>;
  let transformer: CreateUserTransformer;

  const fakeUser: CreateUserDto = {
    name: "Bruno",
    email: "bruno@exemplo.com",
    password: "12345678",
    type: UserTypeEnum.ADMIN,
  };

  beforeEach(() => {
    repositoryMock = UserRepositoryMock();
    transformer = new CreateUserTransformer();
    service = new CreateUserService(repositoryMock, transformer);

    jest.spyOn(transformer, "toEntity").mockImplementation((dto) => {
      return new UserEntity({
        name: dto.name,
        email: dto.email,
        password: dto.password,
        type: dto.type,
      });
    });

    jest.spyOn(transformer, "toDto").mockImplementation((entity) => ({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      type: entity.type,
    }));
  });

  it("deve criar usuário com dados válidos", async () => {
    repositoryMock.findByEmail.mockResolvedValue(undefined);
    repositoryMock.create.mockImplementation(async (user) => user);

    const user = await service.execute(fakeUser);

    expect(repositoryMock.findByEmail).toHaveBeenCalledWith(fakeUser.email);
    expect(repositoryMock.create).toHaveBeenCalled();
    expect(MailProducer.sendWelcomeEmail).toHaveBeenCalledWith({
      name: fakeUser.name,
      email: fakeUser.email,
    });
    expect(user.name).toBe(fakeUser.name);
  });

  it("deve lançar erro se e-mail já existir", async () => {
    repositoryMock.findByEmail.mockResolvedValue({
      id: "1",
      ...fakeUser,
      createdAt: new Date(),
    });

    await expect(service.execute(fakeUser)).rejects.toThrow(
      "Usuário com email já cadastrado!",
    );
    expect(repositoryMock.create).not.toHaveBeenCalled();
  });

  it("deve retornar o DTO correto", async () => {
    repositoryMock.findByEmail.mockResolvedValue(undefined);
    repositoryMock.create.mockImplementation(async (user) => user);

    const user = await service.execute(fakeUser);

    expect(user).toHaveProperty("id");
    expect(user.email).toBe(fakeUser.email);
    expect(user.type).toBe(fakeUser.type);
  });
});
