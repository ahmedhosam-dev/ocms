import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import { UserStatus } from '../Enums/status.enum.js'
import { AuthType } from '../Enums/type.enum.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         name:
 *           type: string
 *           description: The user's full name
 *           required: true
 *           trim: true
 *         phoneNumber:
 *           type: string
 *           trim: true
 *           match: /^[0-9]{10,15}$/
 *         bio:
 *           type: string
 *           description: About the user.
 *           max: 500
 *         email:
 *           type: string
 *           required: true
 *           unique: true
 *           match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
 *         isVerified:
 *           type: boolean
 *           description: Email verification status
 *           default: null
 *         password:
 *           type: string
 *           required: true
 *         authType:
 *           type: string
 *           default: manual
 *           immutable: true
 *         avatar:
 *           type: string
 *           description: File name of user profile picuter 
 *           default: 'default-avatar.png'
 *         role:
 *           $ref: '#/components/schemas/Role' 
 *         category:
 *           $ref: '#/components/schemas/Category' 
 *         status:
 *           type: string
 *           description: Account status (active, inactive, suspended)
 *           default: active
 *         followerCount:
 *           type: int
 *           description: How many users follow this user.
 *           default: 0
 *         followingCount:
 *           type: int
 *           description: How many users this user follow.
 *           default: 0
 *         createdBy:
 *           $ref: '#/components/schemas/User'
 *         updatedBy:
 *           $ref: '#/components/schemas/User'
 *         createdAt:
 *           type: string
 *           formate: date
 *           immutable: true
 *         updatedAt:
 *           type: string
 *           formate: date
 *         deletedAt:
 *           type: string
 *           formate: date
 *           default: null
 */

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      match: /^[0-9]{10,15}$/,
    },
    bio: {
      type: String,
      max: 500,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    isVerified: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    authType: {
        type: String,
        enum: Object.values(AuthType),
        default: AuthType.MANUAL,
        immutable: true
    },
    avatar: {
      type: String,
      default: 'default-avatar.png',
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    followerCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', immutable: true, },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', },
    deletedAt: { type: Date, default: null, },
  }, {
    timestamps: true,
})

// Hash password before save it into database
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS))
      this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
      return next(error)
    }
  }
  next()
})

// Hide password in JSON responses
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.resetPasswordToken
  delete user.resetPasswordExpires
  return user
}

const User = model('User', userSchema)
export default User
