
# MT1-LABEXAM - Shopping Cart Management Web Application

A Full Stack Development practical project using Node.js, HTTP Module, FS Module, and Express.js.

## 1. Project Overview

This project is a Shopping Cart Management Web Application developed using Node.js and Express.js.

It contains two independent applications:

- Part A: HTTP Server using Node.js HTTP and FS modules.
- Part B: Shopping Cart REST API using Express.js.

All shopping cart records are stored in a JavaScript array. No database is required.

## 2. Technologies Used

- Node.js
- JavaScript (ES6 Modules)
- HTTP Module
- FS Module
- Express.js
- HTML
- Postman
- Git and GitHub

## 3. Project Structure

```text
ShoppingCart/
│
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
│
├── httpServer.js
├── expressApp.js
│
├── public/
│   └── index.html
│
└── screenshots/
```

## 4. Installation and Setup


### Step 1: Navigate to Project Directory

```bash
cd MT1-LABEXAM/ShoppingCart
```

### Step 2: Install Dependencies

```bash
npm install
```

## 5. Running the Application

### Part A: Node.js HTTP Server

Run the following command:

```bash
node httpServer.js
```

Server URL:

http://localhost:3000

#### HTTP Server Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Welcome message |
| GET | /cart | Display all cart items |
| GET | /about | Application information |
| GET | /home | Serve HTML using FS module |
| POST | /add-to-cart | Add a new product |

### Part B: Express.js REST API

Open another terminal and execute:

```bash
node expressApp.js
```

Server URL:

http://localhost:4000

## 6. REST API Endpoints

| Method | Endpoint | Functionality |
|--------|----------|---------------|
| GET | /cart | Retrieve all cart items |
| GET | /cart/:id | Retrieve product by ID |
| POST | /cart | Add a new product |
| PUT | /cart/:id | Update product details |
| DELETE | /cart/:id | Delete a product |

## 7. Sample Product Structure

```json
{
    "id": 1,
    "productName": "Wireless Mouse",
    "price": 799,
    "quantity": 2,
    "category": "Electronics"
}
```

## 8. Total Price Calculation

The application calculates the total price of an individual cart item.

**Formula:**

Total Price = Price × Quantity

Example:

799 × 2 = 1598

## 9. API Testing Using Postman

### GET - All Products

GET http://localhost:4000/cart

### GET - Product by ID

GET http://localhost:4000/cart/1

### POST - Add Product

POST http://localhost:4000/cart

Request Body:

```json
{
    "id": 4,
    "productName": "Bluetooth Headphones",
    "price": 1499,
    "quantity": 1,
    "category": "Electronics"
}
```

### PUT - Update Product

PUT http://localhost:4000/cart/1

Request Body:

```json
{
    "productName": "Wireless Mouse",
    "price": 899,
    "quantity": 3,
    "category": "Electronics"
}
```

### DELETE - Remove Product

DELETE http://localhost:4000/cart/1

## 10. HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Request successful |
| 201 | Product created successfully |
| 400 | Invalid request |
| 404 | Product not found |
| 409 | Duplicate product ID |
| 500 | Internal server error |

## 11. Error Handling

The application handles:

- Invalid JSON requests.
- Missing product details.
- Duplicate product IDs.
- Product not found errors.
- Invalid routes.
- File reading errors.

## 12. GitHub Commit History

The project uses Git and GitHub for version control.

Example commit messages:

```bash
git add .
git commit -m "Initial project setup"

git add .
git commit -m "Complete Part A HTTP server"

git add .
git commit -m "Complete Part B Express REST API"

git add .
git commit -m "Add API testing screenshots"

git push
```

## 13. Important Features

- HTTP server creation using Node.js.
- Routing and HTTP method handling.
- Static HTML serving using FS module.
- Express.js REST API.
- Complete CRUD operations.
- JavaScript array-based data storage.
- Total price calculation.
- Request validation and error handling.

## 14. Important Note

This project does not use any database.

Shopping cart data is stored in JavaScript arrays and resets when the server restarts.

## 15. Author

**Project Name:** MT1-LABEXAM

**Project:** Shopping Cart Management Web Application

**Subject:** Full Stack Development - Node.js Lab Examination

**Repository:** MT1-LABEXAM
