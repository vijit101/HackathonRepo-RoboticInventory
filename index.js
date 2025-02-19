import express from 'express';
import ProductController from './src/controllers/product.controller.js';
import path from 'path';
import ejsLayouts from "express-ejs-layouts";
import validationMiddleware from './src/middlewares/validation.middleware.js';

const server = express();
// for body parsing as post req are mostly text not readable format 
server.use(express.urlencoded({extended:true}));

server.use(express.json());  // Add this to accept JSON payloads


// setup a view engine 
server.set("view engine","ejs");
// where the ejs would find the views
//server.set("views","./src/views")
server.set("views",path.join(path.resolve(),"src","views"));

const productController = new ProductController(); // couldve used singleton pattern 
// use ejs layouts to edit header foother and views separately
server.use(ejsLayouts);

server.use(express.static('src/views'));

server.get("/",productController.getproducts);
server.get("/api/products",productController.getAllProductInfo);
server.get("/new",productController.getAddForm);
server.post("/",[validationMiddleware],productController.addNewProduct);
server.post("/api/addProducts",[validationMiddleware],productController.addProductViaApi);

server.get("/update-product/:id",productController.getUpdateProductView);
server.post("/update-product",productController.postUpdateProduct);

server.get("/delete-product/:id",productController.deleteProduct);


server.listen(8080,()=>{
    console.log("server started at 8080");
})