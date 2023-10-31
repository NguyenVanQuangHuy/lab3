import user from "../Modules/user.js";
async function createUser({name, email, password}) {
    try {
        console.log(name);
        const data = await user.create({ name, email, password });
       return data
    } catch (error) {
        console.log(error.toString());
    }
}

async function getUser({email}){
    try {
        const data = await user.findOne({email:email});
        return data;
    } catch (error) {
        console.log(error.toString());
    }
}
async function checkUser({email,password}){
    try {
        const data = await user.find({email: email, password: password});
        return data
    } catch (error) {
        console.log(error.toString());
    }
}

export default {createUser,getUser,checkUser}