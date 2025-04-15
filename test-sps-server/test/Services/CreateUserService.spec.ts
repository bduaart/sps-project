import { CreateUserService } from "../../src/User/Services/CreateUserService";
import { UserRepository } from "../../src/User/Repositories/UserRepository";
import { UserDto } from "../../src/User/Dto/UserDto";
import { UserEntity } from "../../src/User/Repositories/entities/UserEntity";

describe("CreateUserService", () => {
  it("deve criar um novo usuário", async () => {
    const repo = new UserRepository();
    const service = new CreateUserService(repo);

    const dto: UserDto = {
      name: "Bruno",
      email: "bruno@example.com",
      password: "12345678",
      type: "user",
    };

    const user = await service.execute(dto);

    expect(user).toBeInstanceOf(UserEntity);
    expect(user.email).toBe(dto.email);
  });

  it("deve lançar erro ao tentar cadastrar email duplicado", async () => {
    const repo = new UserRepository();
    const service = new CreateUserService(repo);

    const dto: UserDto = {
      name: "Admin",
      email: "admin@spsgroup.com.br",
      password: "12345678",
      type: "admin",
    };

    await expect(service.execute(dto)).rejects.toThrow("Email already in use");
  });
});
