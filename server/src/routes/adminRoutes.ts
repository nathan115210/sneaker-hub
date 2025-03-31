import express, { Request, Response } from "express";

/*
import { mockProducts } from "../models/productModel";
*/

const Product = require("../models/productModel");

const router = express.Router();

//  api/admin/add-product => POST

router.post("/add-product", (req: Request, res: Response) => {
  const { id, name, price, description, imageUrl } = req.body;
  const newProduct = new Product(id, name, price, description, imageUrl);

  newProduct.addNewProduct();
  res.status(201).json(newProduct);
});

// api/admin/edit-product => POST
router.post("/edit-product", (req: Request, res: Response) => {
  const { id, name, price, description, imageUrl } = req.body;
  const updatedProduct = { id, name, price, description, imageUrl };

  Product.editProduct(updatedProduct);
  res.status(200).json(updatedProduct);
});

// api/admin/delete-product => POST
router.post("/delete-product", (req: Request, res: Response) => {
  const productId = req.body.id;

  if (productId) {
    Product.deleteProduct(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;
