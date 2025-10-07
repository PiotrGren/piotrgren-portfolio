#!/usr/bin/env bash
set -euo pipefail

echo "[entrypoint] TZ=${TZ:-Europe/Warsaw}"
echo "[entrypoint] DB_ENGINE=${DB_ENGINE:-mysql} HOST=${DB_HOST:-db} PORT=${DB_PORT:-3306} DB=${DB_NAME:-portfolio}"

# 0) FLASK_SECRET_KEY – jeśli nie ustawiono, wygeneruj tymczasowy (lepiej ustawić w .env)
if [ -z "${FLASK_SECRET_KEY:-}" ]; then
  echo "[entrypoint] WARNING: FLASK_SECRET_KEY nie ustawiony – generuję tymczasowy (DEV)."
  export FLASK_SECRET_KEY="$(python - <<'PY'
import secrets; print(secrets.token_urlsafe(32))
PY
)"
fi

# 1) Czekamy na bazę (dla MySQL)
if [ "${DB_ENGINE:-mysql}" = "mysql" ]; then
  echo "[entrypoint] Czekam na MySQL (${DB_HOST}:${DB_PORT})..."
  python - <<'PY'
import os, time, sys
import pymysql
host = os.getenv("DB_HOST","db")
port = int(os.getenv("DB_PORT","3306"))
user = os.getenv("DB_USER","portfolio_user")
pwd  = os.getenv("DB_PASS","devpass")
db   = os.getenv("DB_NAME","portfolio")

for i in range(60):
    try:
        pymysql.connect(host=host, port=port, user=user, password=pwd, database=db, connect_timeout=3).close()
        print("[wait-db] OK")
        sys.exit(0)
    except Exception as e:
        print(f"[wait-db] próba {i+1}/60: {e}")
        time.sleep(2)
print("[wait-db] NIE DOCZEKAŁEM bazy.", file=sys.stderr)
sys.exit(1)
PY
fi

# 2) Katalogi na pliki
mkdir -p /app/media
chmod -R 775 /app/media || true

# 3) Migracje (Flask-Migrate / Alembic)
export FLASK_APP=app.wsgi:app
export FLASK_ENV=${FLASK_ENV:-development}
export FLASK_DEBUG=${FLASK_DEBUG:-0}

# Jeśli brak katalogu migrations/ → init
if [ ! -d "/app/migrations" ]; then
  echo "[entrypoint] flask db init (pierwsza inicjalizacja migracji)"
  flask db init
fi

# Jeśli brak jakiejkolwiek rewizji → pierwsza migracja
# (próba 'flask db current' zwróci błąd gdy brak tabeli alembic_version)
set +e
flask db current >/dev/null 2>&1
CURR=$?
set -e
if [ $CURR -ne 0 ]; then
  echo "[entrypoint] flask db migrate -m 'init'"
  flask db migrate -m "init" || true
fi

echo "[entrypoint] flask db upgrade"
flask db upgrade

# 4) Start serwera (dev lub prod)
if [ "${FLASK_ENV}" = "development" ]; then
  echo "[entrypoint] DEV: flask run --host 0.0.0.0 --port 8000"
  exec flask run --host 0.0.0.0 --port 8000
else
  echo "[entrypoint] PROD: gunicorn app.wsgi:app -b 0.0.0.0:8000 -w 2 --threads 4"
  exec gunicorn app.wsgi:app -b 0.0.0.0:8000 -w 2 --threads 4
fi
