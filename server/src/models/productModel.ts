export let mockProducts = [
  {
    id: "1",
    name: "Nike Air Max 90",
    price: 120.0,
    description: "Classic Air Max design with premium comfort.",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1ccfdc55-fda5-402c-87be-61296f1b01d9/AIR+MAX+90.png",
  },
  {
    id: "3",
    name: "Air Jordan 11 Retro 'Legend Blue'",
    price: 200.0,
    description: "Iconic basketball sneakers with a timeless design.",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f1b1b8cb-591c-43ed-9d4e-6225484ff679/AIR+MAX+90.png",
  },
  {
    id: "4",
    name: "New Balance 574",
    price: 80.0,
    description: "Versatile sneakers with a classic silhouette.",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1ccfdc55-fda5-402c-87be-61296f1b01d9/AIR+MAX+90.png",
  },
  {
    id: "5",
    name: "Converse Chuck Taylor All Star",
    price: 60.0,
    description: "Timeless canvas sneakers perfect for everyday wear.",
    imageUrl:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1ccfdc55-fda5-402c-87be-61296f1b01d9/AIR+MAX+90.png",
  },
];

module.exports = class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public description: string,
    public imageUrl: string,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  addNewProduct() {
    mockProducts.push(this);
  }

  static fetchAll() {
    return mockProducts;
  }

  static findById(id: string) {
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      return null;
    }
    return product;
  }

  static editProduct(product: Product) {
    const productIndex = mockProducts.findIndex((p) => p.id === product.id);
    if (productIndex) {
      mockProducts[productIndex] = product;
    }
  }

  static deleteProduct(productId: string) {
    mockProducts = mockProducts.filter((p) => p.id !== productId);
  }
};
