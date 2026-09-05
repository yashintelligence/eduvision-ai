const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE_DIR = '/Users/yashpatel/.gemini/antigravity/scratch/eduvision-ai';
const IMG_DIR = path.join(BASE_DIR, 'extracted_images');
const OUT_DIR = path.join(BASE_DIR, 'reports');
const SLIDES_DIR = path.join(OUT_DIR, 'carousel_slides');
if (!fs.existsSync(SLIDES_DIR)) {
  fs.mkdirSync(SLIDES_DIR, { recursive: true });
}

function getBase64(imgName) {
  const p = path.join(IMG_DIR, imgName);
  if (fs.existsSync(p)) {
    const ext = path.extname(p).slice(1);
    const data = fs.readFileSync(p).toString('base64');
    return `data:image/${ext === 'jpg' ? 'jpeg' : ext};base64,${data}`;
  }
  return '';
}

const IMGS = {
  cover: getBase64('page_1_img_2_X1.jpg'),
  working: getBase64('page_3_img_2_X5.jpg'),
  modelPerf: getBase64('page_8_img_3_X15.jpg'),
  integration: getBase64('page_9_img_2_X17.jpg'),
  benefits: getBase64('page_10_img_2_X19.jpg'),
};

function getCarouselHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EduVision AI - LinkedIn Carousel</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: 1080px 1080px;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #020617;
      color: #ffffff;
      -webkit-font-smoothing: antialiased;
    }
    .slide {
      width: 1080px;
      height: 1080px;
      padding: 55px 65px;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      background: #030712;
    }
    /* Dynamic Cosmic Background Gradients */
    .slide::before {
      content: "";
      position: absolute;
      top: -150px;
      right: -150px;
      width: 650px;
      height: 650px;
      background: radial-gradient(circle, rgba(0, 242, 254, 0.18) 0%, transparent 70%);
      pointer-events: none;
    }
    .slide::after {
      content: "";
      position: absolute;
      bottom: -150px;
      left: -150px;
      width: 650px;
      height: 650px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%);
      pointer-events: none;
    }

    /* Top Navigation Bar */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
    }
    .brand-tag {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(15, 23, 42, 0.85);
      border: 1.5px solid rgba(56, 189, 248, 0.4);
      padding: 10px 22px;
      border-radius: 999px;
      font-size: 18px;
      font-weight: 800;
      color: #38bdf8;
      font-family: 'Outfit', sans-serif;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 20px rgba(0, 242, 254, 0.15);
    }
    .brand-tag span.dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #00f2fe;
      box-shadow: 0 0 12px #00f2fe;
    }
    .slide-num {
      font-family: 'Outfit', sans-serif;
      font-size: 18px;
      font-weight: 800;
      color: #ffffff;
      background: rgba(15, 23, 42, 0.8);
      border: 1.5px solid rgba(255, 255, 255, 0.18);
      padding: 10px 22px;
      border-radius: 999px;
      letter-spacing: 1px;
    }

    /* Content Layout */
    .content-box {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .hook-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      align-self: flex-start;
      font-family: 'Outfit', sans-serif;
      font-size: 18px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.8px;
      color: #00f2fe;
      background: rgba(0, 242, 254, 0.12);
      border: 1.5px solid rgba(0, 242, 254, 0.4);
      padding: 10px 24px;
      border-radius: 999px;
      box-shadow: 0 0 25px rgba(0, 242, 254, 0.15);
    }

    h1.slide-title {
      font-family: 'Outfit', sans-serif;
      font-size: 58px;
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -0.5px;
      color: #ffffff;
    }
    h1.slide-title span.glow-text {
      color: #00f2fe;
      text-shadow: 0 0 25px rgba(0, 242, 254, 0.6);
    }
    h1.slide-title span.warn-text {
      color: #ff4b2b;
      text-shadow: 0 0 25px rgba(255, 75, 43, 0.5);
    }
    h1.slide-title span.gold-text {
      color: #fbbf24;
      text-shadow: 0 0 25px rgba(251, 191, 36, 0.5);
    }

    p.slide-desc {
      font-size: 26px;
      line-height: 1.5;
      color: #f1f5f9;
      font-weight: 600;
    }

    /* Grid Feature Cards */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 18px;
    }

    .feature-card {
      background: rgba(15, 23, 42, 0.9);
      border: 1.5px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      padding: 26px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 10px;
    }
    .feature-card.highlight {
      border: 1.5px solid rgba(0, 242, 254, 0.6);
      background: linear-gradient(180deg, rgba(14, 165, 233, 0.18) 0%, rgba(15, 23, 42, 0.95) 100%);
      box-shadow: 0 15px 35px rgba(0, 242, 254, 0.15);
    }
    .feature-card.danger {
      border: 1.5px solid rgba(239, 68, 68, 0.4);
      background: linear-gradient(180deg, rgba(239, 68, 68, 0.12) 0%, rgba(15, 23, 42, 0.95) 100%);
    }

    .feature-badge {
      font-family: 'Outfit', sans-serif;
      font-size: 22px;
      font-weight: 900;
      color: #00f2fe;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .feature-title {
      font-family: 'Outfit', sans-serif;
      font-size: 25px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.25;
    }
    .feature-desc {
      font-size: 20px;
      color: #f1f5f9;
      line-height: 1.5;
      font-weight: 500;
    }

    /* Stat Pill */
    .stat-pill {
      background: rgba(15, 23, 42, 0.92);
      border: 1.5px solid rgba(0, 242, 254, 0.5);
      border-radius: 20px;
      padding: 22px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 6px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), inset 0 2px 10px rgba(0, 242, 254, 0.1);
    }
    .stat-pill .num {
      font-family: 'Outfit', sans-serif;
      font-size: 44px;
      font-weight: 900;
      color: #00f2fe;
      line-height: 1;
      text-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
    }
    .stat-pill .label {
      font-size: 19px;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.2;
    }
    .stat-pill .sub {
      font-size: 15px;
      color: #94a3b8;
      font-weight: 600;
    }

    /* Comparison Box */
    .comp-box {
      background: rgba(15, 23, 42, 0.95);
      border: 1.5px solid rgba(255, 255, 255, 0.15);
      border-radius: 22px;
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    }
    .comp-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      gap: 16px;
    }
    .comp-row.winner {
      background: linear-gradient(90deg, rgba(0, 242, 254, 0.2) 0%, rgba(14, 165, 233, 0.12) 100%);
      border: 2px solid #00f2fe;
      box-shadow: 0 0 25px rgba(0, 242, 254, 0.3);
    }
    .comp-model {
      font-family: 'Outfit', sans-serif;
      font-size: 24px;
      font-weight: 800;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
    }
    .comp-metrics {
      display: flex;
      gap: 24px;
      font-family: 'Outfit', sans-serif;
      font-size: 22px;
      font-weight: 800;
      color: #f8fafc;
      white-space: nowrap;
    }

    /* Visual Media Cards */
    .card-media {
      background: rgba(15, 23, 42, 0.9);
      border: 1.5px solid rgba(56, 189, 248, 0.4);
      border-radius: 22px;
      padding: 18px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .card-media img {
      max-height: 320px;
      max-width: 100%;
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    }

    /* Bottom Bar */
    .bottom-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 10;
      border-top: 1.5px solid rgba(255, 255, 255, 0.12);
      padding-top: 22px;
    }
    .author-info {
      font-size: 18px;
      color: #cbd5e1;
      font-weight: 600;
    }
    .author-info strong {
      color: #ffffff;
      font-weight: 800;
    }
    .swipe-pill {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: 'Outfit', sans-serif;
      font-size: 18px;
      font-weight: 900;
      color: #030712;
      background: #00f2fe;
      padding: 10px 24px;
      border-radius: 999px;
      text-transform: uppercase;
      letter-spacing: 1px;
      box-shadow: 0 0 25px rgba(0, 242, 254, 0.5);
    }
  </style>
</head>
<body>

  <!-- ================================================================= -->
  <!-- SLIDE 1: ULTRA-MAGNETIC HOOK / COVER                              -->
  <!-- ================================================================= -->
  <div class="slide">
    <div class="top-bar">
      <div class="brand-tag"><span class="dot"></span> EduVision AI 2.0</div>
      <div class="slide-num">01 / 08</div>
    </div>

    <div class="content-box" style="gap: 22px;">
      <div class="hook-badge">⚡ Science Fair 2026 • AI Innovation</div>
      
      <h1 class="slide-title" style="font-size: 64px; line-height: 1.15;">
        Can AI Predict <span class="glow-text">Student Failure</span>...<br>Before Exams Even Start?
      </h1>
      
      <p class="slide-desc" style="font-size: 28px; color: #ffffff;">
        Traditional report cards tell parents what went wrong <span style="color: #00f2fe; font-weight: 800; text-decoration: underline;">after</span> final marks are locked. We engineered an intelligent, early-warning ML mentorship platform to intervene proactively.
      </p>

      <!-- 3 Instant Proof-Point Stat Cards -->
      <div class="grid-3" style="margin-top: 8px;">
        <div class="stat-pill">
          <div class="num">81.4%</div>
          <div class="label">Prediction Accuracy</div>
          <div class="sub">Gradient Boosting Engine</div>
        </div>
        <div class="stat-pill">
          <div class="num">12 Core</div>
          <div class="label">Student Indicators</div>
          <div class="sub">Attendance, Habits & Study</div>
        </div>
        <div class="stat-pill">
          <div class="num">1-Page</div>
          <div class="label">Instant Report Card</div>
          <div class="sub">Official School Seal</div>
        </div>
      </div>

      <!-- Live Web Demo Badge Preview -->
      <div style="background: linear-gradient(90deg, rgba(0, 242, 254, 0.16) 0%, rgba(99, 102, 241, 0.16) 100%); border: 1.5px solid rgba(0, 242, 254, 0.5); border-radius: 18px; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 14px;">
          <span style="font-size: 32px;">🌐</span>
          <div>
            <div style="font-size: 20px; font-weight: 800; color: #ffffff;">Live Cloud Application Deployed on Vercel</div>
            <div style="font-size: 17px; color: #38bdf8; font-weight: 700;">https://eduvision-ai-kappa.vercel.app</div>
          </div>
        </div>
        <div style="background: #00f2fe; color: #030712; font-family: 'Outfit'; font-weight: 900; font-size: 16px; padding: 8px 18px; border-radius: 999px;">
          TESTED & LIVE ➔
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="author-info">
        By <strong>Yash Patel</strong> • Mentored by <strong>Shri Manojbhai Parmar</strong>
      </div>
      <div class="swipe-pill">Swipe to Discover ➔</div>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- SLIDE 2: THE PROBLEM (WHY TRADITIONAL EDUCATION FAILS)             -->
  <!-- ================================================================= -->
  <div class="slide">
    <div class="top-bar">
      <div class="brand-tag"><span class="dot"></span> The Critical Crisis</div>
      <div class="slide-num">02 / 08</div>
    </div>

    <div class="content-box" style="gap: 20px;">
      <div class="hook-badge" style="color: #ff4b2b; border-color: rgba(255, 75, 43, 0.4); background: rgba(255, 75, 43, 0.1);">
        ⚠️ The Systemic Flaw
      </div>

      <h1 class="slide-title">
        Why Traditional School Report Cards Are <span class="warn-text">Fatally Broken</span>:
      </h1>

      <p class="slide-desc">
        Teachers manage 40+ students per classroom. Spotting silent behavioral dropouts before final exams is nearly impossible without intelligent data.
      </p>

      <div class="grid-2">
        <div class="feature-card danger">
          <div class="feature-badge" style="color: #ff4b2b;">❌ 01. Post-Mortem Analysis</div>
          <div class="feature-title">Interventions Happen Too Late</div>
          <div class="feature-desc">Corrective tutoring only begins after a student fails final exams, leaving zero recovery time.</div>
        </div>

        <div class="feature-card danger">
          <div class="feature-badge" style="color: #ff4b2b;">❌ 02. Invisible Behavioral Clues</div>
          <div class="feature-title">Silent Warning Signs Ignored</div>
          <div class="feature-desc">Micro-absences and subtle study drops silently degrade comprehension weeks before any test paper is written.</div>
        </div>

        <div class="feature-card danger">
          <div class="feature-badge" style="color: #ff4b2b;">❌ 03. Vague & Generic Feedback</div>
          <div class="feature-title">"Study Harder" Is Not A Strategy</div>
          <div class="feature-desc">Students get no concrete targets. They need exact study hour benchmarks and focused intervention roadmaps.</div>
        </div>

        <div class="feature-card highlight">
          <div class="feature-badge">💡 04. The AI Solution</div>
          <div class="feature-title">Proactive Early Intervention</div>
          <div class="feature-desc">Machine learning flags at-risk students months before exams with tailored step-by-step recovery plans.</div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="author-info">M. M. Karodiya Primary School • Tarsadi Kosamba</div>
      <div class="swipe-pill">Swipe Next ➔</div>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- SLIDE 3: THE SOLUTION & SYSTEM ARCHITECTURE                       -->
  <!-- ================================================================= -->
  <div class="slide">
    <div class="top-bar">
      <div class="brand-tag"><span class="dot"></span> How EduVision AI Works</div>
      <div class="slide-num">03 / 08</div>
    </div>

    <div class="content-box" style="gap: 20px;">
      <div class="hook-badge">🧠 Intelligent Architecture</div>

      <h1 class="slide-title">
        Meet <span class="glow-text">EduVision AI</span>: Proactive Student Mentorship
      </h1>

      <p class="slide-desc">
        Trained on 395 real-world student longitudinal profiles (UCI Benchmark), predicting final grades (G3) with over 81% precision.
      </p>

      <div class="card-media">
        <img src="${IMGS.working}" style="max-height: 310px;" alt="Working Architecture">
      </div>

      <div class="grid-3" style="margin-top: 5px;">
        <div class="feature-card" style="padding: 20px;">
          <div class="feature-title" style="font-size: 22px; color: #38bdf8;">📥 12 Core Inputs</div>
          <div class="feature-desc" style="font-size: 17px;">Captures study hours, absences, family support, internet access, and past marks.</div>
        </div>
        <div class="feature-card" style="padding: 20px;">
          <div class="feature-title" style="font-size: 22px; color: #38bdf8;">⚙️ ML Pipeline</div>
          <div class="feature-desc" style="font-size: 17px;">Scikit-learn ColumnTransformer with robust feature scaling and encoding.</div>
        </div>
        <div class="feature-card highlight" style="padding: 20px;">
          <div class="feature-title" style="font-size: 22px; color: #00f2fe;">🎯 Actionable Output</div>
          <div class="feature-desc" style="font-size: 17px;">Instant predicted score out of 20, HUD risk gauge, and customized guidance.</div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="author-info">End-to-End Decision Support System for Schools</div>
      <div class="swipe-pill">Swipe Next ➔</div>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- SLIDE 4: MACHINE LEARNING BENCHMARK (GRADIENT BOOSTING VICTORY)   -->
  <!-- ================================================================= -->
  <div class="slide">
    <div class="top-bar">
      <div class="brand-tag"><span class="dot"></span> Rigorous ML Benchmark</div>
      <div class="slide-num">04 / 08</div>
    </div>

    <div class="content-box" style="gap: 20px;">
      <div class="hook-badge">🏆 Algorithmic Superiority</div>

      <h1 class="slide-title">
        Why <span class="glow-text">Gradient Boosting</span> Won The Tournament:
      </h1>

      <p class="slide-desc">
        We trained, tuned, and evaluated three distinct regression architectures. Gradient Boosting systematically outperformed all others:
      </p>

      <div class="comp-box">
        <div class="comp-row">
          <div class="comp-model">Linear Regression <span style="font-size: 15px; color: #94a3b8; font-weight: 500;">(Baseline)</span></div>
          <div class="comp-metrics">
            <span>MAE: <strong style="color: #ffffff;">1.4429</strong></span>
            <span>R² Score: <strong style="color: #ffffff;">0.7690</strong></span>
          </div>
        </div>

        <div class="comp-row">
          <div class="comp-model">Random Forest <span style="font-size: 15px; color: #94a3b8; font-weight: 500;">(Ensemble)</span></div>
          <div class="comp-metrics">
            <span>MAE: <strong style="color: #ffffff;">1.2061</strong></span>
            <span>R² Score: <strong style="color: #ffffff;">0.8132</strong></span>
          </div>
        </div>

        <div class="comp-row winner">
          <div class="comp-model" style="color: #00f2fe;">
            🏆 Gradient Boosting <span style="background: #00f2fe; color: #030712; font-size: 13px; font-weight: 900; padding: 4px 10px; border-radius: 999px;">CHAMPION</span>
          </div>
          <div class="comp-metrics" style="color: #00f2fe;">
            <span>MAE: <strong style="color: #ffffff;">1.1804</strong> (Lowest)</span>
            <span>R²: <strong style="color: #ffffff;">0.8138</strong> (81.4%)</span>
          </div>
        </div>
      </div>

      <div class="feature-card highlight" style="padding: 22px;">
        <div class="feature-title" style="color: #00f2fe;">💡 Key Technical Takeaway:</div>
        <div class="feature-desc" style="font-size: 21px; color: #ffffff;">
          Gradient Boosting iteratively minimizes residuals from previous decision trees. It handled non-linear behavioral traits like absenteeism and past failures far better than conventional linear or bagging models.
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="author-info">Scikit-Learn • Joblib Pipeline • Fast Sub-50ms Inference</div>
      <div class="swipe-pill">Swipe Next ➔</div>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- SLIDE 5: CYBERNETIC HUD GAUGE & UI/UX INNOVATION                  -->
  <!-- ================================================================= -->
  <div class="slide">
    <div class="top-bar">
      <div class="brand-tag"><span class="dot"></span> Science Fair UI/UX</div>
      <div class="slide-num">05 / 08</div>
    </div>

    <div class="content-box" style="gap: 20px;">
      <div class="hook-badge">🎨 Mission-Control Design</div>

      <h1 class="slide-title">
        The Zero-Collision <span class="glow-text">HUD Gauge Meter</span>
      </h1>

      <p class="slide-desc">
        Engineered for high-visibility kiosk projection at the Science Fair, translating raw mathematical regressions into an intuitive cybernetic visual meter.
      </p>

      <div class="grid-2">
        <div class="feature-card highlight">
          <div class="feature-badge">🎯 01. Dynamic SVG Arc</div>
          <div class="feature-title">Zero Overlapping Needle Glitches</div>
          <div class="feature-desc">Active neon arc illuminates smoothly to the student's exact predicted percentage with crisp visual feedback.</div>
        </div>

        <div class="feature-card highlight">
          <div class="feature-badge">🌐 02. Gujarati Localization</div>
          <div class="feature-title">Accessible to Rural Students</div>
          <div class="feature-desc">Instant toggle between English & Gujarati using modern regional typography (Anek Gujarati & Noto Sans).</div>
        </div>

        <div class="feature-card">
          <div class="feature-badge" style="color: #f59e0b;">🚦 03. 3-Tier Risk Zones</div>
          <div class="feature-title">Immediate Triage Classification</div>
          <div class="feature-desc">
            <span style="color: #ef4444; font-weight: 800;">🔴 High (&lt;50%)</span> &bull; 
            <span style="color: #f59e0b; font-weight: 800;">🟡 Mid (50-70%)</span> &bull; 
            <span style="color: #10b981; font-weight: 800;">🟢 Safe (&gt;70%)</span>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-badge" style="color: #a855f7;">⚡ 04. Sub-50ms Response</div>
          <div class="feature-title">Real-Time Fluid Interactivity</div>
          <div class="feature-desc">Zero lag during student interactions, providing immediate cause-and-effect visualization.</div>
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="author-info">Engaging Science Fair Visitors with Gamified Feedback</div>
      <div class="swipe-pill">Swipe Next ➔</div>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- SLIDE 6: WHAT-IF ACADEMIC SIMULATOR                               -->
  <!-- ================================================================= -->
  <div class="slide">
    <div class="top-bar">
      <div class="brand-tag"><span class="dot"></span> Student Agency</div>
      <div class="slide-num">06 / 08</div>
    </div>

    <div class="content-box" style="gap: 20px;">
      <div class="hook-badge">🕹️ Interactive Exploration</div>

      <h1 class="slide-title">
        The <span class="glow-text">"What-If"</span> Academic Simulator
      </h1>

      <p class="slide-desc">
        A score is not a final verdict—it is a roadmap. Students move interactive sliders to discover exactly what behavioral changes alter their future.
      </p>

      <div class="grid-3">
        <div class="feature-card highlight" style="gap: 12px;">
          <div style="font-size: 32px;">📚</div>
          <div class="feature-title" style="color: #38bdf8;">"What if I study 2 more hours?"</div>
          <div class="feature-desc">
            Instantly recalibrates: <strong style="color: #00f2fe; font-size: 22px;">+1.8 Marks Gain</strong>. Proves the tangible return on daily study routines.
          </div>
        </div>

        <div class="feature-card highlight" style="gap: 12px;">
          <div style="font-size: 32px;">🏫</div>
          <div class="feature-title" style="color: #38bdf8;">"What if attendance hits 95%?"</div>
          <div class="feature-desc">
            Reduces failure probability: <strong style="color: #10b981; font-size: 22px;">Risk Drops 🔴 ➔ 🟢</strong>. Highlights the power of classroom presence.
          </div>
        </div>

        <div class="feature-card highlight" style="gap: 12px;">
          <div style="font-size: 32px;">👨‍👩‍👧</div>
          <div class="feature-title" style="color: #38bdf8;">"What if parental support is High?"</div>
          <div class="feature-desc">
            Builds academic resilience: <strong style="color: #a855f7; font-size: 22px;">Stabilizes Variance</strong> and cushions test anxiety during exams.
          </div>
        </div>
      </div>

      <div class="card-media" style="padding: 16px; margin-top: 5px;">
        <img src="${IMGS.integration}" style="max-height: 230px;" alt="Simulator Flow">
      </div>
    </div>

    <div class="bottom-bar">
      <div class="author-info">Giving Learners Ownership Over Their Educational Trajectory</div>
      <div class="swipe-pill">Swipe Next ➔</div>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- SLIDE 7: 1-PAGE OFFICIAL CERTIFICATE (PRINT ENGINE)               -->
  <!-- ================================================================= -->
  <div class="slide">
    <div class="top-bar">
      <div class="brand-tag"><span class="dot"></span> Real-World Utility</div>
      <div class="slide-num">07 / 08</div>
    </div>

    <div class="content-box" style="gap: 22px;">
      <div class="hook-badge">📄 Science Fair Take-Home</div>

      <h1 class="slide-title">
        Instant 1-Page <span class="glow-text">Official Report Card</span>
      </h1>

      <p class="slide-desc">
        At our Science Fair kiosk, students and parents hit "Print Report" to walk away with a verified, single-page A4 physical certificate.
      </p>

      <div class="grid-2">
        <div class="feature-card highlight">
          <div class="feature-badge">🖨️ 01. Zero-UI Print Portal</div>
          <div class="feature-title">Pristine A4 Formatting</div>
          <div class="feature-desc">
            Isolated React Portal & strict CSS @media print rules strip out navbars, buttons, and background glows, ensuring a crisp document.
          </div>
        </div>

        <div class="feature-card highlight">
          <div class="feature-badge">🏫 02. Verified School Endorsement</div>
          <div class="feature-title">Official School Seal & Signatures</div>
          <div class="feature-desc">
            Includes M. M. Karodiya Primary School crest, official mentor signature block (Shri Manojbhai Parmar), and parent endorsement.
          </div>
        </div>
      </div>

      <div class="feature-card" style="border-color: rgba(0, 242, 254, 0.4); padding: 24px;">
        <div class="feature-title" style="color: #00f2fe;">📋 Comprehensive 12-Indicator Diagnostic</div>
        <div class="feature-desc" style="font-size: 21px; color: #ffffff;">
          The report doesn't just show a number—it itemizes specific strengths, areas for growth, and personalized weekly study targets for parents.
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="author-info">Connecting Classrooms, Parents & Mentors with Real Data</div>
      <div class="swipe-pill">Swipe Next ➔</div>
    </div>
  </div>

  <!-- ================================================================= -->
  <!-- SLIDE 8: CALL TO ACTION & OPEN SOURCE LINKS                       -->
  <!-- ================================================================= -->
  <div class="slide">
    <div class="top-bar">
      <div class="brand-tag"><span class="dot"></span> Live Deployment</div>
      <div class="slide-num">08 / 08</div>
    </div>

    <div class="content-box" style="gap: 22px; text-align: center; margin: auto 0;">
      <div class="hook-badge" style="margin: 0 auto;">🚀 Try It Live Today</div>

      <h1 class="slide-title" style="font-size: 58px;">
        Experience <span class="glow-text">EduVision AI 2.0</span>
      </h1>

      <p class="slide-desc" style="font-size: 26px; max-width: 900px; margin: 0 auto;">
        Fully deployed on Vercel with zero latency, complete Gujarati localization, and 100% open-source code on GitHub.
      </p>

      <!-- Massive Action Links -->
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 920px; margin: 10px auto 0 auto; width: 100%;">
        <div style="background: linear-gradient(90deg, rgba(0, 242, 254, 0.16) 0%, rgba(14, 165, 233, 0.25) 100%); border: 2px solid #00f2fe; border-radius: 20px; padding: 20px 28px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 10px 30px rgba(0, 242, 254, 0.25);">
          <div style="text-align: left;">
            <div style="font-size: 16px; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px;">🌐 Live Interactive Web App</div>
            <div style="font-size: 24px; font-weight: 900; color: #ffffff;">https://eduvision-ai-kappa.vercel.app</div>
          </div>
          <div style="background: #00f2fe; color: #030712; font-family: 'Outfit'; font-weight: 900; font-size: 18px; padding: 10px 24px; border-radius: 999px;">
            TRY DEMO ➔
          </div>
        </div>

        <div style="background: rgba(15, 23, 42, 0.95); border: 1.5px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 20px 28px; display: flex; justify-content: space-between; align-items: center;">
          <div style="text-align: left;">
            <div style="font-size: 16px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">💻 Full Open Source Repository</div>
            <div style="font-size: 24px; font-weight: 900; color: #ffffff;">https://github.com/yashintelligence/eduvision-ai</div>
          </div>
          <div style="background: rgba(255, 255, 255, 0.1); color: #ffffff; font-family: 'Outfit'; font-weight: 800; font-size: 18px; padding: 10px 24px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.3);">
            STAR REPO ⭐
          </div>
        </div>
      </div>

      <div style="background: rgba(15, 23, 42, 0.85); border-radius: 16px; padding: 18px 24px; border: 1px solid rgba(255, 255, 255, 0.12); max-width: 920px; margin: 0 auto; width: 100%;">
        <div style="font-size: 20px; color: #e2e8f0; font-weight: 600;">
          Special thanks to <strong style="color: #ffffff;">M. M. Karodiya Primary School</strong> and project mentor <strong style="color: #ffffff;">Shri Manojbhai Parmar</strong>.
        </div>
      </div>
    </div>

    <div class="bottom-bar">
      <div class="author-info">
        Connect with <strong>Yash Patel</strong> • <strong>@yashintelligence</strong>
      </div>
      <div class="swipe-pill" style="background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%); color: #ffffff;">
        Like & Repost 🔁
      </div>
    </div>
  </div>

</body>
</html>`;
}

async function renderCarousel() {
  console.log('Launching Puppeteer for LinkedIn Carousel...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });
  
  const html = getCarouselHTML();
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 60000 });
  try {
    await page.evaluateHandle('document.fonts.ready');
  } catch (e) {
    console.log('Fonts wait passed');
  }

  // 1. Export as Single Multi-Page PDF (Standard LinkedIn Document Carousel)
  const carouselPDFPath = path.join(OUT_DIR, 'EduVision_AI_LinkedIn_Carousel.pdf');
  await page.pdf({
    path: carouselPDFPath,
    width: '1080px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  console.log(`Generated LinkedIn Carousel PDF: ${carouselPDFPath}`);

  // 2. Export each slide as standalone high-res PNG
  const slideElements = await page.$$('.slide');
  console.log(`Found ${slideElements.length} slides to capture as PNG...`);
  for (let i = 0; i < slideElements.length; i++) {
    const pngPath = path.join(SLIDES_DIR, `slide_${i + 1}.png`);
    await slideElements[i].screenshot({ path: pngPath });
    console.log(`  Saved slide ${i + 1}: ${pngPath}`);
  }

  await browser.close();
  console.log('LinkedIn Carousel generation complete!');
}

renderCarousel().catch(err => {
  console.error('Error rendering carousel:', err);
  process.exit(1);
});
