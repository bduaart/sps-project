import { IUserRepository } from "./IUserRepository";
import { UserEntity } from "./entities/UserEntity";
import { UserDto } from "../Dto/UserDto";
import { getFakeUsers } from "./seeds/userAdmin";

export class UserRepository implements IUserRepository {
  private static users: UserEntity[] = getFakeUsers();

  public async findAll(
    page = 1,
    pageSize = 500,
  ): Promise<{
    items: UserEntity[];
    page: number;
    pageSize: number;
    total: number;
  }> {
    const total = UserRepository.users.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedUsers = UserRepository.users.slice(
      startIndex,
      startIndex + pageSize,
    );

    return {
      items: paginatedUsers,
      page,
      pageSize,
      total,
    };
  }

  public async findById(id: string): Promise<UserEntity | undefined> {
    return UserRepository.users.find((u) => u.id === id);
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    return UserRepository.users.find((u) => u.email === email);
  }

  public async create(data: UserEntity): Promise<UserEntity> {
    UserRepository.users.push(data);
    return data;
  }

  public async update(
    id: string,
    data: Partial<UserDto>,
  ): Promise<UserEntity | null> {
    const user = UserRepository.users.find((u) => u.id === id);
    if (!user) return null;

    Object.assign(user, data, { updatedAt: new Date() });
    return user;
  }

  public async delete(id: string): Promise<void> {
    UserRepository.users = UserRepository.users.filter((u) => u.id !== id);
  }

  public async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    return UserRepository.users.find(
      (u) => u.email === email && u.password === password,
    );
  }
}
