const express = require('express');
const { signin, signup } = require('../controller/user.auth');
const {isRequestValidated, validationSignupRequest,validationSigninRequest } = require('../validators/auth');
const router = express.Router();



router.post('/user/signup',validationSignupRequest,isRequestValidated,signup);
router.post('/user/signin',validationSigninRequest,isRequestValidated,signin);


module.exports = router;
