from app import db
from associations import cert_tech_map, exp_tech_map, proj_tech_map


class TimestampMixin:
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())


class TechCategory(TimestampMixin, db.Model):
    __tablename__ = "tech_cat"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)

    technologies = db.relationship("Technology", back_populates="category", passive_deletes=True)

    __table_args__ = (
        db.Index("ix_techcat_name_slug", "name", "slug"),
        {"mysql_charset": "utf8mb4"},
    )


class Technology(TimestampMixin, db.Model):
    __tablename__ = "technology"

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey("tech_cat.id", ondelete="RESTRICT"), nullable=False, index=True)
    name = db.Column(db.String(255), unique=True, nullable=False, index=True)
    slug = db.Column(db.String(255), unique=True, nullable=False, index=True)
    description = db.Column(db.Text, nullable=True)

    category = db.relationship("TechCategory", back_populates="technologies")
    certificates = db.relationship("Certificate", secondary=cert_tech_map, back_populates="technologies")
    experiences = db.relationship("Experience", secondary=exp_tech_map, back_populates="technologies")
    projects = db.relationship('Project', secondary=proj_tech_map, back_populates='technologies')

    __table_args__ = ({"mysql_charset": "utf8mb4"},)