# 🚀 Ayur Diet - Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- npm

## Quick Setup (2 terminals needed)

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```
✅ Backend will run on: http://localhost:5000

### Terminal 2 - Frontend  
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend will run on: http://localhost:3000

## 🎯 Test the App
1. Open browser: http://localhost:3000
2. Click "Get Started"
3. Fill patient form
4. View diet plan
5. Export PDF

## 🐛 Troubleshooting
- **Port already in use?** Kill process or change PORT in server.js
- **Dependencies issue?** Delete node_modules, run `npm install` again
- **Styles not loading?** Restart frontend server

## 📱 Demo Flow
Home → Patient Form → Diet Plan → PDF Export

---