import { AuthLoginUserTransformer } from "./Transformer/AuthLoginUserTransformer";
import { UserRepository } from "../User/Repositories/UserRepository";
import { AuthLoginUserService } from "./Services/AuthLoginUserService";
import { AuthLoginUserController } from "./Controller/AuthLoginUserController";

const userRepository = new UserRepository();

const authLoginUserTransformer = new AuthLoginUserTransformer();

const authLoginUserService = new AuthLoginUserService(
  userRepository,
  process.env.JWT_SECRET || "default-secret",
);

export const authLoginUserController = new AuthLoginUserController(
  authLoginUserService,
  authLoginUserTransformer,
);
