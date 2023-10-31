import express from 'express'
import productController from '../Controller/productController.js';
const productRouter = express.Router();
productRouter.post('/', productController.createProductController);
productRouter.get('/', productController.getProductController);
productRouter.post('/addcomment', productController.addCommentProductController);
export default productRouter