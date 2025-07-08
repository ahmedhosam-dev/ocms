import Comment from '../models/comment.model.js'

/**
 * DONE Create
 * DONE Show
 * DONE Get
 * DONE Update
 * DONE Delete
 */


export const createComment = async (auth, commentData) => {
    const createdComment = await Comment.create({
        ...commentData,
        createdBy: auth._id,
    })

    return createdComment
} 

export const showComment =  async (commentId) => {
    const commentInfo = await Comment.findById(commentId)
        .where({ deletedAt: null })
    
    if (!commentInfo) throw new Error("Comment not found")

    return commentInfo
}

export const getComments = async () => {
    const all = await Comment.find({ deletedAt: null })

    return all
}

export const updateComment = async (auth, commentId, commentData) => {
    const updatedComment = await Comment.findOneAndUpdate({ _id: commentId, deletedAt: null }, {
        ...commentData,
        updatedBy: auth._id,
    }, { new: true })

    if (!updatedComment) throw new Error("Comment not found")
    
    return updatedComment
}

export const deleteComment = async (auth, commentId, commentData) => {
    const deletedComment = await Comment.findOneAndUpdate({ _id: commentId, deletedAt: null }, {
        ...commentData,
        updatedBy: auth._id,
        deletedAt: Date.now,
    })

    if (!deletedComment) throw new Error("Comment not found")
    
    return
}