# 🛍️ BestShop

**BestShop** is a web application that aggregates product listings from multiple Tunisian online stores in one place. It allows users to **compare prices**, **track availability**, and **make informed purchasing decisions**—making online shopping in Tunisia easier and more transparent.

---

## 🚀 Features

- 🔎 **Search products** by name or characteristics
- 💸 **Compare prices** from different shops
- 📊 **Track price history** for each product
- 🧠 **Smart filters** based on characteristics (e.g., RAM, storage, screen size)
- ❤️ **Wishlist** and 🛒 **Cart** support
- 👤 User authentication and session management

---

## ⚙️ Technologies Used

### Frontend

- **React.js** — modern SPA with reusable components
- **CSS Modules** — scoped and maintainable styling
- **SVG Assets** — for clean UI icons

### Backend

- **PHP** — handles business logic and API routes
- **MySQL** — relational database (migrated from Oracle)
- **Axios** — for client-side HTTP requests

---

## 📦 Folder Structure
```text
bestshop/
├── public/
└── src/
│   ├── assets/       # SVGs, images
│   ├── components/   # Reusable UI components (e.g., buttons, cards)
│   ├── contexts/     # Global state (e.g., AuthContext)
│   ├── pages/        # Page views like Cart, Wishlist, Home
│   └── App.js        # App entry point
├── .gitignore
├── README.md
└── package.json
```

---

## 🗃️ Database Overview

BestShop uses a **MySQL** relational database to store and manage product, shop, pricing, and user data. Here's a breakdown of the key tables:

### 👤 `USER`

- `USER_ID`: User ID
- `EMAIL`, `PASSWORD_HASH`: Credentials
- `FIRST_NAME`, `LAST_NAME`, `PHONE` : Other details...
- Wishlist and Cart are tied to the user

---

### 🛒 `PRODUCT`

- `PRD_ID`: Product ID
- `PRD_NAME`: Name of the product
- `DESCRIPTION`, `BRAND`, `CREATED_AT`: Other details...

---

### 🏬 `SHOP`

- `SHP_ID`: Shop ID
- `SHP_NAME`: Name of the shop
- `URL`: Shop link

---

### 💰 `EXIST`

- `PRD_ID`, `SHP_ID`: Links a product to a shop
- `PRICE`: Offered price
- `URL`: Offer link
- `STOCK`: Offer availability

---

### 🧬 `CARACTERISTIC`

- `CAR_ID`: Characteristic ID
- `CAR_NAME`: Example: "Color", "RAM", "Screen Size"

---

### 🧩 `CARACTERISED_BY`

- `PRD_ID`, `CAR_ID`: Composite key linking product to a characteristic
- `CAR_VALUE`: e.g., "16GB", "Black"
- `CAR_UNIT`: e.g., "GB", "inch"

---


## 🔍 Smart Search Example

When a user searches for a product, BestShop not only returns matching product names but also fetches:

- All relevant characteristics (e.g., screen size, RAM)
- Available values for each characteristic
- Count of items matching each value

This enables dynamic filtering (e.g., “show all 8GB RAM laptops”) and a better shopping experience.

---

## 🔧 Setup & Run

### Requirements

- Node.js
- PHP server (e.g., XAMPP, WAMP)
- MySQL

### Steps

1. Clone the repo  
   `git clone https://github.com/MankaiAdam/bestshop.git`

2. Install frontend dependencies  
   `npm install`

3. Set up your MySQL DB and import the schema

4. Update PHP backend URLs if needed

5. Run the React frontend  
   `npm start`

6. Start your PHP server for API routes

---

## 📈 Future Improvements

- 🔐 OAuth / social logins
- 📱 Mobile responsiveness
- 🛎️ Notifications when prices drop
- 📦 Real-time inventory updates from shops

---

## 👨‍💻 Author

**BestShop Team**  
💬 Contact: [mankai.adam@gmail.com]
