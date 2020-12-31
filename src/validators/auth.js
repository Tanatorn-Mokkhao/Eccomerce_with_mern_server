const { check,validationResult } = require('express-validator');
exports.validationSignupRequest = [
    check('firstName').notEmpty().withMessage('firstNmae is required'),
    check('lastName').notEmpty().withMessage('lastNmae is required'),
    check('email').isEmail().withMessage('valid Email is required'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
];


exports.isRequestValidated = (req, res, next) => { 
    const errors = validationResult(req);
    if (errors.array().length > 0) { 
     return res.status(400).json({ errors: errors.array()[0].msg });
    }
    next();
}

exports.validationSigninRequest = [
    check('email').isEmail().withMessage('valid Email is required'),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 character long')
];