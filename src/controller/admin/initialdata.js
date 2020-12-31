const Category = require('../../model/category');
const Product = require('../../model/product');


exports.initialData = async (req, res) => { 
    const categories = await Category.find({}).exec();
    const product = await Product.find({}).select('_id name price quantity slug description productPictures category').populate({path:'category',select:'_id name'}).exec();

    res.status(200).json({
        category:createCategory(categories)
        , product
    });

}

const createCategory = (category, parentId = null) => { 

    const categoryList = [];
    let categories;
    if (parentId == null) {
        categories = category.filter(cat => cat.parentId == undefined);
    } else { 
        categories = category.filter(cat => cat.parentId == parentId);
    }
    for (let cate of categories) { 
        categoryList.push({
            _id: cate.id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            children:createCategory(category,cate._id)
        });
    }

    return categoryList;
}