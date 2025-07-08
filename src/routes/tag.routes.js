import { Router } from "express"
import * as tagController from '../controllers/tag.controller.js'
import { protect } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import { createTagSchema, updateTagSchema } from "../validations/tag.validation.js"

const router = Router()

/**
 * @swagger
 * /tag:
 *   post:
 *     summary: Create new tag
 *     tags: [Tag]
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
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tag name
 *     responses:
 *       201:
 *         description: Tag created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Error while creating tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /tag:
 *   get:
 *     summary: Get all tags
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get all tags
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Error while getting tags
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /tag/{id}:
 *   get:
 *     summary: Get tag by id
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Tag id
 *     responses:
 *       200:
 *         description: Getting tag data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Error while getting tag data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *             example:
 *               error: "Error message"
 *
 * @swagger
 * /tag/{id}:
 *   put:
 *     summary: Update tag data
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Tag id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Tag name
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *       400:
 *         description: Error while updating tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tag'
 *             example:
 *               error: "Error message"
 *
 * @swagger
 * /tag/{id}:
 *   delete:
 *     summary: Delete tag by id
 *     tags: [Tag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Tag id
 *     responses:
 *       204:
 *         description: Delete tag (Soft delete)
 *       400:
 *         description: Error while deleting the tag
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tag'
 *             example:
 *               error: "Error message"
 */

// General middleware
router.use(protect)

router.post('/', validate(createTagSchema), tagController.create)
router.get('/:id', tagController.show)
router.get('/', tagController.get)
router.put('/', validate(updateTagSchema), tagController.update)
router.delete('/:id', tagController.remove)

export default router
