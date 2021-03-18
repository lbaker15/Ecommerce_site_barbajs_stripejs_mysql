const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');

const addOrder = async (req, res, next) => {
    if (req.user) {
    console.log(req.session, req.session.email)
    let fetchedCart;
    //Will need to map cart not product
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts()
    })
    .then(products => {
    //Add order to user
    req.user.createOrder()
    .then(async (order) => {
        //Add order to products via creating orderItem
        order.addProducts(products.map(product => {
            //the prodId from product and quantity are added
            product.orderitem = {quantity: product.cartitem.quantity}
            return product
        }))
        .then(result => {
            if (result) {
                res.json({"Order": result})
                return fetchedCart.setProducts(null);
            }
        })
     })
    })
    } else {
        //Set status here
        res.json({"Error": "You are not logged in."})
    }
}

const getOrder = async (req, res, next) => {
    if (req.user) {
        req.user
        .getOrders({include: ['products']})
        .then(orders => {
            console.log(orders)
            res.json({"Your orders": orders})
        })
    } else {
        //Set status here
        res.json({"Error": "You are not logged in."})
    }
}

exports.addOrder = addOrder;
exports.getOrder = getOrder;