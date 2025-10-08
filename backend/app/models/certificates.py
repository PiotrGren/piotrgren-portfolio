from app import db
from datetime import datetime, timezone
from skills import Technologies

class Issuers(db.Model):
    __tablename__ = "cert_issuers"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    courses = db.relationship('Courses', back_populates="issuer", passive_deletes=True)

class Courses(db.Model):
    __tablename__ = "courses"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True, index=True)
    url = db.Column(db.String(255), nullable=True, unique=True)
    hours_total = db.Column(db.Integer, nullable=True)
    description = db.Column(db.Text, nullable=True)
    issuer_id = db.Column(db.Integer, db.ForeignKey('issuers.id', on_delete='RESTRICT'))
    created_at = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.fun.now())
    
    issuer = db.relationship('Issuer', back_popultes='courses')
    certificates = db.relationship('Certificates', back_populates='programs', passive_deletes=True)


class CertStatuses(db.Model):
    __tablename__ = "cert_statuses"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(124), unique=True, nullable=False)
    
    certificates = db.relationship('Certificates', back_poplates='statuses', passive_deletes=True)

    
class Certificates(db.Model):
    __tablename__ = "certificates"
    
    id = db.Column(db.Integer, primary_key=True)
    cert_id = db.Column(db.String(255), unique=True)
    program_id = db.Column(db.Integer, db.ForeignKey('courses.id', on_delete='RESTRICT'))
    title = db.Column(db.String(255), unique=True, nullable=False)
    issued_on = db.Column(db.Date, nullable=False)
    verification_url = db.Column(db.String(255), unique=True)
    pdf_path = db.Column(db.String(255), unique=True, nullable=True)
    grade_or_score = db.Column(db.Integer, nullable=True)
    hours = db.Column(db.Integer, nullable=True)
    status = db.Column(db.Integer, db.ForeignKey('certstatuses.id', on_delete='RESTRICT'))
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DataTime, server_default=db.func.now(), server_onupdate=db.func.now())
    
    programs = db.relationship('Courses', back_populates='certificates')
    statuses = db.relationship('CertStatuses', back_poplates='certificates')
    
    
class CertTechMap(db.Model):
    __tablename__ = "cert_tech_map"
    
    