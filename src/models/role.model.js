import { Schema, model } from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         name:
 *           type: string
 *           required: true
 *           unique: true
 *           lowercase: true
 *           trim: true
 *         description:
 *           type: string
 *           description: More details about the role
 *           trim: true
 *         isSystem:
 *           type: boolean
 *           description: This role made by system or admin
 *           default: false
 *           immutable: true
 *         permissions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Permission'
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
const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    isSystem: {
        type: Boolean,
        default: false,
        immutable: true,
    },
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Permission',
    }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', immutable: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true,
})

const Role = model('Role', roleSchema)

export default Role
