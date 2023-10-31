import cart from "../Modules/carts.js";
import productRepository from "./productRepository.js";
async function addToCart({ name, quantitys, productId, userId }) {
    try {
        const product = await productRepository.getProductbyid({ productId });
        const userCart = await cart.find({ "user._id": userId }).populate('product')
        if (userCart.length == 0) {
            const totalQuantity = 1;
            const totalProduct = product.price * quantitys * product.discountPercentage
            const discountTotal = 10 / 100
            const totalPrice = totalQuantity * totalProduct * discountTotal
            const total = product.price * quantitys * product.discountPercentage;
            const newCart = await cart.create({
                name, discountTotal, totalProduct, totalQuantity, totalPrice, product: {
                    _id: productId, quantity: quantitys, total: total
                }, user: { _id: userId }
            })

            return newCart
        }
        else {
            const productsList = userCart[0].product;
            const checkExits = productsList.filter(p => p._id == productId);
            console.log(checkExits.length);
            if (checkExits.length != 0) {
                const quantitynew = checkExits[0].quantity + quantitys;
                const total = product.price * quantitynew * product.discountPercentage;
                const cartId = userCart[0]._id;
               // console.log(checkExits[0].id);
                const data = await cart.findOneAndUpdate(
                    { _id: cartId , "product._id": checkExits[0].id },
                    { $set: { 'product.$.quantity': quantitynew ,'product.$.total': total } },
                    { new: true }
                );
                const cartnew = await cart.findOne({ _id: cartId});
                cartnew.totalQuantity = userCart[0].product.length;
                let totalProductnew = 0;
                 userCart[0].product.map(p => {
                    totalProductnew += p.total;
                })
                cartnew.totalProduct = totalProductnew;
                const discountTotal = 10 / 100
                cartnew.totalPrice = cartnew.totalQuantity * cartnew.totalProduct * discountTotal;
                await cartnew.save();
                return data
            }
                const totalnewproduct = product.price * quantitys * product.discountPercentage;
                const cartId = userCart[0]._id;
                const data = await cart.findOneAndUpdate(
                    { _id: cartId },
                    {           
                      $push: { product: {_id: productId, quantity: quantitys, total: totalnewproduct} }
                    },
                    { new: true }
                  );
                const cartnew = await cart.findOne({ _id: cartId});
                cartnew.totalQuantity = userCart[0].product.length;
                let totalProductnew = 0;
                     userCart[0].product.map(p => {
                        totalProductnew += p.total;
                    })
                cartnew.totalProduct = totalProductnew;
                const discountTotal = 10 / 100
                cartnew.totalPrice = cartnew.totalQuantity * cartnew.totalProduct * discountTotal;
                await cartnew.save();
                return data
            //   console.log(data);
        }
    } catch (error) {
         console.log(error.toString());
    }
}

async function getCart({userId}){
    console.log(userId);
    try {
        const userCart = await cart.find({ "user._id": userId}).populate('product')
        return userCart
    } catch (error) {
        console.log(error.toString());
    }
}

export default { addToCart,getCart}