# 📝 Task Management RESTful API

A secure and minimal task management API built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**.

---

## ✨ Features

- User registration and login with JWT-based authentication
- Task CRUD (Create, Read, Update, Delete) operations
- Protected routes with token-based auth
- Environment-based configuration
- Ready-to-use test setup with `supertest` and `jest`

---

## 📁 Project Structure

```
task-api/
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── tests/
│   └── api.test.js
├── .env
├── .env.test
├── app.js
├── server.js
├── package.json
└── README.md
```

---

## 🔐 Authentication

All `/api/tasks` routes are **protected** and require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

---

## 📌 API Endpoints

### 🔑 Authentication

#### 📍 POST `/api/register`  
Register a new user.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "message": "User registered"
}
```

---

#### 📍 POST `/api/login`  
Log in and receive a JWT token.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

### 🗂 Tasks (Protected)

#### 📍 POST `/api/tasks`  
Create a new task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Finish report",
  "description": "Complete by Monday"
}
```

**Response:**
```json
{
  "_id": "123...",
  "title": "Finish report",
  "description": "Complete by Monday",
  "userId": "681c...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

#### 📍 GET `/api/tasks`  
Fetch all tasks for the authenticated user.

---

#### 📍 GET `/api/tasks/:id`  
Get task details by ID.

---

#### 📍 PUT `/api/tasks/:id`  
Update a task.

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

---

#### 📍 DELETE `/api/tasks/:id`  
Delete a task by ID.

---

## ⚙️ Setup Instructions

### 📦 Install Dependencies

```bash
npm install
```

### 📄 Create `.env` File

```env
MONGODB_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=your-secret-key
PORT=5000
```

### 🧪 Create `.env.test` File for Testing

```env
MONGODB_URI=mongodb://localhost:27017/taskdb
JWT_SECRET=test-secret
```

---

### 🚀 Run the Server

```bash
npm start
```

API will run at: `http://localhost:3000`

---

### 🧪 Run Tests

```bash
npm test
```

> Make sure MongoDB is running locally.

---

## 🧰 Tech Stack

- Node.js
- Express
- MongoDB (via Mongoose)
- JWT for Authentication
- Jest + Supertest for testing
- dotenv for environment variables

---

## 📬 Contact

For any issues or feature requests, feel free to open an issue.

---
