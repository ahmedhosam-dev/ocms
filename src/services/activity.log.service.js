import ActivityLog from '../models/activity.log.model.js'

/**
 * DONE Create
 * DONE Show
 * DONE Get
 * DONE Update
 * DONE Delete
 */


export const createActivityLog = async (auth, activityLogData) => {
    const createdActivityLog = await ActivityLog.create({
        ...activityLogData,
        createdBy: auth._id,
    })

    return createdActivityLog
} 

export const showActivityLog =  async (activityLogId) => {
    const activityLogInfo = await ActivityLog.findById(activityLogId)
        .where({ deletedAt: null })
    
    if (!activityLogInfo) throw new Error("activityLog not found")

    return activityLogInfo
}

export const getActivityLogs = async () => {
    const all = await ActivityLog.find({ deletedAt: null })

    return all
}

export const updateActivityLog = async (auth, activityLogId, activityLogData) => {
    const updatedActivityLog = await ActivityLog.findOneAndUpdate({ _id: activityLogId, deletedAt: null }, {
        ...activityLogData,
        updatedBy: auth._id,
    }, { new: true })

    if (!updatedActivityLog) throw new Error("ActivityLog not found")
    
    return updatedActivityLog
}

export const deleteActivityLog = async (auth, activityLogId, activityLogData) => {
    const deletedActivityLog = await ActivityLog.findOneAndUpdate({ _id: activityLogId, deletedAt: null }, {
        ...activityLogData,
        updatedBy: auth._id,
        deletedAt: Date.now,
    })

    if (!deletedActivityLog) throw new Error("ActivityLog not found")
    
    return
}