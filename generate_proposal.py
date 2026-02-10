from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

# --- Configuration ---
# Updated filename as per user instruction
FILENAME = "collective_oasis_proposal.pdf"

# Theme Colors based on your Tailwind Config
COLOR_SAND = colors.HexColor("#F5E6D3")
COLOR_BLUE = colors.HexColor("#1A2B4C")
COLOR_GOLD = colors.HexColor("#C5A065")

# --- Custom Canvas for Background Color ---
def draw_background(canvas, doc):
    """Draws the Sand background on every page."""
    canvas.saveState()
    canvas.setFillColor(COLOR_SAND)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    
    # Add a Gold border/accent on the bottom
    canvas.setFillColor(COLOR_GOLD)
    canvas.rect(0, 0, A4[0], 15, fill=1, stroke=0)
    
    canvas.restoreState()

# --- Content Generation ---
def create_proposal():
    doc = SimpleDocTemplate(
        FILENAME,
        pagesize=A4,
        rightMargin=1*inch,
        leftMargin=1*inch,
        topMargin=1*inch,
        bottomMargin=1*inch
    )

    # Styles
    styles = getSampleStyleSheet()
    
    # Custom Title Style (Serif Look)
    title_style = ParagraphStyle(
        'OasisTitle',
        parent=styles['Title'],
        fontName='Times-BoldItalic', # Simulating Playfair Display
        fontSize=36,
        leading=42,
        textColor=COLOR_BLUE,
        alignment=TA_CENTER,
        spaceAfter=30
    )

    # Custom Header Style
    header_style = ParagraphStyle(
        'OasisHeader',
        parent=styles['Heading1'],
        fontName='Times-Bold',
        fontSize=24,
        textColor=COLOR_BLUE,
        spaceAfter=20,
        alignment=TA_LEFT
    )

    # Custom Body Style (Sans-Serif Look)
    body_style = ParagraphStyle(
        'OasisBody',
        parent=styles['Normal'],
        fontName='Helvetica', # Simulating Lato
        fontSize=12,
        leading=18,
        textColor=COLOR_BLUE,
        alignment=TA_LEFT,
        spaceAfter=12
    )

    # Center Body Style
    center_body_style = ParagraphStyle(
        'OasisBodyCenter',
        parent=body_style,
        alignment=TA_CENTER
    )

    story = []

    # --- PAGE 1: COVER ---
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("The Collective Oasis", title_style))
    story.append(Paragraph("TSD SALD 2026", header_style))
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph("Event Proposal & Strategy", center_body_style))
    story.append(PageBreak()) # Forces new page

    # --- PAGE 2: MISSION ---
    story.append(Paragraph("Our Mission", header_style))
    # Draw a gold line (using a table hack or drawing directly, here using simple spacer)
    story.append(Paragraph("To create a sanctuary of thought and innovation. The Collective Oasis isn't just an event; it is a convergence of minds set against a backdrop of serenity.", body_style))
    story.append(Paragraph("We aim to bridge the gap between tradition and future technologies in an environment that fosters deep connection.", body_style))
    story.append(PageBreak())

    # --- PAGE 3: THE VENUE ---
    story.append(Paragraph("The Venue", header_style))
    story.append(Paragraph("Located in the heart of the dunes, the venue offers:", body_style))
    
    venue_points = [
        "• Open-air amphitheater for keynote sessions.",
        "• Climate-controlled breakout 'tents' for workshops.",
        "• Sunset networking lounge featuring local culinary arts.",
        "• High-speed connectivity infrastructure disguised within natural elements."
    ]
    for point in venue_points:
        story.append(Paragraph(point, body_style))
        
    story.append(PageBreak())

    # --- PAGE 4: BUDGET ESTIMATE ---
    story.append(Paragraph("Projected Budget", header_style))
    
    data = [
        ['Item', 'Allocation', 'Cost (USD)'],
        ['Venue Rental', '25%', '$50,000'],
        ['Catering (F&B)', '30%', '$60,000'],
        ['AV & Tech', '20%', '$40,000'],
        ['Marketing', '15%', '$30,000'],
        ['Contingency', '10%', '$20,000'],
        ['TOTAL', '100%', '$200,000']
    ]
    
    t = Table(data, colWidths=[2.5*inch, 1.5*inch, 2*inch])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_BLUE),
        ('TEXTCOLOR', (0,0), (-1,0), COLOR_SAND),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 12),
        ('BACKGROUND', (0,1), (-1,-1), colors.white),
        ('TEXTCOLOR', (0,1), (-1,-1), COLOR_BLUE),
        ('GRID', (0,0), (-1,-1), 1, COLOR_GOLD),
        ('FONTNAME', (0,1), (-1,-1), 'Helvetica'),
        ('ROWBACKGROUNDS', (1,1), (-1,-1), [colors.white, "#FAF3EB"]) # Alternating light sand
    ]))
    
    story.append(t)
    story.append(PageBreak())

    # --- PAGE 5: CLOSING ---
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("Let's Build the Oasis.", title_style))
    story.append(Spacer(1, 0.5*inch))
    story.append(Paragraph("Contact: planning@tsd-sald2026.com", center_body_style))
    story.append(Paragraph("+1 (555) 019-2026", center_body_style))

    # Build PDF
    doc.build(story, onFirstPage=draw_background, onLaterPages=draw_background)
    print(f"PDF successfully created: {FILENAME}")

if __name__ == "__main__":
    create_proposal()
