import Tag from '../models/tag.model.js'

export const titleToSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

export const imageURL = (filename) => {
    return `${process.env.APP_URL}/images/${filename}`
}

export const processTags = async (tagNames, user) => {
    const normalizedNames = tagNames.map(name => name.trim().toLowerCase())

    // Fetch existing tags
    const existingTags = await Tag.find({ name: { $in: normalizedNames } })
    const existingNames = existingTags.map(t => t.name)
    const existingIds = existingTags.map(t => t._id)

    // Determine which tags need to be inserted
    const newNames = normalizedNames.filter(name => !existingNames.includes(name))
    const inserted = await Tag.insertMany(
      newNames.map(name => ({
        name,
        createdBy: user._id,
        updatedBy: user._id,
      })),
      { ordered: false } // skip duplicates if race condition
    ).catch(err => {
      if (err.code !== 11000) throw err // ignore duplicate key errors
      return [] // or refetch after insert if necessary
    })

    const insertedIds = inserted.map(t => t._id)

    return [...existingIds, ...insertedIds]
}