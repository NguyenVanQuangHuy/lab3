import mongoose, { Schema, ObjectId } from "mongoose";

const user = mongoose.model('users', new Schema ({
    name: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
}
))
export default user;