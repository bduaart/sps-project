import { UserDto } from "../Dto/UserDto";
import { GetUserByIdResponse } from "../Response/GetUserByIdResponse";
import { UserEntity } from "../Repositories/entities/UserEntity";

export class GetUserByIdTransformer {
  public async fromApi(data: any): Promise<UserDto> {
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

  public async toApi(dto: UserDto): Promise<GetUserByIdResponse> {
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
