import { Request, Response } from "express";
import { Resource, Action } from "../../src/Config/Permissions";
import { checkAccess } from "../../src/Middleware/PermissionMiddleware";

describe("checkAccess middleware", () => {
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

  it("deve retornar 401 se usuário não estiver autenticado", () => {
    const req = {} as Request;
    const res = mockRes();

    const middleware = checkAccess("user" as Resource, "read" as Action);
    middleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Usuário não autenticado" });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("deve retornar 403 se o usuário não tiver permissão", () => {
    const req = {
      user: {
        id: "123",
        email: "bruno@user.com",
        type: "user",
      },
    } as unknown as Request;

    const res = mockRes();

    const middleware = checkAccess("user", "delete");
    middleware(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Acesso negado: sem permissão",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("deve permitir acesso se usuário tiver permissão", () => {
    const req = {
      user: {
        id: "123",
        email: "admin@exemplo.com",
        type: "admin",
      },
    } as unknown as Request;

    const res = mockRes();

    const middleware = checkAccess("user", "create");
    middleware(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
  });
});
