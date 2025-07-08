import Like from '../models/like.model.js'

/**
 * DONE Create
 * DONE Show
 * DONE Get
 * DONE Update
 * DONE Delete
 */


export const createLike = async (auth, likeData) => {
    const createdLike = await Like.create({
        ...likeData,
        createdBy: auth._id,
    })

    return createdLike
} 

export const showLike =  async (likeId) => {
    const likeInfo = await Like.findById(likeId)
        .where({ deletedAt: null })
    
    if (!likeInfo) throw new Error("Like not found")

    return likeInfo
}

export const getLikes = async () => {
    const all = await Like.find({ deletedAt: null })

    return all
}

export const updateLike = async (auth, likeId, likeData) => {
    const updatedLike = await Like.findOneAndUpdate({ _id: likeId, deletedAt: null }, {
        ...likeData,
        updatedBy: auth._id,
    }, { new: true })

    if (!updatedLike) throw new Error("Like not found")
    
    return updatedLike
}

export const deleteLike = async (auth, likeId, likeData) => {
    const deletedLike = await Like.findOneAndUpdate({ _id: likeId, deletedAt: null }, {
        ...likeData,
        updatedBy: auth._id,
        deletedAt: Date.now,
    })

    if (!deletedLike) throw new Error("Like not found")
    
    return
}