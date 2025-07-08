import * as likeService from '../services/like.service.js'

export const create = async (req, res) => {
    try {
        const result = await likeService.createLike(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Create like Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const show = async (req, res) => {
    try {
        const result = await likeService.showLike(req.params.id)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to show like data:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const get = async (req, res) => {
    try {
        const result = await likeService.getLikes()
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to get likes:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const result = await likeService.updateLike(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to update like:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const result = await likeService.deleteLike(req.auth, req.params)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to delete like:', error.message)
        res.status(400).json({ error: error.message })
    }
}
