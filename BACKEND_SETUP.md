# Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation Steps

### 1. MongoDB Setup

**Option A: Local MongoDB (Windows)**
- Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
- Install MongoDB
- Start MongoDB Service (Run as Administrator):
  ```
  net start MongoDB
  ```

**Option B: MongoDB Atlas (Cloud)**
- Go to https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a cluster
- Get your connection string
- Update `.env` file with your MongoDB Atlas URI:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smartwaste
  ```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Environment Configuration
- The `.env` file is already created with default values
- Update `JWT_SECRET` for production use
- Ensure `MONGODB_URI` points to your MongoDB installation

### 4. Seed Database with Credentials
```bash
npm run seed
```

This will populate your database with 9 test accounts:
- 3 Admin accounts
- 3 Worker accounts  
- 3 Regular User accounts

### 5. Start Backend Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will run on http://localhost:5000

## Test the API
- Health Check: http://localhost:5000/api/health
- Login with any seed account credentials

## 9 Test Credentials Created

### Admins (3)
- sarah.admin@gmail.com | sarah@123
- michael.admin@gmail.com | michael@123
- emily.admin@gmail.com | emily@123

### Workers (3)
- david.worker@gmail.com | david@123
- lisa.worker@gmail.com | lisa@123
- james.worker@gmail.com | james@123

### Users (3)
- john.user@gmail.com | john@123
- jane.user@gmail.com | jane@123
- robert.user@gmail.com | robert@123

## Troubleshooting

**MongoDB connection error:**
- Ensure MongoDB service is running
- Check MONGODB_URI in .env file
- For Windows: Check if MongoDB service is started

**Port already in use:**
- Change PORT in .env file to another port (e.g., 5001)

**Seed script fails:**
- Ensure MongoDB is running
- Delete existing database: `use smartwaste; db.dropDatabase();`
- Run seed again: `npm run seed`
