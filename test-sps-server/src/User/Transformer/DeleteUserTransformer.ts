import { UserDto } from "../Dto/UserDto";

export class DeleteUserTransformer {
  public fromApi(data: any): UserDto {
    return {
      id: data.id,
    };
  }
}
