import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from 'path';
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from './src/middlewares/validation.middleware.js';

const server = express();
const productController = new ProductController(); 

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


// add the 3d view over here as a get3D view 
server.get("/3dView",productController.get3DView);

// get product info api's
server.get("/",productController.getproducts); // return view 
server.get("/api/products",productController.getAllProductInfo); // return json 

server.get("/new",productController.getAddForm); // returns a viewform to add new product

server.post("/",[validationMiddleware],productController.addNewProduct); // can be used to add new items on submit or via api trigger
server.post("/api/addProducts",[validationMiddleware],productController.addProductViaApi);

server.get("/update-product/:id",productController.getUpdateProductView);
server.post("/update-product",productController.postUpdateProduct);

server.get("/delete-product/:id",productController.deleteProduct);


server.listen(8080,()=>{
    console.log("server started at 8080");
})