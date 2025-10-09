from app import db
from associations import proj_tech_map
from sqlalchemy.dialects.mysql import JSON
from sqlalchemy.ext.mutable import MutableList


class TimestampMixin:
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), server_onupdate=db.func.now())


class Roles(TimestampMixin, db.Model):
    __tablename__ = "role"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    
    projects = db.relationship('Project', back_populates="role", passive_deletes=True)


class ProjectStatus(TimestampMixin, db.Model):
    __tablename__ = "project_status"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    
    projects = db.relationship('Project', back_populates="status", passive_deletes=True)
    
    
class PublicationScope(TimestampMixin, db.Model):
    __tablename__ = "pub_scope"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    
    projects = db.relationship('Project', back_populates='publication_scope', passive_deletes=True)
    
    
class ConfidentialityMode(TimestampMixin, db.Model):
    __tablename__ = "conf_mode"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    
    projects = db.relationship('Project', back_populates='confidentiality_mode', passive_deletes=True)


class Project(TimestampMixin, db.Model):
    __tablename__ = "project"
    
    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    title = db.Column(db.String(255), unique=True, nullable=False)
    summary_short = db.Column(db.String(512), nullable=True)
    summary_long = db.Column(db.Text, nullable=True)
    status_id = db.Column(db.Integer, db.ForeignKey('project_status.id', ondelete="RESTRICT"), nullable=False, index=True)
    publication_scope_id = db.Column(db.Integer, db.ForeignKey('pub_scope.id', ondelete="RESTRICT"), nullable=False, index=True)
    start_date = db.Column(db.Date, nullable=True)
    responsibilities = db.Column(MutableList.as_mutable(JSON), nullable=False, default=list)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id', ondelete='RESTRICT'), nullable=False, index=True)
    repo_url = db.Column(db.String(512), nullable=True, index=True)
    demo_url = db.Column(db.String(512), nullable=True, index=True)
    prod_url = db.Column(db.String(512), nullable=True, index=True)
    docs_url = db.Column(db.String(512), nullable=True, index=True)
    confidentiality_mode_id = db.Column(db.Integer, db.ForeignKey("conf_mode.id", ondelete="RESTRICT"), nullable=False, index=True)

    status = db.relationship('ProjectStatus', back_populates='projects')
    publication_scope = db.relationship('PublicationScope', back_populates='projects')
    role = db.relationship('Role', back_populates='projects')
    confidentiality_mode = db.relationship('ConfidentialityMode', back_populates='projects')
    
    files = db.relationship('ProjectFiles', back_populates="project", passive_deletes=True)
    technologies = db.relationship('Technology', secondary=proj_tech_map, back_populates='projects')

    __table_args__ = (
        db.Index("ix_project_title_slug", "title", "slug"),
        {"mysql_charset": "utf8mb4"},
    )


class FileType(TimestampMixin, db.Model):
    __tablename__ = "file_type"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    
    files = db.relationship('ProjectFiles', back_populates='type', passive_deletes=True)
    
 
class ProjectFiles(TimestampMixin, db.Model):
    __tablename__ = "project_files"
    
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id', ondelete='CASCADE'), nullable=False, index=True)
    type_id = db.Column(db.Integer, db.ForeignKey('file_type.id', ondelete="RESTRICT"), nullable=False, index=True)
    url = db.Column(db.String(512), nullable=False, unique=True)
    title = db.Column(db.String(255), nullable=False)
    alt_text = db.Column(db.String(255), nullable=True)
    captured_at = db.Column(db.Date, nullable=True)
    tags = db.Column(MutableList.as_mutable(JSON), nullable=False, default=list)
    
    project = db.relationship('Project', back_populates='files')
    type = db.relationship('FileType', back_populates='files')
    
    __table_args__ = (
        db.UniqueConstraint("project_id", "title", name="uq_proj_files_project_title"),
        {"mysql_charset": "utf8mb4"},
    )