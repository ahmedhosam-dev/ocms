import { Router } from "express"
import * as userController from '../controllers/user.controller.js'
import { protect } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import { createUserSchema, updateUserSchema } from "../validations/user.validation.js"

const router = Router()

/**
 * @swagger
 * /user/{id}/profile:
 *   get:
 *     summary: Getting user profile data
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: User id to
 *     responses:
 *       200:
 *         description: Successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: General error message 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               errors: "Falid to get user profile data."
 *     
 *
 * @swagger
 * /user:
 *   post:
 *     summary: Create new user
 *     tags: [User]
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
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number (10 - 15)
 *               bio:
 *                 type: string
 *                 description: More infromation about the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (min 6 characters)
 *               avatar:
 *                 type: string
 *                 description: File name and extention. (Response of POST /image )
 *               role:
 *                 type: string
 *                 description: ID of the Role model
 *               category:
 *                 type: string
 *                 description: ID of the Category model
 *               status:
 *                 type: string
 *                 description: User profile status (active, inactive, suspended)
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Unique feild exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               errors: ["Email is already exists"]
 * 
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Import user data for display
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: Error while getting users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               error: "Falid to get users: ..."
 * 
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: User id to
 *     responses:
 *       200:
 *         description: Getting user data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error while getting user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               error: "Falid to show user data: ..."
 *
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user data
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: User id to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               phoneNumber:
 *                 type: string
 *                 description: User's phone number (10 - 15)
 *               bio:
 *                 type: string
 *                 description: More infromation about the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (min 6 characters)
 *               avatar:
 *                 type: string
 *                 description: File name and extention. (Response of POST /image )
 *               role:
 *                 type: string
 *                 description: ID of the Role model
 *               category:
 *                 type: string
 *                 description: ID of the Category model
 *               status:
 *                 type: string
 *                 description: User profile status (active, inactive, suspended)
 *     responses:
 *       201:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Falid while updating user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               errors: "Falid to update user: ..."
 * 
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by id
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: User id to
 *     responses:
 *       200:
 *         description: Delete user (Soft delete)
 *       401:
 *         description: Error while deleting the user 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               error: "Falid to delete user: ..."
 */

router.get('/:id/profile', userController.profile)

// General middleware
router.use(protect)

router.post('/', validate(createUserSchema), userController.create)
router.get('/:id', userController.show)
router.get('/', userController.get)
router.put('/:id', validate(updateUserSchema), userController.update)
router.delete('/:id', userController.remove)


export default router
