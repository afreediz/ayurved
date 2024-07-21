const cloudinary = require('cloudinary')

const { CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

cloudinary.config({
    cloud_name: CLOUDINARY_HOST,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const uploadImage = async(image) => {
    try{
        const result = await cloudinary.uploader.upload(image, { folder: 'images' });
        return result
    }catch(error){
        console.error('Error uploading image:', error);
    }
}
const deleteImage = async(image_url) => {
    try {
        console.log(image_url);
        const publicId = image_url.split('/').pop().split('.')[0];
        console.log(publicId);
        const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
        return result;
      } catch (error) {
        console.error('Error deleting image:', error);
      }
}

module.exports = {uploadImage, deleteImage}