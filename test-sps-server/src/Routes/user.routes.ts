import { Router } from "express";
import { userController } from "../User";
import { authMiddleware } from "../Middleware/AuthMiddleware";
import { GetUserValidator } from "../User/Validators/GetUserValidator";
import {
  validateBody,
  validateParams,
  validateQuery,
} from "../Middleware/ZodValidators";
import { GetUserByIdValidator } from "../User/Validators/GetUserByIdValidator";
import { CreateUserValidator } from "../User/Validators/CreateUserValidator";
import { UpdateUserValidator } from "../User/Validators/UpdateUserValidator";
import { DeleteUserValidator } from "../User/Validators/DeleteUserValidator";
import { checkAccess } from "../Middleware/PermissionMiddleware";

const router = Router();

router.use(authMiddleware(process.env.JWT_SECRET || "default-secret"));

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                  type: string
 *                  format: uuid
 *                  example: 142d799c-0d72-4a73-a22b-240fbfb78e73
 *       400:
 *         description: Erro de validação
 */
router.post(
  "/",
  checkAccess("user", "create"),
  validateBody(CreateUserValidator),
  (req, res) => userController.create(req, res),
);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Lista usuários com paginação
 *     tags: [user]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Tamanho da página
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 42
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "e40f7b4a-1f19-40ea-9f3d-9e7c2de46232"
 *                       name:
 *                         type: string
 *                         example: Bruno Duarte
 *                       email:
 *                         type: string
 *                         example: bruno@example.com
 *                       type:
 *                         type: string
 *                         example: admin
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-04-14T10:45:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-04-15T15:30:00.000Z"
 */
router.get(
  "/",
  checkAccess("user", "read"),
  validateQuery(GetUserValidator),
  (req, res) => userController.findAll(req, res),
);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 id:
 *                  type: string
 *                  format: uuid
 *                  example: 142d799c-0d72-4a73-a22b-240fbfb78e73
 *                 type:
 *                  type: string
 *                  example: ADMIN
 *                 name:
 *                  type: string
 *                  example: Bruno Duarte
 *                 email:
 *                  type: string
 *                  example: contato.bduaart@gmail.com
 *                 createdAt:
 *                   type: string
 *                   example: '15/04/2025'
 *                 updatedAt:
 *                   type: string
 *                   example: '15/04/2025'
 *       404:
 *         description: Not Found
 */
router.get(
  "/:id",
  checkAccess("user", "read"),
  validateParams(GetUserByIdValidator),
  (req, res) => userController.findById(req, res),
);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualiza dados de um usuário
 *     tags: [user]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [admin, user]
 *     responses:
 *       204:
 *         description: No Content
 */
router.put(
  "/:id",
  checkAccess("user", "update"),
  validateParams(UpdateUserValidator),
  validateBody(UpdateUserValidator),
  (req, res) => userController.update(req, res),
);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Remove um usuário por ID
 *     tags: [user]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: No Content
 *       404:
 *         description: Not Found
 */
router.delete(
  "/:id",
  checkAccess("user", "delete"),
  validateParams(DeleteUserValidator),
  (req, res) => userController.delete(req, res),
);
export default router;
