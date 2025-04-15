import { Router } from "express";
import { authLoginUserController } from "../Auth";

const router = Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticação do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                  type: string
 *                  format: uuid
 *                  example: 142d799c-0d72-4a73-a22b-240fbfb78e73
 *                 name:
 *                  type: string
 *                  example: Bruno Duarte
 *                 email:
 *                  type: string
 *                  example: contato.bduaart@gmail.com
 *                 type:
 *                  type: string
 *                  example: ADMIN
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR...
 *       401:
 *         description: Unauthorized
 */
router.post("/login", (req, res) => authLoginUserController.login(req, res));
export default router;
