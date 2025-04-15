import { Request, Response } from "express";
import { AuthLoginUserService } from "../Services/AuthLoginUserService";
import { AuthLoginUserTransformer } from "../Transformer/AuthLoginUserTransformer";

export class AuthLoginUserController {
  constructor(
    private readonly loginService: AuthLoginUserService,
    private readonly loginTransformer: AuthLoginUserTransformer,
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = this.loginTransformer.fromApi(req.body);
      const result = await this.loginService.execute(data);
      const response = this.loginTransformer.toApi(result.user, result.token);
      return res.status(200).json(response);
    } catch (e: any) {
      return res.status(401).json({ message: e.message });
    }
  }
}
