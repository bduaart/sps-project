import jwt from "jsonwebtoken";
import { UserEntity } from "../../src/User/Repositories/entities/UserEntity";
import { AuthLoginUserService } from "../../src/Auth/Services/AuthLoginUserService";
import { IUserRepository } from "../../src/User/Repositories/IUserRepository";
import { LoginDto } from "../../src/Auth/Dto/LoginDto";
import { UserRepositoryMock } from "../__mocks__/UserRepository.mock";

describe("AuthLoginUserService", () => {
  let service: AuthLoginUserService;
  let repositoryMock: jest.Mocked<IUserRepository>;
  const jwtSecret = "test-secret";

  const mockUser = new UserEntity({
    name: "Bruno",
    email: "bruno@exemplo.com",
    password: "12345678",
    type: "admin",
  });

  const loginDto: LoginDto = {
    email: "bruno@exemplo.com",
    password: "12345678",
  };

  beforeEach(() => {
    repositoryMock = UserRepositoryMock();
    service = new AuthLoginUserService(repositoryMock, jwtSecret);
  });

  it("deve lançar erro se usuário não existir ou senha for inválida", async () => {
    repositoryMock.findByEmailAndPassword.mockResolvedValue(undefined);

    await expect(service.execute(loginDto)).rejects.toThrow(
      "Credenciais inválidas",
    );
    expect(repositoryMock.findByEmailAndPassword).toHaveBeenCalledWith(
      loginDto.email,
      loginDto.password,
    );
  });

  it("deve retornar token e usuário se credenciais estiverem corretas", async () => {
    repositoryMock.findByEmailAndPassword.mockResolvedValue(mockUser);

    const { user, token } = await service.execute(loginDto);

    expect(user).toBe(mockUser);
    expect(token).toBeDefined();

    const decoded = jwt.verify(token, jwtSecret) as {
      sub: string;
      email: string;
      type: string;
    };

    expect(decoded.sub).toBe(mockUser.id);
    expect(decoded.email).toBe(mockUser.email);
    expect(decoded.type).toBe(mockUser.type);
  });
});
