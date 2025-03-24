To add important links later - 
Demonstration link - https://youtu.be/8lnRnJb0RQY


# Robotic Inventory System - Backend

## 📌 Overview
The **Robotic Inventory System** is a Node.js and Express-based backend that provides inventory management capabilities, including product tracking, user authentication, and QR code integration. This system allows users to register, log in, and manage product stock levels efficiently.

## 🚀 Features
- **User Authentication** (Register, Login, Logout with session-based auth)
- **Product Management** (CRUD operations for products)
- **QR Code Generation** (For tracking product stock and purchases)
- **Session-Based Middleware** (User sessions & last visit tracking)
- **View Rendering with EJS** (Dynamic UI for inventory management)
- **Validation Middleware** (Ensuring data integrity)
- **Express Session Handling** (User sessions stored securely)

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **View Engine:** EJS with express-ejs-layouts
- **Middleware:** Express Session, Cookie Parser, Custom Auth Middleware
- **QR Code Generation:** `qrcode` package
- **Validation:** `express-validator`

---

## 📂 Folder Structure

```
Backend/
├── src/
│   ├── controllers/       # Handles business logic
│   │   ├── product.controller.js
│   │   ├── user.controller.js
│   ├── middlewares/       # Custom middleware for auth, validation, and session handling
│   │   ├── auth.middleware.js
│   │   ├── lastVisit.middleware.js
│   │   ├── validation.middleware.js
│   ├── models/            # Data models (Currently using JSON storage)
│   │   ├── product.model.js
│   │   ├── user.model.js
│   │   ├── QRCode.utility.js
│   ├── views/             # EJS templates for rendering UI
│   │   ├── layout.ejs
│   │   ├── login.ejs
│   │   ├── register.ejs
│   │   ├── new-product.ejs
│   │   ├── update-product.ejs
│   │   ├── products.ejs
├── index.js               # Entry point of the application
├── package.json           # Project dependencies and metadata
├── package-lock.json      # Package lock file
├── .gitignore             # Git ignore file
├── README.md              # Project documentation
```

---

## 🔧 Setup & Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/robotic-inventory-backend.git
   cd robotic-inventory-backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```
   The server runs on `http://localhost:8080`

---

## 📜 API Endpoints

### 🔑 Authentication Routes
| Method | Endpoint       | Description         |
|--------|--------------|---------------------|
| GET    | `/register`   | Render register page |
| POST   | `/register`   | Register new user   |
| GET    | `/login`      | Render login page   |
| POST   | `/login`      | User login          |
| GET    | `/logout`     | Logout user         |

### 📦 Product Management
| Method | Endpoint             | Description                       |
|--------|----------------------|-----------------------------------|
| GET    | `/`                  | View all products (requires auth) |
| GET    | `/api/products`      | Get all products (JSON)          |
| GET    | `/new`               | Get add product form             |
| POST   | `/`                  | Add new product (Form Submission) |
| POST   | `/api/addProducts`   | Add new product (API)            |
| GET    | `/update-product/:id`| Get update product form          |
| POST   | `/update-product`    | Update existing product          |
| GET    | `/qrcode/:id`        | Get product by QR Code           |
| POST   | `/qrcode/:id`        | Update stock on purchase         |
| GET    | `/delete-product/:id`| Delete product                   |

---

## 🛠 Middleware
- **Authentication Middleware (`auth.middleware.js`)**: Protects routes from unauthorized access.
- **Validation Middleware (`validation.middleware.js`)**: Ensures valid product data is submitted.
- **Last Visit Middleware (`lastVisit.middleware.js`)**: Tracks last visit time in cookies.

---

## 📌 Future Improvements
- Migrate from JSON storage to a real database (MongoDB/PostgreSQL)
- Implement role-based access control (RBAC)
- Add RESTful API documentation with Swagger
- Implement unit tests with Jest

---

## 💡 Contributing
Feel free to fork this repository and submit pull requests with improvements or bug fixes.

---

## 📄 License
This project is licensed under the MIT License
