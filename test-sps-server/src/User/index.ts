import { CreateUserService } from "./Services/CreateUserService";
import { UpdateUserService } from "./Services/UpdateUserService";
import { DeleteUserService } from "./Services/DeleteUserService";
import { CreateUserTransformer } from "./Transformer/CreateUserTransformer";
import { UpdateUserTransformer } from "./Transformer/UpdateUserTransformer";
import { UserRepository } from "./Repositories/UserRepository";
import { GetUserService } from "./Services/GetUserService";
import { GetUserByIdService } from "./Services/GetUserByIdService";
import { DeleteUserTransformer } from "./Transformer/DeleteUserTransformer";
import { GetUserByIdTransformer } from "./Transformer/GetUserByIdTransformer";
import { GetUserTransformer } from "./Transformer/GetUserTransformer";
import { UserController } from "./Controller/UserController";

const userRepository = new UserRepository();

const createUserTransformer = new CreateUserTransformer();
const getUserTransformer = new GetUserTransformer();
const getUserByIdTransformer = new GetUserByIdTransformer();
const deleteUserTransformer = new DeleteUserTransformer();
const updateUserTransformer = new UpdateUserTransformer();

const createUserService = new CreateUserService(
  userRepository,
  createUserTransformer,
);
const getUserService = new GetUserService(userRepository, getUserTransformer);
const getUserByIdService = new GetUserByIdService(
  userRepository,
  getUserByIdTransformer,
);
const updateUserService = new UpdateUserService(
  userRepository,
  updateUserTransformer,
);
const deleteUserService = new DeleteUserService(userRepository);

export const userController = new UserController(
  createUserService,
  getUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  createUserTransformer,
  updateUserTransformer,
  getUserByIdTransformer,
  getUserTransformer,
  deleteUserTransformer,
);
