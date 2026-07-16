FROM python:3.10-slim

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# remove requirements-dev installation for deployments
COPY requirements-dev.txt requirements-dev.txt
RUN pip install -r requirements-dev.txt

RUN apt-get update && apt-get install -y --no-install-recommends wget \
    && wget -qO /usr/local/bin/mc https://dl.min.io/client/mc/release/linux-amd64/mc \
    && chmod +x /usr/local/bin/mc \
    && apt-get purge -y wget && rm -rf /var/lib/apt/lists/*

COPY ./hydroprocess_db /hydroprocess_db

ENV PYTHONPATH "/hydroprocess_db/:${PYTHONPATH}"

EXPOSE 8000

CMD uvicorn --host 0.0.0.0 --port 8000 --proxy-headers main:app