# 📝 Python Full-Stack Task Management Application

🚀 **TaskMaster** — A Modern Task Management System

**By: Matthew Reiley**
📅 October 23, 2024
[🌐 Live Demo](https://task-management-gamma-rose.vercel.app/dashboard)

---

TaskMaster is a full-stack Task Management Application powered by **Python (Flask)** and **React**. It’s designed for users who want to efficiently manage their tasks with a secure, scalable, and modern web experience.

This project highlights seamless integration between a Python-powered backend and a React frontend — focusing on authentication, task CRUD operations, responsive design, and cloud-ready deployment.

---

## 🎯 Features

✅ User Authentication & Authorization

* Register, log in, and manage secure sessions (JWT-based)
* Role-based access with token verification

✅ Task Management

* Create, update, delete, and view tasks
* Priority tagging (High / Medium / Low)
* Sort & filter tasks by status, title, or date

✅ API Documentation

* Fully documented REST API via **Swagger UI**

✅ Dockerized Deployment

* Both frontend & backend are containerized for consistent dev/prod environments

✅ Responsive UI

* Clean and mobile-friendly React frontend

---

## 🖥️ Technologies Used

### 🐍 Backend

* Python (Flask)
* SQLAlchemy (ORM)
* Flask-JWT-Extended (JWT Authentication)
* Flask-Swagger-UI (API Docs)
* Flask-CORS

### 🌐 Frontend

* React.js
* Axios
* HTML5 & CSS3

### 🗄️ Database

* SQLite (development)
* PostgreSQL (production)

### 🐳 DevOps

* Docker
* Docker Compose

---

## 🚀 Getting Started

### Prerequisites

* Python 3.x
* Node.js & npm
* Docker & Docker Compose (optional but recommended)

### Setup

```bash
# Clone the repo
$ git clone https://github.com/yourusername/taskmaster.git
$ cd taskmaster

# Backend setup
$ cd backend
$ python -m venv venv
$ source venv/bin/activate
$ pip install -r requirements.txt

# Frontend setup
$ cd ../frontend
$ npm install
```

### Run Locally

```bash
# Start backend
$ cd backend
$ flask run

# Start frontend
$ cd frontend
$ npm start
```

### Docker

```bash
# Run the entire stack in Docker
$ docker-compose up --build
```

---

## 🔗 API Endpoints

* `/api/register` — Register a new user
* `/api/login` — Login & receive JWT
* `/api/tasks` — CRUD operations on tasks
* `/api/docs` — Swagger UI

---


## 🙋‍♂️ Why I Built This

I built this project to demonstrate my ability to design and develop a **secure, scalable, and user-friendly full-stack application**, showcasing how Python and JavaScript can work together seamlessly. Along the way, I deepened my knowledge of JWT authentication, containerized deployments, and designing intuitive UIs.

---

## 🌟 Future Improvements

* User profile & settings
* Task due dates & reminders
* Collaborative task sharing
* CI/CD pipeline for automated deployments

---*
