# VibeCheck — Mood Journal Web App

VibeCheck is a mood journaling application that helps users track, manage, and reflect on their emotions through personal entries. This full-stack web app is built using modern JavaScript technologies with a clean frontend/backend separation.

---


# Features

✅ User authentication (signup/login with JWT)

✅ Secure journal entry creation and retrieval

✅ Scheduled email reminders (cron jobs)

✅ Protected routes for user data

✅ Full deployment workflow with environment configs

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
- **Deployment:** Heroku

---

## 🛠 Architectural Diagram

<img width="851" alt="Screenshot 2025-05-08 at 02 28 00" src="https://github.com/user-attachments/assets/dd2c0b20-6a93-456a-b4df-ef0c84dfd407" />


## 🌐 Deployment

### Frontend (Firebase Hosting)

```bash
cd Frontend
npm install
npm run build:prod     # Uses .env.production
firebase deploy
````

Ensure `.env.production` has the live API URL:

```
VITE_API_URL=https://<your-heroku-app>.herokuapp.com/api
```

---

### Backend (Heroku)

```bash
cd Backend
npm install
git push heroku main
```

Make sure these config vars are set on Heroku:

```bash
heroku config:set JWT_KEY=yourSecretKey
heroku config:set DB_CONNECTION_STRING=<your MongoDB URI>
```

---


## 🧪 Testing

To run backend tests (if using Jest):

```bash
npm run test
```

---

## 📦 Environment Variables

### Frontend (`Frontend/.env.production`)

```
VITE_API_URL=https://<your-heroku-backend>/api
```

### Backend (Heroku config or `.env` for local)


JWT_KEY=yourSecretKey
DB_CONNECTION_STRING=mongodb+srv://<user>:<pass>@cluster.mongodb.net/...
```

---
