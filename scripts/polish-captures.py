"""Build light and dark presentation frames around sanitized demo screenshots."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "product-screens"
OUTPUT = SOURCE / "polished"
NAMES = ("workspace", "sales", "vouchers", "accounts", "landowners", "employees", "admin", "oversight")


def make_frame(name: str, theme: str) -> None:
    capture_path = SOURCE / "dark" / f"{name}.webp" if theme == "dark" else SOURCE / f"{name}.webp"
    capture = Image.open(capture_path).convert("RGB")
    if capture.size not in ((1230, 710), (1230, 795)):
        raise ValueError(f"Unexpected capture dimensions for {name}: {capture.size}")
    size = (1360, capture.height + 160)

    dark = theme == "dark"
    backdrop = "#0b1728" if dark else "#eaf0f5"
    frame = "#1b2b43" if dark else "#ffffff"
    bar = "#253851" if dark else "#f7f9fb"
    border = "#465b73" if dark else "#cbd8e3"
    muted = "#c6d6e7" if dark else "#4c6278"

    canvas = Image.new("RGB", size, backdrop)
    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse((750, -320, 1650, 580), fill=(211, 168, 69, 20 if dark else 17))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(95)))

    shadow = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((43, 38, 1317, size[1] - 25), radius=26, fill=(0, 0, 0, 90 if dark else 35))
    canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(18)))

    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((43, 32, 1317, size[1] - 32), radius=24, fill=frame, outline=border, width=2)
    draw.rounded_rectangle((44, 33, 1316, 102), radius=23, fill=bar)
    draw.rectangle((44, 80, 1316, 103), fill=bar)
    draw.line((44, 103, 1316, 103), fill=border, width=2)
    for x, color in ((73, "#d3a845"), (91, "#8da2b5"), (109, "#8da2b5")):
        draw.ellipse((x, 59, x + 9, 68), fill=color)
    font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 16)
    draw.text((138, 54), "TURNER 10  /  DEMO WORKSPACE", fill=muted, font=font)
    canvas.alpha_composite(capture.convert("RGBA"), (65, 104))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OUTPUT / f"{name}-{theme}.webp", "WEBP", quality=87, method=6)


for name in NAMES:
    for theme in ("light", "dark"):
        make_frame(name, theme)
