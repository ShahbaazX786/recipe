<h1 align="center">🍽️ React Native Recipe App 🍽️</h1>

![Demo App](/frontend/assets/images//screenshot-for-readme.png)

Highlights:

- 🔐 Signup, Login, and 6-Digit Email Verification with **Clerk**
- 🍳 Browse Featured Recipes & Filter by Categories
- 🔍 Search Recipes and View Detailed Cooking Instructions
- 🎥 Recipe Pages Include YouTube Video Tutorials
- ❤️ Add Recipes to Favorites and Access Them from Favorites Tab
- ⚡ Tech Stack: React Native + Express + PostgreSQL + Expo
- 🌈 Includes 8 Color Themes
- 🆓 100% Free Tools — No Paid Services Required

---

## 🧪 .env Setup

### Mobile App (`/frontend`)

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY= Get this from Clerk.
EXPO_PUBLIC_API_URL= Your hosted Backend Url here.
```

### Backend (`/backend`)

```bash
PORT= 7200
DATABASE_URL= Get this from Neon DB.
NODE_ENV= development (no need to have this in prod)
```

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 📱 Then Run the Mobile App

```bash
cd mobile
npm install
npx expo start
```