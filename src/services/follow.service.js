import Follow from '../models/follow.model.js'

/**
 * DONE Create
 * DONE Show
 * DONE Get
 * DONE Update
 * DONE Delete
 */


export const createFollow = async (auth, followData) => {
    const createdFollow = await Follow.create({
        ...followData,
        createdBy: auth._id,
    })

    return createdFollow
} 

export const showFollow =  async (followId) => {
    const followInfo = await Follow.findById(followId)
        .where({ deletedAt: null })
    
    if (!followInfo) throw new Error("Follow not found")

    return followInfo
}

export const getFollows = async () => {
    const all = await Follow.find({ deletedAt: null })

    return all
}

export const updateFollow = async (auth, followId, followData) => {
    const updatedFollow = await Follow.findOneAndUpdate({ _id: followId, deletedAt: null }, {
        ...followData,
        updatedBy: auth._id,
    }, { new: true })

    if (!updatedFollow) throw new Error("Follow not found")
    
    return updatedFollow
}

export const deleteFollow = async (auth, followId, followData) => {
    const deletedFollow = await Follow.findOneAndUpdate({ _id: followId, deletedAt: null }, {
        ...followData,
        updatedBy: auth._id,
        deletedAt: Date.now,
    })

    if (!deletedFollow) throw new Error("Follow not found")
    
    return
}
