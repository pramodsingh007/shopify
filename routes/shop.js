const express = require('express')
// const { getAllProduct, getItem, getCartItems, postItemToCart, deleteCartItem, orderProduct, getOrders } = require('../controllers/shop')

const { getAllProduct, getItem, postItemToCart, getCartItems, deleteCartItem, orderProduct, getOrders } = require("../controllers/shop");
const auth = require('../middleware/is-auth');

const shopRouter = express.Router()


shopRouter.get('/',getAllProduct)
shopRouter.get('/user/:id',getItem)
shopRouter.get('/cart',auth,getCartItems)
shopRouter.post('/cart',auth,postItemToCart)
shopRouter.post('/cart/delete',auth,deleteCartItem)
shopRouter.post('/order',auth,orderProduct)
shopRouter.get('/order',auth,getOrders)

module.exports = shopRouter