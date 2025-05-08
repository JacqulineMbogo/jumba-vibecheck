# VibeCheck — Mood Journal Web App

VibeCheck is a mood journaling application that helps users track, manage, and reflect on their emotions through personal entries. This full-stack web app is built using modern JavaScript technologies with a clean frontend/backend separation.

---

# Features

✅ User authentication (signup/login with JWT)

✅ Secure journal entry creation and retrieval

✅ Scheduled email reminders (cron jobs)

✅ Protected routes for user data

✅ Full deployment workflow with environment configs

✅ Tests (Jest)

---

## 🛠 Tech Stack

### Frontend

- **Framework:** [Vite](https://vitejs.dev/) + React
- **UI Library:** Ant Design
- **Routing:** React Router
- **Deployment:** Firebase Hosting

### Backend

- **Framework:** Node.js + Express
- **Database:** MongoDB Atlas
- **ORM:** Mongoose
- **Security:** JWT authentication
- **Scheduled Tasks:** Node-cron (e.g. email reminders)
- - **Deployment:** Jest
- **Deployment:** Heroku

---

## 🛠 Architectural Diagram

<img width="851" alt="Screenshot 2025-05-08 at 11 15 45" src="https://github.com/user-attachments/assets/737ac34e-4e25-4388-8cc5-4eb962740b00" />


## 🌐 Local Development

### Docker

Build and start all services:

```bash
docker-compose up --build
```

Frontend: http://localhost:3000

Backend API: http://localhost:5001

## 🧪 Testing

To run backend tests:

```bash
cd Backend
npm run test
```
