import json
from typing import List
from fastapi import HTTPException
from jinja2 import Environment, FileSystemLoader
import pdfkit
from io import BytesIO
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
TEMPLATE_DIR = os.path.join(BASE_DIR, "app/templates")
STATIC_DIR = os.path.join(BASE_DIR, "static")

env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

async def parse_facilities(facilities_raw: str) -> List[str]:
    try:
        facilities = json.loads(facilities_raw)
        if isinstance(facilities, list) and all(isinstance(f, str) for f in facilities):
            return [f.strip() for f in facilities]
        raise ValueError
    except (ValueError, json.JSONDecodeError) as e:

        fallback = [item.strip() for item in facilities_raw.split(",") if item.strip()]

        if not fallback:
            raise HTTPException(status_code=400, detail="Facilities must be a JSON list or comma-separated string.")
        return fallback


def generate_room_pdf_from_html(title, description, facilities, image_path) -> BytesIO:
    template = env.get_template("room_template.html")


    css_path = f"file://{os.path.join(STATIC_DIR, 'styles.css')}"
    logo_path = f"file://{os.path.join(STATIC_DIR, 'assets/logo.svg')}"
    image_fs_path = os.path.abspath(image_path.lstrip("/")) if image_path else None
    image_fs_path = f"file://{image_fs_path}"

    html_content = template.render(
        title=title,
        description=description,
        facilities=facilities,
        css_path=css_path,
        logo_path=logo_path,
        room_image_path=image_fs_path,
        year="2025",
        date="11/12/25"
    )

    pdf_bytes = pdfkit.from_string(
        html_content,
        False,
        options={"enable-local-file-access": ""}
    )

    return BytesIO(pdf_bytes)

