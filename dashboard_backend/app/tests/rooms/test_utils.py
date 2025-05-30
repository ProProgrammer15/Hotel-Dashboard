import pytest
from app.rooms.utils import parse_facilities
from fastapi import HTTPException



@pytest.mark.asyncio
async def test_parse_facilities_valid_json_list():
    raw = '["WiFi", "TV", "AC"]'
    result = await parse_facilities(raw)
    assert result == ["WiFi", "TV", "AC"]

@pytest.mark.asyncio
async def test_parse_facilities_valid_json_list_with_spaces():
    raw = '[" WiFi ", " TV ", " AC "]'
    result = await parse_facilities(raw)
    assert result == ["WiFi", "TV", "AC"]

@pytest.mark.asyncio
async def test_parse_facilities_invalid_json_but_valid_fallback():
    raw = "WiFi, TV, AC"
    result = await parse_facilities(raw)
    assert result == ["WiFi", "TV", "AC"]

@pytest.mark.asyncio
async def test_parse_facilities_invalid_json_and_empty_fallback():
    raw = ""
    with pytest.raises(HTTPException) as exc_info:
        await parse_facilities(raw)
    assert exc_info.value.status_code == 400
    assert exc_info.value.detail == "Facilities must be a JSON list or comma-separated string."

@pytest.mark.asyncio
async def test_parse_facilities_json_list_with_non_strings():
    raw = '[1, 2, 3]'
    result = await parse_facilities(raw)
    assert result == ['[1', '2', '3]']
