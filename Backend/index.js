import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import UserController from './src/controllers/user.controller.js';
import path from 'path';
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { auth } from './src/middlewares/auth.middleware.js';
import session from 'express-session';// middle ware gens sessions on req

const server = express(); 
const productController = new ProductController(); 
const userController = new UserController();
// init product data 
productController.LoadData(); // loads json data for products later on will store in db
server.use(
    session({
    secret:'useKeyGen',
    resave:false,
    saveUninitialized:true,
    cookie:{secure : false},
}));
// body parsers 
// for body parsing as post req are mostly text not readable format 
server.use(express.urlencoded({extended:true})); // for x - form format 
server.use(express.json());  // Add this to accept JSON payloads
server.use(express.static('src/views'));


// setup a view engine 
server.set("view engine","ejs");
// where the ejs would find the views
//server.set("views","./src/views")
server.set("views",path.join(path.resolve(),"src","views"));
// use ejs layouts to edit header footer and views separately
server.use(ejsLayouts);

//login 
server.get("/register",userController.getRegister);
server.post("/register",userController.postRegister);
server.get("/login",userController.getLogin);
server.post("/login",userController.postLogin);
server.get("/logout",userController.logout);

// add the 3d view over here as a get3D view 
//server.get("/3dView",productController.get3DView);

// get product info api's
server.get("/",auth,productController.getproducts); // return view 
server.get("/api/products",productController.getAllProductInfo); // return json 

server.get("/new",auth,productController.getAddForm); // returns a viewform to add new product

server.post("/", [auth,validationMiddleware], async (req, res) => {
    await productController.addNewProduct(req, res);
}); // can be used to add new items on submit or via api trigger
server.post("/api/addProducts",[auth,validationMiddleware],productController.addProductViaApi);

server.get("/update-product/:id",auth,productController.getUpdateProductView);
server.post("/update-product",auth,productController.postUpdateProduct);

server.get("/qrcode/:id",productController.getproductbyid);
server.post("/qrcode/:id",productController.updateStockOnPurchase);

server.get("/delete-product/:id",auth,productController.deleteProduct);


server.listen(8080,()=>{
    console.log("server started at 8080");
})