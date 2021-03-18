const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');

const getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        if (products) {
            res.json({'All Products': products})
        }
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getProducts = getProducts;