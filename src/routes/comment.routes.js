import { Router } from "express"
import * as commentController from '../controllers/comment.controller.js'
import { protect } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import { createCommentSchema, updateCommentSchema } from "../validations/comment.validatoin.js"

const router = Router()

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create new comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - user
 *               - comment
 *             properties:
 *               content:
 *                 type: string
 *                 description: Id of the content
 *               user:
 *                 type: string
 *                 description: Id of the user that will made comment on the content
 *               comment:
 *                 type: string
 *                 description: Comment content
 *               parentComment:
 *                 type: string
 *                 description: Id of the Parent comment
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Error while creating new comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             example:
 *               errors: ["Email is already exists"]
 * 
 * @swagger
 * /comment:
 *   get:
 *     summary: Get all comments
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Import comment data for display
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Error while getting comments
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Get comment by id
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Comment id
 *     responses:
 *       200:
 *         description: Getting comment data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Error while getting comment data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             example:
 *               error: "Error message"
 *
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: Update comment data
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Id of the content
 *               user:
 *                 type: string
 *                 description: Id of the user that will made comment on the content
 *               comment:
 *                 type: string
 *                 description: Comment content
 *               parentComment:
 *                 type: string
 *                 description: Id of the Parent comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Falid while updating comment data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             example:
 *               errors: "Error message"
 * 
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete comment by id
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Comment id
 *     responses:
 *       200:
 *         description: Delete comment (Soft delete)
 *       400:
 *         description: Error while deleting the comment 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *             example:
 *               error: "Error message"
 */

// General middleware
router.use(protect)

router.post('/', validate(createCommentSchema), commentController.create)
router.get('/:id', commentController.show)
router.get('/', commentController.get)
router.put('/:id', validate(updateCommentSchema), commentController.update)
router.delete('/:id', commentController.remove)

export default router
