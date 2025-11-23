# 🏥 Clinic — Backend (Django + DRF)

This is the backend for the **Clinic** application, built using **Django REST Framework**, **PostgreSQL**, and **Docker**.  
The API manages patients, staff members, vital signs, alerts, and JWT authentication.

---

## 🚀 Technologies Used

- Python 3.11
- Django 5
- Django REST Framework
- SimpleJWT
- PostgreSQL
- Docker & Docker Compose
- drf-spectacular (Swagger)

---

## 📦 Requirements

- Docker
- Docker Compose
- (Optional) Python 3.11 + virtualenv

---

# ▶️ Running the Backend

## 1. Start all containers

```sh
docker-compose up -d --build
```

## 2. Apply database migrations

```sh
docker-compose exec backend python manage.py migrate
```

## 3. Seed initial data

```sh
docker-compose exec backend python manage.py seed_initial_data
```

This creates initial users, staff, and sample patient data.

---

## 🧪 Running Tests

```sh
docker-compose exec backend python manage.py test
```

The test suite covers:

- JWT Login
- `/users/me/` endpoint
- Patients
- Staff
- Vital Records
- Alerts

---

## 🔧 Useful Commands

### Create new migrations

```sh
docker-compose exec backend python manage.py makemigrations
```

### Reset database and rebuild everything

```sh
docker-compose down -v
docker-compose up -d --build
docker-compose exec backend python manage.py migrate
```

---

## 📁 Project Structure

```
backend/
├── clinica/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── core/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│   ├── tests.py
│   └── management/
│       └── commands/
│           └── seed_initial_data.py
│
├── Dockerfile
├── requirements.txt
└── docker-compose.yml
```

---

## 🔐 Authentication (JWT)

### Login

```json
POST /api/auth/login/
{
  "username": "admin",
  "password": "admin123"
}
```

### Refresh token

```json
POST /api/auth/refresh/
```

### Get authenticated user

```json
GET /api/users/me/
```

---

## 📚 API Documentation

Swagger UI:  
`http://localhost:8000/api/schema/swagger/`

OpenAPI JSON:  
`http://localhost:8000/api/schema/`

---

## 🧩 Main Endpoints

### Patients

```
GET /api/patients/
POST /api/patients/
GET /api/patients/{id}/
```

### Staff

```
GET /api/staff/
```

### Vital Records

```
POST /api/vital-records/
GET /api/vital-records/
```

### Alerts

```
GET /api/alerts/
```

---

## 🛠️ Running Without Docker (optional)

```sh
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
