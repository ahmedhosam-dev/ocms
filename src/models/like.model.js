import { Schema, model } from 'mongoose'
import { likeOn } from '../Enums/target.enum.js'
import { LikeStatus } from '../Enums/status.enum.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         targetType:
 *            type: string 
 *            description: Like on content/comment
 *            required: true
 *            index: true
 *         targetId:
 *            type: string
 *            description: ID of the target (content/comment)
 *            required: true
 *            refPath: targetType
 *         user:
 *           $ref: '#/components/schemas/User'
 *         status:
 *           type: string
 *           description: like/dislike/removed
 *           required: true
 *           default: like
 *         createdAt:
 *           type: date
 *           immutable: true
 *         updatedAt:
 *           type: date
 */

const likeSchema = new Schema({
    targetType: {
        type: String,
        required: true,
        enum: Object.values(likeOn),
        index: true,
    },
    targetId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'targetType',
        index: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        index: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(LikeStatus),
        default: LikeStatus.LIKE,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

// One like per user per target 
likeSchema.index({ targetType: 1, targetId: 1, userId: 1, }, { unique: true })

const Like = model('Like', likeSchema);
export default Like
