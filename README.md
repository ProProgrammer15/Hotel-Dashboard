# 🏨 Hotel Dashboard Platform

This project is a hotel management platform with a modular architecture for backend and frontend services. The backend is built using **FastAPI**, and the frontend will be documented later.

---

## 📦 Tech Stack

### Backend

- FastAPI
- SQLAlchemy (ORM)
- SQLite (local dev)
- Pytest (unit & integration tests)
- Pydantic & pydantic-settings
- Docker

---

## ⚙️ Prerequisites
### 1. **Docker**
Ensure that you have **Docker** and **Docker Compose** installed to easily run the project in a containerized environment.

- **[Docker installation](https://docs.docker.com/get-docker/)**
- **[Docker Compose installation](https://docs.docker.com/compose/install/)**

### 2. **Python 3.10+**
Ensure that you have **Python 3.10+** installed for running the project locally.


## 🚀 Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ProProgrammer15/Hotel-Dashboard.git
cd Hotel-Dashboard
```


### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
PROJECT_NAME=HOTEL DASHBOARD BACKEND
DOCS_URL=/docs
DEBUG=True
PRODUCTION=False
```

> ✅ Note: If `.env` is missing, the app will still run with default values.

---

### 3. Run the Backend Server

```bash
docker-compose up --build
```

- Runs on: `http://0.0.0.0:8000`
- This will run frontend server as well

---

## 📘 API Documentation

After starting the server, you can access:

- **Swagger UI**: [http://0.0.0.0:8000/docs](http://0.0.0.0:8000/docs)
- **OpenAPI JSON**: [http://0.0.0.0:8000/openapi.json](http://0.0.0.0:8000/openapi.json)

---

## ✅ Testing

Run all tests with coverage:

```bash
docker exec -it <container_name> pytest --cov=app --cov-report=term-missing
```

To generate an HTML coverage report:

```bash
docker exec -it <container_name> pytest --cov=app --cov-report=html
open htmlcov/index.html
```

> ✅ 100% test coverage including services, routers, utils, and config modules.

---

## 🧪 Test Features

- Full CRUD coverage for `/rooms` endpoints
- Async file handling for room image uploads
- Validation for JSON and fallback string inputs
- Negative testing for DB and I/O failures
- Clean test database teardown

---

## 📂 Project Structure (Backend)

```
main.py
uploaded_images/
static/
app/
├── app.py                  
├── config/                 
├── rooms/                  
├── tests/                  
├── templates/        
```

---

# 🖼️ Hotel Dashboard Platform – Frontend

This is the **frontend** for the Hotel Dashboard Platform, developed in **React with TypeScript**, styled using **TailwindCSS**, and integrated with **Storybook** for component-driven development. It connects with the FastAPI backend to manage rooms and related data.

---

## 📦 Tech Stack

- React (with TypeScript)
- TailwindCSS
- React Router
- Axios (for API integration)
- Storybook (for UI component development and preview)
- Vite (for fast bundling)

---

## ⚙️ Prerequisites

Ensure the following tools are installed:

- Node.js 18+
- npm (comes with Node)
- Git
- Code Editor (VSCode recommended)

---

## 📘 Directory Structure

```
dashboard_frontend/
└── src/
├── api/ # Axios instances & API services
├── components/ # Reusable components (buttons, modals, etc.)
├── layouts/ # App layout wrappers (navbars)
├── pages/ # Route-based pages (e.g., RoomList, AddRoom)
├── utils/ # Helper functions, constants
├── App.tsx # Root component
└── main.tsx # Entry point
```

## 🚀 Setup & Installation (For local setup)

### 1. Clone the Repository

```bash
cd dashboard_frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variable

Create `.env` in `dashboard_frontend` and paste following:

`VITE_API_ENDPOINT=http://localhost:8000`

### 4. Start the Development Server

```bash
npm run dev
```

App will run on: `http://localhost:5173/` (default Vite port)

## 🧪 Storybook – Component Preview

````bash
npm run storybook```

Opens at: `http://localhost:6006/
````
