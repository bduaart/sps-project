import { CreateUserDto, UserDto } from "../Dto/UserDto";
import { CreateUserResponse } from "../Response/UserReponse";
import { UserEntity } from "../Repositories/entities/UserEntity";

export class CreateUserTransformer {
  public fromApi(data: any): CreateUserDto {
    return {
      name: data.name,
      email: data.email,
      password: data.password,
      type: data.type,
    };
  }

  public toEntity(dto: CreateUserDto): UserEntity {
    return new UserEntity({ ...dto });
  }

  public toDto(entity: UserEntity): UserDto {
    return {
      id: entity.id,
    };
  }

  public toApi(dto: UserDto): CreateUserResponse {
    return {
      id: dto.id,
    };
  }
}
