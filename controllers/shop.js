const Product = require("../model/admin");
const Cart = require("../model/cart");
const User = require("../model/user");
const Order = require("../model/order");

const getAllProduct = async (req, res) => {
    await Product.find({}).then((result) => {
      res.render("home.ejs", { products: result, role: "user",isLogedIn:req.session.isLogedIn });
    });
};

const getItem = async (req, res) => {
  const id = req.params.id;

  await Product.findById({ _id: id })
    .then((result) => {
      res.render("details.ejs", { product: result, role: "shop",isLogedIn:req.session.isLogedIn });
    })
    .catch((err) => console.log("unable to get the item " + id));
};

const getCartItems = async (req, res) => {
  const cart = await Cart.findOne({userId:req.user._id})
  const cartItems = cart.items || []
  res.render("cart.ejs", { products: cartItems,isLogedIn:req.session.isLogedIn });
};

const postItemToCart = async (req, res) => {
  const prodId = req.body.prodId;
  const itemToAdd = await Product.findById({ _id: prodId });
  const existingCart = await Cart.findOne({
    userId:req.user._id,
  });
  try {
    //this will execute when there is something in cart
    if (existingCart.items.length > 0) {
      //checking if product already exist then only quantity will increase
      const existingItem = existingCart.items;
      let productExist = false;

      existingItem.forEach((item) => {
        if (item.product._id.toString() === prodId) {
          productExist = true;
          item.quantity++;
        }
      });
      if (productExist) {
        await Cart.updateOne(
          { userId: req.user._id},
          {
            $set: {
              items: existingItem,
            },
          }
        );
        res.redirect("/");
        return;
      }

      const existingItems = [
        ...existingCart.items,
        { product: itemToAdd, quantity: 1 },
      ];
      await Cart.updateOne(
        { userId:req.user._id},
        {
          $set: {
            items: existingItems,
          },
        }
      );
    }else{
      const createCartItem = await Cart.updateOne({userId:req.user._id},
        {$set:{items: [{ product: itemToAdd, quantity: 1 }]}});
      res.redirect('/')
      return
    }
    
  } catch (err) {
    //this will execute when there is no items in cart and there is no cart
    console.log(err)
    const createCartItem = await Cart.create({
      userId:req.user._id,
      items: [{ product: itemToAdd, quantity: 1 }],
    });
    await createCartItem.save();
  }
  res.redirect("/");
};

const deleteCartItem = async (req, res) => {
  const prodId = req.body.prodId
  const cart = await Cart.findOne({userId:req.user._id})
  const deletedItemList = cart.items.filter((item)=>item.product._id.toString() !== prodId)
  await Cart.updateOne({userId:req.user._id},{$set:{items:deletedItemList}})
  res.redirect("/cart");
};

const orderProduct = async (req, res) => {
  const cart = await Cart.findOne({userId:req.user._id})
  const cartItems = cart.items
  const newOrder = await Order.create({
    userId:req.user._id,
    items:cartItems
  })
  await newOrder.save()
  await Cart.updateOne({userId:req.user._id},{$set:{items:[]}})
 .then(()=>console.log('cart empty'))
 .catch(err=>console.log(err))
  res.redirect('/')

};

const getOrders = async (req, res) => {
 const order = await Order.find({userId:req.user._id})
 res.render('order.ejs',{orders:order,isLogedIn:req.session.isLogedIn})
};

module.exports = {
  getAllProduct,
  getItem,
  getCartItems,
  postItemToCart,
  deleteCartItem,
  orderProduct,
  getOrders,
};
