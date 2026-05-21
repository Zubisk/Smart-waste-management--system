# Backend Quick Reference

## ⚡ Quick Commands

### Prerequisites Check
```bash
node --version      # Should be v14 or higher
npm --version       # Should be v6 or higher
```

### Backend Development

**Install Dependencies:**
```bash
cd backend
npm install
```

**Seed Database with Test Credentials:**
```bash
npm run seed
```

**Start Development Server:**
```bash
npm run dev
```
- Backend runs on: http://localhost:5000
- Auto-reloads on file changes

**Start Production Server:**
```bash
npm start
```

---

## 🗄️ Database Operations

### Connection Details
```
Default: mongodb://localhost:27017/smartwaste
Local MongoDB required or use MongoDB Atlas
```

### Reset Database
If you need to reset the database:
```bash
# In MongoDB shell or Compass:
use smartwaste
db.dropDatabase()
```

Then reseed:
```bash
npm run seed
```

---

## 🔐 Seeded Test Accounts (9 Total)

### Admin Accounts
```
Email: sarah.admin@gmail.com       | Password: sarah@123
Email: michael.admin@gmail.com     | Password: michael@123
Email: emily.admin@gmail.com       | Password: emily@123
```

### Worker Accounts
```
Email: david.worker@gmail.com      | Password: david@123
Email: lisa.worker@gmail.com       | Password: lisa@123
Email: james.worker@gmail.com      | Password: james@123
```

### Regular User Accounts
```
Email: john.user@gmail.com         | Password: john@123
Email: jane.user@gmail.com         | Password: jane@123
Email: robert.user@gmail.com       | Password: robert@123
```

---

## 🧪 API Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Login Test
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "sarah.admin@gmail.com",
    "password": "sarah@123"
  }'
```

### Get All Users (Protected)
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📁 Backend Structure

```
backend/
├── src/
│   ├── server.js               # Main app entry
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── binController.js
│   │   ├── userController.js
│   │   ├── requestController.js
│   │   ├── reportController.js
│   │   └── routeController.js
│   ├── models/                 # Database schemas
│   │   ├── User.js
│   │   ├── Bin.js
│   │   ├── CollectionRequest.js
│   │   ├── Report.js
│   │   └── Route.js
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   ├── binRoutes.js
│   │   ├── userRoutes.js
│   │   ├── requestRoutes.js
│   │   ├── reportRoutes.js
│   │   └── routeRoutes.js
│   ├── middleware/             # Express middleware
│   │   ├── auth.js            # JWT authentication
│   │   └── errorHandler.js    # Error handling
│   └── utils/
│       └── seedData.js         # Database seeding
├── .env                        # Environment variables
├── .gitignore
├── package.json
├── start-backend.bat           # Windows startup script
└── seed-database.bat           # Windows seed script
```

---

## 🔧 Environment Variables (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/smartwaste

# JWT
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
```

**For Production:**
- Change `NODE_ENV=production`
- Use strong JWT_SECRET
- Use MongoDB Atlas instead of local
- Remove sensitive data from logs

---

## 🛠️ Common Issues & Fixes

### Issue: MongoDB Connection Failed
**Fix:** Start MongoDB service
```bash
net start MongoDB
```

### Issue: Port 5000 Already in Use
**Fix:** Change PORT in .env
```env
PORT=5001
```

### Issue: JWT Errors on Login
**Fix:** Ensure JWT_SECRET is set in .env and consistent

### Issue: CORS Errors from Frontend
**Fix:** CORS is enabled by default in server.js
```javascript
app.use(cors());
```

### Issue: Password Hash Mismatch
**Fix:** Password is hashed before saving (bcryptjs)
- Never compare raw password with hashed password
- Use bcrypt.compare() in auth controller

---

## 📊 API Routes Overview

| Method | Route | Authentication | Roles |
|--------|-------|-----------------|-------|
| POST | /api/auth/register | No | All |
| POST | /api/auth/login | No | All |
| GET | /api/bins | Yes | All |
| POST | /api/bins | Yes | Admin, Worker |
| GET | /api/users | Yes | Admin |
| GET | /api/requests | Yes | All |
| POST | /api/requests | Yes | User |
| GET | /api/reports | Yes | Admin |
| GET | /api/routes | Yes | Worker |

---

## 🚀 Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Configure .env file (already done)
3. ✅ Start MongoDB service
4. 🔄 Seed database: `npm run seed`
5. 🔄 Start backend: `npm run dev`
6. 🔄 Start frontend: `cd ../frontend && npm run dev`
7. 🌐 Open browser: http://localhost:5173

---

## 📚 Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

## ✏️ Notes

- All passwords in seed data are hashed using bcryptjs before storage
- JWT tokens expire after 7 days (configurable in .env)
- All email addresses are unique (enforced at database level)
- Role-based access control is implemented for protected routes
