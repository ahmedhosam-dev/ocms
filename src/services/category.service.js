import Category from '../models/category.model.js'

/**
 * DONE Create
 * DONE Show
 * DONE Get
 * DONE Update
 * DONE Delete
 */


export const createCategory = async (auth, categoryData) => {
    const createdCategory = await Category.create({
        ...categoryData,
        createdBy: auth._id,
    })

    return createdCategory
} 

export const showCategory =  async (categoryId) => {
    const categoryInfo = await Category.findById(categoryId)
        .where({ deletedAt: null })
    
    if (!categoryInfo) throw new Error("Category not found")

    return categoryInfo
}

export const getCategorys = async () => {
    const all = await Category.find({ deletedAt: null })

    return all
}

export const updateCategory = async (auth, categoryId, categoryData) => {
    const updatedCategory = await Category.findOneAndUpdate({ _id: categoryId, deletedAt: null }, {
        ...categoryData,
        updatedBy: auth._id,
    }, { new: true })

    if (!updatedCategory) throw new Error("Category not found")
    
    return updatedCategory
}

export const deleteCategory = async (auth, categoryId) => {
    const deletedCategory = await Category.findOneAndUpdate({ _id: categoryId, deletedAt: null }, {
        updatedBy: auth._id,
        deletedAt: Date.now(),
    })

    if (!deletedCategory) throw new Error("Category not found")
    
    return
}
