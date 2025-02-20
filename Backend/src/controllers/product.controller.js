import path from'path';
import ProductModel from '../models/product.model.js';
import { error } from 'console';


export default class ProductController{
    getproducts(req,res){
        let prods = ProductModel.get();
        //console.log(prods);
        //console.log(path.resolve());// return execution directory hence we ran the methodfrom index.js 
        // return res.sendFile(path.join(path.resolve(),"src","views","products.html"));
        res.render("products",{prods:prods});
        // renders products,ejs page passing the prods data 
    }

    getAllProductInfo(req,res){
        let prods = ProductModel.get();
        res.send(prods);
    }

    getAddForm(req,res){
        res.render("new-product",{errorMessage:null});
    }

    // get3DView(req,res){
    //     res.render("new-product",{errorMessage:null});
    // }

    async addNewProduct(req, res) {
        await ProductModel.append(req.body);  // Wait for QR code generation
        let prod = ProductModel.get();
        await ProductController.saveFileToModel(prod); // Wait for save
        return res.render("products", { prods: prod });
    }
    

    // addNewProduct(req,res){
    //     console.log(JSON.stringify(req.body));
    //     ProductModel.append(req.body); // req . body gets the prod data in obj form 
    //     let prod = ProductModel.get();
    //     return res.render("products",{prods:prod}); // make sure the key is prods as its used in product ejs better to use an enum and save it as prods 
    // }

    addProductViaApi(req,res){
        console.log(JSON.stringify(req.body));
        ProductModel.append(req.body); // req . body gets the prod data in obj form 
        ProductController.saveFileToModel(prod);
        res.send("data updated successfully");
        //res.send("Product information updated successfully");
        
    }

    getUpdateProductView(req,res,next){
        // if prod exist return view
        const id = req.params.id;
        
        // const {id} = req.body;
        const prodFound = ProductModel.getByID(id);
        if(prodFound){
            res.render("update-product",{product:prodFound,errorMessage:null});
        }
        else{
            res.status(401).send("product not found");
        }
    }

    getproductbyid(req,res){
        const id = req.params.id;
        const prodFound = ProductModel.getByID(id);
        res.status(200).send(prodFound);
    }

    updateStockOnPurchase(req,res){
        const id = req.params.id;
        const prodFound = ProductModel.getByID(id);
        prodFound.stockLeft --;
        let prod = ProductModel.get();
        saveFileToModel(prod);
        res.send("stock updated for item :"+prodFound.name);

    }

    postUpdateProduct(req,res){
        console.log(req.body);
        ProductModel.update(req.body); // req . body gets the prod data in obj form 
        let prod = ProductModel.get();
        ProductController.saveFileToModel(prod);
        return res.render("products",{prods:prod});
    }

    deleteProduct(req,res){
        const id = req.params.id;
        const prodFound = ProductModel.getByID(id);
        if(prodFound){
            ProductModel.delete(id);
            let prod = ProductModel.get();
            ProductController.saveFileToModel(prod);
            return res.render("products",{prods:prod});
        }
        else{
            res.status(401).send("product not found");
        }   
    }

    static async saveFileToModel(latestprod){
        //let prod = ProductModel.get();
        //console.log(latestprod);
        await ProductModel.saveData(latestprod);
    }

    LoadData(){
        ProductModel.readDataSync();
    }
} 