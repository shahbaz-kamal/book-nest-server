<div align="center">
  <img height="400" src="https://github.com/shahbaz-kamal/book-nest-with-mongoose/blob/main/src/assets/git_banner/Slide1.PNG"  />
</div>

###

<h1 align="left">📚 Book Nest - Library Management API</h1>

###

This project is a RESTful Library Management System built using **Express**, **TypeScript**, and **MongoDB (Mongoose)**. It allows users to manage book records and borrowing operations with proper validation, business logic, and data aggregation.

###

## 🔗 Live deployment link

[book-nest-olive.vercel.app](https://book-nest-olive.vercel.app)

<!-- ###
<!-- ## 👨‍💼 Admin Info
###
<p align="left">Admin Email: shahbaz@kamal.com</p>
<p align="left">Admin Password: 123456Aa</p> -->

## ✨ Features:

###

- Create, read, update, and delete books
- Borrow books with quantity checks and availability logic
- Aggregation pipeline for borrowed book summary
- Genre-based filtering and sorting
- Mongoose schema validation and instance methods
- Clean and structured code with proper error handling

###

## 🛠 Technology Used

###

 <div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=express" height="40" alt="express logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo"  />
  <img width="12" />
  <img src="https://img.icons8.com/?size=48&id=gKfcEStXI1Hm&format=png" height="40" alt="mongodb logo"  />
</div>

###

###

## 💥 Dependencies:

###

<p align="left">"cors": "^2.8.5",<br>    "dotenv": "^16.5.0",<br>    "express": "^5.1.0",<br>    "mongoose": "^8.16.0",<br>    "validator": "^13.15.15"</p

###

## 💥Dev Dependencies:

###

<p align="left">"@eslint/js": "^9.29.0",<br>    "@types/cors": "^2.8.19",<br>    "@types/express": "^5.0.3",<br>    "@types/validator": "^13.15.2",<br>    "@typescript-eslint/eslint-plugin": "^8.34.1",<br>    "@typescript-eslint/parser": "^8.34.1",<br>    "eslint": "^9.29.0",<br>    "typescript": "^5.8.3"</p>

###

## ✨ Sample Request (Must follow this structure)

### 1\. Create Book

**POST** `/api/books`

#### Request:

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

### 2\. Get All Books

**GET** `/api/books`

Supports filtering, and sorting.

#### Example Query:

`/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

#### Query Parameters:

- `filter`: Filter by genre
- `sort`: `asc` or `desc`
- `limit`: Number of results (default: 10)

### 3\. Get Book by ID

**GET** `/api/books/:bookId`

### 4\. Update Book

**PUT** `/api/books/:bookId`

#### Request:

```json
{
  "copies": 50
}
```

### 5\. Delete Book

**DELETE** `/api/books/:bookId`

### 6\. Borrow a Book

**POST** `/api/borrow`

## 🔧 Installation Guidline:

###

1. First clone the project by running

```bash
  git clone https://github.com/shahbaz-kamal/book-nest-with-mongoose.git
```

2. Change your directory to the cloned folder by

```bash
  cd folder_name
```

3. Run the following to install dependencies:

```bash
npm install
```

4. Create a MongoDB user by keeping username and password collected & create a .env file in the root directory and put the following code with corresponding info's :

```bash
DB_USER=***************************
DB_PASS=***************************

```

5. Run the following command to build the project:

```bash
npm run build
```

5. Run the following command and open the website locally on port 5000:

```bash
npm start
```

###
