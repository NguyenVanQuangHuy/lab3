import productModule from "../Modules/product.js";

async function createImage({ url,caption,path}){
  try {
    const data = await productModule.images.create({url,caption,path})
    return data
  } catch (error) {
    console.log(error.toString());
  }
}

export default {createImage}