import Tag from '../models/tag.model.js'

/**
 * DONE Create
 * DONE Show
 * DONE Get
 * DONE Update
 * DONE Delete
 */

export const createTag = async (auth, tagData) => {
    const createdTag = await Tag.create({
        ...tagData,
        createdBy: auth._id,
    })

    return createdTag
}

export const showTag = async (tagId) => {
    const tagInfo = await Tag.findById(tagId)
        .where({ deletedAt: null })

    if (!tagInfo) throw new Error("Tag not found")

    return tagInfo
}

export const getTags = async () => {
    const all = await Tag.find({ deletedAt: null })

    return all
}

export const updateTag = async (auth, tagId, tagData) => {
    const updatedTag = await Tag.findOneAndUpdate({ _id: tagId, deletedAt: null}, {
        ...tagData,
        updatedBy: auth._id,
    }, { new: true })

    if (!updatedTag) throw new Error("Tag not found")

    return updatedTag
}

export const deletedTag = async (auth, tagId) => {
    const updatedTag = await Tag.findOneAndUpdate({ _id: tagId, deletedAt: null}, {
        ...tagData,
        updatedBy: auth._id,
        deletedAt: Date.now
    })

    if (!updatedTag) throw new Error("Tag not found")

    return
}