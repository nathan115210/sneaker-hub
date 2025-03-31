import express, { Request, Response } from "express";

const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

const router = express.Router();

// api/shop/all-products => GET
router.get("/all-products", async (_req: Request, res: Response) => {
  try {
    const products = Product.fetchAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// api/shop/product/:productId => GET
// @ts-ignore
router.get("/product/:productId", (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// api/shop/cart/all-products => GET
router.get("/cart/all-products", async (_req: Request, res: Response) => {
  try {
    const cartProducts = Cart.fetchAll();
    res.status(200).json(cartProducts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// api/shop/cart/add-product => POST

router.post("/cart/add-to-cart", (req: Request, res: Response) => {
  /*const productId = req.body.productId as string;
              Product.findById(productId, (product: ProductProps) => {
                Cart.addProduct(productId, product.price);
              });
              /!*res.redirect("/cart");*!/
            
              /!*res.status(201).json(Product);*!/*/

  try {
    console.log("API /cart/add-to-cart called");
    const { productId, productPrice } = req.body;
    if (!productId) {
      res.status(400).send({ error: "Product Id is missing" });
    } else if (!productPrice) {
      res.status(400).send({ error: "Product Price is missing" });
    } else {
      Cart.addProduct(productId, productPrice);
      res.status(200).send({ message: "Product added to cart" });
    }
  } catch (error) {
    console.error("Error in /cart/add-to-cart:", error);
    res.status(500).send({ error: "Failed to add product to cart" });
  }
});

// api/shop/cart/delete-product/:id => POST
router.post("/cart/delete-product", (req: Request, res: Response) => {
  const productId = req.body.id;

  if (productId) {
    Cart.deleteProduct(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

export default router;
