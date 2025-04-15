import { UserDto } from "../Dto/UserDto";
import { GetUserByIdResponse } from "../Response/GetUserByIdResponse";
import { UserEntity } from "../Repositories/entities/UserEntity";

export class GetUserByIdTransformer {
  public fromApi(data: any): UserDto {
    return {
      id: data.id,
    };
  }

  public toDto(dto: UserEntity): UserDto {
    return <UserDto>{
      id: dto.id,
      type: dto.type,
      name: dto.name,
      email: dto.email,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }

  public toApi(dto: UserDto): GetUserByIdResponse {
    return <GetUserByIdResponse>{
      id: dto.id,
      type: dto.type,
      name: dto.name,
      email: dto.email,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }
}
