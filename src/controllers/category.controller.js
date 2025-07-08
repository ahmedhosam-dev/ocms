import * as categorService from '../services/category.service.js'


export const create = async (req, res) => {
    try {
        const result = await categorService.createCategory(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Create categor Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}
export const show = async (req, res) => {
    try {
        const result = await categorService.showCategory(req.params.id)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to show categor data:', error.message)
        res.status(400).json({ error: error.message })
    }
}
export const get = async (req, res) => {
    try {
        const result = await categorService.getCategorys()
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to get categors:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const result = await categorService.updateCategory(req.auth, req.params.id, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to update categor:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const result = await categorService.deleteCategory(req.auth, req.params.id)
        res.status(201).json(result)
    } catch (error) {
        console.error('Falid to delete categor:', error.message)
        res.status(400).json({ error: error.message })
    }
}
