import { Schema, model } from 'mongoose'
import { VisibilityStatus } from '../Enums/status.enum.js'
import { ContentType } from '../Enums/type.enum.js'

/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         title:
 *           type: string
 *           required: true
 *           unique: true
 *           trim: true
 *         description:
 *           type: string
 *           required: true
 *           trim: true
 *         image:
 *           type: string
 *           default: default-blog.jpg
 *         authorId:
 *           $ref: '#/components/schemas/User'
 *         type:
 *           type: string
 *           required: true
 *         slug:
 *           type: string
 *           required: true
 *           lowercase: true
 *           trim: true
 *         markdown:
 *           type: string
 *           required: true
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *         visibility:
 *           type: string
 *           default: draft
 *         language:
 *           type: string
 *           default: en
 *         isFeatured:
 *           type: boolean
 *           default: false
 *         scheduledPublishDate:
 *           type: date
 *           default: null
 *         readTime:
 *           type: int
 *           default: 1
 *         viewCount:
 *           type: int
 *           default: 0
 *         publishedBy:
 *           $ref: '#/components/schemas/User'
 *         updatedBy:
 *           $ref: '#/components/schemas/User'
 *         publishedAt:
 *           type: date
 *           default: null
 *         createdAt:
 *           type: date
 *           immutable: true
 *         updatedAt:
 *           type: date
 *         deletedAt:
 *           type: date
 *           default: null
 */

const contentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: 'default-blog.jpg'
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ContentType),
      required: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    markdown: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    visibility: {
      type: String,
      enum: Object.values(VisibilityStatus),
      default: VisibilityStatus.DRAFT,
    },
    language: {
      type: String,
      default: 'en',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    scheduledPublishDate: {
      type: Date,
      default: null,
    },
    readTime: {
      type: Number,
      default: 1,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    publishedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    publishedAt: {
      type: Date,
      default: null
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)


contentSchema.index({ slug: 1 }, { unique: true })
contentSchema.index({ visibility: 1, scheduledPublishDate: 1 })
contentSchema.index({ tags: 1 })
contentSchema.index({ categoryId: 1 })


contentSchema.pre('validate', function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  next()
})

// Middleware to exclude soft-deleted documents
contentSchema.pre('find', function () {
  this.where({ deletedAt: null });
});

contentSchema.pre('findOne', function () {
  this.where({ deletedAt: null });
});

contentSchema.pre('findById', function () {
  this.where({ deletedAt: null });
});

contentSchema.pre('findByIdAndUpdate', function (next) {
  this.where({ deletedAt: null })
  next()
})

const Content = model('Content', contentSchema)
export default Content
