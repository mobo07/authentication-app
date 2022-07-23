const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets/images")
    },

    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}`)
    }
});

const multerFilter = (req, file, cb) => {
    if(file.mimetype.split("/")[1] === "jpeg" || file.mimetype.split("/")[1] === "jpg" || file.mimetype.split("/")[1] === "png"){
        cb(null, true);
    } else {
        cb(new Error("Invalid file format"), false);
    }
 }

const upload = multer({
     storage: multerStorage,
     fileFilter: multerFilter,
     limits: {fileSize: 1 * 1024 * 1024 }
 }).single("profilePhoto");

 module.exports = upload;