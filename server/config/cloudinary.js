const cloudinary = require('cloudinary').v2;//Cloudinary is being required
exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            //cloudinary to connect media
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    }
    catch(error){
        console.log(error);
    }
}