import { Schema, model } from 'mongoose'
import { notificationAbout } from '../Enums/target.enum.js'
import { notificationType } from '../Enums/notification.enum.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         user:
 *           $ref: '#/components/schemas/User'
 *         type:
 *           type: string
 *           required: true
 *         description:
 *           type: string
 *           default: empty string ""
 *         target:
 *            type: string 
 *            description: ID of notification target (new follower, new like, comment, etc)
 *            refPath: 'targetType'
 *         targetType:
 *            type: string 
 *            description: Model name (user, follow, like, comment, etc)
 *            required: true
 *         isRead:
 *            type: boolean
 *            description: Is notification has been readed by user or not 
 *            default: false
 *         createdAt:
 *           type: date
 *           immutable: true
 */

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(notificationType),
    },
    descriptoin: {
        type: String,
        default: "",
    },
    target: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'targetType',
    },
    targetType: {
        type: String,
        required: true,
        enum: Object.values(notificationAbout),
    },
    isRead: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})

const Notification = model('Notification', notificationSchema)
export default Notification
