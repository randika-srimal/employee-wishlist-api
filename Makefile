#!/usr/bin/make

SHELL = /bin/sh

UID := $(shell id -u)
GID := $(shell id -g)

export UID
export GID

shell:
	docker-compose -f local.docker-compose.yml exec -u ${UID}:${GID} employee-wishlist-api sh

up:
	docker-compose -f local.docker-compose.yml up --build -d --remove-orphans

down:
	docker-compose -f local.docker-compose.yml down --remove-orphans