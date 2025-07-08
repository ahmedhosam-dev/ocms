import { Router } from "express"
import * as roleController from '../controllers/role.controller.js'
import { protect } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import { createRoleSchema, updateRoleSchema } from "../validations/role.validation.js"

const router = Router()

/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create new role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - permissions
 *             properties:
 *               name:
 *                 type: string
 *                 description: Role name (Collection of permissions)
 *               description:
 *                 type: string
 *                 description: More details about this role
 *               permissions:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Permission'
 *                 description: Array of permissions id
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Error while creating role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /role:
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all roles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Error while getting roles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Get role by id
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Role id
 *     responses:
 *       200:
 *         description: Getting role data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Error while getting role data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *             example:
 *               error: "Error message"
 *
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: Update role data
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Role id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Role name (Collection of permissions)
 *               description:
 *                 type: string
 *                 description: More details about this role
 *               permissions:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Permission'
 *                 description: Array of permissions id
 *     responses:
 *       201:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Error while updating role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *             example:
 *               error: "Error message"
 *
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Delete role by id
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Role id
 *     responses:
 *       204:
 *         description: Delete role (Soft delete)
 *       400:
 *         description: Error while deleting the role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *             example:
 *               error: "Error message"
 */

// General middleware
router.use(protect)

router.post('/', validate(createRoleSchema), roleController.create)
router.get('/:id', roleController.show)
router.get('/', roleController.get)
router.put('/:id', validate(updateRoleSchema), roleController.update)
router.delete('/:id', roleController.remove)

export default router
