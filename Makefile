.DEFAULT_GOAL := all
isort = isort ./
black = black -S -l 120 --target-version py310 ./
loaddb = psql --username=postgres hydroprocess < /data/combined_imports.sql

.PHONY: up
up:
	docker-compose up

.PHONY: up-d
up-d:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: build
build:
	docker-compose build

.PHONY: test
test:
	docker-compose exec api pytest tests

.PHONY: format
format:
	docker-compose run api $(isort)
	docker-compose run api $(black)

.PHONY: loaddb
loaddb:
	docker-compose exec postgres $(loaddb)