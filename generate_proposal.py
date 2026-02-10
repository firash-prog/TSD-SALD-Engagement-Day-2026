import os
import requests
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Image as PlatypusImage
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

# --- Configuration ---
FILENAME = "collective_oasis_proposal.pdf"
ASSETS_DIR = "public/assets"

# Create assets dir if it doesn't exist
os.makedirs(ASSETS_DIR, exist_ok=True)

# Theme Colors
COLOR_SAND = colors.HexColor("#F5E6D3")
COLOR_BLUE = colors.HexColor("#1A2B4C")
COLOR_GOLD = colors.HexColor("#C5A065")

# --- Data Synced with constants.ts ---
# Hero Video Poster from Hero.tsx
HERO_IMAGE_URL = "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1920&q=80"

PROPOSAL_ITEMS = [
    {
        "id": "entrance",
        "title": "Welcoming Archway",
        "header": "The Entrance",
        "description": "Grand rustic wooden archway at the entrance, featuring intricate Arabic calligraphy and warm Moroccan lanterns.",
        "image": "https://images.unsplash.com/photo-1540932296481-d448c26bb8e1?auto=format&fit=crop&w=800&q=80",
    },
    {
        "id": "accommodation",
        "title": "The Collective Oasis",
        "header": "Accommodation & Lounge",
        "description": "Five premium canvas tents with warm lighting, rugs, and pillows set against the sunset for a cozy glamping atmosphere.",
        "image": "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80",
    },
    {
        "id": "venue",
        "title": "Site Decorations",
        "header": "Venue Styling",
        "description": "Desert-themed decor with vintage walkways, rustic furniture, and pampas grass arrangements under warm ambient lighting.",
        "image": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    },
    {
        "id": "dining",
        "title": "Premium Harvest Feast",
        "header": "Dining Experience",
        "description": "A lavish outdoor banquet featuring live BBQ stations and a harvest table with gourmet food.",
        "image": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    },
    {
        "id": "gifting",
        "title": "Oasis Legacy Gift Bags",
        "header": "Gifting",
        "description": "Curated gift set including a tote bag, charger, mister, and scented candle.",
        "image": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    },
    {
        "id": "refreshments",
        "title": "Cool-Down Cruiser",
        "header": "Refreshments",
        "description": "Vintage tricycle ice cream cart serving unlimited popsicles to keep guests refreshed.",
        "image": "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=800&q=80",
    },
    {
        "id": "social",
        "title": "Selfie Setup Area",
        "header": "Social & Photo Ops",
        "description": "Themed photo backdrop with a large wooden frame, dried palm leaves, and macrame hangings.",
        "image": "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
    },
    {
        "id": "games",
        "title": "Games Area",
        "header": "Activities & Games",
        "description": "Recreational zone with Table Football, Table Tennis, and Giant Soccer for team building fun.",
        "image": "https://images.unsplash.com/photo-1529156069893-b208dcba8207?auto=format&fit=crop&w=800&q=80",
    },
    {
        "id": "workshop-scent",
        "title": "Aromatherapy Blends",
        "header": "Workshops: Scent",
        "description": "Interactive perfume lab where guests create custom scents using essential oils and fresh herbs.",
        "image": "https://images.unsplash.com/photo-1629198721535-64906f23ca32?auto=format&fit=crop&w=800&q=80",
    },
    {
        "id": "workshop-plant",
        "title": "Plant a Seed",
        "header": "Workshops: Planting",
        "description": "Potting station activity where guests plant succulents in terracotta pots to take home.",
        "image": "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
    },
]

def download_image(key, url):
    """Downloads image to local asset dir and returns path."""
    ext = "jpg"
    filename = os.path.join(ASSETS_DIR, f"{key}.{ext}")
    
    # Simple caching
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
    def add_image_page(img_path, width=500, height=300):
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
    
    hero_path = download_image("hero_poster", HERO_IMAGE_URL)
    add_image_page(hero_path, width=450, height=250)
    
    story.append(PageBreak())

    # ==========================
    # DYNAMIC PAGES (2-11)
    # ==========================
    for item in PROPOSAL_ITEMS:
        # Header
        story.append(Paragraph(item["header"], style_header))
        
        # Title (Item Name)
        story.append(Paragraph(item["title"], style_body))
        
        # Image
        img_path = download_image(item["id"], item["image"])
        add_image_page(img_path, width=450, height=300)
        
        # Description
        story.append(Paragraph(item["description"], style_body))
        
        story.append(PageBreak())

    # ==========================
    # LAST PAGE: Closing
    # ==========================
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("THE COLLECTIVE OASIS", style_title))
    story.append(Paragraph("TSD SALD 2026", style_title))
    
    # Re-use Hero image for closing or a specific one if available? 
    # Using Hero image again for consistency as per 'abstract oasis' feel
    add_image_page(hero_path, width=400, height=200)
    
    story.append(Paragraph("Contact: planning@tsd-sald2026.com", style_caption))

    # Build
    doc.build(story, onFirstPage=draw_background, onLaterPages=draw_background)
    print(f"PDF successfully created: {FILENAME}")

if __name__ == "__main__":
    create_proposal()
