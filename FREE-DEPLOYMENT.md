# 🚀 **Free Deployment Options (No Railway)**

## **Option 1: Render.com (Recommended)**

### **Backend Deployment:**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (free)
3. "New" → "Web Service"
4. Connect your repo → **Root Directory**: `backend`
5. **Build Command**: `npm install`
6. **Start Command**: `npm start`
7. Deploy (takes 2-3 minutes)

### **Frontend Deployment:**
1. Same Render account → "New" → "Static Site"
2. Connect repo → **Root Directory**: `frontend`
3. **Build Command**: `npm run build && npm run export`
4. **Publish Directory**: `out`

**Result:** 
- Backend: `https://your-backend.onrender.com`
- Frontend: `https://your-frontend.onrender.com`

---

## **Option 2: Vercel (All-in-One)**

✅ **I've already converted your project for Vercel!**

### **Single Deployment (Frontend + API):**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. **Root Directory**: `frontend`
4. Deploy!

**Your API will be at:** `https://your-app.vercel.app/api/diet`

---

## **Option 3: Netlify + Heroku**
- **Frontend**: Netlify (free)
- **Backend**: Heroku (free tier available)

---

## **🎯 Recommendation:**
Use **Render** - most similar to Railway with generous free tier!

**Frontend + Backend URLs in 5 minutes! 🔥**