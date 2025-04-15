import { IUserRepository } from "../Repositories/IUserRepository";
import { UserDto } from "../Dto/UserDto";
import { BusinessRuleError } from "../../Errors/BusinessRuleError";
import { NotFoundError } from "../../Errors/NotFoundError";

export class DeleteUserService {
  constructor(private userRepository: IUserRepository) {}

  public async execute(data: UserDto, currentUserId: string) {
    if (data.id === currentUserId) {
      throw new BusinessRuleError("Usuário logado não pode se deletar!");
    }

    const exists = await this.userRepository.findById(data.id);
    if (!exists) {
      throw new NotFoundError("Usuário não existe!");
    }

    return this.userRepository.delete(data.id);
  }
}
