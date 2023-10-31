import productModule from "../Modules/product.js";
import imageRepository from "./imageRepository.js";
import commentRepository from "./commentRepository.js";
async function createProduct({ name, description, price, discountPercentage, stock, brand, thumbnail, images, comment }) {
    try {
        const arrayImage = images;
        const arrayComment = comment;
        const imagesProduct = [];
        const commentsProduct = [];
        console.log(arrayImage);
        // kiem tra image co anh hay không
        if (arrayImage && arrayImage.length != 0) {
            // kiem tra image la 1 anh hay nhieu anh tr ve data và push vao image
            if (arrayImage.length >= 2) {
                for (let i = 0; i < arrayImage.length; i++) {
                    const url = arrayImage[i].url;
                    const caption = arrayImage[i].caption;
                    const path = arrayImage[i].path
                    const data = await imageRepository.createImage({ url, caption, path });
                    imagesProduct.push(data);
                }
            }
            else {
                const url = arrayImage[0].url;
                const caption = arrayImage[0].caption;
                const path = arrayImage[0].path
                const data = await imageRepository.createImage({ url, caption, path });
                imagesProduct.push(data);
            }
        }
        // kiem tra comment co hay khong
        if (arrayComment && arrayComment.length != 0) {
            // kiem tra comment co nhieu hon 1 comment hay khong
            if (arrayComment.length > 2) {
                for (let i = 0; i <= arrayComment.length; i++) {
                    const title = arrayComment[i].title;
                    const body = arrayComment[i].body;
                    const userId = arrayComment[i].userId;
                    const data = await commentRepository.createComment({ title, body, userId });
                    commentsProduct.push(data._id);
                }
            }
            else {
                const title = arrayComment[0].title;
                const body = arrayComment[0].body;
                const userId = arrayComment[0].userId;
                const data = await commentRepository.createComment({ title, body, userId });
                const commentId = data._id;
                const cleanedIdString = commentId.toString().replace('new ', '');
                commentsProduct.push(cleanedIdString);
            }
        }
        const data = await productModule.product.create({ name, description, price, discountPercentage, stock, brand, thumbnail, image: imagesProduct, comments: commentsProduct })
        return data;
    } catch (error) {
        console.log(error.toString())
    }
}

async function getProduct() {
  try {
    const data = await productModule.product.find().populate('comments');
    return data
  } catch (error) {
    console.log(error.toString())
  }
}

async function updateProduct_comment({comment,productId}) {
    try{
        const arrayComment = comment;
        console.log(arrayComment);
        const commentsProduct = [];
        if (arrayComment.length != 0) {
            // kiem tra comment co nhieu hon 1 comment hay khong
            if (arrayComment.length > 2) {
                for (let i = 0; i <= arrayComment.length; i++) {
                    const title = arrayComment[i].title;
                    const body = arrayComment[i].body;
                    const userId = arrayComment[i].userId;
                    const data = await commentRepository.createComment({ title, body, userId });
                    commentsProduct.push(data._id);
                }
            }
            else {
                const title = arrayComment[0].title;
                const body = arrayComment[0].body;
                const userId = arrayComment[0].userId;
                const data = await commentRepository.createComment({ title, body, userId });
                const commentId = data._id;
                const cleanedIdString = commentId.toString().replace('new ', '');
                commentsProduct.push(cleanedIdString);
            }
        }
        const data = await productModule.product.findOneAndUpdate(
            { _id: productId },
            { $push: { comments: commentsProduct } },
            { new: true }
          );

        return data;
    }
    catch (error) {
        console.log(error.toString())
      }
}
async function getProductbyid({id}) {
    try {
      const data = await productModule.product.findOne({id: id});
      return data
    } catch (error) {
      console.log(error.toString())
    }
  }
export default { createProduct, getProduct, updateProduct_comment,getProductbyid}