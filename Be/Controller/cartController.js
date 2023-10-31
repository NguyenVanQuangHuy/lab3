
import product from "../Modules/product.js";
import cartReposity from "../Repository/cartReposity.js";

async function addToCart_Controller (req,res){
    const {name,quantitys,productId,userId} = req.body;
    try {
        const cart = await cartReposity.addToCart({name,quantitys,productId,userId});
        res.status(200).json({
            message: 'okok',
            data: cart
        })
    } catch (error) {
        res.status(500).json({ message: error.toString() })
    }
}
async function getCart_Controller (req,res){
    const userId = req.params.id;
    try {
        const cart = await cartReposity.getCart({userId});
        res.status(201).json({
            message: 'okok',
            data: cart
        })
    } catch (error) {
        res.status(501).json({ message: error.toString() })
    }
}
export default {addToCart_Controller, getCart_Controller}