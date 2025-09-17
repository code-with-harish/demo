# 🚀 **Professional Deployment Guide**

## **Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - Ayur Diet Prototype"
```

Create a new repository on GitHub, then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/ayur-diet-prototype.git
git branch -M main
git push -u origin main
```

## **Step 2: Deploy Backend on Railway**

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `ayur-diet-prototype` repository
5. Choose "Deploy from folder" → Select `backend`
6. Railway will auto-detect Node.js and deploy
7. **Copy your backend URL**: `https://your-app-name.railway.app`

## **Step 3: Update Frontend API URL**

Update the API endpoint in your frontend:
- File: `frontend/pages/patient.js`
- Line 30: Change `http://localhost:5000/diet` to `https://your-backend-url.railway.app/diet`

## **Step 4: Deploy Frontend on Vercel**

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your `ayur-diet-prototype` repository
5. Set **Root Directory** to `frontend`
6. Click "Deploy"
7. **Copy your frontend URL**: `https://your-app-name.vercel.app`

## **🎯 Final Result**
- ✅ **Backend**: `https://your-backend.railway.app`
- ✅ **Frontend**: `https://your-frontend.vercel.app`
- ✅ **Share these URLs with your team!**

## **📱 Demo URLs for Teammates**
Send your team:
1. **Live App**: `https://your-frontend.vercel.app`
2. **API Health**: `https://your-backend.railway.app`

No installation required - works instantly! 🔥