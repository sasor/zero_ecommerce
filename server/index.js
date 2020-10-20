'use strict';

const Express = require('express');
const { join } = require('path');
const { connect, connection, model, Schema } = require('mongoose');
const DATA = require('./data.json');
const App = Express();

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB = process.env.MONGO_DB;

const ProductSchema = new Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    availableSizes: [String]

})

const OrderSchema = new Schema({

    title: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    total: {
        type: Number
    },
    cartItems: [{
        title: {
            type: String
        },
        price: {
            type: Number
        },
        count: {
            type: Number
        }
    }]

}, { timestamps: true });

const Product = model('products', ProductSchema);
const Order = model('orders', OrderSchema);

// Middleware Orders .post
const validateOrder = (req, res, next) => {
    const { body } = req;
    if (!body.name
        || !body.email
        || !body.address
        || !body.total
        || !body.cartItems) {
        throw new Error("Some fields are required");
    }
    next();
}

App.set('port', process.env.PORT || 9000);
App.use(Express.json());
// App.use(Express.urlencoded({ extended: true }))
App.use('/', Express.static(join(__dirname, 'build')));

App.get('/api/products', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.json({
            success: true,
            payload: {
                products
            }
        })
    } catch (error) {
        next(error);
    }
});
App.post('/api/products', async (req, res, next) => {
    const product = new Product(req.body);
    try {
        const saved = await product.save();
        res.json({
            success: true,
            payload: {
                product: saved
            }
        });
    } catch (error) {
        next(error);
    }
});

App.delete('/api/products/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const deleted = await Product.findByIdAndDelete(id);
        res.json({
            success: true,
            payload: {
                product: deleted
            }
        });
    } catch (error) {
        next(error);
    }

});

// Order routes
App.get('/api/orders', (req, res, next) => { });
App.post('/api/orders', validateOrder, async (req, res, next) => {
    try {
        const order = new Order(req.body);
        const saved = await order.save();
        res.json({
            success: true,
            payload: saved
        });
    } catch (error) {
        next(error);
    }
});
App.delete('/api/orders/:id', (req, res, next) => { });

App.use((err, req, res, next) => {
    res.status = (res.status || 500);
    res.json({
        success: false,
        payload: {
            message: err.message
        }
    });
});

App.get('/api/seeder', async (req, res, next) => {
    const { products } = DATA;
    products.forEach((product, index) => {
        delete product._id;
    });
    // TIP:https://masteringjs.io/tutorials/mongoose/create
    try {
        const docs = await Product.create(products);
        res.json({
            success: true,
            payload: docs
        });
    } catch (error) {
        next(error);
    }

});

App.get('/api/seeder/clear', async (req, res, next) => {
    // DO: this remove all docs in products collection
    try {
        const deleted = await Product.deleteMany({});
        res.json({
            success: true,
            payload: deleted
        });
    } catch (error) {
        next(error);
    }
});

connect(MONGO_URI, {
    dbName: MONGO_DB,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(_ => {
        console.log(`connected`);
        App.listen(App.get('port'), _ => console.log(`Running in on port ${App.get('port')}`));
    })
    .catch(e => console.log(e.message))

connection.on('connected', _ => console.log('Mongoose connected to db'));
connection.on('error', err => console.log(err.message));
connection.on(
    'disconnected',
    _ => console.log('Mongoose connection is disconnected')
);
process.on('SIGINT', async _ => {
    await connection.close();
    process.exit(0);
});
