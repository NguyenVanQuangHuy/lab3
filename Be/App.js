import * as dotenv from 'dotenv';
import connectDB from './Database/db.js';
import express from 'express';
import cors from 'cors';
import userRouter from './Router/userRouter.js'
import productRouter from './Router/productRouter.js';
import cartRouter from './Router/cartRouter.js';
import cookieParser from 'cookie-parser'
const app = express();
app.use(cors({ origin: true, credentials: true}));
app.use(express.json())
app.use(cookieParser())
dotenv.config()
const port = process.env.PORT||3002;
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use('/user',userRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.listen(port, async() => {
  await connectDB()
  console.log(`Server is listening on port ${port}`);
});