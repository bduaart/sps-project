import { IUserRepository } from "../Repositories/IUserRepository";
import { UserDto } from "../Dto/UserDto";

export class DeleteUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute(data: UserDto) {
    const exists = await this.userRepository.findById(data.id);
    if (!exists) {
      throw new Error("Usuário não existe!");
    }

    return this.userRepository.delete(data.id);
  }
}
