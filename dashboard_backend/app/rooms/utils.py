import json
from typing import List
from fastapi import HTTPException

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
