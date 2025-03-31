// @ts-ignore
import type { CartProductProps, CartType } from "../../../types/cartTypes";
import path from "path";
import fs from "fs";

const Product = require("../models/productModel");

export let mockCartData: CartType = {
  totalPrice: 400,
  products: [
    {
      id: "1",
      name: "Nike Air Max 90",
      price: 120.0,
      description: "Classic Air Max design with premium comfort.",
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1ccfdc55-fda5-402c-87be-61296f1b01d9/AIR+MAX+90.png",
      qty: 1,
    },
    {
      id: "3",
      name: "Air Jordan 11 Retro 'Legend Blue'",
      price: 200.0,
      description: "Iconic basketball sneakers with a timeless design.",
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f1b1b8cb-591c-43ed-9d4e-6225484ff679/AIR+MAX+90.png",
      qty: 1,
    },
    {
      id: "4",
      name: "New Balance 574",
      price: 80.0,
      description: "Versatile sneakers with a classic silhouette.",
      imageUrl:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1ccfdc55-fda5-402c-87be-61296f1b01d9/AIR+MAX+90.png",
      qty: 1,
    },
  ],
};

const p = path.join(
  path.dirname(require.main?.filename || ""),
  "data",
  "cart.json",
);

module.exports = class Cart {
  static fetchAll() {
    /*fs.readFile(p, (err, fileContent) => {
                              let cart;
                              if (fileContent.length > 0) {
                                cart = JSON.parse(fileContent.toString());
                              } else {
                                cart = { products: [], totalPrice: 0 } as CartType;
                              }
                              console.log("cart from api", cart);
                              return cart;
                            });*/
    return mockCartData;
  }

  static addProduct(id: string, productPrice: number) {
    //TODO: fetch teh previous cart from DB
    console.log("addProduct called");
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 } as CartType;
      if (fileContent.length > 0) {
        cart = JSON.parse(fileContent.toString());
      } else {
        cart = { products: [], totalPrice: 0 } as CartType;
      }

      //analyze the cart => find existing product
      const existingCartProductIndex = cart.products.findIndex(
        (product) => product.id === id,
      );
      const existingCartProduct = cart.products[existingCartProductIndex];
      let updatedCartProduct: CartProductProps;

      // If the product already exists in the cart, increase its quantity
      if (existingCartProduct) {
        updatedCartProduct = { ...existingCartProduct };
        updatedCartProduct.qty = updatedCartProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingCartProductIndex] = updatedCartProduct;
      } else {
        // If the product doesn't exist, add it to the cart as new cart product
        const newCartProduct = Product.findById(id);
        console.log("newCartProduct", newCartProduct);
        if (newCartProduct) {
          updatedCartProduct = {
            ...newCartProduct,
            id: id,
            qty: 1,
          } as CartProductProps;
          cart.products = [...cart.products, updatedCartProduct];
        } else {
          throw new Error("Product not found");
        }
      }

      cart.totalPrice = cart.totalPrice + productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log("cart", cart);
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static deleteProduct(productId: string) {
    const cartProduct = mockCartData.products.find((p) => p.id === productId);
    if (cartProduct) {
      const cartProductTotalPrice = cartProduct.price * cartProduct.qty;
      mockCartData = {
        totalPrice: mockCartData.totalPrice - cartProductTotalPrice,
        products: mockCartData.products.filter((p) => p.id !== productId),
      };
    }
  }
};
