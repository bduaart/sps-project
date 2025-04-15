import { Request, Response } from "express";
import { CreateUserService } from "../Services/CreateUserService";
import { UpdateUserService } from "../Services/UpdateUserService";
import { DeleteUserService } from "../Services/DeleteUserService";
import { CreateUserTransformer } from "../Transformer/CreateUserTransformer";
import { UpdateUserTransformer } from "../Transformer/UpdateUserTransformer";
import { GetUserService } from "../Services/GetUserService";
import { GetUserByIdService } from "../Services/GetUserByIdService";
import { GetUserByIdTransformer } from "../Transformer/GetUserByIdTransformer";
import { GetUserTransformer } from "../Transformer/GetUserTransformer";
import { DeleteUserTransformer } from "../Transformer/DeleteUserTransformer";

export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly createUserTransformer: CreateUserTransformer,
    private readonly updateUserTransformer: UpdateUserTransformer,
    private readonly getUserByIdTransformer: GetUserByIdTransformer,
    private readonly getUserTransformer: GetUserTransformer,
    private readonly deleteUserTransformer: DeleteUserTransformer,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const createUserDto = this.createUserTransformer.fromApi(req.body);
      const userDto = await this.createUserService.execute(createUserDto);
      const response = this.createUserTransformer.toApi(userDto);
      return res.status(201).json(response);
    } catch (e: any) {
      if (e.name === "NotFoundError") {
        return res.status(404).json({ message: e.message });
      }

      if (e.name === "BusinessRuleError") {
        return res.status(400).json({ message: e.message });
      }

      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      let getUserDto = this.getUserTransformer.fromApi(req.query);
      getUserDto = await this.getUserService.execute(getUserDto);
      const response = this.getUserTransformer.toApi(getUserDto);
      return res.status(200).json(response);
    } catch (e: any) {
      if (e.name === "NotFoundError") {
        return res.status(404).json({ message: e.message });
      }

      if (e.name === "BusinessRuleError") {
        return res.status(400).json({ message: e.message });
      }

      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      let userDto = this.getUserByIdTransformer.fromApi(req.params);
      userDto = await this.getUserByIdService.execute(userDto);
      const response = this.getUserByIdTransformer.toApi(userDto);
      return res.status(200).json(response);
    } catch (e: any) {
      if (e.name === "NotFoundError") {
        return res.status(404).json({ message: e.message });
      }

      if (e.name === "BusinessRuleError") {
        return res.status(400).json({ message: e.message });
      }

      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const dto = this.updateUserTransformer.fromApi({
        ...req.params,
        ...req.body,
      });
      await this.updateUserService.execute(dto);
      return res.status(204).json();
    } catch (e: any) {
      if (e.name === "NotFoundError") {
        return res.status(404).json({ message: e.message });
      }

      if (e.name === "BusinessRuleError") {
        return res.status(400).json({ message: e.message });
      }

      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const dto = this.deleteUserTransformer.fromApi(req.params);
      await this.deleteUserService.execute(dto, req.user.id);
      return res.status(204).send();
    } catch (e: any) {
      if (e.name === "NotFoundError") {
        return res.status(404).json({ message: e.message });
      }

      if (e.name === "BusinessRuleError") {
        return res.status(400).json({ message: e.message });
      }

      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }
}
