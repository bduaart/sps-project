import { UserDto } from "../Dto/UserDto";
import { UserEntity } from "./entities/UserEntity";

export interface IUserRepository {
  findAll(
    page?: number,
    pageSize?: number,
  ): Promise<{
    items: UserEntity[];
    page: number;
    pageSize: number;
    total: number;
  }>;
  findById(id: string): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity>;
  create(data: UserEntity): Promise<UserEntity>;
  update(id: string, data: UserDto): Promise<UserEntity>;
  delete(id: string): Promise<void>;
  findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserEntity | undefined>;
}
