# Clinic+ Backend Service

## 📌 About the Project

This repository contains the **RESTful API** for the _Clinic+_ system. It serves as the core logic layer for the clinical management platform, handling data persistence, authentication, and critical business rules.

**Key Features:**

- **Role-Based Access Control:** Distinction between administrative users and medical staff (Doctors/Nurses).
- **Patient Management:** Full CRUD for patient records with priority tracking.
- **Vital Records:** Logging of temperature, blood pressure, and heart rate.
- **🤖 Automated Alert System:** Background logic that creates alerts immediately when abnormal vital signs are detected.
- **Security:** JWT (JSON Web Token) Authentication with refresh rotation.
- **Documentation:** Automatic Swagger/OpenAPI generation.

---

## 🏗️ Tech Stack

### **Core**

- **Python 3.11+**
- **Django 4.2+**
- **Django REST Framework (DRF)**

### **Key Libraries**

- **SimpleJWT:** Authentication & Token management.
- **drf-spectacular:** OpenAPI 3.0 schema generation.
- **django-cors-headers:** Cross-Origin Resource Sharing support.
- **django-filter:** Advanced filtering for API endpoints.

### **Infrastructure**

- **Docker & Docker Compose:** Containerization.
- **PostgreSQL:** Production database (SQLite for dev).
- **Gunicorn:** WSGI HTTP Server.
- **GitHub Actions:** CI/CD Pipeline.

---

## 📁 Project Structure

```text
backend/
│
├── docker-compose.yml      # Orchestration for Dev/Prod
├── Dockerfile              # Python image definition
├── requirements.txt        # Python dependencies
├── .env.example            # Template for environment variables
│
└── clinica/                # Project Root
    ├── manage.py           # Django CLI entry point
    │
    ├── clinica/            # Settings folder
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    │
    └── core/               # Main Application
        ├── models.py       # Database Schema (Patient, Staff, VitalRecord, Alert)
        ├── serializers.py  # JSON Converters
        ├── views.py        # API Controllers & ViewSets
        ├── urls.py         # API Routing
        └── tests.py        # Unit & Integration Tests
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
