// require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require("path");

module.exports.upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024 * 4
    }
})

module.exports.S3Upload = (folder, file) => {
    let key = `${folder}/${uuid()}.${file.originalname.split('.').pop()}`
    return new Promise((resolve, reject) => {
        S3.upload({ Bucket: process.env.AWS_S3_BUCKET, Key: key, Body: file.buffer })
            .promise()
            .then(_data => {
                resolve(key);
            }).catch(err => {
                reject(err);
            })
    });
}
module.exports.IMG_DIR_CONSTS = {
    TEST: "test",
}