import * as commentService from '../services/comment.service.js'


export const create = async (req, res) => {
    try {
        const result = await commentService.createComment(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Create comment Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}
export const show = async (req, res) => {
    try {
        const result = await commentService.showComment(req.params.id)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to show comment data:', error.message)
        res.status(400).json({ error: error.message })
    }
}
export const get = async (req, res) => {
    try {
        const result = await commentService.getComments()
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to get comments:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const result = await commentService.updateComment(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to update comment:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const result = await commentService.deleteComment(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to delete comment:', error.message)
        res.status(400).json({ error: error.message })
    }
}

