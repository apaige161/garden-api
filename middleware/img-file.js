
const multer = require("multer");

const mimeTypeMap = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

//specify where to put img files
const storage = multer.diskStorage({
    //will fire when trying to save a file
    destination: (req, file, callback) => {
        //will return null if the file type is not part of the map
        const isValid = mimeTypeMap[file.mimetype];
        let error = new Error("Invalid mime type");

        //set error to none if everything is ok
        if(isValid) {
            error = null;
        }

        //write to this folder relative to server.js file
        callback(error, "backend/images");
    },
    filename: (req, file, callback) => {
        //get name of file
        //replace spaces with dashes
        const name = file.originalname.toLowerCase().split(' ').join('-');
        //get extention
        const extention = mimeTypeMap[file.mimetype];

        //construct unique file name
        callback(null, name + '-' + Date.now() + '.' + extention);
    }
});

//this is what this file will return
module.exports = multer({storage: storage}).single("image")