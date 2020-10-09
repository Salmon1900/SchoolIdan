const multer = require('multer');
const path = require('path');

// const storage = multer.memoryStorage({
//     destination: process.env.FILE_PATH,
//     filename: (req, file, cb) => {
//         cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
//     }
// });

const memStorage = multer.memoryStorage()

const upload = multer({
    storage: memStorage,
    limits: {fileSize: 100000000}
}).single('myImage');

module.exports = {upload};