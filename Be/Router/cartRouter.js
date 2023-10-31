import express from 'express'
import cartController from '../Controller/cartController.js';
const cartRouter = express.Router();
cartRouter.post('/add', cartController.addToCart_Controller);
cartRouter.get('/:id',cartController.getCart_Controller);
export default cartRouter