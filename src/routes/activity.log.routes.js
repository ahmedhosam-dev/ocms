import { Router } from "express"
import * as activityLogController from '../controllers/activity.log.controller.js'
import { protect } from "../middlewares/auth.middleware.js"

const router = Router()

/**
 */

// General middleware
router.use(protect)

router.get('/', activityLogController.get)

export default router
