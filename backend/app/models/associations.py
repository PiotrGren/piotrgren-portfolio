from app import db

# certificates ↔ technologies (N–N)
cert_tech_map = db.Table(
    "cert_tech_map",
    db.Column("certification_id", db.Integer, db.ForeignKey("certificate.id", ondelete="CASCADE"), primary_key=True),
    db.Column("technology_id", db.Integer, db.ForeignKey("technology.id", ondelete="CASCADE"), primary_key=True),
    db.UniqueConstraint("certification_id", "technology_id", name="uq_cert_tech"),
    db.Column("created_at", db.DateTime, server_default=db.func.now()),
    db.Column("updated_at", db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now()),
)


# experience ↔ technologies (N–N)
exp_tech_map = db.Table(
    "exp_tech_map",
    db.Column("experience_id", db.Integer, db.ForeignKey("experience.id", ondelete="CASCADE"), primary_key=True),
    db.Column("technology_id", db.Integer, db.ForeignKey("technology.id", ondelete="CASCADE"), primary_key=True),
    db.UniqueConstraint("experience_id", "technology_id", name="uq_exp_tech"),
    db.Column("created_at", db.DateTime, server_default=db.func.now()),
    db.Column("updated_at", db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now()),
)


# projects ↔ technologies (N-N)
proj_tech_map = db.Table(
    'proj_tech_map',
    db.Column("project_id", db.Integer, db.ForeignKey("project.id", ondelete="CASCADE"), primary_key=True),
    db.Column("technology_id", db.Integer, db.ForeignKey("technology.id", ondelete="CASCADE"), primary_key=True),
    db.UniqueConstraint("project_id", "technology_id", name="uq_proj_tech"),
    db.Column("created_at", db.DateTime, server_default=db.func.now()),
    db.Column("updated_at", db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now()),
)