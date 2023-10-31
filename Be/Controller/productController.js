import productRepository from "../Repository/productRepository.js";
async function createProductController(req,res){
    try {
        // console.log(req.body);
        const { name, description, price,discountPercentage, stock, brand, thumbnail, images, comment } = req.body;
        // console.log(comment);
        const product = await productRepository.createProduct({name, description, price, discountPercentage, stock, brand, thumbnail, images, comment})
        res.status(200).json({
            message: 'okok',
            data: product
        })
    } catch (error) {
        res.status(500).json({ message: error.toString() })
    }

}

async function getProductController(req,res){
    try {
        const product = await productRepository.getProduct()
        res.status(200).json({
            message: 'okok',
            data: product
        })
    } catch (error) {
        res.status(501).json({ message: error.toString() })
    }
}

async function addCommentProductController(req,res){
    try {
        const {comment,productId} = req.body
        const product = await productRepository.updateProduct_comment({comment,productId} );
        res.status(200).json({
            message: 'okok',
            data: product
        })
    } catch (error) {
        res.status(501).json({ message: error.toString() })
    }
}
export default {createProductController, getProductController,addCommentProductController}