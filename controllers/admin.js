const { ObjectId } = require("mongodb")
const Product = require("../model/admin")
const User = require("../model/user")




const getAllAdminProduct = async(req,res)=>{
       const data = (await Product.find({}))
        res.render('home.ejs',{products:data,role:'admin',isLogedIn:req.session.isLogedIn})
    
} 

const postNewProduct = async(req,res)=>{
    const title = req.body.title
    const price = req.body.price
    const imageUrl = req.body.imageUrl
    const description = req.body.description
    const userId = req.user._id
    
    const newProduct = Product.create({
        title:title,
        price:price,
        imageUrl:imageUrl,
        description:description,
        userId:userId
    })

    await (await newProduct).save()
    res.redirect('/admin/shop')
}



const deleteProduct = async (req,res)=>{
  const id = req.params.id
  console.log(id)
  await Product.deleteOne({_id:id})
  res.redirect('/admin/shop')

}

const getItem = async(req,res)=>{
    const id = req.params.id
     Product.findById({_id:id}).then((product)=>{
        res.render('details.ejs',{product:product,role:'admin',isLogedIn:req.session.isLogedIn})
    })
}

const addNewProductForm = (req,res)=>{
    res.render('postItem.ejs',{type:'admin',isLogedIn:req.session.isLogedIn})
  
}

const editProductForm = async (req,res)=>{
    const id = req.params.id
     Product.findById({_id:id}).then((product)=>{
    res.render('postItem.ejs',{type:'edit',product:product,isLogedIn:req.session.isLogedIn})
})

    
}

const updateProduct = async(req,res)=>{
    const id = req.params.id
    const title = req.body.title
    const price = req.body.price
    const imageUrl = req.body.imageUrl
    const description = req.body.description
    await Product.updateOne({_id:id},{title:title,price:price,imageUrl:imageUrl,description:description})
    .then(()=>{
        res.redirect('/admin/shop')
    })

}

module.exports = {
    postNewProduct,
    getItem,
    addNewProductForm,
    editProductForm,
    updateProduct,
    deleteProduct,
    getAllAdminProduct
}