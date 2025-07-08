import Permission from "../models/permission.model.js"
import { feature, action } from "../Enums/permission.enum.js"

/**
 * DONE Create
 * DONE Show
 * DONE Get
 * DONE Update
 * DONE Delete
 */

export const createPermission = async (auth, permissionData) => {
    const createdPermission = await Permission.create({
        ...permissionData,
        createdBy: auth._id,
    })

    return createdPermission
}

export const showPermission = async (permissionId) => {
    const permissionInfo = await Permission.findById(permissionId)
        .where({ deletedAt: null })
    
    if (!permissionInfo) throw new Error("Permission not found")
    
    return permissionInfo
}

export const getPermissions = async () => {
    const all = await Permission.find({ deletedAt: null })

    return all
}

/* DELETED
export const updatePermission = async (auth, permissionId, permissionData) => {
    const updatedPermission = await Permission.findOneAndUpdate({ _id: permissionId, deletedAt: null }, {
        ...permissionData,
        updatedBy: auth._id,
    }, { new: true })

    if (!updatedPermission) throw new Error("Permission not found")
    
    return updatedPermission
}
*/

/* DELETED
export const deletePermission = async (auth, permissionId) => {
    const deletedPermission = await Permission.findOneAndUpdate({ _id: permissionId, deletedAt: null }, {
        updatedBy: auth._id,
        deletedAt: Date.now()
    })

    if (!deletedPermission) throw new Error("Permission not found")
    
    return
}
*/
