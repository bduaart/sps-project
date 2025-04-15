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
 *         description: Ok
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
