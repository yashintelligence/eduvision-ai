const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BASE_DIR = '/Users/yashpatel/.gemini/antigravity/scratch/eduvision-ai';
const IMG_DIR = path.join(BASE_DIR, 'extracted_images');
const OUT_DIR = path.join(BASE_DIR, 'reports');

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
  objective: getBase64('page_2_img_2_X3.jpg'),
  working: getBase64('page_3_img_2_X5.jpg'),
  arch: getBase64('page_5_img_2_X8.jpg'),
  methodology: getBase64('page_6_img_2_X10.jpg'),
  processing: getBase64('page_7_img_2_X12.jpg'),
  modelComp: getBase64('page_8_img_2_X14.jpg'),
  modelPerf: getBase64('page_8_img_3_X15.jpg'),
  integration: getBase64('page_9_img_2_X17.jpg'),
  benefits: getBase64('page_10_img_2_X19.jpg'),
  impact: getBase64('page_10_img_3_X20.jpg'),
  future: getBase64('page_11_img_2_X22.jpg')
};

// ==========================================
// 1. GUJARATI HTML
// ==========================================
function getGujaratiHTML() {
  return `<!DOCTYPE html>
<html lang="gu">
<head>
  <meta charset="UTF-8">
  <title>EduVision AI - પ્રોજેક્ટ રિપોર્ટ</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anek+Gujarati:wght@400;500;600;700;800;900&family=Noto+Sans+Gujarati:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Noto Sans Gujarati', 'Anek Gujarati', sans-serif;
      color: #1e293b;
      background: #ffffff;
      -webkit-font-smoothing: antialiased;
    }
    .page {
      width: 210mm;
      height: 297mm;
      padding: 24mm 24mm 22mm 24mm;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      background: #ffffff;
    }
    .top-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      background: linear-gradient(90deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%);
    }
    .page-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 12px;
    }
    .page-num {
      font-family: 'Outfit', sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #334155;
    }
    h1.main-title {
      font-family: 'Outfit', sans-serif;
      font-size: 38px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin-top: 24px;
      margin-bottom: 4px;
    }
    .sub-title {
      font-size: 15px;
      font-weight: 700;
      color: #2563eb;
      margin-bottom: 12px;
    }
    .site-link {
      font-size: 13px;
      color: #475569;
      margin-bottom: 24px;
    }
    .site-link a {
      color: #2563eb;
      text-decoration: underline;
      font-weight: 600;
    }
    .divider {
      width: 140px;
      height: 2px;
      background: #cbd5e1;
      margin: 16px 0 32px 0;
    }
    .cover-meta {
      margin-top: auto;
      margin-bottom: 30px;
    }
    .meta-row {
      font-size: 14.5px;
      margin-bottom: 10px;
      line-height: 1.6;
    }
    .meta-label {
      font-weight: 700;
      color: #1e3a8a;
    }
    .meta-val {
      font-weight: 600;
      color: #0f172a;
    }
    h2.section-heading {
      font-size: 20px;
      font-weight: 800;
      color: #ea580c;
      margin-top: 14px;
      margin-bottom: 8px;
      letter-spacing: -0.2px;
    }
    p.content-para {
      font-size: 12.5px;
      line-height: 1.75;
      color: #334155;
      margin-bottom: 12px;
      text-align: justify;
    }
    p.content-para strong {
      color: #0f172a;
    }
    .img-box {
      text-align: center;
      margin: 12px 0;
      display: flex;
      justify-content: center;
    }
    .img-box img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }
    .bullet-list {
      margin-left: 6px;
      margin-bottom: 14px;
      list-style: none;
    }
    .bullet-list li {
      position: relative;
      padding-left: 20px;
      font-size: 12px;
      line-height: 1.7;
      color: #334155;
      margin-bottom: 6px;
    }
    .bullet-list li::before {
      content: "•";
      color: #2563eb;
      font-size: 18px;
      position: absolute;
      left: 2px;
      top: -2px;
    }
    .bullet-list li strong {
      color: #0f172a;
    }
    .sub-section-title {
      font-size: 14px;
      font-weight: 800;
      color: #1e293b;
      margin-top: 12px;
      margin-bottom: 6px;
    }
    .sig-table {
      width: 100%;
      margin-top: 40px;
      border-collapse: collapse;
    }
    .sig-cell {
      width: 50%;
      text-align: center;
      font-size: 12px;
      vertical-align: top;
      padding: 0 15px;
    }
    .sig-line {
      width: 160px;
      margin: 0 auto 10px auto;
      border-bottom: 1.5px dashed #94a3b8;
      height: 25px;
    }
    .sig-name {
      font-weight: 800;
      color: #0f172a;
      font-size: 13px;
    }
    .sig-role {
      color: #64748b;
      font-size: 11px;
      margin-top: 2px;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: COVER -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="img-box" style="margin-top: 10px;">
      <img src="${IMGS.cover}" style="max-height: 380px;" alt="EduVision AI Hero">
    </div>
    <h1 class="main-title">EduVision AI</h1>
    <div class="sub-title">AI આધારિત વિદ્યાર્થી પ્રદર્શન આગાહી અને વ્યક્તિગત માર્ગદર્શન પ્રણાલી</div>
    <div class="site-link">
      પ્રોજેક્ટ વેબસાઇટ લિન્ક - <a href="https://eduvision-ai-kappa.vercel.app/" target="_blank">https://eduvision-ai-kappa.vercel.app/</a><br>
      <span style="font-size: 11.5px; color: #64748b;">(અથવા: https://eduvision-ai.streamlit.app/)</span>
    </div>
    <div class="divider"></div>
    <div class="cover-meta">
      <div class="meta-row"><span class="meta-label">માર્ગદર્શક : </span><span class="meta-val">શ્રી મનોજભાઈ પરમાર</span></div>
      <div class="meta-row"><span class="meta-label">શાળા : </span><span class="meta-val">એમ. એમ. કરોડીયા પ્રાથમિક શાળા, તારસાડી કોસંબા (R.S)</span></div>
      <div class="meta-row"><span class="meta-label">પ્રસ્તુતકર્તા : </span><span class="meta-val">યશ પટેલ (વિજ્ઞાન મેળો ૨૦૨૬)</span></div>
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">1</span></div>
    <h2 class="section-heading">કૃતિ નું નામ</h2>
    <p class="content-para">
      <strong>EduVision AI</strong> - AI આધારિત વિદ્યાર્થી પ્રદર્શન આગાહી અને વ્યક્તિગત શૈક્ષણિક માર્ગદર્શન પ્રણાલી.<br>
      વિદ્યાર્થીના શૈક્ષણિક ડેટા પરથી અંતિમ ગુણની આગાહી, જોખમ વિશ્લેષણ અને વ્યક્તિગત અભ્યાસ ભલામણો આપતું વ્યાવસાયિક શૈક્ષણિક AI ડેશબોર્ડ.
    </p>
    <h2 class="section-heading">હેતુ</h2>
    <p class="content-para">
      વિદ્યાર્થીઓના અગાઉના શૈક્ષણિક ડેટા, અભ્યાસની આદતો અને અન્ય મહત્વપૂર્ણ પરિબળોના આધારે <strong>Artificial Intelligence (AI) અને Machine Learning(ML)</strong> ટેક્નોલોજીનો ઉપયોગ કરીને તેમના ભવિષ્યના શૈક્ષણિક પ્રદર્શનની આગાહી કરવી તેમજ સમયસર વ્યક્તિગત અભ્યાસ માર્ગદર્શન પૂરું પાડવું એ આ પ્રોજેક્ટનો મુખ્ય હેતુ છે.
    </p>
    <p class="content-para">
      આ પ્રોજેક્ટ દ્વારા શિક્ષકોને નબળા વિદ્યાર્થીઓની વહેલી ઓળખ કરવામાં મદદ મળે છે, જેથી તેઓ સમયસર યોગ્ય માર્ગદર્શન આપી શકે. સાથે જ વિદ્યાર્થીઓ પોતાની નબળાઈઓને સમજીને તેમાં સુધારો કરી શકે અને તેમના શૈક્ષણિક પરિણામોમાં વધારો કરી શકે.
    </p>
    <div class="img-box" style="margin-top: 15px;">
      <img src="${IMGS.objective}" style="max-height: 290px;" alt="EduVision AI Main Purpose">
    </div>
  </div>

  <!-- PAGE 3 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">2</span></div>
    <h2 class="section-heading">સિદ્ધાંત</h2>
    <p class="content-para">
      વિદ્યાર્થીના અગાઉના શૈક્ષણિક ડેટા અને અભ્યાસ સંબંધિત પરિબળોના આધારે તેના ભવિષ્યના પ્રદર્શનની આગાહી કરી શકાય છે. આ આગાહીના આધારે સમયસર યોગ્ય માર્ગદર્શન આપવાથી વિદ્યાર્થીના શૈક્ષણિક પરિણામોમાં સુધારો શક્ય બને છે.
    </p>
    <div class="img-box">
      <img src="${IMGS.working}" style="max-height: 290px;" alt="How it works">
    </div>
    <h2 class="section-heading">સાધનો</h2>
    <div class="sub-section-title">હાર્ડવેર (Hardware)</div>
    <ul class="bullet-list">
      <li>લેપટોપ (Laptop) અને ઇન્ટરનેટ જોડાણ (Internet Connection)</li>
    </ul>
    <div class="sub-section-title">સોફ્ટવેર (Software)</div>
    <ul class="bullet-list">
      <li>પાયથોન (Python 3.11+) અને નેક્સ્ટ જેએસ (Next.js 14) / સ્ટ્રીમલિટ (Streamlit)</li>
      <li>વિઝ્યુઅલ સ્ટુડિયો કોડ (VS Code) અને જ્યુપિટર નોટબુક (Jupyter Notebook)</li>
      <li>એનાકોન્ડા (Anaconda) અને ફાસ્ટએપીઆઈ (FastAPI Framework)</li>
    </ul>
  </div>

  <!-- PAGE 4 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">3</span></div>
    <h2 class="section-heading">પાયથોન લાઇબ્રેરી (Python Libraries)</h2>
    <ul class="bullet-list" style="margin-bottom: 24px;">
      <li><strong>પાન્ડાસ (Pandas):</strong> ડેટા વિશ્લેષણ, ડેટાફ્રેમ હેન્ડલિંગ અને મેનીપ્યુલેશન માટે.</li>
      <li><strong>નમપાય (NumPy):</strong> ગાણિતિક ગણતરીઓ અને બહુપરિમાણીય એરે પ્રોસેસિંગ માટે.</li>
      <li><strong>સાઇકિટ-લર્ન (Scikit-learn):</strong> મશીન લર્નિંગ મોડેલિંગ, પાઇપલાઇન અને પ્રીપ્રોસેસિંગ માટે.</li>
      <li><strong>મેટપ્લોટલિબ (Matplotlib) & સીબોર્ન (Seaborn):</strong> ડેટા વિઝ્યુઅલાઇઝેશન અને ચાર્ટ ગ્રાફિક્સ માટે.</li>
      <li><strong>જોબલિબ (Joblib):</strong> તાલીમ પામેલા પ્રશિક્ષિત ML મોડેલના સેવિંગ અને સીરિયલાઇઝેશન માટે.</li>
      <li><strong>ફાસ્ટએપીઆઈ (FastAPI):</strong> હાઇ-સ્પીડ એસિન્ક્રોનસ RESTful અનુમાન API સેવાઓ માટે.</li>
    </ul>
    <h2 class="section-heading">ડેટાસેટ સમૂહ (Dataset)</h2>
    <ul class="bullet-list">
      <li><strong>વિદ્યાર્થી શૈક્ષણિક પ્રદર્શન માહિતી સમૂહ:</strong> (Student Performance Dataset)</li>
      <li><strong>લિન્ક:</strong> <a href="https://archive.ics.uci.edu/dataset/320/student+performance" target="_blank" style="color: #2563eb; word-break: break-all;">https://archive.ics.uci.edu/dataset/320/student+performance</a></li>
      <li><strong>ડેટાસેટ સ્ત્રોત:</strong> યુસીઆઈ મશીન લર્નિંગ રિપોઝિટરી (UCI Machine Learning Repository) માંથી પ્રાપ્ત ૩૯૫ વિદ્યાર્થીઓના વાસ્તવિક શૈક્ષણિક, સામાજિક અને વસ્તીવિષયક પરિબળો સહિત ૩૩ વિશેષતાઓ (Features).</li>
    </ul>
  </div>

  <!-- PAGE 5 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">4</span></div>
    <h2 class="section-heading">રચના</h2>
    <p class="content-para">
      EduVision AI ની રચના એક વેબ આધારિત બુદ્ધિશાળી શૈક્ષણિક પ્રણાલી તરીકે કરવામાં આવી છે. આ પ્રણાલીમાં મુખ્યત્વે વપરાશકર્તા (User), વેબ એપ્લિકેશન (Web Application), માહિતી પૂર્વપ્રક્રિયા પ્રણાલી (Data Preprocessing Module), યંત્ર અધ્યયન મોડેલ (Machine Learning Model) અને પરિણામ પ્રણાલી (Output Module) જેવા મુખ્ય ઘટકોનો સમાવેશ થાય છે.
    </p>
    <p class="content-para">
      સૌપ્રથમ વપરાશકર્તા વેબ એપ્લિકેશનમાં વિદ્યાર્થીની જરૂરી શૈક્ષણિક માહિતી દાખલ કરે છે. ત્યારબાદ આ માહિતી પૂર્વપ્રક્રિયા પ્રણાલી સુધી પહોંચે છે, જ્યાં માહિતીનું જરૂરી રૂપાંતરણ અને તૈયારી કરવામાં આવે છે.
    </p>
    <p class="content-para">
      પૂર્વપ્રક્રિયા પૂર્ણ થયા પછી માહિતી પ્રશિક્ષિત યંત્ર અધ્યયન મોડેલ સુધી પહોંચે છે. આ મોડેલ વિદ્યાર્થીના શૈક્ષણિક ડેટાનું વિશ્લેષણ કરીને તેના સંભવિત અંતિમ પરિણામની આગાહી કરે છે.
    </p>
    <p class="content-para">
      મોડેલ દ્વારા પ્રાપ્ત થયેલા પરિણામના આધારે સિસ્ટમ વિદ્યાર્થીના જોખમનું વિશ્લેષણ કરે છે અને તેના માટે વ્યક્તિગત અભ્યાસ માર્ગદર્શન તૈયાર કરે છે. અંતે સમગ્ર માહિતી વેબ એપ્લિકેશન દ્વારા સરળ અને વ્યવસ્થિત અહેવાલ (Report) સ્વરૂપે વપરાશકર્તાને રજૂ કરવામાં આવે છે.
    </p>
    <div class="img-box">
      <img src="${IMGS.arch}" style="max-height: 290px;" alt="System Architecture">
    </div>
  </div>

  <!-- PAGE 6 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">5</span></div>
    <h2 class="section-heading">કાર્યપદ્ધતિ</h2>
    <div class="img-box">
      <img src="${IMGS.methodology}" style="max-height: 280px;" alt="ML Methodology Workflow">
    </div>
    <p class="content-para">
      EduVision AI પ્રોજેક્ટની કાર્યપદ્ધતિ એક સુવ્યવસ્થિત યંત્ર અધ્યયન (Machine Learning) પ્રક્રિયા પર આધારિત છે. સૌપ્રથમ યુસીઆઈ યંત્ર અધ્યયન માહિતી ભંડાર (UCI Machine Learning Repository) માંથી વિદ્યાર્થી શૈક્ષણિક પ્રદર્શન માહિતી સમૂહ (Student Performance Dataset) મેળવવામાં આવ્યો. ત્યારબાદ માહિતીનું નિરીક્ષણ કરીને તેમાં રહેલા પરિબળો, માહિતીના પ્રકારો અને માહિતીની ગુણવત્તાની ચકાસણી કરવામાં આવી.
    </p>
    <p class="content-para">
      આગળના તબક્કામાં માહિતીનું સંશોધનાત્મક વિશ્લેષણ (Exploratory Data Analysis – EDA) કરવામાં આવ્યું, જેના દ્વારા વિવિધ પરિબળો વચ્ચેના સંબંધો અને માહિતીના વિતરણને સમજવામાં આવ્યું. ત્યારબાદ માહિતી શુદ્ધિકરણ (Data Cleaning), માહિતી પૂર્વપ્રક્રિયા (Data Preprocessing), લક્ષણ નિર્માણ (Feature Engineering) તથા લક્ષણ પસંદગી (Feature Selection) જેવી પ્રક્રિયાઓ પૂર્ણ કરીને માહિતીને યંત્ર અધ્યયન માટે યોગ્ય સ્વરૂપમાં તૈયાર કરવામાં આવી.
    </p>
    <p class="content-para">
      તૈયાર થયેલી માહિતીને તાલીમ માહિતી (Training Data - 80%) અને પરીક્ષણ માહિતી (Testing Data - 20%) એમ બે ભાગોમાં વિભાજિત કરવામાં આવી. ત્યારબાદ પ્રમાણભૂતકરણ (StandardScaler), શ્રેણીબદ્ધ માહિતીનું રૂપાંતરણ...
    </p>
  </div>

  <!-- PAGE 7 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">6</span></div>
    <p class="content-para">
      રૂપાંતરણ (OneHotEncoder) અને કૉલમ રૂપાંતરણ (ColumnTransformer) નો સમાવેશ કરતી પાઇપલાઇન (Pipeline) તૈયાર કરવામાં આવી, જેથી તમામ માહિતી પર એકસરખી અને ચોક્કસ પ્રક્રિયા થઈ શકે.
    </p>
    <div class="img-box">
      <img src="${IMGS.processing}" style="max-height: 290px;" alt="Data Preprocessing">
    </div>
    <p class="content-para">
      ત્યારબાદ વિવિધ યંત્ર અધ્યયન મોડેલો, જેમ કે રેખીય પ્રતિગમન (Linear Regression), રેન્ડમ ફોરેસ્ટ પ્રતિગમન (Random Forest Regressor) અને ગ્રેડિયન્ટ બુસ્ટિંગ પ્રતિગમન (Gradient Boosting Regressor) નું પ્રશિક્ષણ અને મૂલ્યાંકન કરવામાં આવ્યું. મોડેલોના કાર્યક્ષમતાનું મૂલ્યાંકન આર-સ્ક્વેર ગુણાંક (R² Score), સરેરાશ નિરપેક્ષ ભૂલ (Mean Absolute Error – MAE) તથા ક્રોસ વેલિડેશન (Cross Validation) જેવા માપદંડોના આધારે કરવામાં આવ્યું. આ તમામ મોડેલોમાંથી ગ્રેડિયન્ટ બુસ્ટિંગ પ્રતિગમન (Gradient Boosting Regressor) એ સૌથી વધુ ચોકસાઈ અને શ્રેષ્ઠ પરિણામ આપતાં તેને અંતિમ મોડેલ તરીકે પસંદ કરવામાં આવ્યો.
    </p>
  </div>

  <!-- PAGE 8 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">7</span></div>
    <div class="img-box" style="margin-top: 15px;">
      <img src="${IMGS.modelComp}" style="max-height: 280px;" alt="Why Gradient Boosting Regressor">
    </div>
    <div class="img-box" style="margin-top: 25px;">
      <img src="${IMGS.modelPerf}" style="max-height: 280px;" alt="Model Performance Metrics">
    </div>
  </div>

  <!-- PAGE 9 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">8</span></div>
    <p class="content-para">
      પસંદ કરાયેલા મોડેલને જોબલિબ (Joblib) ની મદદથી સંગ્રહિત કરીને વેબ એપ્લિકેશન સાથે સંકલિત કરવામાં આવ્યો. ત્યારબાદ વપરાશકર્તા જ્યારે વિદ્યાર્થીની માહિતી દાખલ કરે છે ત્યારે તે માહિતી પર જરૂરી પૂર્વપ્રક્રિયા કરવામાં આવે છે અને પ્રશિક્ષિત મોડેલ સુધી પહોંચાડવામાં આવે છે. મોડેલ વિદ્યાર્થીના સંભવિત અંતિમ ગુણની આગાહી કરે છે, તેના શૈક્ષણિક જોખમનું વિશ્લેષણ કરે છે અને તેના આધારે વ્યક્તિગત અભ્યાસ માર્ગદર્શન તૈયાર કરે છે.
    </p>
    <p class="content-para">
      અંતે સિસ્ટમ વપરાશકર્તાને અનુમાનિત ગુણ, જોખમનું સ્તર, વ્યક્તિગત અહેવાલ, અભ્યાસ માટેની સૂચનાઓ તથા ચાર્ટ અને વિશ્લેષણ સાથેનું પરિણામ રજૂ કરે છે. આ રીતે સમગ્ર પ્રોજેક્ટ માહિતીના સંગ્રહથી લઈને અંતિમ આગાહી અને માર્ગદર્શન સુધીની સંપૂર્ણ યંત્ર અધ્યયન પ્રક્રિયાને સફળતાપૂર્વક અમલમાં મૂકે છે.
    </p>
    <div class="img-box">
      <img src="${IMGS.integration}" style="max-height: 260px;" alt="Integration and Final Prediction">
    </div>
    <h2 class="section-heading">ઉપયોગ અને ફાયદા</h2>
    <ul class="bullet-list">
      <li><strong>શિક્ષણ સહાયક તરીકે:</strong> EduVision AI પ્રોજેક્ટનો ઉપયોગ શાળાઓ, શિક્ષકો, વિદ્યાર્થીઓ અને વાલીઓ માટે એક બુદ્ધિશાળી શૈક્ષણિક સહાયક તરીકે થઈ શકે છે.</li>
      <li><strong>વહેલી ઓળખ:</strong> આ પ્રોજેક્ટ દ્વારા શિક્ષકોને દરેક વિદ્યાર્થીના શૈક્ષણિક વિકાસનું વિશ્લેષણ કરવામાં સરળતા રહે છે અને નબળા વિદ્યાર્થીઓની વહેલી ઓળખ કરી શકાય છે.</li>
      <li><strong>વિદ્યાર્થી આત્મવિશ્વાસ:</strong> વિદ્યાર્થીઓ માટે આ પ્રોજેક્ટ તેમની શૈક્ષણિક નબળાઈઓને ઓળખવામાં અને અભ્યાસની યોગ્ય યોજના બનાવવામાં મદદરૂપ બને છે.</li>
      <li><strong>વાલી સંકલન:</strong> વાલીઓ માટે આ પ્રોજેક્ટ તેમના બાળકની શૈક્ષણિક પ્રગતિ વિશે સમયસર માહિતી ઉપલબ્ધ કરાવે છે.</li>
    </ul>
  </div>

  <!-- PAGE 10 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">9</span></div>
    <ul class="bullet-list" style="margin-bottom: 12px;">
      <li><strong>સંસ્થાકીય નિર્ણય:</strong> શાળા માટે આ પ્રોજેક્ટ શૈક્ષણિક આયોજન, પરિણામનું વિશ્લેષણ અને વિદ્યાર્થીઓના સર્વાંગી વિકાસ માટે ઉપયોગી સાબિત થઈ શકે છે. ઉપરાંત, માહિતી આધારિત (Data-driven) નિર્ણય લેવામાં પણ મદદરૂપ બને છે.</li>
    </ul>
    <div class="img-box">
      <img src="${IMGS.benefits}" style="max-height: 280px;" alt="Main Benefits">
    </div>
    <div class="img-box" style="margin-top: 15px;">
      <img src="${IMGS.impact}" style="max-height: 280px;" alt="Impact on Society and Education">
    </div>
  </div>

  <!-- PAGE 11 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">10</span></div>
    <h2 class="section-heading">ભવિષ્યની યોજના (Future Scope)</h2>
    <p class="content-para">
      EduVision AI પ્રોજેક્ટ હાલમાં વિદ્યાર્થીના શૈક્ષણિક પ્રદર્શનની આગાહી અને વ્યક્તિગત અભ્યાસ માર્ગદર્શન પૂરું પાડે છે. ભવિષ્યમાં આ પ્રોજેક્ટને વધુ આધુનિક, ઉપયોગી અને વ્યાપક બનાવવા માટે વિવિધ નવી સુવિધાઓ ઉમેરવાની યોજના છે.
    </p>
    <p class="content-para">
      સૌપ્રથમ, શાળાની વર્તમાન વ્યવસ્થાપન પ્રણાલી (School ERP System) સાથે એપ્લિકેશન પ્રોગ્રામિંગ ઇન્ટરફેસ (Application Programming Interface – API) દ્વારા સંકલન કરવામાં આવશે. આથી વિદ્યાર્થીની હાજરી, પરીક્ષાના ગુણ અને અન્ય શૈક્ષણિક માહિતી આપોઆપ સિસ્ટમમાં ઉપલબ્ધ થઈ શકશે અને વારંવાર માહિતી દાખલ કરવાની જરૂર રહેશે નહીં.
    </p>
    <p class="content-para">
      ત્યારબાદ પ્રાકૃતિક ભાષા પ્રક્રિયા (Natural Language Processing – NLP) નો ઉપયોગ કરીને વિદ્યાર્થીઓના પ્રતિભાવો, અભિપ્રાયો અને લખાણનું વિશ્લેષણ કરવાની સુવિધા ઉમેરવામાં આવશે. તેના આધારે વિદ્યાર્થીની શૈક્ષણિક મુશ્કેલીઓ, માનસિક તણાવ અથવા અભ્યાસ સંબંધિત પડકારોને વધુ સારી રીતે ઓળખી શકાશે.
    </p>
    <p class="content-para">
      આ ઉપરાંત વાલીઓ માટે મોબાઇલ એપ્લિકેશન (Mobile Application) વિકસાવવામાં આવશે, જેના દ્વારા તેઓ પોતાના બાળકના શૈક્ષણિક વિકાસ, પરિણામો અને અભ્યાસ સંબંધિત સૂચનાઓ ગમે ત્યારે જોઈ શકશે. સાથે જ મહત્વપૂર્ણ માહિતી અને ચેતવણીઓ (Alerts) પણ સીધી મોબાઇલ પર પ્રાપ્ત થશે.
    </p>
    <div class="img-box">
      <img src="${IMGS.future}" style="max-height: 280px;" alt="Future Roadmap">
    </div>
  </div>

  <!-- PAGE 12 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">11</span></div>
    <p class="content-para" style="margin-top: 15px;">
      ભવિષ્યમાં <strong>AI Chat Assistant</strong> પણ ઉમેરવાની યોજના છે, જે વિદ્યાર્થીઓ અને વાલીઓના પ્રશ્નોના તાત્કાલિક જવાબ આપી શકશે તથા અભ્યાસ સંબંધિત માર્ગદર્શન અને સૂચનો પ્રદાન કરશે.
    </p>
    <p class="content-para">
      વાલીઓ માટે એક અલગ <strong>નિયંત્રણ ફલક (Dashboard)</strong> પણ વિકસાવવામાં આવશે, જેમાં વિદ્યાર્થીના ગુણ, પ્રગતિ, હાજરી, જોખમનું સ્તર અને શૈક્ષણિક વિકાસનો સંપૂર્ણ અહેવાલ એક જ સ્થળે સરળતાથી જોઈ શકાશે.
    </p>
    <p class="content-para">
      આ તમામ સુધારાઓ દ્વારા EduVision AI ને વધુ બુદ્ધિશાળી, સ્વચાલિત અને સર્વાંગી શૈક્ષણિક સહાયક પ્રણાલી તરીકે વિકસાવવાનો હેતુ છે, જેથી વિદ્યાર્થીઓ, શિક્ષકો, વાલીઓ અને શાળાઓને વધુ અસરકારક અને માહિતી આધારિત નિર્ણયો લેવામાં સહાય મળી શકે.
    </p>
    <div style="margin-top: 80px;">
      <h2 class="section-heading" style="color: #2563eb; font-size: 16px; text-align: center; margin-bottom: 25px;">સમાપન & સત્તાવાર સહીઓ</h2>
      <table class="sig-table">
        <tr>
          <td class="sig-cell">
            <div class="sig-line"></div>
            <div class="sig-name">શ્રી મનોજભાઈ પરમાર</div>
            <div class="sig-role">માર્ગદર્શક શિક્ષક (પ્રોજેક્ટ હેડ)<br>એમ. એમ. કરોડિયા પ્રાથમિક શાળા</div>
          </td>
          <td class="sig-cell">
            <div class="sig-line"></div>
            <div class="sig-name">યશ પટેલ</div>
            <div class="sig-role">પ્રોજેક્ટ ડેવલપર & સંશોધક<br>વિજ્ઞાન મેળો ૨૦૨૬</div>
          </td>
        </tr>
      </table>
    </div>
  </div>

</body>
</html>`;
}

// ==========================================
// 2. ENGLISH HTML
// ==========================================
function getEnglishHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>EduVision AI - Project Report</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Inter', sans-serif;
      color: #1e293b;
      background: #ffffff;
      -webkit-font-smoothing: antialiased;
    }
    .page {
      width: 210mm;
      height: 297mm;
      padding: 24mm 24mm 22mm 24mm;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      background: #ffffff;
    }
    .top-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 8px;
      background: linear-gradient(90deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%);
    }
    .page-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 12px;
    }
    .page-num {
      font-family: 'Outfit', sans-serif;
      font-size: 15px;
      font-weight: 700;
      color: #334155;
    }
    h1.main-title {
      font-family: 'Outfit', sans-serif;
      font-size: 38px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin-top: 24px;
      margin-bottom: 4px;
    }
    .sub-title {
      font-size: 15px;
      font-weight: 700;
      color: #2563eb;
      margin-bottom: 12px;
    }
    .site-link {
      font-size: 13px;
      color: #475569;
      margin-bottom: 24px;
    }
    .site-link a {
      color: #2563eb;
      text-decoration: underline;
      font-weight: 600;
    }
    .divider {
      width: 140px;
      height: 2px;
      background: #cbd5e1;
      margin: 16px 0 32px 0;
    }
    .cover-meta {
      margin-top: auto;
      margin-bottom: 30px;
    }
    .meta-row {
      font-size: 14.5px;
      margin-bottom: 10px;
      line-height: 1.6;
    }
    .meta-label {
      font-weight: 700;
      color: #1e3a8a;
    }
    .meta-val {
      font-weight: 600;
      color: #0f172a;
    }
    h2.section-heading {
      font-size: 20px;
      font-weight: 800;
      color: #ea580c;
      margin-top: 14px;
      margin-bottom: 8px;
      letter-spacing: -0.2px;
    }
    p.content-para {
      font-size: 12.5px;
      line-height: 1.75;
      color: #334155;
      margin-bottom: 12px;
      text-align: justify;
    }
    p.content-para strong {
      color: #0f172a;
    }
    .img-box {
      text-align: center;
      margin: 12px 0;
      display: flex;
      justify-content: center;
    }
    .img-box img {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    }
    .bullet-list {
      margin-left: 6px;
      margin-bottom: 14px;
      list-style: none;
    }
    .bullet-list li {
      position: relative;
      padding-left: 20px;
      font-size: 12px;
      line-height: 1.7;
      color: #334155;
      margin-bottom: 6px;
    }
    .bullet-list li::before {
      content: "•";
      color: #2563eb;
      font-size: 18px;
      position: absolute;
      left: 2px;
      top: -2px;
    }
    .bullet-list li strong {
      color: #0f172a;
    }
    .sub-section-title {
      font-size: 14px;
      font-weight: 800;
      color: #1e293b;
      margin-top: 12px;
      margin-bottom: 6px;
    }
    .sig-table {
      width: 100%;
      margin-top: 40px;
      border-collapse: collapse;
    }
    .sig-cell {
      width: 50%;
      text-align: center;
      font-size: 12px;
      vertical-align: top;
      padding: 0 15px;
    }
    .sig-line {
      width: 160px;
      margin: 0 auto 10px auto;
      border-bottom: 1.5px dashed #94a3b8;
      height: 25px;
    }
    .sig-name {
      font-weight: 800;
      color: #0f172a;
      font-size: 13px;
    }
    .sig-role {
      color: #64748b;
      font-size: 11px;
      margin-top: 2px;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: COVER -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="img-box" style="margin-top: 10px;">
      <img src="${IMGS.cover}" style="max-height: 380px;" alt="EduVision AI Hero">
    </div>
    <h1 class="main-title">EduVision AI</h1>
    <div class="sub-title">AI-Powered Student Academic Performance Prediction & Personalized Mentorship System</div>
    <div class="site-link">
      Project Live Website: <a href="https://eduvision-ai-kappa.vercel.app/" target="_blank">https://eduvision-ai-kappa.vercel.app/</a><br>
      <span style="font-size: 11.5px; color: #64748b;">(Alternative: https://eduvision-ai.streamlit.app/)</span>
    </div>
    <div class="divider"></div>
    <div class="cover-meta">
      <div class="meta-row"><span class="meta-label">Project Mentor: </span><span class="meta-val">Shri Manojbhai Parmar</span></div>
      <div class="meta-row"><span class="meta-label">School: </span><span class="meta-val">M. M. Karodiya Primary School, Tarsadi Kosamba (R.S)</span></div>
      <div class="meta-row"><span class="meta-label">Developer & Researcher: </span><span class="meta-val">Yash Patel (Science Fair 2026)</span></div>
    </div>
  </div>

  <!-- PAGE 2 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">1</span></div>
    <h2 class="section-heading">Project Title</h2>
    <p class="content-para">
      <strong>EduVision AI</strong> - Artificial Intelligence Powered Student Performance Prediction and Personalized Academic Mentorship System.<br>
      A professional, production-grade educational intelligence dashboard predicting final grades, assessing academic risk levels, and generating tailored study recommendations based on multi-dimensional student data.
    </p>
    <h2 class="section-heading">Project Objectives</h2>
    <p class="content-para">
      The primary objective of this project is to leverage cutting-edge <strong>Artificial Intelligence (AI) and Machine Learning (ML)</strong> technologies to analyze students' historical academic marks, daily study routines, behavioral factors, and attendance records, thereby accurately forecasting future academic performance and providing proactive, timely mentorship.
    </p>
    <p class="content-para">
      The system enables educators to identify academically vulnerable students well in advance of final board examinations, facilitating targeted remedial intervention. Simultaneously, it empowers students with clear self-awareness of their learning habits, fostering measurable performance improvement and academic confidence.
    </p>
    <div class="img-box" style="margin-top: 15px;">
      <img src="${IMGS.objective}" style="max-height: 290px;" alt="EduVision AI Main Purpose">
    </div>
  </div>

  <!-- PAGE 3 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">2</span></div>
    <h2 class="section-heading">Core Scientific Principle</h2>
    <p class="content-para">
      A student's future academic performance is strongly correlated with preceding internal evaluations (G1 and G2 exam scores) along with behavioral variables (daily study duration, school absences, educational support, and health status). By applying non-linear ensemble regression algorithms, these interactions can be mapped precisely, enabling timely corrective interventions that maximize academic potential.
    </p>
    <div class="img-box">
      <img src="${IMGS.working}" style="max-height: 290px;" alt="How it works">
    </div>
    <h2 class="section-heading">System Specifications & Requirements</h2>
    <div class="sub-section-title">Hardware Requirements</div>
    <ul class="bullet-list">
      <li>Modern Computing Device (Laptop / Desktop / Tablet) with High-Speed Internet Connection</li>
    </ul>
    <div class="sub-section-title">Software & Development Environment</div>
    <ul class="bullet-list">
      <li>Python 3.11+ Runtime & Next.js 14 Production Web Application</li>
      <li>FastAPI High-Performance Asynchronous Python Microframework</li>
      <li>Visual Studio Code (VS Code) & Jupyter Notebook Development Suite</li>
      <li>Anaconda Package & Virtual Environment Manager</li>
    </ul>
  </div>

  <!-- PAGE 4 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">3</span></div>
    <h2 class="section-heading">Python Scientific Libraries</h2>
    <ul class="bullet-list" style="margin-bottom: 24px;">
      <li><strong>Pandas:</strong> High-performance structured data manipulation, CSV processing, and tabular analysis.</li>
      <li><strong>NumPy:</strong> Numerical linear algebra computations, array transforms, and statistical calculations.</li>
      <li><strong>Scikit-Learn:</strong> State-of-the-art machine learning model training, pipelines, and evaluation metrics.</li>
      <li><strong>Matplotlib & Seaborn:</strong> Statistical data visualization, distribution plots, and correlation heatmaps.</li>
      <li><strong>Joblib:</strong> High-efficiency serialization and persistent storage of the trained machine learning pipeline.</li>
      <li><strong>FastAPI & Uvicorn:</strong> Production REST API server delivering low-latency inference endpoints.</li>
    </ul>
    <h2 class="section-heading">Dataset Benchmark Information</h2>
    <ul class="bullet-list">
      <li><strong>Benchmark Dataset:</strong> Student Performance Dataset</li>
      <li><strong>Repository Link:</strong> <a href="https://archive.ics.uci.edu/dataset/320/student+performance" target="_blank" style="color: #2563eb; word-break: break-all;">https://archive.ics.uci.edu/dataset/320/student+performance</a></li>
      <li><strong>Dataset Description:</strong> Curated from the UCI Machine Learning Repository, comprising 395 verified student records spanning 33 demographic, academic, and social variables, capturing comprehensive behavioral profiles and subsequent academic outcomes.</li>
    </ul>
  </div>

  <!-- PAGE 5 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">4</span></div>
    <h2 class="section-heading">System Architecture</h2>
    <p class="content-para">
      EduVision AI is engineered as a robust, decoupled, cloud-ready web architecture. The framework comprises five foundational tiers: User Interaction Tier, Responsive Web Application (Next.js 14), Feature Preprocessing Pipeline, Machine Learning Inference Engine (Gradient Boosting), and Personalized Output Generation Module.
    </p>
    <p class="content-para">
      The user inputs student credentials and evaluation parameters through a responsive interface. The incoming payload undergoes real-time schema validation and transformation within the preprocessing pipeline.
    </p>
    <p class="content-para">
      The normalized features are forwarded to the trained Gradient Boosting model, which computes an exact numerical prediction of the student's expected final score (G3) out of 20.
    </p>
    <p class="content-para">
      Based on the prediction and key feature importances, the system categorizes the student into precise risk bands (Excellent, Good, Moderate, or High Attention) and generates dynamic remedial advice. Finally, the student report card and interactive dashboard visualizations are rendered instantaneously.
    </p>
    <div class="img-box">
      <img src="${IMGS.arch}" style="max-height: 290px;" alt="System Architecture">
    </div>
  </div>

  <!-- PAGE 6 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">5</span></div>
    <h2 class="section-heading">Machine Learning Methodology</h2>
    <div class="img-box">
      <img src="${IMGS.methodology}" style="max-height: 280px;" alt="ML Methodology Workflow">
    </div>
    <p class="content-para">
      The development methodology follows a rigorous 7-stage Machine Learning lifecycle. Beginning with dataset acquisition from the UCI Machine Learning Repository, comprehensive quality verification and missing-value diagnostics were conducted.
    </p>
    <p class="content-para">
      Subsequent Exploratory Data Analysis (EDA) mapped the mathematical correlations between study hours, absenteeism, and evaluation scores. Rigorous data cleaning, feature engineering, and feature selection isolated the 12 most impactful academic indicators.
    </p>
    <p class="content-para">
      The dataset was partitioned into an 80% training set and a 20% independent testing set. Feature preprocessing pipelines incorporating numerical standardization (StandardScaler) and categorical encoding (OneHotEncoder) were integrated using Scikit-Learn's ColumnTransformer...
    </p>
  </div>

  <!-- PAGE 7 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">6</span></div>
    <p class="content-para">
      The unified ColumnTransformer guarantees deterministic, identical preprocessing transformations across both training and real-time production inference.
    </p>
    <div class="img-box">
      <img src="${IMGS.processing}" style="max-height: 290px;" alt="Data Preprocessing">
    </div>
    <p class="content-para">
      Candidate regression algorithms—including Linear Regression, Random Forest Regressor, and Gradient Boosting Regressor—were rigorously trained and validated. Comprehensive performance benchmarks evaluating the coefficient of determination (R² Score), Mean Absolute Error (MAE), and k-fold cross-validation confirmed that Gradient Boosting Regressor achieved the highest predictive accuracy and lowest residual variance, establishing it as the definitive production model.
    </p>
  </div>

  <!-- PAGE 8 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">7</span></div>
    <div class="img-box" style="margin-top: 15px;">
      <img src="${IMGS.modelComp}" style="max-height: 280px;" alt="Why Gradient Boosting Regressor">
    </div>
    <div class="img-box" style="margin-top: 25px;">
      <img src="${IMGS.modelPerf}" style="max-height: 280px;" alt="Model Performance Metrics">
    </div>
  </div>

  <!-- PAGE 9 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">8</span></div>
    <p class="content-para">
      The finalized model pipeline was serialized using Joblib and integrated with the production web application. When a user submits student parameters, the system executes the pre-fitted preprocessing pipeline and feeds the transformed array to the model.
    </p>
    <p class="content-para">
      The application outputs the predicted score, performance percentage, academic risk tier, and customized actionable recommendations, delivering an end-to-end intelligent decision-support system.
    </p>
    <div class="img-box">
      <img src="${IMGS.integration}" style="max-height: 260px;" alt="Integration and Final Prediction">
    </div>
    <h2 class="section-heading">Applications & Stakeholder Benefits</h2>
    <ul class="bullet-list">
      <li><strong>Schools & Administration:</strong> Enables data-driven strategic planning, optimized allocation of tutoring resources, and continuous monitoring of institutional academic quality.</li>
      <li><strong>Educators & Mentors:</strong> Streamlines early detection of struggling students, reducing diagnostic overhead and facilitating timely personalized academic interventions.</li>
      <li><strong>Students:</strong> Instills constructive self-awareness regarding study discipline and attendance, accompanied by clear, actionable pathways for grade improvement.</li>
      <li><strong>Parents & Guardians:</strong> Provides transparent, objective insights into child academic progress, strengthening home-school collaboration.</li>
    </ul>
  </div>

  <!-- PAGE 10 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">9</span></div>
    <ul class="bullet-list" style="margin-bottom: 12px;">
      <li><strong>Evidence-Based Decision Making:</strong> Transforms traditional qualitative educational intuition into quantitative, evidence-based academic excellence strategies.</li>
    </ul>
    <div class="img-box">
      <img src="${IMGS.benefits}" style="max-height: 280px;" alt="Main Benefits">
    </div>
    <div class="img-box" style="margin-top: 15px;">
      <img src="${IMGS.impact}" style="max-height: 280px;" alt="Impact on Society and Education">
    </div>
  </div>

  <!-- PAGE 11 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">10</span></div>
    <h2 class="section-heading">Future Scope & Strategic Roadmap</h2>
    <p class="content-para">
      While EduVision AI currently delivers real-time prediction and tailored academic guidance, a comprehensive multi-phase roadmap is planned to expand its capabilities:
    </p>
    <p class="content-para">
      1. <strong>School ERP API Integration:</strong> Direct bi-directional integration with School Management Information Systems (MIS/ERP) to automate attendance synchronization, grade logging, and student onboarding without redundant manual data entry.
    </p>
    <p class="content-para">
      2. <strong>NLP-Based Feedback & Sentiment Analysis:</strong> Leveraging Natural Language Processing (NLP) to analyze student qualitative feedback, teacher remarks, and emotional sentiment to identify mental stress and non-academic learning impediments.
    </p>
    <p class="content-para">
      3. <strong>Native Mobile Applications for Parents:</strong> Developing cross-platform iOS and Android applications providing real-time notification alerts, push updates, and weekly progress telemetry directly to parents.
    </p>
    <div class="img-box">
      <img src="${IMGS.future}" style="max-height: 280px;" alt="Future Roadmap">
    </div>
  </div>

  <!-- PAGE 12 -->
  <div class="page">
    <div class="top-bar"></div>
    <div class="page-header"><span class="page-num">11</span></div>
    <p class="content-para" style="margin-top: 15px;">
      4. <strong>Interactive Conversational AI Tutor:</strong> Implementing an AI Chat Assistant powered by Large Language Models (LLMs) to answer student curriculum queries 24/7 and deliver individualized motivational coaching.
    </p>
    <p class="content-para">
      5. <strong>Unified Parent & School Analytics Dashboard:</strong> Centralized portal providing aggregated longitudinal tracking, institutional performance distributions, and predictive cohort analytics.
    </p>
    <p class="content-para">
      Through these systematic expansions, EduVision AI is dedicated to pioneering an intelligent, inclusive, and student-centric educational ecosystem that empowers every learner to realize their full potential.
    </p>
    <div style="margin-top: 80px;">
      <h2 class="section-heading" style="color: #2563eb; font-size: 16px; text-align: center; margin-bottom: 25px;">Conclusion & Official Endorsements</h2>
      <table class="sig-table">
        <tr>
          <td class="sig-cell">
            <div class="sig-line"></div>
            <div class="sig-name">Shri Manojbhai Parmar</div>
            <div class="sig-role">Project Mentor & Head<br>M. M. Karodiya Primary School</div>
          </td>
          <td class="sig-cell">
            <div class="sig-line"></div>
            <div class="sig-name">Yash Patel</div>
            <div class="sig-role">Developer & AI Researcher<br>Science Fair 2026</div>
          </td>
        </tr>
      </table>
    </div>
  </div>

</body>
</html>`;
}

async function generatePDFs() {
  console.log('Launching headless browser for PDF generation...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  // 1. Gujarati PDF
  console.log('Rendering Gujarati PDF...');
  const page1 = await browser.newPage();
  const gujaratiHTML = getGujaratiHTML();
  await page1.setContent(gujaratiHTML, { waitUntil: 'domcontentloaded', timeout: 60000 });
  try {
    await page1.evaluateHandle('document.fonts.ready');
  } catch (e) {
    console.log('Font wait skipped:', e.message);
  }
  const gujaratiPDFPath = path.join(OUT_DIR, 'EduVision_AI_Project_Report_Gujarati.pdf');
  await page1.pdf({
    path: gujaratiPDFPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  console.log(`Generated Gujarati PDF: ${gujaratiPDFPath}`);
  await page1.close();

  // 2. English PDF
  console.log('Rendering English PDF...');
  const page2 = await browser.newPage();
  const englishHTML = getEnglishHTML();
  await page2.setContent(englishHTML, { waitUntil: 'domcontentloaded', timeout: 60000 });
  try {
    await page2.evaluateHandle('document.fonts.ready');
  } catch (e) {
    console.log('Font wait skipped:', e.message);
  }
  const englishPDFPath = path.join(OUT_DIR, 'EduVision_AI_Project_Report_English.pdf');
  await page2.pdf({
    path: englishPDFPath,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  console.log(`Generated English PDF: ${englishPDFPath}`);
  await page2.close();

  await browser.close();
  console.log('All PDF reports successfully generated!');
}

generatePDFs().catch(err => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
