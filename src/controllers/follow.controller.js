import * as followService from '../services/follow.service.js'

export const create = async (req, res) => {
    try {
        const result = await followService.createFollow(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Create follow Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const show = async (req, res) => {
    try {
        const result = await followService.showFollow(req.params.id)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to show follow data:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const get = async (req, res) => {
    try {
        const result = await followService.getFollows()
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to get follows:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const result = await followService.updateFollow(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to update follow:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const result = await followService.deleteFollow(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to delete follow:', error.message)
        res.status(400).json({ error: error.message })
    }
}