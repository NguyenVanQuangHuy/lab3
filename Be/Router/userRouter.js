import express from 'express'
import userController from'../Controller/userController.js'
const userRouter = express.Router();

userRouter.post('/create', userController.createUser_controller);
userRouter.post('/login',userController.login_controller);
userRouter.post('/getuser', userController.getUser_controller);
export default userRouter