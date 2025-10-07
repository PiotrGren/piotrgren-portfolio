from . import db
from datetime import datetime, timezone


class Example(db.Model):
    __tablename__ = "examples"
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))