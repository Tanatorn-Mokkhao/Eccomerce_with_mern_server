const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    categoryImage: {
        type: String
    },
    parentId: {
        type: String
    }
}, { timestamps: true });



module.exports = mongoose.model('categoeyTest2', categorySchema);