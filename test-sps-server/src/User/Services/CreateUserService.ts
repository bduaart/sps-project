import { MailProducer } from "../../Workers/SendEmail/MailProducer";
import { CreateUserDto, UserDto } from "../Dto/UserDto";
import { IUserRepository } from "../Repositories/IUserRepository";
import { CreateUserTransformer } from "../Transformer/CreateUserTransformer";

export class CreateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly transformer: CreateUserTransformer,
  ) {}

  public async execute(dto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error("Usuário com email já cadastrado!");
    }

    const user = this.transformer.toEntity(dto);
    await this.userRepository.create(user);

    await MailProducer.sendWelcomeEmail({
      name: user.name,
      email: user.email,
    });

    return this.transformer.toDto(user);
  }
}
