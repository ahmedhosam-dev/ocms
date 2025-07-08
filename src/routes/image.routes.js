import { Router } from 'express'
// import upload from '../middlewares/upload.middleware.js'
import validate from '../middlewares/validate.middleware.js'
import { imageSchema } from '../validations/image.validation.js'
import { protect } from '../middlewares/auth.middleware.js'
// import { uploadImage, getImage, deleteImage } from '../controllers/image.controller.js'

const router = Router()

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Upload image
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - size
 *               - name
 *             properties:
 *               type:
 *                 type: string
 *                 description: Image extention (.jpg, .png, etc)
 *               size:
 *                 type: int
 *                 description: File size
 *               name:
 *                 type: string
 *                 description: File name
 *     responses:
 *       201:
 *         description: Upload image successfully
 *         content:
 *           application/json:
 *             schema:
 *               filename: "File-Name.png"
 *       400:
 *         description: Falid while upload image
 *         content:
 *           application/json:
 *             example:
 *               error: "No file uploaded"
 *     
 *
 * @swagger
 * /images/{filename}:
 *   get:
 *     summary: Get image
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: filename
 *         in: query
 *         description: Image file name
 *     responses:
 *       200:
 *         description: Image found and sent
 *       404:
 *         description: There's no image in database with this name
 *         content:
 *           application/json:
 *             example:
 *               error: "Image not found"
 *       500:
 *         description: There's no image in database with this name
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 * 
 * @swagger
 * /images/{filename}:
 *   delete:
 *     summary: Delete image
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: filename
 *         in: query
 *         description: Image file name
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             example:
 *               message: "Image deleted"
 *       404:
 *         description: There's no image in database with this name
 *         content:
 *           application/json:
 *             example:
 *               error: "Image not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
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
 *         description: Error while getting user user data
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
router.use(protect)

// router.post('/', [ upload.single('image'), validate(imageSchema) ], uploadImage)
router.post('/', [ , validate(imageSchema) ], uploadImage)
router.get('/:filename', getImage)
router.delete('/:filename', deleteImage)

export default router
