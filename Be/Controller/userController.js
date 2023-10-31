import userRepository from "../Repository/userRepository.js";
import jwt from 'jsonwebtoken'
async function createUser_controller(req,res){
    try {
        const {name ,email ,password}= req.body;
        console.log(name);
        const data = await userRepository.createUser({name,email,password});
        res.status(200).json({
            message: 'okok',
            data: data
        })
    } catch (error) {
        res.status(500).json({ message: error.toString() })
    }
}
async function login_controller(req,res){
    const {password,email} = req.body;
    try {
        const user = await userRepository.checkUser({email,password});
        if(user.length !=0 && password == user[0].password){
            const payload = {user}
            const options = {expiresIn: '1h'}
            const token = jwt.sign(payload,process.env.SECRET_KEY,options)
            // const a = res.cookie("accessToken", token, {
            //     httpOnly: false,
            //     secure: false,
            //     path: "/",
            //     sameSite: "strict",
        
            // });
            res.status(200).json({
                message: 'okok',
                data: user
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.toString() })
    }
}

async function getUser_controller(req,res){
    try {
        const email = req.body.email;
        console.log(email);
            // const accessToken = token.split(" ")[1];
            const data = await userRepository.getUser({email});
            console.log(data, 'huy');
            res.status(200).json({ message: 'okok' , data: data });
          
    } catch (error) {
        res.status(500).json({ message: error.toString() })
    }
}
export default {createUser_controller,login_controller,getUser_controller};