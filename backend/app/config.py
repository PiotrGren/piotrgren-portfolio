import os

class Config:
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY", "dev-secret")
    SQLALCHEMY_TRAKC_MODIFICATIONS = False
    TZ = os.getenv("TZ", "Europe/Warsaw")
    
    DB_ENGINE = os.getenv("DB_ENGINE", "mysql")
    if DB_ENGINE == "sqlite":
        DB_PATH = os.getenv("SQLITE_PATH", "/app/db/sqlite/portfolio.db")
        SQLALCHEMY_DATABASE_URI = f"sqlite:///{DB_PATH}"
    else:
        # MySQL
        DB_USER = os.getenv("DB_USER", "portfolio_admin")
        DB_PASS = os.getenv("DB_PASS", "devpass")
        DB_HOST = os.getenv("DB_HOST", "db")
        DB_PORT = os.getenv("DB_PORT", "3306")
        DB_NAME = os.getenv("DB_NAME", "portfolio")
        SQLALCHEMY_DATABASE_URI = (
            f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
            "?charset=utf8mb4"
        )