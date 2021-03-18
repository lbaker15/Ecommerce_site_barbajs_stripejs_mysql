const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const User = require('./models/user');
const Product = require('./models/product');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const routes = require('./routes/routes');
const controllerUser = require('./controller/controllerUsers');
const sessionEditMiddleware = require('./middleware/sessionEdit')
const createSession = require('./middleware/createSess')

const app = express();
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('session_secret'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
})


const session = require('express-session');
const stripe = require('stripe')('sk_test_51INIbUITCpkMMLVMjPvy2e2xaCQXxSFSKdS6vrU7kI6jNWQxpaEWXRFdiKMoIil7v6FtxdKYxwzsLzlqv43hyDgR00HWF7jvrT');
const success = async (req, res, next) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);
  
  if (session.id && customer) {
    //MAKE ORDER
    let {user} = req.query;
    let fetchedCart;
    User.findByPk(user)
    .then(user => {
      user.getCart()
      .then(cart => {
        fetchedCart = cart;
        return cart.getProducts()
      })
      .then(products => {
        //Add order to user
        user.createOrder()
        .then(async (order) => {
            //Add order to products via creating orderItem
            order.addProducts(products.map(product => {
                //the prodId from product and quantity are added
                product.orderitem = {quantity: product.cartitem.quantity}
                return product
            }))
            .then(async result => {
                if (result) {
                    fetchedCart.setProducts(null);
                    
                    return res.render('success', {orderId: order.id, pageTitle: 'Success'})
                }
            })
         })
        })
    })
  }
  
}
const fail = (req, res, next) => {

}
app.get('/checkoutSuccess', success)
app.get('/checkoutFail', fail)



app.use(sessionEditMiddleware)
app.use(routes);

//So only creates session when trying to login
app.use(createSession)
app.post('/login', controllerUser.login)

// Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// User.hasMany(Product);
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Cart.belongsTo(User);
User.hasOne(Cart);
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });


sequelize
  .sync()
  .then(result => {
      if (result) {
        app.listen(PORT)
      }
  })
  .catch(err => console.log(err))