import os
import requests
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Image as PlatypusImage, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

# --- Configuration ---
FILENAME = "collective_oasis_proposal.pdf"
ASSETS_DIR = "public/assets"

# Create assets dir if it doesn't exist
os.makedirs(ASSETS_DIR, exist_ok=True)

# Theme Colors
COLOR_SAND = colors.HexColor("#F5E6D3")
COLOR_BLUE = colors.HexColor("#1A2B4C")
COLOR_GOLD = colors.HexColor("#C5A065")
COLOR_WHITE = colors.HexColor("#FFFFFF")

# Image Mapping (Page -> URL)
IMAGES = {
    "page1_hero": "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1600&q=80",
    "page2_entrance": "https://images.unsplash.com/photo-1540932296481-d448c26bb8e1?auto=format&fit=crop&w=1200&q=80",
    "page3_tents": "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80",
    "page4_decor": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    "page5_dining": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    "page6_gift": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80",
    "page7_icecream": "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=1200&q=80",
    "page8_photo": "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80",
    "page9_games": "https://images.unsplash.com/photo-1529156069893-b208dcba8207?auto=format&fit=crop&w=1200&q=80",
    "page10_scent": "https://images.unsplash.com/photo-1629198721535-64906f23ca32?auto=format&fit=crop&w=1200&q=80",
    "page11_plant": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80",
    "page12_closing": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80",
}

def download_image(key, url):
    """Downloads image to local asset dir and returns path."""
    ext = "jpg"
    filename = os.path.join(ASSETS_DIR, f"{key}.{ext}")
    
    if os.path.exists(filename):
        return filename
        
    print(f"Downloading {key}...")
    try:
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            with open(filename, 'wb') as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)
            return filename
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return None
    return None

def draw_background(canvas, doc):
    """Draws consistent background styling."""
    canvas.saveState()
    canvas.setFillColor(COLOR_SAND)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    
    # Bottom Gold Border
    canvas.setFillColor(COLOR_GOLD)
    canvas.rect(0, 0, A4[0], 20, fill=1, stroke=0)
    
    # Page Number (Top Right)
    page_num = canvas.getPageNumber()
    canvas.setFillColor(COLOR_BLUE)
    canvas.setFont("Helvetica-Bold", 10)
    canvas.drawRightString(A4[0] - 30, A4[1] - 30, f"Page {page_num}")
    
    canvas.restoreState()

def create_proposal():
    doc = SimpleDocTemplate(
        FILENAME,
        pagesize=A4,
        rightMargin=50,
        leftMargin=50,
        topMargin=50,
        bottomMargin=50
    )

    styles = getSampleStyleSheet()
    
    # Custom Styles
    style_title = ParagraphStyle('OasisTitle', parent=styles['Title'], fontName='Times-Bold', fontSize=32, leading=40, textColor=COLOR_BLUE, alignment=TA_CENTER, spaceAfter=20)
    style_header = ParagraphStyle('OasisHeader', parent=styles['Heading1'], fontName='Times-Bold', fontSize=24, textColor=COLOR_BLUE, spaceAfter=15, spaceBefore=20)
    style_body = ParagraphStyle('OasisBody', parent=styles['Normal'], fontName='Helvetica', fontSize=12, leading=18, textColor=COLOR_BLUE, spaceAfter=10)
    style_caption = ParagraphStyle('OasisCaption', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=10, textColor=colors.darkgrey, alignment=TA_CENTER)

    story = []

    # --- helper to add image ---
    def add_image_page(img_key, width=500, height=300):
        img_path = download_image(img_key, IMAGES[img_key])
        if img_path:
            img = PlatypusImage(img_path, width=width, height=height)
            story.append(img)
            story.append(Spacer(1, 15))

    # ==========================
    # PAGE 1: Title Slide
    # ==========================
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("EVENT PROPOSAL", style_caption))
    story.append(Paragraph("TSD SALD 2026", style_title))
    story.append(Paragraph("Team Engagement Days", style_title))
    story.append(Spacer(1, 0.5*inch))
    add_image_page("page1_hero", width=450, height=250)
    story.append(PageBreak())

    # ==========================
    # PAGE 2: The Entrance
    # ==========================
    story.append(Paragraph("The Entrance", style_header))
    story.append(Paragraph("Welcoming Archway", style_body))
    add_image_page("page2_entrance")
    story.append(Paragraph("Grand wooden entrance featuring Arabic calligraphy, camel silhouettes, and warm lantern lighting.", style_body))
    story.append(PageBreak())

    # ==========================
    # PAGE 3: Accommodation
    # ==========================
    story.append(Paragraph("Accommodation & Lounge", style_header))
    story.append(Paragraph("The Collective Oasis: Cultivating Connection in Nature", style_body))
    add_image_page("page3_tents")
    story.append(Paragraph("Five premium canvas tents with warm lighting, rugs, and pillows set against the sunset.", style_body))
    story.append(PageBreak())

    # ==========================
    # PAGE 4: Venue Styling
    # ==========================
    story.append(Paragraph("Venue Styling", style_header))
    story.append(Paragraph("Site Decorations", style_body))
    add_image_page("page4_decor")
    story.append(Paragraph("Desert-themed decor. Vintage walkways, rustic furniture, and pampas grass arrangements.", style_body))
    story.append(PageBreak())

    # ==========================
    # PAGE 5: Dining
    # ==========================
    story.append(Paragraph("Dining Experience", style_header))
    story.append(Paragraph("Premium Harvest Feast", style_body))
    add_image_page("page5_dining")
    story.append(Paragraph("Live BBQ stations and harvest table featuring organic local produce.", style_body))
    story.append(PageBreak())

    # ==========================
    # PAGE 6: Gifting
    # ==========================
    story.append(Paragraph("Gifting", style_header))
    story.append(Paragraph("Oasis Legacy Gift Bags", style_body))
    add_image_page("page6_gift")
    story.append(Paragraph("Tote bag with Charger, Mister, and Candle. Includes 'Plant Journal' label.", style_body))
    story.append(PageBreak())

    # ==========================
    # PAGE 7: Refreshments
    # ==========================
    story.append(Paragraph("Refreshments", style_header))
    story.append(Paragraph("Cool-Down Cruiser", style_body))
    add_image_page("page7_icecream")
    story.append(Paragraph("Ice Cream Cart: Vintage trike serving unlimited popsicles.", style_body))
    story.append(PageBreak())

    # ==========================
    # PAGE 8: Social
    # ==========================
    story.append(Paragraph("Social & Photo Ops", style_header))
    story.append(Paragraph("Selfie Setup Area", style_body))
    add_image_page("page8_photo")
    story.append(Paragraph("Themed photo backdrop. #TheCollectiveOasis.", style_body))
    story.append(PageBreak())

    # ==========================
    # PAGE 9: Activities
    # ==========================
    story.append(Paragraph("Activities & Games", style_header))
    story.append(Paragraph("Games Area", style_body))
    add_image_page("page9_games")
    story.append(Paragraph("Table Football, Table Tennis, Giant Soccer.", style_body))
    story.append(Paragraph("Graphic: Tribes Scoreboard (Falcons, Dunes, Palms, Oryx).", style_body))
    story.append(PageBreak())

    # ==========================
    # PAGE 10: Workshops (Scent)
    # ==========================
    story.append(Paragraph("Workshops: Scent", style_header))
    story.append(Paragraph("Custom Aromatherapy Blends", style_body))
    add_image_page("page10_scent")
    story.append(Paragraph("Fragrance Mixing: Interactive perfume lab.", style_body))
    story.append(PageBreak())

    # ==========================
    # PAGE 11: Workshops (Planting)
    # ==========================
    story.append(Paragraph("Workshops: Planting", style_header))
    story.append(Paragraph("Plant a Seed", style_body))
    add_image_page("page11_plant")
    story.append(Paragraph("Potting station for succulents.", style_body))
    story.append(PageBreak())

    # ==========================
    # PAGE 12: Closing
    # ==========================
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("THE COLLECTIVE OASIS", style_title))
    story.append(Paragraph("TSD SALD 2026", style_title))
    add_image_page("page12_closing", width=400, height=200)
    story.append(Paragraph("Contact: planning@tsd-sald2026.com", style_caption))

    # Build
    doc.build(story, onFirstPage=draw_background, onLaterPages=draw_background)
    print(f"PDF successfully created: {FILENAME}")

if __name__ == "__main__":
    create_proposal()
