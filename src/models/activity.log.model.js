import { Schema, model } from 'mongoose'
import { activityOn } from '../Enums/target.enum.js';
import { action } from '../Enums/permission.enum.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     ActivityLog:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user's unique identifier
 *         actor:
 *           $ref: '#/components/schemas/User'
 *         action:
 *           type: string
 *           required: true
 *         targetType:
 *           type: string
 *           required: true
 *         targetId:
 *           type: string
 *           required: true
 *         ipAddress:
 *           type: string
 *         userAgent:
 *           type: string
 *         createdAt:
 *           type: date
 */

const activityLogSchema = new Schema(
  {
    actor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: Object.values(action)
    },
    targetType: {
      type: String,
      enum: Object.values(activityOn),
      required: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      refPath: 'targetType',
      required: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

activityLogSchema.index({ actorUserId: 1, createdAt: -1 });
activityLogSchema.index({ targetType: 1, targetId: 1 });
activityLogSchema.index({ action: 1 });

const ActivityLog = model('ActivityLog', activityLogSchema);
export default ActivityLog;
