import Notification from '../models/notification.model.js'

/**
 * DONE Create
 * DONE Show
 * DONE Get
 * DONE Update
 * DONE Delete
 */

export const createNotification = async (auth, notificationData) => {
    const createdNotification = await Notification.create({
        ...notificationData,
        createdBy: auth._id,
    })

    return createdNotification
} 

export const showNotification =  async (notificationId) => {
    const notificationInfo = await Notification.findById(notificationId)
        .where({ deletedAt: null })
    
    if (!notificationInfo) throw new Error("Notification not found")

    return notificationInfo
}

export const getNotifications = async () => {
    const all = await Notification.find({ deletedAt: null })

    return all
}

export const updateNotification = async (auth, notificationId, notificationData) => {
    const updatedNotification = await Notification.findOneAndUpdate({ _id: notificationId, deletedAt: null }, {
        ...notificationData,
        updatedBy: auth._id,
    }, { new: true })

    if (!updatedNotification) throw new Error("Notification not found")
    
    return updatedNotification
}

export const deleteNotification = async (auth, notificationId, notificationData) => {
    const deletedNotification = await Notification.findOneAndUpdate({ _id: notificationId, deletedAt: null }, {
        ...notificationData,
        updatedBy: auth._id,
        deletedAt: Date.now,
    })

    if (!deletedNotification) throw new Error("Notification not found")
    
    return
}