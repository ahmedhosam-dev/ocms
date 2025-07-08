import { Schema, model } from 'mongoose'
import { feature, action } from '../Enums/permission.enum.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         feature:
 *           type: string
 *           description: System feature that user try to access like (user, role, permission, activity, tag, etc)
 *           required: true
 *         action:
 *           type: string
 *           description: User action, what can do? (read, write, show, delete, etc)
 *           required: true
 *         isSystem:
 *           type: boolean
 *           description: This permission made by system or not 
 *           default: false
 *           immutable: true
 *         createdBy:
 *           $ref: '#/components/schemas/User'
 *         updatedBy:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: date
 *           immutable: true
 *         updatedAt:
 *           type: date
 */

const permissionSchema = new Schema({
    feature: {
        type: String,
        required: true,
        enum: Object.values(feature),
    },
    action: {
        type: String,
        required: true,
        enum: Object.values(action),
    },
    isSystem: {
        type: Boolean,
        default: false,
        immutable: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', immutable: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', },
}, {
    timestamps: true,
})

const Permission = model('Permission', permissionSchema)
export default Permission
