import { IUserRepository } from "../../User/Repositories/IUserRepository";
import { LoginDto } from "../Dto/LoginDto";
import { UserEntity } from "../../User/Repositories/entities/UserEntity";
import jwt from "jsonwebtoken";

export class AuthLoginUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtSecret: string,
  ) {}

  public async execute(
    data: LoginDto,
  ): Promise<{ user: UserEntity; token: string }> {
    const user = await this.userRepository.findByEmailAndPassword(
      data.email,
      data.password,
    );
    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign(
      {
        sub: user.id,
        type: user.type,
        email: user.email,
      },
      this.jwtSecret,
      { expiresIn: "1h" },
    );

    return { user, token };
  }
}
