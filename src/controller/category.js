const Category = require('../model/category');
const slugify = require('slugify');



exports.addCategory = (req,res) => { 
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if (req.file) { 
        categoryObj.categoryImage = process.env.API +'/public/'+ req.file.filename;
    }
    if (req.body.parentId) { 
        categoryObj.parentId = req.body.parentId
    }
    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error });
        if (category) {
            return res.status(201).json({ category });
        }
    });
}

const createCategory = (category,parentId=null) => { 
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
            parentId:cate.parentId,
            children:createCategory(category,cate._id)
        });
    }

    return categoryList;

}


exports.getCategory = (req,res)=> { 
    Category.find({}).exec((error, category) => { 
        if (error) return res.status(400).json({ error });
        if (category) { 

            const categoryList = createCategory(category);
            // testget(categoryList);
            return res.status(200).json({ categoryList });
        }
    })
}



// const testget = (category, get = [])=>{ 
//     for (let cat of category) { 
//         get.push({ _id: cat._id, name: cat.name })
        
//         if (cat.children.length > 0) { 
//             testget(cat.children,get)
//         }
//     }

//     console.log(get)
// }