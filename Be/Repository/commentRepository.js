import comment from "../Modules/comment.js"
async function createComment({title,body,userId}){
    console.log(title,body,userId);
  try {
    const data = await comment.create({title,body,userId})
    return data;
  } catch (error) {
    console.log(error.toString());
  }
}

export default {createComment}