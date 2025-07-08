import { Router } from "express"
import * as notificationController from '../controllers/notification.controller.js'
import { protect } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import { createNotificationSchema, updateNotificationSchema } from "../validations/notification.validation.js"

const router = Router()

/**
 * @swagger
 * /notification:
 *   post:
 *     summary: Create new notification
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - type
 *               - targetType
 *               - target
 *             properties:
 *               user:
 *                 type: string
 *                 description: User id
 *               type:
 *                 type: string
 *                 description: Notification type (System, new Like, new Follower, etc)
 *               description:
 *                 type: string
 *                 description: Notification details
 *               targetType:
 *                 type: string
 *                 format: email
 *                 description: (Content, Like, Follow)
 *               target:
 *                 type: string
 *                 description: Id of the target
 *               isRead:
 *                 type: boolean
 *                 description: Read status of the notification
 *     responses:
 *       201:
 *         description: Notification created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Unique feild exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /notification:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Getting all notification successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Error while getting notification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /notification/{id}:
 *   get:
 *     summary: Get notification by id
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Notification id
 *     responses:
 *       200:
 *         description: Getting notification data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Error while getting notification data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *             example:
 *               error: "Error message"
 *
 * @swagger
 * /notification/{id}:
 *   put:
 *     summary: Update notification data
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Notification id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User id
 *               type:
 *                 type: string
 *                 description: Notification type (System, new Like, new Follower, etc)
 *               description:
 *                 type: string
 *                 description: Notification details
 *               targetType:
 *                 type: string
 *                 format: email
 *                 description: (Content, Like, Follow)
 *               target:
 *                 type: string
 *                 description: Id of the target
 *               isRead:
 *                 type: boolean
 *                 description: Read status of the notification
 *     responses:
 *       201:
 *         description: Notification updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *       400:
 *         description: Falid while updating notification data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *             example:
 *               errors: "Error message"
 * 
 * @swagger
 * /notification/{id}:
 *   delete:
 *     summary: Delete notification by id
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Notification id
 *     responses:
 *       200:
 *         description: Delete notification (Soft delete)
 *       400:
 *         description: Error while deleting the notification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notification'
 *             example:
 *               error: "Error message"
 */

// General middleware
router.use(protect)

router.post('/', validate(createNotificationSchema), notificationController.create)
router.get('/:id', notificationController.show)
router.get('/', notificationController.get)
router.put('/', validate(updateNotificationSchema), notificationController.update)
router.delete('/:id', notificationController.remove)

export default router
