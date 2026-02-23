# Patient Portfolio

A full-stack patient management application built with **FastAPI**, **React (Vite)**, and **PostgreSQL**.

---

## Prerequisites

- **Python** 3.11+
- **Node.js** 18+
- **PostgreSQL** 15+ (running on `localhost:5432`)

---

## Getting Started

### 1. Create the Database

Open **pgAdmin** or **psql** (connected to the default `postgres` database) and run:

```sql
CREATE DATABASE patient_portfolio;
```

### 2. Start the Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

> Tables are **auto-created** on startup — no need to run the SQL file manually.

The API will be available at **http://localhost:8000**

- Health check → `http://localhost:8000/health`
- API docs → `http://localhost:8000/docs`

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Optional: Run the SQL File

If you prefer to create the tables manually (instead of auto-init on startup):

```bash
psql -U postgres -d patient_portfolio -f patient_portfolio.sql
```

---

## Environment Variables

Backend config is in `backend/.env`:

| Variable | Default |
|----------|---------|
| `POSTGRES_DB` | `patient_portfolio` |
| `POSTGRES_USER` | `postgres` |
| `POSTGRES_PASSWORD` | `1234` |
| `POSTGRES_HOST` | `localhost` |
| `POSTGRES_PORT` | `5432` |
| `CORS_ORIGINS` | `http://localhost:5173` |
