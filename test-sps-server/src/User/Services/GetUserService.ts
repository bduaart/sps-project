import { IUserRepository } from "../Repositories/IUserRepository";
import { GetUserDto } from "../Dto/UserDto";
import { GetUserTransformer } from "../Transformer/GetUserTransformer";

export class GetUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly transformer: GetUserTransformer,
  ) {}

  public async execute(dto: GetUserDto): Promise<GetUserDto> {
    const entities = await this.userRepository.findAll(dto.page, dto.pageSize);
    return this.transformer.toDto(entities);
  }
}
