"""
Gera PDF de uma página para o Tenente Brasil (envio via WhatsApp).
Saída: C:/Users/User/Downloads/jornada-sampaio-apresentacao.pdf
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, white
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import qrcode
from io import BytesIO
from reportlab.lib.utils import ImageReader

# Paleta da apresentação
INK = HexColor("#0b0d10")
ASH = HexColor("#16191d")
GOLD = HexColor("#c9a25b")
BRONZE = HexColor("#8a6a3b")
PARCHMENT = HexColor("#e9e1cf")
BLOOD = HexColor("#7a1f1f")
DIM = HexColor("#9ea8b5")

W, H = A4  # 595 x 842 pt
MARGIN = 36

OUTPUT = r"C:/Users/User/Downloads/jornada-sampaio-apresentacao.pdf"
APP_URL = "https://jornada-sampaio-production.up.railway.app"
QR_TARGET = f"{APP_URL}/inscricao"
PRESENTER_URL = f"{APP_URL}/apresentar?token=lMl2Lcbexvgnbg1OwnRgyMTD"
ADMIN_URL = f"{APP_URL}/admin/login"
ADMIN_EMAIL = "jasb.brasil@gmail.com"
ADMIN_PASS = "AeaQoXnpQGHv3TZz"

def make_qr(data: str, box_size: int = 8) -> ImageReader:
    qr = qrcode.QRCode(version=None, box_size=box_size, border=2, error_correction=qrcode.constants.ERROR_CORRECT_M)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#0b0d10", back_color="#e9e1cf")
    bio = BytesIO()
    img.save(bio, format="PNG")
    bio.seek(0)
    return ImageReader(bio)

c = canvas.Canvas(OUTPUT, pagesize=A4)
c.setTitle("Jornada do Bravo dos Bravos - Apresentação")
c.setAuthor("João Francisco")
c.setSubject("Resumo executivo para Ten Brasil")

# Background full ink
c.setFillColor(INK)
c.rect(0, 0, W, H, fill=1, stroke=0)

# === HEADER BAND ===
band_h = 95
c.setFillColor(ASH)
c.rect(0, H - band_h, W, band_h, fill=1, stroke=0)
# Gold stripe
c.setFillColor(GOLD)
c.rect(0, H - band_h - 3, W, 3, fill=1, stroke=0)
# Eyebrow
c.setFillColor(GOLD)
c.setFont("Helvetica-Bold", 8)
c.drawString(MARGIN, H - 28, "JORNADA DOS PATRONOS  ·  DIA DA INFANTARIA  ·  29.MAI.26")
# Title
c.setFillColor(PARCHMENT)
c.setFont("Helvetica-Bold", 26)
c.drawString(MARGIN, H - 58, "Jornada do Bravo dos Bravos")
# Subtitle
c.setFillColor(GOLD)
c.setFont("Helvetica-Oblique", 11)
c.drawString(MARGIN, H - 76, "Apresentação interativa sobre o Brigadeiro Antônio de Sampaio")
# Date badge (top right)
c.setFillColor(BLOOD)
c.rect(W - MARGIN - 100, H - 70, 100, 36, fill=1, stroke=0)
c.setFillColor(PARCHMENT)
c.setFont("Helvetica-Bold", 9)
c.drawCentredString(W - MARGIN - 50, H - 48, "29.MAI.26")
c.setFont("Helvetica", 7)
c.drawCentredString(W - MARGIN - 50, H - 60, "CPOR/PA · Porto Alegre")

# === GREETING ===
y = H - band_h - 28
c.setFillColor(PARCHMENT)
c.setFont("Helvetica-Bold", 11)
c.drawString(MARGIN, y, "Tenente Brasil,")
y -= 16
c.setFillColor(DIM)
c.setFont("Helvetica", 10)
greeting = (
    "Conforme combinado, segue a apresentação interativa pronta para a "
    "Jornada dos Patronos no CPOR/PA. Tudo no ar, testado de ponta a ponta."
)
# Wrap manually
def wrap(text, font, size, width):
    c.setFont(font, size)
    words = text.split()
    lines, line = [], ""
    for w in words:
        test = (line + " " + w).strip()
        if c.stringWidth(test, font, size) <= width:
            line = test
        else:
            lines.append(line); line = w
    if line: lines.append(line)
    return lines

for line in wrap(greeting, "Helvetica", 10, W - 2*MARGIN):
    c.drawString(MARGIN, y, line); y -= 13
y -= 8

# === MAIN URL CARD ===
card_h = 56
c.setStrokeColor(GOLD)
c.setLineWidth(1.2)
c.setFillColor(ASH)
c.roundRect(MARGIN, y - card_h, W - 2*MARGIN, card_h, 6, fill=1, stroke=1)
c.setFillColor(GOLD)
c.setFont("Helvetica-Bold", 7)
c.drawString(MARGIN + 14, y - 18, "ENDEREÇO PRINCIPAL")
c.setFillColor(PARCHMENT)
c.setFont("Courier-Bold", 13)
c.drawString(MARGIN + 14, y - 36, APP_URL)
# Clickable link annotation over the URL
c.linkURL(APP_URL, (MARGIN + 14, y - 42, MARGIN + 14 + c.stringWidth(APP_URL, "Courier-Bold", 13), y - 28), relative=0)
c.setFillColor(DIM)
c.setFont("Helvetica-Oblique", 9)
c.drawString(MARGIN + 14, y - 50, "Aberto. Os alunos acessam o QR; você usa o link próprio (abaixo).")
y -= (card_h + 18)

# === 3 USAGE PANELS ===
panel_w = (W - 2*MARGIN - 16) / 2
panel_h = 130

# Panel 1: For the Tenente (presenter)
px, py = MARGIN, y - panel_h
c.setStrokeColor(GOLD)
c.setLineWidth(2)
c.setFillColor(ASH)
c.roundRect(px, py, panel_w, panel_h, 5, fill=1, stroke=1)
# Top color tag instead of bullet icon
c.setFillColor(GOLD)
c.rect(px, py + panel_h - 4, panel_w, 4, fill=1, stroke=0)
c.setFillColor(GOLD)
c.setFont("Helvetica-Bold", 8)
c.drawString(px + 12, py + panel_h - 18, "PARA O TENENTE  (apresentar)")
c.setFillColor(PARCHMENT)
c.setFont("Helvetica-Bold", 10)
c.drawString(px + 12, py + panel_h - 38, "Abra este link no notebook:")
c.setFillColor(GOLD)
c.setFont("Courier", 7.5)
# Split URL at "?token=" for clean visual
if "?" in PRESENTER_URL:
    base, qs = PRESENTER_URL.split("?", 1)
    url_lines = [base, "?" + qs]
else:
    url_lines = [PRESENTER_URL]
for i, ul in enumerate(url_lines):
    c.drawString(px + 12, py + panel_h - 52 - i*10, ul)
# Clickable on the whole URL block
c.linkURL(PRESENTER_URL, (px + 12, py + panel_h - 64, px + panel_w - 12, py + panel_h - 46), relative=0)
c.setFillColor(DIM)
c.setFont("Helvetica-Oblique", 8.5)
desc = [
    "Token de apresentador embutido.",
    "Não precisa preencher cadastro —",
    "entra direto na apresentação.",
    "Role para navegar pelas 10 seções.",
]
yy = py + panel_h - 80
for d in desc:
    c.drawString(px + 12, yy, d); yy -= 11

# Panel 2: For the cadets (QR)
px2 = MARGIN + panel_w + 16
c.setStrokeColor(GOLD)
c.setFillColor(ASH)
c.roundRect(px2, py, panel_w, panel_h, 5, fill=1, stroke=1)
c.setFillColor(GOLD)
c.rect(px2, py + panel_h - 4, panel_w, 4, fill=1, stroke=0)
c.setFillColor(GOLD)
c.setFont("Helvetica-Bold", 8)
c.drawString(px2 + 12, py + panel_h - 18, "PARA OS ALUNOS  (cadastro via QR)")

# QR code on the right
qr_size = 80
qr_x = px2 + panel_w - qr_size - 12
qr_y = py + (panel_h - qr_size) / 2
c.drawImage(make_qr(QR_TARGET, box_size=4), qr_x, qr_y, qr_size, qr_size)

# Text on the left
c.setFillColor(PARCHMENT)
c.setFont("Helvetica-Bold", 10)
c.drawString(px2 + 12, py + panel_h - 38, "Aponta a câmera:")
c.setFillColor(DIM)
c.setFont("Helvetica", 8.5)
desc2 = [
    "Aluno preenche:",
    "  • Nome de guerra",
    "  • CPF (validado)",
    "  • E-mail",
    "  • Telefone / WhatsApp",
    "  • Aceite LGPD",
    "Depois, acompanha junto.",
]
yy = py + panel_h - 54
for d in desc2:
    c.drawString(px2 + 12, yy, d); yy -= 10

y = py - 16

# === PANEL ADMIN (full width) ===
adm_h = 112
c.setStrokeColor(BLOOD)
c.setLineWidth(1.5)
c.setFillColor(ASH)
c.roundRect(MARGIN, y - adm_h, W - 2*MARGIN, adm_h, 5, fill=1, stroke=1)
c.setFillColor(BLOOD)
c.rect(MARGIN, y - 4, W - 2*MARGIN, 4, fill=1, stroke=0)
c.setFillColor(BLOOD)
c.setFont("Helvetica-Bold", 8)
c.drawString(MARGIN + 14, y - 18, "PAINEL DO TENENTE  (acompanhar inscrições em tempo real)")

# Row 1: URL full width
c.setFillColor(PARCHMENT)
c.setFont("Helvetica-Bold", 8.5)
c.drawString(MARGIN + 14, y - 34, "Acessar:")
c.setFillColor(GOLD)
c.setFont("Courier", 9)
c.drawString(MARGIN + 60, y - 34, ADMIN_URL)
c.linkURL(ADMIN_URL, (MARGIN + 60, y - 38, MARGIN + 60 + c.stringWidth(ADMIN_URL, "Courier", 9), y - 26), relative=0)

# Below: two columns
COL_LEFT_X = MARGIN + 14
COL_RIGHT_X = MARGIN + 290

# Credentials
c.setFillColor(PARCHMENT)
c.setFont("Helvetica-Bold", 8.5)
c.drawString(COL_LEFT_X, y - 62, "E-mail:")
c.setFont("Courier", 8.5)
c.setFillColor(GOLD)
c.drawString(COL_LEFT_X + 38, y - 62, ADMIN_EMAIL)
c.setFillColor(PARCHMENT)
c.setFont("Helvetica-Bold", 8.5)
c.drawString(COL_LEFT_X, y - 75, "Senha:")
c.setFont("Courier", 8.5)
c.setFillColor(GOLD)
c.drawString(COL_LEFT_X + 38, y - 75, ADMIN_PASS)
c.setFillColor(DIM)
c.setFont("Helvetica-Oblique", 7)
c.drawString(COL_LEFT_X, y - 88, "(troque em /admin/conta após o primeiro acesso)")

# Features list (right side of panel)
c.setFillColor(PARCHMENT)
c.setFont("Helvetica-Bold", 8)
c.drawString(COL_RIGHT_X, y - 34, "Lá você pode:")
c.setFillColor(DIM)
c.setFont("Helvetica", 7.5)
features = [
    "• Ver inscritos em tempo real",
    "• Buscar por nome, CPF, e-mail, telefone",
    "• Baixar CSV / XLSX (1 clique)",
    "• Cadastrar outros oficiais (CRUD)",
]
yy = y - 48
for f in features:
    c.drawString(COL_RIGHT_X, yy, f); yy -= 11

y -= (adm_h + 16)

# === WHAT'S INSIDE ===
c.setStrokeColor(GOLD)
c.setLineWidth(0.5)
c.line(MARGIN, y, W - MARGIN, y)
y -= 14
c.setFillColor(GOLD)
c.setFont("Helvetica-Bold", 8)
c.drawString(MARGIN, y, "O QUE A APRESENTAÇÃO TRAZ")
y -= 12

c.setFillColor(DIM)
c.setFont("Helvetica", 8.5)
sections = [
    "1. Abertura (Hero)  •  2. Vídeo institucional (cold open)  •  3. Jornada nacional (mapa)",
    "4. Carreira do Bravo (17 marcos)  •  5. Guerra da Tríplice Aliança (modo slide tradicional)",
    "6. Tuiuti tático (3ª Div Encouraçada)  •  7. Os 3 Ferimentos (clímax emocional)",
    "8. Vídeo 1min (respiro)  •  9. Legado e homenagens",
    "10. A Rainha das Armas Hoje (FEB Itália + 10 especializações modernas)",
    "11. Encerramento com 'Salve o Brigadeiro!' e créditos AOR/2-RS",
]
for s in sections:
    c.drawString(MARGIN, y, s); y -= 11

# === FOOTER ===
footer_y = 50
c.setStrokeColor(GOLD)
c.setLineWidth(0.5)
c.line(MARGIN, footer_y + 30, W - MARGIN, footer_y + 30)
c.setFillColor(GOLD)
c.setFont("Helvetica-BoldOblique", 12)
c.drawCentredString(W/2, footer_y + 14, "“IDES COMANDAR, APRENDEI A OBEDECER”")
c.setFillColor(DIM)
c.setFont("Helvetica", 7.5)
c.drawCentredString(W/2, footer_y, "AOR/2-RS  ·  Preservando a história, fortalecendo valores e honrando a Reserva")
c.setFont("Helvetica-Oblique", 7)
c.drawCentredString(W/2, footer_y - 12, "Confidencial — compartilhar apenas com o Tenente Brasil")

c.showPage()
c.save()
print(f"OK: {OUTPUT}")
