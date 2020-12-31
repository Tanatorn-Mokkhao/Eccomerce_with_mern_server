const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./src/route/user.auth');
const adminRoute = require('./src/route/admin/admin.auth');
const categoryRoute = require('./src/route/category');
const productRoute = require('./src/route/product');
const initialDataRoute = require('./src/route/admin/initialData');
const cors = require('cors');
    
env.config();

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.3xwdm.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }
).then(()=> { 
    console.log('Database connected')
});

app.use(express.json());
app.use(cors());
app.use('/public',express.static(__dirname +'/src/uploads')); //static rout path to dir imgae for show on google
app.use('/api', userRoute);
app.use('/api', adminRoute);
app.use('/api', categoryRoute);
app.use('/api', productRoute);
app.use('/api', initialDataRoute);
app.listen(process.env.PORT, () => {
    console.log('server is running on port', process.env.PORT);
});