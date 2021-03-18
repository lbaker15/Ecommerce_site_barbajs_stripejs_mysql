const express = require('express');
const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');
const routes = require('../routes/routes');
const session = require('express-session');
const stripe = require('stripe')('sk_test_51INIbUITCpkMMLVMjPvy2e2xaCQXxSFSKdS6vrU7kI6jNWQxpaEWXRFdiKMoIil7v6FtxdKYxwzsLzlqv43hyDgR00HWF7jvrT');

const addToCart = async (req, res, next) => {
    console.log(req.body)
    if (req.user) {
    const {prodId, quan} = req.body;
    let fetchedCart;
    let newQuantity = (quan) ? quan : 1;
    req.user
        .getCart()
        .then(cart => {
            //console.log(cart)
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            //console.log(products)
            let prod;
            //If product already exists in the cart
            if (products.length > 0) {
                prod = products[0]
            }
            //Increase quantity
            if (prod) {
                newQ = newQuantity;
                const oldQuantity = prod.cartitem.quantity;
                newQuantity = oldQuantity + newQ;
                return prod;
            }
            return Product.findByPk(prodId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
              through: { quantity: newQuantity }
            });
        })
        .then(result => {
            if(result) {
                res.json({"Added product": result})
            }
        })
        .catch(err => console.log(err))
    } else {
        //Set status here
        res.json({"Error": "You are not logged in."})
    }
}
const getCart = (req, res, next) => {
    if (req.user) {
      req.user
        .getCart()
        .then(cart => {
            return cart
            .getProducts()
            .then(prods => {
                res.status(200).json({'Cart products': prods})
            })
        })
    } else {
        //Set status here
        res.status(403).json({"Error": "You are not logged in."})
    }
}

const makePayment = (req, res, next) => {
    const {products} = req.body;
    const user = req.user;
    console.log(user.dataValues.id)
    return stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: products.map(x => {
        return {
            name: x.title,
            description: x.description,
            amount: Number(x.price) * 100,
            quantity: x.quantity,
            currency: 'usd'
            }
        }),
        mode: 'payment',
        success_url: `http://localhost:8000/checkoutSuccess?session_id={CHECKOUT_SESSION_ID}&user=${user.dataValues.id}`,
        cancel_url: 'http://localhost:8000/checkoutFail'
    })
    .then(session => {
        res.json({id: session.id})
    })
}

const getCartTotal = (req, res, next) => {
    if (req.user) {
        req.user
          .getCart()
          .then(cart => {
              return cart
              .getProducts()
              .then(prods => {
                let totalPrice = 0;
                let products = new Array;
                Promise.all(prods.map(x => {
                      //ADD ID AND SOME INFO ABOUT PRODUCT
                      let price = x.dataValues.price
                      let quantity = x.dataValues.cartitem.dataValues.quantity
                      let title = x.dataValues.title; let description = x.dataValues.description;
                      let obj = {price, quantity, title, description}
                      products.push(obj)
                      console.log(x.dataValues.title) //COULD ONLY APPLY FOLLOWING CODE IF TITLE IS NOT SHIPPING
                      let totalItem = Number(price) * Number(quantity)
                      totalPrice += totalItem;
                  })
                )
                .then(() => {
                    let object = {products, totalPrice}
                    res.json({'Cart Products': object})
                })
            })
        })
      } else {
          //Set status here
          res.status(403).json({"Error": "You are not logged in."})
      }
}

const deleteCartItem = (req, res, next) => {
    console.log(req.body)
    if (req.user) {
    const {prodId} = req.body;
      req.user
        .getCart()
        .then(cart => {
        return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
        const product = products[0];
        console.log(product)
        return product.cartitem.destroy();
        })
        .then(result => {
            if (result) {
                return res.json({"Deleted product": result})
            }
        })
        .catch(err => console.log(err))
    } else {
        //Set status here
        res.json({"Error": "You are not logged in."})
    }
}

const editCartItem = (req, res, next) => {
    if (req.user) {
    const {prodId, quan} = req.body;
      req.user
        .getCart()
        .then(cart => {
        return cart.getProducts({ where: { id: prodId } });
        })
        .then(async product => {
            let theProd = product[0].cartitem
            theProd.quantity = quan;
            return await theProd.save()            
        })
        .then(result => {
            if (result) {
                console.log(result)
                res.json({"Edited product": result}) 
            }
        })
        .catch(err => console.log(err))
    } else {
        //Set status here
        res.json({"Error": "You are not logged in."})
    }
}

exports.addToCart = addToCart;
exports.getCart = getCart;
exports.deleteCartItem = deleteCartItem;
exports.editCartItem = editCartItem;
exports.getCartTotal = getCartTotal;
exports.makePayment = makePayment;