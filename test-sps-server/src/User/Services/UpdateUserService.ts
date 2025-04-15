import { IUserRepository } from "../Repositories/IUserRepository";
import { UpdateUserDto } from "../Dto/UserDto";
import { UpdateUserTransformer } from "../Transformer/UpdateUserTransformer";

export class UpdateUserService {
  constructor(
    private userRepository: IUserRepository,
    private readonly transformer: UpdateUserTransformer,
  ) {}

  public async execute(dto: UpdateUserDto) {
    const exists = await this.userRepository.findById(dto.id);
    if (!exists) {
      throw new Error("Usuário não existe!");
    }

    const toEntity = await this.transformer.toEntity(dto, exists);

    return this.userRepository.update(dto.id, toEntity);
  }
}
