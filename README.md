# 📍 Local Event Networking App

A full-stack mobile application for discovering and attending local events — built with **React Native** (client) and **Node.js + Express + MongoDB** (server). Features real-time notifications via Socket.io, map-based event discovery with clustering, ticket management, payments, and multi-language support.

---

## ✨ Features

- 🗺️ **Map-based Event Discovery** — browse nearby events on an interactive map with cluster grouping (`react-native-maps` + `react-native-map-clustering`)
- 🎫 **Ticket & Registration System** — register for events and manage tickets
- 💳 **Payment Integration** — payment processing with dedicated payment routes and models
- 🔔 **Real-time Notifications** — Socket.io powered live event notifications
- 🔐 **JWT Authentication** — secure login/signup with bcrypt password hashing and cookie-based sessions
- 📷 **Image Uploads** — event and user profile image uploads via Multer
- 🌍 **Multi-language Support** — i18n via `i18next` + `react-i18next` (locale-ready)
- 📧 **Email Notifications** — transactional emails via Nodemailer
- 📦 **Offline Support** — AsyncStorage for local data persistence
- 🌙 **Redux State Management** — Redux Toolkit for global app state

---

## 🏗️ Architecture

```
Local-Event-Networking-App/
├── client/          # React Native mobile app (TypeScript)
└── server/          # Node.js + Express REST API
```

### Client → Server Communication

```
React Native (Axios)  ──►  Express REST API  ──►  MongoDB
React Native          ◄──►  Socket.io          ──►  Real-time Notifications
```

---

## 🛠️ Tech Stack

### Mobile Client
![React Native](https://img.shields.io/badge/React_Native_0.76-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)

| Library | Purpose |
|---------|---------|
| React Native 0.76 | Cross-platform mobile framework |
| TypeScript | Type-safe development |
| React Navigation (Stack + Tabs) | Screen navigation |
| Redux Toolkit | Global state management |
| react-native-maps | Interactive event map |
| react-native-map-clustering | Map marker clustering |
| react-hook-form | Form validation |
| i18next / react-i18next | Multi-language support |
| AsyncStorage | Local data persistence |
| Axios | HTTP API client |
| react-native-image-picker | Camera & gallery image upload |
| react-native-permissions | Device permission handling |
| react-native-modal-datetime-picker | Event date/time selection |

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

| Library | Purpose |
|---------|---------|
| Express | REST API framework |
| MongoDB + Mongoose | Database & ODM |
| Socket.io | Real-time notifications |
| JWT + bcryptjs | Authentication & password hashing |
| Multer | File/image upload handling |
| Nodemailer | Email notifications |
| Helmet | HTTP security headers |
| Morgan | Request logging |

---

## 📡 API Overview

| Module | Routes |
|--------|--------|
| Auth & Users | `POST /api/users/register`, `POST /api/users/login`, `GET /api/users/profile` |
| Events | `GET /api/event`, `POST /api/event`, `PUT /api/event/:id`, `DELETE /api/event/:id` |
| Tickets | `POST /api/tickets`, `GET /api/tickets/:userId` |
| Payments | `POST /api/payments`, `GET /api/payments/:id` |
| Notifications | `GET /api/notifications` + Socket.io real-time channel |

---

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── screens/        # App screens (Home, Map, Event Detail, Profile...)
│   │   ├── components/     # Reusable UI components
│   │   ├── navigation/     # Stack & Bottom Tab navigators
│   │   ├── redux/          # Redux Toolkit store & slices
│   │   ├── context/        # React context providers
│   │   ├── constants/      # App-wide constants
│   │   ├── locales/        # i18n translation files
│   │   └── i18n.js         # i18next configuration
│   └── App.tsx
│
└── server/
    ├── controllers/        # Route handler logic (incl. Socket.io init)
    ├── models/             # Mongoose schemas
    │   ├── eventModel.js
    │   ├── ticketModel.js
    │   ├── paymentModel.js
    │   └── registration.js
    ├── routes/             # Express route definitions
    ├── middleware/         # Auth middleware (JWT verification)
    ├── utils/              # MongoDB connection, helpers
    ├── upload/             # Uploaded images (served statically)
    └── index.js            # App entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- React Native CLI
- Android Studio / Xcode

### Backend Setup

```bash
cd server
npm install

# Configure environment variables
cp .env.example .env
```

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/local_events
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

```bash
npm start   # Starts server with nodemon on http://localhost:4000
```

### Client Setup

```bash
cd client
npm install

# iOS only
cd ios && pod install && cd ..
```

```env
# client/.env
API_BASE_URL=http://localhost:4000/api
```

```bash
# Android
npm run android

# iOS
npm run ios
```

---

## 📄 License

MIT © [Bilal Hussain](https://github.com/mbilalhussain15)
