import * as contentSercive from '../services/content.service.js'

export const create = async (req, res) => {
    try {
        const result = await contentSercive.createContent(req.body, req.auth)
        res.status(201).json(result)
    } catch (error) {
        console.error('Create Content Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const show = async (req, res) => {
    try {
        const content = await contentSercive.getContentById(req.params.id)
        res.json(content)
    } catch (error) {
        console.error('Get Content Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const getAll = async (req, res) => {
    try {
        const contents = await contentSercive.getAllContent(req.auth, req.params)
        res.json(contents)
    } catch (error) {
        console.error('Get All Content Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const result = await contentSercive.updateContent(req.params.id, req.body, req.auth)
        res.json(result)
    } catch (error) {
        console.error('Update Content Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const result = await contentSercive.deleteContent(req.params.id, req.auth)
        res.json(result)
    } catch (error) {
        console.error('Delete Content Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const browse = async (req, res) => {
    try {
        const result = await contentSercive.browseContent(req.query)
        res.json(result)
    } catch (error) {
        console.error('Falid while getting content:', error.message)
        res.status(400).json({ error: error.message })
    }
}