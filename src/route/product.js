const express = require('express');
const { requireSignin, adminMoiddleware } = require('../common-middleware');

const router = express.Router();
const multer = require('multer');

const shortid = require('shortid');
const path = require('path');
const { createProduct, getProductsByslug } = require('../controller/product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+ '-'+file.originalname)
    }
})
const upload = multer({ storage });

router.post('/product/create', requireSignin, adminMoiddleware,upload.array('productPictures'),createProduct);
router.get('/products/:slug',getProductsByslug)



module.exports = router;
