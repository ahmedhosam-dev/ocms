import * as activityLogService from '../services/activity.log.service.js'

export const get = async (req, res) => {
    try {
        const result = await activityLogService.getActivities()
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to get activities:', error.message)
        res.status(400).json({ error: error.message })
    }
}