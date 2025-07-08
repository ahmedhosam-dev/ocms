import { Router } from "express"
import * as followController from '../controllers/follow.controller.js'
import { protect } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import { createFollowSchema, updateFollowSchema } from "../validations/follow.validation.js"

const router = Router()

/**
 * @swagger
 * /follow:
 *   post:
 *     summary: Create new follow
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - follower
 *               - following
 *             properties:
 *               follower:
 *                 type: string
 *                 description: User id that will follow someone
 *               following:
 *                 type: string
 *                 description: User id that will be followed by someone
 *     responses:
 *       201:
 *         description: Follow created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *       400:
 *         description: Error while creating new follow
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *             example:
 *               errors: "Error message"
 * 
 * @swagger
 * /follow:
 *   get:
 *     summary: Get all follow data
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Import follow data for display
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *       400:
 *         description: Error while getting follows
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /follow/{id}:
 *   get:
 *     summary: Get follow by id
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: follow id
 *     responses:
 *       200:
 *         description: Getting follow data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *       400:
 *         description: Error while getting follow data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *             example:
 *               error: "Error message"
 *
 * @swagger
 * /follow/{id}:
 *   put:
 *     summary: Update follow data
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Follow id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               follower:
 *                 type: string
 *                 description: User id that will follow someone
 *               following:
 *                 type: string
 *                 description: User id that will be followed by someone
 *     responses:
 *       200:
 *         description: Follow updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *       400:
 *         description: Falid while updating user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *             example:
 *               errors: "Error message"
 * 
 * @swagger
 * /follow/{id}:
 *   delete:
 *     summary: Delete follow by id
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Follow id
 *     responses:
 *       200:
 *         description: Delete follow (Soft delete)
 *       400:
 *         description: Error while deleting the follow
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follow'
 *             example:
 *               error: "Error message"
 */

// General middleware
router.use(protect)

router.post('/', validate(createFollowSchema), followController.create)
router.get('/:id', followController.show)
router.get('/', followController.get)
router.put('/:id', validate(updateFollowSchema), followController.update)
router.delete('/:id', followController.remove)


export default router
