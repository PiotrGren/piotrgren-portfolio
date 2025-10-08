from app import db
from datetime import datetime, timezone


class TechCategories(db.Model):
    __tablename__ = "tech_cat"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    
    technologies = db.relationship('Technologies', back_populates="category", passive_deletes=True)
    
    
class Technologies(db.Model):
    __tablename__ = "technologies"
    
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('techcategories.id', on_delete='RESTRICT'))
    name = db.Column(db.String(255), unique=True, nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    
    category = db.relationship('TechCategories', back_populates="technologies")