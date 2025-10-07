FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    TZ=Europe/Warsaw

WORKDIR /app

# bash jest potrzebny dla shebanga w entrypoincie
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    build-essential default-libmysqlclient-dev pkg-config tzdata \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY entrypoint.sh /app/entrypoint.sh

# Zamiast dos2unix: usuń CRLF i nadaj prawa wyk.
RUN sed -i 's/\r$//' /app/entrypoint.sh && chmod +x /app/entrypoint.sh

EXPOSE 8000
ENV FLASK_APP=app.wsgi:app
ENTRYPOINT ["/app/entrypoint.sh"]
