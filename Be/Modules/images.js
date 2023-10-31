import mongoose, { Schema, ObjectId } from "mongoose";

const image = mongoose.model('images', new Schema ({

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
))
export default image;