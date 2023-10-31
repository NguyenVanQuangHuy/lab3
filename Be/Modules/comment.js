import mongoose, { Schema, ObjectId } from "mongoose";

const comment = mongoose.model('comments', new Schema ({

    title: {
        type: String,
    },
    body: {
        type: String,
        require: true,
    },
    userId: {type:Schema.Types.ObjectId, ref: 'users'}
},{ timestamps: true }
))
export default comment;