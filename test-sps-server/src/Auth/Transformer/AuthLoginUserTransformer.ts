import { LoginDto } from "../Dto/LoginDto";
import { UserEntity } from "../../User/Repositories/entities/UserEntity";
import { LoginValidator } from "../../User/Validators/LoginValidator";

export class AuthLoginUserTransformer {
  public fromApi(data: any): LoginDto {
    return <LoginDto>LoginValidator.parse(data);
  }

  public toApi(user: UserEntity, token: string) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      token,
    };
  }
}
