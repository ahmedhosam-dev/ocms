import Content from '../models/content.model.js'
import { ContentType } from '../Enums/type.enum.js'
import { VisibilityStatus } from '../Enums/status.enum.js'
import { titleToSlug, processTags } from '../utils/content.utils.js'

export const createContent = async (contentData, user) => {
  const { 
    title, description, image, type,
    markdown, tags, visibility, language,
    scheduledPublishDate, readTime 
  } = contentData

  let slugFromTitle = await titleToSlug(title)
  let tagIds = await processTags(tags, user)

  try {
    const content = await Content.create({
      title,
      description,
      image,
      authorId: user._id,
      type: type || ContentType.ARTICLE,
      slug: slugFromTitle,
      markdown,
      tags: tagIds,
      visibility: visibility || VisibilityStatus.DRAFT,
      language: language || 'en',
      scheduledPublishDate,
      readTime,
      publishedBy: user._id,
      updatedBy: user._id,
    })

    return {
      message: 'Content created successfully',
      content: {
        _id: content._id,
        title: content.title,
        description: content.description,
        image: content.image,
        createdAt: content.createdAt,
      },
    }

  } catch (err) {
    if (err.code === 11000) {
      throw new Error('Content with this title already exists')
    } else {
      throw new Error('Content creation failed')
    }
  }
}

export const getContentById = async (contentId) => {
  const content = await Content.find({ _id: contentId, deletedAt: null })
    .populate('authorId', 'name email')
    .populate('category', 'name')
    .populate('tags', 'name')
    .populate('updatedBy', 'name email')
    .where({ deletedAt: null })

  if (!content) throw new Error('Content not found')

  return content
}

export const getAllContent = async (user) => {
  const content = await Content.find({ authorId: user._id, deletedAt: null })
    .select('_id title description image tags createdAt updatedAt')
    .populate('tags', 'name')
    .populate('category', 'name')
    .where({ deletedAt: null })

  if (!content) throw new Error('No content found')

  return content
}

export const updateContent = async (contentId, contentData, user) => {
  const { 
    title, description, image, type,
    markdown, tags, visibility, language,
    scheduledPublishDate, readTime 
  } = contentData

  const slugFromTitle = await titleToSlug(title)
  const tagIds = await processTags(tags, user)

  const content = await Content.findByIdAndUpdate(
    contentId,
    {
      title,
      description,
      image,
      type: type || ContentType.ARTICLE,
      slug: slugFromTitle,
      markdown,
      tags: tagIds,
      visibility: visibility || VisibilityStatus.DRAFT,
      language: language || 'en',
      // isFeatured: contentData.isFeatured || false,
      scheduledPublishDate,
      readTime,
      updatedBy: user._id,
      updatedAt: Date.now,
    }, {
      new: true,
    }).where({ deletedAt: null })

    if (!content) throw new Error('Content not found')

    return {
      message: 'Content updated successfully',
      content: content,
    }
  }

export const deleteContent = async (contentId, user) => {
  const content = await Content.findByIdAndUpdate(
    contentId,
    {
      deletedAt: Date.now(),
      updatedBy: user._id,
    },
    { new: true }
  ).where({ deletedAt: null })

  if (!content) {
    throw new Error('Content not found')
  }

  return {
    message: 'Content deleted successfully',
  }
}

export const browseContent = async (filters = {}) => {
  const {
    category,  // Filter by category ID or name
    page = 1,  // Pagination page
    limit = 10, // Results per page
    desc = true, // Sort by latest first
    search = '', // Search in title/description
  } = filters;

  // Base query (non-deleted)
  const query = {
    deletedAt: null 
  };

  // Add category filter (if provided)
  if (category) {
    query['category.name'] = category
  }

  // Add search (case-insensitive regex for title/description)
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  // Build the query
  const contentQuery = Content.find(query)
  .select('_id title description image tags createdAt updatedAt')
  .populate('tags', 'name')
  .populate('category', 'name')
  .sort({ createdAt: desc ? -1 : 1 }) // -1 = newest first
  .skip((page - 1) * limit) // Pagination offset
  .limit(limit); // Results per page

  // Execute query
  const content = await contentQuery.exec();
  if (!content.length) throw new Error('No content found');

  // Optional: Get total count for pagination metadata
  const total = await Content.countDocuments(query);

  return {
    content,
    pagination: {
      page,
      limit,
      total,
      hasNextPage: total > page * limit,
    },
  };
}