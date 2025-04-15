import request from "supertest";
import app from "../../src/app";

describe("User routes", () => {
  it("deve retornar 401 se não enviar token", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(401);
  });

  it("deve logar e acessar rota protegida", async () => {
    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@spsgroup.com.br", password: "1234" });

    expect(login.status).toBe(200);
    const token = login.body.token;

    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});
