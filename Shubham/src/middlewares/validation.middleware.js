import { body, validationResult } from "express-validator";
const validateRequest = async (req, res, next) => {
  // setup validator rules 
  let rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isFloat({gt:0}).withMessage("price be positive"), // gt :0 means greater than 0
    body('imageUrl').isURL().withMessage("invalid Url"),
  ];

  await Promise.all(rules.map((rule)=>{rule.run(req)}));

//   const { name, price, imageUrl } = req.body;
//   if (!name || name.trim() == "") {
//     errors.push("name is required");
//   }
//   if (!price || parseFloat(price) < 1) {
//     errors.push("price must be a +ve value");
//   }
//   try {
//     const validUrl = new URL(imageUrl);
//   } catch (err) {
//     errors.push("Url not correct");
//   }
let errors = validationResult(req);//errors is an object get its array 
  if (!errors.isEmpty()) {
    //let prods = ProductModel.get();
    return res.render("new-product", { errorMessage: errors.array()[0].msg });
  }
  next();
};

export default validateRequest;
