import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import Config


db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    db.init_app(app)
    migrate.init_app(app, db)
    
    from .routes import bp as api_bp
    app.register_blueprint(api_bp, url_prefix="/api")
    
    @app.get("/health")
    def health():
        return {"status": "ok"}, 200
    
    return app
    