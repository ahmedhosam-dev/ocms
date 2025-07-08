import { Schema, model } from 'mongoose'

const imageSchema = new Schema({
    filename: {
        type: String,
        required: true,
        index: true,
    },
    originalname: String,
    path: {
        type: String,
        required: true,
    },
    size: Number,
    mimitype: String,
}, {
    timestamps: true,
})

const Image = model('Image', imageSchema);
export default Image
