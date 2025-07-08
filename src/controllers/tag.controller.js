import * as tagService from '../services/tag.service.js'


export const create = async (req, res) => {
    try {
        const result = await tagService.createTag(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Create tag Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}
export const show = async (req, res) => {
    try {
        const result = await tagService.showTag(req.params.id)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to show tag data:', error.message)
        res.status(400).json({ error: error.message })
    }
}
export const get = async (req, res) => {
    try {
        const result = await tagService.getTags()
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to get tags:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const result = await tagService.updateTag(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to update tag:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const result = await tagService.deleteTag(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to delete tag:', error.message)
        res.status(400).json({ error: error.message })
    }
}