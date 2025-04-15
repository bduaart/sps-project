import { UserDto } from "../Dto/UserDto";

export class DeleteUserTransformer {
  public async fromApi(data: any): Promise<UserDto> {
    return {
      id: data.id,
    };
  }
}
