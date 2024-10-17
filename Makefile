.DEFAULT_GOAL := all
isort = isort ./
black = black -S -l 120 --target-version py310 ./
loaddb = bash -c 'psql --username=postgres hydroprocess < /data/combined_imports.sql'
dropdb = bash -c 'psql --username=postgres -c "DROP DATABASE hydroprocess WITH (FORCE);"'

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

.PHONY: reloaddb
reloaddb:
	docker-compose down -v
	docker-compose up -d
	echo "Waiting for postgres to start..."
	while ! docker-compose logs postgres | grep -q "database system is ready to accept connections"; do sleep 1; done
	while ! docker-compose logs api | grep -q "Application startup complete"; do sleep 1; done
	docker-compose exec postgres $(loaddb)

.PHONY: loaddb
loaddb:
	docker-compose exec postgres $(loaddb)

.PHONY: dropdb
dropdb:
	docker-compose exec postgres $(dropdb)