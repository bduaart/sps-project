import { UserTypeEnum } from "../Enum/UserTypeEnum";

export interface CreateUserDto {
  name: string;
  type: UserTypeEnum;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  id: string;
  name: string;
  type: string;
  email: string;
  password: string;
}

export interface UserDto {
  id?: string;
  name?: string;
  type?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetUserDto {
  page?: number;
  pageSize?: number;
  total?: number;
  items?: UserDto[];
}
