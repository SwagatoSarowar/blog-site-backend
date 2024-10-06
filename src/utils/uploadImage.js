const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const AppError = require("./appError");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (buffer) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "blog_site",
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(new AppError("Image upload failed.", 500));
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
};

module.exports = uploadImage;
