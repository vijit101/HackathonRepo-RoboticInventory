export default class ProductModel {
  constructor(id, name, description, price, imageURL) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageURL = imageURL;
  }

  static get() {
    return products;
    // returns array of prodmodel data
  }

  static append(name,desc,price,imgurl){
    let newProd = new ProductModel(products.length+1,name,desc,price,imgurl);
    products.push(newProd);
  }

  static append(productobj){
    productobj.id = products.length+1;
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
 
}

var products = [
  new ProductModel(
    1,
    "prod1",
    "desc1 ",
    20,
    "https://m.media-amazon.com/images/I/81Qaq2O8dsL._AC_UF1000,1000_QL80_.jpg"
  ),
  new ProductModel(
    2,
    "prod2",
    "desc2 ",
    21,
    "https://m.media-amazon.com/images/I/81FPzmB5fgL._AC_UF1000,1000_QL80_.jpg"
  ),
  new ProductModel(
    3,
    "prod3",
    "desc3 ",
    22,
    "https://m.media-amazon.com/images/I/71mF5e0DPoS._AC_UF1000,1000_QL80_.jpg"
  ),
];
