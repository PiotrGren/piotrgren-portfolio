from app import db
from associations import cert_tech_map


class TimestampMixin:
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())


class Issuer(TimestampMixin, db.Model):
    __tablename__ = "cert_issuer"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    courses = db.relationship("Course", back_populates="issuer", passive_deletes=True)


class Course(TimestampMixin, db.Model):
    __tablename__ = "course"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True, index=True)
    url = db.Column(db.String(512), nullable=True, index=True)  # 512 dla długich URL; index zamiast unique
    hours_total = db.Column(db.Integer, nullable=True)
    description = db.Column(db.Text, nullable=True)
    issuer_id = db.Column(db.Integer, db.ForeignKey("cert_issuer.id", ondelete="RESTRICT"), nullable=False, index=True)

    issuer = db.relationship("Issuer", back_populates="courses")
    certificates = db.relationship("Certificate", back_populates="program", passive_deletes=True)

    __table_args__ = (
        db.Index("ix_course_name_url", "name", "url"),
        {"mysql_charset": "utf8mb4"},
    )


class CertStatus(TimestampMixin, db.Model):
    __tablename__ = "cert_status"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(124), unique=True, nullable=False)

    certificates = db.relationship("Certificate", back_populates="status", passive_deletes=True)


class Certificate(TimestampMixin, db.Model):
    __tablename__ = "certificate"

    id = db.Column(db.Integer, primary_key=True)
    cert_id = db.Column(db.String(255), unique=True, nullable=True)
    program_id = db.Column(db.Integer, db.ForeignKey("course.id", ondelete="SET NULL"), nullable=True, index=True)
    title = db.Column(db.String(255), nullable=False)
    issued_on = db.Column(db.Date, nullable=False, index=True)
    verification_url = db.Column(db.String(512), unique=True, nullable=True)
    pdf_path = db.Column(db.String(512), nullable=True, index=True)
    score = db.Column(db.Integer, nullable=True)
    hours = db.Column(db.Integer, nullable=True)
    status_id = db.Column(db.Integer, db.ForeignKey("cert_status.id", ondelete="RESTRICT"), nullable=False, index=True)
    notes = db.Column(db.Text, nullable=True)

    program = db.relationship("Course", back_populates="certificates")
    status = db.relationship("CertStatus", back_populates="certificates")
    technologies = db.relationship("Technology", secondary=cert_tech_map, back_populates="certificates")

    __table_args__ = (
        db.UniqueConstraint("program_id", "title", name="uq_certificate_program_title"),
        {"mysql_charset": "utf8mb4"},
    )