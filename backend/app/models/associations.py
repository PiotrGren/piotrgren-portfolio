from app import db

# certyfikaty ↔ technologie (N–N)
cert_tech_map = db.Table(
    "cert_tech_map",
    db.Column("certification_id", db.Integer, db.ForeignKey("certificate.id", ondelete="CASCADE"), primary_key=True),
    db.Column("technology_id", db.Integer, db.ForeignKey("technology.id", ondelete="CASCADE"), primary_key=True),
    db.UniqueConstraint("certification_id", "technology_id", name="uq_cert_tech"),
    db.Column("created_at", db.DateTime, server_default=db.func.now()),
    db.Column("updated_at", db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now()),
)

# doświadczenia ↔ technologie (N–N)
exp_tech_map = db.Table(
    "exp_tech_map",
    db.Column("experience_id", db.Integer, db.ForeignKey("experience.id", ondelete="CASCADE"), primary_key=True),
    db.Column("technology_id", db.Integer, db.ForeignKey("technology.id", ondelete="CASCADE"), primary_key=True),
    db.UniqueConstraint("experience_id", "technology_id", name="uq_exp_tech"),
    db.Column("created_at", db.DateTime, server_default=db.func.now()),
    db.Column("updated_at", db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now()),
)