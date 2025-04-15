import { GetUserResponse } from "../Response/GetUserResponse";
import { GetUserDto } from "../Dto/UserDto";
import { UserEntity } from "../Repositories/entities/UserEntity";

export class GetUserTransformer {
  public fromApi(data: any): GetUserDto {
    return {
      page: data.page,
      pageSize: data.pageSize,
    };
  }

  public toApi(dto: GetUserDto): GetUserResponse {
    return {
      pagination: {
        page: dto.page,
        pageSize: dto.pageSize,
        total: dto.total,
      },
      items: dto.items.map((el) => {
        return {
          id: el.id,
          name: el.name,
          email: el.email,
          type: el.type,
          createdAt: el.createdAt,
          updatedAt: el.updatedAt,
        };
      }),
    };
  }

  public toDto(entity: {
    items: UserEntity[];
    page: number;
    pageSize: number;
    total: number;
  }): GetUserDto {
    return {
      page: entity.page,
      pageSize: entity.pageSize,
      total: entity.total,
      items: entity.items.map((el) => {
        return {
          id: el.id,
          name: el.name,
          email: el.email,
          type: el.type,
          createdAt: el.createdAt,
          updatedAt: el.updatedAt,
        };
      }),
    };
  }
}
