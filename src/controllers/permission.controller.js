import * as permissionService from '../services/permission.service.js'


export const create = async (req, res) => {
    try {
        const result = await permissionService.createPermission(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Create permission Error:', error.message)
        res.status(400).json({ error: error.message })
    }
}
export const show = async (req, res) => {
    try {
        const result = await permissionService.showPermission(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        console.error('Falid to show permission data:', error.message)
        res.status(400).json({ error: error.message })
    }
}
export const get = async (req, res) => {
    try {
        const result = await permissionService.getPermissions()
        res.status(200).json(result)
    } catch (error) {
        console.error('Falid to get permissions:', error.message)
        res.status(400).json({ error: error.message })
    }
}

/* DELETED
export const update = async (req, res) => {
    try {
        const result = await permissionService.updatePermission(req.auth, req.params.id, req.body)
        res.status(200).json(result)
    } catch (error) {
        console.error('Falid to update permission:', error.message)
        res.status(400).json({ error: error.message })
    }
}
*/

/* DELETED
export const remove = async (req, res) => {
    try {
        const result = await permissionService.deletePermission(req.auth, req.params.id)
        res.status(204).json(result)
    } catch (error) {
        console.error('Falid to delete permission:', error.message)
        res.status(400).json({ error: error.message })
    }
}
*/
