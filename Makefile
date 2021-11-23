#!/usr/bin/make

SHELL = /bin/sh

UID := $(shell id -u)
GID := $(shell id -g)

export UID
export GID

shell:
	docker-compose -f docker-compose.local.yml exec -u ${UID}:${GID} employee-wishlist-api sh

up:
	docker-compose -f docker-compose.local.yml up --build -d --remove-orphans

down:
	docker-compose -f docker-compose.local.yml down --remove-orphans

logging:
	docker logs --follow employee-wishlist-api