const { ObjectId } = require('mongodb')
const mongoose  = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:ObjectId,
        required:true
    },
    items:{
        type:Array,
        required:true
    },

})

const Cart = mongoose.model('cart',cartSchema)

module.exports = Cart