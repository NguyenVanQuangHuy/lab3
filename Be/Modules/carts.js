import mongoose, { Schema, ObjectId } from "mongoose";

const cart = mongoose.model('carts', new Schema ({

    name: {
        type: String,
        require: true,
    },
    discountTotal: {
        type: Number,
    },
    totalProduct: {
        type: Number,
    },
    totalQuantity: {
        type: Number,
    },
    totalPrice: {
        type: Number,
    },
    product: [
        {
            _id: {type:Schema.Types.ObjectId, ref: 'products'},

            quantity: {
                type: Number
            },
            total : {
                type: Number
            }
        }
    ],
    user: {
        _id: {type:Schema.Types.ObjectId, ref: 'users'},
    }
}
))

export default cart;