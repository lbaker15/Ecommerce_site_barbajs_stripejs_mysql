const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const controllerOrder = require('../controller/controllerOrder');
const controllerProds = require('../controller/controllerProds');
const controllerUser = require('../controller/controllerUsers')


router.post('/purchased', controllerOrder.addOrder)
router.get('/get-order', controllerOrder.getOrder)
router.get('/get-cart', controller.getCart)
router.get('/get-cart-total', controller.getCartTotal)
router.post('/delete-cart-item', controller.deleteCartItem)
router.post('/add-to-cart', controller.addToCart)
router.patch('/edit-cart-item', controller.editCartItem)
router.get('/get-products', controllerProds.getProducts)
router.post('/logout', controllerUser.logout)
router.post('/make-payment', controller.makePayment)


module.exports = router;