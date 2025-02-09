# 📝 Task Management App

A **full-stack task management application** built using **Next.js(TypeScript), Redux, NestJS, MongoDB, and Tailwind CSS**.  
This app allows users to **create, edit, delete, and categorize tasks**, with authentication using JWT stored in **HttpOnly cookies**.

---

## 🚀 Features

### ✅ **Frontend (Next.js & Redux)**
- User authentication (register, login, logout) with JWT stored in cookies.
- Task CRUD operations: **Create, Read, Update, Delete**.
- Categorize tasks (e.g., Work, Personal, Shopping).
- **Filter & Sort** tasks by category and completion status.
- **Responsive UI** using Tailwind CSS.
- User profile update with **LinkedIn scraping** via Puppeteer.

### ✅ **Backend (NestJS & MongoDB)**
- User authentication with **JWT & bcrypt**.
- Task management with **MongoDB (Mongoose)**.
- Secure routes using **NestJS Guards (JwtAuthGuard)**.
- LinkedIn profile scraping using **Puppeteer** (optional).
- CORS and secure cookie handling.

---


---

## ⚙️ **Tech Stack**
### ✅ **Frontend**
- **Next.js(TypeScript)**
- **Redux Toolkit & RTK Query**
- **Axios** for API calls
- **Tailwind CSS** for styling
- **React Toastify** for notifications

### ✅ **Backend**
- **NestJS** (with TypeScript)
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **Puppeteer** (for LinkedIn scraping)

---
## 🎨 **Screenshots**
### 🔹 Home Page
![Home Page](https://raw.githubusercontent.com/Mohamedkhaled2310/Todo/refs/heads/main/srceenshots/home.png)
### 🔹 Login Page
![Home Page](https://raw.githubusercontent.com/Mohamedkhaled2310/Todo/refs/heads/main/srceenshots/login.png)
### 🔹 Dashboard
![Dashboard](https://raw.githubusercontent.com/Mohamedkhaled2310/Todo/refs/heads/main/srceenshots/dashboard.png)
### 🔹 Profile Page
![Profile Page](https://raw.githubusercontent.com/Mohamedkhaled2310/Todo/refs/heads/main/srceenshots/profile.png)






---
## 📦 **Installation & Setup**

### 🔹 **1️⃣ Clone the Repository**

- **git clone https://github.com/your-username/task-manager.git**
- **cd task-manager**


### 🔹 **2️⃣ Setup Environment Variables**

#### Create a .env file in backend


- **MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/your_db**
- **JWT_SECRET=your_jwt_secret**




### 🔹 **3️⃣ Install Dependencies**

## Backend
- **cd backend/task-management-backend**
- **npm install**
- **npm run start**

## Frontend
- **cd frontend/task-manager**
- **npm install**
- **npm run dev -- -p 4000**


#### 🔐 Authentication Flow
1. **Register a new user.**
2. **Login to receive a JWT Token (stored in HttpOnly cookies).**
3. **Access dashboard to manage tasks.**
4. **Logout clears the cookies and redirects to the home page.**

## 📌 API Endpoints

### 🔹 User Authentication
| **Method** | **Endpoint**        | **Description**               |
|-----------|-------------------|-------------------------------|
| `POST`    | `/user/register`  | Register a new user          |
| `POST`    | `/user/login`     | Login user                   |
| `POST`    | `/user/logout`    | Logout user                  |
| `GET`     | `/user/profile`   | Get logged-in user info      |
| `PUT`     | `/user/profile`   | Update user profile          |

### 🔹 Task Management
| **Method** | **Endpoint**  | **Description**            |
|-----------|-------------|----------------------------|
| `GET`     | `/tasks`    | Get all tasks              |
| `POST`    | `/tasks`    | Create a new task         |
| `PUT`     | `/tasks/:id` | Update a task             |
| `DELETE`  | `/tasks/:id` | Delete a task             |



### 🎯 Upcoming Features
- **✅ Task Reminders & Notifications**
- **✅ Task Collaboration & Sharing**