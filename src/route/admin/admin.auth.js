const express = require('express');
const { signup,signin, signout } = require('../../controller/admin/admin.auth');
const { adminMoiddleware, requireSignin} = require('../../common-middleware');
const router = express.Router();
const {isRequestValidated, validationSignupRequest,validationSigninRequest } = require('../../validators/auth');

router.post('/admin/signup',validationSignupRequest,isRequestValidated,signup);
router.post('/admin/signin',validationSigninRequest,isRequestValidated,signin);
router.post('/admin/signout', requireSignin, signout);


module.exports = router;
