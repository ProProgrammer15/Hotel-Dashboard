# 🏨 Hotel Dashboard Platform

This project is a hotel management platform with a modular architecture for backend and frontend services. The backend is built using **FastAPI**, and the frontend will be documented later.

---

## 📦 Tech Stack

### Backend

- FastAPI
- SQLAlchemy (ORM)
- SQLite (local dev)
- Alembic (DB migrations – optional)
- Pytest (unit & integration tests)
- Pydantic & pydantic-settings
- Aiofiles (for async file handling)
- Docker (optional setup)

---

## ⚙️ Prerequisites

Before running the backend locally, ensure the following are installed:

- Python 3.10+
- [Poetry](https://python-poetry.org/docs/) or `pip` (for dependency management)
- `virtualenv` (optional, recommended)
- Git
- Curl (to test APIs optionally)

---

## 🚀 Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/hotel-dashboard.git
cd hotel-dashboard
```

### 2. Set Up Python Environment

Using Poetry (recommended):

```bash
poetry install
poetry shell
```

Or using pip:

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

---

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
PROJECT_NAME=HOTEL DASHBOARD BACKEND
DOCS_URL=/docs
DEBUG=True
PRODUCTION=False
```

> ✅ Note: If `.env` is missing, the app will still run with default values.

---

### 4. Run the Backend Server

```bash
uvicorn app.app:get_application --reload
```

- Runs on: `http://127.0.0.1:8000`

---

## 📘 API Documentation

After starting the server, you can access:

- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **OpenAPI JSON**: [http://127.0.0.1:8000/openapi.json](http://127.0.0.1:8000/openapi.json)

---

## ✅ Testing

Run all tests with coverage:

```bash
pytest --cov=app --cov-report=term-missing
```

To generate an HTML coverage report:

```bash
pytest --cov=app --cov-report=html
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
app/
├── app.py                  # FastAPI app factory
├── config/                 # Settings, DB, dependencies
├── rooms/                  # Room models, schemas, services, routers
├── tests/                  # Full test suite with coverage
├── uploaded_images/        # Room image uploads
```

---

## 📬 Contact

For issues or contributions, open a GitHub issue or contact the maintainer.

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

## 🚀 Setup & Installation

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

`VITE_API_BASE_URL=http://localhost:8000`

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
