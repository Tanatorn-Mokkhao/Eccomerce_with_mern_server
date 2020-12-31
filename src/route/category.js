const express = require("express");
const router = express.Router();
const { addCategory, getCategory } = require("../controller/category");
const { requireSignin, adminMoiddleware } = require("../common-middleware");

const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+ '-'+file.originalname)
    }
})
const upload = multer({ storage });




router.post('/create/category', requireSignin, adminMoiddleware,upload.single('categoryImage'), addCategory);
router.get('/get/category',getCategory)






module.exports = router;