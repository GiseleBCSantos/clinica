# Clinic+ Frontend

Clinical management system built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**.

---

## 🚀 Technologies

- **React 18** — UI library
- **TypeScript** — Static typing
- **Vite** — Fast build tool and dev server
- **React Router DOM** — Routing
- **Axios** — HTTP client
- **TailwindCSS** — Utility-first styling
- **Context API** — Authentication state management

---

## 📋 Requirements

- Node.js 18+
- npm or yarn
- Backend running at: **http://localhost:8000**

---

## 🔧 Installation

### 1. Clone the repository or extract the ZIP

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file:

```bash
cp .env.example .env
```

Set your backend URL:

```
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:  
👉 **http://localhost:3000**

---

## 📦 Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run linter               |

---

## 🏗️ Project Structure

```
src/
├── pages/
├── components/
│   ├── ui/
│   ├── layout/
│   └── domain/
├── services/
├── hooks/
├── context/
├── router/
├── utils/
├── App.tsx
└── main.tsx
```

---

## 🔑 Authentication (JWT)

The application uses **JWT authentication with refresh tokens**:

- Tokens stored in `localStorage`
- Axios interceptor adds token to requests automatically
- Automatic refresh when token expires
- Redirects to login if not authenticated

---

## 🎨 Styling

- Utility-first styling with **TailwindCSS**
- Clean, medical-themed UI (blue tones)
- Reusable UI components under `src/components/ui/`
- Mobile-first responsive design

---

## 📡 Backend Integration (Updated Endpoints)

The backend exposes the following routes, based on the Django router configuration:

---

### 🔐 Authentication

#### Login

```
POST /api/auth/login/
```

#### Refresh Token

```
POST /api/auth/refresh/
```

#### Current User

```
GET /api/users/me/
```

---

## 🧩 Core Resources

### 👥 Patients

```
GET    /api/patients/
POST   /api/patients/
GET    /api/patients/{id}/
```

### 🧑‍⚕️ Staff

```
GET /api/staff/
```

### ❤️ Vital Records

```
GET  /api/vital-records/
POST /api/vital-records/
PUT /api/vital-records/{id}/
```

### 🚨 Alerts

```
GET  /api/alerts/
POST /api/alerts/
```

---

## 🚀 Deployment

### Build for production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview the production build

```bash
npm run preview
```

### Deployment

- **Vercel**

Set the production API URL:

```
VITE_API_BASE_URL=https://your-production-url.com/api
```

---

## 🔒 Security

- JWT tokens handled securely
- Form validation
- Private routes access control
- Input sanitization
- Backend CORS configured

---

## 📝 License

This project is private and proprietary.

---

## 👥 Support

For questions or issues, contact the development team.
