import { Schema, model } from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         name:
 *           type: string
 *           unique: true
 *           required: true
 *           index: true
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

const tagSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', immutable: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null, },
}, {
    timestamps: true,
})

const Tag = model('Tag', tagSchema)
export default Tag
