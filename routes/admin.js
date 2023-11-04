const express = require('express')
const { postNewProduct, addNewProductForm, getAllAdminProduct, deleteProduct, getItem, editProductForm, updateProduct} = require('../controllers/admin')
const auth = require('../middleware/is-auth')


const adminRouter = express.Router()


adminRouter.get('/',auth,getAllAdminProduct)
adminRouter.post('/add-new-product',auth,postNewProduct)
adminRouter.get('/edit/:id',auth,editProductForm)
adminRouter.post('/edit/:id',auth,updateProduct)

adminRouter.get('/add-new-product',auth,addNewProductForm)
adminRouter.get('/delete/:id',auth,deleteProduct)
adminRouter.get('/:id',auth,getItem)


module.exports = adminRouter