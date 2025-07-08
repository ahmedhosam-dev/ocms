import * as notificationService from '../services/notification.service.js'

export const create = async (req, res) => {
    try {
        const result = await notificationService.createNotification(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Create notification Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const show = async (req, res) => {
    try {
        const result = await notificationService.showNotification(req.params.id)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to show notification data:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const get = async (req, res) => {
    try {
        const result = await notificationService.getNotifications()
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to get notifications:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const result = await notificationService.updateNotification(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to update notification:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const result = await notificationService.deleteNotification(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to delete notification:', error.message)
        res.status(400).json({ error: error.message })
    }
}