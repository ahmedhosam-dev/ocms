import { Router } from "express"
import * as categoryController from '../controllers/category.controller.js'
import { protect } from "../middlewares/auth.middleware.js"
import validate from "../middlewares/validate.middleware.js"
import { createCategorySchema, updateCategorySchema } from "../validations/category.validation.js"

const router = Router()

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create new category
 *     tags: [Category]
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
 *                 description: Category name
 *               description:
 *                 type: string
 *                 description: Category description
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Error while creating category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categorys
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Import category data for display
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Error while getting categorys
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               error: "Error message"
 * 
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Get category by id
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Category id to
 *     responses:
 *       200:
 *         description: Getting category data successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Error while getting category data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               error: "Error message"
 *
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Update category data
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Category id to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name
 *               description:
 *                 type: string
 *                 description: Category description
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Falid while updating category data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               errors: "Error message"
 * 
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category by id
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: query
 *         description: Category id to
 *     responses:
 *       200:
 *         description: Delete category (Soft delete)
 *       401:
 *         description: Error while deleting the category 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *             example:
 *               error: "Error message"
 */

// General middleware
router.use(protect)

router.post('/', validate(createCategorySchema), categoryController.create)
router.get('/:id', categoryController.show)
router.get('/', categoryController.get)
router.put('/:id', validate(updateCategorySchema), categoryController.update)
router.delete('/:id', categoryController.remove)

export default router
