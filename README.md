# jumba-vibecheck

Great! Here's a **well-structured `README.md`** for your project, based on the setup you've described — Vite frontend + Express/MongoDB backend deployed on Firebase and Heroku:

---

```markdown
# VibeCheck — Mood Journal Web App

VibeCheck is a mood journaling application that helps users track, manage, and reflect on their emotions through personal entries. This full-stack web app is built using modern JavaScript technologies with a clean frontend/backend separation.

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

## 🚀 Project Structure

```

Jumba-VibeCheck/
├── Backend/
│   ├── app.js              # Express app config
│   ├── server.js           # Entry point (connects to DB, starts server)
│   ├── controllers/        # Request handlers (auth, journal, etc.)
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routers
│   ├── middleware/         # Auth middleware
│   └── cron/               # Scheduled jobs (e.g. email notifications)
├── Frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.production     # Contains VITE\_API\_URL
│   └── src/
│       ├── pages/          # AuthPage, HomePage, etc.
│       ├── components/     # UI elements
│       └── main.jsx        # App root

````

---

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

## ✅ Features

* ✅ User authentication (signup/login with JWT)
* ✅ Secure journal entry creation and retrieval
* ✅ Scheduled email reminders (cron jobs)
* ✅ Protected routes for user data
* ✅ Full deployment workflow with environment configs

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

```
JWT_KEY=yourSecretKey
DB_CONNECTION_STRING=mongodb+srv://<user>:<pass>@cluster.mongodb.net/...
```

---
