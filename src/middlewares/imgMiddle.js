const multer = require('multer')

// Controller upload image.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image/');
    },
    filename: function(req, file, cb) {
        cb(
            null, 
            `${
                file.fieldname
            }-${
                new Date().toLocaleDateString().split("/")
            }_${
                file.originalname
            }`
        );
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

module.exports = upload