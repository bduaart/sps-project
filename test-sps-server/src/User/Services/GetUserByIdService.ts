import { IUserRepository } from "../Repositories/IUserRepository";
import { UserDto } from "../Dto/UserDto";
import { GetUserByIdTransformer } from "../Transformer/GetUserByIdTransformer";
import { NotFoundError } from "../../Errors/NotFoundError";

export class GetUserByIdService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly transformer: GetUserByIdTransformer,
  ) {}

  public async execute(data: UserDto): Promise<UserDto> {
    const exists = await this.userRepository.findById(data.id);
    if (!exists) {
      throw new NotFoundError("Usuário não existe!");
    }
    return this.transformer.toDto(exists);
  }
}
