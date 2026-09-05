import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

BASE_DIR = "/Users/yashpatel/.gemini/antigravity/scratch/eduvision-ai"
IMG_DIR = os.path.join(BASE_DIR, "extracted_images")
OUT_DIR = os.path.join(BASE_DIR, "reports")
os.makedirs(OUT_DIR, exist_ok=True)

ORANGE = RGBColor(224, 106, 38)
BLUE = RGBColor(43, 84, 126)
DARK = RGBColor(34, 34, 34)
MUTED = RGBColor(100, 116, 139)

def add_header_bar(doc, page_num_str=""):
    """Adds top colored gradient or bar and page number in header."""
    section = doc.sections[-1]
    header = section.header
    header_para = header.paragraphs[0]
    header_para.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    header_para.text = ""
    
    # Colored top accent line
    tbl = header.add_table(rows=1, cols=2, width=Inches(6.5))
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    # Left cell colored bar, right cell page number
    cell_left = tbl.cell(0, 0)
    cell_left.width = Inches(5.5)
    p_l = cell_left.paragraphs[0]
    p_l.text = "EduVision AI – Science Fair Project Report"
    p_l.runs[0].font.size = Pt(8.5)
    p_l.runs[0].font.color.rgb = MUTED
    
    cell_right = tbl.cell(0, 1)
    cell_right.width = Inches(1.0)
    p_r = cell_right.paragraphs[0]
    p_r.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_r.text = page_num_str
    p_r.runs[0].font.size = Pt(9.5)
    p_r.runs[0].font.bold = True
    p_r.runs[0].font.color.rgb = BLUE

def style_heading(p, text, color=ORANGE, size=16, bold=True):
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(text)
    run.font.bold = bold
    run.font.size = Pt(size)
    run.font.color.rgb = color
    return run

def style_body(p, text="", bold_prefix="", bold_suffix="", size=11):
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.line_spacing = 1.25
    if bold_prefix:
        r_b = p.add_run(bold_prefix)
        r_b.font.bold = True
        r_b.font.size = Pt(size)
        r_b.font.color.rgb = DARK
    if text:
        r_t = p.add_run(text)
        r_t.font.size = Pt(size)
        r_t.font.color.rgb = DARK
    if bold_suffix:
        r_s = p.add_run(bold_suffix)
        r_s.font.bold = True
        r_s.font.size = Pt(size)
        r_s.font.color.rgb = DARK

def add_bullet(doc, title="", desc=""):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.2
    if title:
        r1 = p.add_run(title)
        r1.font.bold = True
        r1.font.size = Pt(10.5)
        r1.font.color.rgb = DARK
    if desc:
        r2 = p.add_run(desc)
        r2.font.size = Pt(10.5)
        r2.font.color.rgb = DARK

def add_centered_image(doc, img_name, width=Inches(5.6)):
    img_path = os.path.join(IMG_DIR, img_name)
    if os.path.exists(img_path):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(10)
        p.add_run().add_picture(img_path, width=width)
    else:
        print(f"Warning: image {img_path} not found")

# ==========================================
# 1. GUJARATI DOCX REPORT
# ==========================================
def build_gujarati_docx():
    doc = Document()
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.9)
        s.right_margin = Inches(0.9)

    # --- PAGE 1: COVER PAGE ---
    add_centered_image(doc, "page_1_img_2_X1.jpg", width=Inches(5.8))
    
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p_title.paragraph_format.space_before = Pt(16)
    p_title.paragraph_format.space_after = Pt(4)
    r_t = p_title.add_run("EduVision AI")
    r_t.font.bold = True
    r_t.font.size = Pt(30)
    r_t.font.color.rgb = RGBColor(15, 23, 42)

    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(12)
    r_s = p_sub.add_run("AI આધારિત વિદ્યાર્થી પ્રદર્શન આગાહી અને વ્યક્તિગત માર્ગદર્શન પ્રણાલી")
    r_s.font.bold = True
    r_s.font.size = Pt(13)
    r_s.font.color.rgb = BLUE

    p_link = doc.add_paragraph()
    p_link.paragraph_format.space_after = Pt(4)
    p_link.add_run("પ્રોજેક્ટ વેબસાઇટ લિન્ક - ").font.bold = True
    r_l1 = p_link.add_run("https://eduvision-ai-kappa.vercel.app/ ")
    r_l1.font.color.rgb = RGBColor(37, 99, 235)
    r_l1.font.underline = True
    p_link.add_run("(અથવા: https://eduvision-ai.streamlit.app/)").font.size = Pt(9.5)

    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_before = Pt(10)
    p_div.paragraph_format.space_after = Pt(20)
    p_div.add_run("─" * 35).font.color.rgb = RGBColor(203, 213, 225)

    p_meta1 = doc.add_paragraph()
    p_meta1.paragraph_format.space_after = Pt(6)
    r_m1_t = p_meta1.add_run("માર્ગદર્શક : ")
    r_m1_t.font.bold = True
    r_m1_t.font.size = Pt(13)
    r_m1_t.font.color.rgb = BLUE
    r_m1_v = p_meta1.add_run("શ્રી મનોજભાઈ પરમાર")
    r_m1_v.font.bold = True
    r_m1_v.font.size = Pt(13)
    r_m1_v.font.color.rgb = DARK

    p_meta2 = doc.add_paragraph()
    p_meta2.paragraph_format.space_after = Pt(6)
    r_m2_t = p_meta2.add_run("શાળા : ")
    r_m2_t.font.bold = True
    r_m2_t.font.size = Pt(13)
    r_m2_t.font.color.rgb = BLUE
    r_m2_v = p_meta2.add_run("એમ. એમ. કરોડીયા પ્રાથમિક શાળા, તારસાડી કોસંબા (R.S)")
    r_m2_v.font.bold = True
    r_m2_v.font.size = Pt(13)
    r_m2_v.font.color.rgb = DARK

    p_meta3 = doc.add_paragraph()
    p_meta3.paragraph_format.space_after = Pt(6)
    r_m3_t = p_meta3.add_run("પ્રસ્તુતકર્તા : ")
    r_m3_t.font.bold = True
    r_m3_t.font.size = Pt(12)
    r_m3_t.font.color.rgb = BLUE
    r_m3_v = p_meta3.add_run("યશ પટેલ (વિજ્ઞાન મેળો ૨૦૨૬)")
    r_m3_v.font.bold = True
    r_m3_v.font.size = Pt(12)
    r_m3_v.font.color.rgb = DARK

    doc.add_page_break()

    # --- PAGE 2 ---
    p_num1 = doc.add_paragraph()
    p_num1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num1.add_run("1").font.bold = True

    style_heading(doc.add_paragraph(), "કૃતિ નું નામ")
    style_body(doc.add_paragraph(), 
               "EduVision AI - AI આધારિત વિદ્યાર્થી પ્રદર્શન આગાહી અને વ્યક્તિગત શૈક્ષણિક માર્ગદર્શન પ્રણાલી\n"
               "વિદ્યાર્થીના શૈક્ષણિક ડેટા પરથી અંતિમ ગુણની આગાહી, જોખમ વિશ્લેષણ અને વ્યક્તિગત અભ્યાસ ભલામણો આપતું વ્યાવસાયિક શૈક્ષણિક AI ડેશબોર્ડ.")

    style_heading(doc.add_paragraph(), "હેતુ")
    style_body(doc.add_paragraph(),
               "વિદ્યાર્થીઓના અગાઉના શૈક્ષણિક ડેટા, અભ્યાસની આદતો અને અન્ય મહત્વપૂર્ણ પરિબળોના આધારે ",
               bold_suffix="")
    p_obj1 = doc.paragraphs[-1]
    r_bold1 = p_obj1.add_run("Artificial Intelligence (AI) અને Machine Learning(ML)")
    r_bold1.font.bold = True
    p_obj1.add_run(" ટેક્નોલોજીનો ઉપયોગ કરીને તેમના ભવિષ્યના શૈક્ષણિક પ્રદર્શનની આગાહી કરવી તેમજ સમયસર વ્યક્તિગત અભ્યાસ માર્ગદર્શન પૂરું પાડવું એ આ પ્રોજેક્ટનો મુખ્ય હેતુ છે.")

    style_body(doc.add_paragraph(),
               "આ પ્રોજેક્ટ દ્વારા શિક્ષકોને નબળા વિદ્યાર્થીઓની વહેલી ઓળખ કરવામાં મદદ મળે છે, જેથી તેઓ સમયસર યોગ્ય માર્ગદર્શન આપી શકે. સાથે જ વિદ્યાર્થીઓ પોતાની નબળાઈઓને સમજીને તેમાં સુધારો કરી શકે અને તેમના શૈક્ષણિક પરિણામોમાં વધારો કરી શકે.")

    add_centered_image(doc, "page_2_img_2_X3.jpg", width=Inches(5.4))
    doc.add_page_break()

    # --- PAGE 3 ---
    p_num2 = doc.add_paragraph()
    p_num2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num2.add_run("2").font.bold = True

    style_heading(doc.add_paragraph(), "સિદ્ધાંત")
    style_body(doc.add_paragraph(),
               "વિદ્યાર્થીના અગાઉના શૈક્ષણિક ડેટા અને અભ્યાસ સંબંધિત પરિબળોના આધારે તેના ભવિષ્યના પ્રદર્શનની આગાહી કરી શકાય છે. આ આગાહીના આધારે સમયસર યોગ્ય માર્ગદર્શન આપવાથી વિદ્યાર્થીના શૈક્ષણિક પરિણામોમાં સુધારો શક્ય બને છે.")

    add_centered_image(doc, "page_3_img_2_X5.jpg", width=Inches(5.4))

    style_heading(doc.add_paragraph(), "સાધનો")
    p_hw = doc.add_paragraph()
    p_hw.add_run("હાર્ડવેર (Hardware)").font.bold = True
    add_bullet(doc, "લેપટોપ (Laptop) અને ઇન્ટરનેટ જોડાણ (Internet Connection)")

    p_sw = doc.add_paragraph()
    p_sw.paragraph_format.space_before = Pt(6)
    p_sw.add_run("સોફ્ટવેર (Software)").font.bold = True
    add_bullet(doc, "પાયથોન (Python) અને નેક્સ્ટ જેએસ (Next.js 14) / સ્ટ્રીમલિટ (Streamlit)")
    add_bullet(doc, "વિઝ્યુઅલ સ્ટુડિયો કોડ (VS Code) અને જ્યુપિટર નોટબુક (Jupyter Notebook)")
    add_bullet(doc, "એનાકોન્ડા (Anaconda) અને ફાસ્ટએપીઆઈ (FastAPI Framework)")

    doc.add_page_break()

    # --- PAGE 4 ---
    p_num3 = doc.add_paragraph()
    p_num3.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num3.add_run("3").font.bold = True

    style_heading(doc.add_paragraph(), "પાયથોન લાઇબ્રેરી (Python Libraries)")
    add_bullet(doc, "પાન્ડાસ (Pandas): ", "ડેટા વિશ્લેષણ, ડેટાફ્રેમ હેન્ડલિંગ અને મેનીપ્યુલેશન માટે.")
    add_bullet(doc, "નમપાય (NumPy): ", "ગાણિતિક ગણતરીઓ અને બહુપરિમાણીય એરે પ્રોસેસિંગ માટે.")
    add_bullet(doc, "સાઇકિટ-લર્ન (Scikit-learn): ", "મશીન લર્નિંગ મોડેલિંગ, પાઇપલાઇન અને પ્રીપ્રોસેસિંગ માટે.")
    add_bullet(doc, "મેટપ્લોટલિબ (Matplotlib) & સીબોર્ન (Seaborn): ", "ડેટા વિઝ્યુઅલાઇઝેશન અને ચાર્ટ ગ્રાફિક્સ માટે.")
    add_bullet(doc, "જોબલિબ (Joblib): ", "તાલીમ પામેલા પ્રશિક્ષિત ML મોડેલના સેવિંગ અને સીરિયલાઇઝેશન માટે.")
    add_bullet(doc, "ફાસ્ટએપીઆઈ (FastAPI): ", "હાઇ-સ્પીડ એસિન્ક્રોનસ રેસ્ટફુલ (RESTful) અનુમાન API સેવાઓ માટે.")

    style_heading(doc.add_paragraph(), "ડેટાસેટ સમૂહ (Dataset)")
    add_bullet(doc, "વિદ્યાર્થી શૈક્ષણિક પ્રદર્શન માહિતી સમૂહ (Student Performance Dataset)")
    add_bullet(doc, "સ્ત્રોત લિન્ક: ", "https://archive.ics.uci.edu/dataset/320/student+performance")
    add_bullet(doc, "ડેટાસેટ વર્ણન: ", "યુસીઆઈ મશીન લર્નિંગ રિપોઝિટરીમાંથી મેળવેલ 395 વિદ્યાર્થીઓના વાસ્તવિક શૈક્ષણિક રેકોર્ડ્સ, જેમાં અગાઉના પરીક્ષા ગુણ (G1, G2), અભ્યાસ સમય, ગેરહાજરી, કૌટુંબિક સહાય અને આરોગ્ય જેવા 33 પરિબળો સમાવિષ્ટ છે.")

    doc.add_page_break()

    # --- PAGE 5 ---
    p_num4 = doc.add_paragraph()
    p_num4.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num4.add_run("4").font.bold = True

    style_heading(doc.add_paragraph(), "રચના")
    style_body(doc.add_paragraph(),
               "EduVision AI ની રચના એક વેબ આધારિત બુદ્ધિશાળી શૈક્ષણિક પ્રણાલી તરીકે કરવામાં આવી છે. આ પ્રણાલીમાં મુખ્યત્વે વપરાશકર્તા (User), વેબ એપ્લિકેશન (Web Application), માહિતી પૂર્વપ્રક્રિયા પ્રણાલી (Data Preprocessing Module), યંત્ર અધ્યયન મોડેલ (Machine Learning Model) અને પરિણામ પ્રણાલી (Output Module) જેવા મુખ્ય ઘટકોનો સમાવેશ થાય છે.\n\n"
               "સૌપ્રથમ વપરાશકર્તા વેબ એપ્લિકેશનમાં વિદ્યાર્થીની જરૂરી શૈક્ષણિક માહિતી દાખલ કરે છે. ત્યારબાદ આ માહિતી પૂર્વપ્રક્રિયા પ્રણાલી સુધી પહોંચે છે, જ્યાં માહિતીનું જરૂરી રૂપાંતરણ અને તૈયારી કરવામાં આવે છે.\n\n"
               "પૂર્વપ્રક્રિયા પૂર્ણ થયા પછી માહિતી પ્રશિક્ષિત યંત્ર અધ્યયન મોડેલ સુધી પહોંચે છે. આ મોડેલ વિદ્યાર્થીના શૈક્ષણિક ડેટાનું વિશ્લેષણ કરીને તેના સંભવિત અંતિમ પરિણામની આગાહી કરે છે.\n\n"
               "મોડેલ દ્વારા પ્રાપ્ત થયેલા પરિણામના આધારે સિસ્ટમ વિદ્યાર્થીના જોખમનું વિશ્લેષણ કરે છે અને તેના માટે વ્યક્તિગત અભ્યાસ માર્ગદર્શન તૈયાર કરે છે. અંતે સમગ્ર માહિતી વેબ એપ્લિકેશન દ્વારા સરળ અને વ્યવસ્થિત અહેવાલ (Report) સ્વરૂપે વપરાશકર્તાને રજૂ કરવામાં આવે છે.\n\n"
               "આ રીતે EduVision AI ની રચનામાં માહિતી દાખલ કરવાથી લઈને અંતિમ આગાહી, જોખમ વિશ્લેષણ અને વ્યક્તિગત માર્ગદર્શન સુધીના તમામ મુખ્ય ઘટકો એકબીજા સાથે સંકલિત રીતે કાર્ય કરે છે.")

    add_centered_image(doc, "page_5_img_2_X8.jpg", width=Inches(5.4))
    doc.add_page_break()

    # --- PAGE 6 ---
    p_num5 = doc.add_paragraph()
    p_num5.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num5.add_run("5").font.bold = True

    style_heading(doc.add_paragraph(), "કાર્યપદ્ધતિ")
    add_centered_image(doc, "page_6_img_2_X10.jpg", width=Inches(5.5))

    style_body(doc.add_paragraph(),
               "EduVision AI પ્રોજેક્ટની કાર્યપદ્ધતિ એક સુવ્યવસ્થિત યંત્ર અધ્યયન (Machine Learning) પ્રક્રિયા પર આધારિત છે. સૌપ્રથમ યુસીઆઈ યંત્ર અધ્યયન માહિતી ભંડાર (UCI Machine Learning Repository) માંથી વિદ્યાર્થી શૈક્ષણિક પ્રદર્શન માહિતી સમૂહ (Student Performance Dataset) મેળવવામાં આવ્યો. ત્યારબાદ માહિતીનું નિરીક્ષણ કરીને તેમાં રહેલા પરિબળો, માહિતીના પ્રકારો અને માહિતીની ગુણવત્તાની ચકાસણી કરવામાં આવી.\n\n"
               "આગળના તબક્કામાં માહિતીનું સંશોધનાત્મક વિશ્લેષણ (Exploratory Data Analysis – EDA) કરવામાં આવ્યું, જેના દ્વારા વિવિધ પરિબળો વચ્ચેના સંબંધો અને માહિતીના વિતરણને સમજવામાં આવ્યું. ત્યારબાદ માહિતી શુદ્ધિકરણ (Data Cleaning), માહિતી પૂર્વપ્રક્રિયા (Data Preprocessing), લક્ષણ નિર્માણ (Feature Engineering) તથા લક્ષણ પસંદગી (Feature Selection) જેવી પ્રક્રિયાઓ પૂર્ણ કરીને માહિતીને યંત્ર અધ્યયન માટે યોગ્ય સ્વરૂપમાં તૈયાર કરવામાં આવી.\n\n"
               "તૈયાર થયેલી માહિતીને તાલીમ માહિતી (Training Data - 80%) અને પરીક્ષણ માહિતી (Testing Data - 20%) એમ બે ભાગોમાં વિભાજિત કરવામાં આવી. ત્યારબાદ પ્રમાણભૂતકરણ (StandardScaler), શ્રેણીબદ્ધ માહિતીનું રૂપાંતરણ...")

    doc.add_page_break()

    # --- PAGE 7 ---
    p_num6 = doc.add_paragraph()
    p_num6.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num6.add_run("6").font.bold = True

    style_body(doc.add_paragraph(),
               "રૂપાંતરણ (OneHotEncoder) અને કૉલમ રૂપાંતરણ (ColumnTransformer) નો સમાવેશ કરતી પાઇપલાઇન (Pipeline) તૈયાર કરવામાં આવી, જેથી તમામ માહિતી પર એકસરખી અને ચોક્કસ પ્રક્રિયા થઈ શકે.")

    add_centered_image(doc, "page_7_img_2_X12.jpg", width=Inches(5.4))

    style_body(doc.add_paragraph(),
               "ત્યારબાદ વિવિધ યંત્ર અધ્યયન મોડેલો, જેમ કે રેખીય પ્રતિગમન (Linear Regression), રેન્ડમ ફોરેસ્ટ પ્રતિગમન (Random Forest Regressor) અને ગ્રેડિયન્ટ બુસ્ટિંગ પ્રતિગમન (Gradient Boosting Regressor) નું પ્રશિક્ષણ અને મૂલ્યાંકન કરવામાં આવ્યું. મોડેલોના કાર્યક્ષમતાનું મૂલ્યાંકન આર-સ્ક્વેર ગુણાંક (R² Score), સરેરાશ નિરપેક્ષ ભૂલ (Mean Absolute Error – MAE) તથા ક્રોસ વેલિડેશન (Cross Validation) જેવા માપદંડોના આધારે કરવામાં આવ્યું. આ તમામ મોડેલોમાંથી ગ્રેડિયન્ટ બુસ્ટિંગ પ્રતિગમન (Gradient Boosting Regressor) એ સૌથી વધુ ચોકસાઈ અને શ્રેષ્ઠ પરિણામ આપતાં તેને અંતિમ મોડેલ તરીકે પસંદ કરવામાં આવ્યો.")

    doc.add_page_break()

    # --- PAGE 8 ---
    p_num7 = doc.add_paragraph()
    p_num7.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num7.add_run("7").font.bold = True

    style_heading(doc.add_paragraph(), "મોડેલ પસંદગી અને ચોકસાઈનું મૂલ્યાંકન")
    add_centered_image(doc, "page_8_img_2_X14.jpg", width=Inches(5.4))
    add_centered_image(doc, "page_8_img_3_X15.jpg", width=Inches(5.4))

    doc.add_page_break()

    # --- PAGE 9 ---
    p_num8 = doc.add_paragraph()
    p_num8.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num8.add_run("8").font.bold = True

    style_body(doc.add_paragraph(),
               "પસંદ કરાયેલા મોડેલને જોબલિબ (Joblib) ની મદદથી સંગ્રહિત કરીને વેબ એપ્લિકેશન સાથે સંકલિત કરવામાં આવ્યો. ત્યારબાદ વપરાશકર્તા જ્યારે વિદ્યાર્થીની માહિતી દાખલ કરે છે ત્યારે તે માહિતી પર જરૂરી પૂર્વપ્રક્રિયા કરવામાં આવે છે અને પ્રશિક્ષિત મોડેલ સુધી પહોંચાડવામાં આવે છે. મોડેલ વિદ્યાર્થીના સંભવિત અંતિમ ગુણની આગાહી કરે છે, તેના શૈક્ષણિક જોખમનું વિશ્લેષણ કરે છે અને તેના આધારે વ્યક્તિગત અભ્યાસ માર્ગદર્શન તૈયાર કરે છે.\n\n"
               "અંતે સિસ્ટમ વપરાશકર્તાને અનુમાનિત ગુણ, જોખમનું સ્તર, વ્યક્તિગત અહેવાલ, અભ્યાસ માટેની સૂચનાઓ તથા ચાર્ટ અને વિશ્લેષણ સાથેનું પરિણામ રજૂ કરે છે. આ રીતે સમગ્ર પ્રોજેક્ટ માહિતીના સંગ્રહથી લઈને અંતિમ આગાહી અને માર્ગદર્શન સુધીની સંપૂર્ણ યંત્ર અધ્યયન પ્રક્રિયાને સફળતાપૂર્વક અમલમાં મૂકે છે.")

    add_centered_image(doc, "page_9_img_2_X17.jpg", width=Inches(5.4))

    style_heading(doc.add_paragraph(), "ઉપયોગ અને ફાયદા")
    add_bullet(doc, "શાળાઓ અને વાલીઓ માટે: ", "EduVision AI પ્રોજેક્ટનો ઉપયોગ શાળાઓ, શિક્ષકો, વિદ્યાર્થીઓ અને વાલીઓ માટે એક બુદ્ધિશાળી શૈક્ષણિક સહાયક તરીકે થઈ શકે છે. આ પ્રોજેક્ટ વિદ્યાર્થીના શૈક્ષણિક ડેટાનું વિશ્લેષણ કરીને તેના ભવિષ્યના પ્રદર્શનની આગાહી કરે છે અને સમયસર યોગ્ય માર્ગદર્શન આપવામાં મદદરૂપ બને છે.")
    add_bullet(doc, "શિક્ષકો માટે મૂલ્ય: ", "આ પ્રોજેક્ટ દ્વારા શિક્ષકોને દરેક વિદ્યાર્થીના શૈક્ષણિક વિકાસનું વિશ્લેષણ કરવામાં સરળતા રહે છે અને નબળા વિદ્યાર્થીઓની વહેલી ઓળખ કરી શકાય છે. તેના આધારે સમયસર યોગ્ય શૈક્ષણિક માર્ગદર્શન અને જરૂરી સહાય પૂરી પાડી શકાય છે.")
    add_bullet(doc, "વિદ્યાર્થીઓ માટે આત્મજાગૃતિ: ", "વિદ્યાર્થીઓ માટે આ પ્રોજેક્ટ તેમની શૈક્ષણિક નબળાઈઓને ઓળખવામાં અને અભ્યાસની યોગ્ય યોજના બનાવવામાં મદદરૂપ બને છે. વ્યક્તિગત અભ્યાસ માર્ગદર્શન મળવાથી તેઓ પોતાના પરિણામમાં સુધારો કરી શકે છે અને આત્મવિશ્વાસમાં વધારો કરી શકે છે.")
    add_bullet(doc, "વાલીઓ સાથે પારદર્શિતા: ", "વાલીઓ માટે આ પ્રોજેક્ટ તેમના બાળકની શૈક્ષણિક પ્રગતિ વિશે સમયસર માહિતી ઉપલબ્ધ કરાવે છે, જેથી તેઓ પણ બાળકના અભ્યાસમાં યોગ્ય સહયોગ આપી શકે.")

    doc.add_page_break()

    # --- PAGE 10 ---
    p_num9 = doc.add_paragraph()
    p_num9.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num9.add_run("9").font.bold = True

    add_bullet(doc, "સંસ્થાકીય આયોજન: ", "શાળા માટે આ પ્રોજેક્ટ શૈક્ષણિક આયોજન, પરિણામનું વિશ્લેષણ અને વિદ્યાર્થીઓના સર્વાંગી વિકાસ માટે ઉપયોગી સાબિત થઈ શકે છે. ઉપરાંત, માહિતી આધારિત (Data-driven) નિર્ણય લેવામાં પણ મદદરૂપ બને છે.")

    add_centered_image(doc, "page_10_img_2_X19.jpg", width=Inches(5.3))
    add_centered_image(doc, "page_10_img_3_X20.jpg", width=Inches(5.3))

    doc.add_page_break()

    # --- PAGE 11 ---
    p_num10 = doc.add_paragraph()
    p_num10.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num10.add_run("10").font.bold = True

    style_heading(doc.add_paragraph(), "ભવિષ્યની યોજના (Future Scope)")
    style_body(doc.add_paragraph(),
               "EduVision AI પ્રોજેક્ટ હાલમાં વિદ્યાર્થીના શૈક્ષણિક પ્રદર્શનની આગાહી અને વ્યક્તિગત અભ્યાસ માર્ગદર્શન પૂરું પાડે છે. ભવિષ્યમાં આ પ્રોજેક્ટને વધુ આધુનિક, ઉપયોગી અને વ્યાપક બનાવવા માટે વિવિધ નવી સુવિધાઓ ઉમેરવાની યોજના છે.\n\n"
               "સૌપ્રથમ, શાળાની વર્તમાન વ્યવસ્થાપન પ્રણાલી (School ERP System) સાથે એપ્લિકેશન પ્રોગ્રામિંગ ઇન્ટરફેસ (Application Programming Interface – API) દ્વારા સંકલન કરવામાં આવશે. આથી વિદ્યાર્થીની હાજરી, પરીક્ષાના ગુણ અને અન્ય શૈક્ષણિક માહિતી આપોઆપ સિસ્ટમમાં ઉપલબ્ધ થઈ શકશે અને વારંવાર માહિતી દાખલ કરવાની જરૂર રહેશે નહીં.\n\n"
               "ત્યારબાદ પ્રાકૃતિક ભાષા પ્રક્રિયા (Natural Language Processing – NLP) નો ઉપયોગ કરીને વિદ્યાર્થીઓના પ્રતિભાવો, અભિપ્રાયો અને લખાણનું વિશ્લેષણ કરવાની સુવિધા ઉમેરવામાં આવશે. તેના આધારે વિદ્યાર્થીની શૈક્ષણિક મુશ્કેલીઓ, માનસિક તણાવ અથવા અભ્યાસ સંબંધિત પડકારોને વધુ સારી રીતે ઓળખી શકાશે.\n\n"
               "આ ઉપરાંત વાલીઓ માટે મોબાઇલ એપ્લિકેશન (Mobile Application) વિકસાવવામાં આવશે, જેના દ્વારા તેઓ પોતાના બાળકના શૈક્ષણિક વિકાસ, પરિણામો અને અભ્યાસ સંબંધિત સૂચનાઓ ગમે ત્યારે જોઈ શકશે. સાથે જ મહત્વપૂર્ણ માહિતી અને ચેતવણીઓ (Alerts) પણ સીધી મોબાઇલ પર પ્રાપ્ત થશે.")

    add_centered_image(doc, "page_11_img_2_X22.jpg", width=Inches(5.4))

    doc.add_page_break()

    # --- PAGE 12 ---
    p_num11 = doc.add_paragraph()
    p_num11.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num11.add_run("11").font.bold = True

    style_body(doc.add_paragraph(),
               "ભવિષ્યમાં AI Chat Assistant પણ ઉમેરવાની યોજના છે, જે વિદ્યાર્થીઓ અને વાલીઓના પ્રશ્નોના તાત્કાલિક જવાબ આપી શકશે તથા અભ્યાસ સંબંધિત માર્ગદર્શન અને સૂચનો પ્રદાન કરશે.\n\n"
               "વાલીઓ માટે એક અલગ નિયંત્રણ ફલક (Dashboard) પણ વિકસાવવામાં આવશે, જેમાં વિદ્યાર્થીના ગુણ, પ્રગતિ, હાજરી, જોખમનું સ્તર અને શૈક્ષણિક વિકાસનો સંપૂર્ણ અહેવાલ એક જ સ્થળે સરળતાથી જોઈ શકાશે.\n\n"
               "આ તમામ સુધારાઓ દ્વારા EduVision AI ને વધુ બુદ્ધિશાળી, સ્વચાલિત અને સર્વાંગી શૈક્ષણિક સહાયક પ્રણાલી તરીકે વિકસાવવાનો હેતુ છે, જેથી વિદ્યાર્થીઓ, શિક્ષકો, વાલીઓ અને શાળાઓને વધુ અસરકારક અને માહિતી આધારિત નિર્ણયો લેવામાં સહાય મળી શકે.")

    style_heading(doc.add_paragraph(), "સમાપન અને સહીઓ (Conclusion & Signatures)", color=BLUE, size=13)
    
    tbl_sig = doc.add_table(rows=2, cols=2)
    tbl_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    c00 = tbl_sig.cell(0, 0)
    c00.width = Inches(3.2)
    p00 = c00.paragraphs[0]
    p00.add_run("______________________________\n").font.bold = True
    p00.add_run("શ્રી મનોજભાઈ પરમાર\n").font.bold = True
    p00.add_run("માર્ગદર્શક શિક્ષક (પ્રોજેક્ટ હેડ)\nએમ. એમ. કરોડિયા પ્રાથમિક શાળા").font.size = Pt(9.5)

    c01 = tbl_sig.cell(0, 1)
    c01.width = Inches(3.2)
    p01 = c01.paragraphs[0]
    p01.add_run("______________________________\n").font.bold = True
    p01.add_run("યશ પટેલ\n").font.bold = True
    p01.add_run("પ્રોજેક્ટ ડેવલપર & સંશોધક\nવિજ્ઞાન મેળો ૨૦૨૬").font.size = Pt(9.5)

    out_file = os.path.join(OUT_DIR, "EduVision_AI_Project_Report_Gujarati.docx")
    doc.save(out_file)
    print(f"Generated Gujarati DOCX: {out_file}")

# ==========================================
# 2. ENGLISH DOCX REPORT
# ==========================================
def build_english_docx():
    doc = Document()
    for s in doc.sections:
        s.top_margin = Inches(0.8)
        s.bottom_margin = Inches(0.8)
        s.left_margin = Inches(0.9)
        s.right_margin = Inches(0.9)

    # --- PAGE 1: COVER PAGE ---
    add_centered_image(doc, "page_1_img_2_X1.jpg", width=Inches(5.8))
    
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p_title.paragraph_format.space_before = Pt(16)
    p_title.paragraph_format.space_after = Pt(4)
    r_t = p_title.add_run("EduVision AI")
    r_t.font.bold = True
    r_t.font.size = Pt(30)
    r_t.font.color.rgb = RGBColor(15, 23, 42)

    p_sub = doc.add_paragraph()
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(12)
    r_s = p_sub.add_run("AI-Powered Student Academic Performance Prediction & Personalized Guidance System")
    r_s.font.bold = True
    r_s.font.size = Pt(13)
    r_s.font.color.rgb = BLUE

    p_link = doc.add_paragraph()
    p_link.paragraph_format.space_after = Pt(4)
    p_link.add_run("Project Live Website Link: ").font.bold = True
    r_l1 = p_link.add_run("https://eduvision-ai-kappa.vercel.app/ ")
    r_l1.font.color.rgb = RGBColor(37, 99, 235)
    r_l1.font.underline = True
    p_link.add_run("(Alternative: https://eduvision-ai.streamlit.app/)").font.size = Pt(9.5)

    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_before = Pt(10)
    p_div.paragraph_format.space_after = Pt(20)
    p_div.add_run("─" * 45).font.color.rgb = RGBColor(203, 213, 225)

    p_meta1 = doc.add_paragraph()
    p_meta1.paragraph_format.space_after = Pt(6)
    r_m1_t = p_meta1.add_run("Project Mentor: ")
    r_m1_t.font.bold = True
    r_m1_t.font.size = Pt(13)
    r_m1_t.font.color.rgb = BLUE
    r_m1_v = p_meta1.add_run("Shri Manojbhai Parmar")
    r_m1_v.font.bold = True
    r_m1_v.font.size = Pt(13)
    r_m1_v.font.color.rgb = DARK

    p_meta2 = doc.add_paragraph()
    p_meta2.paragraph_format.space_after = Pt(6)
    r_m2_t = p_meta2.add_run("School: ")
    r_m2_t.font.bold = True
    r_m2_t.font.size = Pt(13)
    r_m2_t.font.color.rgb = BLUE
    r_m2_v = p_meta2.add_run("M. M. Karodiya Primary School, Tarsadi Kosamba (R.S)")
    r_m2_v.font.bold = True
    r_m2_v.font.size = Pt(13)
    r_m2_v.font.color.rgb = DARK

    p_meta3 = doc.add_paragraph()
    p_meta3.paragraph_format.space_after = Pt(6)
    r_m3_t = p_meta3.add_run("Developer & Researcher: ")
    r_m3_t.font.bold = True
    r_m3_t.font.size = Pt(12)
    r_m3_t.font.color.rgb = BLUE
    r_m3_v = p_meta3.add_run("Yash Patel (Science Fair 2026)")
    r_m3_v.font.bold = True
    r_m3_v.font.size = Pt(12)
    r_m3_v.font.color.rgb = DARK

    doc.add_page_break()

    # --- PAGE 2 ---
    p_num1 = doc.add_paragraph()
    p_num1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num1.add_run("1").font.bold = True

    style_heading(doc.add_paragraph(), "Project Title")
    style_body(doc.add_paragraph(), 
               "EduVision AI – Artificial Intelligence Powered Student Performance Prediction and Personalized Academic Mentorship System\n"
               "A professional, production-grade educational intelligence dashboard predicting final grades, assessing academic risk levels, and generating tailored study recommendations based on multi-dimensional student data.")

    style_heading(doc.add_paragraph(), "Project Objectives")
    style_body(doc.add_paragraph(),
               "The primary objective of this project is to leverage cutting-edge ",
               bold_suffix="")
    p_obj1 = doc.paragraphs[-1]
    r_bold1 = p_obj1.add_run("Artificial Intelligence (AI) and Machine Learning (ML)")
    r_bold1.font.bold = True
    p_obj1.add_run(" technologies to analyze students' historical academic marks, daily study routines, behavioral factors, and attendance records, thereby accurately forecasting future academic performance and providing proactive, timely mentorship.")

    style_body(doc.add_paragraph(),
               "The system enables educators to identify academically vulnerable students well in advance of final board examinations, facilitating targeted remedial intervention. Simultaneously, it empowers students with clear self-awareness of their learning habits, fostering measurable performance improvement and academic confidence.")

    add_centered_image(doc, "page_2_img_2_X3.jpg", width=Inches(5.4))
    doc.add_page_break()

    # --- PAGE 3 ---
    p_num2 = doc.add_paragraph()
    p_num2.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num2.add_run("2").font.bold = True

    style_heading(doc.add_paragraph(), "Core Scientific Principle")
    style_body(doc.add_paragraph(),
               "A student's future academic performance is strongly correlated with preceding internal evaluations (G1 and G2 exam scores) along with behavioral variables (daily study duration, school absences, educational support, and health status). By applying non-linear ensemble regression algorithms, these interactions can be mapped precisely, enabling timely corrective interventions that maximize academic potential.")

    add_centered_image(doc, "page_3_img_2_X5.jpg", width=Inches(5.4))

    style_heading(doc.add_paragraph(), "System Specifications & Requirements")
    p_hw = doc.add_paragraph()
    p_hw.add_run("Hardware Requirements").font.bold = True
    add_bullet(doc, "Modern Computing Device (Laptop / Desktop / Tablet) with High-Speed Internet Connection")

    p_sw = doc.add_paragraph()
    p_sw.paragraph_format.space_before = Pt(6)
    p_sw.add_run("Software & Development Environment").font.bold = True
    add_bullet(doc, "Python 3.11+ Runtime & Next.js 14 Production Web Application")
    add_bullet(doc, "FastAPI High-Performance Asynchronous Python Microframework")
    add_bullet(doc, "Visual Studio Code (VS Code) & Jupyter Notebook Development Suite")
    add_bullet(doc, "Anaconda Package & Virtual Environment Manager")

    doc.add_page_break()

    # --- PAGE 4 ---
    p_num3 = doc.add_paragraph()
    p_num3.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num3.add_run("3").font.bold = True

    style_heading(doc.add_paragraph(), "Python Scientific Libraries")
    add_bullet(doc, "Pandas: ", "High-performance structured data manipulation, CSV processing, and tabular analysis.")
    add_bullet(doc, "NumPy: ", "Numerical linear algebra computations, array transforms, and statistical calculations.")
    add_bullet(doc, "Scikit-Learn: ", "State-of-the-art machine learning model training, pipelines, and evaluation metrics.")
    add_bullet(doc, "Matplotlib & Seaborn: ", "Statistical data visualization, distribution plots, and correlation heatmaps.")
    add_bullet(doc, "Joblib: ", "High-efficiency serialization and persistent storage of the trained machine learning pipeline.")
    add_bullet(doc, "FastAPI & Uvicorn: ", "Production REST API server delivering low-latency inference endpoints.")

    style_heading(doc.add_paragraph(), "Dataset Benchmark Information")
    add_bullet(doc, "Student Performance Benchmark Dataset")
    add_bullet(doc, "Repository Link: ", "https://archive.ics.uci.edu/dataset/320/student+performance")
    add_bullet(doc, "Dataset Description: ", "Curated from the UCI Machine Learning Repository, comprising 395 verified student records spanning 33 demographic, academic, and social variables, capturing comprehensive behavioral profiles and subsequent academic outcomes.")

    doc.add_page_break()

    # --- PAGE 5 ---
    p_num4 = doc.add_paragraph()
    p_num4.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num4.add_run("4").font.bold = True

    style_heading(doc.add_paragraph(), "System Architecture")
    style_body(doc.add_paragraph(),
               "EduVision AI is engineered as a robust, decoupled, cloud-ready web architecture. The framework comprises five foundational tiers: User Interaction Tier, Responsive Web Application (Next.js 14), Feature Preprocessing Pipeline, Machine Learning Inference Engine (Gradient Boosting), and Personalized Output Generation Module.\n\n"
               "The user inputs student credentials and evaluation parameters through a responsive interface. The incoming payload undergoes real-time schema validation and transformation within the preprocessing pipeline.\n\n"
               "The normalized features are forwarded to the trained Gradient Boosting model, which computes an exact numerical prediction of the student's expected final score (G3) out of 20.\n\n"
               "Based on the prediction and key feature importances, the system categorizes the student into precise risk bands (Excellent, Good, Moderate, or High Attention) and generates dynamic remedial advice. Finally, the student report card and interactive dashboard visualizations are rendered instantaneously.")

    add_centered_image(doc, "page_5_img_2_X8.jpg", width=Inches(5.4))
    doc.add_page_break()

    # --- PAGE 6 ---
    p_num5 = doc.add_paragraph()
    p_num5.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num5.add_run("5").font.bold = True

    style_heading(doc.add_paragraph(), "Machine Learning Methodology")
    add_centered_image(doc, "page_6_img_2_X10.jpg", width=Inches(5.5))

    style_body(doc.add_paragraph(),
               "The development methodology follows a rigorous 7-stage Machine Learning lifecycle. Beginning with dataset acquisition from the UCI Machine Learning Repository, comprehensive quality verification and missing-value diagnostics were conducted.\n\n"
               "Subsequent Exploratory Data Analysis (EDA) mapped the mathematical correlations between study hours, absenteeism, and evaluation scores. Rigorous data cleaning, feature engineering, and feature selection isolated the 12 most impactful academic indicators.\n\n"
               "The dataset was partitioned into an 80% training set and a 20% independent testing set. Feature preprocessing pipelines incorporating numerical standardization (StandardScaler) and categorical encoding (OneHotEncoder) were integrated using Scikit-Learn's ColumnTransformer...")

    doc.add_page_break()

    # --- PAGE 7 ---
    p_num6 = doc.add_paragraph()
    p_num6.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num6.add_run("6").font.bold = True

    style_body(doc.add_paragraph(),
               "The unified ColumnTransformer guarantees deterministic, identical preprocessing transformations across both training and real-time production inference.")

    add_centered_image(doc, "page_7_img_2_X12.jpg", width=Inches(5.4))

    style_body(doc.add_paragraph(),
               "Candidate regression algorithms—including Linear Regression, Random Forest Regressor, and Gradient Boosting Regressor—were rigorously trained and validated. Comprehensive performance benchmarks evaluating the coefficient of determination (R² Score), Mean Absolute Error (MAE), and k-fold cross-validation confirmed that Gradient Boosting Regressor achieved the highest predictive accuracy and lowest residual variance, establishing it as the definitive production model.")

    doc.add_page_break()

    # --- PAGE 8 ---
    p_num7 = doc.add_paragraph()
    p_num7.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num7.add_run("7").font.bold = True

    style_heading(doc.add_paragraph(), "Model Evaluation & Benchmark Comparison")
    add_centered_image(doc, "page_8_img_2_X14.jpg", width=Inches(5.4))
    add_centered_image(doc, "page_8_img_3_X15.jpg", width=Inches(5.4))

    doc.add_page_break()

    # --- PAGE 9 ---
    p_num8 = doc.add_paragraph()
    p_num8.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num8.add_run("8").font.bold = True

    style_body(doc.add_paragraph(),
               "The finalized model pipeline was serialized using Joblib and integrated with the production web application. When a user submits student parameters, the system executes the pre-fitted preprocessing pipeline and feeds the transformed array to the model.\n\n"
               "The application outputs the predicted score, performance percentage, academic risk tier, and customized actionable recommendations, delivering an end-to-end intelligent decision-support system.")

    add_centered_image(doc, "page_9_img_2_X17.jpg", width=Inches(5.4))

    style_heading(doc.add_paragraph(), "Applications & Stakeholder Benefits")
    add_bullet(doc, "Schools & Administration: ", "Enables data-driven strategic planning, optimized allocation of tutoring resources, and continuous monitoring of institutional academic quality.")
    add_bullet(doc, "Educators & Mentors: ", "Streamlines early detection of struggling students, reducing diagnostic overhead and facilitating timely personalized academic interventions.")
    add_bullet(doc, "Students: ", "Instills constructive self-awareness regarding study discipline and attendance, accompanied by clear, actionable pathways for grade improvement.")
    add_bullet(doc, "Parents & Guardians: ", "Provides transparent, objective insights into child academic progress, strengthening home-school collaboration.")

    doc.add_page_break()

    # --- PAGE 10 ---
    p_num9 = doc.add_paragraph()
    p_num9.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num9.add_run("9").font.bold = True

    add_bullet(doc, "Evidence-Based Decision Making: ", "Transforms traditional qualitative educational intuition into quantitative, evidence-based academic excellence strategies.")

    add_centered_image(doc, "page_10_img_2_X19.jpg", width=Inches(5.3))
    add_centered_image(doc, "page_10_img_3_X20.jpg", width=Inches(5.3))

    doc.add_page_break()

    # --- PAGE 11 ---
    p_num10 = doc.add_paragraph()
    p_num10.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num10.add_run("10").font.bold = True

    style_heading(doc.add_paragraph(), "Future Scope & Strategic Roadmap")
    style_body(doc.add_paragraph(),
               "While EduVision AI currently delivers real-time prediction and tailored academic guidance, a comprehensive multi-phase roadmap is planned to expand its capabilities:\n\n"
               "1. School ERP API Integration: Direct bi-directional integration with School Management Information Systems (MIS/ERP) to automate attendance synchronization, grade logging, and student onboarding without redundant manual data entry.\n\n"
               "2. NLP-Based Feedback & Sentiment Analysis: Leveraging Natural Language Processing (NLP) to analyze student qualitative feedback, teacher remarks, and emotional sentiment to identify mental stress and non-academic learning impediments.\n\n"
               "3. Native Mobile Applications for Parents: Developing cross-platform iOS and Android applications providing real-time notification alerts, push updates, and weekly progress telemetry directly to parents.")

    add_centered_image(doc, "page_11_img_2_X22.jpg", width=Inches(5.4))

    doc.add_page_break()

    # --- PAGE 12 ---
    p_num11 = doc.add_paragraph()
    p_num11.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_num11.add_run("11").font.bold = True

    style_body(doc.add_paragraph(),
               "4. Interactive Conversational AI Tutor: Implementing an AI Chat Assistant powered by Large Language Models (LLMs) to answer student curriculum queries 24/7 and deliver individualized motivational coaching.\n\n"
               "5. Unified Parent & School Analytics Dashboard: Centralized portal providing aggregated longitudinal tracking, institutional performance distributions, and predictive cohort analytics.\n\n"
               "Through these systematic expansions, EduVision AI is dedicated to pioneering an intelligent, inclusive, and student-centric educational ecosystem that empowers every learner to realize their full potential.")

    style_heading(doc.add_paragraph(), "Conclusion & Official Signatures", color=BLUE, size=13)
    
    tbl_sig = doc.add_table(rows=2, cols=2)
    tbl_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
    c00 = tbl_sig.cell(0, 0)
    c00.width = Inches(3.2)
    p00 = c00.paragraphs[0]
    p00.add_run("______________________________\n").font.bold = True
    p00.add_run("Shri Manojbhai Parmar\n").font.bold = True
    p00.add_run("Project Mentor & Head\nM. M. Karodiya Primary School").font.size = Pt(9.5)

    c01 = tbl_sig.cell(0, 1)
    c01.width = Inches(3.2)
    p01 = c01.paragraphs[0]
    p01.add_run("______________________________\n").font.bold = True
    p01.add_run("Yash Patel\n").font.bold = True
    p01.add_run("Developer & AI Researcher\nScience Fair 2026").font.size = Pt(9.5)

    out_file = os.path.join(OUT_DIR, "EduVision_AI_Project_Report_English.docx")
    doc.save(out_file)
    print(f"Generated English DOCX: {out_file}")

if __name__ == "__main__":
    build_gujarati_docx()
    build_english_docx()
