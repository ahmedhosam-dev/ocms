import { Router } from "express"
import * as permissionController from '../controllers/permission.controller.js'
import { protect } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import { createPermissionSchema, updatePermissionSchema } from "../validations/permission.validation.js"
import { feature, action } from "../Enums/permission.enum.js"

const router = Router()

/**
 * @swagger
 * /permission:
 *   post:
 *     summary: Create new permission
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - feature
 *               - action
 *             properties:
 *               feature:
 *                 type: string
 *                 description: System feature (Like, Commment, User, etc)
 *               action:
 *                 type: string
 *                 description: What can user do (Read, Write, View, Manage, etc)
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Error while creating new permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /permission:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Important permission data for display
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Error while getting permissions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /permission/{id}:
 *   get:
 *     summary: Get permission by id
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Permission id
 *     responses:
 *       200:
 *         description: Getting permission data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Error while getting permission data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/permission'
 *             example:
 *               error: "Error permission"
 *
 * @swagger
 * /permission/{id}:
 *   put:
 *     summary: Update permission data
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Permission id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feature:
 *                 type: string
 *                 description: System feature (Like, Commment, User, etc)
 *               action:
 *                 type: string
 *                 description: What can user do (Read, Write, View, Manage, etc)
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Falid while updating permission data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /permission/{id}:
 *   delete:
 *     summary: Delete permission by id
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: User id to
 *     responses:
 *       200:
 *         description: Delete permission (Soft delete)
 *       401:
 *         description: Error while deleting the permission
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *             example:
 *               error: "Error message"
 * @swagger
 * /permission/allowed/fa:
 *   get:
 *     summary: Getting Features and Actions
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of Features and Action that allowed to be used in the system
 *       401:
 *         description: Error while gettting features/actions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *             example:
 *               error: "Error message"
 *
 */

// General middleware
router.use(protect)

router.post('/', validate(createPermissionSchema), permissionController.create)
router.get('/:id', permissionController.show)
router.get('/', permissionController.get)
// DELETED router.put('/:id', validate(updatePermissionSchema), permissionController.update)
// DELETED router.delete('/:id', permissionController.remove)
router.get('/allowed/fa', (req, res) => {
    console.log("Fuck off")
    res.status(200).json({
        feature: feature,
        action: action
    })
})

export default router
