from app import db
from associations import exp_tech_map


class TimestampMixin:
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())


class Organization(TimestampMixin, db.Model):
    __tablename__ = "organization"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    website = db.Column(db.String(512), nullable=True, index=True)
    logo_url = db.Column(db.String(512), nullable=True, index=True)

    experiences = db.relationship("Experience", back_populates="organization", passive_deletes=True)


class EmploymentType(TimestampMixin, db.Model):
    __tablename__ = "emp_type"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    experiences = db.relationship("Experience", back_populates="employment_type", passive_deletes=True)


class Experience(TimestampMixin, db.Model):
    __tablename__ = "experience"

    id = db.Column(db.Integer, primary_key=True)

    organization_id = db.Column(db.Integer, db.ForeignKey("organization.id", ondelete="RESTRICT"), nullable=False, index=True)
    role_title = db.Column(db.String(255), nullable=False)
    employment_type_id = db.Column(db.Integer, db.ForeignKey("emp_type.id", ondelete="RESTRICT"), nullable=False, index=True)
    location = db.Column(db.String(255), nullable=True)
    start_date = db.Column(db.Date, nullable=False, index=True)
    end_date = db.Column(db.Date, nullable=True, index=True)
    is_current = db.Column(db.Boolean, nullable=False, server_default=db.text("0"))
    description = db.Column(db.Text, nullable=True)
    url = db.Column(db.String(512), nullable=True, index=True)

    organization = db.relationship("Organization", back_populates="experiences")
    employment_type = db.relationship("EmploymentType", back_populates="experiences")
    technologies = db.relationship("Technology", secondary=exp_tech_map, back_populates="experiences")

    __table_args__ = (
        db.Index("ix_experience_dates", "start_date", "end_date"),
        db.CheckConstraint(
            "(end_date IS NULL) OR (start_date <= end_date)",
            name="chk_experience_dates_order"
        ),
        {"mysql_charset": "utf8mb4"},
    )