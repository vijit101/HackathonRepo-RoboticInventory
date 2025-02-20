import fs from "fs";
import QRCodeUtility from "./QRCode.utility.js";

export default class ProductModel {
  
  constructor(id, name, description, price, imageURL,stockLeft,expiryDate,categoryType,thresholdQuantity,noOfTimesShopLifted,qrCodeURL) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageURL = imageURL;
    this.stockLeft = stockLeft;
    this.expiryDate = expiryDate;
    this.categoryType = categoryType;
    this.thresholdQuantity = thresholdQuantity;
    this.noOfTimesShopLifted = noOfTimesShopLifted;
    this.qrCodeURL = qrCodeURL;
  }

  static get() {
    return products;
    // returns array of prodmodel data
  }

  

  static async append(name, desc, price, imgurl, stockLeft, expiryDate, categoryType, thresholdQuantity) {
    let qrurl = await QRCodeUtility.returnQRcodeUrl("/qrcode/" + (products.length + 1)); 
    //console.log(qrurl);  // Now this will print the actual QR code URL
    let newProd = new ProductModel(products.length + 1, name, desc, price, imgurl, stockLeft, expiryDate, categoryType, thresholdQuantity, 0, qrurl);
    products.push(newProd);
}

static async append(productobj) {
  productobj.id = products.length + 1;
  productobj.noOfTimesShopLifted = 0;
  productobj.qrCodeURL = await QRCodeUtility.returnQRcodeUrl("/qrcode/"+(products.length + 1));
  console.log(productobj); // Now this will include the QR Code URL
  products.push(productobj);
}

  

  static getByID(id){
    id = Number(id);
    for(let i=0;i<products.length;i++){
      if(products[i].id == id){
        //console.log(products[i]);
        return products[i];
      }
    }
  }

  static update(prodObj){
    console.log("update called "+ prodObj);
    for(let i=0;i<products.length;i++){
      if(products[i].id == prodObj.id){
        //console.log(products[i]);
        prodObj.qrCodeURL = products[i].qrCodeURL;
        products[i] = prodObj;
        return;
      }
    }
  }

  static delete(id){
    id = Number(id);
    for(let i=0;i<products.length;i++){
      if(products[i].id == id){
        //console.log(products[i]);
        products.splice(i,1);
        return;
      }
    }
  }

  static async saveData(jsonDataObj){
    fs.writeFile( "./productsData.json", JSON.stringify(jsonDataObj, null, 2),"utf8",(err)=>{
      if(err)
      {
        console.log(err);
      }
      else{
        console.log("data saved");
      }
    })
  }

  static readDataSync(){
    products = JSON.parse(fs.readFileSync( "./productsData.json","utf8")); // convert to object
    //console.log(products);
  }
  
}

var products = [
  new ProductModel(
    1,
    "prod1",
    "desc1 ",
    20,
    "https://m.media-amazon.com/images/I/81Qaq2O8dsL._AC_UF1000,1000_QL80_.jpg",
    "10",
    "none",
    "books",
    "2",
    "0",
    " "
  ),
  new ProductModel(
    2,
    "prod2",
    "desc2 ",
    21,
    "https://m.media-amazon.com/images/I/81FPzmB5fgL._AC_UF1000,1000_QL80_.jpg",
    "8",
    "none",
    "books",
    "1",
    "0",
    " "
  ),
  new ProductModel(
    3,
    "prod3",
    "desc3 ",
    22,
    "https://m.media-amazon.com/images/I/71mF5e0DPoS._AC_UF1000,1000_QL80_.jpg",
    "5",
    "none",
    "books",
    "1",
    "0",
    " "
  ),
];




