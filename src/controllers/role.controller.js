import * as roleService from '../services/role.service.js'


export const create = async (req, res) => {
    try {
        const result = await roleService.createRole(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Create role Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}
export const show = async (req, res) => {
    try {
        const result = await roleService.showRole(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        console.error('Falid to show role data:', error.message)
        res.status(400).json({ error: error.message })
    }
}
export const get = async (req, res) => {
    try {
        const result = await roleService.getRoles()
        res.status(200).json(result)
    } catch (error) {
        console.error('Falid to get roles:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const result = await roleService.updateRole(req.auth, req.params.id, req.body)
        res.status(200).json(result)
    } catch (error) {
        console.error('Falid to update role:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const result = await roleService.deleteRole(req.auth, req.params.id)
        res.status(204).json(result)
    } catch (error) {
        console.error('Falid to delete role:', error.message)
        res.status(400).json({ error: error.message })
    }
}
