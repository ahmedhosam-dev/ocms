import { Schema, model } from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         name:
 *           type: string
 *           trim: true
 *           required: true
 *           unique: true
 *           index: true
 *         description:
 *           type: string
 *           description: More details about the category
 *           trim: true
 *         createdBy:
 *           $ref: '#/components/schemas/User'
 *         updatedBy:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: date
 *           immutable: true
 *         updatedAt:
 *           type: date
 *         deletedAt:
 *           type: date
 *           default: null
 */

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        uniqe: true,
        index: true,
    },
    description: {
        type: String,
        trim: true
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', immutable: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true,
})

const Category = model('Category', categorySchema)
export default Category
