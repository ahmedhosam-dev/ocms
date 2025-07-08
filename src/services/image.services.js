import Image from '../models/image.model.js'

export const uploadImage = async ({ filename, path, size, mimitype }) => {
  try {
    const newImage = new Image({ filename, path, size, mimitype })
    await newImage.save()

    return {
      message: "Image uploaded successfully",
      image: newImage
    }
  }
  catch (error) { throw new Error(error.message) }
}

export const getImage = async (imageName) => {}

export const deleteImage = async (imageName) => {}

export const updateImage = async (oldImage, newImage) => {}

