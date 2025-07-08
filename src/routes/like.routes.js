import { Router } from "express"
import * as likeController from '../controllers/like.controller.js'
import { protect } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import { createLikeSchema, updateLikeSchema } from "../validations/like.validation.js"

const router = Router()

/**
 * @swagger
 * /like:
 *   post:
 *     summary: Create new like
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - targetType
 *               - target
 *               - user
 *               - status
 *             properties:
 *               targetType:
 *                 type: string
 *                 description: Type of the thing that you liked on (Content, Comment)
 *               target:
 *                 type: string
 *                 description: ID of the target (Content, Comment)
 *               user:
 *                 type: string
 *                 description: User id that made the like
 *               status:
 *                 type: string
 *                 format: email
 *                 description: Like status (Like, Dislike)
 *     responses:
 *       201:
 *         description: Like created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Error while creating like
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *             example:
 *               error: "Error message" 
 * 
 * @swagger
 * /like:
 *   get:
 *     summary: Get all likes
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Import like data for display
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Error while getting likes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /like/{id}:
 *   get:
 *     summary: Get like by id
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: User id to
 *     responses:
 *       200:
 *         description: Getting like data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Error while getting like data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *             example:
 *               error: "Error message"
 *
 * @swagger
 * /like/{id}:
 *   put:
 *     summary: Update like data
 *     tags: [Like]
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
 *               targetType:
 *                 type: string
 *                 description: Type of the thing that you liked on (Content, Comment)
 *               target:
 *                 type: string
 *                 description: ID of the target (Content, Comment)
 *               user:
 *                 type: string
 *                 description: User id that made the like
 *               status:
 *                 type: string
 *                 format: email
 *                 description: Like status (Like, Dislike)
 *     responses:
 *       200:
 *         description: Like updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *       400:
 *         description: Error while updating like
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *             example:
 *               error: "Error message" 
 * 
 * @swagger
 * /like/{id}:
 *   delete:
 *     summary: Delete like by id
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: User id to
 *     responses:
 *       200:
 *         description: Delete user (Soft delete)
 *       400:
 *         description: Error while deleting the user 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 *             example:
 *               error: "Error message"
 */

// General middleware
router.use(protect)

router.post('/', validate(createLikeSchema), likeController.create)
router.get('/:id', likeController.show)
router.get('/', likeController.get)
router.put('/:id', validate(updateLikeSchema), likeController.update)
router.delete('/:id', likeController.remove)


export default router
