import * as userService from '../services/user.service.js'

export const create = async (req, res) => {
    try {
        const result = await userService.createUser(req.auth, req.body)
        res.status(201).json(result)
    } catch (error) {
        console.error('Create user Error:', error.message)
        if (error.message) {
            res.status(409).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Server error" });
        }
    }
}

export const show = async (req, res) => {
    try {
        const result = await userService.showUser(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        console.error('Falid to show user data:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const get = async (req, res) => {
    try {
        const result = await userService.getUsers()
        res.status(200).json(result)
    } catch (error) {
        console.error('Falid to get users:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const result = await userService.updateUser(req.auth, req.params.id, req.body)
        res.status(200).json(result)
    } catch (error) {
        console.error('Falid to update user:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const remove = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.auth, req.params.id)
        res.status(204).json(result)
    } catch (error) {
        console.error('Falid to delete user:', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const profile = async (req, res) => {
    try {
        const result = await userService.userProfile(req.auth, req.params.id)
        res.status(200).json(result)
    } catch (error) {
        console.error('Falid to get profile data:', error.message)
        res.status(400).json({ error: error.message })
    }
}
