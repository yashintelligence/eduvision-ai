# 🚀 EduVision AI 2.0 – Vercel & Cloud Deployment Guide
## (વિદ્યાર્થી પ્રદર્શન આગાહી અને માર્ગદર્શન પ્રણાલી - વિજ્ઞાન મેળો ૨૦૨૬)

This document provides a step-by-step guide to deploying **EduVision AI 2.0**:
1. **Frontend:** Deployed to **Vercel** (Global Edge CDN, Ultra-fast Next.js 14).
2. **Backend:** Deployed to **Render**, **Railway**, or **Koyeb** (FastAPI + scikit-learn ML engine).

> [!NOTE]
> **Resilient Standalone Support:** The Next.js frontend has a built-in fallback engine loaded with the authentic trained Gradient Boosting regression weights ($R^2 = 0.8138$), 395-student dataset analytics, and 100% Gujarati recommendations. Even before you deploy the Python backend, the Vercel deployment is **100% fully functional** out of the box!

---

## 🌟 Part 1: Deploy Frontend to Vercel

### Method A: Deploy Using Vercel CLI (Fastest & Direct)

1. Open your terminal and navigate to the project directory:
   ```bash
   cd /Users/yashpatel/.gemini/antigravity/scratch/eduvision-ai/frontend
   ```

2. Run the Vercel CLI tool:
   ```bash
   npx vercel
   ```
   * It will ask to log in to Vercel (via GitHub or browser).
   * Confirm project settings (press Enter to accept defaults).
   * When asked *"Link to existing project?"*, choose `No`.
   * When asked *"What's your project's name?"*, enter `eduvision-ai`.
   * When asked *"In which directory is your code located?"*, press Enter (`./`).

3. For production deployment:
   ```bash
   npx vercel --prod
   ```

🎉 Your site will be live at `https://eduvision-ai.vercel.app` (or your custom Vercel URL)!

---

### Method B: Deploy Using GitHub + Vercel Dashboard (Recommended for Continuous Updates)

1. **Initialize Git & Push to GitHub:**
   ```bash
   cd /Users/yashpatel/.gemini/antigravity/scratch/eduvision-ai
   git init
   git add .
   git commit -m "EduVision AI 2.0 - Science Fair Release"
   ```
   Create a new repository on [GitHub](https://github.com/new) named `eduvision-ai`, then run:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/eduvision-ai.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   * Go to [vercel.com/new](https://vercel.com/new).
   * Select your `eduvision-ai` repository and click **Import**.
   * In **Configure Project**:
     * **Framework Preset:** `Next.js`
     * **Root Directory:** Click *Edit* and select `frontend` (or leave default root, as `vercel.json` is preconfigured).
     * **Build Command:** `next build` (default)
     * **Output Directory:** `.next` (default)
   * Click **Deploy**!

---

## 🐍 Part 2: Deploy Backend (FastAPI ML Server)

Deploy the Python backend on a free hosting platform such as **Render** or **Railway**:

### Option 1: Deploy on Render.com (Free)

1. Sign in to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository `eduvision-ai`.
4. Configure the service:
   * **Name:** `eduvision-ai-backend`
   * **Root Directory:** `backend`
   * **Environment:** `Python 3`
   * **Build Command:** `pip install -r requirements.txt`
   * **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   * **Plan:** Free
5. Click **Create Web Service**.
6. Once deployed, Render will provide a URL, e.g.: `https://eduvision-ai-backend.onrender.com`.

---

## 🔗 Part 3: Connect Frontend to Backend

1. Open your project on the [Vercel Dashboard](https://vercel.com).
2. Go to **Settings** -> **Environment Variables**.
3. Add a new variable:
   * **Key:** `NEXT_PUBLIC_API_URL`
   * **Value:** `https://eduvision-ai-backend.onrender.com` (Your Render backend URL, without trailing slash)
4. Go to **Deployments**, click the three dots on the latest deployment, and click **Redeploy**.

Now your Vercel frontend is directly linked to your cloud-hosted FastAPI ML model!

---

## 🏫 Project Details for Science Fair
* **School:** એમ. એમ. કરોડિયા પ્રાથમિક શાળા, તરસાડી કોસંબા (R.S)
* **Mentor Teacher:** શ્રી મનોજભાઈ પરમાર
* **Developer:** યશ પટેલ
