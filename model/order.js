const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId:{
        type:ObjectId,
        required:true
    },
    items:{
        type:Array,
        require:true
    }
})

const Order = mongoose.model('Orders',orderSchema)

module.exports = Order



