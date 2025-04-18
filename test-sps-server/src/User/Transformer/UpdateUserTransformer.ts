import { UpdateUserDto } from "../Dto/UserDto";
import { UserEntity } from "../Repositories/entities/UserEntity";

export class UpdateUserTransformer {
  public fromApi(data: any): UpdateUserDto {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      type: data.type,
      password: data.password,
    };
  }
  public toEntity(dto: UpdateUserDto, entity: UserEntity): UserEntity {
    if (dto.name !== undefined) entity.name = dto.name;
    if (dto.email !== undefined) entity.email = dto.email;
    if (dto.type !== undefined) entity.type = dto.type;
    if (dto.password !== undefined) entity.password = dto.password;

    entity.updatedAt = new Date();

    return entity;
  }
}
