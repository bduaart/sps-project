import { Response } from "express";
import {
  authMiddleware,
  AuthenticatedRequest,
} from "../../src/Middleware/AuthMiddleware";
import jwt from "jsonwebtoken";

describe("authMiddleware", () => {
  const secret = "test-secret";
  const middleware = authMiddleware(secret);

  const mockRes = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar 401 se token não for fornecido", () => {
    const req = { headers: {} } as AuthenticatedRequest;
    const res = mockRes();

    middleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token não fornecido" });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("deve retornar 401 se token for inválido", () => {
    const req = {
      headers: {
        authorization: "Bearer token_invalido",
      },
    } as AuthenticatedRequest;
    const res = mockRes();

    middleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Token inválido ou expirado",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("deve permitir acesso e definir req.user com token válido", () => {
    const token = jwt.sign(
      {
        sub: "123",
        email: "bruno@teste.com",
        type: "admin",
      },
      secret,
    );

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    } as AuthenticatedRequest;

    const res = mockRes();

    middleware(req, res, mockNext);

    expect(req.user).toEqual({
      id: "123",
      email: "bruno@teste.com",
      type: "admin",
    });
    expect(mockNext).toHaveBeenCalled();
  });
});
