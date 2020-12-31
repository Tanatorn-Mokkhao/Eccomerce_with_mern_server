const { initialData } = require("../../controller/admin/initialdata");

const express = require('express');
const router = express.Router();



router.post('/initialdata',initialData);









module.exports = router;