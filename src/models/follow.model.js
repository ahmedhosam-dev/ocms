import { Schema, model } from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Follow:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         follower:
 *           $ref: '#/components/schemas/User'
 *         following:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: date
 *           immutable: true
 *         updatedAt:
 *           type: date
 */

const followSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
})

const Follow = model('Follow', followSchema)
export default Follow
