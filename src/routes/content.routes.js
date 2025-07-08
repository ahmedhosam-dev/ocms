import { Router } from 'express'
import * as contentController from '../controllers/content.controller.js'
import validate from '../middlewares/validate.middleware.js'
import { protect, checkPermission } from '../middlewares/auth.middleware.js'
import { createContentSchema, updateContentSchema } from '../validations/content.validation.js'
import { feature, action } from '../Enums/permission.enum.js'

const router = Router()

/**
 * @swagger
 * /content/browse:
 *   get:
 *     summary: Get all avaliable content for view
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: Getting data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Error while getting content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *             example:
 *               error: "Error message"
 *               
 * @swagger
 * /content:
 *   post:
 *     summary: Create new content
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - type
 *               - markdown
 *               - visibility
 *               - language
 *             properties:
 *               title:
 *                 type: string
 *                 description: Content title
 *               description:
 *                 type: string
 *                 description: Content description
 *               image:
 *                 type: string
 *                 description: Content image
 *               type:
 *                 type: string
 *                 description: Content type (Blog, Presentation)
 *               markdown:
 *                 type: string
 *                 description: Core content writing in markdown 
 *               tags:
 *                 type: string
 *                 description: Tags
 *               visibility:
 *                 type: string
 *                 description: Content visiable or drafted
 *               language:
 *                 type: string
 *                 description: Content language
 *               scheduledPublishDate:
 *                 type: string
 *                 formate: date-time
 *                 description: When content will be published
 *               readTime:
 *                 type: int
 *                 description: How much time take to read this content
 *     responses:
 *       201:
 *         description: Content created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Error while creating content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content '
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /content:
 *   get:
 *     summary: Get all contents
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Import content data for display
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Error while getting content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /content/{id}:
 *   get:
 *     summary: Get content by id
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Content id
 *     responses:
 *       200:
 *         description: Getting content data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Error while getting content data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *             example:
 *               error: "Error message"
 *
 * @swagger
 * /content/{id}:
 *   put:
 *     summary: Update content data
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Content id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Content title
 *               description:
 *                 type: string
 *                 description: Content description
 *               image:
 *                 type: string
 *                 description: Content image
 *               type:
 *                 type: string
 *                 description: Content type (Blog, Presentation)
 *               markdown:
 *                 type: string
 *                 description: Core content writing in markdown 
 *               tags:
 *                 type: string
 *                 description: Tags
 *               visibility:
 *                 type: string
 *                 description: Content visiable or drafted
 *               language:
 *                 type: string
 *                 description: Content language
 *               scheduledPublishDate:
 *                 type: string
 *                 formate: date-time
 *                 description: When content will be published
 *               readTime:
 *                 type: int
 *                 description: How much time take to read this content
 *     responses:
 *       200:
 *         description: Content updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       400:
 *         description: Falid while updating content data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /content/{id}:
 *   delete:
 *     summary: Delete content by id
 *     tags: [Content]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Content id
 *     responses:
 *       200:
 *         description: Delete content (Soft delete)
 *       400:
 *         description: Error while deleting the content
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *             example:
 *               error: "Error message"
 */

// Out of general middleare scope
router.get('/browse', contentController.browse)

// General middleware
router.use(protect)

router.post('/', validate(createContentSchema), contentController.create)
router.get('/:id', contentController.show)
router.get('/', contentController.getAll)
router.put('/:id', validate(updateContentSchema), contentController.update)
router.delete('/:id', contentController.remove)


export default router
