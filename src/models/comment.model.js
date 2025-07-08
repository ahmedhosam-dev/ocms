import { Schema, model } from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         contetn:
 *           $ref: '#/components/schemas/Content'
 *         user:
 *           $ref: '#/components/schemas/User'
 *         comment:
 *           type: string
 *         parentComment:
 *           $ref: '#/components/schemas/Comment'
 *         isApproved:
 *           type: boolean
 *           default: true
 *         likesCount:
 *           type: int
 *           default: 0
 *         dislikesCount:
 *           type: int
 *           default: 0
 *         reportedBy:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
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

const commentSchema = new Schema({
    content: {
        type: Schema.Types.ObjectId,
        ref: 'Content',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    comment: {
        type: String,
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    },
    isApproved: {
        type: Boolean,
        default: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    dislikesCount: {
        type: Number,
        default: 0,
    },
    reportedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, immutable: true, },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    deletedAt: { type: Date, default: null },
}, {
    timestamps: true,
})

const Comment = model('Comment', commentSchema)
export default Comment
