  // const george = await User.findByPk(124)
    // const gItemId = Object.values(george)[0].id
    // const order = await Order.create({id: 992, userId: gItemId})
   
    // try {
    // //Add order to product
    // const product = await Product.findOne({where: {title: 'Lipstick'}})
    // order.orderItem = {quantity: 1}
    // await product.addOrder(order, {through: OrderItem})
    // const result = await Product.findOne({
    //     where: {title: 'Lipstick'},
    //     include: OrderItem
    // })
    // console.log('result', result)
    // } catch(err) {console.log('Error', err)}


    // app.get('/test', (req, res, next) => {
    //   if (req.user) {
    //     res.json({'Testing': 'Tester'})
    //   } else {
    //     res.json({'Error': 'You are not logged in.'})
    //   }
    // })