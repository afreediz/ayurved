const cloudinary = require('cloudinary')

const { CLOUDINARY_HOST, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

cloudinary.config({
    cloud_name: CLOUDINARY_HOST,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

// CLOUDINARY
// const uploadImage = async(image) => {
//     try{
//         const result = await cloudinary.uploader.upload(image, { folder: 'images' });
//         return result
//     }catch(error){
//         console.error('Error uploading image:', error);
//     }
// }
// const deleteImage = async(image_url) => {
//     try {
//         const publicId = image_url.split('/').pop().split('.')[0];
//         const result = await cloudinary.uploader.destroy(publicId, { invalidate: true });
//         return result;
//       } catch (error) {
//         console.error('Error deleting image:', error);
//       }
// }

// LOCAL
const fs = require('fs');
const path = require('path');

function uploadImage(base64Image) {
  const matches = base64Image.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches) throw new Error('Invalid base64 image');

  const ext = matches[1].split('/')[1];
  const buffer = Buffer.from(matches[2], 'base64');

  const filename = `img-${Date.now()}.${ext}`;
  const uploadDir = path.join(__dirname, '../uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const filepath = path.join(uploadDir, filename);
  fs.writeFileSync(filepath, buffer);

  return {"url":`/uploads/${filename}`};
}
function deleteImage(imageUrl) {
  try {
    const filePath = path.join(__dirname, '../', imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    } else {
      return false; // file doesn't exist
    }
  } catch (error) {
    console.error('Failed to delete image:', error);
    return false;
  }
}

module.exports = {uploadImage, deleteImage}