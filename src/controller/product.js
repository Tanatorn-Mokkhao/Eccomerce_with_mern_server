const Product = require('../model/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../model/category');
const category = require('../model/category');

exports.createProduct = (req, res) => {
    // res.status(200).json({ file: req.files, body: req.body });

    const { 
        name,price,description,category,quantity,createBy
    } = req.body
    let productPictures = [];
    if (req.files.length > 0) { 
        productPictures =  req.files.map(file => {
            return {img:file.filename}
        });
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createBy: req.user._id
        
    });
    product.save((error, product) => { 
        if (error) res.status(400).json({ error });
        if (product) { 
            res.status(201).json({ product });
        }
    })
};


exports.getProductsByslug = (req, res) => {
    const { slug } = req.params;
    category.findOne({ slug: slug }).select('_id').exec((error, category) => { 
        if (error) return res.status(400).json({ error });
        if (category) {
            Product.find({ category: category._id }).exec((error, product) => { 
                if (error) return res.status(400).json({ error });
                if (product.length > 0) {
                    res.status(200).json({
                        product,
                        productByPrice: {
                            under5k: product.filter(product => product.price <= 5000),
                            under10k: product.filter(product => product.price > 5000 && product.price <= 10000),
                            under20k: product.filter(product => product.price > 10000 && product.price <= 20000),
                            under30k: product.filter(product => product.price > 20000 && product.price <= 30000),
                            under40k: product.filter(product => product.price > 30000 && product.price <= 40000),
                            under50k: product.filter(product => product.price > 40000 && product.price <= 50000),
                        }
                    
                    });
                } else { 
                    return res.status(400).json({message:"no product add yet"})
                }
          
            })
        }
    })

}