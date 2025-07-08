import Role from '../models/role.model.js'

/**
 * DONE Create
 * DONE Read
 * DONE Get
 * DONE Update
 * DONE Delete
 */

export const createRole = async (auth, roleData) => {
    const createdRole = await Role.create({
        ...roleData,
        createdBy: auth._id,
    })

    return createdRole
}

export const showRole = async (roleId) => {
    const roleInfo = await Role.findById(roleId)
        .populate('permissions', 'feature action isSystem')
        .where({ deletedAt: null })
    
    if (!roleInfo) throw new Error("Role not found")
    
    return roleInfo
}

export const getRoles = async () => {
    const all = await Role.find({ deletedAt: null })
        .populate('permissions', 'feature action isSystem')
    
    return all
}

export const updateRole = async (auth, roleId, roleData) => {
    const updatedRole = await Role.findOneAndUpdate({ _id: roleId, deletedAt: null }, {
        ...roleData,
        updatedBy: auth._id,
    }, { new: true })

    if (!updatedRole) throw new Error("Role not found")

    return updatedRole
}

export const deleteRole = async (auth, roleId) => {
    const deletedRole = await Role.findOneAndUpdate({ _id: roleId, deletedAt: null }, {
        updatedBy: auth._id,
        deletedAt: Date.now()
    })

    if (!deletedRole) throw new Error('Role not found')

    return
}
