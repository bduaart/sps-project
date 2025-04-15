import { UserEntity } from "../entities/UserEntity";

export function getFakeUsers(): UserEntity[] {
  const admin = new UserEntity({
    name: "admin",
    email: "admin@spsgroup.com.br",
    password: "1234",
    type: "admin",
  });

  return [admin];
}
