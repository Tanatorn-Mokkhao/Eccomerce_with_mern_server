
const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => { 
    if (req.headers.authorization) { 
        const token = req.headers.authorization.split(" ")[1]; //split เอาส่วน token
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    else res.status(400).json({ message: "authorization requried" });
}


exports.adminMoiddleware = (req, res, next) => { 
    if (req.user.role !== 'admin') { 
        return res.status(400).josn({ message: "Admin Access denied" });
    }
    next();
}


exports.userMiddlerware = (req,res, next)=> { 
    if (req.user.role !== 'user') { 
        return res.status(400).json({message:'User Access denied'})
    }
    next();
}