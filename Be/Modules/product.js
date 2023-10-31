import mongoose, { Schema, ObjectId } from "mongoose";

const imageShema =  new Schema ({

    url: {
        type: String,
        require: true,
    },
    caption: {
        type: String,
        require: true,
    },
    path: {
        type: String,
        require: true,
    }
},{ timestamps: true }
)
const images = mongoose.model('images', imageShema)
const product = mongoose.model('products', new Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
    },
    stock: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    image: [imageShema],
    comments:
        [
            { type: Schema.Types.ObjectId, ref: 'comments' }
        ]

}, { timestamps: true }
))
export default {product,images};