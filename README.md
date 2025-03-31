Here is the updated `README.md` file with the additional API endpoints:

```markdown
# Shopping Cart Application

This is a shopping cart application built with TypeScript, React, and Node.js.

## Features

- View products
- Add products to the cart
- Remove products from the cart
- View cart summary

## Technologies Used

- TypeScript
- React
- Node.js
- Express
- npm

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/shopping-cart.git
   cd shopping-cart
   ```

2. Install dependencies for the client and server:

   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:

   ```bash
   cd server
   npm start
   ```

2. Start the client:

   ```bash
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `client/`: Contains the React frontend code.
- `server/`: Contains the Node.js backend code.
- `types/`: Contains TypeScript type definitions.

## API Endpoints

### Shop Routes

- `GET /api/shop/all-products`: Fetch all products.
- `GET /api/shop/product/:productId`: Fetch a single product by ID.
- `GET /api/shop/cart/all-products`: Fetch all products in the cart.
- `POST /api/shop/cart/add-product`: Add a product to the cart.
- `POST /api/shop/cart/delete-product`: Remove a product from the cart.

### Admin Routes

- `POST /api/admin/add-product`: Add a new product.
- `POST /api/admin/edit-product`: Edit an existing product.
- `POST /api/admin/delete-product`: Delete a product.

## License

This project is licensed under the MIT License.

```