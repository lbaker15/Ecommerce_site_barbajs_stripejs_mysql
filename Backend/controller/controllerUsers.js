const User = require('../models/user');
const sequelize = require('../util/database');
const Product = require('../models/product');
const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const Cart = require('../models/cart');
const CartItem = require('../models/cart-item');

const login = (req, res, next) => {
    const {email} = req.body;
    console.log(email)
    User.findOne({where: {email: email}})
    .then(result => {
        if(result) {
            //compare password
            req.session.isLoggedIn = true;
            req.session.user = result;
            req.session.save()
            //console.log(res)
            res.json({[req.sessionID]: req.session})
        } else {
            res.json({'Error': 'No user exists for this email'})
        }
    })
}


const logout = (req, res, next) => {
    let cook = JSON.parse(req.headers.authorization)
    let sessionId = Object.keys(cook)[0]
    sequelize.query(`SELECT * FROM sessions WHERE session_id = "${sessionId}"`)
    .then(q => {
        if (q[0].length !== 0) {
            sequelize.query(`DELETE FROM sessions WHERE session_id = "${sessionId}"`)
        } else {
            res.json({'Error': 'You are already logged out.'})
        }
    })
    .then(() => res.json({'Success': 'You are logged out.'}))
}

exports.login = login;
exports.logout = logout;
// exports.getLoginSession = getLoginSession;