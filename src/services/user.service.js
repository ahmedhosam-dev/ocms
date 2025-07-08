import User from '../models/user.model.js'

/**
 * DONE Create
 * DONE Show
 * DONE Get
 * DONE Update
 * DONE Delete
 */

export const createUser = (auth, userData) => {
    const newUser = User.create({
        ...userData,
        createdBy: auth._id
    })

    return newUser
}

export const showUser = async (userId) => {
    const userInfo = await User.findById(userId)
        .populate({
            path: 'role',
            populate: { path: 'permissions'},
        })
        .where({ deletedAt: null })

    if (!userInfo) throw new Error("User not found")

    return userInfo
}

export const getUsers = async () => {
    const all = User.find({ deletedAt: null})
        .select('_id name email isVerified avatar status role')
    return all
}

export const updateUser = async (auth, userId, userData) => {
    const updatedUser = await User.findOneAndUpdate({ _id: userId, deletedAt: null }, {
        ...userData,
        updatedBy: auth._id
    }, { new: true })
    
    if (!updatedUser) throw new Error('User not found')
    
    return updatedUser
}

export const deleteUser = async (auth, userId) => {
    const deletedUser = await User.findOneAndUpdate({ _id: userId, deletedAt: null }, {
        updatedBy: auth._id,
        deletedAt: Date.now()
    })
    
    if (!deletedUser) throw new Error('User not found')
    
    return
}

export const userProfile = async (auth, userId) => {
    const profile = await User.find({ _id: userId, deletedAt: null })
        .select('_id name bio avatar followerCount followingCount')

    if (!profile) throw new Error("User not found")

    return profile
}
