# Clinic Backend – Fullstack Clinical Management System

## 📌 About the Project

This repository contains the **backend** for the _Clinic+_ system — a complete clinical management platform featuring:

- Patient registration
- Healthcare professionals
- Appointment scheduling
- Clinical evolutions with **automatic alert generation**
- Full REST API with JWT authentication
- PostgreSQL integration through Docker
- Swagger documentation

---

## 🏗️ Tech Stack

### **Backend**

- Python 3.11+
- Django 4.2+
- Django REST Framework (DRF)
- SimpleJWT (Authentication)
- drf-spectacular (OpenAPI/Swagger)
- django-auditlog (Audit history)
- Gunicorn (Production WSGI)

### **Database**

- PostgreSQL 14 (via Docker)

### **Infrastructure**

- Docker & Docker Compose
- Environment variables via `.env`

---

## 📁 Project Structure

```
backend/
│
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
├── .env.example
│
└── clinica/
    ├── manage.py
    │
    ├── clinica/
    │   ├── settings.py
    │   ├── urls.py
    │   ├── wsgi.py
    │   └── asgi.py
    │
    └── core/
        ├── models.py
        ├── serializers.py
        ├── views.py
        ├── urls.py
        └── migrations/
```

---

## 🚀 How to Run the Project

### 🔹 1) Running with Docker (Recommended)

Start all services:

```
docker-compose up -d
```

Run migrations:

```
docker-compose exec web python manage.py migrate
```

Create superuser:

```
docker-compose exec web python manage.py createsuperuser
```

---

### 🔹 2) Running Locally (Without Docker)

```
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## 🔑 Authentication (JWT)

### Obtain Token:

```
POST /api/auth/login/
```

Payload:

```json
{
  "username": "admin",
  "password": "admin"
}
```

Use token in requests:

```
Authorization: Bearer <token>
```

---

## 📘 API Documentation

After the server starts:

- Swagger UI → `http://localhost:8000/api/schema/swagger/`
- OpenAPI JSON → `http://localhost:8000/api/schema/`

---

## 🩺 Business Logic – Automatic Alerts

Whenever an **Evolution** is created, the system automatically checks vital signs and generates alerts.

### Trigger Conditions:

- Temperature > **38.5°C**
- Systolic Blood Pressure > **140**
- Heart Rate > **120 bpm**

Generated alerts appear at:

```
GET /api/alerts/
```

Alerts include:

- `warning`
- `critical`

---

## 🛠️ Useful Commands

Stop containers:

```
docker-compose down
```

Stop and delete database volume:

```
docker-compose down -v
```

---

## 👩‍💻 Contributing

Pull requests are welcome!  
Feel free to open issues, suggest improvements, or contribute code.

---

## 📝 License

MIT License.
