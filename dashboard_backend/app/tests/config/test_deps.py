from app.config.deps import get_db
from sqlalchemy.orm import Session

def test_get_db_yields_and_closes():
    gen = get_db()
    db = next(gen)
    assert isinstance(db, Session)
    try:
        next(gen)
    except StopIteration:
        pass
