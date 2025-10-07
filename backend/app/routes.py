from flask import Blueprint
from .models import Example
from . import db

bp = Blueprint("api", __name__)

@bp.get("/hello")
def hello():
    return {"message": "Hello from Flask API"}, 200

@bp.post("/examples/seed")
def seed():
    e = Example(message="Seeded row")
    db.session.add(e)
    db.session.commit()
    return {"id": e.id, "message": e.message}, 201